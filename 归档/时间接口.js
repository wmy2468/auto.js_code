/*
    jd:https://a.jd.com//ajax/queryServerData.html
    {"serverTime":1598419791260}
    tb: http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp
    {"api":"mtop.common.getTimestamp","v":"*","ret":["SUCCESS::接口调用成功"],"data":{"t":"1598419791480"}}
    sn:http://quan.suning.com/getSysTime.do
    {"sysTime2":"2020-08-26 13:33:45","sysTime1":"20200826133345"}
    北京时间API:
    私有：http://api.k780.com/?app=life.time&appkey=53880&sign=57e15ee7c15822292aef31eec64177e1&format=json
    公共：http://api.k780.com:88/?app=life.time&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json
    {"success":"1","result":{"timestamp":"1598419956","datetime_1":"2020-08-26 13:32:36","datetime_2":"2020年08月26日 13时32分36秒","week_1":"3","week_2":"星期三","week_3":"周三","week_4":"Wednesday"}}
*/

main();

function main() {
    let selectedArr = [
        "京东时间",
        "北京时间",
        "淘宝时间"
    ];

    let selectIndex = dialogs.select("选择时间", selectedArr);
    getTimeDiff(selectedArr[selectIndex]);
}

function getTimeDiff(area) {
    let i = 10;
    let cnt = i;
    let c = 0;
    //10次取均值
    while (i--) {
        switch (area) {
            case "京东时间":
                c = c + jdTime();
                break;
            case "北京时间":
                c = c + beiJingTime();
                break;
            case "淘宝时间":
                c = c + tbTime();
                break;
        }
    }
    log('总值：' + c);
    c = Math.trunc(c / cnt);
    log('均值：' + c);
    // while (1) {
    //     console.log(new Date(new Date().getTime() + c));
    //     sleep(1000);
    // }
    return c;
}

function jdTime() {
    let res, resTime, resTimestamp, sigma, delta;
    let timeLimit = 400;
    // 获取取一次时间耗时
    while (1) {
        stTimestamp = new Date();
        res = http.get('https://a.jd.com//ajax/queryServerData.html');
        edTimestamp = new Date();

        if (res.statusCode != 200) {
            toast("请求失败: " + res.statusCode + " " + res.statusMessage);
            exit();
        }
        log("请求总时长", edTimestamp - stTimestamp);

        if (edTimestamp - stTimestamp <= timeLimit) {
            resTime = res.body.json();
            resTimestamp = Number(resTime.serverTime);
            sigma = edTimestamp - stTimestamp;
            delta = resTimestamp - stTimestamp - Math.trunc(sigma / 2);
            log("时延", sigma);
            log("误差", delta);
            break;
        }
        sleep(200);
    }

    //返回时间差
    return delta;
}

// 北京时间
function beiJingTime() {
    let res, resTime, resTimestamp, sigma, delta;
    let timeLimit = 200;
    // 获取取一次时间耗时
    while (1) {
        stTimestamp = new Date();
        res = http.get('http://www.hko.gov.hk/cgi-bin/gts/time5a.pr?a=1');
        edTimestamp = new Date();

        if (res.statusCode != 200) {
            toast("请求失败: " + res.statusCode + " " + res.statusMessage);
            exit();
        }
        log("请求总时长", edTimestamp - stTimestamp);

        if (edTimestamp - stTimestamp <= timeLimit) {
            resTime = res.body.string();
            resTimestamp = Number(resTime.replace("0=", ""));
            sigma = edTimestamp - stTimestamp;
            delta = resTimestamp - stTimestamp - Math.trunc(sigma / 2);
            log("时延", sigma);
            log("误差", delta);
            break;
        }
        sleep(200);
    }

    //返回时间差
    return delta;
}

// 淘宝时间
function tbTime() {
    let res, resTime, resTimestamp, sigma, delta;
    let timeLimit = 200;
    // 获取取一次时间耗时
    while (1) {
        stTimestamp = new Date();
        res = http.get('http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp');
        edTimestamp = new Date();

        if (res.statusCode != timeLimit) {
            toast("请求失败: " + res.statusCode + " " + res.statusMessage);
            exit();
        }
        log("请求总时长", edTimestamp - stTimestamp);

        if (edTimestamp - stTimestamp <= 200) {
            resTime = res.body.json();
            resTimestamp = Number(resTime.data.t);
            sigma = edTimestamp - stTimestamp;
            delta = resTimestamp - stTimestamp - Math.trunc(sigma / 2);
            log("时延", sigma);
            log("误差", delta);
            break;
        }
        sleep(200);
    }
    //返回时间差
    return delta;
}


function calGetTime() {
    let st, ed;
    st = new Date()
    new Date()
    ed = new Date()
    return ed - st;
}