//toastLog(id("com.jd.lib.cashier.feature:id/cd").findOnce().click());
var func = require("func_list.js");

toastLog((text("热门活动").findOne().parent()).indexInParent());

// 邮储信用卡();
// 邮储信用卡
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
    sleep(800);
    // 等待我的页面加载
    var hotAct = text("热门活动").findOne().parent();
    var idxHotAct = hotAct.indexInParent();
    toastLog(idxHotAct);
    sleep(800);
    func.sClick(hotAct.parent().child(idxHotAct + 1));
    while (!(text("明天再来哦").findOnce() != null || textContains("恭喜获得").findOnce() != null)) {
        func.sClick(text("立即签到").findOnce());
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
