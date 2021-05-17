auto.waitFor();
var func = require("func_list.js");

main();

function main() {
    // zhonghang_XYK();
    nongye_CXK();
    什么值得买();
    jd_sign();
    YunShaofu();
    pufa_CXK();
    pufa_XYK();
    //gonghang_XYK();
    //youchu_CXK();

    youchu_XYK();
    //huaxia_XYK();
    jiaohang_XYK();
    alert("已完成.");
}

function 什么值得买() {
    var appName = "什么值得买";
    func.toApp(appName);
    var signBtn = null;
    while (signBtn == null) {
        signBtn = id("tv_login_sign").findOnce();
        func.sClick(id("tab_usercenter").text("我的").findOnce());
        sleep(800);
        func.sClick(id("dialog_home_ads_close").findOnce());
        sleep(800);
        func.passAd();
    }
    sleep(800);
    func.sClick(signBtn);
    sleep(1000);
    //textContains("已连续签到").findOne();
    toastLog(appName + "已签到");
    sleep(1200);
}