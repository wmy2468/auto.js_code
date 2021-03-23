// 导入模块
var func = require("func_list.js");
beiJingTime();

function beiJingTime() {
    var res, resTime, resTimestamp, sigma, delta;
    var timeArea = "北京时间";
    log("请求", timeArea);
    // 获取取一次时间耗时
    stTimestamp = new Date();
    res = http.get("http://www.hko.gov.hk/cgi-bin/gts/time5a.pr?a=1");
    edTimestamp = new Date();

    if (res.statusCode != 200) {
        toast("请求失败: " + res.statusCode + " " + res.statusMessage);
        exit();
    }
    toastLog("请求返回的BODY" + res.body);
    log("请求总时长", edTimestamp - stTimestamp);

    //返回时间差
    return delta - serverDelay[timeArea];
}
