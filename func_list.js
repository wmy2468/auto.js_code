
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
        log("cClick_center: " + element.text());
        return true;
    } else {
        // log("cClick_null");
        return false;
    }
}

function sClick(element) {
    if (element != null) {
        if (!element.click()) {
            click(element.bounds().centerX(), element.bounds().centerY());
        }
        if (element.text() != null && element.text() != "") {
            log("sClick_text: " + element.text());
        } else if (element.desc() != null && element.desc() != "") {
            log("sClick_desc: " + element.desc());
        } else if (element.id() != null && element.id() != "") {
            log("sClick_id: " + element.id());
        } else {
            log("sClick: text/desc/id all empty");
        }
        return true;
    }
    return false;
}

function passAd() {
    sClick(textContains("跳过").findOnce());
    sClick(descContains("跳过").findOnce());
    sClick(idContains("close").findOnce());
    //sClick(text("取消").findOnce());
    //sClick(text("放弃转账").findOnce());*/
}


function toApp(appName) {
    toAutojs();
    sleep(800);
    while (currentPackage() != getPackageName(appName)) {
        launchApp(appName);
        sleep(2000);
    }
}


function toPackage(packageName) {
    toAutojs();
    sleep(800);
    while (currentPackage() != packageName) {
        launch(packageName);
        sleep(2000);
    }
}


function toJdSku(sellId) {
    // var appName = "京东";
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
    var pwd = "081573" //解锁密码
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
    var pwd = "081573" //解锁密码
    var stDelay = 90;
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
    var pwd = "147895";
    var pointX, pointY, point;
    var offSet;
    offSet = device.width * 0.25;
    // 增加判断，避免小米手机判断成0的情况
    if (offSet == 0) {
        switch (device.model) {
            case "Redmi Note 7":
                offSet = 1080 * 0.25;
                break;
            default:
                offSet = 1080 * 0.25;
                break;
        }
    }

    switch (appName) {
        case "万商云":
            offSet = 341;
            point = id("com.bill.quickmoney:id/lock_9_view").findOnce();
            log("万商云");
            break;
        case "缤纷生活":
            point = id("lock_pattern").findOnce();
            log("缤纷生活");
            break;
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
            point = (text("切换登录方式").findOne()).parent().child(1);
            log("中国农业银行");
            break;
    }
    var execStr;
    // 根据APP名称区分滑动持续时间
    if (appName == "招商银行" || appName == "缤纷生活" || appName == "万商云") {
        execStr = "gesture(1100";
    } else {
        execStr = "gesture(850";
    }
    if (point == null) { return false; }
    x = point.bounds().centerX();
    y = point.bounds().centerY();
    log("x =", x);
    log("y =", y);
    log("offSet =", offSet);
    var arr = pwd.split("");
    for (var i = 0; i < arr.length; i++) {
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
    execStr = execStr + ")";
    engines.execScript("hello", execStr);
}

//生成从minNum到maxNum的随机数
function randomNum(min, max, digit) {
    /**
    @param  min 最小数
    @param  max, 最大数
    @param  digit, 保留的小数位
    */
    var powNum;
    // 如果没有digit参数，默认2个小数点
    if (digit == undefined) {
        digit = 0;
    }
    switch (digit) {
        case 0:
            return Math.floor((Math.random() * (max - min) + min));
        default:
            powNum = Math.pow(10, digit);
            return Math.floor((Math.random() * (max - min) + min) * powNum) / powNum;
    }
}
// -----------通用功能区------------------
function floatyMove(window, view, clickAction) {
    var show = function () { }
    //记录按键被按下时的触摸坐标
    var x = 0, y = 0;
    //记录按键被按下时的悬浮窗位置
    var windowX, windowY;
    //记录按键被按下的时间以便判断长按等动作
    var downTime;
    var onClick = show
    if (clickAction) {
        onClick = () => { clickAction() }
    }
    view.setOnTouchListener(function (view, event) {
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                x = event.getRawX();
                y = event.getRawY();
                windowX = window.getX();
                windowY = window.getY();
                downTime = new Date().getTime();
                return true;
            case event.ACTION_MOVE:
                //移动手指时调整悬浮窗位置
                window.setPosition(windowX + (event.getRawX() - x),
                    windowY + (event.getRawY() - y));
                //如果按下的时间超过5秒判断为长按，退出脚本
                if (new Date().getTime() - downTime > 5500) {
                    exit();
                }
                return true;
            case event.ACTION_UP:
                //手指弹起时如果偏移很小则判断为点击
                if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                    onClick(clickAction);
                }
                return true;
        }
        return true;
    });
}

// 传入悬浮窗和悬浮窗的某个控件ID
function floatyInit(window, winView) {
    // 设置单击可移动事件
    // window.text.click(() => {
    //     floatyWin.setAdjustEnabled(!floatyWin.isAdjustEnabled());
    // });
    floatyMove(window, winView);

    if (device.brand == "HUAWEI") {
        //设置浮窗位置
        window.setPosition(420, 50);
    } else if (device.brand == "xiaomi") {
        //设置浮窗位置
        window.setPosition(520, 50);
    }
    // 如果需要浮窗一直显示，则可以设置这个
    // setInterval(() => { }, 1000);
    return window;
}


function setFloatyVal(window, textVal) {
    //对控件的操作需要在UI线程中执行
    ui.run(function () {
        window.text.setText(textVal);
    });
}

function countDownInit() {
    var floatyWin = floaty.window(
        <frame gravity="center" bg="#1F1F1F" h="25dp" >
            <text id="text" textSize="16sp" textStyle="bold" typeface="monospace" textColor="#00FFFF"></text>
        </frame >
    );
    // 对生成的悬浮窗初始化
    floatyInit(floatyWin, floatyWin.text);
    return floatyWin;
}

// 时间校准 获取时间差函数
function getTimeDiff(area, targetTime) {
    // 生成今天的时间戳
    var tDate, stDate, targetTimestamp;
    // 如果输入的时间是0点，则目标天数要+1
    if (targetTime.substr(0, 2) == "00") {
        tDate = getToday(needNextDay = true) + "," + targetTime;
    } else {
        tDate = getToday() + "," + targetTime;
    }
    stDate = tDate.split(",");
    targetTimestamp = new Date(stDate[0], stDate[1], stDate[2], stDate[3], stDate[4], stDate[5], stDate[6]).getTime();
    // 获取当前时间戳
    curTimestamp = new Date().getTime();

    if (targetTimestamp < curTimestamp) {
        toastLog("目标时间小于当前时间，退出不执行");
        exit();
    }

    var floatWin = countDownInit();

    //当剩余时间超过15秒的时候 等待
    while (targetTimestamp - curTimestamp > 15000) {
        curTimestamp = new Date().getTime();
        setFloatyVal(floatWin, "等待倒计时：" + Math.trunc((targetTimestamp - curTimestamp) / 1000));
        //console.log("等待倒计时：", Math.trunc((targetTimestamp - curTimestamp) / 1000));
        // toastLog("剩余时间:", targetTimestamp - curTimestamp);
        sleep(1000);
    }

    var timeDiff = calTimeDiff(area);

    var cnt = 0;
    curTimestamp = new Date().getTime() + timeDiff;
    while (curTimestamp < targetTimestamp) {
        sleep(10);
        cnt = cnt + 1;
        if (cnt >= 100) {
            setFloatyVal(floatWin, "等待倒计时：" + Math.trunc((targetTimestamp - curTimestamp) / 1000))
            //console.log("等待倒计时：", Math.trunc((targetTimestamp - curTimestamp) / 1000));
            cnt = 0;
        }
        curTimestamp = new Date().getTime() + timeDiff;
    }
    // 如果有设置浮窗显示，则需要手动关闭
    floatWin.close();
}

function calTimeDiff(area) {
    var timeDiff;
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
        case "苏宁时间":
            timeDiff = Math.trunc((snTime() + snTime()) / 2);
            break;
        default:
            timeDiff = Math.trunc((beiJingTime() + beiJingTime()) / 2);
            break;
    }
    return timeDiff;
}

function getToday(needNextDay) {
    var date;
    date = new Date();
    // 如果下一天有值，则加1
    if (needNextDay != undefined) {
        date.setDate(date.getDate() + 1);
    }
    var seperator1 = ",";
    var year = date.getFullYear();
    var month = date.getMonth();
    var strDate = date.getDate();
    return year + seperator1 + month + seperator1 + strDate;
}

//京东时间
function jdTime() {
    var res, resTime, resTimestamp, sigma, delta, timeLimit;
    timeLimit = 1000;
    delta = 0;
    log("请求京东时间");
    // 获取取一次时间耗时
    while (1) {
        stTimestamp = new Date();
        try {
            http.__okhttp__.setTimeout(800);       // 设置超时2秒
            res = http.get("https://api.m.jd.com/client.action?functionId=queryMaterialProducts&client=wh5");
        } catch (error) {
            log(error);
            toastLog("报错了 返回0");
            return 0;
        }
        edTimestamp = new Date();

        if (res.statusCode != 200) {
            toast("请求失败: " + res.statusCode + " " + res.statusMessage);
            exit();
        }
        log("请求总时长", edTimestamp - stTimestamp);

        if (edTimestamp - stTimestamp <= timeLimit) {
            resTime = res.body.json();
            resTimestamp = Number(resTime.currentTime2);
            sigma = edTimestamp - stTimestamp;
            delta = resTimestamp - stTimestamp - Math.trunc(sigma / 2);
            log("时延", sigma);
            log("误差", delta);
            break;
        }
    }
    //返回时间差
    return delta;
}

// 北京时间
function beiJingTime() {
    var res, resTime, resTimestamp, sigma, delta, timeLimit;
    timeLimit = 1000;
    delta = 0;
    log("请求北京时间");
    // 获取取一次时间耗时
    while (1) {
        stTimestamp = new Date();
        try {
            http.__okhttp__.setTimeout(800);       // 设置超时2秒
            // res = http.get("http://www.hko.gov.hk/cgi-bin/gts/time5a.pr?a=1");
            res = http.get("http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp");
        } catch (error) {
            log(error);
            toastLog("报错了 返回0");
            return 0;
        }
        edTimestamp = new Date();

        if (res.statusCode != 200) {
            toast("请求失败: " + res.statusCode + " " + res.statusMessage);
            exit();
        }
        log("请求总时长", edTimestamp - stTimestamp);

        if (edTimestamp - stTimestamp <= timeLimit) {
            // resTime = res.body.string();
            // resTimestamp = Number(resTime.replace("0=", ""));
            resTime = res.body.json();
            resTimestamp = Number(resTime.data.t);
            sigma = edTimestamp - stTimestamp;
            delta = resTimestamp - stTimestamp - Math.trunc(sigma / 2); // 返回的时间-开始时间
            log("时延", sigma);
            log("误差", delta);
            break;
        }
    }
    //返回时间差
    return delta;
}

// 淘宝时间
function tbTime() {
    log("请求淘宝时间");
    var res, resTime, resTimestamp, sigma, delta, timeLimit;
    timeLimit = 1000;
    delta = 0;
    // 获取取一次时间耗时
    while (1) {
        stTimestamp = new Date();
        try {
            http.__okhttp__.setTimeout(800);       // 设置超时2秒
            res = http.get("http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp");
        } catch (error) {
            log(error);
            toastLog("报错了 返回0");
            return 0;
        }
        edTimestamp = new Date();

        if (res.statusCode != 200) {
            toast("请求失败: " + res.statusCode + " " + res.statusMessage);
            exit();
        }
        log("请求总时长", edTimestamp - stTimestamp);

        if (edTimestamp - stTimestamp <= timeLimit) {
            resTime = res.body.json();
            resTimestamp = Number(resTime.data.t);
            sigma = edTimestamp - stTimestamp;
            delta = resTimestamp - stTimestamp - Math.trunc(sigma / 2);
            log("时延", sigma);
            log("误差", delta);
            break;
        }
    }
    //返回时间差
    return delta;
}

// 苏宁时间
function snTime() {
    var res, resTime, resTimestamp, sigma, delta, timeLimit;
    timeLimit = 1000;
    delta = 0;
    log("请求苏宁时间");
    // 获取取一次时间耗时
    while (1) {
        stTimestamp = new Date();
        try {
            http.__okhttp__.setTimeout(800);       // 设置超时2秒
            res = http.get("https://f.m.suning.com/api/ct.do");
        } catch (error) {
            log(error);
            toastLog("报错了 返回0");
            return 0;
        }
        edTimestamp = new Date();

        if (res.statusCode != 200) {
            toast("请求失败: " + res.statusCode + " " + res.statusMessage);
            exit();
        }
        log("请求总时长", edTimestamp - stTimestamp);

        if (edTimestamp - stTimestamp <= timeLimit) {
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
    return delta;
}

function dialogsWin(inArr) {
    var selIdx = dialogs.select("选择启动", inArr);
    if (selIdx == -1) {
        exit();
    }
    return inArr[selIdx];
}

module.exports = {
    floatyMove: floatyMove,
    toAutojs: toAutojs,
    cClick: cClick,
    sClick: sClick,
    passAd: passAd,
    toApp: toApp,
    toPackage: toPackage,
    toAppMulti: toAppMulti,
    huaweiUnlock: huaweiUnlock,
    xiaomiUnlock: xiaomiUnlock,
    gesture_pwd: gesture_pwd,
    randomNum: randomNum,
    lockScr: lockScr,
    toJdSku: toJdSku,
    getTimeDiff: getTimeDiff,
    calTimeDiff: calTimeDiff,
    dialogsWin: dialogsWin
}