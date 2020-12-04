//华为
//mainHuawei();
//小米
mainXiaomi();

function mainHuawei() {
    huaweiUnlock();
    var appName = '苏宁易购';
    ToAutojs();
    toApp(appName, 0);
    toPackVie();
    signIn();
    plusOneH();
    lockScr();
}

//小米
function mainXiaomi() {
    xiaomiUnlock();
    var cnt = 1;
    var appName = '苏宁易购';
    while (cnt < 3) {
        ToAutojs();
        toApp(appName, cnt);
        toPackVie();
        signIn();
        plusOneH();
        cnt = cnt + 1;
    }
    lockScr();
}


// ----------------------通用功能区-----------------------

function ToAutojs() {
    if (currentPackage() != getPackageName('Auto.js')) {
        launchApp('Auto.js');
        sleep(1200);
    }
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
            click(element.bounds().centerX(), element.bounds().centerY());
        }
        sleep(500);
        return true;
    } else { return false; }
}

function passAd() {
    var passAD = textContains('跳过').findOnce();
    var descpassAD = descContains('跳过').findOnce();
    var floatAD = id('iv_adclose').findOnce();
    var shopAD = id('btn_closed').findOnce();
    var imgAD = id('img_close').findOnce();
    /*if (passAD != null) {
        sClick(passAD);
        return 0;
    }
    if (descpassAD != null) {
        sClick(descpassAD);
        return 0;
    }*/
    if (floatAD != null) {
        sClick(floatAD);
    }
    if (shopAD != null) {
        sClick(shopAD);
        return 0;
    }
    if (imgAD != null) {
        sClick(imgAD);
        return 0;
    }
}

function huaweiUnlock() {
    var pwd = "081573" //解锁密码
    if (!device.isScreenOn()) {
        while (!device.isScreenOn()) {
            device.wakeUp();
            sleep(800);
        }
        toastLog('unlock');
        //while (text("紧急呼叫").findOnce() == null) {
        while (text('紧急呼叫').findOnce() == null) {
            swipe(300, 60, 300, 850, 400);
            sleep(900);
        }
        toastLog('输入密码');
        for (var i = 0; i < pwd.length; i++) {
            desc(pwd[i]).findOne().click();
        }
    }
}

function xiaomiUnlock() {
    var pwd = "081573" //解锁密码
    var stDelay = 70;
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
/*
    小米使用参数1，2，华为使用0
*/
function toApp(appName, cnt) {
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

function backWay() {
    var ivBack;
    ivBack = id('iv_back').findOnce();
    var liveBack = id('snlive_close_btn').findOnce();
    if (liveBack != null) {
        sClick(liveBack);
        return 0;
    }
    if (ivBack != null) {
        sClick(ivBack);
    } else {
        back();
    }
}

function getActTitle(element, titleName) {
    var actName;
    if (element == null) { return -1; }
    else {
        actName = element.parent().child(element.indexInParent() - 2).text();
        if (actName.indexOf(titleName) == -1) {
            return 0;
        } else {
            return 1;
        }
    }
}
// ------------------------通用功能------------------------

// 进入红包界面
function toPackVie() {
    toastLog('toPackVie开始');
    var floating;
    while (text('天天发现鲸').findOnce() == null) {
        sleep(3000);
        var mCancelId = "com.suning.mobile.ebuy:id/marketing_cancel_img";
        sClick(id(mCancelId).findOnce());
        sleep(1000);
        sClick(id('sign_cancel_img').findOnce());
        sleep(1000);
        passAd();

        sleep(2000);
        floating = desc('悬浮广告').findOnce();
        // 点击赚金币
        if (floating != null) {
            cClick(floating);
        }
    }
    sleep(5000);
    text('天天发现鲸').findOnce().child(0).child(0).child(0).child(7).click();
    toastLog('toPackVie结束');
}

// 点击 立即签到  -》 明日再来
function signIn() {
    toastLog('signIn开始');
    while (text('明日再来').findOnce() == null) {
        // 点签到
        sClick(text('立即签到').findOnce());
        sleep(800);
    }
    toastLog('signIn结束');
}

//浏览+100 金币
function plusOneH() {
    var plus100;
    sleep(2500)
    //sClick(text('去逛逛').findOnce());
    while (1) {
        plus100 = text('+100').findOnce();
        if (plus100 != null) {
            plus100.click();
        } else {
            break;
        }
        while (!(text('返回领取').findOnce() != null || text("今日任务完成").findOnce() != null)) {
            passAd();
        }
        backWay();
        sleep(1000);
        text('天天发现鲸').findOne();
    }
}