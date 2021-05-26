auto.waitFor();
var func = require('func_list.js');

var 小米双开 = true;

var i = 0;
var k;
var appName = '京东';
var selectedArr = ['每日任务', '图鉴'];
var selectIndex = dialogs.select('选择启动的功能', selectedArr);
if (selectIndex == -1) { exit() };
// 数字从0开始。
var selected = selectedArr[selectIndex];
var devBrand = device.brand;
main();

function main() {
	var kouLing = '24.0复制整段话 Https:/JUWzIzbq3E8tGV幇幇莪！解鎻憅粅聅萠%R9JUj8Qf2b@去→倞東 go！';
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
		func.sClick(closeBtnHelp.parent().child(6));   //关闭助力
	} else {
		// 0524 未更新
		log('为TA助力为空')
		func.sClick(closeBtnHelp.parent().parent().parent().child(1));
	}

	//等待完全加载后，如果出现取消按钮会找不到
	while (textContains('领金币').findOnce() == null) {
		checkPopUp();
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
		case '图鉴':
			图鉴();
			break;
		case '开宝箱':
			开宝箱();
			break;
	}
}


function checkPopUp() {
	var lottery, iKnow, curCnt;
	iKnow = text('我知道了').findOnce();
	if (iKnow != null) {
		curCnt = iKnow.indexInParent();
		log('我知道了取消');
		func.sClick(iKnow.parent().child(childcurCnt + 1));
		sleep(800);
	}
	lottery = text('立即抽奖').findOnce();
	if (lottery != null) {
		log('立即抽奖取消');
		func.sClick(lottery.parent().child(childcurCnt + 1));
		sleep(800);
	}
	signNow = textContains('去签到').findOnce();
	if (signNow != null) {
		curCnt = signNow.indexInParent();
		log('去签到取消');
		func.sClick(signNow.parent().child(curCnt + 1));
		sleep(800);
	}
	func.sClick(text('我知道啦').findOnce());
}


function 图鉴() {
	func.sClick(text('下拉有惊喜').findOne().parent().child(5));
	sleep(2000);
	text('已经解锁：').waitFor();
	log('宠物图鉴已加载');
	var cnt = 13;
	while (cnt > 0) {
		swipe(500, 1000, 500, 300, 500);
		sleep(500);
		cnt = cnt - 1;
	}
	sleep(800);
	var zooAnimals;
	// zooAnimals = (idContains("zooAnimalListBtnBattle").findOne()).parent();
	idContains("zooAnimalListBtnBattle").findOne();
	log("zooAnimals 已找到");
	var idx = 0;
	cnt = 2;
	while (cnt > 0) {
		if (cnt == 2) {
			zooAnimals = textContains(".jpg").find();
		} else {
			zooAnimals = textContains(".png").find();
		}

		while (idx < zooAnimals.length) {
			while (textContains('每日签到').findOnce() == null) {
				zooAnimals[idx].click();
				sleep(2000);
			}
			toastLog("正在完成第：" + (idx + 1) + "/" + zooAnimals.length + " 个");
			sleep(1500);
			if (text('去完成').findOnce() == null) {
				toastLog('检测到当前任务已经完成，下一个');
				back();
				sleep(1500);
			} else {
				图鉴Click();
				back();
				sleep(1500);
			}
			idx = idx + 1;
			idContains("zooAnimalListBtnBattle").findOne();
			if (cnt == 2) {
				zooAnimals = textContains(".jpg").find();
			} else {
				zooAnimals = textContains(".png").find();
			}
		}
	}
	cnt = cnt - 1;
	idx = 0;
}


function 图鉴Click(i) {
	log('图鉴Click');
	text('去完成').findOne();
	clickComplete();
}


function 每日任务() {
	log('等待加载');
	func.sClick(textContains('领金币').findOne());
	sleep(2000);
	textContains('邀请好友助力').waitFor();
	sleep(800);
	clickComplete();
}


function clickComplete() {
	var indexText, detailText, unCompleteIdx;
	var index;
	if (selected == "每日任务") {
		index = 1;
	} else {
		index = 0;
	}
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
				unCompleteIdx = unComplete[index].indexInParent();
				log("去完成索引为：" + unCompleteIdx);
				indexText = unComplete[index].parent().child(unCompleteIdx - 1).text();	//浏览8秒可得，逛店8秒可得，浏览可得，浏览5个商品
				detailText = unComplete[index].parent().child(unCompleteIdx - 2).text();
				toastLog(indexText);
				log(detailText);
				if (indexText.indexOf('扩大商圈可得') != -1) {
					index = index + 1;
					continue;
				}

				if (indexText.indexOf('签到') != -1) {
					func.sClick(unComplete[index]);
					sleep(800);
					continue;
				}
				// 跳过入会的
				if (selected != "每日任务") {
					// 图鉴任务
					if (indexText.indexOf('完成任务') != -1) { nextStep = '浏览返回' }
					if (indexText.indexOf('成功入会') != -1) {
						index = index + 1;
						log("成功入会跳过");
						continue;
					}
				}

				// 正常任务
				if (indexText.indexOf('秒') != -1) { nextStep = '等待8秒' }
				if (indexText.indexOf('浏览可得') != -1) { nextStep = '浏览返回' }
				if (indexText.indexOf('浏览并关注') != -1) { nextStep = '浏览返回' }
				if (indexText.indexOf('逛店可得') != -1) { nextStep = '浏览返回' }
				if (indexText.indexOf('参与可得') != -1) { nextStep = '参与返回' }
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


function waitLog(cnt, textDetail) {
	while (cnt--) {
		toastLog(textDetail);
		sleep(2000);
	}
}


function after_click(textStr, details) {
	switch (textStr) {
		case '参与返回':
			log('参与返回');
			waitCompleteDisappear();
			sleep(2000);
			back();
			break;
		case '等待8秒':
			cnt = 1;
			log('等待8秒');
			waitCompleteDisappear();
			// 等待10秒 应该完成了
			sleep(10000);
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
	log('等待返回');
	if (selected == "每日任务") {
		textContains('邀请好友助力').waitFor();
	} else {
		textContains('每日签到').waitFor();
	}
	sleep(2500);
}


function waitCompleteDisappear() {
	while (text("去完成").findOnce() != null) {
		sleep(800);
		log("等待去完成消失");
	}
	toastLog("去完成已消失");
	sleep(1000);
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
		sleep(1000);
		func.sClick(textContains('确认授权并加入').findOnce())
	}
	sleep(1500);
}
//加购5个商品
function add_cart() {
	i = 0;
	var findDoller, childCnt;
	textContains('点购物车加购5个商品').findOne();
	childCnt = 4;
	while (childCnt != 5) {
		if (i >= 3) {
			scrollDown();
			sleep(4000);
		}
		textContains('¥').findOne();
		//点击商品加购物车按钮
		while (1) {
			try {
				findDoller = (textContains('¥').find()[i]).parent().child(5);
				break;
			}
			catch (e) {
				sleep(400);
				continue;
			}
		}
		func.sClick(findDoller);
		sleep(1000);
		while (textContains('点购物车加购5个商品').findOnce() == null) {
			back();
			sleep(800);
		}
		sleep(2000);
		try {
			childCnt = textContains('点购物车加购5个商品').findOnce().parent().childCount();
			log("当前已加购数量：" + childCnt);
		} catch (err) {
			log("加购失败")
		}

		i = i + 1;
	}
}

function back_way() {
	log('返回');
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
	try {
		func.sClick(idContains('m_common_tip').findOnce().parent().child(1).child(1).child(1).child(0).child(1));
		sleep(800);
		back();
	} catch (err) { }
	func.sClick(textContains('离开').findOnce());
	func.sClick(textContains('知道了').findOnce());
}