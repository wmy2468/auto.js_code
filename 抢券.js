auto.waitFor();
// 导入模块
var func = require("func_list.js");
// 123
var selectedArr = [
    "每日10点光大天猫",
    "中信9积分",
    "中信365",
    "TEST"
];

//淘宝测试();
main();

//---------------配置区域-----------------
function main() {
    let selectIndex = dialogs.select("先打开抢购页面,再启动", selectedArr);
    if (selectIndex == -1) {
        exit();
    }
    let scriptName = selectedArr[selectIndex];
    //engines.execScript(scriptName, (eval(scriptName + "()")));
    eval(scriptName + "()");
    toastLog("结束");
}

function TEST() {
    images.requestScreenCapture();
    let startTime = "09,18,00,100";
    func.getTimeDiff("北京时间", startTime);
    images.captureScreen();
}

// ------------------------------------------------------

// 判断是否切换到APP
function isInApp(appName) {
    // 等待APP启动
    while (currentPackage() != getPackageName(appName)) {
        log("等待APP加载");
    }
    toastLog("APP已加载");
}
// ------------------------------------------------------

// 到点点击
function 每日10点光大天猫() {
    let appName = "阳光惠生活";
    let startTime = "10,00,00,100";
    launchApp(appName);
    // 等待进入指定页面
    text("【活动编号】23851").findOne();
    toastLog("已到达指定页面，等待");
    //   定位元素
    func.getTimeDiff("北京时间", startTime);
    func.sClick(className("android.view.View").text("确认购买").findOne());
    toastLog("结束");
    sleep(800);
}

// 等待页面变价
function 中信9积分() {
    let appName = "动卡空间";
    launchApp(appName);
    // 等待进入指定页面
    text("价格: 1个权益+9个积分").findOne();
    toastLog("已到达指定页面，等待");
    //点击元素
    func.sClick(className("android.view.View").text("去兑换").findOne());
    func.sClick(className("android.view.View").text("去支付").findOne());
    toastLog("结束");
    sleep(800);
}

// 到点点击
function 中信365() {
    let appName = "动卡空间";
    let startTime = "11,00,00,100";
    // 券名称
    let couDes = ["必胜客100元代金券", "百果园50元代金券"];
    let couDesIndex = dialogs.select("选择要抢的券：", couDes);
    if (couDesIndex == -1) {
        toastLog("未选择元素");
        exit();
    }
    launchApp(appName);
    // 等待进入指定页面
    className("android.view.View").text(couDes[couDesIndex]).findOne();
    toastLog("已到达指定页面，等待");
    func.getTimeDiff("北京时间", startTime);
    //点击元素
    func.sClick(className("android.view.View").text(couDes[couDesIndex]).findOne());
    //点击元素
    func.sClick(className("android.widget.Button").text("立即购买").findOne());
    func.sClick(className("android.view.View").text("确认").findOne());
    toastLog("结束");
    sleep(800);
}

// 到点点击
function 掌上星巴克() {
    let appName = "掌上生活";
    let startTime = "10,00,00,100";
    let buyBtn;
    launchApp(appName);
    // 等待进入指定页面
    buyBtn = className("android.view.View").text("星巴克大杯馥芮白双杯券").findOne();
    toastLog("已到达指定页面，等待");
    func.getTimeDiff("北京时间", startTime);
    //点击元素
    func.sClick(buyBtn.parent().child(2));
    //点击元素
    func.sClick(className("android.widget.Button").text("确认订单").findOne());
    func.sClick(className("android.widget.Button").textContains("提交订单").findOne());
    toastLog("结束");
    sleep(800);
}