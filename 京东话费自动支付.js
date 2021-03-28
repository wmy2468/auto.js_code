// 导入模块
var func = require("func_list.js");
var selectArr = ["微信", "云闪付PAY"];

// toastLog(text("再次购买").findOnce());
// func.sClick(text("全部").findOnce());

var result = dialogsWin(selectArr);
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
        // 在全部订单和待付款切换
        try {
            func.sClick(id("com.jd.lib.ordercenter.feature:id/uk").findOnce().child(0).child(0));
            sleep(300);
            func.sClick(id("com.jd.lib.ordercenter.feature:id/uk").findOnce().child(0).child(1));
        } catch (e) {

        }
        func.sClick(text("去支付").findOnce());
        if (func.sClick(id("com.jd.lib.cashier.feature:id/cd").findOnce()) == true) {
            while (text("支付成功").findOnce() == false) {
                while (id("tv_title").text("选择付款方式").findOnce() == null) {
                    func.cClick(text("付款方式").findOnce());
                    sleep(800);
                }
                while (func.sClick(text("Huawei Pay").findOnce()) == false) {
                    scrollDown();
                }
                func.cClick(textContains(cardEndNumber).findOne());
                text("付款详情");
                func.sClick(text("确认付款").findOnce());
            }
            func.sClick(text("完成").findOne());
        }
        if (func.sClick(text("立即抽奖").findOnce())) {
            id("com.jd.lib.ordercenter.feature:id/uk").findOne();
        }
        // text("待付款").findOne();
    }
}

function wechat() {
    while (true) {
        try {
            func.sClick(id("com.jd.lib.ordercenter.feature:id/uk").findOnce().child(0).child(0));
            sleep(300);
            func.sClick(id("com.jd.lib.ordercenter.feature:id/uk").findOnce().child(0).child(1));
        } catch (e) {

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
            id("com.jd.lib.ordercenter.feature:id/uk").findOne();
        }
        // text("待付款").findOne();
    }
}