auto.waitFor();
// 导入模块
var func = require('func_list.js');

main();
//买单吧();
function main() {
    func.xiaomiUnlock();
    招商银行();
    let i = 1;
    while (i < 3) {
        func.toAppMulti("京东", i);
        jd_sign();
        i = i + 1;
    }
    func.lockScr();
}

// ======================签到代码==================================
function jd_sign() {
    //等待首页加载
    while (className('TextView').text('首页').findOnce() == null) {
        func.sClick(id('xk').findOnce());
        toastLog('等待首页...');
        func.passAd();
        sleep(2000);
        func.sClick(textContains('取消').findOnce());
        func.sClick(descContains('取消').findOnce());
    }
    let getBeans = className('TextView').text('领京豆').findOne();
    func.sClick(getBeans.parent());
    //等待进店领豆加载
    className('TextView').text('进店领豆').findOne();
    if (className('TextView').text('已连续签到').findOnce()) {
        toastLog('今日已签到');
    }
    else {
        func.sClick(className('TextView').text('签到领京豆').findOnce());
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
    func.sClick(getCon.parent());
    
    while (className('ImageView').desc('领券中心').findOnce() == null) {
        let closeBtn = id('com.jd.lib.coupon.feature:id/db').findOnce();
        if (closeBtn != null) {
            func.sClick(closeBtn.parent().child(1));
        }
        sleep(800);
    }
    sleep(1200);

    let sighBtn1 = id('com.jd.lib.coupon.feature:id/dg').findOnce();
    let signBtn2 = className('TextView').text('立即签到').findOnce();

    if (sighBtn1 == null || signBtn2 == null) {
        toastLog('今日已领券');
    }
    else {
        func.sClick(sighBtn1);
        func.sClick(signBtn2);
        className('ImageView').desc('关闭弹窗').findOne();
        func.sClick(className('ImageView').desc('关闭弹窗').findOne());
    }

    while (className('TextView').text('首页').findOnce() == null) {
        back();
        sleep(2000);
    }
}

function 招商银行() {
    let appName = '招商银行';
    setClip('＆https://t.cmbchina.com/RZV7f2＆');
    sleep(600);
    func.toApp(appName);
    func.passAd();
    func.sClick(text('立即查看').findOne());
    sleep(1000);
    while (text('周日').findOnce() == null) {
        if (id('ivBigHeadImage').findOnce() != null) {
            sleep(500);
            func.gesture_pwd(appName);
            sleep(1000);
        }
    }
    sleep(2000);
    let monday = text('周一').findOne();
    func.sClick(monday.parent().parent().parent().child(3));
    text('医保电子凭证').findOne();
    sleep(1200);
    back();
    sleep(800);
    setClip('');
    toastLog(appName + '已签到');
    sleep(1200);
}