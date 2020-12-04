auto.waitFor();

// 导入模块
var func = require("func_list.js");

var selectedArr = [
    "北京时间",
    "京东时间",
    "苏宁时间",
    "淘宝时间"
];


var selectIndex = dialogs.select("选择时间", selectedArr);
if (selectIndex == -1) {
    exit();
}

var timeDiff = func.calTimeDiff(selectedArr[selectIndex])
// func.showTime(func.calTimeDiff(selectedArr[selectIndex]));

var window = floaty.window(
    <frame gravity="center" bg="#1F1F1F" h="25dp" >
        <text id="text" textSize="20sp" textStyle="bold" typeface="monospace" textColor="#00FFFF" />
    </frame >
);

window.exitOnClose();

window.text.click(() => {
    window.setAdjustEnabled(!window.isAdjustEnabled());
});

setInterval(() => {
    //对控件的操作需要在UI线程中执行
    ui.run(function () {
        window.text.setText(dynamicText());
    });
}, 10);

// 更新悬浮文字
function dynamicText() {
    var str = showTime(timeDiff)
    //var str = util.format("时间: %d:%d:%d\n", date.getHours(), date.getMinutes(), date.getSeconds());
    //str += util.format("内存使用量: %d%%\n", getMemoryUsage());
    //str += "当前活动: " + currentActivity() + "\n";
    //str += "当前包名: " + currentPackage();
    return str;
}

// //获取内存使用率
// function getMemoryUsage() {
//     var usage = (100 * device.getAvailMem() / device.getTotalMem());
//     //保留一位小数
//     return Math.round(usage * 10) / 10;
// }

function showTime(timeDiffer) {
    var today, h, m, s;
    today = new Date(new Date().getTime() + timeDiffer);
    h = today.getHours();
    m = checkTime(today.getMinutes());
    s = checkTime(today.getSeconds());
    ms = today.getMilliseconds();
    return util.format(selectedArr[selectIndex] + ": %d:%s:%s:%s\n", h, m, s, ms);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}