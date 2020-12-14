auto.waitFor();
// 导入模块
var func = require("func_list.js");
// 入口统一为 收藏夹
var selectedArr = [
    "京东茅台",
    "苏宁茅台",
    "天猫茅台"
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

// ------------------------------------------------------

// 到点点击
function 苏宁茅台() {
    var startTime, targetViewText;
    var selActIdx = dialogs.select("选择启动", actNames);
    if (selActIdx == -1) {
        exit();
    }
    var actName = actNames[selActIdx];
    switch (actName) {
        case "每日11点10元KFC":
            startTime = "11,00,00,000";
            targetViewText = "【活动编号】30456";
            break;
        case "每日10点10元30天猫":
            startTime = "10,00,00,000";
            targetViewText = "【活动编号】23851";
            break;
        case "周末11点50元必胜客":
            startTime = "11,00,00,000";
            targetViewText = "【活动编号】26829";
            break;
        case "周末11点50元海底捞":
            startTime = "11,00,00,000";
            targetViewText = "【活动编号】26951";
            break;
    }

    var appName = "阳光惠生活";
    var timeArea = "北京时间";
    launchApp(appName);
    // 等待进入指定页面
    text(targetViewText).findOne();
    toastLog("已到达指定页面，等待");
    //   定位元素
    func.getTimeDiff(timeArea, startTime);
    func.sClick(className("android.view.View").text("确认购买").findOne());
    toastLog("结束");
    sleep(800);
}

function 天猫茅台() {
    // 只有购物车抢购模式
    var appName = "手机淘宝"
    var timeArea = "淘宝时间";
    var startTimes = ["19,00,00,000", "20,00,00,000"];
    var startTime = dialogsWin(startTimes);
    var targetViewText = "结算(1)";;
    // 启动APP
    launchApp(appName);
    // 等待用户选择到指定页面
    text(targetViewText).findOne();
    // 等待时间到达
    // func.getTimeDiff(timeArea, startTime);
    // 循环点击元素
    var sureOrder, submitOrder;     // 确认订单，提交订单
    while (1) {
        // 点击结算
        func.sClick(className("android.widget.TextView").id("button_cart_charge").text("结算(1)").findOne());
        sureOrder = className("android.widget.TextView").id("btn_back").text("确认订单").findOne();
        if (text("失效宝贝").findOnce() == null) {
            func.sClick(sureOrder);     // 点击返回
        }
        else {
            // 点击提交订单
            var submitOrder = className("android.widget.TextView").text("提交订单").findOnce();
            if (!submitOrder) {
                func.sClick(submitOrder.parent());
            }
        }
    }
    // 提示结束
    toastLog("结束");
    sleep(800);
}

function dialogsWin(inArr) {
    var selIdx = dialogs.select("选择启动", inArr);
    if (selIdx == -1) {
        exit();
    }
    return inArr[selIdx];
}