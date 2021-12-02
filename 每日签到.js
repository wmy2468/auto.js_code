auto.waitFor();
var func = require("func_list.js");
var devModel = device.model;;

main();

function main() {
    var devMate30, devHonor8, devRedMi;
    devMate30 = "TAS-AL00";
    devHonor8 = "FRD-AL00";
    devRedMi = "Redmi Note 7";
    // 中行缤纷生活() 邮储银行() 邮储信用卡() 华彩生活() 招商银行()
    if (devModel == devMate30) {
        龙支付签到();
        浦发银行();
        中国农业银行();
        什么值得买();
        jd_sign();
        YunShaofu();
        浦发信用卡();
        买单吧();
        招商便民();
        工商();
    } else if (devModel == devHonor8) {
        YunShaofu();
        jd_sign();
        招商便民();
    } else if (devModel == devRedMi) {
        YunShaofu();
        jd_sign();
        招商便民();
        工商();
    }
    alert("已完成.");
}

// ======================签到代码==================================

function 龙支付签到() {
    var url_ccb签到 = "ccbapp://utils?ccbEncodeParam=i8zHyJJS9cmdvTjpr9t8IEmOi6ozP%2BL52wT%2FCvKg7NBYCqAQkkQwpI4zm1bqcufOp4g2WYGlsm42e1bYhPjbRdSpUin%2FXtlXYWe%2FBCBYefhb6XhldPcF3rJAW0s3%2BQAe9Z3OmzkJqCS27g7X8Vf9rBiX%2F%2FPdYwgpO5WYEHRNlrCoXPVKsMXUJh2Kq0M%3D"

    app.startActivity({
        action: "android.intent.action.VIEW",
        data: url_ccb签到,
    });
    while (text("今日已签到").findOnce() == null) {
        func.sClick(text("立即签到").findOnce());
        sleep(3000);
    }
    toastLog("龙支付, 已签到");
    sleep(2000);
}

function 工商() {
    var appName = "中国工商银行";
    //closeApp(appName);
    func.toAutojs();

    var url_工行小象 = "com.icbc.androidclient://startType=PORTALINJECT&menuId=xiaoxiangleyuan&shareCurrentUUID=";
    // 启动小象
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: url_工行小象,
    });

    while (textContains("你已经陪小象").findOnce() == null) {
        if (text("请输入手势密码登录").findOnce()) {
            toastLog("已找到手势密码按钮");
            sleep(500);
            func.gesture_pwd(appName);
            sleep(1000);
        }
    }
    sleep(2000);
    // 点击香蕉
    // 点击任务
    var left_banana, mission_btn;
    left_banana = textStartsWith("剩余").findOne();
    sleep(1000);
    // 查找并点击香蕉
    var bananas;
    bananas = className("ListView").rowCount(5).findOnce();
    if (bananas != null) {
        for (var i = bananas.childCount() - 1; i >= 0; i--) {
            // 点击喂小象
            func.cClick(left_banana);
            sleep(1000);
            // 点击香蕉
            func.cClick(bananas.child(i));
            sleep(1000);
        }
    }
    mission_btn = left_banana.parent().parent().child(0).child(2);
    func.sClick(mission_btn);
    sleep(800);
    func.sClick(text("进入任务中心查看更多任务").findOne());
    sleep(800);
    text("任务中心").findOne();
    toastLog("已到达任务中心");
    sleep(2000);
    if (textStartsWith("sign_done").findOnce() == null) {
        func.sClick(textStartsWith("sign").findOnce());
    } else {
        toastLog("今日已签到");
        sleep(3000);
    }
}


function 招商便民() {
    func.toAutojs();
    var appName = "招商银行";
    var url_招商便民 = "cmbmobilebank://cmbls/functionjump?action=gocorpno&corpno=791166&cmb_app_trans_parms_start=here&channel=share&appflag=0";
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: url_招商便民,
    });
    // 等待手势密码加载
    id("vGestureContentView").findOne();
    sleep(500);
    func.gesture_pwd(appName);
    sleep(2000);
    var my_energy, get_energy;
    while (text("查询我的公积金").findOnce() == null) {
        my_energy = text("我的能量：").findOnce();
        if (my_energy != null) {
            get_energy = my_energy.parent().parent().child(2);
            sleep(1200);
            func.sClick(get_energy);
        }
        sleep(2000);
    }
    sleep(2000);
    var plus30, plus_parent, plus_parent_childcount;
    var sign_btn, sign_text;

    plus30 = text("+30").depth(14).findOne();
    plus_parent = plus30.parent().parent();
    plus_parent_childcount = plus_parent.childCount();
    sign_btn = plus_parent.child(plus_parent_childcount - 1);
    sleep(1200);
    if (sign_btn.childCount() != 0) {
        sign_text = sign_btn.child(0).text();
        if (sign_text == "去签到") {
            func.sClick(sign_btn);          // 点击签到
            while (text("服务大厅").findOnce() == null) {
                toast("已点击，等待服务大厅加载");
                sleep(2500);
            }
            toast("服务大厅 已加载");
            sleep(3000);
            back();
            toast("返回，等待领取");
            while (sign_text == "去签到") {
                plus30 = text("+30").depth(14).findOnce();
                if (plus30 != null) {
                    plus_parent = plus30.parent().parent();
                    plus_parent_childcount = plus_parent.childCount();
                    sign_btn = plus_parent.child(plus_parent_childcount - 1);
                    sign_text = sign_btn.child(0).text();
                }
                sleep(1000);
            }
            func.sClick(sign_btn);      // 点击领取
            toast("已点击领取");
            sleep(2000);
        }
    }
    toastLog(appName + ", 已签到");
    sleep(2000);
}


// 中行缤纷生活
function 中行缤纷生活() {
    // test3
    var appName = "缤纷生活";
    //closeApp(appName);
    func.toApp(appName);
    while (text("我的").findOnce() == null) {
        func.passAd();
    }
    sleep(1000);
    while (text("登录手机号更改").findOnce() == null) {
        func.sClick(text("我的").findOnce());
        sleep(1000);
    }
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
        sleep(1000);
        if (textContains("手势登录密码").findOnce() != null) {
            sleep(500);
            func.gesture_pwd(appName);
            sleep(1000);
        }
    }
    sleep(2500);
    text("查看活力奖励>").findOne();

    var currentWeekday = new Date().getDay();
    // 0 返回的周日 周一返回1，周二2
    if (currentWeekday == 0) {
        currentWeekday = 6
    } else {
        currentWeekday = currentWeekday - 1
    }
    var signFlag, idx, weekdayText, signCnt;
    signCnt = 0;

    while (true) {
        try {
            signFlag = textContains("连续签到").findOnce();
            if (signFlag == null) {
                signCnt = signCnt + 1;
            }
            // 如果查找连续签到超过5次没找到则退出，避免周日找不到的情况
            if (signCnt > 5) {
                break;
            }
            idx = signFlag.indexInParent();
            weekdayText = signFlag.parent().child(idx + 1).child(0).child(currentWeekday).child(0).text();
            //toastLog("weekdayText:" + weekdayText);
            if (weekdayText == "") {
                break;
            } else {
                func.cClick(signFlag.parent().child(idx + 2));
                sleep(3000);
                textContains("每周连续签到7天可获得翻倍").findOne();
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

// 农行小豆
function 中国农业银行() {
    var appName = "中国农业银行";
    //closeApp(appName);
    func.toAutojs();
    var url_农行小豆 = "bankabc://%7B%22method%22%3A%22jumpToSharedProduct%22%2C%22param%22%3A%22rR4uOmAzpF49gqwDYQiLp20AltfnLciJg3Fyp5ijEIlD6KSfPdLMNyKsM8JboO6MwU4dRe9KEsPXqC4shEX19X6hEiWyiILqbgLFXv9xJ5Jc7WP8cgtQBKyWQwTlznpR47%2BlnPSHUcgGQwprcCrZljQQsb3H9RhiJ2D2qeBt4JJz84Yh2iQ9R1lu%2FY%2BWKtaP25m0LbNLiCBYzuVXpAI%2BZfQKjVDNu72M0bgLPJtM1yg7oAXVGsadNuQMbKRz0XWTmkZzKVNYYupr4XqG08l6VvoOh1qETuzMO5mSCup%2FrhpJbwn4v5yYWC68q2FmK6K8YXpHZRtZyVIQwKrZKYjGCZ%2BdeHNIQKJe2plRNjawvy1QfB%2FYEIxcT68HT63j3KJK0%2FxlZSrAvT9cbSKRHkxleVMdKn8uj8HVMWs8l1DMdrLJK0tNFerEfKnSptOj4bSiQ6kvE4M2fMWrUzVIDPYLCHe2xvp9kZOZufXgyE5wze30A6S1HhYbMbNNCql08lmP0wQ3l%2Fp8fBF6hmgoQ73vZPphwCEOQxonP7IzQJC9%2Bl03cbmmPDij%2BBHrrczU55456whyF167TTNstajIJ4rERfcYdlkv3VOQEaXo%2BsUUrdXbI6wjb9vErff5hUgaW2%2FMl%2FZjNZthSCybk58RIUT3ndyGTtBSg%2B3hP4C4%2FvzRl3TXL0yiIELKVkzrELbYENRqWib%2B5aGXN1a54ll48VdKQiJFSZhEfYp27AW49Qxe7epmorgOuUBd76FZwMZCR%2Bg1QRnSS21%2F0PRVHSvWj3BDeST7nIue51s83rsZb9rkrE52ADZNwBV5mFrcRYyQoaKe%22%7D"

    app.startActivity({
        action: "android.intent.action.VIEW",
        data: url_农行小豆,
    });
    //toastLog("我的已点击");
    while (textContains("小豆订单").findOnce() == null) {
        if (text("切换登录方式").findOnce() != null) {
            //toastLog("滑动手势");
            sleep(500);
            func.gesture_pwd(appName);
            sleep(2000);
        }
    }
    //toastLog("找签到");
    while (text("已经签到").findOnce() == null) {
        if (func.sClick(text("收起").findOnce())) { sleep(1200); }
        if (func.sClick(text("签到有礼").findOnce())) { sleep(1200); }
        if (func.sClick(text("签到得豆").findOnce())) { sleep(1200); }
    }
    toastLog(appName + "已签到");
    sleep(1000);
}

// 邮储银行
function 邮储银行() {
    var appName = "邮储银行";
    //closeApp(appName);
    func.toApp(appName);
    while (className("RadioButton").text("我的").findOnce() == null) {
        func.passAd();
    }
    sleep(1000);
    func.sClick(text("我的").findOnce());
    // 签到按钮
    //toastLog("我的已点击");
    while (textContains("上次登录").findOnce() == null) {
        if (text("忘记手势").findOnce() != null) {
            //toastLog("滑动手势");
            sleep(500);
            func.gesture_pwd(appName);
            sleep(1000);
        }
    }
    //toastLog("找签到");
    while (text("已签到").findOnce() == null) {
        func.sClick(id("tvName").text("签到有礼").findOnce());
        sleep(1200);
        func.sClick(text("签 到").findOnce());
        sleep(1200);
    }
    toastLog(appName + "已签到");
    sleep(1000);
}

// 浦发金豆签到
function 浦发银行() {
    var appName = "浦发银行";
    //closeApp(appName);
    func.toAutojs();
    var url_浦发储蓄卡金豆页面 = "spdbbank://wap.spdb.com.cn/awakeapp?login_flag=0&support_type=1&path=vue|mspmk-cli-welfare/goldenBean&APP_VERSION=@appVersion&from=shouye&login_flag=0&support_type=1";
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: url_浦发储蓄卡金豆页面,
    });

    while (!(text("切换登录方式").findOnce() || text("更多快捷方式登录").findOnce())) {
        toastLog("等待登录窗口加载");
        sleep(2000);
    }
    sleep(500);
    func.gesture_pwd(appName);
    sleep(1000);
    text("做任务领取海量金豆").findOne();
    sleep(2000);
    textContains("+").findOne();
    sleep(800);
    var signs = textContains("+").find();
    try {
        for (var i = 0; i < signs.length; i++) {
            func.sClick(signs[i]);
        }
    }
    catch (e) {
        toastLog("未找到多余的连续签到");
        sleep(2000);
    }
    toastLog(appName + "已签到");
    sleep(3000);
}

function jd_sign() {
    func.toApp("京东");
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
    // textContains("购物返豆").findOne();
    // sleep(800);

    while (textContains("已连").findOnce() == null) {
        if (func.cClick(text("签到领京豆").findOnce())) {
            toastLog("已点击 签到领京豆");
            sleep(2000);
        }
        if (text("签到日历").findOnce() != null) {
            sleep(2000);
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
    var signBtn;
    signBtn = text("签到领奖励").findOnce();
    // }

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

// 买单吧
function 买单吧() {
    var appName = "买单吧";
    //closeApp(appName);
    func.toApp(appName);
    while (className("TextView").id("tv_title").text("我的").findOnce() == null) {
        func.passAd();
        func.sClick(id("ivADClose").findOnce());
    }
    func.sClick(text("我的").findOne().parent().parent().parent().parent().child(2));
    text("羊毛资讯").findOne();
    sleep(1000);
    // 任意一个找到就退出循环
    while (!(textContains("客官明天再来哟").findOnce() != null || textContains("今日已签到").findOnce() != null)) {
        func.sClick(id("com.bankcomm.maidanba:id/iv_signin").findOnce());
        func.sClick(text("立即签到").findOnce());
        sleep(1000);
        func.sClick(id("com.bankcomm.maidanba:id/bt_welfare_lottery").text("去抽奖").findOnce());
        if (text("手势登录").findOnce() != null) {
            sleep(500);
            func.gesture_pwd(appName);
            sleep(1000);
        }
        // 点击完成按钮
        func.sClick(id("com.bankcomm.maidanba:id/bt_ws_lottery_close").findOnce());
    }
    toastLog(appName + "已签到");
    sleep(1000);
}

// 浦发
function 浦发信用卡() {
    var appName = "浦大喜奔";
    //closeApp(appName);
    func.toApp(appName);
    while (text("我的").findOnce() == null) {
        func.passAd();
        func.sClick(idContains("close").findOnce());
    }
    func.sClick(text("我的").findOne());
    // 等待我的页面加载
    text("我的订单").findOne();
    while (text("签到").findOnce() == null) {
        func.toAutojs();
        func.toApp(appName);
        sleep(3000);
    }
    while (textContains("手势密码").findOnce() == null) {
        func.sClick(text("签到").findOne());
        sleep(2000);
    }
    sleep(1000);
    func.gesture_pwd(appName);
    sleep(1000);
    // 等待签到页面加载
    text("天天领福利").findOne();
    sleep(1000);
    if (text("已签到").findOnce() == null) {
        var waitSign = text("立即签到").findOne();
        sleep(1000);
        // func.sClick(waitSign.parent().parent().parent().parent().child(4));
        func.sClick(waitSign);
    }
    toastLog(appName + "已签到");
    sleep(1000);
}

// 邮储信用卡
function 邮储信用卡() {
    var appName = "邮储信用卡";
    func.toApp(appName);
    while (text("我的").findOnce() == null) {
        func.passAd();
        func.sClick(text("确认").findOnce());
        var Continue = className("TextView").text("继续使用").findOnce();
        if (Continue != null) {
            func.sClick(Continue);
        }
    }
    sleep(800);
    func.sClick(text("我的").findOnce());
    sleep(800);
    // 等待我的页面加载
    sleep(800);
    func.sClick(text("签到有礼").findOne());
    while (!(text("明天再来哦").findOnce() != null || textContains("恭喜获得").findOnce() != null)) {
        func.sClick(text("立即签到").findOnce());
        sleep(800);
        if (text("忘记手势密码").findOnce() != null) {
            sleep(500);
            func.gesture_pwd(appName);
            sleep(1000);
        }
    }
    toastLog(appName + "已签到");
    sleep(1000);
}


// 华彩生活
function 华彩生活() {
    var appName = "华彩生活";
    //closeApp(appName);
    func.toApp(appName);
    while (text("我的").findOnce() == null) {
        func.passAd();
    }
    sleep(1000);
    func.sClick(text("我的").findOnce());
    // 等待我的页面加载
    text("自动还款").findOne();
    // 签到按钮
    while (id("iv_sign").findOnce() == null) {
        func.toAutojs();
        func.toApp(appName);
        sleep(3000);
    }
    sleep(800);
    func.sClick(id("iv_sign").findOnce());

    while (textContains("恭喜您获得").findOnce() == null && text("今日已签").findOnce() == null) {
        func.sClick(text("连续签到抽大奖").findOnce());
        sleep(800);
        if (text("请输入手势密码").findOnce() != null) {
            sleep(500);
            func.gesture_pwd(appName);
            sleep(1000);
        }
    }
    toastLog(appName + "已签到");
    sleep(1000);
}

function YunShaofu() {
    var appName = "com.unionpay";
    //closeApp(appName);
    func.toPackage(appName);
    while (className("TextView").text("我的").findOnce() == null) {
        if (textContains("跳过").findOnce() != null || descContains("跳过").findOnce() != null) {
            sleep(800);
            continue;
        }
        sleep(1000);
    }
    sleep(1500);
    func.sClick(className("TextView").text("首页").findOnce());
    //点击签到按钮
    func.sClick(id("com.unionpay:id/frog_float").findOne());
    // 等待签到页面加载
    textContains("连续签到").findOne();

    if (text("今日已签到").findOnce() == null) {
        func.sClick(text("立即签到").findOnce());
        sleep(1500);
    }
    toastLog(appName + "已签到");
    sleep(1000);
}

function 工银e生活() {
    var appName = "工银e生活";
    //closeApp(appName);
    func.toApp(appName);
    while (id("radio_button1").text("生活").findOnce() == null) {
        func.passAd();
    }
    func.sClick(id("radio_button1").text("生活").findOne());
    // 点击输入框
    func.sClick(text("扫一扫").findOne().parent().child(1));
    // 商城
    id("tv_title").text("历史搜索").findOne();
    sleep(1000);
    func.sClick(className("TextView").id("tv_name").text("购物日").findOne());
    sleep(1000);
    id("tv_title").text("特色活动").findOne();
    sleep(1000);
    // 第二个商城
    func.sClick(id("tv_name").text("购物日").findOne());
    sleep(800);
    text("点击签到").findOne();
    sleep(2000);
    func.sClick(text("点击签到").findOnce());

    toastLog(appName + "已签到");
    sleep(1000);
}

function 什么值得买() {
    var appName = "什么值得买";
    func.toApp(appName);
    var signBtn = null;
    while (signBtn == null) {
        signBtn = id("tv_login_sign").findOnce();
        func.sClick(id("tab_usercenter").text("我的").findOnce());
        sleep(800);
        func.sClick(id("dialog_home_ads_close").findOnce());
        sleep(800);
        func.passAd();
    }
    sleep(800);
    func.sClick(signBtn);
    sleep(1000);
    //textContains("已连续签到").findOne();
    toastLog(appName + "已签到");
    sleep(1200);
}