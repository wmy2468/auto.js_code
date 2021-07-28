auto.waitFor();
var func = require('func_list.js');

var i = 0;
var appName = '京东';
var koulingText, devModel;
var selected = func.dialogsWin(['每日任务', '图鉴'])
koulingText = "JJ-哆壹點#UERFi7iyja%咑開京岽app";
devModel = device.model;
// // 3个号互点
// switch (devModel) {
// 	// 小米手机，LM账号
// 	case "Redmi Note 7":
// 		koulingText = "JJ-哆壹點#UERFi7iyja%咑開京岽app";
// 		break;
// 	// 荣耀手机，LP账号
// 	case "FRD-AL00":
// 		koulingText = "LM 塊幫我點，紅包哆壹點#F5mAY3zZJa%后扌丁开乛倞崬";
// 		break;
// 	// 华为手机，JJ账号
// 	case "TAS-AL00":
// 		koulingText = "LP，紅包哆壹點#EDYr74euba@咑開京岽app";
// 		break;
// }

main();

function main() {
	setClip(koulingText);
	sleep(1000);
	log("正在打开");
	func.toApp(appName);
	process();
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
		// 如果是小米或荣耀8或华为 则助力
		if (isMyDevice()) {
			func.sClick(closeBtnHelp.parent().parent().child(1));	// 点击助力
		} else {
			func.sClick(closeBtnHelp.parent().parent().child(2));   // 关闭助力
		}
	} else {
		// 0524 未更新
		log('为TA助力为空')
		func.sClick(closeBtnHelp.parent().parent().parent().child(1));
	}

	//等待完全加载后，如果出现取消按钮会找不到
	while (textContains('邀请好友助力').findOnce() == null) {
		func.sClick(className("Image").text("c143642ad0850f7a").findOnce());
		checkPopUp();
		func.sClick(text('取消').findOnce());
		func.sClick(textContains('收下').findOnce());
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
	}
}


function isMyDevice() {
	let devModel = device.model;
	if (devModel == "FRD-AL00" || devModel == "Redmi Note 7" || devModel == "TSA-AL00") {
		return true;
	} else {
		return false;
	}
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
				break;
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
		cnt = cnt - 1;
		idx = 0;
	}
}


function 图鉴Click(i) {
	log('图鉴Click');
	text('去完成').findOne();
	clickComplete();
	log('图鉴Click_complete');
}


function 每日任务() {
	log('等待加载');
	sleep(2000);
	textContains('邀请好友助力').waitFor();
	sleep(800);
	clickComplete();
}


function clickComplete() {
	var indexText, detailText, unCompleteIdx;
	var index = 1;
	while (text('去完成').exists()) {
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
				detailText = unComplete[index].parent().child(unCompleteIdx - 7).text(); // 去逛家电买大屏看奥运
				log("indexText：" + indexText);
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
					if (devModel == "Redmi Note 7") {
						index = index + 1;
						continue;
					} else { nextStep = '加购物车'; }
				} else if (indexText.indexOf('成功入会') != -1) {
					nextStep = '加入会员';
				} else {
					index = index + 1;
					continue;
				}
				// 详细描述校验，校验小程序
				if (detailText.indexOf('小程序') != -1) {
					// 除了Mate 30外，另外2个台古董在小程序卡死
					if (devModel == "TAS-AL00") {
						nextStepDetail = '小程序';
					} else {
						index = index + 1;
						continue;
					}
				} else if (detailText.indexOf('去逛美妆护肤爆款会场') != -1) {
					nextStepDetail = '小程序';
				} else if (detailText.indexOf('9.9元') != -1) {
					nextStepDetail = '小程序'
				} else if (detailText.indexOf('金融神券') != -1) {
					nextStepDetail = '金融2次返回'
				} else if (detailText.indexOf('去逛京友圈') != -1) {
					nextStepDetail = '京友圈';
				} else if (detailText.indexOf('京享值PK赢') != -1) {
					nextStepDetail = '金融2次返回';
				} else if (detailText.indexOf('领百亿购物金') != -1) {
					nextStepDetail = '20秒等待';
				} else if (detailText.indexOf('来东东超市') != -1) {
					// 点击完成按钮返回
					nextStepDetail = 'imgClick';
				} else if (detailText.indexOf('去养狗兑京豆') != -1) {
					index = index + 1;
					continue;
				} else {
					nextStepDetail = '无';
				}
				func.sClick(unComplete[index]);
				log("nextStep：" + nextStep);
				log("nextStepDetail：" + nextStepDetail);
				toastLog("detailText：" + detailText);
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
			break;
		case '等待8秒':
			cnt = 11;
			log('等待8秒');
			waitCompleteDisappear();
			// 等待11秒 应该完成了
			sleep(11000);
			break;
		case '浏览返回':
			log('浏览返回');
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
	// 确保已经切换回京东APP

	if (details == '20秒等待') {
		toastLog("加载巨慢额外等待10秒");
		sleep(10000);
		back_way();
	} else if (details == '金融2次返回') {
		log("金融返回");
		back_way();
		sleep(2000);
		if (currentPackage() != "com.jingdong.app.mall") {
			func.toApp(appName);
		}
		sleep(3000);
		back_way();
	} else if (details == '小程序') {
		log('微信返回');
		i = 10;
		toastLog('跳转到小程序，等待20秒');
		sleep(10000);
		if (currentPackage() != "com.jingdong.app.mall") {
			waitLog(5, '等待一会儿..跳转回JD');
			func.toApp(appName);
		}
	} else if (details == 'imgClick') {
		func.sClick(desc('关闭页面').findOnce());
		sleep(3000);
	} else {
		// 返回
		back_way();
		sleep(3000);
	}

	log('等待返回');
	if (selected == "每日任务" || selected == "金融领金币") {
		if (textContains('邀请好友助力').findOnce() == null) { back_way(); }
		textContains('邀请好友助力').findOne();
	} else {
		if (textContains('每日签到').findOnce() == null) { back_way(); }
		textContains('每日签到').findOne();
	}
	sleep(1000);
	log('已返回');
}


function waitCompleteDisappear() {
	var cnt = 0;
	while (textContains("邀请好友助力").findOnce() != null) {
		sleep(800);
		log("等待去完成消失");
		cnt = cnt + 1;
		if (cnt > 10) {
			break;
		}
	}
	toastLog("去完成已消失");
	sleep(1000);
}

// 浏览5个商品
function view_list() {
	i = 0;
	var dollerText = "￥";
	var findDoller;
	while (text('已完成').findOnce() == null) {
		textContains(dollerText).findOne();
		//点击商品加购物车按钮
		while (1) {
			try {
				findDoller = (textContains(dollerText).find()[i]).parent().parent();
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
	sleep(1000);
	if (textContains('确认授权并加入').findOnce() == null) {
		return 0;
	}
	while (1) {
		log('加会员');
		sleep(2000);
		if (func.cClick(textContains('确认授权并加入').findOnce())) {
			break;
		}
	}
	sleep(1500);
	back();
	sleep(1500);
}

//加购5个商品
function add_cart() {
	i = 0;
	var addText, dollerText = "￥";
	var findDoller;
	addText = '点购物车加购5个商品';
	var addCartText = textContains(addText).findOne();
	var childCnt2, childCnt1;
	childCnt1 = addCartText.parent().childCount();
	childCnt2 = childCnt1;
	while (childCnt1 == childCnt2) {
		if (devModel == "FRD-AL00") {
			if (i >= 3) {
				scrollDown();
				sleep(4000);
			}
		}
		textContains(dollerText).findOne();
		//点击商品加购物车按钮
		while (1) {
			try {
				findDoller = (textContains(dollerText).find()[i]).parent().child(4);
				break;
			}
			catch (e) {
				sleep(400);
				continue;
			}
		}
		func.sClick(findDoller);
		sleep(2000);
		addCartText = textContains(addText).findOnce();
		while (addCartText == null) {
			back_way();
			sleep(2500);
			addCartText = textContains(addText).findOnce();
		}
		sleep(1000);
		childCnt2 = addCartText.parent().childCount();
		toastLog("childCount1: " + childCnt1 + " / childCount2: " + childCnt2);
		sleep(1000);
		i = i + 1;
	}
}

function back_way() {
	sleep(800);
	if (textContains('去完成').findOnce() == null && (textContains('邀请好友助力').findOnce() == null
		|| textContains('每日签到').findOnce() == null)) {
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
		// if (textContains('邀请好友助力').findOnce() == null) {
		// 	func.sClick(className("android.widget.ImageView").depth(11).findOnce());
		// }
		// func.sClick(id('com.jd.lib.jshop:id/fe').findOnce());
		func.sClick(id('com.jd.lib.jshop:id/asj').findOnce());
		func.sClick(id('com.jd.lib.jshop.feature:id/gd').findOnce());
		func.sClick(id('com.jd.lib.jshop.feature:id/mj').findOnce());
		// func.sClick(desc('关闭页面').findOnce());
		func.sClick(idContains('close').findOnce());
		func.sClick(textContains('离开').findOnce());
		func.sClick(textContains('我要离开').findOnce());
		func.sClick(textContains('放弃').findOnce());
		func.sClick(textContains('知道了').findOnce());
		func.sClick(textContains('待会再来').findOnce());
		log('返回');
	} else {
		log("已在去完成界面");
	}
}