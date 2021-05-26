//toastLog(id("com.jd.lib.cashier.feature:id/cd").findOnce().click());
var func = require("func_list.js");
//test on laptop

买单吧();

function 买单吧() {
    var appName = "买单吧";
    //closeApp(appName);
    func.toApp(appName);
    while (className("TextView").id("tv_title").text("我的").findOnce() == null) {
        func.passAd();
        func.sClick(id("ivADClose").findOnce());
    }
    func.sClick(text("我的").findOne().parent().parent().parent().parent().child(2));
    text("羊毛资讯").findOne();
    sleep(1000);
    while (textContains("客官明天再来呦").findOnce() == null) {
        func.sClick(idContains("sign").findOnce());
        sleep(1000);
        func.sClick(id("com.bankcomm.maidanba:id/bt_welfare_lottery").text("去抽奖").findOnce());
        if (text("手势登录").findOnce() != null) {
            sleep(500);
            func.gesture_pwd(appName);
            sleep(1000);
        }
    }
    toastLog(appName + "已签到");
    sleep(1000);
}


// YunShaofu
function YunShaofu() {
    var appName = "com.unionpay";
    //closeApp(appName);
    func.toPackage(appName);
    while (className("TextView").text("我的").findOnce() == null) {
        sleep(1000);
    }
    sleep(1500);
    func.sClick(className("TextView").text("首页").findOnce());
    //点击签到按钮
    func.sClick(id("com.unionpay:id/frog_float").findOne());
    // 等待签到页面加载
    textContains("连续签到").findOne();

    if (text("今日已签到").findOnce() == null) {
        func.sClick(text("立即签到").findOnce());
        sleep(1500);
    }
    toastLog(appName + "已签到");
    sleep(1000);
}