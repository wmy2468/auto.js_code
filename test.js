//toastLog(id("com.jd.lib.cashier.feature:id/cd").findOnce().click());
var func = require("func_list.js");

//func.sClick(text("招牌便民刮刮乐").findOne());
// toastLog((text("热门活动").findOne().parent()).indexInParent());
招商银行();

function 招商银行() {
    var appName = "招商银行";
    // setClip("＆https://t.cmbchina.com/RZV7f2＆");
    sleep(600);
    func.toApp(appName);
    func.passAd();
    // func.sClick(text("立即查看").findOne());
    func.sClick(id("cmb.pb:id/textMarquee").findOne());
    text("历史搜索").findOne();
    sleep(800);
    setText(0, "招牌便民刮刮乐");
    sleep(3500);
    func.sClick(text("做任务,刮大奖,兑好礼,最高赢8888元现金红包!").findOne());
    sleep(500);
    while (text("周日").findOnce() == null) {

        if (id("ivBigHeadImage").findOnce() != null) {
            sleep(500);
            func.gesture_pwd(appName);
            sleep(1000);
        }
    }
    sleep(2000);
    var monday = text("周一").findOne();
    func.sClick(monday.parent().parent().parent().child(3));
    text("医保电子凭证").findOne();
    sleep(1200);
    back();
    sleep(800);
    setClip("");
    toastLog(appName + "已签到");
    sleep(1200);
}
