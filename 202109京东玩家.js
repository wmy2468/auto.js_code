auto.waitFor();
var func = require('func_list.js');

var i = 0;
var appName = '京东';
var koulingText, devModel, selected;
selected = "每日任务";
// var selected = func.dialogsWin(['每日任务', '图鉴'])
koulingText = "21.0复制整段话 Https:/JleNO0uhZGi1YB 来【东东玩家】探索好玩星球分现金红包！#41aPpAsQIPmDMg%扌丁kai鶁崠";
devModel = device.model;

main();

function main() {
	var sMission;
	sMission = func.dialogsWin(['做任务', '互助']);
	switch (sMission) {
		case "做任务":
			做任务();
			break;
		case "互助":
			互助();
			break;
	}
	setClip("");
	alert('已完成');
}

function 做任务() {
	toastLog("启动！！！");
	setClip(koulingText);
	sleep(1000);
	log("正在打开");
	func.toApp(appName);
	process();
}

function 互助() {
	toastLog("启动！！！");
	var kouling1, kouling2;
	// "JJ 【东东玩家】探索好玩星球分现金红包！#41aPpAsQIPmDMg%扌丁kai鶁崠"
	// "LP 好玩星球等你探索！￥946lNE0fgjRvAG￥祛→【猄〤崬】"
	// "LM 五亿现金等你瓜分da#3Cs6aFW3wdrr6x@→打幵椋東ΛΡΡ←"
	switch (device.model) {
		// 荣耀8
		case "FRD-AL00":
			kouling1 = "LM 五亿现金等你瓜分da#3Cs6aFW3wdrr6x@→打幵椋東ΛΡΡ←";
			kouling2 = "JJ 探索好玩星球分现金红包！#41aPpAsQIPmDMg%扌丁kai鶁崠";
			break;
		case "Redmi Note 7":
			kouling1 = "LP 好玩星球等你探索！￥946lNE0fgjRvAG￥祛→【猄〤崬】";
			kouling2 = "JJ 探索好玩星球分现金红包！#41aPpAsQIPmDMg%扌丁kai鶁崠";
			break;
		// 华为Mate 30
		case "TSA-AL00":
			kouling1 = "LP 好玩星球等你探索！￥946lNE0fgjRvAG￥祛→【猄〤崬】";
			kouling2 = "LM 五亿现金等你瓜分da#3Cs6aFW3wdrr6x@→打幵椋東ΛΡΡ←";
			break;
	}
	log("kouling1:" + kouling1);
	log("kouling2:" + kouling2);
	setClip(kouling1);
	互助点击();
	setClip(kouling2);
	互助点击();
}

function 互助点击() {
	func.toApp(appName);
	log("正在等待进入活动页面");
	//等待点击 立即查看按钮
	func.sClick(className("TextView").textContains("立即").findOne());
	// 点击助力
	func.sClick(textContains('为TA').findOne());
	// 延迟等待
	sleep(2000);
	home();
	sleep(2000);
}
// function isMyDevice() {
// 	let devModel = device.model;
// 	if (devModel == "FRD-AL00" || devModel == "Redmi Note 7" || devModel == "TSA-AL00") {
// 		return true;
// 	} else {
// 		return false;
// 	}
// }

function process() {
	log("正在等待进入活动页面");
	//等待点击 立即查看按钮
	func.sClick(className("TextView").textContains("立即").findOne());
	// 点击助力
	func.sClick(textContains('为TA').findOne());
	//等待完全加载后，如果出现取消按钮会找不到
	var btn;		// 点击出现弹窗的按钮
	while (textContains('邀请好友助力').findOnce() == null) {
		if (devModel == "FRD-AL00") {
			btn = className("android.view.View").textContains("00/").findOnce();
		} else {
			btn = className("android.view.View").text("/").findOnce();
		}
		if (btn != null) {
			func.sClick(btn.parent().parent());
		}
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

function checkPopUp() {
	var lottery, iKnow, curCnt;
	try {
		iKnow = text('我知道了').findOnce();
		if (iKnow != null) {
			iKnow.click();
			log('我知道了取消');
			sleep(800);
		}
		lottery = text('立即抽奖').findOnce();
		if (lottery != null) {
			log('立即抽奖取消');
			func.sClick(lottery.parent().parent().child(2));
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
		func.sClick(text('继续探索赢红包').findOnce());
	} catch (e) {
		log("error, continue");
	}
}

function 每日任务() {
	log('等待加载');
	sleep(2000);
	textContains('邀请好友助力').waitFor();
	sleep(800);
	clickComplete();
}

function 图鉴() {
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
			log("对比去完成长度和既定值" + unComplete.length <= index)
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

				// 正常任务
				if (indexText.indexOf('秒') != -1) {
					nextStep = '等待8秒';
				} else if (indexText.indexOf('S可') != -1) {
					nextStep = '等待8秒';
				} else if (indexText.indexOf('浏览可得') != -1) {
					nextStep = '浏览返回';
				} else if (indexText.indexOf('浏览会场可得') != -1) {
					nextStep = '浏览返回';
				} else if (indexText.indexOf('浏览并关注') != -1) {
					nextStep = '浏览返回';
				} else if (indexText.indexOf('成功关注') != -1) {
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
				} else if (indexText.indexOf('开通品牌会员') != -1) {
					nextStep = '加入会员';
				} else {
					index = index + 1;
					continue;
				}

				// 详细描述校验，校验小程序
				if (detailText.indexOf('小程序') != -1) {
					nextStepDetail = '小程序';
					// 除了Mate 30外，另外2个台古董在小程序卡死
					// if (devModel == "TAS-AL00") {
					// 	nextStepDetail = '小程序';
					// } else {
					// 	index = index + 1;
					// 	continue;
					// }
				} else if (detailText.indexOf('去企有此礼赢取好礼') != -1) {
					nextStepDetail = '页面含邀请好友';
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
				} else if (detailText.indexOf('东东超市') != -1) {
					nextStepDetail = '东东超市';		// 点击完成按钮返回
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
	var toDoPage;
	toDoPage = "邀请好友助力";
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
	} else if (details == '东东超市') {
		sleep(4000);
		while (textContains('邀请好友助力').findOnce() == null) {
			back();
			sleep(3000);
		}
	} else if (details == '页面含邀请好友') {
		log('页面含邀请好友');
		toDoPage = "8000好玩豆";
	} else {
		// 返回
		back_way();
		sleep(3000);
	}

	log('等待返回');
	if (selected == "每日任务" || selected == "金融领金币") {
		if (textContains(toDoPage).findOnce() == null) {
			back_way(toDoPage);
		}
		textContains(toDoPage).findOne();
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
	var authority, authorited;
	authorited = false;		// 表示是否勾选授权
	while (1) {
		log('加会员');
		authority = textContains('确认授权即同意').findOnce();
		if (authority != null) {
			if (func.cClick(authority.parent().child(0))) {
				authorited = true;
			}
		}
		sleep(2000);
		if (authorited) {
			if (text("姓名").findOnce() != null) {
				if (setText(1, "老陈")) {
					sleep(1500);
					back();
				}
			}
			if (text("邮箱").findOnce() != null) {
				if (setText(2, "273343029@qq.com")) {
					sleep(1500);
					back();
				}
			}
			if (text("生日").findOnce() != null) {
				func.sClick(className("android.widget.Spinner").findOne());
				sleep(1000);
				func.sClick(text("确定").findOnce());
				sleep(1000);
			}
			sleep(2000);
			if (func.cClick(textContains('确认授权并加入').findOnce())) {
				sleep(2000);
				break;
			}
		}
	}
	func.sClick(desc('关闭页面').findOnce());
	sleep(2200);
	back_way();
	sleep(1500);
}

//加购5个商品
function add_cart() {
	i = 0;
	var addText, dollerText = "￥";
	var findDoller;
	addText = '点购物车加购5个商品';
	var addCartText = textContains(addText).findOne();
	var completeText;
	completeText = addCartText.parent().child(2).text();

	while (completeText.indexOf('还差') != -1) {
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
		completeText = addCartText.parent().child(2).text();
		toastLog("current text: " + completeText);
		sleep(1000);
		i = i + 1;
	}
}

function back_way(toDoPage) {
	if (toDoPage == undefined) {
		toDoPage = "邀请好友助力";
	} else if (toDoPage == '8000好玩豆') {
		back();
		sleep(2000);
		return 0;
	}
	sleep(800);
	if (textContains('去完成').findOnce() == null && (textContains(toDoPage).findOnce() == null
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

		func.sClick(id('com.jd.lib.jshop:id/ge').findOnce());
		func.sClick(id('com.jd.lib.jshop:id/asj').findOnce());
		func.sClick(id('com.jd.lib.jshop.feature:id/gd').findOnce());
		func.sClick(id('com.jd.lib.jshop.feature:id/mj').findOnce());

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