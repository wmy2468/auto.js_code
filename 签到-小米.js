auto.waitFor();

//cmb_gua();
main();
//买单吧();
function main() {
    xiaomiUnlock();
    let i = 1;
    while (i < 3) {
        toAppMulti("京东", i);
        jd_sign();
        i = i + 1;
    }
    招商银行();
    lockScr();
}


function ToAutojs() {
    if (currentPackage() != getPackageName('Auto.js')) {
        launchApp('Auto.js');
        sleep(1000);
    }
}

function passAd() {
    sClick(textContains('跳过').findOnce());
    sClick(descContains('跳过').findOnce());
    sClick(id('iv_adclose').findOnce());
    sClick(id('btn_closed').findOnce());
    sClick(id('img_close').findOnce());
    sClick(text('放弃转账').findOnce());
}

function ToApp(appName) {
    ToAutojs();
    if (currentPackage() != getPackageName(appName)) {
        launchApp(appName);
        sleep(1000);
    }
}

// ======================签到代码==================================
function jd_sign() {
    ToApp("京东");
    //等待首页加载
    while (className('TextView').text('首页').findOnce() == null) {
        sClick(id('xk').findOnce());
        toastLog('等待首页...');
        passAd();
        sleep(2000);
    }
    let getBeans = className('TextView').text('领京豆').findOne();
    sClick(getBeans.parent());
    //等待进店领豆加载
    className('TextView').text('进店领豆').findOne();
    if (className('TextView').text('已连续签到').findOnce()) {
        toastLog('今日已签到');
    }
    else {
        sClick(className('TextView').text('签到领京豆').findOnce());
        while (className('TextView').text('签到提醒').findOnce() == null
            && text('全民抢京豆').findOnce() == null) {
            sleep(1000);
        }
        toastLog('签到成功');
    }
    while (className('TextView').text('首页').findOnce() == null) {
        back();
        sleep(3000);
    }
    let getCon = text('领券').findOne();
    sClick(getCon.parent());
    className('ImageView').desc('领券中心').findOne();

    if (className('TextView').text('立即签到').findOnce() == null) {
        toastLog('今日已领券');
    }
    else {
        sClick(className('TextView').text('立即签到').findOnce());
        className('ImageView').desc('关闭弹窗').findOne();
        sClick(className('ImageView').desc('关闭弹窗').findOne());
    }
    while (className('TextView').text('首页').findOnce() == null) {
        back();
        sleep(3000);
    }
}

function 招商银行() {
    let appName = '招商银行';
    ToAutojs();
    setClip('＆https://t.cmbchina.com/RZV7f2＆');
    ToApp(appName);
    passAd();
    sClick(text('立即查看').findOne());
    sleep(1000);
    while (text('周日').findOnce() == null) {
        if (id('ivBigHeadImage').findOnce() != null) {
            sleep(800);
            gesture_pwd(appName);
        }
        sleep(1000);
    }
    sleep(2000);
    let monday = text('周一').findOne();
    sClick(monday.parent().parent().parent().child(3));
    text('医保电子凭证').findOne();
    sleep(1200);
    back();
    sleep(800);
    setClip('');
    toastLog(appName + '已签到');
    sleep(1200);
}

function cClick(element) {
    if (element != null) {

        click(element.bounds().centerX(), element.bounds().centerY());

        return true;
    } else { return false; }
}

function sClick(element) {
    if (element != null) {
        if (!element.click()) {
            return click(element.bounds().centerX(), element.bounds().centerY());
        }
        return true;
    } else { return false; }
}

// xy为中心点坐标，offset为滑动区域 两个点之间的距离
function gesture_pwd(appName) {
    let pwd = '147895';
    let execStr = 'gesture(850';
    let pointX, pointY, point;
    let offSet = device.width * 0.25;
    switch (appName) {
        case '买单吧':
            point = id('com.bankcomm.maidanba:id/login_gestureLockView_rl').findOnce();
            log('买单吧');
            break;
        case '邮储信用卡':
            point = idContains('com.yitong.mbank.psbc.creditcard:id/view_lock_pattern').findOnce();
            log('邮储信用卡');
            break;
        case '浦大喜奔':
            point = id('com.spdbccc.app:id/pattern_lock_body_layout').findOnce();
            log('浦发信用卡');
            break;
        case '浦发银行':
            point = id('lpv_pattern_loginunlock').findOnce();
            log('浦发银行');
            break;
        case '华彩生活':
            point = id('com.HuaXiaBank.HuaCard:id/gesture_container').findOnce();
            log('华彩生活');
            break;
        case '招商银行':
            point = id('cmb.pb:id/vGestureContentView').findOnce();
            log('招商银行');
            break;
    }
    if (point == null) { return false; }
    x = point.bounds().centerX();
    y = point.bounds().centerY();
    let arr = pwd.split('');
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
        execStr = execStr + ',[' + pointX + ',' + pointY + ']';
    }
    //gesture(1000, [0, 0], [500, 500], [500, 1000])
    execStr = execStr + ')';
    //log(execStr);
    engines.execScript('hello', execStr);
}

function toAppMulti(appName, cnt) {
    ToAutojs();
    launchApp(appName);
    if (cnt != 0) {
        // 等待弹窗
        while (!(text('使用以下方式打开').findOnce() != null || text('请选择要使用的应用').findOnce() != null)) {
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

function xiaomiUnlock() {
    let pwd = "081573" //解锁密码
    let stDelay = 70;
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
        if (sClick(desc('一键锁屏').findOnce()) || sClick(desc('锁屏').findOnce())) {
            break;
        } else {
            back();
        }
    }
}