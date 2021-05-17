auto.waitFor();
var func = require("func_list.js");

main();

function main() {
    // zhonghang_XYK();
    nongye_CXK();
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

// 小豆
function nongye_CXK() {
    var appName = "com.android.bankabc";
    //closeApp(appName);
    func.toPackage(appName);
    lineBtn = className("android.widget.LinearLayout").id("alphaTabsIndicator").findOnce();
    while (lineBtn == null) {
        lineBtn = className("android.widget.LinearLayout").id("alphaTabsIndicator").findOnce();
        sleep(1000);
    }
    sleep(1000);
    //点击我的按钮
    func.sClick(lineBtn.child(4));
    sleep(1200);
    // 签到按钮
    func.cClick(id("tv_my_haidou_unlogin").text("小豆").findOne());
    //toastLog("我的已点击");
    while (textContains("小豆秒杀").findOnce() == null) {
        if (text("切换登录方式").findOnce() != null) {
            //toastLog("滑动手势");
            sleep(500);
            func.gesture_pwd(appName);
            sleep(2000);
        }
    }
    //toastLog("找签到");
    while (text("已经签到").findOnce() == null) {
        func.sClick(text("收起").findOnce());
        sleep(1200);
        func.sClick(text("签到有礼").findOnce());
        sleep(1200);
        func.sClick(text("签到得豆").findOnce());
        sleep(1200);
    }
    toastLog(appName + "已签到");
    sleep(1000);
}
