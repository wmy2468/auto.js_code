// 导入模块
var func = require("func_list.js");

func.toApp("京东");

// toastLog(text("再次购买").findOnce());
// func.sClick(text("全部").findOnce());

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