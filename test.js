//toastLog(id("com.jd.lib.cashier.feature:id/cd").findOnce().click());
var func = require("func_list.js");

中行缤纷生活();
// toastLog(textContains("每周连续签到7天可获得翻倍轮盘机会").findOnce());

function 中行缤纷生活() {
    var appName = "缤纷生活";
    //closeApp(appName);
    func.toApp(appName);
    while (text("我的").findOnce() == null) {
        func.passAd();
    }
    sleep(1000);
    func.sClick(text("我的").findOnce());
    // 等待我的页面加载
    text("登录手机号更改").findOne();
    // 签到按钮
    var signBtnId = "imgRight";
    while (id(signBtnId).findOnce() == null) {
        func.toAutojs();
        func.toApp(appName);
        sleep(3000);
    }
    sleep(800);
    func.sClick(id(signBtnId).findOnce());

    while (text("查看活力奖励>").findOnce() == null) {
        sleep(800);
        if (textContains("手势登录密码").findOnce() != null) {
            sleep(500);
            func.gesture_pwd(appName);
            sleep(1000);
        }
    }
    text("查看活力奖励>").findOne();
    sleep(1000);
    while (true) {
        try {
            var signFlag = textContains("再连续签到").findOnce();
            var signText = signFlag.text();
            //toastLog("signText:" + signText);
            var idx = signFlag.indexInParent();
            var currentWeekday = Number(signText.substr(5, 1)) - 1;
            //toastLog("currentWeekday:" + String(currentWeekday));
            var weekdayText = signFlag.parent().child(idx + 1).child(0).child(currentWeekday).child(0).text();
            //toastLog("weekdayText:" + weekdayText);
            if (weekdayText == "") {
                break;
            } else {
                func.cClick(signFlag.parent().child(idx + 2));
                sleep(3000);
                textContains("每周连续签到7天可获得翻倍轮盘机会").findOne();
                break;
            }
        }
        catch (e) {
            sleep(1000);
        }
    }

    toastLog(appName + "已签到");
    sleep(3000);
}