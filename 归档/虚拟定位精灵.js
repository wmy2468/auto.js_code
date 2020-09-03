let name = '18107523694';
let pwd = 'zzc1231';
let pointText = '泉州';

main();

function passAd() {
    let passAD = textContains('跳过').findOnce();
    if (passAD != null) {
        sClick(passAD);
    }
}

function ToApp(appName) {
    if (currentPackage() != getPackageName(appName)) {
        launchApp(appName);
        sleep(1000);
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

function main() {
    let appName = '虚拟定位精灵';
    ToApp(appName);
    point = textContains(pointText).findOnce();
    while(point == null) {
        passAd();
        sleep(1000);
        point = textContains(pointText).findOnce();
    }
    sleep(800);
    sClick(point);
    sleep(800);
    sClick(text('前往').findOne());
    sleep(1000);
    sClick(id('login').findOne());
    text('忘记密码').findOne();
    setText(0, name);
    setText(1, pwd);
    sClick(id('bt_login').findOne());
    sClick(text('招钱进宝').findOne());
    // 等待钱宝加载
    let myBtn = id('com.example.mposstandard:id/main_tab_my').text('我的').findOne();
    sleep(4000);
    sClick(myBtn);
    text('我的资产').findOne();
    sleep(800);
    let clickLogin = text('点击登录').findOnce();
    if (clickLogin == null) {
        alert('当前已登录');
        return 0;
    } else {
        sClick(clickLogin);
        sleep(500);
    }
    let loginBtn = id('com.example.mposstandard:id/title_id').text('登 录').findOne();
    let qbName = '15980998207';
    let qbPwd = '003451jj';
    setText(0, qbName);
    setText(1, qbPwd);
    sleep(800);
    sClick(loginBtn);
    text('发送账单').id('com.example.mposstandard:id/bill_submit_button').findOne();
    sleep(500);
    alert('当前已登录');
}