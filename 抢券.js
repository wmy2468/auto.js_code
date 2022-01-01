auto.waitFor();
// 导入模块
var func = require("func_list.js");
var cfg = func.config_dict();

main();

function main() {
    let selectedArr = ["光大活动", "中信活动", "交行5积分", "京喜领券", "掌上生活", "招商便民生活", "招商倒计时领取", "云闪付2022新年"
        // "中行周二视频捡漏",  // "云闪付锦鲤活动",  // "农行缴费20-10", // "京东腾讯月",   // "工行活动",
    ];
    let ysf;
    //---------------配置区域-----------------
    let scriptName = func.dialogsWin(selectedArr);      // 设置查找的文本        
    // 设置屏幕常亮6分钟
    device.keepScreenOn(1000 * 60 * 6);
    if (scriptName == "光大活动") { 光大活动(); }
    else if (scriptName == "中信活动") { 中信活动(); }
    else if (scriptName == "工行活动") { 工行活动(); }
    else if (scriptName == "掌上生活") { 掌上生活活动(); }
    else if (scriptName == "交行5积分") { 交行9点5积分(); }
    else if (scriptName == "京东腾讯月") { 京东腾讯月(); }
    else if (scriptName == "农行缴费20-10") { 农行缴费(); }
    else if (scriptName == "京喜领券") { 京喜领券(); }
    else if (scriptName == "招商便民生活") { 招商便民生活(); }
    else if (scriptName == "招商倒计时领取") { 招商倒计时领取(); }
    else if (scriptName == "中行周二视频捡漏") { 中行周二视频捡漏(); }
    else if (scriptName == "云闪付2022新年") { ysf = 云闪付(); ysf.云闪付2022新年(); }
    else if (scriptName == "云闪付有礼花") { ysf = 云闪付(); ysf.云闪付有礼花(); }
    toastLog("结束");
    device.cancelKeepingAwake();
}

// ------------------------------------------------------
function 招商倒计时领取() {
    let select_txt, appName, url;
    appName = "招商银行"
    select_txt = func.dialogsWin(["年末美食狂欢节M1", "年末美食狂欢节M4", "啥也不选"])
    if (select_txt == "年末美食狂欢节M1") { url = "cmbmobilebank://cmbls/functionjump?action=gofuncid&funcid=16604001&cmb_app_trans_parms_start=here&fullUrl=https%253A%252F%252Fmarket.cmbchina.com%252FMPage%252Fonline%252F211025170821628%252Fftbb.html%253Fbehavior_entryid%253Dlff003001%2526behavior_pageid%253D31B15ED7%2526DeviceType%253DE%2526Version%253D9.9.0%2526SystemVersion%253D10%2526ATraceID%253De47883770b17411eb2449805822210bc%2526msid%253Dc5ada3aa3ff0464a918ae2af77adb890&shortUrl=https%253A%252F%252Fcmbt.cn%252Fa%252F456xRYghZ%253Fbehavior_entryid%253Dlff003001%2526behavior_pageid%253D31B15ED7%2526DeviceType%253DE%2526Version%253D9.9.0%2526SystemVersion%253D10%2526ATraceID%253De47883770b17411eb2449805822210bc%2526msid%253Dc5ada3aa3ff0464a918ae2af77adb890&appflag=0"; }
    else if (select_txt == "年末美食狂欢节M4") { url = "cmbmobilebank://cmbls/functionjump?action=gofuncid&funcid=16604001&cmb_app_trans_parms_start=here&fullUrl=https%253A%252F%252Fmarket.cmbchina.com%252FMPage%252Fonline%252F211025170821628%252Fftbb.html%253Fbehavior_entryid%253Dlff003001%2526behavior_pageid%253D31B15ED7%2526DeviceType%253DE%2526Version%253D9.9.0%2526SystemVersion%253D10%2526ATraceID%253De47883770b17411eb2449805822210bc%2526msid%253Dc5ada3aa3ff0464a918ae2af77adb890&shortUrl=https%253A%252F%252Fcmbt.cn%252Fa%252F456xRYghZ%253Fbehavior_entryid%253Dlff003001%2526behavior_pageid%253D31B15ED7%2526DeviceType%253DE%2526Version%253D9.9.0%2526SystemVersion%253D10%2526ATraceID%253De47883770b17411eb2449805822210bc%2526msid%253Dc5ada3aa3ff0464a918ae2af77adb890&appflag=0"; }
    else if (select_txt == "啥也不选") { url = ""; }

    if (url != "") {
        func.to_scheme(url);
    } else {
        func.to_app(appName);
    }
    toastLog("等待立即领取出现");
    func.sClick(textContains("立即领取").findOne());
    toastLog("已点击");
}

function 招商领取(page_text, wait_text, popup_wait_text, select_text, sure_btn) {
    /**
    @param page_text 等待目标页面 加载的文字
    @param wait_text 等待时间到点后 加载的文字
    @param popup_wait_text 等待点击后 弹窗加载的文字
    @param select_text 等待目标页面 要选择的文字
    @param sure_btn 等待选择界面后确认 的文字
     */
    while (text(page_text).findOnce() == null) {
        toast("等待跳转到:" + page_text + "页面");
        sleep(2200);
    }
    let cnt;
    cnt = 0
    while (func.sClick(text(wait_text).findOnce()) == false) {
        if (cnt % 10 == 0) {
            toast("等待选择奖品");
        }
        cnt = cnt + 1;
        sleep(300);

    }
    let popup_parent, popup_child;
    popup_parent = text(popup_wait_text).findOne().parent();
    popup_child = popup_parent.findByText(select_text);
    if (popup_child.size() > 0) {
        func.cClick(popup_child.get(0));
    }
    sleep(200);
    func.sClick(text(sure_btn).findOne());
}

function 招商便民生活() {
    let page_text, wait_text, popup_wait_text, select_text, sure_btn;
    page_text = "便民生活 遇见美好";
    wait_text = "选择奖品";
    popup_wait_text = "请选择奖品";
    select_text = func.dialogsWin(["双立人", "洁柔", "6000微克", "5000微克", "4000微克"]);
    sure_btn = "确认领取";
    url_target = "cmbmobilebank://cmbls/functionjump?action=gofuncid&funcid=16604001&cmb_app_trans_parms_start=here&fullUrl=https://actship-activityui.paas.cmbchina.com/ActPage.html?activityId=AGP20211201095436sH6P8jxK&behavior_entryid=undefined&shortUrl=https://cmbt.cn/a/htREAc?activityId=AGP20211201095436sH6P8jxK&behavior_entryid=undefined&appflag=0"
    func.to_scheme(url_target);
    招商领取(page_text, wait_text, popup_wait_text, select_text, sure_btn);
}


function 中行周二视频捡漏() {
    let aiqiyi, youku, tengx, pay5, cnt;
    aiqiyi = "爱奇艺VIP";
    youku = "优酷VIP"
    tengx = "腾讯视频VIP"
    pay5 = "确认支付";
    cnt = 0;
    while (1) {
        if (textContains(aiqiyi).findOnce() == null && textContains(youku).findOnce() == null && textContains(tengx).findOnce() == null) {
            toastLog("请跳转到 \" 视频会员 \"，直到提示  已到达等待页面");
            sleep(2500);
        } else {
            toastLog("已到 \" 视频会员 \"，页面");
            sleep(2500);
            break;
        }
    }
    let exflag = false;
    while (1) {
        if (func.sClick(text(pay5).findOnce()) == true) {
            toastLog("已点击确认支付");
            while (1) {
                if (text("当日库存已抢购完毕，请明日参加活动。").findOnce() != null) {
                    if (func.sClick(text("确认").findOnce()) == true) {
                        sleep(5000);
                        break;
                    }
                }
                sleep(1000);
                cnt = cnt + 1;
                if (cnt >= 10) {
                    cnt = 0;
                    exflag = true;
                    break;
                }
            }
            if (exflag) {
                toastLog("未找到库存完毕，退出");
                break;
            }
        } else {
            sleep(1000);
        }
    }
}




// ------------------------云闪付锦鲤活动--------------------------------------

function 云闪付() {
    this.云闪付2022新年 = function () {
        let url_ysf, coupon_desc, coupon_id;
        let startTime, timeArea;
        startTime = "10,59,55,000";
        timeArea = "北京时间";

        coupon_desc = func.dialogsWin(Object.keys(cfg["url_scheme"]["云闪付"]["云闪付_券_圆梦新年"]))
        coupon_id = func.dialogsWin(Object.keys(cfg["url_scheme"]["云闪付"]["云闪付_券_圆梦新年"][coupon_desc]))

        url_ysf = cfg["url_scheme"]["云闪付"]["云闪付_券_圆梦新年"][coupon_desc][coupon_id];

        func.to_scheme(url_ysf);
        toastLog("测试查看,2秒后 切回autojs");
        textContains("活动咨询").findOne();
        sleep(1000);
        func.to_autojs();
        // 准备倒计时
        func.getTimeDiff(timeArea, startTime);
        func.to_scheme(url_ysf);
        if (func.sClick(text("立即领取").findOne(10000))) {
            toastLog("超时退出");
        }
    }
    this.云闪付捡漏 = function () {
        let targetViewText, targetText;
        // targetViewText = func.dialogsWin(["10-2线上", "10-2线下"]);
        while (text("奖励中心").findOnce() == null) {
            toastLog("请跳转到 \" 奖励中心 \"，直到提示  已到达等待页面");
            sleep(2000);
        }
        // switch (targetViewText) {
        //     case "10-2线上":
        //         counponText = "满10可用";
        //         targetText = "线上指定商户";
        //         break;
        //     case "10-2线下":
        //         counponText = "满10可用";
        //         targetText = "线下指定商户";
        //         break;
        // }
        let clickFlag, exWhile, clickItems, clickItem, itemParent, itemIndex, upItemText;
        exWhile = false;
        clickFlag = 1;
        while (1) {
            if (clickFlag == 1) {
                counponText = "满10可用";
                targetText = "线下指定商户";
                clickFlag = 2;
            } else {
                counponText = "满10可用";
                targetText = "线上指定商户";
                clickFlag = 1;
            }
            // 查找券位置
            while (1) {
                try {
                    clickItems = text(counponText).find();
                    log("找到 " + counponText + " 数量：" + clickItems.length);
                    if (clickItems.nonEmpty()) {
                        for (let i = 0; i < clickItems.length; i++) {
                            clickItem = clickItems[i];
                            itemIndex = clickItem.indexInParent();
                            itemParent = clickItem.parent();
                            upItemText = (itemParent.child(itemIndex + 1)).text();
                            log(upItemText);
                            // 如果文本一致，就退出选择
                            if (upItemText == targetText) {
                                exWhile = true;
                                break;
                            }
                        }
                    }
                    // 如果退出选项
                    if (exWhile) {
                        break;
                    }
                }
                catch (e) {
                    log("123");
                }
            }
            // 点击进入 等待
            func.sClick(clickItem);
            // 等待是否到达立即领取页面
            text("优惠券到账后24小时内有效").findOne();
            // 如有立即领取，点击 退出程序
            if (func.sClick(text("立即领取").findOnce())) {
                // 如果已点击，就等待手动返回
                while (text("奖励中心").findOnce() == null) {
                    toastLog("等待手动返回...");
                    sleep(2500);
                }
            } else {
                toastLog("未捡漏成功....");
                sleep(2000);
                back();
                text("奖励中心").findOne();
                toastLog("已返回....");
                sleep(1500);
            }
        }
    }
    this.云闪付有礼花 = function () {
        let btn_confirm, cnt = 0;
        let timeArea = "北京时间";
        let startTime = "11,00,00,100";
        btn_confirm = className("android.widget.Image").text("btn_confirm").findOnce();
        while (btn_confirm == null) {
            if (cnt > 10 || cnt == 0) {
                toastLog("请跳转到云闪付，输入完成验证码界面");
                cnt = 0;
            }
            cnt = cnt + 1;
            sleep(300);
            btn_confirm = className("android.widget.Image").text("btn_confirm").findOnce();
        }
        toastLog("已到达指定页面");
        try {
            func.getTimeDiff(timeArea, startTime);              // 等待时间
            func.sClick(btn_confirm);
        }
        catch (e) {
            func.sClick(className("android.widget.Image").text("btn_confirm").findOnce());
        }
    }
    this.云闪付锦鲤活动 = function () {
        let startTime;
        let appName = "云闪付";
        let timeArea = "北京时间";
        toastLog("到点点击");

        let currentWeekday = new Date().getDay();
        let counponText;
        // 返回的周日0 周一返回1，周二2
        switch (currentWeekday) {
            case 5:
                counponText = "满20可用";
                break;
            case 6:
                counponText = "满35可用";
                break;
            case 0:
                counponText = "满50可用";
                break;
        }
        let selectFunc;
        selectFunc = func.dialogsWin(["每日券", "云闪付捡漏", "周五六日10点", "周五六日15点"]);
        let clockBefore, clockAfter;
        let clock9, clock10, clock15;
        let targetText;
        targetText = "线下指定商户";
        clock9 = "09:00";
        clock10 = "10:00";
        clock15 = "15:00";
        switch (selectFunc) {
            case "每日券":
                counponText = "满10可用";
                targetText = func.dialogsWin(["线下指定商户", "线上指定商户"]);
                startTime = "08,59,58,800";
                clockAfter = clock9;
                clockBefore = clock10;
                break;
            case "周五六日10点":
                startTime = "09,59,58,500";
                clockAfter = clock10;
                clockBefore = clock15;
                break;
            case "周五六日15点":
                startTime = "14,59,58,500";
                clockAfter = clock15;
                clockBefore = clock10;
                break;
            case "云闪付捡漏":
                云闪付捡漏();
                break;
        }
        let getCouponWay;       //定义领券方式
        getCouponWay = func.dialogsWin(["提前1秒进入页面领取", "切换时间标签领券"]);
        func.to_app(appName);
        while (text("明日预告").findOnce() == null) {
            // 如果能点击按钮，就等待设置文本
            try {
                if (func.sClick(className("ViewFlipper").idContains("marquee").findOnce()) == true) {
                    // 只要找到一个不为空
                    if (textContains("跳过").findOnce() != null || descContains("跳过").findOnce() != null) {
                        sleep(600);
                        continue;
                    } else {
                        text("历史记录").findOne();
                        func.sClick(text("奖励中心").depth(15).findOne());
                        func.sClick(text("奖励中心").depth(17).findOne());
                    }
                }
            }
            catch (e) {
                continue;
            }
        }
        // 等待进入指定页面
        while (text("奖励中心").findOnce() == null) {
            toastLog("请跳转到 \" 奖励中心 \"，直到提示  已到达等待页面");
            sleep(1500);
        }
        toastLog("已到达 \" 奖励中心 \"");
        let clickBtn, clickItems;
        if (getCouponWay == "提前1秒进入页面领取") {
            func.sClick(text(clockAfter).findOne());   //点击目标时间按钮
            sleep(1000);
            // 查找券位置
            while (1) {
                try {
                    clickItems = text(counponText).find();
                    log("找到 " + counponText + " 数量：" + clickItems.length);
                    if (clickItems.nonEmpty()) {
                        for (let i = 0; i < clickItems.length; i++) {
                            clickBtn = clickItems[i];
                            itemIndex = clickBtn.indexInParent();
                            itemParent = clickBtn.parent();
                            upItemText = (itemParent.child(itemIndex + 1)).text();
                            log(upItemText);
                            // 如果文本一致，就退出选择
                            if (upItemText == targetText) {
                                exWhile = true;
                                break;
                            }
                        }
                    }
                    // 如果退出选项
                    if (exWhile) {
                        break;
                    }
                }
                catch (e) {
                    log(e);
                }
            }
            // 准备倒计时
            func.getTimeDiff(timeArea, startTime);

            func.sClick(clickBtn);// 时间到达 点击Jk
            text("优惠券到账后24小时内有效").findOne();         // 等待是否到达立即领取页面
            if (func.sClick(text("立即领取").findOne(10000)) == false) {
                toastLog("超时退出...");
            }
        } else if (getCouponWay == "切换时间标签领券") {
            // 点击另一个时间
            func.sClick(text(clockBefore).findOne());
            sleep(500);
            func.sClick(text(clockBefore).findOne());
            sleep(500);
            func.sClick(text(clockBefore).findOne());
            sleep(800);
            // 定义子按钮的位置
            let childIdx;
            switch (selectFunc) {
                case "每日券":
                    if (counponText == "线下指定商户") {
                        childIdx = 2;
                    }
                    else if (counponText == "线上指定商户") {
                        childIdx = 8;
                    }
                case "周五六日10点":
                    childIdx = 2;
                    break;
                case "周五六日15点":
                    childIdx = 2;
                    break;
            }
            // 定义目标时间，提前获取
            let targetClock;
            targetClock = text(clockAfter).findOne();
            toastLog("已到达指定页面，等待");
            //  等待倒计时
            func.getTimeDiff(timeArea, startTime);
            // 寻找目标按钮
            func.sClick(targetClock);
            while (1) {
                // 点击目标时间
                try {
                    clickBtn = text(counponText).findOnce().parent().parent().child(childIdx);
                } catch (error) {
                    continue;
                }
                if (clickBtn.text() != "立即领取") {
                    func.sClick(text(clockBefore).findOne());
                    sleep(100);
                    func.sClick(text(clockAfter).findOne());
                    sleep(100);
                    while (text(counponText).findOnce() == null) {
                        func.sClick(text(clockAfter).findOnce());
                        sleep(100);
                    }
                } else {
                    break;
                }
            }
            func.sClick(clickBtn);
        }
        toastLog("已完成");
    }
    return this;
}
// ------------------------云闪付锦鲤活动--------------------------------------

function 京喜领券() {
    let timeArea = "京东时间";
    let startTime, targetViewText;
    let actNames = ["0点京喜95折", "京东券"];
    let actName = func.dialogsWin(actNames);      // 设置查找的文本
    let coupon_url, url_页面;
    switch (actName) {
        case "0点京喜95折":
            startTime = "23,59,59,990";
            targetViewText = "立即领取";
            coupon_url = "http://coupon.m.jd.com/coupons/show.action?key=g7udi9d8e5260e8b7a8a76c0d01209e8&roleId=62130462";
            url_页面 = (cfg["url_scheme"]["京东"]["京喜_券"]).replace("replace_url", coupon_url);
            break;
    }
    // 跳转到APP
    func.to_scheme(url_页面);

    // 等待进入指定页面
    let couClick = textContains(targetViewText).findOnce();
    while (couClick == null) {
        couClick = textContains(targetViewText).findOnce();
        toastLog("等待跳转到京喜优惠券页面");
        sleep(1000);
    }
    func.getTimeDiff(timeArea, startTime);              // 等待时间
    func.sClick(couClick);             // 点击元素
    sleep(100);
    func.sClick(couClick);             // 点击元素
    sleep(100);
    func.sClick(couClick);             // 点击元素
    toast("已点击");
    sleep(3000);

}

function 农行缴费() {
    let startTime, targetViewText;
    let appName = "云闪付";
    let timeArea = "北京时间";
    toastLog("到点点击");
    startTime = "09,59,59,700";
    targetViewText = "[6179]";
    func.to_app(appName);
    // 等待进入指定页面
    let card = textContains(targetViewText).findOnce();
    while (card == null) {
        card = textContains(targetViewText).findOnce();
        toastLog("请跳转到券领取页面，直到提示  已到达等待页面");
        sleep(800);
    }
    toastLog("已到达指定页面，等待");
    //  等待倒计时
    func.getTimeDiff(timeArea, startTime);
    // 点击进入 等待
    func.sClick(card);
    while (1) {
        if (text('¥10.00').findOnce()) {
            if (func.sClick(text("确认付款").findOnce())) { break; }
        } else {
            sleep(50);
        }
    }
}


function 掌上生活活动() {
    let startTime, targetViewText;
    let actNames = ["周三五折", "10点拼团星巴克"];
    let actName = func.dialogsWin(actNames);      // 设置查找的文本
    let appName = "掌上生活";
    let timeArea = "北京时间";
    let cnt = 3;
    switch (actName) {
        // 10点
        case "周三五折":            //10点
            toastLog("提前5秒进入");
            startTime = "09,59,55,000";
            targetViewText = func.dialogsWin(["（周三5折）喜茶20元代金券",
                "（周三5折）必胜客50元代金券",
                "（周三5折）肯德基20元全场通兑代金券"]);
            func.to_app(appName);
            // 等待进入指定页面
            while (!text(targetViewText).findOnce()) {
                toastLog("请跳转到券领取页面，直到提示  已到达等待页面");
                sleep(800);
            }
            toastLog("已到达指定页面，等待");
            //  提前10秒 开始查找
            func.getTimeDiff(timeArea, startTime);
            // 点击进入 等待
            func.sClick(text(targetViewText).findOne());
            while (1) {
                if (!func.sClick(textContains("立即抢购").findOnce())) {
                    sleep(200);
                } else {
                    break;
                }
            }
            break;
        case "10点拼团星巴克":            //10点
            toastLog("提前15秒 进入");
            startTime = "09,59,45,000";
            targetViewText = "星巴克中杯手工调制饮品";
            func.to_app(appName);
            // 等待进入指定页面
            while (!textContains("成团").findOnce()) {
                toastLog("请跳转到券领取页面，直到提示  已到达等待页面");
                sleep(800);
            }
            toastLog("已到达指定页面，等待");
            //  提前10秒 开始进入
            func.getTimeDiff(timeArea, startTime);
            func.sClick(textContains("成团").findOnce());
            let clickBtn;
            func.getTimeDiff(timeArea, "09,59,59,700");
            while (1) {
                try {
                    clickBtn = text(targetViewText).findOnce().parent().child(8).child(0);
                    // 点击立即抢
                    while (cnt > 0) {
                        clickBtn.click();
                        sleep(200);
                        cnt = cnt - 1;
                    }
                    break;
                }
                catch (e) { continue; }
            }
            break;
    }
    toastLog("已点击，请确认结果");
    sleep(3000);
}

// 到点点击
function 光大活动() {
    toastLog("到点点击");
    let startTime, targetViewText;
    let actNames = ["必胜客50买100元", "青桔单车2.5买月卡",
        "饿了么1分买6元", "饿了么1分买10元"
    ];
    let actName = func.dialogsWin(actNames);      // 设置查找的文本
    switch (actName) {
        // 10点
        case "必胜客50买100元":            //10点
            // 11点 650 太早 750太慢 700太慢
            startTime = "09,59,59,700";
            targetViewText = "【活动编号】39703";
            break;
        case "海底捞50买100元":            //11点
            startTime = "10,59,59,700";
            targetViewText = "【活动编号】33739";
            break;
        case "必胜客80买100元":            //0点
            startTime = "23,59,59,700";
            targetViewText = "【活动编号】33748";
            break;
        case "青桔单车2.5买月卡":            //10点
            startTime = "09,59,59,700";
            targetViewText = "【活动编号】33819";
            break;
        case "饿了么1分买6元":            //10点
            startTime = "09,59,59,700";
            targetViewText = "【活动编号】34332";
            break;
        case "饿了么1分买10元":            //10点
            startTime = "09,59,59,700";
            targetViewText = "【活动编号】34331";
            break;
        case "肯德基10元吃套餐":            //10点
            startTime = "09,59,59,700";
            targetViewText = "【活动编号】34331";
            break;
    }

    let appName = "阳光惠生活";
    let timeArea = "北京时间";
    func.to_app(appName);
    // 等待进入指定页面
    while (!textContains(targetViewText).findOnce()) {
        toastLog("请跳转到券领取页面，直到提示  已到达等待页面");
        sleep(1000);
    }
    toastLog("已到达指定页面，等待");
    //   定位元素
    func.getTimeDiff(timeArea, startTime);
    let cnt = 0, loopBreak;
    while (1) {
        loopBreak = 75;
        func.sClick(className("android.view.View").text("确认购买").findOne());
        // 如果15秒内没找到就自动退出 200毫秒一次1秒5次，30秒 150次
        while (loopBreak >= 0) {
            // 如果点击了按钮说明没抢到，需要继续
            if (func.sClick(className("android.widget.Button").text("确定").findOnce())) {
                break;
            }
            loopBreak = loopBreak - 1;
            sleep(200)
        }
        if (loopBreak < 0) {
            continue;
        } else {
            break;
        }
    }
    toastLog("已点击，请确认结果");
    sleep(3000);
}

// 等待页面加载
function 交行9点5积分() {
    toastLog("等待页面变化");
    let appName = "买单吧";
    let timeArea = "北京时间";
    let startTime = "08,59,57,000"
    let actNames = ["加油卡充值30元红包", "缴费类15元红包", "话费20元红包", "话费10元红包", "本月2倍积分", "一键加油15元红包"];
    let actName = func.dialogsWin(actNames);      // 设置查找的文本
    func.to_app(appName);
    // 等待进入指定页面
    let get_packet, packet_parent, packet_childcount;
    textContains("本月可用兑换资格").findOne();
    toastLog("已到达指定页面");
    func.getTimeDiff(timeArea, startTime);              // 等待时间
    while (1) {
        get_packet = text(actName).findOnce();
        if (get_packet != null) {
            packet_parent = get_packet.parent().parent();
            packet_childcount = packet_parent.childCount();
            if (func.sClick(packet_parent.child(packet_childcount - 1))) {
                sleep(100);
            }
        }
        if (func.sClick(text("确定").findOnce())) {
            toastLog("已点击确定");
            break;
        }
    }
}


// 等待页面变价
function 中信活动() {
    let appName = "动卡空间";
    let timeArea = "北京时间";
    let startTime, targetViewText;
    let actNames = ["10点-15点-9积分兑换", "周三六11点-5折必胜客百果园", "9积分捡漏"];
    let actName = func.dialogsWin(actNames);      // 设置查找的文本
    let couDes, couClick;    // 券描述列表
    let nowDate = new Date();
    let item_page_text = "价格: 1个权益+9个积分";
    couDes = ["App Store", "迪士尼25", "必胜客20", "奈雪", "喜茶25元", "苏宁支付券", "京东支付券", "天猫20",
        "星巴克中杯饮品电子券", "名创优品20", "网易严选20", "百果园20", "美团外卖20", "优酷VIP", "腾讯视频", "芒果TV", "爱奇艺VIP"];
    switch (actName) {
        case "10点-15点-9积分兑换":
            toastLog("等待页面变化");
            // log(nowDate.getHours() <= 9);
            // 如果当前小时数 大于10，则是15点场
            if (nowDate.getHours() <= 9) {
                startTime = "09,59,50,000"
            } else {
                startTime = "14,59,50,000"
                couDes = ["【下午茶】喜茶25元抵用券（15点抢兑）"];
            }

            if (couDes.length == 1) {
                targetViewText = couDes[0];               // 设置查找的文本
            } else {
                targetViewText = func.dialogsWin(couDes);               // 设置查找的文本
            }

            func.to_app(appName);             // 启动APP
            couClick = null;          // 找券
            while (couClick == null) {
                if (couDes == "星巴克中杯饮品电子券") {
                    couClick = text(targetViewText).findOnce();          // 找券
                } else {
                    couClick = textContains(targetViewText).findOnce();          // 找券
                }
                toastLog("请跳转到券 列表 页面，直到提示  已到达等待页面");
                sleep(1000);
            }
            // toastLog("已到达等待页面，提前15秒自动进入");
            toastLog("元素文本：" + couClick.text());
            func.getTimeDiff(timeArea, startTime);              // 等待到15秒的时候再进入
            func.sClick(couClick);              // 点击标签
            text(item_page_text).findOne();             // 等待进入指定页面
            toastLog("已到达指定页面，等待");
            //点击元素
            let un_start, to_pay = null;
            un_start = text("未开始").findOne();
            let un_x, un_y;
            un_x = un_start.bounds().centerX();
            un_y = un_start.bounds().centerY();
            while (to_pay == null) {
                click(un_x, un_y);
                sleep(100);
                to_pay = text("去支付").findOnce();
            }
            func.sClick(to_pay);
            toastLog("已点击，等待验证码");
            sleep(3000);
            break;
        case "周三六11点-5折必胜客百果园":
            toastLog("到点点击");
            startTime = "10,59,59,850";             // 设置时间点
            couDes = ["必胜客100元代金券", "必胜客50元代金券", "达美乐50元代金券", "肯德基50元", "呷哺呷哺"];             // 券名称
            targetViewText = func.dialogsWin(couDes);               // 设置查找的文本
            func.to_app(appName);             // 启动APP
            // 等待进入指定页面
            couClick = textContains(targetViewText).findOnce();
            while (!couClick) {
                couClick = textContains(targetViewText).findOnce();
                toastLog("请跳转到券 列表 页面，直到提示  已到达等待页面");
            }
            toastLog("元素文本：" + couClick.text());
            func.getTimeDiff(timeArea, startTime);              // 等待时间
            func.sClick(couClick);             // 点击元素
            // 点击元素
            while (func.sClick(text("确认").findOnce()) == false) {
                func.sClick(className("Button").text("立即购买").findOnce());
                func.sClick(className("Button").text("已售罄").findOnce());
                sleep(100);
            }
            // func.sClick(text("确认").findOne());
            toastLog("已点击，请确认结果");
            sleep(3000);
            break;
        case "9积分捡漏":
            appName = "动卡空间"
            let cnt = 0;
            targetViewText = func.dialogsWin(couDes);               // 设置查找的文本
            func.to_app(appName);             // 启动APP
            while (text(item_page_text).findOnce() == null) {
                sleep(100);
                cnt = cnt + 1;
                if (cnt >= 25) {
                    cnt = 0;
                    toastLog("请手动切换到要捡漏的商品页面");
                }
            }             // 等待进入指定页面
            sleep(300);
            nowDate = new Date();

            if (nowDate.getHours() <= 10) {
                startTime = "10,18,20,000"
            } else if (nowDate.getHours() >= 15) {
                startTime = "15,18,20,000"
            } else {
                startTime = "00,01,01,100"
            }
            toastLog("18分启动.....");
            func.getTimeDiff(timeArea, startTime);              // 等待时间
            let exWhile = false;
            // 门店查找方式
            if (text("适用门店").findOnce() != null) {
                while (1) {
                    if (func.sClick(text("去兑换").findOnce())) {
                        func.sClick(text("去支付").findOne());
                        while (1) {
                            if (text("适用门店").findOnce() != null) {
                                exWhile = false
                                break;
                            }
                            if (text("交易时间").findOnce() != null) {
                                exWhile = true
                                break;
                            }
                        }
                        if (exWhile) { break; }
                    }
                    if (func.sClick(text("适用门店").findOnce())) {
                        className("EditText").depth(14).findOne();
                        back();
                        sleep(400);
                    }
                    sleep(150);
                }
            } else {
                let item = null;
                // 无门店查找
                while (1) {
                    if (func.sClick(text("去兑换").findOnce())) {
                        func.sClick(text("去支付").findOne());
                        while (1) {
                            if (text("适用门店").findOnce() != null) {
                                exWhile = false
                                break;
                            }
                            if (text("交易时间").findOnce() != null) {
                                exWhile = true
                                break;
                            }
                        }
                        if (exWhile) { break; }
                    } else {
                        back();
                        item = textContains(targetViewText).depth(17).findOnce();
                        cnt = 0;
                        while (item == null) {
                            item = textContains(targetViewText).depth(17).findOnce();
                            sleep(50);
                            scrollDown(0);
                            cnt = cnt + 1;
                            // 滑动3次就手动滑动一次
                            if (cnt >= 3) {
                                swipe(500, 850, 500, 600, 100);
                                cnt = 0;
                            }
                            sleep(50);
                            func.sClick(text("点击查看更多").findOnce());
                            sleep(50);
                        }
                        func.sClick(item);
                        text(item_page_text).findOne();
                    }
                    sleep(150);
                }
            }
    }
}

// 等待页面变价
function 京东腾讯月() {
    let actNames = ["腾讯视频VIP月卡"]; //, "肯德基10元代金券"];
    //let actName = func.dialogsWin(actNames);      // 设置查找的文本
    toastLog("等待页面变化");
    let appName = "京东金融";
    func.to_app(appName);
    let tVip, getBtn;
    // 等待进入指定页面
    toastLog("请跳转到腾讯月卡领取页面，直到提示  已到达等待页面");
    sleep(800);
    className("android.view.View").text(actName).findOne();
    toastLog("已到达指定页面，等待");

    while (1) {
        try {
            tVip = className("android.view.View").text(actName).findOnce();
            // 找到领取按钮
            getBtn = tVip.parent().child(4).child(0);
            if (getBtn != null) {
                if (getBtn.text() == "立即领取" || getBtn.desc() == "立即领取") {
                    func.sClick(getBtn);
                    sleep(300);
                    func.sClick(getBtn);
                    sleep(300);
                    func.sClick(getBtn);
                    toastLog("结束,已点击！");
                    sleep(800);
                    break;
                }
            }
        } catch (e) {
            continue;
        }
    }
}

function 工行活动() {
    let appName = "工银e生活";
    let timeArea = "北京时间";
    let startTime = "10,29,59,680";
    couName = "确定"
    func.to_app(appName);             // 启动APP
    // 找到使用流程，且找到对应券名称沃尔玛的情况下就是 券的详情页
    while (!(text("安全验证").findOnce())) {
        toastLog("请进入活动页面，直到提示  已到达等待页面");
        sleep(333);
    }
    let sureBtn = className("android.widget.Button").text(couName).findOne();
    toastLog("已到达指定页面，等待");
    func.getTimeDiff(timeArea, startTime);              // 等待时间
    // 等待点击立即购买
    func.sClick(sureBtn);
    toastLog("已点击，请确认结果");
    sleep(3000);
}