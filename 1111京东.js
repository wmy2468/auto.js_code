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
sleep(2000);
func.sClick(closeBtnHelp.parent().parent().parent().child(1));

let getGold = text('领金币').findOne();
sleep(500);
func.sClick(getGold);
sleep(2000);

textContains('邀请好友助力').waitFor();
sleep(800);

func.sClick(text('签到').findOnce());


taskList.forEach(task => {
	while (textContains(task).exists()) {
		let nextStep;
		unComplete = text('去完成').find();
		//toastLog(unComplete.length);
		if (unComplete.nonEmpty()) {
			if (unComplete.length == 2) {
				break;
			} else {
				let index = 2;
				indexText = unComplete[index].parent().child((index * 4 + 2)).text();	//浏览8秒可得，逛店8秒可得，浏览可得，浏览5个商品
				toastLog(indexText);
				if (indexText.indexOf('秒') != -1) { nextStep = '等待8秒' }
				if (indexText.indexOf('浏览可得') != -1) { nextStep = '浏览返回' }
				if (indexText.indexOf('浏览5个') != -1) { nextStep = '浏览商品' }
				if (indexText.indexOf('加购5个') != -1) { nextStep = '加购物车' }
				if (indexText.indexOf('成功入会') != -1) { nextStep = '加入会员' }
				func.sClick(unComplete[index]);
				sleep(1000);
				after_click(nextStep);
			}
		}
		sleep(1000);
	}
	alert('已完成');
});

function after_click(textStr) {
	let gold000, gold001 = 1;
	switch (textStr) {
		case '等待8秒':
			gold000 = (textContains('000金币').findOne()).parent().childCount();
			//toastLog('gold000' + gold000);
			while (gold001 != (gold000 + 1)) {
				gold001 = (textContains('000金币').findOne()).parent().childCount();
				//toastLog('gold001' + gold001);
				sleep(1000);
			}
			sleep(400);
			break;
		case '浏览返回':
			sleep(5000);
			break;
		case '浏览商品':
			view_list();
			break;
		case '加购物车':
			add_cart();
			break;
		case '加入会员':
			member_card();
			break;

		default:
			break;
	}
	back_way();
	textContains('邀请好友助力').waitFor();
	sleep(2000);
}

// 浏览5个商品
function view_list() {
	i = 0;
	while (text('已完成').findOnce() == null) {
		textContains('¥').findOne();
		//点击商品加购物车按钮
		func.cClick((textContains('¥').find()[i]).parent().parent());
		textContains('购物车').findOne();
		sleep(800);
		back_way();
		sleep(2000);
		i = i + 1;
	}
}
// 加入会员
function member_card() {
	let count = 0;
	//toastLog('会员卡');
	sleep(4000);
	if (textContains('邀请好友助力').findOnce() != null) {
		exit();
	}
	while (textContains('已集齐所有会员卡').findOnce() == null) {
		func.sClick(textContains('确认授权并加入').findOnce())
		count = count + 1;
		sleep(4000);
	}
}
//加购5个商品
function add_cart() {
	i = 0;
	textContains('当前页任意加购5个商品').findOne();
	while (text('已完成').findOnce() == null) {
		if (i >= 4) {
			swipe(500, 800, 500, 300, 300);
			sleep(4000);
		}
		textContains('¥').findOne();
		//点击商品加购物车按钮
		func.sClick((textContains('¥').find()[i]).parent().parent().child(4));
		//textContains('购物车').findOne();
		//back_way();
		sleep(2000);
		i = i + 1;
	}
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