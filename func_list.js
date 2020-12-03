function main() {
    if (device.brand == "HUAWEI") {
        mainHuawei();
    } else if (device.brand == "xiaomi") {
        mainXiaomi();
    }
}

// ----------------------通用功能区-----------------------
// 切换到autojs
function toAutojs() {
    while (currentPackage() != getPackageName("Auto.js")) {
        launchApp("Auto.js");
        log("启动autoJS");
        sleep(1200);
    }
}

function cClick(element) {
    if (element != null) {
        click(element.bounds().centerX(), element.bounds().centerY());
        log("cClick_center");
    }
}

function sClick(element) {
    if (element != null) {
        if (element.click()) {
            log("sClick");
        } else {
            click(element.bounds().centerX(), element.bounds().centerY());
            log("sClick_center");
        }
        return true;
    }
    return false;
}

function passAd() {
    sClick(textContains("跳过").findOnce());
    sClick(descContains("跳过").findOnce());
    sClick(idContains("lose").findOnce());
    //sClick(text("放弃转账").findOnce());*/
}


function toApp(appName) {
    toAutojs();
    sleep(800);
    while (currentPackage() != getPackageName(appName)) {
        launchApp(appName);
        sleep(3000);
    }
}

function toJdSku(sellId) {
    // let appName = "京东";
    // while (currentPackage() != getPackageName(appName)) {
    //     launchApp(appName);
    //     sleep(300);
    // }
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: "openapp.jdmobile://virtual?params=%7B%22sourceValue%22:%220_productDetail_97%22,%22des%22:%22productDetail%22,%22skuId%22:%22" + sellId + "%22,%22category%22:%22jump%22,%22sourceType%22:%22PCUBE_CHANNEL%22%7D",
    });
}

/*
    小米使用参数1，2，华为使用0
*/
function toAppMulti(appName, cnt) {
    toAutojs();
    sleep(800);
    launchApp(appName);
    if (cnt != 0) {
        // 等待弹窗
        while (!(text("使用以下方式打开").findOnce() != null || text("请选择要使用的应用").findOnce() != null)) {
            sleep(500);
        }
        sleep(1000);
        // 小米
        if (cnt == 1) { click(248, 1905); }
        // 第二个微信 678,1824,846,1992
        if (cnt == 2) { click(710, 1905); }
    }
    while (currentPackage() != getPackageName(appName)) {
        sleep(1000);
    }
}


function huaweiUnlock() {
    let pwd = "081573" //解锁密码
    if (!device.isScreenOn()) {
        while (!device.isScreenOn()) {
            device.wakeUp();
            sleep(800);
        }
        toastLog("unlock");
        //while (text("紧急呼叫").findOnce() == null) {
        while (text("紧急呼叫").findOnce() == null) {
            swipe(300, 60, 300, 850, 400);
            sleep(900);
        }
        toastLog("输入密码");
        for (var i = 0; i < pwd.length; i++) {
            desc(pwd[i]).findOne().click();
        }
    }
}

function xiaomiUnlock() {
    let pwd = "081573" //解锁密码
    let stDelay = 90;
    if (!device.isScreenOn()) {
        while (!device.isScreenOn()) {
            device.wakeUp();
            sleep(1800);
        }
        while (text("紧急呼叫").findOnce() == null) {
            swipe(400, 2000, 400, 1000, stDelay);
            sleep(600);
            stDelay = stDelay + 5;
        }
        toastLog(stDelay);
        sleep(1200);
        for (var i = 0; i < pwd.length; i++) {
            sClick(desc(pwd[i]).findOnce());
        }
    }
}

//锁屏功能
function lockScr() {
    home();
    sleep(1200);
    while (1) {
        if (sClick(desc("一键锁屏").findOnce()) || sClick(desc("锁屏").findOnce())) {
            break;
        } else {
            back();
        }
    }
}

// 手势解锁密码 xy为中心点坐标，offset为滑动区域 两个点之间的距离
function gesture_pwd(appName) {
    let pwd = "147895";
    let execStr = "gesture(850";
    let pointX, pointY, point;
    let offSet = device.width * 0.25;
    // 增加判断，避免小米手机判断成0的情况
    if (offSet == 0) {
        switch (device.model) {
            case "Redmi Note 7":
                offSet = 1080 * 0.25; break;
            default:
                offSet = 1080 * 0.25; break;
        }
    }
    switch (appName) {
        case "买单吧":
            point = id("com.bankcomm.maidanba:id/login_gestureLockView_rl").findOnce();
            log("买单吧");
            break;
        case "邮储信用卡":
            point = idContains("com.yitong.mbank.psbc.creditcard:id/view_lock_pattern").findOnce();
            log("邮储信用卡");
            break;
        case "浦大喜奔":
            point = id("com.spdbccc.app:id/pattern_lock_body_layout").findOnce();
            log("浦大喜奔");
            break;
        case "浦发银行":
            point = id("lpv_pattern_loginunlock").findOnce();
            log("浦发银行");
            break;
        case "华彩生活":
            point = id("com.HuaXiaBank.HuaCard:id/gesture_container").findOnce();
            log("华彩生活");
            break;
        case "招商银行":
            point = id("cmb.pb:id/vGestureContentView").findOnce();
            log("招商银行");
            break;
        case "邮储银行":
            point = id("lockPatternLogin").findOnce();
            log("邮储银行");
            break;
        case "中国农业银行":
            point = (text("切换登录方式").findOne()).parent().parent().parent().child(0);
            log("中国农业银行");
            break;
    }
    if (point == null) { return false; }
    x = point.bounds().centerX();
    y = point.bounds().centerY();
    log("x =", x);
    log("y =", y);
    log("offSet =", offSet);

    let arr = pwd.split("");
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == 1) {
            pointX = x - offSet;
            pointY = y - offSet;
        } else if (arr[i] == 4) {
            pointX = x - offSet;
            pointY = y
        } else if (arr[i] == 7) {
            pointX = x - offSet;
            pointY = y + offSet;
        } else if (arr[i] == 2) {
            pointX = x;
            pointY = y - offSet;
        } else if (arr[i] == 5) {
            pointX = x;
            pointY = y;
        } else if (arr[i] == 8) {
            pointX = x;
            pointY = y + offSet;
        } else if (arr[i] == 3) {
            pointX = x + offSet;
            pointY = y - offSet;
        } else if (arr[i] == 6) {
            pointX = x + offSet;
            pointY = y;
        } else if (arr[i] == 9) {
            pointX = x + offSet;
            pointY = y + offSet;
        }
        execStr = execStr + ",[" + pointX + "," + pointY + "]";
    }
    //gesture(1000, [0, 0], [500, 500], [500, 1000])
    execStr = execStr + ")";
    //log(execStr);
    engines.execScript("hello", execStr);
}

//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        default:
            return 0;
    }
}
// -----------通用功能区------------------

var timeLimit = { "京东时间": 450, "淘宝时间": 410, "北京时间": 300 };
var serverDelay = { "京东时间": -150, "淘宝时间": 0, "北京时间": 0 };
var reqDelay = 300;

function showTime(timeDiffer) {
    let today, h, m, s;
    console.show();
    while (1) {
        today = new Date() + timeDiffer;
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
// 时间校准 获取时间差函数
function getTimeDiff(area, targetTime) {
    // 生成今天的时间戳
    let tDate, stDate, targetTimestamp;
    tDate = getToday() + "," + targetTime;
    stDate = tDate.split(",");
    targetTimestamp = new Date(stDate[0], stDate[1], stDate[2], stDate[3], stDate[4], stDate[5], stDate[6]).getTime();
    // 获取当前时间戳
    curTimestamp = new Date().getTime();

    if (targetTimestamp < curTimestamp) {
        toastLog("目标时间小于当前时间，退出不执行");
        exit();
    }

    //console.setSize(200, 100);
    console.show();

    //当剩余时间超过20秒的时候 等待
    while (targetTimestamp - curTimestamp > 25000) {
        curTimestamp = new Date().getTime();
        console.log("等待倒计时：", Math.trunc((targetTimestamp - curTimestamp) / 1000));
        // toastLog("剩余时间:", targetTimestamp - curTimestamp);
        sleep(1000);
    }

    let timeDiff = calTimeDiff(area);

    let cnt = 0;
    curTimestamp = new Date().getTime() + timeDiff;
    while (curTimestamp < targetTimestamp) {
        curTimestamp = new Date().getTime() + timeDiff;
        sleep(10);
        cnt = cnt + 1;
        if (cnt >= 100) {
            console.log("等待倒计时：", Math.trunc((targetTimestamp - curTimestamp) / 1000));
            cnt = 0;
        }
    }
    console.hide();
}


function calTimeDiff(area) {
    let timeDiff;
    // 获取时间误差
    switch (area) {
        case "京东时间":
            timeDiff = Math.trunc((jdTime() + jdTime()) / 2);
            break;
        case "北京时间":
            timeDiff = Math.trunc((beiJingTime() + beiJingTime()) / 2);
            break;
        case "淘宝时间":
            timeDiff = Math.trunc((tbTime() + tbTime()) / 2);
            break;
        default:
            timeDiff = Math.trunc((beiJingTime() + beiJingTime()) / 2);
            break;
    }
    return timeDiff;
}

function getToday() {
    var date = new Date();
    var seperator1 = ",";
    var year = date.getFullYear();
    var month = date.getMonth();
    var strDate = date.getDate();
    return year + seperator1 + month + seperator1 + strDate;
}

function jdTime() {
    log("请求京东时间");
    let res, resTime, resTimestamp, sigma, delta;
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

        if (edTimestamp - stTimestamp <= timeLimit["京东时间"]) {
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
    return delta + serverDelay["京东时间"];
}

// 北京时间
function beiJingTime() {
    log("请求北京时间");
    let res, resTime, resTimestamp, sigma, delta;
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

        if (edTimestamp - stTimestamp <= timeLimit["北京时间"]) {
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
    return delta + serverDelay["北京时间"];
}

// 淘宝时间
function tbTime() {
    log("请求淘宝时间");
    let res, resTime, resTimestamp, sigma, delta;
    // 获取取一次时间耗时
    while (1) {
        stTimestamp = new Date();
        res = http.get("http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp");
        edTimestamp = new Date();

        if (res.statusCode != timeLimit["淘宝时间"]) {
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
        sleep(reqDelay);
    }
    //返回时间差
    return delta + serverDelay["淘宝时间"];
}

module.exports = {
    toAutojs: toAutojs,
    cClick: cClick,
    sClick: sClick,
    passAd: passAd,
    toApp: toApp,
    toAppMulti: toAppMulti,
    huaweiUnlock: huaweiUnlock,
    xiaomiUnlock: xiaomiUnlock,
    gesture_pwd: gesture_pwd,
    randomNum: randomNum,
    lockScr: lockScr,
    toJdSku: toJdSku,
    getTimeDiff: getTimeDiff,
    calTimeDiff: calTimeDiff,
    showTime: showTime
}