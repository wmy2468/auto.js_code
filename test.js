let monday = text('周一').findOne();
sClick(monday.parent().parent().parent().child(3));

function main() {
    huaweiUnlock();
    sleep(2000);
    ToApp("抖音短视频");
}
function sClick(element) {
    if (element != null) {
        if (!element.click()) {
            return click(element.bounds().centerX(), element.bounds().centerY());
        }
        return true;
    } else { return false; }
}
function ToApp(appName) {
    if (currentPackage() != getPackageName(appName)) {
        launchApp(appName);
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