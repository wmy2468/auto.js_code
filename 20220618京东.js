// auto("fast");
auto.waitFor();
// auto.setFlags(["findOnUiThread", "useUsageStats"]);


var func = require("func_list.js");

var cnt = 0;
var appName = "京东";

var dev_model = device.model;
var dev_mate30, dev_honor8, dev_redmi;
dev_mate30 = "TAS-AL00";
dev_honor8 = "FRD-AL00";
dev_redmi = "Redmi Note 7";

var jd_scheme = 'openApp.jdMobile://virtual?params={"category":"jump","action":"to","des":"m","sourceValue":"JSHOP_SOURCE_VALUE","sourceType":"JSHOP_SOURCE_TYPE","url":"https://u.jd.com/JdbEbUe","M_sourceFrom":"mxz","msf_type":"auto"}';
var jdjr_scheme = '';

var invite_friend_img_text = "047afc56e31d6d4b";
var mission_key_word = "0金币";

main();

function main() {
	let sMission;
	// sMission = func.dialogs_select(["京东+金融", "京东任务", "金融任务", "图鉴Click", "JJ小号互助"]);
	sMission = "京东任务";
	switch (sMission) {
		case "京东任务":
			京东任务();
			break;
		case "金融任务":
			金融任务();
			break;
		case "图鉴Click":
			图鉴();
			break;
		case "京东+金融":
			京东任务();
			金融任务();
			break;
		case "JJ小号互助":
			互助点击();
			break;
	}
	// console.clear();
	alert("已完成");
}

// --------------------------大任务汇总区-----------------------------
// --------------------------京东任务-----------------------------
function 京东任务() {
	toastLog("启动！！！");
	首页banner启动();
	开始做任务();
}

// -------------------------金融任务----------------------------
function 金融任务() {
	appName = "京东金融";
	// let kouling = "22:/￥05B7E6yqTy2OY￥，嗨！1.打开最新版金融APP粘贴口令到首页搜索框内触发口令弹窗  2.立即参与";
	// setClip(kouling);
	sleep(1500);
	// func.to_app("京东金融");
	func.to_scheme('jdmobile://share?jumpType=7&jumpUrl=4390&channel=default&sourceUrl=1000*https://f.ua.jd.com/downloadApp/index.html?id=&source=')
	// let help_her, help_win_close_btn;

	while (!mission_page_check()) {
		// func.sClick(id("tv_btn").text("立即参与").findOnce());
		// help_her = className("android.view.View").text("为TA助力为TA助力").findOnce();
		// if (help_her != null) {
		// 	toast("已找到为他助力弹窗");
		// 	sleep(2000);
		// 	try {
		// 		help_win_close_btn = help_her.parent().parent().parent().child(2);
		// 		func.sClick(help_win_close_btn);
		// 	} catch (e) { continue; }
		// }
		func.sClick(text("取消").findOnce());
		func.sClick(text("我知道了").findOnce());
		func.sClick(text("禁止").findOnce());
		func.sClick(id("com.jd.jrapp:id/redPacketIV").findOnce());
		toastLog("金融任务: 请跳转金融APP，如果没有弹窗，需手动跳转到活动界面");
		sleep(2500);
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
// -------------------------图鉴任务----------------------------
function 图鉴() {
	let func_in_func = {
		draw_page_check: function () {
			if (textStartsWith("已解锁").textEndsWith("/20").findOnce() != null
				&& idContains("diary-mysterious").findOnce() != null) { return true; }
			else { return false; }
		},
		draw_mission_page_close_popup: function () {
			let shop_lucky_bag, luckey_bag_parent;
			shop_lucky_bag = text("37a630946f6ea871").findOnce();
			if (shop_lucky_bag != null) {
				luckey_bag_parent = shop_lucky_bag.parent().parent();
				func.sClick(luckey_bag_parent.child(luckey_bag_parent.childCount() - 1));
				toastLog("已点击 关闭弹窗");
			}
		},
		draw_mission_page_check: function () {
			if (text("邀1位好友开品牌会员").depth(18).findOnce() != null) { return true; }
			else { return false; }
		},
		draw_click: function () {
			let todo_idx, todo_parent, todo_idx_in_parent, todo_text, todo;
			todo_idx = 0;
			while (text("邀1位好友开品牌会员").depth(18).findOnce() != null) {
				todo = text("去完成").find();
				if (todo.length == 0) { break; }
				if (todo_idx > todo.length - 1) { break; }
				todo_parent = todo[todo_idx].parent();
				todo_idx_in_parent = todo[todo_idx].indexInParent();
				todo_text = todo_parent.child(todo_idx_in_parent - 3).text();
				if (arr_in_text(todo_text, ["邀1位好友", "加购商品"])) {
					log("未找到满足条件的文本，idx+1,todo=" + todo_text);
					todo_idx = todo_idx + 1;
					sleep(500);
					continue;
				} else {
					// toastLog("当前todo_text=" + todo_text);
					func.sClick(todo[todo_idx]);
					if (arr_in_text(todo_text, ["去逛", "逛", "浏览"])) {
						toastLog("当前todo_text=" + todo_text);
						sleep(6000);
						back_way();
					}
					else if (arr_in_text(todo_text, ["会员"])) {
						toastLog("当前todo_text=" + todo_text);
						member_card();
						back_way();
					}
					else if (arr_in_text(todo_text, ["签到"])) {
						toastLog("当前todo_text=" + todo_text);
						sleep(2500);
					}
					else {
						log("未找到满足条件的文本，idx+1,todo=" + todo_text);
						todo_idx = todo_idx + 1;
						sleep(500);
						continue;
					}
				}
				toastLog("等待返回....");
				sleep(4000);
			}
		}
	}
	// 1. 进入图鉴界面
	// 首页banner启动();
	func.to_scheme(jd_scheme);
	while (!func_in_func.draw_page_check()) {
		toastLog("图鉴主界面未加载"); sleep(3000);
		close_popup(); sleep(3000);
		if (func.sClick(text("送爆竹").findOnce())) { toastLog("已点击 图鉴入口"); sleep(3000); }
	}
	// 3. 执行独立任务
	let target, items, item_go, target_list, station_count;
	let start_idx = 2, mission_btn;
	while (1) {
		log("clickComplete: 进入查找环节");
		target = idContains("diary-mysterious").findOnce();
		if (target == null) {
			toastLog("图鉴主界面未加载,如长时间未加载，请手动跳转");
			sleep(5000);
			continue;
		}
		try {
			// target_list.childCount() 有23个。start_idx 从2 开始
			target_list = target.parent();
			log("start_idx=" + start_idx);
			log("target_list.childCount=" + target_list.childCount());
			if (start_idx > target_list.childCount() - 2) { break; }
			// 2. 进入独立图鉴中
			items = target_list.child(start_idx).child(0);
			toastLog("------------stations=" + items.child(0).text());
			item_go = items.child(3);
		} catch (e) { log("error=" + e); continue; }
		func.sClick(item_go);
		station_count = 0;
		// toastLog("已点击第" + (start_idx - 1) + "个图鉴");
		while (!func_in_func.draw_mission_page_check()) {
			try {
				func_in_func.draw_mission_page_close_popup();
				mission_btn = idContains("/pages/index/index").findOnce();
				if (mission_btn != null) {
					mission_btn.child(2).click();
					toastLog("已点击任务按钮...");
					sleep(2500);
				}
			} catch (e) { log("报错=" + e); continue; }
			station_count = station_count + 1;
			toastLog("任务页面加载中..第" + station_count + "次");
			sleep(3000);
			if (station_count > 10) {
				toastLog("任务页面加载失败或未找到任务.....即将返回");
				sleep(3000);
				break;
			}
		}
		// scrollDown();
		func_in_func.draw_click();
		start_idx = start_idx + 1;
		while (!func_in_func.draw_page_check()) {
			back();
			toastLog("返回 图鉴主界面...");
			sleep(6000);
		}
		toastLog("已返回 图鉴主界面...");
	}
}
// --------------------------大任务汇总区-----------------------------
function 开始做任务() {
	log("开始做任务: 正在等待进入活动页面");
	//等待完全加载后，如果出现取消按钮会找不到
	while (!is_in_invite_friend_page()) {
		close_popup(); // --------------关闭各种弹窗----------------
		if (click_mission_btn()) {
			sleep(3000);
			break;
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

	let total_count, cur_count, reset_flag;  // 当前运行次数
	reset_flag = true;
	cur_count = 0;
	total_count = -1;
	// while (is_in_invite_friend_page()) {
	while (is_in_invite_friend_page()) {
		log("clickComplete: 进入查找环节");
		let nextStep, nextStepDetail;
		nextStep = "";
		nextStepDetail = "";
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
				log(todo_mini_title.text());
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
					// console.clear();			// 当前任务正常完成，可以清除前面的日志
					toastLog("clickComplete: 当前任务" + detailText + "完成， index + 1");
					continue;
				}
				if (reset_flag) {
					reset_flag = false;
					total_count = detailText.slice(-2, -1) - detailText.slice(-4, -3);
					log("total_count:" + total_count);
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
				else if (arr_in_text(indexText, ["了解春晚攻略", "AR游戏", "浏览可得", "浏览领", "浏览会场可得", "逛晚会页可", "浏览即可得", "浏览并关注", "成功关注", "逛店可得"])) {
					if (detailText.indexOf("去种草城") != -1) {
						toastLog("clickComplete: 发现 种草城");
						nextStep = "种草城";
					} else {
						nextStep = "浏览返回";
					}
				}
				// --------------------点击 区------------------
				else if (arr_in_text(indexText, ["点击首页浮层", "9点打卡"])) { nextStep = "首页浮层"; }
				// --------------------浏览加购N个区------------------
				else if (arr_in_text(indexText, ["浏览5个", "浏览4个"])) { nextStep = "浏览商品"; }
				else if (arr_in_text(indexText, ["加购5个", "加购4个"])) { nextStep = "加购物车"; }
				// --------------------其它疑难杂症区------------------
				else if (indexText.indexOf("城城") != -1) {
					nextStep = "点击分现金按钮";
				} else if (indexText.indexOf("品牌墙") != -1) {
					nextStep = "品牌墙";
				} else if (indexText.indexOf("参与可得") != -1) {
					nextStep = "参与返回";
				} else if (indexText.indexOf("浏览5个品牌墙店铺") != -1) {
					index_todo_now = index_todo_now + 1;
					toastLog("clickComplete: 浏览品牌墙-跳过，index + 1");
					continue;
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
				else if (arr_in_text(detailText, ["去企有此礼赢取好礼"])) { nextStepDetail = "页面含邀请好友"; }
				// else if (arr_in_text(detailText, ["浏览免费领保险"])) { nextStepDetail = "点击领取才会继续"; }

				// 除了Mate 30外，另外2个台古董在小程序卡死
				if ((dev_model == dev_honor8 || dev_model == dev_redmi) && nextStepDetail == "小程序") {
					index_todo_now = index_todo_now + 1;
					continue;
				}

				func.sClick(btn_todo);
				// toastLog("clickComplete: 已点击按钮");
				toastLog("clickComplete: 任务大标题detailText：" + detailText);
				log("clickComplete: 下一步动作nextStep：" + nextStep);
				log("clickComplete: 下一步动作细节描述nextStepDetail：" + nextStepDetail);
				sleep(1500);
				if (apps == undefined) {
					apps = "京东"
				}
				after_click(nextStep, nextStepDetail, apps);
				// after click之后，如果在时间范围内，将计数值置0
				// auto.service.serviceInfo = auto.service.serviceInfo;
				lock.lock();
				log("----------------thread count 重置");
				run_count = 0;
				lock.unlock();
				cur_count = cur_count + 1;
				if (cur_count == total_count) {
					cur_count = 0;
					reset_flag = true;
					func.to_scheme(jd_scheme);
					while (!is_in_invite_friend_page()) {
						close_popup(); // --------------关闭各种弹窗----------------
						if (click_mission_btn()) {
							toastLog("已切换完成，等待3秒");
							sleep(3000);
							break;
						}
					}
				}
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
	} else if (details == "点击领取才会继续") {
		log("点击领取才会继续");
		func.cClick(text("立即领取").findOne());
		toastLog("已点击领取，等待");
		sleep(random_second(10500, 100, 1000));
	} else if (details == "需要多次点击返回") {
		log("需要多次点击返回");
		sleep(random_second(800, 100, 1000));
		while (!is_in_invite_friend_page()) {
			back();
			sleep(random_second(2000, 100, 600));
		}
	} else if (details == "点击关闭返回") {
		log("点击关闭返回");
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
	// is_in_apps(apps);
	back_way();
	back_way();
	sleep(random_second(800, 100, 1000));
	log("after_click: 已返回");
}

function is_in_apps(appss) {
	// 判断是否在当前app
	while (currentPackage() != app.getPackageName(appss)) {
		log("is_in_apps-currentPackage():" + currentPackage());
		log("is_in_apps:-getPackageName(appss):" + app.getPackageName(appss));
		func.to_app(appss);
		toast("已切换到目标APP，等待");
		sleep(2600);
	}
	log("is_in_apps: back way")
	sleep(2500);
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
	let authority_join;
	authority_join = textContains("确认授权并加入").findOnce();
	if (authority_join == null) {
		toastLog("member_card: 已有卡，未发现去完成描述，直接完成");
		sleep(random_second(1500, 80, 450));
	} else {
		log("member_card2: 加会员");
		while (1) {
			authority = textContains("确认授权即同意").findOnce();
			if (authority != null) {
				authority_idx = authority.indexInParent();
				if (func.sClick(authority.parent().child(authority_idx - 1))) {
					sleep(random_second(1800, 100, 1000));
					break;
				}
				sleep(random_second(1800, 100, 1000));
			}
		}
		sleep(1500);
		func.cClick(authority_join);
		sleep(3000);
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
	let childCnt, first_child_count;
	childCnt = 0;
	try {
		first_child_count = textContains(addText).findOnce().parent().childCount();
		toastLog("add_cart: 初始 子控件数量：" + first_child_count);
	} catch (err) {
		first_child_count = 4;
		first_child_count = 5;
		log("add_cart: 加购失败")
	}
	while (childCnt != first_child_count + 1) {
		if (dev_model == dev_honor8) {
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
	// let work = {
	// 	action: function () {
	let url_dict;
	url_dict = {
		"url_redmi": 'openApp.jdMobile://virtual?params={"category":"jump","des":"m","url":"https://wbbny.m.jd.com/babelDiy/Zeus/41AJZXRUJeTqdBK9bPoPgUJiodcU/index.html?babelChannel=syfc&shareType=taskHelp&inviteId=ZXASTT018v_hwQBsZ8F3UJRqb1AFjRWn6W7zB55awQ&mpin=RnE2kWMPb2DRzdQUqod3WMyPN4RnPmZT&from=sc"}',
		"url_honor": 'openApp.jdMobile://virtual?params={"category":"jump","des":"m","url":"https://wbbny.m.jd.com/babelDiy/Zeus/41AJZXRUJeTqdBK9bPoPgUJiodcU/index.html?babelChannel=syfc&shareType=taskHelp&inviteId=ZXASTT0225KkcRUgf9VWFc07znf9eIgFjRWn6W7zB55awQ&mpin=RnFtxGMPOz2Iw9RP--tyC61CK8bqw3zPnf1J&from=sc"}',
		"url_mate30": 'openApp.jdMobile://virtual?params={"category":"jump","des":"m","url":"https://wbbny.m.jd.com/babelDiy/Zeus/41AJZXRUJeTqdBK9bPoPgUJiodcU/index.html?babelChannel=syfc&shareType=taskHelp&inviteId=ZXASTT0225KkcRhgc8VyFckjzkaFccQFjRWn6W7zB55awQ&mpin=RnE1kGNcbjCMy9RP--txW_9EV8uJtA6p-gpG&from=sc"}',
	}
	Object.keys(url_dict).forEach(obj_key => {
		jump_url = url_dict[obj_key];
		func.to_scheme(jump_url);
		func.sClick(textContains("为TA助力").findOne(30000));// 点击助力
		toastLog(obj_key + ",已点击助力");
		sleep(5000);
	})
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
	let find_text, find_object, find_object_parent, click_flag;	// 定义查找的变量
	click_flag = false;
	cnt = 0;
	while (1) {
		find_text = "有机会得大额现金";
		find_object = textContains(find_text).findOnce();
		try {
			if (find_object != null && click_flag == false) {
				find_object_parent = find_object.parent();
				if (func.sClick(find_object_parent.child(find_object_parent.childCount() - 1))) {
					click_flag = true;
					toastLog("已点击邀请好友按钮，退出");
					sleep(3000);
					continue;
				}
			}
			if (click_flag == true) {
				sleep(3000);
				find_text = "京口令已复制";
				find_object = className("TextView").text(find_text).findOnce();
				if (find_object != null) {
					find_object_parent = find_object.parent();
					func.sClick(find_object_parent.child(find_object_parent.childCount() - 1));
					func.sClick(find_object_parent.child(find_object_parent.childCount() - 1));
					toastLog("城城现金: 已点击 京口令 关闭按钮");
					sleep(2000);
					break;
				}
				cnt = cnt + 1;
				toastLog("当前城城查找 城城京口令 ，第" + cnt + "/5 次，超时后将直接返回");
				sleep(2500);
				if (cnt > 5) {
					break;
				}
			}
			find_text = "活动已结束";
			find_object = textContains(find_text).findOnce();
			// 如果活动结束 则退出
			if (find_object != null) {
				find_object_parent = find_object.parent().parent().parent();
				if (func.sClick(find_object_parent.child(find_object_parent.childCount() - 2))) {
					toastLog("点击城城活动结束按钮");
					sleep(2500);
					break;
				}
			}

		} catch (e) {
			log("城城现金报错=" + e);
			continue;
		}
		toastLog("如果城城现金长时间未返回、未点击任何按钮，请手动处理");
		sleep(3000);
	}
}

function 种草城() {
	let find_text, find_object, find_object_text, find_object_parent;	// 定义查找的变量
	// find_text = "/3)";
	find_text = "/4）";
	find_object = textContains(find_text).findOnce();
	while (find_object == null) {
		find_object = textContains(find_text).findOnce();
		toastLog("种草城: 等待种草城页面加载");
		sleep(2000);
	}
	find_object_text = find_object.text();
	// while (find_object_text != "(3/3)") {
	while (find_object_text != "（4/4）") {

		find_object = textContains(find_text).findOnce();
		if (find_object != null) {
			// find_object_parent = find_object.parent().parent();
			if (func.sClick(text("喜欢").findOnce())) {
				toastLog("已点击种草城");
				sleep(3000);
			}
			// 等待查找文本消失
			while (textContains(find_text).findOnce() != null) {
				toast("等待种草城页面消失");
				sleep(2400);
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
	start_text = "抽奖 ";
	end_text = "";
	find_object = className("android.view.View").textStartsWith(start_text).findOnce();
	if (find_object == null) { find_object = className("android.view.View").descStartsWith(start_text).findOnce(); }
	start_text = "解锁";
	if (find_object == null) { find_object = className("android.view.View").textStartsWith(start_text).findOnce(); }
	if (find_object == null) { find_object = className("android.view.View").descStartsWith(start_text).findOnce(); }

	if (find_object != null) {
		log("已在做任务页面");
		return true;
	}
	return false;
}

// 点击任务框按钮
function click_mission_btn() {
	let start_text, end_text;
	start_text = "抽奖 ";
	end_text = "";
	let find_object, find_object_index;	// 定义查找的变量
	// 点击任务按钮
	find_object = className("android.view.View").textStartsWith(start_text).findOnce();
	if (find_object == null) { find_object = className("android.view.View").descStartsWith(start_text).findOnce(); }
	start_text = "解锁";
	if (find_object == null) { find_object = className("android.view.View").textStartsWith(start_text).findOnce(); }
	if (find_object == null) { find_object = className("android.view.View").descStartsWith(start_text).findOnce(); }

	if (find_object != null) {
		find_object_index = find_object.indexInParent();
		func.sClick(find_object.parent().child(find_object_index - 1));
		func.sClick(find_object.parent().child(find_object_index - 2));
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
		} else if (text("邀1位好友开品牌会员").findOnce() != null) {
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

function close_popup() {
	let find_object, find_object_parent;	// 定义查找的变量
	try {
		let target_text = ["不要断签哦~别让大红包飞走", "距离下一个红包还要签到",
			"爆竹又增加啦~", "继续环游", "欢迎回来", "欢迎您", "立即抽奖", "开启今日", "开心收下"];
		for (let i = 0; i < target_text.length; i++) {
			// 关闭助力
			find_object = textContains(target_text[i]).findOnce();
			if (find_object != null) {
				if (target_text[i] == "欢迎您") {
					find_object_parent = find_object.parent().parent();
				} else {
					find_object_parent = find_object.parent();
				}
				if (func.sClick(find_object_parent.child(0)) == true) {
					// if (func.sClick(find_object_parent.child(0))) {
					toastLog("开始做任务2: 点击了," + target_text[i]);
					sleep(2000);
					break;
				}		// 点击领取
				if (func.sClick(find_object_parent.child(1)) == true) {
					toastLog("开始做任务1: 点击了," + target_text[i]);
					sleep(2000);
					break;
				}
			}
		}

		// // 关闭助力
		// find_object = textContains("爆竹又增加啦~").findOnce();
		// if (find_object != null) {
		// 	find_object_parent = find_object.parent();
		// 	if (func.sClick(find_object_parent.child(0))) {
		// 		toastLog("开始做任务: 点击了 关闭助力");
		// 		sleep(2000);
		// 	}		// 点击领取
		// } else {
		// 	log("开始做任务: 未找到 好友助力");
		// }

		// // 关闭 继续环游
		// find_object = textContains("继续环游").findOnce();
		// if (find_object != null) {
		// 	find_object_parent = find_object.parent();
		// 	if (func.sClick(find_object_parent.child(1))) {
		// 		toastLog("开始做任务: 点击了 继续环游");
		// 		sleep(2000);
		// 	}
		// } else {
		// 	log("开始做任务: 未找到 继续环游");
		// }

		// // 关闭欢迎回来
		// find_object = text("欢迎回来").findOnce();
		// if (find_object != null) {
		// 	find_object_parent = find_object.parent();
		// 	if (func.sClick(find_object_parent.child(1))) {
		// 		toastLog("开始做任务: 点击了 关闭欢迎回来");
		// 		sleep(2000);
		// 	}
		// } else {
		// 	log("开始做任务: 未找到 欢迎回来");
		// }

		// // 关闭每日签到
		// find_object = textContains("不要断签哦~别让大红包飞走").findOnce();
		// if (find_object != null) {
		// 	find_object_parent = find_object.parent();
		// 	if (func.sClick(find_object_parent.child(0)) || func.sClick(find_object_parent.child(1))) {
		// 		toastLog("开始做任务: 点击了 关闭每日签到");
		// 		sleep(2000);
		// 	}
		// } else {
		// 	log("开始做任务: 未找到 每日签到");
		// }
		// // 关闭开心收下
		// find_object = textContains("距离下一个红包还要签到").findOnce();
		// if (find_object != null) {
		// 	find_object_parent = find_object.parent();
		// 	if (func.sClick(find_object_parent.child(0)) || func.sClick(find_object_parent.child(1))) {
		// 		toastLog("开始做任务: 点击了 关闭开心收下");
		// 		sleep(2000);
		// 	}
		// } else {
		// 	log("开始做任务: 未找到 红包开心");
		// }
		// 点击任务按钮
		toastLog("关闭弹窗: 已点击完成，如有未关闭，请反馈");
		sleep(3000);
	} catch (e) {
		log("关闭弹窗: error" + e);
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
	// app.startActivity({
	// 	action: "VIEW",
	// 	data: 'openApp.jdMobile://virtual?params={"category":"jump","des":"m","sourceValue":"babel-act","sourceType":"babel","url":"https://wbbny.m.jd.com/babelDiy/Zeus/41AJZXRUJeTqdBK9bPoPgUJiodcU/index.html?babelChannel=","M_sourceFrom":"h5auto","msf_type":"auto"}'
	// })
	func.to_scheme(jd_scheme);
	// func.to_app(appName);
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
		return random(st, ed) + second;
	}
}

//  --------------------各类通用功能--------------------------------------