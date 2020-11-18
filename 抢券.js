auto.waitFor();
// 导入模块
var func = require("func_list.js");
// 123
var selectedArr = [
    "每日10点光大天猫",
    "中信9积分"
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

function 模板() {
    let appName = "交通银行";
    let targetTime = "12,00,00,000";
    let clickEle;
    isInApp(appName);
    //   定位元素
    isInTime(targetTime);
    func.sClick(clickEle);
    func.sClick(text("确认兑换").findOne());
}

// ------------------------------------------------------
function getToday() {
    var date = new Date();
    var seperator1 = ",";
    var year = date.getFullYear();
    var month = date.getMonth();
    var strDate = date.getDate();
    return year + seperator1 + month + seperator1 + strDate;
}

// 判断是否切换到APP
function isInApp(appName) {
    // 等待APP启动
    while (currentPackage() != getPackageName(appName)) {
        log("等待APP加载");
    }
    toastLog("APP已加载");
}
// 判断时间
function isInTime(targetTime) {
    let tDate = getToday() + "," + targetTime;
    stDate = tDate.split(",");
    let targetTimestamp = new Date(stDate[0], stDate[1], stDate[2], stDate[3], stDate[4], stDate[5], stDate[6]).getTime();
    let timeDiff = func.getTimeDiff("a");
    curTimestamp = new Date().getTime() + timeDiff;
    // 等待时间
    while (curTimestamp < targetTimestamp) {
        curTimestamp = new Date().getTime() + timeDiff;
    }
}
// ------------------------------------------------------

// 等待页面变价
function 每日10点光大天猫() {
    let appName = "阳光惠生活";
    launchApp(appName);
    // 等待进入指定页面
    text("【活动编号】23851").findOne();
    toastLog("已到达指定页面，等待");
    //   定位元素
    while (1) {
        if (className("android.view.View").text("提醒我").findOnce()) {
            continue;
        }
        break;
    }
    func.sClick(className("android.view.View").text("确认购买").findOne())
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
    func.sClick(className("android.view.View").text("去支付").findOnce());
    sleep(800);
}