auto.waitFor();
//toastLog(id('pattern_lock_body_layout').findOnce());

//main();

function main() {
    买单吧();
    浦发信用卡();
}


function ToAutojs() {
    if (currentPackage() != getPackageName('Auto.js')) {
        launchApp('Auto.js');
        sleep(1500);
    }
}


function ToApp(appName) {
    if (currentPackage() != getPackageName(appName)) {
        launchApp(appName);
        sleep(1500);
    }
}


// 买单吧
function 买单吧() {
    let appName = '买单吧';
    ToAutojs();
    closeApp(appName);
    ToApp(appName);
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
        center_click(id('bt_signin').text('签到').findOnce());
        center_click(id('com.bankcomm.maidanba:id/bt_signin').text('抽奖').findOnce());
    } else {
        toastLog(appName + '已签到');
    }
}

//toastLog(className('ImageView').id('iv_user_leader_title_3').findOnce());
//log(className('ImageView').id('iv_user_leader_title_3').findOnce());
// 浦发
function 浦发信用卡() {
    let appName = '浦发信用卡';
    closeApp(appName);
    ToAutojs();
    ToApp(appName);
    while (text('我的').findOnce() == null) {
        let passAD = className('TextView').text('跳过').findOnce();
        if (passAD != null) {
            center_click(passAD);
        }
    }
    center_click(text('我的').findOne());
    // 等待我的页面加载
    text('我的订单').findOne();
    while (className('ImageView').id('iv_user_leader_title_3').findOnce() == null) {
        ToAutojs();
        ToApp(appName);
        sleep(3000);
    }
    center_click(className('ImageView').id('iv_user_leader_title_3').findOne());

    // 等待签到页面加载
    text('每日签到').findOne();
    text('周一').findOne();
    text('周一').find()[1].parent().parent().child(3).click();
    text('请输入手势密码').findOne()
    sleep(3000);
    gesture_pwd(appName);
    sleep(3000);
    text('周一').findOne();
    if (text('今日已签到，明天再来吧！').findOnce() == null) {
        // 立即签到按钮
        text('周一').find()[1].parent().parent().child(3).click();
    } else {
        toastLog(appName + '已签到');
    }
}

// 邮储信用卡
function 邮储信用卡() {
    let appName = '邮储信用卡';
    ToAutojs();
    closeApp(appName);
    ToApp(appName);
    while (className('TextView').id('tv_title').text('我的').findOnce() == null) {
        let passAD = className('TextView').textContains('跳过').findOnce();
        if (passAD != null) {
            center_click(passAD);
        }
        let Continue = className('TextView').text('继续使用').findOnce();
        if (Continue != null) {
            center_click(Continue);
        }
    }
    center_click(className('TextView').id('tv_title').text('我的').findOne());
    // 等待我的页面加载
    center_click(id('user_mycard').text('我的账单').findOne());
    id('module_08000000_iv').findOne().click()

    while (text('每日签到即得88积分').findOnce() == null) {
        log(appName + '等待登录');
        if (text('手势登录').findOnce() != null) {
            gesture_pwd(appName);
            sleep(3000);
        }
    }
    if (text('今日已签到').findOnce() == null) {
        center_click(text('马上签到').findOnce());
    } else {
        toastLog(appName + '已签到');
    }
}

// 云闪付
function 云闪付() {
    let appName = '云闪付';
    closeApp(appName);
    ToAutojs();
    ToApp(appName);
    while (className('TextView').id('tv_tab_name').text('我 的').findOnce() == null) {
        let passAD = className('TextView').textContains('跳过').findOnce();
        if (passAD != null) {
            center_click(passAD);
        }
    }
    center_click(className('TextView').text('首 页').findOnce());
    //点击签到按钮
    id('frog_float_notgif').findOne().click();
    // 等待签到页面加载
    className('TextView').textContains('已连续签到').findOne();

    if (text('已签到').findOnce() == null) {
        center_click(className('TextView').text('立即签到').findOnce());
        // TODO 抽奖
    } else {
        toastLog(appName + '已签到');
    }
}

log(id('cpcRoot').findOnce());
// 淘宝
function 手机淘宝() {
    let appName = '手机淘宝';
    closeApp(appName);
    ToAutojs();
    ToApp(appName);
    while (desc('扫一扫').findOnce() == null) {
        let passAD = className('TextView').textContains('跳过').findOnce();
        if (passAD != null) {
            center_click(passAD);
        }
    }
    center_click(className('TextView').text('领淘金币').findOnce());
    textContains('您已连续签到').findOne();
    className('android.view.View').text('立即签到').findOnce().click()
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


function closeApp(appName) {
    let packageName = app.getPackageName(appName);
    app.openAppSetting(packageName);
    text(app.getAppName(packageName)).waitFor();
    let is_sure = textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/).findOne();
    if (is_sure.enabled()) {
        textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/).findOne().click();
        sleep(1000);
        if (textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/).find().length > 1) {
            textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/).find()[1].click();
        } else {
            textMatches(/(.*确.*|.*定.*)/).findOne().click();
        }
        log(app.getAppName(packageName) + "应用已被关闭");
        sleep(1000);
        back();
    } else {
        log(app.getAppName(packageName) + "应用不能被正常关闭或不在后台运行");
        back();
    }
}