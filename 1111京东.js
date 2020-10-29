auto.waitFor();
var func = require('func_list.js');

var i = 0;

var selectedArr = ['每日任务', '营业版图', '开宝箱'];
var selectIndex = dialogs.select('选择启动的功能', selectedArr);
if (selectIndex == -1) { exit() };
// 数字从0开始。
var selected = selectedArr[selectIndex];
var devBrand = device.brand;
main();

function main(appName) {
	let kouLing = '28.0复制整段话 Https:/JYDWNoVro4qHi1【全民在线营业啦，帮我助力，11.11一起来分京东10亿】￥N2Jae9a23b%→打开（京つ東】';
	let appName = '京东';
	setClip(kouLing);
	sleep(1000);
	log("正在打开");
	if (devBrand == 'HUAWEI') {
		func.toApp(appName);
		process();
	} else if (devBrand == 'xiaomi') {
		func.toAppMulti(appName, 1);
		process();
		setClip(kouLing);
		sleep(1000);
		func.toAppMulti(appName, 2);
		process();
	}
	alert('已完成');
}

function process() {
	log("正在等待进入活动页面");
	//等待点击 立即查看按钮
	func.sClick(className("TextView").text("立即查看").findOne());

	// 助力关闭按钮
	let closeBtnHelp = className('android.view.View').textContains('的助力邀请').findOne();
	sleep(2000);
	if (textContains('为TA助力').findOnce() != null) {
		func.sClick(closeBtnHelp.parent().parent().parent().parent().child(1));
	} else {
		func.sClick(closeBtnHelp.parent().parent().parent().child(1));
	}

	//等待完全加载后
	text('领金币').findOne();
	//延迟3秒
	sleep(3000);

	switch (selected) {
		case '每日任务':
			每日任务();
			break;
		case '营业版图':
			营业版图();
			break;
		case '开宝箱':
			开宝箱();
			break;
	}
}

function 营业版图() {
	func.sClick(text('可领金币').findOne());
	sleep(2000);
	text('营业版图').waitFor();
	log('营业版图已加载');
	sleep(800);

	let view1 = (text('北京').findOne()).parent().parent();
	let view1Cnt = view1.childCount();
	log('开始第一组');
	i = 1
	while (i <= (view1Cnt - 1)) {
		func.sClick(view1.child(i));
		text('签到得最高500金币').findOne();
		sleep(1500);
		营业版图_去完成();
		back_way();

		view1 = (text('北京').findOne()).parent().parent();
		i = i + 1;
	}
	log('开始第二组');
	i = 0
	let view2 = (text('热爱城').findOne()).parent().parent();
	let view2Cnt = view2.childCount();
	while (i <= (view2Cnt - 1)) {
		log(view2.child(i).child(2).text());
		func.sClick(view2.child(i));
		text('签到得最高500金币').findOne();
		sleep(1500);
		营业版图_去完成();
		back_way();
		view2 = (text('热爱城').findOne()).parent().parent();
		i = i + 1;
	}
}

function 营业版图_去完成() {
	let index = 0;
	while (textContains('去完成').exists()) {
		unComplete = text('去完成').find();
		toastLog('去完成剩余 = ' + unComplete.length);
		if (unComplete.nonEmpty()) {
			func.sClick(unComplete[index]);
			log('点击去完成');
			while (text('签到得最高500金币').findOnce() != null) { sleep(300); }
			sleep(2000);
			back_way();
			text('签到得最高500金币').findOne();
			sleep(1200);
		}
	}
	toastLog('营业版图_当前_已完成');
}

function 开宝箱() {
	text('寻宝箱 领金币').findOne();
	sleep(3000);
	i = 0;
	let boxlist;
	if (devBrand == 'HUAWEI') {
		boxlist = (text('寻宝箱 领金币').findOne()).parent().child(2);
	} else if (devBrand == 'xiaomi') {
		boxlist = (text('寻宝箱 领金币').findOne()).parent().parent().child(2);
	}
	let boxLen = boxlist.childCount();
	while (i <= (boxLen - 1)) {
		func.sClick(boxlist.child(i));
		text('签到得500金币').findOne();
		if (textContains('今日签到已达上限').findOnce()) {
			break;
		}
		back_way();
		if (devBrand == 'HUAWEI') {
			boxlist = (text('寻宝箱 领金币').findOne()).parent().child(2);
		} else if (devBrand == 'xiaomi') {
			boxlist = (text('寻宝箱 领金币').findOne()).parent().parent().child(2);
		}
		i = i + 1;
	}
}

function 每日任务() {
	log('等待加载');
	func.sClick(text('领金币').findOne());
	sleep(2000);
	textContains('邀请好友助力').waitFor();
	sleep(800);

	func.sClick(text('签到').findOnce());
	log('签到');
	while (textContains('去完成').exists()) {
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
				toastLog(nextStep);
				sleep(1000);
				after_click(nextStep);
			}
		}
		sleep(1000);
	}
}

function after_click(textStr) {
	let gold000, gold001 = 1;
	let jyqFlag = false;
	switch (textStr) {
		case '等待8秒':
			log('等待8秒');
			gold000 = (textContains('000金币').findOne()).parent().childCount();
			log('gold000 = ' + gold000);
			while (gold001 != (gold000 + 1)) {
				if (!jyqFlag) {
					if (text('京友券').findOnce() != null) {
						jyqFlag = true;
					}
				}
				gold001 = (textContains('000金币').findOne()).parent().childCount();
				log('gold001 = ' + gold001);
				sleep(400);
			}
			if (jyqFlag) {
				back_way();
				sleep(1600);
			}
			sleep(400);
			break;
		case '浏览返回':
			log('浏览返回');
			sleep(5000);
			let viewBack = id('com.tencent.mm:id/d8').findOnce();
			if (viewBack != null) {
				while(currentPackage() != getPackageName('京东')) {
					back_way();
					sleep(3500);
				}
			}; 
			break;
		case '浏览商品':
			log('浏览商品');
			view_list();
			break;
		case '加购物车':
			log('加购物车');
			add_cart();
			break;
		case '加入会员':
			log('加入会员');
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
		sleep(5500);
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
		func.sClick(className('ImageView').id('com.jd.lib.jshop:id/asj').findOnce());
		func.sClick(className('ImageView').id('com.jd.lib.jshop.feature:id/gd').findOnce());
		func.sClick(className('ImageView').id('com.jd.lib.jshop.feature:id/mj').findOnce());
		func.sClick(className('ImageView').desc('关闭页面').findOnce());

		sleep(1000);
		if (backBtn.clickable()) {
			backBtn.click();
		} else {
			func.sClick(backBtn);
		}
	}
	sleep(800);
	func.sClick(textContains('离开').findOnce());
	func.sClick(textContains('知道了').findOnce());
	log('返回');
}