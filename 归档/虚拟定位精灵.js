var userName = "18107523694";
var userPwd = "zzc1231";
var pointText = ["泉州", "成都"];

main();

function passAd() {
    var passAD = textContains("跳过").findOnce();
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
    var targetText = dialogsWin(pointText);
    var appName = "虚拟定位精灵";
    ToApp(appName);
    point = textContains(targetText).findOnce();
    while (point == null) {
        passAd();
        sleep(1000);
        point = textContains(targetText).findOnce();
    }
    sleep(800);
    sClick(point);
    sleep(800);
    sClick(text("前往").findOne());
    sleep(1000);
    sClick(id("login").findOne());
    text("忘记密码").findOne();
    setText(0, userName);
    setText(1, userPwd);
    sClick(id("bt_login").findOne());
    text("更多功能").findOne();
    /*
    sClick(text("招钱进宝").findOne());
    // 等待钱宝加载
    var myBtn = id("com.example.mposstandard:id/main_tab_my").text("我的").findOne();
    sleep(4000);
    sClick(myBtn);
    text("我的资产").findOne();
    sleep(800);
    var clickLogin = text("点击登录").findOnce();
    if (clickLogin == null) {
        alert("当前已登录");
        return 0;
    } else {
        sClick(clickLogin);
        sleep(500);
    }
    var loginBtn = id("com.example.mposstandard:id/title_id").text("登 录").findOne();
    var qbName = "15980998207";
    var qbPwd = "003451jj";
    setText(0, qbName);
    setText(1, qbPwd);
    sleep(800);
    sClick(loginBtn);
    text("发送账单").id("com.example.mposstandard:id/bill_submit_button").findOne();
    */
    sleep(500);
    alert("当前已登录");
}


function dialogsWin(inArr) {
    var selIdx = dialogs.select("选择启动", inArr);
    if (selIdx == -1) {
        exit();
    }
    return inArr[selIdx];
}