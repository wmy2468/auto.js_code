// 导入模块
var func = require("func_list.js");

//var backNow = textContains('立刻返回').findOne();

var popUp = text("立即抽奖").findOne();
var popUpLen = (popUp.parent().parent().parent()).childCount();
toastLog(popUpLen);
func.sClick((popUp.parent().parent().parent()).child(popUpLen - 1));

// var backNow = descContains('立刻返回').findOne();
// sleep(1000);
// func.sClick(backNow);