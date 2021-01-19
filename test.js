// 导入模块
var func = require("func_list.js");

//var backNow = textContains('立刻返回').findOne();

func.sClick(className('android.view.View').text("立即抽奖").findOnce().parent().parent().parent().child(3));

// var backNow = descContains('立刻返回').findOne();
// sleep(1000);
// func.sClick(backNow);