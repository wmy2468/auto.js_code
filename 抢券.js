auto.waitFor();
// 导入模块
var func = require("func_list.js");

main();

function main() {
    var selectedArr = [
        "光大活动",
        "中信活动",
        "工行活动",
        "交行5积分",
        "京东腾讯月"
    ];

    //---------------配置区域-----------------
    var scriptName = func.dialogsWin(selectedArr);      // 设置查找的文本        
    // 设置屏幕常亮6分钟
    device.keepScreenOn(1000 * 60 * 6);
    switch (scriptName) {
        case "光大活动":
            光大活动();
            break;
        case "中信活动":
            中信活动();
            break;
        case "工行活动":
            工行活动();
            break;
        case "掌上星巴克":
            掌上星巴克();
            break;
        case "交行5积分":
            交行5积分();
            break;
        case "京东腾讯月":
            京东腾讯月();
            break;
    }
    toastLog("结束");
    device.cancelKeepingAwake();
}
// ------------------------------------------------------

// 到点点击
function 光大活动() {
    toastLog("到点点击");
    var startTime, targetViewText;
    var actNames = ["每日11点10元KFC", "每日10点10元30天猫", "周末11点50元海底捞", "周末11点50元必胜客"];
    var actName = func.dialogsWin(actNames);      // 设置查找的文本
    switch (actName) {
        case "每日11点10元KFC":
            startTime = "11,00,00,000";
            targetViewText = "【活动编号】30456";
            break;
        case "每日10点10元30天猫":
            startTime = "10,00,00,000";
            targetViewText = "【活动编号】33735";
            break;
        case "周末11点50元必胜客":
            startTime = "10,59,59,650";
            targetViewText = "【活动编号】33741";
            break;
        case "周末11点50元海底捞":
            startTime = "10,59,59,650";
            targetViewText = "【活动编号】33739";
            break;
    }

    var appName = "阳光惠生活";
    var timeArea = "北京时间";
    launchApp(appName);
    // 等待进入指定页面
    while (!textContains(targetViewText).findOnce()) {
        toastLog("请跳转到券领取页面，直到提示  已到达等待页面");
        sleep(1000);
    }
    toastLog("已到达指定页面，等待");
    //   定位元素
    func.getTimeDiff(timeArea, startTime);
    func.sClick(className("android.view.View").text("确认购买").findOne());
    toastLog("已点击，请确认结果");
    sleep(3000);
}

// 等待页面加载
function 交行5积分() {
    toastLog("等待页面变化");
    var appName = "买单吧";
    launchApp(appName);
    // 等待进入指定页面
    var gasPacket;
    text("本月可用兑换资格2次").findOne();
    while (1) {
        //点击元素
        try {
            //toastLog(className("android.view.View").text("21元用卡保障刷卡金").find().length);
            //gasPacket = className("android.view.View").text("21元用卡保障刷卡金").findOnce().parent().parent().child(1);
            gasPacket = className("android.view.View").text("加油卡充值30元红包").findOnce().parent().parent().child(1);
            if (gasPacket.text() == "抢兑") {
                func.sClick(gasPacket);
            } else {
                continue;
            }
            func.sClick(className("android.view.View").text("确认").findOne());
        } catch (e) {
            continue;
        }
        break;
    }
}


// 等待页面变价
function 中信活动() {
    var appName = "动卡空间";
    var timeArea = "北京时间";
    var startTime, targetViewText;
    var actNames = ["10点-9积分兑换", "周三六11点-5折必胜客百果园", "15点-星巴克中杯"];
    var actName = func.dialogsWin(actNames);      // 设置查找的文本
    var couDes;    // 券描述列表
    switch (actName) {
        case "10点-9积分兑换":
            toastLog("等待页面变化");
            startTime = "09,59,45,000"
            couDes = ["星巴克中杯", "必胜客30元", "奈雪", "喜茶25元", "苏宁易购20元", "百果园20元", "京东支付券20元", "天猫20元", "美团外卖20元"];
            targetViewText = func.dialogsWin(couDes);               // 设置查找的文本
            launchApp(appName);             // 启动APP
            var couClick = textContains(targetViewText).findOnce();          // 找券
            while (couClick == null) {
                couClick = textContains(targetViewText).findOnce();          // 找券
                toastLog("请跳转到券 列表 页面，直到提示  已到达等待页面");
                sleep(1000);
            }
            toastLog("已到达等待页面，提前15秒自动进入");
            func.getTimeDiff(timeArea, startTime);              // 等待到15秒的时候再进入
            func.sClick(couClick);              // 点击标签
            targetViewText = "价格: 1个权益+9个积分";               // 设置查找的文本
            text(targetViewText).findOne();             // 等待进入指定页面
            toastLog("已到达指定页面，等待");
            //点击元素
            func.sClick(className("android.view.View").text("去兑换").findOne());
            func.sClick(className("android.view.View").text("去支付").findOne());
            toastLog("已点击，等待验证码");
            sleep(3000);
            break;
        case "周三六11点-5折必胜客百果园":
            toastLog("到点点击");
            startTime = "11,00,00,000";             // 设置时间点
            couDes = ["必胜客100元代金券", "百果园50元代金券"];             // 券名称
            targetViewText = func.dialogsWin(couDes);               // 设置查找的文本
            launchApp(appName);             // 启动APP
            // 等待进入指定页面
            var couClick = className("android.view.View").text(targetViewText).findOnce();
            while (!couClick) {
                couClick = className("android.view.View").text(targetViewText).findOnce();
                toastLog("请跳转到券 列表 页面，直到提示  已到达等待页面");
            }
            toastLog("已到达指定页面，等待");
            func.getTimeDiff(timeArea, startTime);              // 等待时间
            func.sClick(couClick);             // 点击元素
            // 点击元素
            func.sClick(className("android.widget.Button").text("立即购买").findOne());
            func.sClick(className("android.view.View").text("确认").findOne());
            toastLog("已点击，请确认结果");
            sleep(3000);
            break;
        case "15点-星巴克中杯":
            toastLog("等待页面变化");
            startTime = "14,59,45,000"
            targetViewText = "星巴克中杯";               // 设置查找的文本
            launchApp(appName);             // 启动APP
            var couClick = textContains(targetViewText).findOnce();          // 找券
            while (couClick == null) {
                couClick = textContains(targetViewText).findOnce();          // 找券
                toastLog("请跳转到券 列表 页面，直到提示  已到达等待页面");
                sleep(1000);
            }
            toastLog("已到达等待页面，提前15秒自动进入");
            func.getTimeDiff(timeArea, startTime);              // 等待到15秒的时候再进入
            func.sClick(couClick);              // 点击标签
            targetViewText = "价格: 1个权益+9个积分";               // 设置查找的文本
            text(targetViewText).findOne();             // 等待进入指定页面
            toastLog("已到达指定页面，等待");
            //点击元素
            func.sClick(className("android.view.View").text("去兑换").findOne());
            func.sClick(className("android.view.View").text("去支付").findOne());
            toastLog("已点击，等待验证码");
            sleep(3000);
            break;
    }
}

// 等待页面变价
function 京东腾讯月() {
    var actNames = ["腾讯视频VIP月卡", "肯德基10元代金券"];
    var actName = func.dialogsWin(actNames);      // 设置查找的文本
    toastLog("等待页面变化");
    var appName = "京东金融";
    launchApp(appName);
    var tVip = className("android.view.View").text(actName).findOnce();
    var tVip2 = className("android.view.View").desc(actName).findOnce();
    // 等待进入指定页面
    while (!(tVip || tVip2)) {
        tVip = className("android.view.View").text(actName).findOnce();
        tVip2 = className("android.view.View").desc(actName).findOnce();
        toastLog("请跳转到腾讯月卡领取页面，直到提示  已到达等待页面");
        sleep(1000);
    }
    toastLog("已到达指定页面，等待");

    var getBtn, tencentVip;
    if (tVip == null) {
        tencentVip = tVip;
    } else {
        tencentVip = tVip2;
    }
    while (1) {
        try {
            // 找到领取按钮
            getBtn = tencentVip.parent().child(4).child(0);
            if (getBtn != null) {
                if (getBtn.text() == "立即领取" || getBtn.desc() == "立即领取") {
                    getBtn.click();
                    toastLog("结束");
                    sleep(800);
                    break;
                }
            }
        } catch (e) {
            continue;
        }
    }
}

function 工行活动() {
    var appName = "工银E生活";
    var timeArea = "北京时间";
    var startTime = "10,29,59,000";
    var actNames = ["周二25元卡券", "每日42元卡券"];
    var actName = func.dialogsWin(actNames);      // 设置查找的文本
    var couName, couNames;
    couNames = ["沃尔玛50元代金券", "星巴克50元代金券", "肯德基50元代金券"];
    couName = func.dialogsWin(couNames);      // 设置查找的文本
    launchApp(appName);             // 启动APP
    switch (actName) {
        case "每日42元卡券":
            // 找到使用流程，且找到对应券名称沃尔玛的情况下就是 券的详情页
            while (!(text("使用流程").findOnce() && text(couName).findOnce())) {
                toastLog("请进入活动页面，直到提示  已到达等待页面");
                sleep(333);
            }
            toastLog("已到达指定页面，等待");
            func.getTimeDiff(timeArea, startTime);              // 等待时间
            // 等待点击立即购买
            while (!text("安全验证").findOnce()) {
                if (func.sClick(text("知道了").findOnce())) {
                    sleep(150);
                }
                if (func.sClick(text("立即购买").findOnce())) {
                    sleep(150);
                }
            }
            toastLog("已点击，请确认结果");
            sleep(3000);
            break;
        case "周二25元卡券":
            // 找不到更多地区，且找到沃尔玛的情况下就是25元的页面
            while (!(!text("更多地区").findOnce() && text(couName).findOnce())) {
                toastLog("请进入活动页面，直到提示  已到达等待页面");
                sleep(333);
            }
            toastLog("已到达指定页面，等待");
            func.getTimeDiff(timeArea, startTime);              // 等待时间
            // 未找到立即购买 就持续点击
            while (!func.sClick(text("立即购买").findOnce())) {
                if (func.sClick(text("知道了").findOnce())) {
                    sleep(150);
                }
                if (func.sClick(className("android.widget.Image").text(couName).findOnce())) {
                    sleep(150);
                }
            }
            toastLog("已点击，请输入验证码");
            sleep(3000);
            break;
    }
}