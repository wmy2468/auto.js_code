auto.waitFor();
var func = require('func_list.js');

var 小米双开 = true;

var i = 0;
var k;
var appName, koulingText;
var selectedArr = ['每日任务', '图鉴', "金融领金币"];
var selectIndex = dialogs.select('选择启动的功能', selectedArr);
if (selectIndex != 2) {
	appName = '京东';
	koulingText = "24.0复制整段话 Https:/JUWzIzbq3E8tGV幇幇莪！解鎻憅粅聅萠%R9JUj8Qf2b@去→倞東 go！";
}
else {
	appName = '京东金融';
	koulingText = "26.0复制整段话 http:/J2hWLtQf6CBwZx憅粅聅萠①起唻嗨怶，趚唻t#zBN3N7BIUb%しǎι【京東】ＡΡΡの";
}
if (selectIndex == -1) { exit() };
// 数字从0开始。
var selected = selectedArr[selectIndex];
var devBrand = device.brand;
main();

function main() {
	setClip(koulingText);
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
			setClip(koulingText);
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
	func.sClick(className("TextView").textContains("立即").findOne());

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
	while (textContains('邀请好友助力').findOnce() == null) {
		func.sClick(textContains('领金币').findOnce());
		checkPopUp();
		func.sClick(text('取消').findOnce());
		func.sClick(text('立即收下').findOnce());
		sleep(1000);
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
		case '金融领金币':
			金融领金币();
			break;
	}
}


function 金融领金币() {
	log('等待加载');
	func.sClick(textContains('领金币').findOne());
	sleep(2000);
	textContains('邀请好友助力').waitFor();
	sleep(800);
	clickComplete();
}

function checkPopUp() {
	var lottery, iKnow, curCnt;
	iKnow = text('我知道了').findOnce();
	if (iKnow != null) {
		iKnow.click();
		log('我知道了取消');
		sleep(800);
	}
	lottery = text('立即抽奖').findOnce();
	if (lottery != null) {
		curCnt = lottery.indexInParent();
		log('立即抽奖取消');
		func.sClick(lottery.parent().child(curCnt + 1));
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
				log("图鉴click");
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
	if (selected == "每日任务" || selected == "金融领金币") {
		index = 1;
	} else {
		index = 0;
	}
	while (textContains('去完成').exists()) {
		var nextStep, nextStepDetail;
		nextStep = '';
		nextStepDetail = '';
		if (text("已完成").findOnce() != null) {
			sleep(2000);
		}
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
				if (indexText.indexOf('秒') != -1) {
					nextStep = '等待8秒';
				} else if (indexText.indexOf('浏览可得') != -1) {
					nextStep = '浏览返回';
				} else if (indexText.indexOf('浏览并关注') != -1) {
					nextStep = '浏览返回';
				} else if (indexText.indexOf('逛店可得') != -1) {
					nextStep = '浏览返回';
				} else if (indexText.indexOf('参与可得') != -1) {
					nextStep = '参与返回';
				} else if (indexText.indexOf('浏览5个') != -1) {
					nextStep = '浏览商品';
				} else if (indexText.indexOf('加购5个') != -1) {
					nextStep = '加购物车';
				} else if (indexText.indexOf('成功入会') != -1) {
					nextStep = '加入会员';
				} else {
					index = index + 1;
					continue;
				}
				// 详细描述校验，校验小程序
				if (detailText.indexOf('小程序') != -1) {
					nextStepDetail = '小程序';
				} else if (detailText.indexOf('去逛美妆护肤爆款会场') != -1) {
					nextStepDetail = '小程序';
				} else if (detailText.indexOf('限时抢9.9元爆品') != -1) {
					nextStepDetail = '小程序'
				} else if (detailText.indexOf('去逛京友圈') != -1) {
					nextStepDetail = '京友圈';
				}


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
	switch (textStr) {
		case '参与返回':
			log('参与返回');
			waitCompleteDisappear();
			sleep(2000);
			back_way();
			break;
		case '等待8秒':
			cnt = 1;
			log('等待8秒');
			waitCompleteDisappear();
			// 等待11秒 应该完成了
			sleep(11000);
			back_way();
			break;
		case '浏览返回':
			log('浏览返回');
			back_way();
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
	// 判断是否被微信小程序跳转到了微信
	if (details == '小程序') {
		log('微信返回');
		i = 10;
		toastLog('跳转到小程序，等待20秒');
		if (currentPackage() != "com.jingdong.app.mall") {
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
		}
		sleep(2500);
	}
	log('等待返回');
	if (selected == "每日任务" || selected == "金融领金币") {
		textContains('邀请好友助力').waitFor();
	} else {
		textContains('每日签到').waitFor();
	}
	log('已返回');
	sleep(3000);
}


function waitCompleteDisappear() {
	var cnt = 0;
	while (textContains("邀请好友助力").findOnce() != null) {
		sleep(800);
		log("等待去完成消失");
		cnt = cnt + 1;
		if (cnt > 20) {
			break;
		}
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
			sleep(1500);
		}
		sleep(1000);
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
	sleep(800);
	var backBtn = desc('返回').findOnce();
	if (backBtn == null) {
		back();
	} else {
		if (backBtn.clickable()) {
			backBtn.click();
		} else {
			func.sClick(backBtn);
		}
	}
	sleep(2000);
	if (textContains('邀请好友助力').findOnce() == null) {
		func.sClick(className("android.widget.ImageView").depth(11).findOnce());
	}
	func.sClick(id('com.jd.lib.jshop:id/asj').findOnce());
	func.sClick(id('com.jd.lib.jshop:id/fe').findOnce());
	func.sClick(id('com.jd.lib.jshop.feature:id/gd').findOnce());
	func.sClick(id('com.jd.lib.jshop.feature:id/mj').findOnce());
	func.sClick(desc('关闭页面').findOnce());
	func.sClick(idContains('close').findOnce());
	func.sClick(textContains('离开').findOnce());
	func.sClick(textContains('我要离开').findOnce());
	func.sClick(textContains('放弃').findOnce());
	func.sClick(textContains('知道了').findOnce());
	func.sClick(textContains('待会再来').findOnce());
	log('返回');
}