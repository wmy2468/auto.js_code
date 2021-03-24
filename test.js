// 导入模块
var func = require("func_list.js");
浦发银行();

function 浦发银行() {
    var appName = "浦发银行";
    //closeApp(appName);
    func.toApp(appName);
    while (text("首页").findOnce() == null) {
        func.passAd();
    }
    sleep(1800);
    func.sClick(id("radio_button5").text("我的").findOnce());
    // 等待我的页面加载
    text("日历提醒").findOne();
    // 签到按钮
    while (text("金豆").findOnce() == null) {
        func.toAutojs();
        func.toApp(appName);
        sleep(3000);
    }
    sleep(800);
    while (text("开启签到提醒").findOnce() == null) {
        func.sClick(text("金豆").findOnce());
        sleep(800);
        if (text("切换登录方式").findOnce() || text("更多快捷方式登录").findOnce()) {
            sleep(500);
            func.gesture_pwd(appName);
            sleep(1000);
        }
    }
    sleep(1000);
    while (textContains("连续签到").find().length > 2) {
        func.sClick(textContains("连续签到").findOnce());

    }
    toastLog(appName + "已签到");
    sleep(1000);
}