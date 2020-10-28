auto.waitFor();
var func = require('func_list.js');

var i = 0;
var j = 0;
var taskList = ['去完成'];

let kouLing = '28.0复制整段话 Https:/JYDWNoVro4qHi1【全民在线营业啦，帮我助力，11.11一起来分京东10亿】￥N2Jae9a23b%→打开（京つ東】';
let appName = '京东';
setClip(kouLing);
sleep(1000);
log("正在打开淘宝");
func.toApp(appName);
log("正在等待进入活动页面");
//等待点击 立即查看按钮
func.sClick(className("TextView").text("立即查看").findOne());

// 助力关闭按钮
let closeBtnHelp = className('android.view.View').textContains('的助力邀请').findOne();
sleep(500);
func.sClick(closeBtnHelp.parent().parent().parent().child(1));

let getGold = text('领金币').findOne();
sleep(800);
func.sClick(getGold);

textContains('邀请好友助力').waitFor();
sleep(800);

func.sClick(text('签到').findOnce());


taskList.forEach(task => {
	while (textContains(task).exists()) {
		let nextStep;
		let index = 2;
		let i = 1;
		unComplete = text('去完成').find();
		unComplete.forEach(unc => {
			i = 0
			toastLog(unc.parent().child(4*i+2).text());
			i = i + 1;
			}
		);
		//toastLog(unComplete.length);
		if (unComplete.nonEmpty()) {
			if (unComplete.length == 2) {
				break;
			} else {
				indexText = unComplete[index].parent().child((index*4 + 2)).text();	//浏览8秒可得，逛店8秒可得，浏览可得，浏览5个商品
				toastLog(indexText);
				if (indexText.indexOf('秒') != -1) { nextStep = '等待8秒' }
				if (indexText.indexOf('浏览可得') != -1) { nextStep = '浏览返回' }
				if (indexText.indexOf('浏览5个') != -1) { nextStep = '浏览商品' }
				func.sClick(unComplete);
				sleep(800);
				after_click(nextStep);
			}
		}

	}
});

function after_click(textStr) {
	let gold8000;
	switch (textStr) {
		case '等待8秒':
			gold8000 = textContains('000金币').findOne().parent();
			while (gold8000.length() == 5) {
				gold8000 = textContains('000金币').findOne().parent();
				sleep(800);
			}
			sleep(400);
			func.sClick(gold8000.child(5))
			sleep(400);
			break;
		case '浏览返回':
			sleep(5000);
			back_way()
			break;
		case '浏览商品':
			view_list();
			break;
		default:
			break;
	}
}

function view_list() {
	i = 0;
	while (text('已完成').findOnce() == null) {
		idContains('view_').findOne();
		//点击商品加购物车按钮
		if (idContains('view_').findOnce() != null) {
			idContains('view_').find()[i].click();
			textContains('购物车').findOne();
			sleep(1500);
			back_way();
			sleep(2500);
		}
		i = i + 1;
	}
	textContains('邀请好友助力').waitFor();
	back_way();
	sleep(2000);
}


function back_way() {
	sleep(800);
	let backBtn = desc('返回').findOnce();
	if (backBtn == null) {
		back();
	} else {
		let closeBtn = className('ImageView').id('com.jd.lib.jshop:id/asj').findOnce();
		if (closeBtn != null) {
			closeBtn.click();
			sleep(1000);
		}
		if (backBtn.clickable()) {
			backBtn.click();
		} else {
			func.sClick(backBtn);
		}
	}
	sleep(800);
	func.sClick(textContains('离开').findOnce());
	func.sClick(textContains('知道了').findOnce());
}