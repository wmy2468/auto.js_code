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

var devModel = device.model;
var devMate30, devHonor8, devRedMi;
devMate30 = "TAS-AL00";
devHonor8 = "FRD-AL00";
devRedMi = "Redmi Note 7";

var invite_friend_img_text = "047afc56e31d6d4b";
var mission_key_word = "0爆竹";

main();

function main() {
	let sMission;
	sMission = func.dialogsWin(["做任务", "金融任务"]);
	switch (sMission) {
		case "做任务":
			做任务();
			break;
		case "金融任务":
			金融任务();
			break;
		// case "互助":
		// 	互助();
		// 	break;
	}
	setClip("");
	// console.clear();
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
	金融口令启动();
	while (!mission_page_check()) {
		func.sClick(id("com.jd.jrapp:id/redPacketIV").findOnce());
		toastLog("金融任务: 请跳转金融APP，如果没有弹窗，需手动跳转到活动界面");
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
	clickComplete("京东金融");
}


// --------------------------大任务汇总区-----------------------------
function 开始做任务() {
	log("开始做任务: 正在等待进入活动页面");
	//等待完全加载后，如果出现取消按钮会找不到
	let find_object, find_object_index, find_object_parent;	// 定义查找的变量
	while (!is_in_invite_friend_page()) {
		// --------------关闭各种弹窗----------------
		try {
			// 关闭助力
			find_object = text("刚刚又有好友为你助力\n爆竹又增加啦~").findOnce();
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

function clickComplete(apps) {
	log("clickComplete: 去完成");
	let indexText, detailText;
	// 去完成小标题， 去完成 小标题s，去完成小标题 父控件, 去完成按钮
	let todo_mini_title, todo_mini_titles, todo_mini_titles_length, todo_mini_title_parent, btn_todo;
	let index_todo_now, index_todo;
	index_todo_now = 1;
	exit_cnt = 0;

	// 创建线程用于判断，单个任务超时5分钟则退出
	let lock = threads.lock();
	let run_count = 0;
	threads.start(function () {
		while (true) {
			log("threads-run_count:" + run_count);
			sleep(5000);
			lock.lock();
			run_count = run_count + 1;
			// log("threads-run_count:" + run_count);
			lock.unlock();
			// 超过3分钟未执行完任务，则退出
			if (run_count > (12 * 3)) {
				toastLog("threads exits");
				exit();
			}
		}
	})
	// while (is_in_invite_friend_page()) {
	let nextStep, nextStepDetail, to_do_mini_title_last;
	to_do_mini_title_last = ""
	while (is_in_invite_friend_page()) {
		log("clickComplete: 进入查找环节");

		nextStep = "";
		nextStepDetail = "";
		todo_mini_titles = "";
		sleep(800);
		todo_mini_titles = className("Image").text(invite_friend_img_text).findOne().parent().parent().findByText(mission_key_word);
		//toastLog(unComplete.length);
		// if (todo_mini_titles.nonEmpty()) {
		if (!todo_mini_titles.empty) {
			todo_mini_titles_length = todo_mini_titles.size();
			log("clickComplete: 去完成长度:" + todo_mini_titles_length + ",和既定值:" + index_todo_now);
			if (todo_mini_titles_length <= index_todo_now) {
				toast("clickComplete: 去完成长度剩余:" + todo_mini_titles_length);
				break;
			} else {
				// todo_mini_title = todo_mini_titles[index_todo_now];		//选择第一个
				todo_mini_title = todo_mini_titles.get(index_todo_now);		//选择第一个
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
				if (todo_mini_titles == detailText) {
					sleep(3000);
					log("文本未加载，等待3秒");
					continue;
				}
				todo_mini_titles = detailText;
				// 判断当前任务是否已完成
				// log("-4位置:" + detailText.slice(-4, -3) + ",-2位置:" + detailText.slice(-2, -1));
				if (detailText.slice(-4, -3) == detailText.slice(-2, -1)) {
					index_todo_now = index_todo_now + 1;
					// console.clear();			// 当前任务正常完成，可以清除前面的日志
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
				// --------------------加入会员专区------------------
				if (arr_in_text(indexText, ["成功入会", "开通品牌会员", "LV1会员"])) { nextStep = "加入会员"; }
				// --------------------等待N秒区------------------
				else if (arr_in_text(indexText, ["秒", "S可", "s可"])) { nextStep = "等待8秒"; }
				// --------------------浏览区------------------
				else if (arr_in_text(indexText, ["AR游戏", "浏览可得", "浏览领", "浏览会场可得", "逛晚会页可", "浏览即可得", "浏览并关注", "成功关注", "逛店可得"])) {
					if (detailText.indexOf("去种草城") != -1) {
						toastLog("clickComplete: 发现 种草城");
						nextStep = "种草城";
					} else {
						nextStep = "浏览返回";
					}
				}
				// --------------------浏览加购N个区------------------
				else if (arr_in_text(indexText, ["浏览5个", "浏览4个"])) { nextStep = "浏览商品"; }
				else if (arr_in_text(indexText, ["加购5个", "加购4个"])) { nextStep = "加购物车"; }
				// --------------------其它疑难杂症区------------------
				// else if (indexText.indexOf("城城") != -1) {
				// 	nextStep = "点击分现金按钮";}
				else if (indexText.indexOf("品牌墙") != -1) {
					nextStep = "品牌墙";
				} else if (indexText.indexOf("点击首页浮层") != -1) {
					nextStep = "首页浮层";
				} else if (indexText.indexOf("参与可得") != -1) {
					nextStep = "参与返回";
				} else if (indexText.indexOf("小程序") != -1) {
					nextStep = "小程序";
				} else {
					index_todo_now = index_todo_now + 1;
					toastLog("clickComplete: 未找到满足条件的任务描述-小字，index + 1");
					continue;
				}

				// 详细描述校验，校验小程序
				nextStepDetail = "无";
				if (arr_in_text(detailText, ["小程序", "去逛美妆护肤爆款会场", "2.9元洗衣液限时", "去逛美妆护肤爆款会场"])) { nextStepDetail = "小程序"; }
				else if (arr_in_text(detailText, ["金融神券", "京享值PK赢"])) { nextStepDetail = "金融2次返回"; }
				else if (arr_in_text(detailText, ["领百亿购物金", "榜单会场"])) { nextStepDetail = "20秒等待"; }
				else if (arr_in_text(detailText, ["东东超市", "去财富岛"])) { nextStepDetail = "需要多次点击返回"; }
				else if (arr_in_text(detailText, ["去逛京友圈"])) { nextStepDetail = "京友圈"; continue; }
				else if (arr_in_text(detailText, ["去企有此礼赢取好礼"])) { nextStepDetail = "页面含邀请好友"; }

				// 除了Mate 30外，另外2个台古董在小程序卡死
				if ((devModel == devHonor8 || devModel == devRedMi) && nextStepDetail == "小程序") {
					index_todo_now = index_todo_now + 1;
					continue;
				}

				func.sClick(btn_todo);
				toastLog("clickComplete: 已点击按钮");
				log("clickComplete: 下一步动作nextStep：" + nextStep);
				log("clickComplete: 下一步动作细节描述nextStepDetail：" + nextStepDetail);
				sleep(1500);
				if (apps == undefined) {
					apps = "京东"
				}
				after_click(nextStep, nextStepDetail, apps);
				// after click之后，如果在时间范围内，将计数值置0
				lock.lock();
				log("----------------thread count 重置");
				run_count = 0;
				lock.unlock();
			}
		}
	}
	// 结束子线程
	threads.shutDownAll();
	toastLog("子线程已结束");
}


function after_click(textStr, details, apps) {
	switch (textStr) {
		case "品牌墙":
			品牌墙();
			break;
		case "首页浮层":
			sleep(3000);
			break;
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
		sleep(random_second(5000, 100, 1000));
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
			func.to_app(appName);
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
	// 如果不在去完成界面，则返回，返回后判断
	if (!is_in_invite_friend_page()) {
		back_way();
	}

	is_in_apps(apps);

	sleep(random_second(800, 100, 1000));
	log("after_click: 已返回");
}

function is_in_apps(appss) {
	log("currentPackage():" + currentPackage());
	log("app.getPackageName(appss):" + app.getPackageName(appss));
	// 判断是否在当前app
	while (currentPackage() != app.getPackageName(appss)) {
		func.to_app(appss);
		sleep(3500);
	}
	back_way();
}

function waitCompleteDisappear() {
	cnt = 0;
	sleep(2000);		// 先延迟2秒，减少工作量
	while (is_in_invite_friend_page()) {
		sleep(random_second(1000, 100, 300));
		log("waitCompleteDisappear: 等待去完成消失");
		cnt = cnt + 1;
		if (cnt > 9) {
			break;
		}
	}
	toastLog("waitCompleteDisappear: 去完成已消失");
	sleep(random_second(800, 100, 300));
}

// 加入会员
function member_card() {
	let authority, authority_idx;
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
				authority_idx = authority.indexInParent();
				func.cClick(authority.parent().child(authority_idx - 1));
				sleep(random_second(1800, 100, 1000));
			}
			sleep(3000);
		}
		// 如果点击了会员关闭按钮
		let member_page_close_btn;
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
}

//加购5个商品
function add_cart(isView) {
	/**
	@param isView 是否浏览，传入任意数值
	 */
	cnt = 0;
	let addText, doller_text, index_doller;
	// doller_text = "￥"
	doller_text = "¥"
	let findDoller, findDoller_parent, btn_add_cart;
	if (isView == undefined) {
		addText = "加购4个商品";
	} else {
		addText = "浏览4个商品";
	}
	let addCartText = textContains(addText).findOne();
	completeText = addCartText.parent().child(2).text();
	let childCnt;
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
				findDoller_parent = findDoller.parent().parent();
				index_doller = findDoller_parent.childCount() - 1;
				btn_add_cart = findDoller_parent.child(index_doller);
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
	func.to_app(appName);
	log("正在等待进入活动页面");
	//等待点击 立即查看按钮
	while (func.sClick(className("TextView").textContains("立即").findOne(10000)) == false) {
		home();
		sleep(4000);
		func.to_app(appName);
	}
	sleep(2000);
	// 点击助力
	func.sClick(textContains("助力邀请").findOne().parent().child(6));// 点击助力
	// 延迟等待
	sleep(2000);
	home();
	sleep(2000);
}

function 品牌墙() {
	while (is_in_invite_friend_page()) {
		toast("等待跳转到品牌墙页面，如长时间未跳转，请手动");
		sleep(3000);
	}
	sleep(3000);
	let cur_img_count, brand_walls, brand_walls_idx, brand_wall_back_btn, brand_wall_parent;
	brand_walls = className("Image").find();
	cur_img_count = brand_walls.length;
	let i = 0;
	while (i < 4) {
		brand_walls = className("Image").find();
		log("brand_walls.length:" + brand_walls.length)
		if (cur_img_count == brand_walls.length) {
			brand_walls = className("Image").find();
			brand_wall_parent = brand_walls[1].parent().parent().parent().parent().parent().parent();
			brand_walls_idx = brand_wall_parent.childCount() - 1;
			brand_wall_back_btn = brand_wall_parent.child(brand_walls_idx);
			if (i >= 3) {
				break;
			}
			func.sClick(brand_walls[i + 1]);
			while (className("Image").find().length == cur_img_count) {
				toastLog("已点击品牌墙，等待跳转");
				sleep(3000);
			}
			sleep(3000);
			back();
			sleep(1500);
		} else {
			continue;
		}
		i = i + 1;
	}
	func.sClick(brand_wall_back_btn);
	while (!is_in_invite_friend_page()) {
		// 点击任务按钮
		if (click_mission_btn()) {
			sleep(3000);
			break;
		} else {
			sleep(2500);
		}
	}

}

function 城城现金() {
	let find_text, find_object, find_object_index, find_object_parent;	// 定义查找的变量
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
	let find_text, find_object, find_object_text, find_object_parent;	// 定义查找的变量
	find_text = "/3)";
	find_object = textContains(find_text).findOnce();
	while (find_object == null) {
		find_object = textContains(find_text).findOnce();
		toastLog("种草城: 等待种草城页面加载");
		sleep(2000);
	}
	find_object_text = find_object.text();
	while (find_object_text != "(3/3)") {
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
function arr_in_text(target_str, arr) {
	for (let i = 0; i < arr.length; i++) {
		if (target_str.indexOf(arr[i]) != -1) {
			return true;
		}
	}
	return false;
}

// 任务框 元素检查
function mission_page_check() {
	let start_text, end_text;
	start_text = "集爆竹炸年兽"
	end_text = "0个爆竹"

	find_object = className("android.view.View").textStartsWith(start_text).textEndsWith(end_text).findOnce();
	if (find_object == null) { find_object = className("android.view.View").descStartsWith(start_text).descEndsWith(end_text).findOnce(); }
	start_text = "解锁";
	if (find_object == null) { find_object = className("android.view.View").textStartsWith(start_text).textEndsWith(end_text).findOnce(); }
	if (find_object == null) { find_object = className("android.view.View").descStartsWith(start_text).descEndsWith(end_text).findOnce(); }

	if (find_object != null) {
		log("已在做任务页面");
		return true;
	}
	return false;
}

// 点击任务框按钮
function click_mission_btn() {
	let start_text, end_text;
	start_text = "集爆竹炸年兽"
	end_text = "0个爆竹"
	let find_object, find_object_index;	// 定义查找的变量
	// 点击任务按钮
	find_object = className("android.view.View").textStartsWith(start_text).textEndsWith(end_text).findOnce();
	if (find_object == null) { find_object = className("android.view.View").descStartsWith(start_text).descEndsWith(end_text).findOnce(); }
	start_text = "解锁";
	if (find_object == null) { find_object = className("android.view.View").textStartsWith(start_text).textEndsWith(end_text).findOnce(); }
	if (find_object == null) { find_object = className("android.view.View").descStartsWith(start_text).descEndsWith(end_text).findOnce(); }

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
		if (className("Image").text(invite_friend_img_text).findOnce() != null) {
			// toastLog("已找到 邀请好友助力 任务");
			return true;
		} else {
			// toastLog("未找到 邀请好友助力 任务");
			return false;
		}
	} else {
		// toastLog("开始查找邀请好友助力 任务");
		className("Image").text(invite_friend_img_text).findOne();
		// toastLog("已找到 邀请好友助力 任务");
		return true;
	}
}


function 金融口令启动() {
	let kouling = "26:/￥53QDG9zffRCAb%，❄1.打开最新版金融APP粘贴口令到首页搜索框内触发口令弹窗  2.立即参与";
	setClip(kouling);
	sleep(1500);
	func.to_app("京东金融");
	func.sClick(id("tv_btn").text("立即参与").findOne());
	let help_her, help_win_close_btn;
	help_her = className("android.view.View").text("为TA助力为TA助力").findOne();
	toast("已找到为他助力弹窗");
	help_win_close_btn = help_her.parent().parent().parent().child(2);
	func.sClick(help_win_close_btn);
}


function 首页banner启动() {
	func.to_app(appName);
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
		let backBtn = desc("返回").findOnce();
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