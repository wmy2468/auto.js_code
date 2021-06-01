// 导入模块
var func = require("func_list.js");
var selectArr = ["weiXinn", "YunShaofu"];

// toastLog(text("再次购买").findOnce());
// func.sClick(text("全部").findOnce());

var result;

var textPay = "待付款";
var textAll = "全部";
var textBar = "京东收银台"

result = func.dialogsWin(selectArr);
var cardEndNumber;

if (result == "weiXinn") {
    func.toApp("京东");
    weiXinn();
} else if (result == "YunShaofu") {
    cardEndNumber = func.dialogsWin(["2079", "5177", "8589", "8636", "4471", "1729", "5976"]);
    func.toApp("京东");
    hwzhifu();
}

function hwzhifu() {

    while (true) {
        sleep(1000);
        // 在全部订单和待付款切换
        try {
            func.sClick(text(textPay).findOnce());
            sleep(1250);
            func.sClick(text(textAll).findOnce());
        } catch (e) {

        }
        if (text("重新加载").findOnce()) {
            back();
            sleep(500);
        }

        func.sClick(textContains("去支付").findOnce());
        if (text(textBar).findOnce() != null) {
            func.sClick(textContains("云闪付").findOne());
            sleep(500);
            func.sClick(className("android.widget.TextView").textContains("银联支付").findOne());
            toastLog("切换到YunShaofu");
            text("付款详情").findOne();
            sleep(1000);
            func.sClick(text("付款方式").findOne());

            while (func.sClick(text("Huawei Pay").findOnce()) == false) {
                scrollDown();
                sleep(500);
            }
            text("选择付款方式").findOne();

            while (text("付款详情").findOnce() == null) {
                sleep(500);
                if (!func.cClick(text("[" + cardEndNumber + "]").findOnce())) {
                    scrollDown();
                    sleep(1000);
                } else {
                    sleep(2500);
                }
            }
            func.sClick(text("确认付款").findOnce());
            text("支付成功").findOne();
            sleep(1000);
            back();
            log(text("查看订单").findOne());
            if (text("立即抽奖").findOnce()) {
                sleep(2000);
                back();
                // 待付款滑动栏
                textContains(textPay).findOne();
            }
        }
        // text("待付款").findOne();
    }
}

function weiXinn() {

    while (true) {
        sleep(1000);
        try {
            func.sClick(text(textPay).findOnce());
            sleep(1250);
            func.sClick(text(textAll).findOnce());
        } catch (e) {

        }
        if (text("重新加载").findOnce()) {
            back();
            sleep(500);
        }
        func.sClick(textContains("去支付").findOne());
        if (text(textBar).findOnce()) {
            func.sClick(textContains("微信支付").findOnce());
            sleep(500);
            func.sClick(className("android.widget.TextView").depth(12).text("微信支付").findOnce());
            if (device.brand == "HUAWEI") {
                text("使用以下方式打开").findOne();
                sleep(1000);
                click(250, 1900);
            }
            while (func.cClick(text("返回商家").findOnce()) == false) {
                func.sClick(text("立即支付").findOnce());
                sleep(150);
                func.sClick(text("继续支付").findOnce());
                sleep(150);
                func.sClick(text("确认支付").findOnce());
                sleep(150);
            }
            text("完成").findOne();
        }
        if (text("立即抽奖").findOnce()) {
            sleep(2000);
            back();
            // 待付款滑动栏
            textContains(textPay).findOne();
        }
        // text("待付款").findOne();
    }
}