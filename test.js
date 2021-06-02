//toastLog(id("com.jd.lib.cashier.feature:id/cd").findOnce().click());
var func = require("func_list.js");
//test on laptop
var textPay = "待付款";
var textAll = "全部";
var moneyText;
moneyText = id("com.bill.quickmoney:id/mon_").findOnce().text();

log(moneyText.substring(2, moneyText.length - 1));