auto.waitFor();

//华为
//mainHuawei();
//小米
mainXiaomi();

function mainHuawei() {
    huaweiUnlock();
    var appName = '京东';
    ToAutojs();
    setClip('馥zんí#VDvzj6EQzb@');
    sleep(1500);
    toApp(appName, 0);
    toActViaCode();
    allAct();
    lockScr();
}

//小米
function mainXiaomi() {
    xiaomiUnlock();
    var cnt = 1;
    var appName = '京东';
    while (cnt < 3) {
        ToAutojs();
        setClip('馥zんí#VDvzj6EQzb@');
        sleep(1500);
        toApp(appName, cnt);
        toActViaCode();
        allAct();
        cnt = cnt + 1;
    }
    lockScr();
}

// ------------------------通用功能------------------------
function ToAutojs() {
    if (currentPackage() != getPackageName('Auto.js')) {
        launchApp('Auto.js');
        sleep(1000);
    }
}

function passAd() {
    var passAD = textContains('跳过').findOnce();
    var descpassAD = descContains('跳过').findOnce();
    if (passAD != null) {
        sClick(passAD);
        sleep(800);
    }
    if (descpassAD != null) {
        sClick(descpassAD);
        sleep(800);
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
// ------------------------通用功能------------------------

// 通过口令进活动入口
function toActViaCode() {
    toastLog('等待进入活动页面');
    // 等待并点击立即查看
    sClick(text('立即查看').findOne());
    sClick(text('去做任务').findOne());
    // 等待页面加载
    while (textContains('分享好友助力').findOnce() == null) {
        sClick(text('去做任务').findOnce());
        sleep(800);
    }
    toastLog('已到达活动页面');
    sleep(1500);
}

function isNewPage() {
    sleep(2000);
    var ppo = textContains('我的热力值:').findOnce()
    if (ppo) {
        sClick(ppo.parent().parent().child(3));
        return 1;
    } else {
        return 0;
    }
}

//获取真实的按钮位置
function getRealBtn(elements) {
    if (elements.empty()) { return null; }
    var eleLen = elements.length - 1;
    var ele, eleTxt;
    while (eleLen >= 0) {
        ele = elements[eleLen].parent().parent().child(0);
        if (ele != null) {
            eleTxt = ele.text();
            if (eleTxt.indexOf('/') >= 0) {
                return elements[eleLen];
            }
        }
        eleLen = eleLen - 1;
    }
    return null;
}

//立即领取
function getNow() {
    textContains('分享好友助力').findOne();
    while (1) {
        var getIt = text('立即领取').findOnce();
        if (text('继续浏览,领取京豆').findOnce() != null) {
            sClick(text('继续浏览').findOnce().parent().parent().child(2));
            sleep(1000);
            sClick(text('去做任务').findOne());
        }
        if (getIt == null) {
            break;
        } else {
            sClick(getIt);
            sleep(3000);
        }
    }
    sleep(2000);
}

function allAct() {
    var backFlg = 1;
    while (1) {
        sleep(1000);
        var view = 0, cView = 0, focus = 0, joinMem = 0, getinNow = 0;
        if (sClick(getRealBtn(text('去浏览').find()))) {
            toastLog('找到去浏览'); sleep(500);
            view = 1;
        } else if (sClick(getRealBtn(text('继续浏览').find()))) {
            toastLog('找到继续浏览'); sleep(500);
            cView = 1;
        } else if (sClick(getRealBtn(text('去关注').find()))) {
            toastLog('找到去关注'); sleep(500);
            focus = 1;
        } else if (sClick(getRealBtn(text('加入会员').find()))) {
            toastLog('找到加入会员'); sleep(500);
            joinMem = 1;
        } else if (sClick(getRealBtn(text('立即领取').find()))) {
            toastLog('找到立即领取'); sleep(500);
            getinNow = 1;
        }
        if (!view && !cView && !focus && !joinMem && !getinNow) {
            break;
        } else {
            if (isNewPage()) {
                continue;
            }
            if (getinNow) {
                getNow();
                continue;
            }
            if (joinMem) {
                while (textContains('分享好友助力').findOnce() == null) {
                    cClick(textContains('确认授权并加入').findOnce());
                    cClick(text('我知道了').findOnce());
                }
                toastLog('已加入会员'); sleep(500);
                backFlg = 0;
            }
            if (backFlg) {
                toastLog('等待几秒');
                sleep(6666);
                back();
            } else {
                backFlg = 1;
            }
            toastLog('等待打开做任务窗口');
            sleep(1000);
            sClick(text('去做任务').findOnce());
            while (textContains('分享好友助力').findOnce() == null) {
                sClick(text('去做任务').findOnce());
                //sClick(textContains('分享好友助力').findOnce().parent().parent().parent().child(3));
                sleep(1200);
            }
            getNow();
        }
    }
}