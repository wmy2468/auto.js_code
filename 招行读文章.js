
main();

function main() {
    if (device.brand == 'HUAWEI') {
        mainHuawei();
    } else if (device.brand == 'xiaomi') {
        mainXiaomi();
    }
}


function mainXiaomi() {
    let appName = '招商银行';
    ToAutojs();
    toApp(appName);
    passAd();
    toCommunity();
    toRead();
}

function mainHuawei() {
    let appName = '招商银行';
    ToAutojs();
    toApp(appName);
    passAd();
    toCommunity();
    toRead();
}

// ----------------------通用功能区-----------------------
// 切换到autojs
function ToAutojs() {
    if (currentPackage() != getPackageName('Auto.js')) {
        launchApp('Auto.js');
        sleep(1200);
    }
}
function cClick(element) {
    //toastLog(elementt.click());
    if (element != null) {
        click(element.bounds().centerX(), element.bounds().centerY());
    }
}

function sClick(element) {
    if (element != null) {
        if (!element.click()) {
            click(element.bounds().centerX(), element.bounds().centerY());
        }
        return true;
    }
    return false;
}

function passAd() {
    sClick(textContains('跳过').findOnce());
    sClick(descContains('跳过').findOnce());
    sClick(id('iv_adclose').findOnce());
    sClick(id('btn_closed').findOnce());
    sClick(id('img_close').findOnce());
}


function toApp(appName) {
    while (currentPackage() != getPackageName(appName)) {
        launchApp(appName);
        sleep(3000);
    }
}

/*
    小米使用参数1，2，华为使用0
*/
function toAppMulti(appName, cnt) {
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

//查看是否到社区
function toCommunity() {
    let entrance = null;
    while (1) {
        let toTop = text("置顶").findOnce();
        if (toTop != null) {
            try {
                entrance = toTop.parent().parent().parent().child(1);
            }
            catch (err) {
                continue;
            }
        }
        if (entrance != null) { break; }
        sClick(id('title').text('社区').findOne());
        toastLog('等待6秒');
        sleep(6000);
        swipe(400, 500, 400, 1400, 150);
        sleep(4000);
    }
    // 点击入口
    while (text('今日任务').findOnce() == null) {
        sClick(entrance);
        sleep(3000);
    }
    toastLog('等待4秒');
    sleep(4000);
    text('去关注').findOne();
    toastLog('已找到去关注');
}


function toRead() {
    let cnt = 4;
    let toTop;
    //let shareCnt = 0, ReadCnt = 0, focusCnt = 0, discussCnt = 0;
    let read = text('阅读文章').findOnce();
    let share = text('分享社区内容').findOnce();
    let discuss = text('发布评论').findOnce();
    let focus = text('关注作者').findOnce();

    let rdIdx = read.indexInParent();
    let shIdx = share.indexInParent();
    let dsIdx = discuss.indexInParent();
    let foIdx = focus.indexInParent();

    let ReadCnt = (read.parent().child(rdIdx + 4).text()).substring(0, 1);
    let shareCnt = (share.parent().child(shIdx + 4).text()).substring(0, 1);
    let discussCnt = (discuss.parent().child(dsIdx + 3).text()).substring(0, 1);
    let focusCnt = (focus.parent().child(foIdx + 3).text()).substring(0, 1);

    let rdBtn = read.parent().child(rdIdx + 5);
    let shBtn = share.parent().child(shIdx + 5);
    let dsBtn = discuss.parent().child(dsIdx + 4);
    let foBtn = focus.parent().child(foIdx + 4);

    toastLog(ReadCnt + '-' + shareCnt + '-' + discussCnt + '-' + focusCnt);

    if (ReadCnt != 5) {
        sClick(rdBtn);
    } else if (shareCnt != 2) {
        sClick(shBtn);
    } else if (discussCnt != 2) {
        sClick(dsBtn);
    } else if (focusCnt != 1) {
        sClick(foBtn);
    }
    let chapter;
    while (1) {
        toTop = text("置顶").findOnce();
        if (toTop == null) {
            back();
            sleep(3000);
            continue;
        }
        try {
            chapter = toTop.parent().parent().child(cnt).child(0).child(0);
            if(chapter.text("play").findOnce() != null) {
                cnt++;
                continue;
            }
        }
        catch (err) {
            toastLog('err');
            continue;
        }
        toastLog(chapter.text());
        sClick(chapter);
        toastLog('ReadCnt:' + ReadCnt);
        if (ReadCnt < 5) {
            sleep(1000);
            let rdPercent = className('android.view.View').textEndsWith('%').depth(9).findOne().text();
            toastLog('rdPercent' + rdPercent);
            swipe(400, 1500, 400, 400, 150);
            while (rdPercent.replace('%', '') < 50) {
                //toastLog(rdPercent);
                sleep(1100);
                rdPercent = className('android.view.View').textEndsWith('%').depth(9).findOne().text();
            }
            let i = 0;
            while (i < 10) {
                swipe(400, 1500, 380, 300, 500);
                sleep(700);
                i++;
            }
            text('99%').findOne();
            ReadCnt = Number(ReadCnt) + 1;
            sleep(2000);
        }
        toastLog('focusCnt:' + focusCnt);
        if (focusCnt < 1) {
            toastLog('focuse');
            sleep(1000);
            let alFocus = text('已关注').findOnce();
            if (alFocus == null) {
                sClick(alFocus);
                sleep(1200);
            }
            sClick(text('关注').findOnce());
            focusCnt = Number(focusCnt) + 1;
            sleep(2000);
        }
        toastLog('shareCnt:' + shareCnt);
        if (shareCnt < 2) {
            toastLog('share');
            sleep(1000);
            sClick(text('写下你的精彩评论').findOne().parent().parent().child(4));
            sleep(600);
            sClick(text('微信朋友圈').findOne());
            sleep(2000);
            sClick(text('取消').findOne());
            shareCnt = Number(shareCnt) + 1;
            sleep(2000);
        }
        toastLog('discussCnt:' + discussCnt);
        if (discussCnt < 2) {
            toastLog('discuss');
            sleep(1000);
            sClick(text('写下你的精彩评论').findOne());
            sleep(1500);
            input('评论评论');
            sleep(850);
            sClick(text('发布').findOne());
            discussCnt = Number(discussCnt) + 1;
            sleep(2000);
        }
        toastLog(ReadCnt + '-' + shareCnt + '-' + discussCnt + '-' + focusCnt);
        if (ReadCnt >= 5 && focusCnt >= 1 && shareCnt >= 2 && discussCnt >= 2) {
            break;
        }
    }
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