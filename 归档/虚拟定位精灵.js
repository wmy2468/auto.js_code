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
}