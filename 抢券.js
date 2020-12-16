auto.waitFor();
// 导入模块
var func = require("func_list.js");
// 123
var selectedArr = [
    "光大活动",
    "中信活动",
    "掌上星巴克",
    "交行5积分",
    "京东腾讯月"
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
function 光大活动() {
    var startTime, targetViewText;
    var actNames = ["每日11点10元KFC", "每日10点10元30天猫", "周末11点50元海底捞", "周末11点50元必胜客"];
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

// 等待页面加载
function 交行5积分() {
    var appName = "买单吧";
    launchApp(appName);
    // 等待进入指定页面
    while (1) {
        var gasPacket;
        gasPacket = textContains("加油卡充值30元红包").findOnce();
        if (gasPacket != null) {
            toastLog("找到元素");
            //点击元素
            func.sClick(gasPacket.parent().child(1).child(0));
            func.sClick(text("确认").findOne());
            break;
        }
    }
    toastLog("结束");
    sleep(800);
}


// 等待页面变价
function 中信活动() {
    var appName = "动卡空间";
    var timeArea = "北京时间";
    var startTime, targetViewText;
    var actNames = ["每日10点9积分兑换", "周三六11点5折券"];
    var selActIdx = dialogs.select("选择启动", actNames);
    if (selActIdx == -1) {
        exit();
    }
    var actName = actNames[selActIdx];
    var couDes;    // 券描述
    switch (actName) {
        case "每日10点9积分兑换":
            startTime = "09,59,45,000"
            couDes = ["星巴克中杯", "必胜客30元", "奈雪", "喜茶25元", "苏宁易购20元", "百果园20元", "京东支付券20元", "天猫20元", "美团外卖20元"];
            targetViewText = func.dialogsWin(couDes);
            // 找券
            var couClick = textContains(couDes).findOne();
            toastLog("已到找到对应券位置，提前15秒自动进入");
            // 等待到15秒的时候再进入
            func.getTimeDiff(timeArea, startTime);
            // 点击标签
            func.sClick(couClick);
            // 等待页面变化
            targetViewText = "价格: 1个权益+9个积分";
            launchApp(appName);
            // 等待进入指定页面
            text(targetViewText).findOne();
            toastLog("已到达指定页面，等待");
            //点击元素
            func.sClick(className("android.view.View").text("去兑换").findOne());
            func.sClick(className("android.view.View").text("去支付").findOne());
            toastLog("结束");
            sleep(800);
            break;
        case "周三六11点5折券":
            // 到点点击
            startTime = "11,00,00,000";
            // 券名称
            couDes = ["必胜客100元代金券", "百果园50元代金券"];
            // 设置查找的文本
            targetViewText = func.dialogsWin(couDes);
            launchApp(appName);
            // 等待进入指定页面
            className("android.view.View").text(targetViewText).findOne();
            toastLog("已到达指定页面，等待");
            // 等待时间
            func.getTimeDiff(timeArea, startTime);
            // 点击元素
            func.sClick(className("android.view.View").text(targetViewText).findOne());
            toastLog("点击商品");
            // 点击元素
            func.sClick(className("android.widget.Button").text("立即购买").findOne());
            func.sClick(className("android.view.View").text("确认").findOne());
            toastLog("结束");
            sleep(800);
            break;
    }
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