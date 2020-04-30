get_online_time('jd');

//console.show();
let st = new Date();
function get_online_time(wbSite) {
    let wbUrl;
    switch (wbSite) {
        case 'jd':
            wbUrl = 'https://a.jd.com//ajax/queryServerData.html';
            break;
        case 'tb':
            wbUrl = 'http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp';
            break;
        case 'sn':
            wbUrl = 'http://quan.suning.com/getSysTime.do';
            break;
    }
    var res = http.get(wbUrl);
    if (res.statusCode == 200) {
        let resTime = res.body.string();
        let tStamp, tTime, tStampJson;
        tStampJson = JSON.parse(resTime);
        let sysTime = new Date();
        switch (wbSite) {
            case 'jd':
                tStamp = tStampJson['serverTime'];
                tTime = new Date(tStamp);
                break;
            case 'tb':
                tStamp = tStampJson['data']['t'];
                tTime = new Date(tStamp);
                break;
            case 'sn':
                tTime = tStampJson['sysTime2'];
                break;
        }
        toastLog(tTime-sysTime);
        return tTime;
    }
    else {
        log('failed:' + res.statusMessage);
    }
}