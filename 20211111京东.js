// sleep(600) =>
// sleep(random_second(540, 60, 900));
// sleep(800) =>
// sleep(random_second(720, 80, 900));
// sleep(1000) =>
// sleep(random_second(900, 100, 300));
// sleep(1500) =>
// sleep(random_second(1350, 150, 450));
// sleep(2000) =>
// sleep(random_second(1800, 200, 600));
// sleep(3000) =>
// sleep(random_second(2700, 300, 900));
auto.waitFor();
var func = require("func_list.js");

var cnt = 0;
var appName = "京东";
var koulingText, devModel, selected;
selected = "每日任务";
koulingText = "12.0:/#EAuKH9sf6MOjCf@，⛅﹎壹啓ɡμā汾20億!!!!!！ぷ";
devModel = device.model;
var devMate30, devHonor8, devRedMi;
devMate30 = "TAS-AL00";
devHonor8 = "FRD-AL00";
devRedMi = "Redmi Note 7";


main();
// 金融任务();

function main() {
	var sMission;
	sMission = func.dialogsWin(["做任务", "金融任务", "互助"]);
	switch (sMission) {
		case "做任务":
			做任务();
			break;
		case "金融任务":
			金融任务();
			break;
		case "互助":
			互助();
			break;
	}
	setClip("");
	console.clear();
	alert("已完成");
}

// --------------------------大任务汇总区-----------------------------
// --------------------------京东任务-----------------------------
function 做任务() {
	toastLog("启动！！！");
	首页banner启动();
	开始做任务();
}

// -------------------------金融任务----------------------------
function 金融任务() {
	appName = "京东金融";
	func.toApp(appName);
	while (!mission_page_check()) {
		func.sClick(id("com.jd.jrapp:id/redPacketIV").findOnce());
		toastLog("金融任务: 请跳转金融APP，如果首页没有入口按钮，需手动跳转到活动界面");
		sleep(2000);
	}
	toastLog("金融任务: 已找到打卡领红包 打卡领红包");
	sleep(random_second(2000, 100, 500));
	// 点击任务按钮
	while (!is_in_invite_friend_page()) {
		try {
			// 点击任务按钮
			if (click_mission_btn()) {
				sleep(3000);
				break;
			}
		} catch (e) {
			log("金融任务: error" + e);
			continue;
		}
	}
	//延迟3秒
	toastLog("金融任务: 延迟3秒，准备启动！");
	sleep(3000);
	clickComplete();
}

// -------------------------互助任务----------------------------
function 互助() {
	toastLog("互助: 启动！！！");
	var kouling1, kouling2;
	switch (device.model) {
		// 荣耀8
		case devHonor8:
			kouling1 = "16.0:/￥E8BzGFzUiiTR7S￥，⛅﹎壹啓ɡμā汾20億!!!!!！ぷ";	//LM
			kouling2 = "12.0:/#EAuKH9sf6MOjCf@，⛅﹎壹啓ɡμā!!!！ぷ";		// JJ
			break;
		case devRedMi:
			kouling1 = " 11.0:/￥JDpplF8ATGDmSO%，☃﹎壹!!!！ぷ";		// LP
			kouling2 = "12.0:/#EAuKH9sf6MOjCf@，⛅﹎壹啓ɡμā汾20億!!!!!！ぷ";		// JJ
			break;
		// 华为Mate 30
		case devMate30:
			kouling1 = " 11.0:/￥JDpplF8ATGDmSO%，☃﹎壹啓ɡμā汾20億!!!!!！ぷ";		//LP
			kouling2 = "16.0:/￥E8BzGFzUiiTR7S￥，汾20億!!!!!！ぷ";	//LM
			break;
		default:
			alert("互助: 非预设机型，不执行");
			return 0;
	}
	log("互助: kouling1:" + kouling1);
	log("互助: kouling2:" + kouling2);
	setClip(kouling1);
	互助点击();
	setClip(kouling2);
	互助点击();
}
// --------------------------大任务汇总区-----------------------------


function 开始做任务() {
	log("开始做任务: 正在等待进入活动页面");
	//等待完全加载后，如果出现取消按钮会找不到
	var find_object, find_object_index, find_object_parent;	// 定义查找的变量
	while (!is_in_invite_friend_page()) {
		// --------------关闭各种弹窗----------------
		try {
			// 关闭助力
			find_object = text("刚刚又有好友为你助力\n汪汪币又增加啦~").findOnce();
			if (find_object != null) {
				find_object_parent = find_object.parent();
				if (func.sClick(find_object_parent.child(find_object_parent.childCount() - 1))) { }		// 点击领取
				if (func.sClick(find_object_parent.child(find_object_parent.childCount() - 1))) {
					toastLog("开始做任务: 点击了 关闭助力");
					sleep(2000);
				}		// 点击领取
			} else {
				log("开始做任务: 未找到 好友助力");
			}

			// 关闭开启今日环游按钮
			find_object = text("欢迎加入热爱环游记！").findOnce();
			if (find_object != null) {
				find_object_parent = find_object.parent();
				find_object_index = find_object.indexInParent();
				if (func.sClick(find_object_parent.child(find_object_index - 1))) {		// 关闭环游按钮
					// if (func.sClick(find_object_parent.child(find_object_parent.childCount() - 1))) {		// 开启环游按钮
					toastLog("开始做任务: 点击了 关闭开启今日环游按钮");
					sleep(2000);
				}		// 点击领取
			} else {
				log("开始做任务: 未找到 今日环游");
			}
			// 关闭每日签到
			find_object = text("不要断签哦~别让大红包飞走").findOnce();
			if (find_object != null) {
				find_object_parent = find_object.parent().parent().parent().parent();
				if (func.sClick(find_object_parent.child(find_object_parent.childCount() - 1))) {
					toastLog("开始做任务: 点击了 关闭每日签到");
					sleep(2000);
				}
			} else {
				log("开始做任务: 未找到 每日签到");
			}
			// 关闭开心收下
			find_object = text("距离下一个红包还要签到").findOnce();
			if (find_object != null) {
				find_object_parent = find_object.parent().parent().parent();
				if (func.sClick(find_object_parent.child(1))) {
					toastLog("开始做任务: 点击了 关闭开心收下");
					sleep(2000);
				}
			} else {
				log("开始做任务: 未找到 红包开心");
			}
			// 点击任务按钮
			if (click_mission_btn()) {
				sleep(3000);
				break;
			}
			toastLog("开始做任务: 正在查找 邀请好友助力 界面");
			sleep(3000);
		} catch (e) {
			log("开始做任务: error" + e);
			continue;
		}
	}
	//延迟3秒
	toastLog("开始做任务: 延迟3秒，准备启动！");
	sleep(3000);
	clickComplete();
}

function clickComplete() {
	log("clickComplete: 去完成");
	var indexText, detailText;
	// 查找的关键字， 去完成小标题， 去完成 小标题s，去完成小标题 父控件, 去完成按钮
	var key_word, todo_mini_title, todo_mini_titles, todo_mini_titles_length, todo_mini_title_parent, btn_todo;
	var index_todo_now, index_todo;
	index_todo_now = 1;
	exit_cnt = 0;
	key_word = "000汪汪币"
	// 创建线程用于判断，单个任务超时5分钟则退出
	var lock = threads.lock();
	var run_count = 0;
	threads.start(function () {
		while (true) {
			log("threads-run_count:" + run_count);
			sleep(5000);
			lock.lock();
			run_count = run_count + 1;
			// log("threads-run_count:" + run_count);
			lock.unlock();
			// 超过5分钟未执行完任务，则退出
			if (run_count > (12 * 3)) {
				toastLog("threads exits");
				exit();
			}
		}
	})
	// while (is_in_invite_friend_page()) {
	while (is_in_invite_friend_page()) {
		log("clickComplete: 进入查找环节");
		var nextStep, nextStepDetail;
		nextStep = "";
		nextStepDetail = "";
		sleep(800);
		// todo_mini_titles = className("android.view.View").textEndsWith(key_word).find();
		todo_mini_titles = className("Image").text("047afc56e31d6d4b").findOne().parent().parent().findByText(key_word);
		//toastLog(unComplete.length);
		// if (todo_mini_titles.nonEmpty()) {
		if (!todo_mini_titles.empty) {
			todo_mini_titles_length = todo_mini_titles.size();
			log("clickComplete: 去完成长度:" + todo_mini_titles_length + ",和既定值:" + index_todo_now);
			if (todo_mini_titles_length <= index_todo_now) {
				toastLog("clickComplete: 去完成长度剩余:" + todo_mini_titles_length);
				break;
			} else {
				// todo_mini_title = todo_mini_titles[index_todo_now];		//选择第一个
				todo_mini_title = todo_mini_titles.get(index_todo_now);		//选择第一个
				todo_mini_title.text()
				// 如果不是去完成列表中，则todo index + 1
				if ((todo_mini_title.indexInParent() != 2 && (todo_mini_title.text()).indexOf("可得") == -1)
					|| (todo_mini_title.text()).indexOf("每邀1个好友可得") != -1) {
					index_todo_now = index_todo_now + 1;
					toastLog("clickComplete: 不是去完成列表或是邀请好友，index + 1");
					continue;
				}
				// indexText 为小标题
				indexText = todo_mini_title.text();					//浏览8秒可得，逛店8秒可得，浏览可得，浏览5个商品
				todo_mini_title_parent = todo_mini_title.parent(); 				// 查找父控件
				index_todo = todo_mini_title.indexInParent();		// 查找在父控件中的 索引值-1等于大标题，+1等于 去完成按钮
				log("clickComplete: 去完成索引为：" + index_todo_now);
				btn_todo = todo_mini_title_parent.child(index_todo + 1);					// 去完成按钮
				detailText = todo_mini_title_parent.child(index_todo - 1).text(); // 去逛家电买大屏看奥运
				log("clickComplete: 任务小标题indexText：" + indexText);
				log("clickComplete: 任务大标题detailText：" + detailText);

				// 判断当前任务是否已完成
				// log("-4位置:" + detailText.slice(-4, -3) + ",-2位置:" + detailText.slice(-2, -1));
				if (detailText.slice(-4, -3) == detailText.slice(-2, -1)) {
					index_todo_now = index_todo_now + 1;
					console.clear();			// 当前任务正常完成，可以清除前面的日志
					toastLog("clickComplete: 当前任务" + detailText + "完成， index + 1");
					continue;
				}

				if (indexText.indexOf("扩大商圈可得") != -1) {
					index_todo_now = index_todo_now + 1;
					continue;
				}

				if (indexText.indexOf("签到") != -1) {
					func.sClick(btn_todo);
					sleep(800);
					continue;
				}

				// 正常任务
				if (indexText.indexOf("秒") != -1) {
					nextStep = "等待8秒";
				} else if (indexText.indexOf("S可") != -1) {
					nextStep = "等待8秒";
				} else if (indexText.indexOf("s可") != -1) {
					nextStep = "等待8秒";
				} else if (indexText.indexOf("城城") != -1) {
					nextStep = "点击分现金按钮";
					// } else if (indexText.indexOf("点击首页浮层") != -1) {
					// 	nextStep = "点击一下 啥也不干";
				} else if (indexText.indexOf("成功入会") != -1) {
					nextStep = "加入会员";
					if (!(devModel == devRedMi || devModel == devHonor8 || devModel == devMate30)) {
						index_todo_now = index_todo_now + 1;
						toastLog("非本人设备 无法处理会员，index + 1");
						continue;
					}
				} else if (indexText.indexOf("开通品牌会员") != -1) {
					nextStep = "加入会员";
					if (!(devModel == devRedMi || devModel == devHonor8 || devModel == devMate30)) {
						index_todo_now = index_todo_now + 1;
						toastLog("非本人设备 无法处理会员，index + 1");
						continue;
					}
				} else if (indexText.indexOf("浏览可得") != -1) {
					if (detailText.indexOf("去种草城") != -1) {
						toastLog("clickComplete: 发现 种草城");
						nextStep = "种草城";
					} else {
						nextStep = "浏览返回";
					}
				} else if (indexText.indexOf("浏览会场可得") != -1) {
					nextStep = "浏览返回";
				} else if (indexText.indexOf("逛晚会页可") != -1) {
					nextStep = "浏览返回";
				} else if (indexText.indexOf("浏览即可得") != -1) {
					nextStep = "浏览返回";
				} else if (indexText.indexOf("浏览并关注") != -1) {
					nextStep = "浏览返回";
				} else if (indexText.indexOf("成功关注") != -1) {
					nextStep = "浏览返回";
				} else if (indexText.indexOf("逛店可得") != -1) {
					nextStep = "浏览返回";
				} else if (indexText.indexOf("参与可得") != -1) {
					nextStep = "参与返回";
				} else if (indexText.indexOf("浏览5个品牌墙店铺") != -1) {
					index_todo_now = index_todo_now + 1;
					toastLog("clickComplete: 浏览品牌墙-跳过，index + 1");
					continue;
				} else if (indexText.indexOf("浏览5个商品可得") != -1) {
					nextStep = "浏览商品";
				} else if (indexText.indexOf("浏览5个") != -1) {
					nextStep = "浏览商品";
				} else if (indexText.indexOf("加购5个") != -1) {
					nextStep = "加购物车";
				} else {
					index_todo_now = index_todo_now + 1;
					toastLog("clickComplete: 未找到满足条件的任务描述-小字，index + 1");
					continue;
				}

				// 详细描述校验，校验小程序
				if (detailText.indexOf("小程序") != -1) {
					nextStepDetail = "小程序";
				} else if (detailText.indexOf("去企有此礼赢取好礼") != -1) {
					nextStepDetail = "页面含邀请好友";
				} else if (detailText.indexOf("去逛美妆护肤爆款会场") != -1) {
					nextStepDetail = "小程序";
				} else if (detailText.indexOf("2.9元洗衣液限时") != -1) {
					nextStepDetail = "小程序";
				} else if (detailText.indexOf("9.9元") != -1) {
					nextStepDetail = "小程序"
				} else if (detailText.indexOf("金融神券") != -1) {
					nextStepDetail = "金融2次返回"
				} else if (detailText.indexOf("去逛京友圈") != -1) {
					nextStepDetail = "京友圈";
				} else if (detailText.indexOf("京享值PK赢") != -1) {
					nextStepDetail = "金融2次返回";
				} else if (detailText.indexOf("领百亿购物金") != -1) {
					nextStepDetail = "20秒等待";
				} else if (detailText.indexOf("东东超市") != -1) {
					nextStepDetail = "需要多次点击返回";		// 点击完成按钮返回
				} else if (detailText.indexOf("去财富岛") != -1) {
					nextStepDetail = "需要多次点击返回";		// 点击完成按钮返回
				} else if (detailText.indexOf("去养狗兑京豆") != -1) {
					index_todo_now = index_todo_now + 1;
					continue;
				} else {
					nextStepDetail = "无";
				}

				// 除了Mate 30外，另外2个台古董在小程序卡死
				if (devModel == devHonor8 && nextStepDetail == "小程序") {
					index_todo_now = index_todo_now + 1;
					continue;
				}

				func.sClick(btn_todo);
				toastLog("clickComplete: 已点击按钮");
				log("clickComplete: 下一步动作nextStep：" + nextStep);
				log("clickComplete: 下一步动作细节描述nextStepDetail：" + nextStepDetail);
				sleep(1500);
				after_click(nextStep, nextStepDetail);
				// after click之后，如果在时间范围内，将计数值置0
				lock.lock();
				run_count = 0;
				lock.unlock();
			}
		}
	}
}


function after_click(textStr, details) {
	switch (textStr) {
		case "点击分现金按钮":
			城城现金();
			break;
		case "种草城":
			种草城();
			break;
		case "参与返回":
			log("after_click: 参与返回");
			waitCompleteDisappear();
			sleep(random_second(3000, 300, 900));
			break;
		case "等待8秒":
			log("after_click: 等待8秒");
			waitCompleteDisappear();
			// 等待11秒 应该完成了
			toastLog("去完成消失，延迟10秒返回");
			sleep(random_second(10500, 100, 1000));
			break;
		case "浏览返回":
			log("after_click: 浏览返回");
			waitCompleteDisappear();
			break;
		case "浏览商品":
			log("after_click: 浏览商品");
			add_cart(123);
			break;
		case "加购物车":
			log("after_click: 加购物车");
			add_cart();
			break;
		case "加入会员":
			log("after_click: 加入会员");
			member_card();
			break;
		default:
			break;
	}
	// 确保已经切换回京东APP

	if (details == "20秒等待") {
		toastLog("after_click: 加载巨慢额外等待10秒");
		sleep(random_second(10000, 100, 1000));
		back_way();
	} else if (details == "金融2次返回") {
		log("after_click: 金融返回");
		back_way();
		sleep(random_second(2000, 100, 1000));
		if (currentPackage() != "com.jingdong.app.mall") {
			func.toApp(appName);
		}
		sleep(random_second(3000, 100, 1000));
		back_way();
	} else if (details == "小程序") {
		log("after_click: 微信返回");
		toastLog("after_click: 跳转到小程序，等待20秒");
		sleep(10000);
		if (currentPackage() != "com.jingdong.app.mall") {
			cnt = 5;
			while (cnt--) {
				toastLog("after_click: 等待一会儿..跳转回JD");
				sleep(2000);
			}
			func.toApp(appName);
		}
	} else if (details == "需要多次点击返回") {
		sleep(random_second(800, 100, 1000));
		while (!is_in_invite_friend_page()) {
			back();
			sleep(random_second(2000, 100, 600));
		}
	} else if (details == "点击关闭返回") {
		while (!is_in_invite_friend_page()) {
			if (func.sClick(desc("关闭页面").findOnce())) {
				toastLog("after_click: 点击 desc 关闭按钮返回成功");
				sleep(random_second(2800, 100, 1000));
				break;
			}
			if (func.sClick(id("com.jingdong.app.mall:id/ge").findOnce())) {
				toastLog("after_click: 点击 id 关闭按钮返回成功");
				sleep(random_second(2800, 100, 1000));
				break;
			}
			toastLog("after_click: 点击关闭按钮返回");
			sleep(random_second(2800, 100, 1000));
		}
	} else {
		// 返回
		sleep(random_second(1000, 100, 500));
		back_way();
	}

	log("after_click: 等待返回");
	var exit_cnt = 0
	// 如果不在去完成界面，则返回，返回后判断
	if (!is_in_invite_friend_page()) {
		back_way();
	}

	while (!is_in_invite_friend_page()) {
		exit_cnt = exit_cnt + 1;
		log("after_click: 当前退出计数:" + exit_cnt);
		if (exit_cnt > 20) {
			toastLog("after_click: 超时未返回，退出");
			exit();
		}
	}
	sleep(random_second(800, 100, 1000));
	log("after_click: 已返回");
}


function waitCompleteDisappear() {
	cnt = 0;
	while (is_in_invite_friend_page()) {
		sleep(random_second(600, 100, 300));
		log("waitCompleteDisappear: 等待去完成消失");
		cnt = cnt + 1;
		if (cnt > 10) {
			break;
		}
	}
	toastLog("waitCompleteDisappear: 去完成已消失");
	sleep(random_second(800, 100, 300));
}

// 加入会员
function member_card() {
	var authority, authorited, memberName, memberMail;
	sleep(random_second(3500, 300, 1000));
	if (is_in_invite_friend_page()) {
		toastLog("member_card: 已有卡，在去完成界面，直接完成");
		return 0;
	}
	if (textContains("确认授权并加入").findOnce() == null) {
		toastLog("member_card: 已有卡，未发现去完成描述，直接完成");
		sleep(random_second(1500, 80, 450));
	} else {
		authorited = false;		// 表示是否勾选授权
		while (1) {
			log("member_card: 加会员");
			authority = textContains("确认授权即同意").findOnce();
			if (authority != null) {
				if (func.cClick(authority.parent().child(0))) {
					authorited = true;
				}
			}
			sleep(random_second(1800, 100, 1000));
			if (authorited) {
				if (text("姓名").findOnce() != null) {
					if (devModel == devRedMi) {
						memberName = "曾卿"
					} else if (devModel == devHonor8) {
						memberName = "郑丽"
					} else if (devModel == devMate30) {
						memberName = "陈俊"
					} else {
						break;
					}
					if (setText(1, memberName)) {
						sleep(1500);
						back();
					}
				}
				if (text("邮箱").findOnce() != null) {
					if (devModel == devRedMi) {
						memberMail = "107910697@qq.com"
					} else if (devModel == devHonor8) {
						memberMail = "307458224@qq.com"
					} else if (devModel == devMate30) {
						memberMail = "273343029@qq.com"
					}
					if (setText(2, memberMail)) {
						sleep(random_second(1300, 100, 1000));
						back();
					}
				}
				if (text("生日").findOnce() != null) {
					func.sClick(className("android.widget.Spinner").findOne());
					sleep(random_second(900, 100, 300));
					func.sClick(text("确定").findOnce());
					sleep(random_second(900, 100, 300));
				}
				sleep(2000);
				if (func.cClick(textContains("确认授权并加入").findOnce())) {
					sleep(2000);
					break;
				}
			}
		}
		sleep(3000);
	}
	// 如果点击了会员关闭按钮
	var member_page_close_btn;
	member_page_close_btn = className("ImageView").desc("关闭页面").findOnce();
	if (member_page_close_btn == null) {
		log("member_card: 未找到按钮，直接返回");
		back_way();
	} else {
		log("member_card: 点击到了左上角关闭按钮");
		func.sClick(member_page_close_btn);
		sleep(random_second(1800, 100, 600));
	}
}

//加购5个商品
function add_cart(isView) {
	/**
	@param isView 是否浏览，传入任意数值
	 */
	cnt = 0;
	var addText, doller_text, index_doller;
	// doller_text = "￥"
	doller_text = "¥"
	var findDoller, findDoller_parent, btn_add_cart;
	if (isView == undefined) {
		addText = "加购5个商品";
	} else {
		addText = "浏览5个商品";
	}
	var addCartText = textContains(addText).findOne();
	completeText = addCartText.parent().child(2).text();
	var childCnt;
	childCnt = 4;
	while (childCnt != 5) {
		if (devModel == devHonor8) {
			if (cnt >= 3) {
				scrollDown();
				sleep(4000);
			}
		}
		textContains(doller_text).findOne();
		//点击商品加购物车按钮
		while (1) {
			try {
				findDoller = textContains(doller_text).find()[cnt];
				findDoller_parent = findDoller.parent();
				index_doller = findDoller.indexInParent();
				btn_add_cart = findDoller_parent.child(index_doller + 2);
				break;
			}
			catch (e) {
				sleep(400);
				continue;
			}
		}
		log("add_cart: 点击加购物车");
		func.sClick(btn_add_cart);
		sleep(2000);
		addCartText = textContains(addText).findOnce();
		while (addCartText == null) {
			back_way();
			sleep(2500);
			addCartText = textContains(addText).findOnce();
		}
		sleep(random_second(900, 100, 300));
		try {
			childCnt = textContains(addText).findOnce().parent().childCount();
			toastLog("add_cart: 当前 子控件数量：" + childCnt);
		} catch (err) {
			log("add_cart: 加购失败")
		}
		sleep(random_second(900, 100, 300));
		cnt = cnt + 1;
	}
}



// --------------------单独某项任务--------------------------------------
function 互助点击() {
	func.toApp(appName);
	log("正在等待进入活动页面");
	//等待点击 立即查看按钮
	while (func.sClick(className("TextView").textContains("立即").findOne(10000)) == false) {
		home();
		sleep(4000);
		func.toApp(appName);
	}
	sleep(2000);
	// 点击助力
	func.sClick(textContains("助力邀请").findOne().parent().child(6));// 点击助力
	// 延迟等待
	sleep(2000);
	home();
	sleep(2000);
}

function 城城现金() {
	var find_text, find_object, find_object_index, find_object_parent;	// 定义查找的变量
	while (1) {
		find_text = "有机会得大额现金";
		find_object = textContains(find_text).findOnce();
		if (find_object != null) {
			find_object_parent = find_object.parent();
			if (func.sClick(find_object_parent.child(find_object_parent.childCount() - 1))) {
				find_text = "京口令已复制";
				find_object = className("TextView").text(find_text).findOnce();
				while (find_object == null) {
					toastLog("城城现金: 未发现京口令窗口，请手动点击邀请好友触发，否则不会返回");
					sleep(3000);
					// 如果没有找到京口令，但是弹出微信选择框，则退出
					if (text("使用以下方式打开").findOnce() != null || text("请选择要使用的应用").findOnce() != null) {
						find_object = null;
						break;
					}
					find_object = className("TextView").text(find_text).findOnce();
				}
				if (find_object != null) {
					find_object_parent = find_object.parent();
					func.sClick(find_object_parent.child(find_object_parent.childCount() - 1));
					toastLog("城城现金: 已点击 京口令 关闭按钮");
					sleep(2000);
				}
				break;
			}
		}
		try {
			find_text = "提醒我明日来领钱";
			find_object = text(find_text).findOnce();
			if (find_object != null) {
				find_object_parent = find_object.parent().parent();
				func.sClick(find_object_parent.child(3));
			}
			find_text = "可微信零钱提现";
			find_object = text(find_text).findOnce();
			if (find_object != null) {
				find_object_parent = find_object.parent().parent().parent();
				func.sClick(find_object_parent.child(find_object_parent.childCount() - 1));
			}
			find_text = "邀请新朋友 更快赚现金";
			find_object = text(find_text).findOnce();
			if (find_object != null) {
				find_object_index = find_object.indexInParent();
				find_object_parent = find_object.parent();
				func.sClick(find_object_parent.child(find_object_index - 1));
			}
		} catch (e) {
			log("城城现金: error: " + e);
			continue;
		}
		// 如果活动结束 则退出
		if (text("活动已结束").findOnce() != null) {
			if (func.sClick(text("e300dc37709c6f82").findOnce())) { sleep(2000); }
			break;
		}
		toastLog("城城现金: 等待-有机会得大额现金-加载，其余手动完成");
		sleep(3000);
	}
}

function 种草城() {
	var find_text, find_object, find_object_text, find_object_parent;	// 定义查找的变量
	find_text = "/5)";
	find_object = textContains(find_text).findOnce();
	while (find_object == null) {
		find_object = textContains(find_text).findOnce();
		toastLog("种草城: 等待种草城页面加载");
		sleep(2000);
	}
	find_object_text = find_object.text();
	while (find_object_text != "(5/5)") {
		find_object = textContains(find_text).findOnce();
		if (find_object != null) {
			find_object_parent = find_object.parent().parent();
			func.sClick(find_object_parent.child(2).child(4));
			// 等待查找文本消失
			while (textContains(find_text).findOnce() != null) {
				sleep(2000);
			}
			toastLog("种草城: 种草城页面已消失");
			while (textContains(find_text).findOnce() == null) {
				sleep(random_second(500, 100, 500));
				back_way();
				toastLog("种草城: 种草城返回");
				sleep(random_second(4000, 500, 1000));
			}
			find_object_text = find_object.text();
			toastLog("种草城: 当前文本:" + find_object_text + "目标文本: (5/5)");
		} else {
			find_object_text = "";
			continue;
		}
	}
}
// --------------------单独某项任务--------------------------------------

//  --------------------各类通用功能--------------------------------------
// 任务框 元素检查
function mission_page_check() {
	if (className("android.view.View").textStartsWith("打卡领红包").findOnce() == null &&
		className("android.view.View").textStartsWith("解锁").findOnce() == null) {
		return false;
	}
	return true;
}

// 点击任务框按钮
function click_mission_btn() {
	var find_object, find_object_index;	// 定义查找的变量
	// 点击任务按钮
	find_object = className("android.view.View").textStartsWith("打卡领红包 打卡领红包").findOnce();
	if (find_object != null) {
		find_object_index = find_object.indexInParent();
		func.sClick(find_object.parent().child(find_object_index + 1));
		func.sClick(find_object.parent().child(find_object_index + 2));
		toastLog("click_mission_btn: 点击了 任务框 按钮");
		sleep(2000);
		return true;
	}
	// 点击任务按钮
	find_object = className("android.view.View").textStartsWith("解锁").findOnce();
	if (find_object != null) {
		find_object_index = find_object.indexInParent();
		func.sClick(find_object.parent().child(find_object_index + 1));
		func.sClick(find_object.parent().child(find_object_index + 2));
		toastLog("click_mission_btn: 点击了 任务框 按钮");
		sleep(2000);
		return true;
	}
	toastLog("click_mission_btn: 未找到 任务框 按钮");
	return false;
}


// 邀请好友检查
function is_in_invite_friend_page(need_find_one) {
	if (need_find_one == undefined) {
		if (className("Image").text("047afc56e31d6d4b").findOnce() != null) {
			// toastLog("已找到 邀请好友助力 任务");
			return true;
		} else {
			// toastLog("未找到 邀请好友助力 任务");
			return false;
		}
	} else {
		// toastLog("开始查找邀请好友助力 任务");
		className("Image").text("047afc56e31d6d4b").findOne();
		// toastLog("已找到 邀请好友助力 任务");
		return true;
	}
}

function 口令启动() {
	setClip(koulingText);
	sleep(random_second(900, 100, 300));
	log("正在打开");
	func.toApp(appName);
	sleep(random_second(900, 100, 300));
	//等待点击 立即查看按钮
	func.sClick(className("TextView").textContains("立即").findOne());
	// 点击助力
	func.sClick(textContains("助力邀请").findOne().parent().child(7));
}

function 首页banner启动() {
	func.toApp(appName);
	while (!mission_page_check()) {
		func.cClick(desc("浮层活动").findOnce());
		toastLog("请跳转到京东APP，如果首页没有入口按钮，需手动跳转到活动界面");
		sleep(2000);
	}
	toastLog("已找到打卡领红包 打卡领红包");
	sleep(random_second(2000, 100, 500));
}


function back_way() {
	sleep(800);
	// 如果没找到 说明不在去完成界面
	if (!is_in_invite_friend_page()) {
		log("back_way_start");
		var backBtn = desc("返回").findOnce();
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
		func.sClick(id("com.jd.lib.jshop:id/asj").findOnce());
		func.sClick(id("com.jd.lib.jshop.feature:id/gd").findOnce());
		func.sClick(id("com.jd.lib.jshop.feature:id/mj").findOnce());

		func.sClick(idContains("close").findOnce());
		func.sClick(textContains("离开").findOnce());
		func.sClick(textContains("我要离开").findOnce());
		func.sClick(textContains("放弃").findOnce());
		func.sClick(textContains("知道了").findOnce());
		func.sClick(textContains("待会再来").findOnce());
		log("back_way_end_finded");
	} else {
		log("back_way:已在去完成界面");
	}
}

function random_second(second, st, ed) {
	/** *
	@param {int} second 延迟的时间: 
	@param {int} st 随机开始值
	@param {int} ed 随机结束值
	*/
	if (st >= ed) {
		return second;
	} else {
		return func.randomNum(st, ed) + second;
	}
}

//  --------------------各类通用功能--------------------------------------