// 导入模块
var func = require("func_list.js");
邮储信用卡();

function 邮储信用卡() {
    var appName = "邮储信用卡";
    func.toApp(appName);
    while (text("我的").findOnce() == null) {
        func.passAd();
        var Continue = className("TextView").text("继续使用").findOnce();
        if (Continue != null) {
            func.sClick(Continue);
        }
    }
    sleep(800);
    func.sClick(className("TextView").text("精选").findOne());
    // 等待我的页面加载
    var myBill = text("热门活动").findOne();
    sleep(800);
    func.sClick(myBill.parent().parent().child(7));
    while (text("今日已签到").findOnce() == null) {
        func.sClick(text("马上签到").findOnce());
        sleep(800);
        if (text("忘记手势密码").findOnce() != null) {
            sleep(500);
            func.gesture_pwd(appName);
            sleep(1000);
        }
    }
    toastLog(appName + "已签到");
    sleep(1000);
}