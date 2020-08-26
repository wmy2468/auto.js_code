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

getTimeDiff();

function getTimeDiff(area) {
    console.show();
    let i = 10;
    let cnt = i;
    let c = 0;
    //10次取均值
    while (i--) {
        if (area == '京东') {
            c = c + jdTime();
            sleep(50);
        } else {
            c = c + tbTime();
            sleep(50);
        }
    }
    console.log('总值：' + c);
    c = Math.trunc(c / cnt);
    console.log('均值：' + c);
    while (1) {
        console.log(new Date(new Date().getTime() + c));
        sleep(1000);
    }
}

function jdTime() {
    // 获取取一次时间耗时
    stTimestamp = new Date().getTime();
    let res = http.get('https://a.jd.com//ajax/queryServerData.html');
    edTimestamp = new Date().getTime()
    let resTime, resTimestamp;
    if (res.statusCode != 200) {
        toast("请求失败: " + res.statusCode + " " + res.statusMessage);
        return 0;
    }
    resTime = res.body.json();
    resTimestamp = Number(resTime.serverTime);
    //返回时间差
    return (Math.trunc((edTimestamp - stTimestamp) / 2) + resTimestamp) - edTimestamp
}

function tbTime() {
    // 获取取一次时间耗时
    stTimestamp = new Date().getTime();
    let res = http.get('http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp');
    edTimestamp = new Date().getTime()
    let resTime, resTimestamp;
    if (res.statusCode != 200) {
        toast("请求失败: " + res.statusCode + " " + res.statusMessage);
        return 0;
    }
    resTime = res.body.json();
    resTimestamp = Number(resTime.data.t);
    //返回时间差
    return (Math.trunc((edTimestamp - stTimestamp) / 2) + resTimestamp) - edTimestamp
}