// 导入模块
var func = require("func_list.js");
luanchApp("京东");
jd_sign();

function jd_sign() {
    //等待首页加载
    while (className("TextView").text("首页").findOnce() == null) {
        func.sClick(id("xk").findOnce());
        toastLog("等待首页...");
        func.passAd();
        func.sClick(textContains("取消").findOnce());
        func.sClick(descContains("取消").findOnce());
        sleep(1500);
    }

    var getCon = text("领券").findOne();
    func.sClick(getCon.parent());

    while (className("ImageView").desc("领券中心").findOnce() == null) {
        var closeBtn = id("com.jd.lib.coupon.feature:id/db").findOnce();
        if (closeBtn != null) {
            func.sClick(closeBtn.parent().child(1));
        }
        sleep(800);
    }
    sleep(1200);

    // 点击领话费券按钮
    var huafeis, huafeiParent;
    huafeis = text("话费券").find();
    // 如果话费券非空
    if (huafeis.nonEmpty()) {
        toastLog("找到" + huafeis.length + "个 话费券");
        for (let j = 0; j < huafeis.length; j++) {
            huafei = huafeis[j];
            log(huafei.text());
            try {
                huafeiParent = huafei.parent();
                log(huafeiParent.childCount());
                log(huafeiParent.child(2).child(1).text());
                if (huafeiParent.childCount() == 3 && huafeiParent.child(2).child(1).text() == "领取") {
                    func.sClick(huafeiParent.child(2));
                    toastLog("准备领取话费券");
                    sleep(1500);
                } else {
                    continue;
                }
            } catch (e) {
                continue;
            }
        }
    }

    var signBtn = className("TextView").text("立即领红包").findOnce();

    if (signBtn == null) {
        toastLog("今日已领券");
    }
    else {
        func.sClick(signBtn);
        className("ImageView").desc("关闭弹窗").findOne();
        func.sClick(className("ImageView").desc("关闭弹窗").findOne());
        toastLog("今日已领券");
        sleep(1000);
    }

    while (className("TextView").text("首页").findOnce() == null) {
        back();
        sleep(2000);
    }
}