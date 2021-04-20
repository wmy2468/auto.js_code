//toastLog(id("com.jd.lib.cashier.feature:id/cd").findOnce().click());
var func = require("func_list.js");

浦发信用卡();

function 浦发信用卡() {
    var appName = "浦大喜奔";
    //closeApp(appName);
    func.toApp(appName);
    while (text("我的").findOnce() == null) {
        func.passAd();
    }
    func.sClick(text("我的").findOne());
    // 等待我的页面加载
    text("我的订单").findOne();
    while (text("签到").findOnce() == null) {
        func.toAutojs();
        func.toApp(appName);
        sleep(3000);
    }
    func.sClick(text("签到").findOne());
    // 输入手势密码
    textContains("手势密码").findOne();
    sleep(500);
    func.gesture_pwd(appName);
    sleep(1000);
    // 等待签到页面加载
    text("每日签到").findOne();
    sleep(1000);
    var waitSign = text("待签到").findOne();
    sleep(1000);
    func.sClick(waitSign.parent().parent().parent().parent().child(4));
    toastLog(appName + "已签到");
    sleep(1000);
}
