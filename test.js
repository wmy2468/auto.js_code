var func = require("func_list.js");

var targetViewText = "贵州茅台酒";
var t1, t2;
func.sClick(textContains(targetViewText).findOne());                // 点击商品进入
t1 = new Date();
text("立即抢购").findOne();
t2 = new Date();
toastLog(t2 - t1);
