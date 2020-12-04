auto.waitFor();
// 导入模块
var func = require("func_list.js");
// 123
var selectedArr = [
    "每日10点光大天猫",
    "中信9积分",
    "中信365",
    "掌上星巴克",
    "京东腾讯月",
    "TEST"
];

//淘宝测试();
main();

//---------------配置区域-----------------
function main() {

    var selectIndex = dialogs.select("先打开抢购页面,再启动", selectedArr);
    if (selectIndex == -1) {
        exit();
    }
    var scriptName = selectedArr[selectIndex];
    // 设置屏幕常亮6分钟
    device.keepScreenOn(1000 * 60 * 6);
    //engines.execScript(scriptName, (eval(scriptName + "()")));
    eval(scriptName + "()");
    toastLog("结束");
    device.cancelKeepingAwake();
}

function TEST() {
    var startTime = "";
    images.requestScreenCapture();
    func.getTimeDiff("北京时间", startTime);
    images.captureScreen("/sdcard/Pictures/Screenshots/a.png");
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
    var appName = "阳光惠生活";
    var startTime = "10,00,00,100";
    var timeArea = "北京时间";
    launchApp(appName);
    // 等待进入指定页面
    text("【活动编号】23851").findOne();
    toastLog("已到达指定页面，等待");
    //   定位元素
    func.getTimeDiff(timeArea, startTime);
    func.sClick(className("android.view.View").text("确认购买").findOne());
    toastLog("结束");
    sleep(800);
}

// 等待页面变价
function 中信9积分() {
    var appName = "动卡空间";
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
    var appName = "动卡空间";
    var startTime = "11,00,00,100";
    var timeArea = "北京时间";
    // 券名称
    var couDes = ["必胜客100元代金券", "百果园50元代金券"];
    var couDesIndex = dialogs.select("选择要抢的券：", couDes);
    if (couDesIndex == -1) {
        toastLog("未选择元素");
        exit();
    }
    launchApp(appName);
    // 等待进入指定页面
    className("android.view.View").text(couDes[couDesIndex]).findOne();
    toastLog("已到达指定页面，等待");
    func.getTimeDiff(timeArea, startTime);
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
    var appName = "掌上生活";
    var startTime = "10,00,00,100";
    var timeArea = "北京时间";
    var buyBtn;
    launchApp(appName);
    // 等待进入指定页面
    buyBtn = className("android.view.View").text("星巴克大杯馥芮白双杯券").findOne();
    toastLog("已到达指定页面，等待");
    func.getTimeDiff(timeArea, startTime);
    //点击元素
    func.sClick(buyBtn.parent().child(2));
    //点击元素
    func.sClick(className("android.widget.Button").text("确认订单").findOne());
    func.sClick(className("android.widget.Button").textContains("提交订单").findOne());
    toastLog("结束");
    sleep(800);
}

// 等待页面变价
function 京东腾讯月() {
    var appName = "京东金融";
    launchApp(appName);
    // 等待进入指定页面    
    var tencentVip = className("android.view.View").text("腾讯视频VIP月卡").findOne();
    var getBtn;
    toastLog("已到达指定页面，等待");
    while (1) {
        try {
            // 找到领取按钮
            getBtn = tencentVip.parent().child(4).child(0);
            if (getBtn != null) {
                getBtn.click();
                toastLog("结束");
                sleep(800);
                break;
            }
        } catch (e) {
            continue;
        }
    }
}