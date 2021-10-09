// 导入模块
var func = require("func_list.js");

var selectedArr = [
    "北京时间",
    "京东时间",
    "苏宁时间",
    "淘宝时间",
    "延迟测试"
];

var selectIndex = func.dialogsWin(selectedArr);

if (selectIndex == "延迟测试") {
    var targetAreas, targetArea, targetUrl;
    targetAreas = ["北京时间", "京东时间", "苏宁时间", "淘宝时间"];
    targetArea = func.dialogsWin(targetAreas);
    switch (targetArea) {
        case "北京时间":
            targetUrl = "http://www.hko.gov.hk/cgi-bin/gts/time5a.pr?a=1";
            break;
        case "京东时间":
            targetUrl = "https://api.m.jd.com/client.action?functionId=queryMaterialProducts&client=wh5";
            break;
        case "苏宁时间":
            targetUrl = "https://f.m.suning.com/api/ct.do";
            break;
        case "淘宝时间":
            targetUrl = "http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp";
            break;
    }
    var res, stTimestamp, edTimestamp;
    stTimestamp = new Date();
    try {
        http.__okhttp__.setTimeout(2000);       // 设置超时2秒
        res = http.get("https://f.m.suning.com/api/ct.do");
        edTimestamp = new Date();
        toastLog("请求时差:" + (edTimestamp - stTimestamp));
        alert("请求时差:" + (edTimestamp - stTimestamp));
    } catch (error) {

        alert(error);
    }
}
else {
    var halfHourFlag = 0;
    var timeDiff = 0;

    var window = floaty.window(
        <frame gravity="center" bg="#1F1F1F" h="25dp" >
            <text id="text" textSize="16sp" textStyle="bold" typeface="monospace" textColor="#00FFFF" />
        </frame >
    );

    window.exitOnClose();

    window.text.click(() => {
        window.setAdjustEnabled(!window.isAdjustEnabled());
    });

    if (device.brand == "HUAWEI") {
        //设置浮窗位置
        window.setPosition(420, 50);
    } else if (device.brand == "xiaomi") {
        //设置浮窗位置
        window.setPosition(520, 50);
    }

    setInterval(() => {
        if (halfHourFlag == 1) {
            timeDiff = func.calTimeDiff(selectIndex);
            halfHourFlag = halfHourFlag + 1;
        }
        //对控件的操作需要在UI线程中执行
        ui.run(function () {
            window.text.setText(dynamicText(timeDiff));
        });
    }, 10);

    // 更新悬浮文字
    function dynamicText(timeDiffer) {
        var today, h, m, s;
        today = new Date(new Date().getTime() + timeDiffer);
        h = today.getHours();           //时
        m = today.getMinutes();         //分
        s = today.getSeconds();         //秒
        ms = today.getMilliseconds();   //毫秒
        if ((m == "29" || m == "59") && s >= "40" && (halfHourFlag <= 0)) {
            halfHourFlag = halfHourFlag + 1;
        }
        return util.format(selectIndex + ":%d:%s:%s:%s\n", h, m, s, ms);
        //var str = showTime();
        //var str = util.format("时间: %d:%d:%d\n", date.getHours(), date.getMinutes(), date.getSeconds());
        //str += util.format("内存使用量: %d%%\n", getMemoryUsage());
        //str += "当前活动: " + currentActivity() + "\n";
        //str += "当前包名: " + currentPackage();
        //return str;
    }

    // //获取内存使用率
    // function getMemoryUsage() {
    //     var usage = (100 * device.getAvailMem() / device.getTotalMem());
    //     //保留一位小数
    //     return Math.round(usage * 10) / 10;
    // }

    // function showTime(timeDiffer) {
    //     var today, h, m, s;
    //     today = new Date(new Date().getTime() + timeDiffer);
    //     h = checkTime(today.getHours());
    //     m = checkTime(today.getMinutes());
    //     s = checkTime(today.getSeconds());
    //     ms = today.getMilliseconds();
    //     if (m == "29" && s >= "40") {
    //         halfHourFlag = true;
    //     }
    //     return util.format(selectIndex + ":%d:%s:%s:%s\n", h, m, s, ms);
    // }
}