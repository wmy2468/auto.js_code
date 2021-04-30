// 导入模块
var func = require("func_list.js");
var selectArr = ["weiXinn", "YunShaofu"];

// toastLog(text("再次购买").findOnce());
// func.sClick(text("全部").findOnce());

var result;

var textPay = " 待付款 ";
var textAll = " 全部 ";
var scrollBarID = "com.jd.lib.ordercenter.feature:id/un";
var payBtnID = "com.jd.lib.cashier.feature:id/cl"

result = func.dialogsWin(selectArr);


if (result == "weiXinn") {
    func.toApp("京东");
    weiXinn();
} else if (result == "YunShaofu") {
    func.toApp("京东");
    hwzhifu();
}

function hwzhifu() {
    var cardEndNumber = func.dialogsWin(["2079", "5177", "8589"]);
    while (true) {
        sleep(1000);
        // 在全部订单和待付款切换
        try {
            func.sClick(text(textPay).findOnce());
            sleep(1250);
            func.sClick(text(textAll).findOnce());
            sleep(1250);
        } catch (e) {

        }
        if (text("重新加载").findOnce()) {
            back();
            sleep(500);
        }
        func.sClick(text("去支付").findOnce());
        if (func.sClick(id(payBtnID).findOnce()) == true) {

            toastLog("切换到YunShaofu");
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
                sleep(500);
                if (!func.cClick(text("[" + cardEndNumber + "]").findOnce())) {
                    scrollDown();
                    sleep(1000);
                } else {
                    sleep(3000);
                }
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
                text(textPay).findOne();
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
            sleep(1250);
        } catch (e) {

        }
        if (text("重新加载").findOnce()) {
            back();
            sleep(500);
        }
        func.sClick(text("去支付").findOnce());
        if (func.sClick(id(payBtnID).findOnce())) {
            if (device.brand == "HUAWEI") {
                text("使用以下方式打开").findOne();
                sleep(1000);
                click(250, 1900);
            }
            while (func.cClick(text("返回商家").findOnce()) == false) {
                func.sClick(text("立即支付").findOnce());
                func.sClick(text("继续支付").findOnce());
                func.sClick(text("确认支付").findOnce());
            }
            text("完成").findOne();
        }
        if (func.sClick(text("立即抽奖").findOnce())) {
            sleep(8000);
            back();
            // 待付款滑动栏
            text(textPay).findOne();
        }
        // text("待付款").findOne();
    }
}