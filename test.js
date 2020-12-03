auto.waitFor();
// 导入模块
var func = require("func_list.js");
let area;
area = "北京时间";
// area = "京东时间";
// area = "淘宝时间";

showTime(func.calTimeDiff(area));

function showTime(timeDiffer) {
    let today, h, m, s;
    console.show();
    while (1) {
        today = new Date(new Date().getTime() + timeDiffer);
        h = today.getHours();
        m = checkTime(today.getMinutes());
        s = checkTime(today.getSeconds());
        ms = today.getMilliseconds();
        console.log(h + ":" + m + ":" + s + ":" + ms);
        sleep(200);
        console.clear();
    }
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}