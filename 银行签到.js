auto.waitFor();

//toastLog(text('我的成长').findOne());
main();
//买单吧();
function main() {
    jd_sign();
    云闪付();
    浦发银行();
    工银e生活();
    //苏宁易购();
    浦发信用卡();
    邮储信用卡();
    华彩生活();
    买单吧();
    alert('已完成.');
}


function ToAutojs() {
    if (currentPackage() != getPackageName('Auto.js')) {
        launchApp('Auto.js');
        sleep(1000);
    }
}

function passAd() {
    let passAD = textContains('跳过').findOnce();
    let descpassAD = descContains('跳过').findOnce();
    if (passAD != null) {
        sClick(passAD);
        sleep(800);
    }
    if (descpassAD != null) {
        sClick(descpassAD);
        sleep(800);
    }
}

function ToApp(appName) {
    if (currentPackage() != getPackageName(appName)) {
        launchApp(appName);
        sleep(1000);
    }
}

// ======================签到代码==================================
// 浦发金豆签到
function 浦发银行() {
    let appName = '浦发银行';
    ToAutojs();
    //closeApp(appName);
    ToApp(appName);
    while (text('首页').findOnce() == null) {
        passAd();
    }
    sleep(1800);
    sClick(id('radio_button5').text('我的').findOnce());
    // 等待我的页面加载
    text('日历提醒').findOne();
    // 签到按钮
    while (text('金豆').findOnce() == null) {
        ToAutojs();
        ToApp(appName);
        sleep(3000);
    }
    sleep(800);
    sClick(text('金豆').findOnce());
    while (text('我的成长').findOnce() == null) {
        sleep(800);
        if (text('切换登录方式').findOnce() != null) {
            gesture_pwd(appName);
            sleep(1500);
        }
    }
    sleep(1000);
    if (textContains('连续签到').find().length > 2) {
        sClick(textContains('连续签到').findOnce());

    }
    toastLog(appName + '已签到');
}

function jd_sign() {
    ToApp("京东");
    //等待首页加载
    while (className('TextView').text('首页').findOnce() == null) {
        sClick(id('xk').findOnce());
        toastLog('等待首页...');
        passAd();
        sleep(2000);
    }
    sClick(className('TextView').text('领京豆').findOnce().parent());
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
        sleep(4000);
    }
    sClick(text('领券').findOnce().parent());
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
        sleep(4000);
    }
}

// 买单吧
function 买单吧() {
    let appName = '买单吧';
    ToAutojs();
    //closeApp(appName);
    ToApp(appName);
    while (className('TextView').id('tv_title').text('我的').findOnce() == null) {
        passAd();
        sClick(id('ivADClose').findOnce());
    }
    sClick(text('我的').findOne());
    sleep(2000);
    while (id('rl_title_white').findOnce() == null) {
        sClick(id('com.bankcomm.maidanba:id/tv_sign').text('每日签到').findOnce());
        sleep(1000);
        cClick(id('ivADClose').findOnce());
        log(appName + '等待登录');
        sleep(1500);
        if (text('手势登录').findOnce() != null) {
            gesture_pwd(appName);
            sleep(3000);
        }
    }
    sleep(1000);
    while (!(text('客官明天再来呦').findOnce() != null || text('完成').findOnce() != null)) {
        sClick(id('bt_signin').text('签到').findOnce());
        sClick(id('com.bankcomm.maidanba:id/bt_signin').text('抽奖').findOnce());
        sleep(1000);
        sClick(id('com.bankcomm.maidanba:id/bt_welfare_lottery').text('去抽奖').findOnce());
    }
    toastLog(appName + '已签到');
}

// 浦发
function 浦发信用卡() {
    let appName = '浦大喜奔';
    //closeApp(appName);
    ToAutojs();
    ToApp(appName);
    while (text('我的').findOnce() == null) {
        passAd();
    }
    sClick(text('我的').findOne());
    // 等待我的页面加载
    text('我的订单').findOne();
    while (className('ImageView').id('iv_user_leader_title_3').findOnce() == null) {
        ToAutojs();
        ToApp(appName);
        sleep(3000);
    }
    sClick(className('ImageView').id('iv_user_leader_title_3').findOne());
    // 输入手势密码
    text('请输入手势密码').findOne();
    sleep(1000);
    gesture_pwd(appName);
    sleep(3000);
    // 等待签到页面加载
    text('每日签到').findOne();
    sleep(1000);
    text('周一').findOne();
    sleep(1000);
    if (text('今天').findOnce().parent().child(1).text() == '待签到') {
        // 立即签到按钮
        let signNow;
        if (text('周一').find().length == 1) {
            signNow = text('周二').find()[1];
        } else {
            signNow = text('周一').find()[1];
        }
        sClick(signNow.parent().parent().child(3));
        sleep(800);
    }
    toastLog(appName + '已签到');
}

// 邮储信用卡
function 邮储信用卡() {
    let appName = '邮储信用卡';
    ToAutojs();
    //closeApp(appName);
    ToApp(appName);
    while (text('我的').findOnce() == null) {
        passAd();
        let Continue = className('TextView').text('继续使用').findOnce();
        if (Continue != null) {
            sClick(Continue);
        }
    }
    sleep(800);
    sClick(className('TextView').text('我的').findOne());
    // 等待我的页面加载
    let myBill = text('我的账单').findOne();
    /*while (id('module_08000000_iv').findOnce() == null) {
        ToAutojs();
        ToApp(appName);
        sleep(3000);
    }
    sleep(800);
    sClick(id('module_08000000_iv').findOnce());
*/
    sleep(800);
    sClick(myBill.parent().parent().parent().child(4));
    while (text('今日已签到').findOnce() == null) {
        sClick(text('马上签到').findOnce());
        sleep(800);
        if (text('忘记手势密码').findOnce() != null) {
            gesture_pwd(appName);
            sleep(1500);
        }
    }
    toastLog(appName + '已签到');
}

// 华彩生活
function 华彩生活() {
    let appName = '华彩生活';
    ToAutojs();
    //closeApp(appName);
    ToApp(appName);
    while (className('RadioButton').text('我的').findOnce() == null) {
        passAd();
    }
    sleep(1000);
    sClick(text('我的').findOnce());
    // 等待我的页面加载
    text('自动还款').findOne();
    // 签到按钮
    while (id('iv_sign').findOnce() == null) {
        ToAutojs();
        ToApp(appName);
        sleep(3000);
    }
    sleep(800);
    sClick(id('iv_sign').findOnce());

    while (textContains('恭喜您获得').findOnce() == null && text('今日已签').findOnce() == null) {
        sClick(text('连续签到抽大奖').findOnce());
        sleep(800);
        if (text('请输入手势密码').findOnce() != null) {
            gesture_pwd(appName);
            sleep(1500);
        }
    }
    toastLog(appName + '已签到');
}

// 云闪付
function 云闪付() {
    let appName = '云闪付';
    //closeApp(appName);
    ToAutojs();
    ToApp(appName);
    while (className('TextView').text('我 的').findOnce() == null) {
        passAd();
    }
    sClick(className('TextView').text('首 页').findOnce());
    //点击签到按钮
    sClick(id('com.unionpay:id/frog_float_notgif').findOne());
    // 等待签到页面加载
    className('TextView').textContains('已连续签到').findOne();

    if (text('已签到').findOnce() == null) {
        sClick(className('TextView').text('立即签到').findOnce());
        sleep(1500);
        if (text('去抽奖').findOnce() != null) {
            sClick(text('去抽奖').findOnce());
            id('com.unionpay:id/tv_title').text('签到抽奖专区').findOne();
            sleep(4500);
            cClick(text('签到抽奖专区').findOnce().parent().parent().child(2).
                child(0).child(0).child(0).child(0).child(0).child(3));
            idContains('resultBtn').findOne();
        }
    }
    toastLog(appName + '已签到');
}

function 工银e生活() {
    let appName = '工银e生活';
    ToAutojs();
    //closeApp(appName);
    ToApp(appName);
    while (id('radio_button1').text('生活').findOnce() == null) {
        passAd();
    }
    sleep(1000);
    sClick(id('radio_button1').text('生活').findOnce());
    
    text('商城').findOne();
    sleep(800);
    sClick(text('商城').findOnce());

    text('mall_banner_1').findOne();
    sleep(1000);
    sClick(text('mall_banner_1').findOnce());

    text('点击签到').findOne();
    sleep(2000);
    sClick(text('点击签到').findOnce());
    
    toastLog(appName + '已签到');
}

function 苏宁易购() {
    let appName = '苏宁易购';
    //closeApp(appName);
    ToAutojs();
    ToApp(appName);
    while (className('TextView').text('首页').findOnce() == null) {
        passAd();
        sleep(1000);
    }
    sleep(2000);
    let cancelBtn = id('com.suning.mobile.ebuy:id/marketing_cancel_img').findOnce();
    if (cancelBtn != null) {
        sClick(cancelBtn);
    }
    sleep(3000);
    //签到天天红包
    sClick(className('TextView').text('天天红包').findOnce());
    className('android.webkit.WebView').text('天天领红包').findOne();
    sleep(2500);
    if (text('开心收下').findOnce() != null) {
        //if (text('今日').findOnce().parent().child(2).text() != '已领取') {
        sClick(text('开心收下').findOnce());
    }
    while (className('TextView').text('首页').findOnce() == null) {
        back();
        sleep(3000);
    }
    sClick(className('TextView').text('现金签到').findOnce());
    className('TextView').text('云钻魔法狮').findOne();
    toastLog(appName + '已签到');
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
    //log(execStr);
    engines.execScript('hello', execStr);
}