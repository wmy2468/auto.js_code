var selectedArr = [
    "北京时间",
    "京东时间",
    "苏宁时间",
    "淘宝时间"
];


var timeLimit = { "京东时间": 800, "淘宝时间": 800, "北京时间": 500, "苏宁时间": 800 };
var serverDelay = { "京东时间": 0, "淘宝时间": 0, "北京时间": 0, "苏宁时间": 0 };
// 每次请求之间的延迟
var reqDelay = 300;

var selectIndex = dialogs.select("选择时间", selectedArr);
if (selectIndex == -1) {
    exit();
}

var timeDiff = calTimeDiff(selectedArr[selectIndex])
// func.showTime(func.calTimeDiff(selectedArr[selectIndex]));

var window = floaty.window(
    <frame gravity="center" bg="#1F1F1F" h="25dp" >
        <text id="text" textSize="16sp" textStyle="bold" typeface="monospace" textColor="#00FFFF" />
    </frame >
);

window.exitOnClose();

window.text.click(() => {
    window.setAdjustEnabled(!window.isAdjustEnabled());
});

window.setPosition(470, 100);

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
    h = checkTime(today.getHours());
    m = checkTime(today.getMinutes());
    s = checkTime(today.getSeconds());
    ms = today.getMilliseconds();
    return util.format(selectedArr[selectIndex] + ":%d:%s:%s:%s\n", h, m, s, ms);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function calTimeDiff(area) {
    var timeDiff;
    // 获取时间误差
    switch (area) {
        case "京东时间":
            timeDiff = Math.trunc((jdTime() + jdTime() + jdTime()) / 3);
            break;
        case "北京时间":
            timeDiff = Math.trunc((beiJingTime() + beiJingTime() + beiJingTime()) / 3);
            break;
        case "淘宝时间":
            timeDiff = Math.trunc((tbTime() + tbTime() + tbTime()) / 3);
            break;
        case "苏宁时间":
            timeDiff = Math.trunc((snTime() + snTime() + snTime()) / 3);
            break;
        default:
            timeDiff = Math.trunc((beiJingTime() + beiJingTime() + beiJingTime()) / 3);
            break;
    }
    return timeDiff;
}



//京东时间
function jdTime() {
    var res, resTime, resTimestamp, sigma, delta;
    var timeArea = "京东时间";
    log("请求", timeArea);
    // 获取取一次时间耗时
    while (1) {
        stTimestamp = new Date();
        res = http.get("https://a.jd.com//ajax/queryServerData.html");
        edTimestamp = new Date();

        if (res.statusCode != 200) {
            toast("请求失败: " + res.statusCode + " " + res.statusMessage);
            exit();
        }
        log("请求总时长", edTimestamp - stTimestamp);

        if (edTimestamp - stTimestamp <= timeLimit[timeArea]) {
            resTime = res.body.json();
            resTimestamp = Number(resTime.serverTime);
            sigma = edTimestamp - stTimestamp;
            delta = resTimestamp - stTimestamp - Math.trunc(sigma / 2);
            log("时延", sigma);
            log("误差", delta);
            break;
        }
        sleep(reqDelay);
    }

    //返回时间差
    return delta + serverDelay[timeArea];
}

// 北京时间
function beiJingTime() {
    var res, resTime, resTimestamp, sigma, delta;
    var timeArea = "北京时间";
    log("请求", timeArea);
    // 获取取一次时间耗时
    while (1) {
        stTimestamp = new Date();
        res = http.get("http://www.hko.gov.hk/cgi-bin/gts/time5a.pr?a=1");
        edTimestamp = new Date();

        if (res.statusCode != 200) {
            toast("请求失败: " + res.statusCode + " " + res.statusMessage);
            exit();
        }
        log("请求总时长", edTimestamp - stTimestamp);

        if (edTimestamp - stTimestamp <= timeLimit[timeArea]) {
            resTime = res.body.string();
            resTimestamp = Number(resTime.replace("0=", ""));
            sigma = edTimestamp - stTimestamp;
            delta = resTimestamp - stTimestamp - Math.trunc(sigma / 2);
            log("时延", sigma);
            log("误差", delta);
            break;
        }
        sleep(reqDelay);
    }

    //返回时间差
    return delta + serverDelay[timeArea];
}

// 淘宝时间
function tbTime() {
    log("请求淘宝时间");
    var res, resTime, resTimestamp, sigma, delta;
    var timeArea = "淘宝时间";
    // 获取取一次时间耗时
    while (1) {
        stTimestamp = new Date();
        res = http.get("http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp");
        edTimestamp = new Date();

        if (res.statusCode != 200) {
            toast("请求失败: " + res.statusCode + " " + res.statusMessage);
            exit();
        }
        log("请求总时长", edTimestamp - stTimestamp);

        if (edTimestamp - stTimestamp <= timeLimit[timeArea]) {
            resTime = res.body.json();
            resTimestamp = Number(resTime.data.t);
            sigma = edTimestamp - stTimestamp;
            delta = resTimestamp - stTimestamp - Math.trunc(sigma / 2);
            log("时延", sigma);
            log("误差", delta);
            break;
        }
        sleep(reqDelay);
    }
    //返回时间差
    return delta + serverDelay[timeArea];
}

// 苏宁时间
function snTime() {
    var res, resTime, resTimestamp, sigma, delta;
    var timeArea = "苏宁时间";
    log("请求", timeArea);
    // 获取取一次时间耗时
    while (1) {
        stTimestamp = new Date();
        res = http.get("https://f.m.suning.com/api/ct.do");
        edTimestamp = new Date();

        if (res.statusCode != 200) {
            toast("请求失败: " + res.statusCode + " " + res.statusMessage);
            exit();
        }
        log("请求总时长", edTimestamp - stTimestamp);

        if (edTimestamp - stTimestamp <= timeLimit[timeArea]) {
            resTime = res.body.json();
            resTimestamp = Number(resTime.currentTime);
            sigma = edTimestamp - stTimestamp;
            delta = resTimestamp - stTimestamp - Math.trunc(sigma / 2);
            log("时延", sigma);
            log("误差", delta);
            break;
        }
        sleep(reqDelay);
    }
    //返回时间差
    return delta + serverDelay[timeArea];
}