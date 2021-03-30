// 导入模块
var func = require("func_list.js");
var selectArr = ["微信", "云闪付PAY"];

// toastLog(text("再次购买").findOnce());
// func.sClick(text("全部").findOnce());

var result;

if (device.brand == "HUAWEI") {
    result = "云闪付PAY";
} else if (device.brand == "xiaomi") {
    result == "微信";
} else {
    result = func.dialogsWin(selectArr);
}

var cardEndNumber = "2079";

if (result == "微信") {
    func.toApp("京东");
    wechat();
} else if (result == "云闪付PAY") {
    func.toApp("京东");
    huaweiPay();
}

function huaweiPay() {
    while (true) {
        sleep(1000);
        // 在全部订单和待付款切换
        try {
            func.sClick(id("com.jd.lib.ordercenter.feature:id/uk").findOnce().child(0).child(0));
            sleep(1250);
            func.sClick(id("com.jd.lib.ordercenter.feature:id/uk").findOnce().child(0).child(1));
            sleep(1250);
        } catch (e) {

        }
        if (text("重新加载").findOnce()) {
            back();
            sleep(500);
        }
        func.sClick(text("去支付").findOnce());
        if (func.sClick(id("com.jd.lib.cashier.feature:id/cd").findOnce()) == true) {

            toastLog("切换到云闪付");
            while (text("选择付款方式").findOnce() == null) {
                func.cClick(text("付款方式").findOnce());
                sleep(800);
            }
            while (func.sClick(text("Huawei Pay").findOnce()) == false) {
                scrollDown();
                sleep(500);
            }
            text("选择付款方式").findOne();

            while (text("付款详情").findOnce() == null) {
                func.cClick(text("[" + cardEndNumber + "]").findOnce());
                sleep(500);
            }
            func.sClick(text("确认付款").findOnce());
            text("支付成功").findOne();
            func.sClick(text("完成").findOne());
            text("查看订单").findOne();
            sleep(500);
            if (func.sClick(text("立即抽奖").findOnce())) {
                sleep(8000);
                back();
                // 待付款滑动栏
                id("com.jd.lib.ordercenter.feature:id/uk").findOne();
            }


        }
        // text("待付款").findOne();
    }
}

function wechat() {
    while (true) {
        sleep(1000);
        try {
            func.sClick(id("com.jd.lib.ordercenter.feature:id/uk").findOnce().child(0).child(0));
            sleep(1250);
            func.sClick(id("com.jd.lib.ordercenter.feature:id/uk").findOnce().child(0).child(1));
            sleep(1250);
        } catch (e) {

        }
        if (text("重新加载").findOnce()) {
            back();
            sleep(500);
        }
        func.sClick(text("去支付").findOnce());
        if (func.sClick(id("com.jd.lib.cashier.feature:id/cd").findOnce())) {
            while (func.cClick(text("返回商家").findOnce()) == false) {
                func.cClick(text("立即支付").findOnce());
                func.cClick(text("确认支付").findOnce());
            }
            text("完成").findOne();
        }
        if (func.sClick(text("立即抽奖").findOnce())) {
            sleep(8000);
            back();
            // 待付款滑动栏
            id("com.jd.lib.ordercenter.feature:id/uk").findOne();
        }
        // text("待付款").findOne();
    }
}