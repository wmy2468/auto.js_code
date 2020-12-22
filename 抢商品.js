auto.waitFor();
// 导入模块
var func = require("func_list.js");
// 根据设备区分延迟
var deviceDelayTB;
if (device.brand == "HUAWEI") {
    deviceDelayTB = 50;
} else if (device.brand == "xiaomi") {
    deviceDelayTB = 50;
}

// 入口统一为 收藏夹
var selectedArr = [
    "京东茅台",
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
function 京东茅台() {
    // 等待页面变价模式
    toastLog("请选择到预约或收藏界面, 如有提示已到达等待页面请重启");

    var appName = "京东"
    var timeArea = "京东时间";
    var startTime = "09,59,50,000";
    var targetViewText = "贵州茅台酒";
    launchApp(appName);             // 启动APP
    // 等待用户选择到指定页面 条件=商品或预约 + 茅台
    while ((text("我的预约").findOnce() || id("favo_goods_tab").text("商品").findOnce()) && textContains(targetViewText).findOnce()) {
        toastLog("请跳转到收藏界面或者 预约界面，直到提示  已到达等待页面");
        sleep(800);
    }
    toastLog("已到达等待页面");
    func.getTimeDiff(timeArea, startTime);              // 等待时间到达
    func.sClick(textContains(targetViewText).findOne());                // 点击商品进入
    func.sClick(text("立即抢购").findOne());                // 等待页面变价 点击元素 
    // 点击提交订单
    while (!func.sClick(text("提交订单").findOnce())) {
        // 点击立即抢购
        func.sClick(text("立即抢购").findOnce());
        if (textContains("很遗憾").findOnce()) {
            back();
            continue;
        }
        sleep(400);
    }
    while (1) {
        func.sClick(text("提交订单").findOnce());
        sleep(333);
    }
    // 提示结束
    toastLog("结束");
    sleep(800);
}

function 天猫茅台() {
    // 只有购物车抢购模式
    var appName = "手机淘宝"
    var timeArea = "淘宝时间";
    var startTime = "19,59,59," + (700 - deviceDelayTB).toString();
    var targetViewText = "结算(1)";;
    launchApp(appName);             // 启动APP
    // 等待用户选择到指定页面
    while (!text(targetViewText).findOnce()) {
        toastLog("请勾选商品，购物车显示为结算(1)，直到提示  已到达等待页面");
        sleep(1000);
    }
    toastLog("已到达等待页面");
    func.getTimeDiff(timeArea, startTime);              // 等待时间到达
    // 循环点击元素
    while (!text("支付宝账号").findOnce()) {
        if (func.sClick(id("button_cart_charge").text("结算(1)").findOnce())) {
            sleep(300);
        }
        func.sClick(text("我知道了").findOnce());
        if (func.sClick(className("android.widget.TextView").text("提交订单").findOnce())) {
            sleep(335);
        }

    }
    // 提示结束
    toastLog("结束");
    sleep(800);
}