main();

function main() {
    if (device.brand == 'HUAWEI') {
        mainHuawei();
    } else if (device.brand == 'xiaomi') {
        mainXiaomi();
    }
}

function mainHuawei() {
    huaweiUnlock();
    let appName = '苏宁易购';
    ToAutojs();
    toApp(appName, cnt);
    toPackVie();
    cGold();
    lockScr();
}

//小米
function mainXiaomi() {
    xiaomiUnlock();
    let cnt = 1;
    let appName = '苏宁易购';
    while (cnt < 3) {
        ToAutojs();
        toApp(appName, cnt);
        toPackVie();
        cGold();
        cnt = cnt + 1;
    }
    lockScr();
}

// ----------------------通用功能区-----------------------
// 切换到autojs
function ToAutojs() {
    if (currentPackage() != getPackageName('Auto.js')) {
        launchApp('Auto.js');
        sleep(1200);
    }
}
function cClick(elementt) {
    if (elementt != null) {
        click(elementt.bounds().centerX(), elementt.bounds().centerY());
    }
}

function sClick(element) {
    if (element != null) {
        if (!element.click()) {
            click(element.bounds().centerX(), element.bounds().centerY());
            return 1;
        }
    }
    return 0;
}

function passAd() {
    let floatAD = id('iv_adclose').findOnce();
    let shopAD = id('btn_closed').findOnce();
    let imgAD = id('img_close').findOnce();
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
        return 0;
    }
    if (shopAD != null) {
        sClick(shopAD);
        return 0;
    }
    if (imgAD != null) {
        sClick(imgAD);
        return 0;
    }
    return 1;
}

function backWay() {
    let ivBack;
    ivBack = id('iv_back').findOnce();
    let liveBack = id('snlive_close_btn').findOnce();
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

// ----------------------通用功能区-----------------------
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


function huaweiUnlock() {
    let pwd = "081573" //解锁密码
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
// -----------通用功能区------------------

// 进入红包界面
function toPackVie() {

    let floating;
    while (text('天天发现鲸').findOnce() == null) {
        sleep(3000);
        let mCancelId = "com.suning.mobile.ebuy:id/marketing_cancel_img";
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
    toastLog('toPackVie结束');
}
// 点击领币，结束
function cGold() {
    let goldBar = textContains('/4500').findOne();
    let x = goldBar.bounds().centerX();
    let y = goldBar.bounds().top - 25;
    //toastLog(x);
    //toastLog(y);
    while (text('0/4500').findOnce() == null) {
        click(x, y);
        sleep(600);
    }
    sleep(2000);
}