// 导入模块
var func = require("func_list.js");

//var backNow = textContains('立刻返回').findOne();

var popUp = text("我知道了").findOnce();
var popUpLen = popUp.parent().parent().parent().childCount();
func.sClick(popUp.child(popUpLen - 1));

// var backNow = descContains('立刻返回').findOne();
// sleep(1000);
// func.sClick(backNow);