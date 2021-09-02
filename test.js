//toastLog(id("com.jd.lib.cashier.feature:id/cd").findOnce().click());
var func = require("func_list.js");
//test on laptop

//toastLog(textContains("更多卡币").findOnce());
// func.sClick(className("Image").text("c143642ad0850f7a").findOnce());
// func.getTimeDiff("beijing", "00,00,00,700");
// var targetViewText = "沃尔玛电子卡";
// log(func.sClick(textContains(targetViewText).findOnce()));
// func.sClick(text("10元补贴券").findOne());
// func.sClick(text("满10.1元可用").findOne());

// func.sClick(text("领券参团").findOne());
// textContains("购买时会自动领取并使用").findOne();
// func.sClick(id("com.jd.pingou.newmodule.feature:id/bt_confirm").text("领券参团").findOne());
// var timeArea = "淘宝时间";
// toastLog(classNameContains("RecyclerView").scrollable().findOne().scrollForward());
// sleep(800);
// startTime = (new Date()).getHours() + ",56,10,700";
// func.getTimeDiff(timeArea, startTime);              // 等待时间

// var st, ed;
// st = new Date();
// func.sClick(text("补贴券可抵10元").findOne().parent().parent().child(1));
// //func.sClick(text("领券").id("com.jd.pingou.newmodule.feature:id/tv_youhui_title").findOne());
// ed = new Date();
// toastLog(ed - st);

// func.sClick(className("Button").depth(12).text("立即购买").findOnce());

// func.sClick(text("小爷酸汤鱼100元代金券").findOnce().parent().parent());             // 点击元素
// // 点击元素
// while (className("android.view.View").text("购买后1天内有效").findOnce() == null) {
//     func.sClick(className("Button").text("立即购买").findOnce());
//     func.sClick(className("Button").text("已售罄").findOnce());
// }

//运行环境为auto.js pro版本

// var window = floaty.window(
//     <vertical gravity="center" >
//         <button id='移动' layout_weight="1" alpha="0"></button>
//         <text id='text' layout_weight="1" gravity="center" textColor="red"> 一十一 </text>
//         <button id='关闭' layout_weight="1">关闭</button>
//     </vertical >
// );
// func.sClick(text("奖励中心").depth(17).findOnce());

// toastLog(x + "," + y);
// toastLog(func.sClick(text("生活·缴费").findOnce()));
targetView = desc("购物车").depth(14).findOnce();
callFeeBtns = targetView.parent().parent().parent().parent().parent().parent().parent().parent().parent().child(0).child(0).child(0).child(0).child(1);
log(callFeeBtns);
// 等待
// func.getTimeDiff(timeArea, startTime);
// 点击
callFeeBtns.children().forEach(feeBtn => {
    func.sClick(feeBtn);
})

function 云闪付锦鲤活动() {
    var startTime, targetViewText, clickText;
    var appName = "云闪付";
    var timeArea = "北京时间";
    toastLog("到点点击");

    var currentWeekday = new Date().getDay();
    var counponText;
    // 返回的周日0 周一返回1，周二2
    switch (currentWeekday) {
        case 5:
            counponText = "满20可用";
            break;
        case 6:
            counponText = "满35可用";
            break;
        case 0:
            counponText = "满50可用";
            break;
    }

    targetViewText = func.dialogsWin(["每日券", "周五六日10点", "周五六日15点"]);
    var targetText, everyText;
    targetText = "线下指定商户";
    switch (targetViewText) {
        case "每日券":
            targetText = func.dialogsWin(["线下指定商户", "线上指定商户"]);
            startTime = "08,59,59,600";
            counponText = "满10可用"
            break;
        case "周五六日10点":
            startTime = "09,59,59,600";
            break;
        case "周五六日15点":
            startTime = "14,59,59,600";
            break;
    }
    func.toApp(appName);
    while (text("激励金提现").findOnce() == null) {
        // 如果能点击按钮，就等待设置文本
        if (func.sClick(id("rl_search_coupon").findOnce()) == true) {
            if (textContains("跳过").findOnce() == null) {
                text("历史记录").findOne();
                setText(0, "奖励中心");
                func.sClick(text("奖励中心").depth(16).findOne());
                func.sClick(text("奖励中心").depth(17).findOne());
            } else {
                sleep(600);
                continue;
            }
        }
    }

    var exWhile, clickItems, clickItem, itemParent, itemIndex, upItemText;
    exWhile = false;
    // 等待进入指定页面
    while (text("奖励中心").findOnce() == null) {
        toastLog("请跳转到 \" 奖励中心 \"，直到提示  已到达等待页面");
        sleep(800);
    }
    while (1) {
        try {
            clickItems = text(counponText).find();
            if (clickItems.nonEmpty()) {
                for (var i = 0; i < clickItems.length; i++) {
                    clickItem = clickItems[i];
                    itemIndex = clickItem.indexInParent();
                    itemParent = clickItem.parent();
                    upItemText = (itemParent.child(itemIndex + 1)).text();
                    log(upItemText);
                    if (upItemText == targetText) {
                        exWhile = true;
                        break;
                    }
                }
            }
            if (exWhile) {
                break;
            }
        }
        catch (e) {
            log("123");
        }
    }

    toastLog("已到达指定页面，等待");
    //  等待倒计时
    func.getTimeDiff(timeArea, startTime);
    // 点击进入 等待
    func.sClick(clickItem);
    text("优惠券到账后24小时内有效").findOne();
    func.sClick(text("立即领取").findOne());
    toastLog("已完成");
}

function 铃声通知(播放时长, 音量) {
    var 音量 = 音量 || 13;
    var 播放时长 = 播放时长 || 1000;
    var 铃声 = android.media.RingtoneManager.TYPE_NOTIFICATION;
    var mp = new android.media.MediaPlayer();
    device.setMusicVolume(音量)
    mp.setDataSource(context, android.media.RingtoneManager.getDefaultUri(铃声));
    mp.prepare();
    mp.start();
}