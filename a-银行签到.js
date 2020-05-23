auto.waitFor();
//toastLog(id('pattern_lock_body_layout').findOnce());

//main();

function main() {
    maiDanBa();
}


function backHome(appName) {
    let pkg = getPackageName(appName);
    if (currentPackage() != pkg) {
        home();
        sleep(1500);
    }
}

// 买单吧
function maiDanBa() {
    appName = '买单吧';
    backHome(appName);
    launchApp(appName);
    while (className('TextView').id('tv_title').text('我的').findOnce() == null) {
        let passAD = className('TextView').text('跳过').findOnce();
        if (passAD != null) {
            center_click(passAD);
        }
    }
    center_click(className('TextView').id('tv_title').text('我的').findOne());
    center_click(id('com.bankcomm.maidanba:id/tv_sign').text('每日签到').findOne());

    while (id('rl_title_white').findOnce() == null) {
        log(appName + '等待登录');
        if (text('手势登录').findOnce() != null) {
            gesture_pwd(appName);
            sleep(3000);
        }
    }
    if (text('客官明天再来呦').findOnce() == null) {
        toastLog('签到');
    } else {
        toastLog(appName + '已签到');
    }
}


toastLog(text('每日签到').findOnce());
// 浦发
function puFa() {
    appName = '浦发信用卡';
    backHome(appName);
    launchApp(appName);
    while (id('tv_tab_name').text('我的').findOnce() == null) {
        let passAD = className('TextView').text('跳过').findOnce();
        if (passAD != null) {
            center_click(passAD);
        }
    }
    center_click(className('TextView').id('tv_tab_name').text('我的').findOne());
    center_click(className('ImageView').id('iv_user_leader_title_3').findOne());
    // 等待签到页面加载
    text('每日签到').findOne();
    while (text('请输入手势密码').findOnce() == null) {
        log(appName + '等待登录');
        if (text('请输入手势密码').findOnce() != null) {
            gesture_pwd(appName);
            sleep(3000);
        }
    }
    if (text('今日已签到，明天再来吧！').findOnce() == null) {
        // 立即签到按钮
        text('周一').find()[1].parent().parent().child(3).click();
    } else {
        toastLog(appName + '已签到');
    }
}
// 邮储信用卡
function youChu() {
    backHome();
    appName = '邮储信用卡';
    luanchApp(appName);
    gesture_pwd(appName);
}
// 云闪付
function yunShanfu() {
    backHome();
    appName = '云闪付';
    luanchApp(appName);
}
// 京东金融
function jinRong() {
    backHome();
    appName = '买单吧';
    luanchApp(appName);
    gesture_pwd(appName);
}
// 淘宝
function taoBao() {
    backHome();
    appName = '买单吧';
    luanchApp(appName);
    gesture_pwd(appName);
}


function center_click(element) {
    if (element != null) {
        click(element.bounds().centerX(), element.bounds().centerY());
        sleep(1000);
        return true;
    } else { return false; }
}

// xy为中心点坐标，offset为滑动区域 两个点之间的距离
function gesture_pwd(appName) {
    let execStr = 'gesture(850';
    let pointX, pointY, point;
    let offSet = device.width * 0.25;
    switch (appName) {
        case '买单吧':
            point = id('com.bankcomm.maidanba:id/login_gestureLockView_rl').findOnce();
            log('买单吧');
            break;
        case '邮储信用卡':
            point = id('com.yitong.mbank.psbc.creditcard:id/lock_pattern').findOnce();
            log('邮储信用卡');
            break;
        case '浦发信用卡':
            point = id('com.spdbccc.app:id/pattern_lock_body_layout').findOnce();
            log('浦发信用卡');
            break;
    }
    if (point == null) { return false; }
    x = point.bounds().centerX();
    y = point.bounds().centerY();
    let pwd = '147895';
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
    //toastLog(execStr);
    engines.execScript('hello', execStr);
}