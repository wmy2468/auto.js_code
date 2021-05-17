auto.waitFor();
var func = require("func_list.js");

main();

function main() {
    pufa_XYK();
    //gonghang_XYK();
    //youchu_CXK();

    youchu_XYK();
    //huaxia_XYK();
    alert("已完成.");
}

// 买单吧
function jiaohang_XYK() {
    var appName = "com.bankcomm.maidanba";
    //closeApp(appName);
    func.toPackage(appName);
    while (className("TextView").id("tv_title").text("我的").findOnce() == null) {
        func.passAd();
        func.sClick(id("ivADClose").findOnce());
    }
    func.sClick(text("我的").findOne());
    sleep(2000);
    while (id("rl_title_white").findOnce() == null) {
        func.sClick(id("com.bankcomm.maidanba:id/tv_sign").text("每日签到").findOnce());
        sleep(1000);
        func.sClick(idContains("lose").findOnce());
        log(appName + "等待登录");
        sleep(1500);
        if (text("手势登录").findOnce() != null) {
            sleep(500);
            func.gesture_pwd(appName);
            sleep(1000);
        }
    }
    sleep(1000);
    while (!(text("客官明天再来呦").findOnce() != null || text("完成").findOnce() != null)) {
        func.sClick(id("bt_signin").text("签到").findOnce());
        func.sClick(id("com.bankcomm.maidanba:id/bt_signin").text("抽奖").findOnce());
        sleep(1000);
        func.sClick(id("com.bankcomm.maidanba:id/bt_welfare_lottery").text("去抽奖").findOnce());
    }
    toastLog(appName + "已签到");
    sleep(1000);
}