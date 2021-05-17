auto.waitFor();
var func = require("func_list.js");

main();

function main() {
    pufa_XYK();
    //gonghang_XYK();
    //youchu_CXK();

    //huaxia_XYK();
    alert("已完成.");
}

function youchu_XYK() {
    var appName = "com.yitong.mbank.psbc.creditcard";
    func.toPackage(appName);
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
    var hotAct = text("热门活动").findOne().parent().parent();
    sleep(800);
    func.sClick(hotAct.child(6));
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