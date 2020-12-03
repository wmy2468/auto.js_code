auto.waitFor();
// 导入模块
var func = require("func_list.js");

var selectedArr = [
    "北京时间",
    "京东时间",
    "淘宝时间"
];

let selectIndex = dialogs.select(selectedArr);
if (selectIndex == -1) {
    exit();
}

func.showTime(func.calTimeDiff(selectedArr[selectIndex]));