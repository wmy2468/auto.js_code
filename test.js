//toastLog(id("com.jd.lib.cashier.feature:id/cd").findOnce().click());
var func = require("func_list.js");
//test on laptop
var textPay = "待付款";
var textAll = "全部";

func.sClick(textContains("微信支付").findOne());
sleep(500);
func.sClick(className("android.widget.TextView").depth(12).text("微信支付").findOne());