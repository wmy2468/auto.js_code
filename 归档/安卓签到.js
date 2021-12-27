auto.waitFor();
// 导入模块
var func = require('func_list.js');

main();

function main() {
    jd_sign();
    alert("已完成");
    // func.lockScr();
}

// ======================签到代码==================================
function jd_sign() {
    func.to_app("京东");
    //等待首页加载
    while (text("首页").findOnce() == null) {
        func.sClick(id("xk").findOnce());
        toastLog("等待首页...");
        func.passAd();
        func.sClick(textContains("取消").findOnce());
        func.sClick(descContains("取消").findOnce());
        sleep(1500);
    }
    var getBeans = text("领京豆").findOne();
    func.sClick(getBeans.parent());
    // 等待页面加载
    textContains("购物返豆").findOne();
    sleep(800);

    while (textContains("已连").findOnce() == null) {
        func.cClick(text("签到领京豆").findOnce());
        if (text("签到日历").findOnce() != null) {
            back();
            sleep(2000);
        }
        sleep(800);
    }
    toastLog("已签到");
    sleep(1000);

    while (text("首页").findOnce() == null) {
        back();
        sleep(2000);
    }
    var getCon = text("领券").findOne();
    func.sClick(getCon.parent());

    while (className("ImageView").desc("领券中心").findOnce() == null) {
        // var closeBtn = id("com.jd.lib.coupon.feature:id/db").findOnce();
        // if (closeBtn != null) {
        //     func.sClick(closeBtn.parent().child(1));
        // }
        sleep(800);
    }
    sleep(1200);

    // 点击领话费券按钮
    var huafeis, huafeiParent, huafeiLen, huafeiParentChildCount;
    huafeis = text("话费券").find();
    if (!huafeis.nonEmpty()) {
        huafeis = text("话费神券").find();
    }
    // 如果话费券非空
    if (huafeis.nonEmpty()) {
        huafeiLen = huafeis.length;
        toastLog("找到" + huafeiLen + "个 话费券");
        for (let j = 0; j < huafeiLen; j++) {
            huafei = huafeis[j];
            try {
                huafeiParent = huafei.parent();
                huafeiParentChildCount = huafeiParent.childCount();
                log("childCount: " + huafeiParentChildCount);
                log("button Text: " + huafeiParent.child(huafeiParentChildCount - 1).text());
                if (huafeiParentChildCount == 3 && huafeiParent.child(huafeiParentChildCount - 1).text() == "领取") {
                    func.sClick(huafeiParent.child(huafeiParentChildCount - 1));
                    toastLog("准备领取话费券");
                    sleep(1500);
                } else {
                    continue;
                }
            } catch (e) {
                toastLog("找话费券报错了");
                continue;
            }
        }
    }
    var signBtn;
    if (device.model == "TAS-AL00") {
        signBtn = text("立即领红包").findOnce();
    } else {
        // 新版本签到
        signBtn = text("签到领奖励").findOnce();
    }
    if (signBtn == null) {
        toastLog("今日已领券");
    }
    else {
        func.sClick(signBtn);
        sleep(2000);
        className("ImageView").desc("关闭弹窗").findOne();
        func.sClick(className("ImageView").desc("关闭弹窗").findOne());
        toastLog("今日已领券");
        sleep(1000);
    }

    while (text("首页").findOnce() == null) {
        back();
        sleep(2000);
    }
}

function 招商银行() {
    var appName = "招商银行";
    // setClip("＆https://t.cmbchina.com/RZV7f2＆");
    sleep(600);
    func.to_app(appName);
    func.passAd();
    // func.sClick(text("立即查看").findOne());
    func.sClick(id("cmb.pb:id/textMarquee").findOne());
    text("历史搜索").findOne();
    sleep(2500);
    setText(0, "刮刮乐");
    sleep(800);
    func.sClick(text("功能").findOne());
    func.sClick(text("招牌便民刮刮乐").findOne());
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
