// 导入模块
var func = require("func_list.js");

while (true) {
    func.sClick(text("全部").findOnce());
    func.sClick(text("待付款").findOnce());
    func.sClick(text("去支付").findOnce());
    if (func.sClick(id("com.jd.lib.cashier.feature:id/cf").findOnce())) {
        while (!func.sClick(text("完成").findOnce())) {
            func.sClick(text("立即支付").findOnce());
            func.sClick(text("确认支付").findOnce());
        }
    }
    if (func.sClick(text("立即抽奖").findOnce())) {
        text("恭喜你").findOne();
    }
}