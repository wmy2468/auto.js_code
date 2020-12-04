auto.waitFor();
var func = require('func_list.js');

var 小米双开 = true;

var i = 0;
var k;
var appName = '京东';
var selectedArr = ['每日任务', '营业版图', '开宝箱'];
var selectIndex = dialogs.select('选择启动的功能', selectedArr);
if (selectIndex == -1) { exit() };
// 数字从0开始。
var selected = selectedArr[selectIndex];
var devBrand = device.brand;
main();

function main() {
	var kouLing = '28.0复制整段话 Https:/JYDWNoVro4qHi1【全民在线营业啦，帮我助力，11.11一起来分京东10亿】￥N2Jae9a23b%→打开（京つ東】';
	setClip(kouLing);
	sleep(1000);
	log("正在打开");
	if (devBrand == 'HUAWEI') {
		func.toApp(appName);
		process();
	} else if (devBrand == 'xiaomi') {
		if (小米双开) {
			k = 1;
			func.toAppMulti(appName, k);
			process();
			toastLog('第一个已完成');
			setClip(kouLing);
			sleep(1000);
			k = k + 1;
			func.toAppMulti(appName, k);
			process();
		} else {
			func.toApp(appName);
			process();
		}
	} else {
		func.toApp(appName);
		process();
	}
	alert('已完成');
}

function process() {
	log("正在等待进入活动页面");
	//等待点击 立即查看按钮
	func.sClick(className("TextView").text("立即查看").findOne());

	// 助力关闭按钮
	var closeBtnHelp = className('android.view.View').textContains('的助力邀请').findOne();
	sleep(3000);
	if (textContains('为TA助力').findOnce() != null || textContains('您今天的助力次数已用完').findOnce() != null) {
		log('为TA助力不为空')
		func.sClick(closeBtnHelp.parent().parent().parent().parent().child(1));
	} else {
		log('为TA助力为空')
		func.sClick(closeBtnHelp.parent().parent().parent().child(1));
	}

	//等待完全加载后，如果出现取消按钮会找不到
	var lottery, iKnow;
	while (!(text('领金币').findOnce() != null && (text('我知道了').findOnce() == null) && text('立即抽奖').findOnce() == null)) {
		iKnow = text('我知道了').findOnce();
		if (iKnow != null) {
			log('我知道了取消');
			func.sClick(iKnow.parent().child(4));
			sleep(800);
		}
		lottery = text('立即抽奖').findOnce();
		if (lottery != null) {
			log('立即抽奖取消');
			func.sClick(lottery.parent().parent().parent().child(1))
			sleep(800);
		}
		func.sClick(text('取消').findOnce());
		sleep(300);
		func.sClick(text('立即收下').findOnce());
	}
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
	// 检查营业版图是否完成一个是查结尾，一个查中间
	var view2 = (text('热爱城').findOne()).parent().parent();
	var view2Cnt = view2.childCount() - 1;
	func.sClick(view2.child(view2Cnt));
	text('签到得最高500金币').findOne();
	sleep(1500);
	if (text('去完成').findOnce() == null) {
		toastLog('检测到当前账号已经完成，下一个');
		sleep(800);
		return 0;
	} else {
		back_way();
		var view2 = (text('热爱城').findOne()).parent().parent();
		// 取中间的检查
		var view2Cnt = Math.floor(view2.childCount() / 2);
		func.sClick(view2.child(view2Cnt));
		text('签到得最高500金币').findOne();
		sleep(1500);
		if (text('去完成').findOnce() == null) {
			toastLog('当前账号已经完成一半');
			back_way();
			营业2(view2Cnt);
		} else {
			back_way();
			营业1(1);
			营业2(0);
		}
	}


}

function 营业1(i) {
	log('开始第一组');
	var view1 = (text('北京').findOne()).parent().parent();
	var view1Cnt = view1.childCount();
	while (i <= (view1Cnt - 1)) {
		toastLog('当前正在完成第 ' + i + '个，共' + (view1Cnt - 1) + '个，城市：' + view1.child(i).child(2).text());
		func.sClick(view1.child(i));
		text('签到得最高500金币').findOne();
		sleep(1500);
		营业版图_去完成();
		back_way();
		view1 = (text('北京').findOne()).parent().parent();
		i = i + 1;
	}
}

function 营业2(i) {
	log('开始第二组');
	view2 = (text('热爱城').findOne()).parent().parent();
	view2Cnt = view2.childCount();
	while (i <= (view2Cnt - 1)) {
		toastLog('当前正在完成第 ' + i + '个，共' + (view2Cnt - 1) + '个，城市：' + view2.child(i).child(2).text());
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
	var index = 0, cnt = 0;
	while (textContains('去完成').exists()) {
		unComplete = text('去完成').find();
		toastLog('去完成剩余 = ' + unComplete.length);
		if (unComplete.nonEmpty()) {
			var goUnComplete = unComplete[index];
			/*if (unComplete[index].parent().child([goUnComplete.indexInParent() - 2]).text() == '去逛真五折秘籍清单(0/1)') {
				break;
			}*/
			func.sClick(goUnComplete);
			log('点击去完成');
			while (text('签到得最高500金币').findOnce() != null) {
				if (cnt >= 15) {
					func.sClick(text('去完成').findOnce());
					cnt = 0;
				}
				sleep(400);
				cnt = cnt + 1;
			}
			sleep(1700);
			back_way();
			text('签到得最高500金币').findOne();
			sleep(1500);
		}
	}
	toastLog('营业版图_当前_已完成');
}

function getBoxList() {
	if (devBrand == 'HUAWEI') {
		boxlist = (text('寻宝箱 领金币').findOne()).parent().child(2);
	} else if (devBrand == 'xiaomi') {
		boxlist = (text('寻宝箱 领金币').findOne()).parent().parent().child(2);
	} else {
		boxlist = (text('寻宝箱 领金币').findOne()).parent().child(2);
	}
	return boxlist;
}

function 开宝箱() {
	text('寻宝箱 领金币').findOne();
	sleep(3000);
	i = 0;
	var boxlist, boxLen;
	var myList = new Array();
	boxlist = getBoxList();
	while (true) {
		boxLen = boxlist.childCount(); i
		i = random(0, boxLen - 1);
		while (myList.indexOf(i) != -1) {
			i = random(0, boxLen - 1);
		}
		log('随机数字为=' + i);
		func.sClick(boxlist.child(i));
		text('签到得500金币').findOne();
		if (textContains('今日签到已达上限').findOnce()) {
			break;
		}
		myList.push(i);
		back_way();
		boxlist = getBoxList();
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
	var indexText, detailText;
	var index = 3;
	while (textContains('去完成').exists()) {
		var nextStep, nextStepDetail;
		nextStepDetail = '';
		unComplete = text('去完成').find();
		//toastLog(unComplete.length);
		if (unComplete.nonEmpty()) {
			if (unComplete.length <= index) {
				toastLog('去完成长度剩余:' + unComplete.length);
				break;
			} else {
				indexText = unComplete[index].parent().child(((index - 2) * 4 + 2)).text();	//浏览8秒可得，逛店8秒可得，浏览可得，浏览5个商品
				detailText = unComplete[index].parent().child(((index - 2) * 4 + 2) - 1).text();
				toastLog(indexText);
				log(detailText);
				if (indexText.indexOf('扩大商圈可得') != -1) {
					index = index + 1;
					continue;
				}

				if (indexText.indexOf('秒') != -1) { nextStep = '等待8秒' }
				if (indexText.indexOf('浏览可得') != -1) { nextStep = '浏览返回' }
				if (indexText.indexOf('浏览5个') != -1) { nextStep = '浏览商品' }
				if (indexText.indexOf('加购5个') != -1) { nextStep = '加购物车' }
				if (indexText.indexOf('成功入会') != -1) { nextStep = '加入会员' }
				// 详细描述校验
				if (detailText.indexOf('去小程序领更多') != -1) { nextStepDetail = '小程序' }
				if (detailText.indexOf('去逛美妆护肤爆款会场') != -1) { nextStepDetail = '小程序' }
				if (detailText.indexOf('去逛京友圈') != -1) { nextStepDetail = '京友圈' }
				func.sClick(unComplete[index]);
				toastLog(nextStep);
				log(nextStepDetail);
				sleep(1500);
				after_click(nextStep, nextStepDetail);
			}
		}
	}
}

function waitLog(cnt, textDetail) {
	while (cnt--) {
		toastLog(textDetail);
		sleep(2000);
	}
}

function after_click(textStr, details) {
	var gold001Parent, cnt, gold000, gold001 = 1;
	switch (textStr) {
		case '等待8秒':
			cnt = 1;
			log('等待8秒');
			if (details == '京友圈') {
				log('京友圈');
				//if (text('京友圈').findOnce() == null) {
				back_way();
				//}
			}
			while (textContains('000金币').findOnce() == null) {
				func.sClick(className('ImageView').id('com.jd.lib.jshop.feature:id/gd').findOnce());
			}
			gold000 = (textContains('000金币').findOne()).parent().childCount();
			toastLog('gold000 = ' + gold000);
			while (gold001 != (gold000 + 1)) {
				gold001Parent = null;
				while (gold001Parent == null) {
					gold001Parent = (textContains('000金币').findOne()).parent();
					log('wait for gold001Parent');
					sleep(800);
				}
				gold001 = gold001Parent.childCount();
				log('gold001 = ' + gold001);
				if (gold001 > 15) {
					cnt = cnt + 1;
					sleep(2200);
					if (cnt > 4) {
						cnt = 1;
						toastLog('应该是完成了..准备退出')
						sleep(1000);
						break;
					}
				}
				sleep(400);
			}
			toastLog('last gold001 = ' + gold001);
			sleep(400);
			back_way();
			break;
		case '浏览返回':
			log('浏览返回');
			// 判断是否被微信小程序跳转到了微信
			if (details == '小程序') {
				log('微信返回');
				i = 10;
				toastLog('跳转到小程序，等待20秒');
				if (devBrand == 'HUAWEI') {
					waitLog(8, '等待一会儿..跳转回JD');
					func.toApp(appName);
				} else if (devBrand == 'xiaomi') {
					if (小米双开) {
						waitLog(15, '等待一会儿..跳转回JD');
						func.toAppMulti(appName, k);
					} else {
						waitLog(15, '等待一会儿..跳转回JD');
						func.toApp(appName);
					}
				} else {
					waitLog(15, '等待一会儿..跳转回JD');
					func.toApp(appName);
				}
				sleep(2500);
			} else {
				back_way();
			}
			break;
		case '浏览商品':
			log('浏览商品');
			view_list();
			back_way();
			break;
		case '加购物车':
			log('加购物车');
			add_cart();
			back_way();
			break;
		case '加入会员':
			log('加入会员');
			member_card();
			back_way();
			break;
		default:
			break;
	}
	log('等待邀请好友助力');
	textContains('邀请好友助力').waitFor();
	sleep(2000);
}

// 浏览5个商品
function view_list() {
	i = 0;
	var findDoller;
	while (text('已完成').findOnce() == null) {
		textContains('¥').findOne();
		//点击商品加购物车按钮
		while (1) {
			try {
				findDoller = (textContains('¥').find()[i]).parent().parent();
				break;
			}
			catch (e) {
				continue;
			}
		}
		func.cClick(findDoller);
		textContains('购物车').findOne();
		sleep(800);
		back_way();
		sleep(2000);
		i = i + 1;
	}
}
// 加入会员
function member_card() {
	//toastLog('会员卡');
	sleep(4000);
	if (textContains('邀请好友助力').findOnce() != null) {
		return 0;
	}
	while (textContains('已集齐所有会员卡').findOnce() == null) {
		log('加会员');
		func.sClick(textContains('确认授权并加入').findOnce())
	}
	sleep(1500);
}
//加购5个商品
function add_cart() {
	i = 0;
	var findDoller;
	textContains('当前页任意加购5个商品').findOne();
	while (text('已完成').findOnce() == null) {
		if (i >= 4) {
			swipe(500, 800, 500, 300, 300);
			sleep(4000);
		}
		textContains('¥').findOne();
		//点击商品加购物车按钮
		while (1) {
			try {
				findDoller = (textContains('¥').find()[i]).parent().parent().child(4);
				break;
			}
			catch (e) {
				continue;
			}
		}
		func.sClick(findDoller);
		//textContains('购物车').findOne();
		//back_way();
		sleep(2000);
		i = i + 1;
	}
}

function back_way() {
	sleep(800);
	var backBtn = desc('返回').findOnce();
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