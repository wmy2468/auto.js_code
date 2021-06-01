//toastLog(id("com.jd.lib.cashier.feature:id/cd").findOnce().click());
var func = require("func_list.js");
//test on laptop
var textPay = "待付款";
var textAll = "全部";

while (true) {
    sleep(1000);
    // 在全部订单和待付款切换
    try {
        func.sClick(text(textPay).findOnce());
        sleep(1250);
        func.sClick(text(textAll).findOnce());
    } catch (e) {

    }
}
