// 导入模块
var func = require("func_list.js");
launchApp("京东");
text("立即领红包").findOne();
toastLog(text("立即领红包").find().length);