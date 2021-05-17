auto.waitFor();
var func = require("func_list.js");

main();

function main() {
    pufa_CXK();
    pufa_XYK();
    //gonghang_XYK();
    //youchu_CXK();

    youchu_XYK();
    //huaxia_XYK();
    jiaohang_XYK();
    alert("已完成.");
}

// 金豆签到
function pufa_CXK() {
    var appName = "cn.com.spdb.mobilebank.per";
    //closeApp(appName);
    func.toPackage(appName);
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
    var signs = textStartsWith("+").find();
    try {
        if (signs.length >= 2) {
            for (var i = 0; i < signs.length; i++) {
                func.sClick(signs[i]);
            }
        }
    }
    catch (e) {
        toastLog("未找到多余的连续签到");
        sleep(2000);
    }
    toastLog(appName + "已签到");
    sleep(3000);
}