auto.waitFor();
var func = require("func_list.js");
var cfg = func.config_dict();
var devModel = device.model;;
var devMate30, devHonor8, devRedMi;
devMate30 = "TAS-AL00";
devHonor8 = "FRD-AL00";
devRedMi = "Redmi Note 7";

main();

function main() {
    // 中行缤纷生活() 邮储银行() 邮储信用卡() 华彩生活() 招商银行()
    zs = 招商();
    ysf = 云闪付();
    jd = 京东();
    if (devModel == devMate30) {
        龙支付签到();
        沃钱包();
        浦发银行();
        中国农业银行();
        什么值得买();
        jd.jd_sign();
        jd.陪伴签到();
        ysf.签到();
        ysf.领积点();
        浦发信用卡();
        买单吧();
        zs.便民生活();
        zs.饭票签到();
        工商();
    } else if (devModel == devHonor8) {
        ysf.签到();
        ysf.领积点();
        jd.jd_sign();
        jd.陪伴签到();
        zs.便民生活();
        zs.饭票签到();
    } else if (devModel == devRedMi) {
        ysf.签到();
        ysf.领积点();
        jd.jd_sign();
        jd.陪伴签到();
        zs.便民生活();
        zs.饭票签到();
        工商();
    }
    alert("已完成.");
}

// ======================签到代码==================================
function 龙支付签到() {
    func.to_scheme(cfg["url_scheme"]["建行"]["lzf签到"]);
    text("今天").findOne();
    while (text("今日已签到").findOnce() == null) {
        if (func.sClick(text("立即签到").findOnce())) {
            sleep(3000);
        }
    }
    toast("LZF已签到");
    sleep(3000);
}

function 云闪付() {
    this.领积点 = function () {
        func.to_scheme(cfg["url_scheme"]["云闪付"]["会员中心"]);
        while (!(text("我的积点").findOnce() != null &&
            text("积点乐园").findOnce() != null)) {
            sleep(3000);
        }
        toastLog("已到达领取页面，等待...");
        sleep(5000);
        func.sClick(text("全部收取").findOnce());
        toastLog("云闪付, 已领取积点");
        sleep(2000);
    }

    this.签到 = function () {
        let appName = "云闪付";
        //closeApp(appName);
        func.to_app(appName);
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
    return this;
}


function 沃钱包() {
    let appName = "沃钱包";
    func.to_app(appName);
    let paopao, wode;
    while (textContains("第3天").textStartsWith("+").findOnce() == null) {
        wode = idContains("wopay_main_mine_tv").text("我的").findOnce();
        if (wode != null) { wode.parent().click(); }
        paopao = idContains("wopay_mine_item_name_tv").text("泡泡").findOnce();
        if (paopao != null) { paopao.parent().click(); }
        func.sClick(text("每日签到得好礼").findOnce());
    }
    sleep(3500);
    if (textContains("今日已签到").findOnce() == null) {
        func.sClick(textContains("签到领奖励").findOne());
        sleep(2500);
    }
    toastLog(appName + ",已签到");
    sleep(2000);
}

function 工商() {
    let appName = "中国工商银行";
    //closeApp(appName);
    func.to_scheme(cfg["url_scheme"]["工商"]["小象乐园"]);

    while (textContains("你已经陪小象").findOnce() == null) {
        if (text("请输入手势密码登录").findOnce()) {
            toastLog("已找到手势密码按钮");
            sleep(500);
            func.gesture_pwd(appName);
            sleep(1500);
            func.to_scheme(cfg["url_scheme"]["工商"]["小象乐园"]);
        }
    }
    sleep(2000);
    // 点击香蕉
    // 点击任务
    let left_banana, mission_btn;
    left_banana = textStartsWith("剩余").findOne();
    sleep(1000);
    // 查找并点击香蕉
    let bananas;
    bananas = className("ListView").rowCount(5).findOnce();
    if (bananas != null) {
        for (let i = bananas.childCount() - 1; i >= 0; i--) {
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

function 招商() {
    this.饭票签到 = function () {
        func.to_scheme(cfg["url_scheme"]["招商"]["饭票签到"]);
        let congratulation, getAir, item_parent, today = null;
        while (today == null) {
            congratulation = textContains("恭喜您在").findOnce();
            if (congratulation != null) {
                item_parent = congratulation.parent().parent().parent();
                func.sClick(item_parent.child(item_parent.childCount() - 1));
                sleep(1000);
            }
            getAir = textContains("很遗憾抽中了空气").findOnce();
            if (getAir != null) {
                item_parent = getAir.parent().parent().parent();
                func.sClick(item_parent.child(item_parent.childCount() - 1));
                sleep(1000);
            }

            today = text("今日").depth(12).findOnce();
            sleep(1000);
        }
        sleep(1500);
        func.sClick(today.parent().parent().child(1));
        toast("已点击打卡领饭票,等待5s");
        sleep(5000);
        // 判断如果还在饭票页面则说明 已经打过卡
        if (text("每周一到周五打卡浏览指定页面，打卡当天可获得一次抽奖机会").findOnce() == null) {
            back();
        }
        toast("今日已打卡");
        sleep(3000);
    }
    this.便民生活 = function () {
        let appName = "招商银行";
        func.to_scheme(cfg["url_scheme"]["招商"]["便民生活"]);
        // 等待手势密码加载
        id("vGestureContentView").findOne();
        sleep(500);
        func.gesture_pwd(appName);
        sleep(2000);
        let my_energy, get_energy;
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
        let plus30, plus_parent, plus_parent_childcount;
        let sign_btn, sign_text;

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
        toastLog("便民生活, 已签到");
        sleep(3000);
    }
    return this;
}

// 中行缤纷生活
function 中行缤纷生活() {
    // test3
    let appName = "缤纷生活";
    //closeApp(appName);
    func.to_app(appName);
    while (text("我的").findOnce() == null) {
        func.passAd();
    }
    sleep(1000);
    while (text("登录手机号更改").findOnce() == null) {
        func.sClick(text("我的").findOnce());
        sleep(1000);
    }
    // 签到按钮
    let signBtnId = "imgRight";
    while (id(signBtnId).findOnce() == null) {
        func.to_autojs();
        func.to_app(appName);
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

    let currentWeekday = new Date().getDay();
    // 0 返回的周日 周一返回1，周二2
    if (currentWeekday == 0) {
        currentWeekday = 6
    } else {
        currentWeekday = currentWeekday - 1
    }
    let signFlag, idx, weekdayText, signCnt;
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
    let appName = "中国农业银行";
    //closeApp(appName);
    func.to_scheme(cfg["url_scheme"]["农行"]["小豆"]);
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
    if (func.sClick(text("已经签到").findOnce())) { sleep(1200); }
    toastLog(appName + "已签到");
    sleep(1000);
}

// 邮储银行
function 邮储银行() {
    let appName = "邮储银行";
    //closeApp(appName);
    func.to_app(appName);
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
    let appName = "浦发银行";
    //closeApp(appName);
    func.to_scheme(cfg["url_scheme"]["浦发"]["金豆"]);

    while (!(text("切换登录方式").findOnce() || text("更多快捷方式登录").findOnce())) {
        toastLog("等待登录窗口加载");
        sleep(2000);
    }
    sleep(500);
    func.gesture_pwd(appName);
    sleep(1000);
    text("开启签到提醒").findOne();
    // 当签到0天 表示未加载完成
    while (text("已连续签到0天").findOnce() != null) {
        sleep(1000);
    }
    sleep(2000);
    textContains("+").findOne();
    sleep(800);
    let signs = textContains("+").find();
    try {
        for (let i = 0; i < signs.length; i++) {
            if (signs[i].text().length <= 10) {
                func.sClick(signs[i]);
            }
        }
    }
    catch (e) {
        toastLog("未找到多余的连续签到");
        sleep(2000);
    }
    toastLog(appName + "已签到");
    sleep(3000);
}

function 京东() {
    this.jd_sign = function () {
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
        let getBeans = text("领京豆").findOne();
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
        let getCon = text("领券").findOne();
        func.sClick(getCon.parent());

        while (className("ImageView").desc("领券中心").findOnce() == null) {
            // let closeBtn = id("com.jd.lib.coupon.feature:id/db").findOnce();
            // if (closeBtn != null) {
            //     func.sClick(closeBtn.parent().child(1));
            // }
            sleep(800);
        }
        sleep(1200);
        let signBtn;
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
    this.陪伴签到 = function () {
        let signed, unsign, txt1, txt2;
        txt1 = "陪伴频道签到赚京豆";
        txt2 = "活动规则";
        signed = "今日已签";
        unsign = "签到";
        func.to_scheme(cfg["url_scheme"]["京东"]["陪伴计划"]);
        while (!(text(txt1).findOnce() != null && text(txt2).findOnce() != null)) {
            sleep(800);
        }
        sleep(3500);
        if (text(signed).findOnce() == null) {
            func.sClick(text(unsign).findOnce());
        }
        toastLog("已签到");
        sleep(3000);
    }
    return this;
}

// 买单吧
function 买单吧() {
    let appName = "买单吧";
    //closeApp(appName);
    func.to_app(appName);
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
    let appName = "浦大喜奔";
    //closeApp(appName);
    func.to_app(appName);
    while (text("我的").findOnce() == null) {
        func.passAd();
        func.sClick(idContains("close").findOnce());
    }
    func.sClick(text("我的").findOne());
    // 等待我的页面加载
    text("我的订单").findOne();
    while (text("签到").findOnce() == null) {
        func.to_autojs();
        func.to_app(appName);
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
        let waitSign = text("立即签到").findOne();
        sleep(1000);
        // func.sClick(waitSign.parent().parent().parent().parent().child(4));
        func.sClick(waitSign);
    }
    toastLog(appName + "已签到");
    sleep(1000);
}

// 邮储信用卡
function 邮储信用卡() {
    let appName = "邮储信用卡";
    func.to_app(appName);
    while (text("我的").findOnce() == null) {
        func.passAd();
        func.sClick(text("确认").findOnce());
        let Continue = className("TextView").text("继续使用").findOnce();
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
    let appName = "华彩生活";
    //closeApp(appName);
    func.to_app(appName);
    while (text("我的").findOnce() == null) {
        func.passAd();
    }
    sleep(1000);
    func.sClick(text("我的").findOnce());
    // 等待我的页面加载
    text("自动还款").findOne();
    // 签到按钮
    while (id("iv_sign").findOnce() == null) {
        func.to_autojs();
        func.to_app(appName);
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

function 工银e生活() {
    let appName = "工银e生活";
    //closeApp(appName);
    func.to_app(appName);
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
    let appName = "什么值得买";
    func.to_app(appName);
    let signBtn = null;
    while (signBtn == null) {
        signBtn = id("tv_login_sign").findOnce();
        func.sClick(id("tab_usercenter").text("我的").findOnce());
        sleep(800);
        func.sClick(idContains("close").findOnce());
        sleep(800);
        //func.passAd();
    }
    sleep(800);
    func.sClick(signBtn);
    sleep(1000);
    //textContains("已连续签到").findOne();
    toastLog(appName + "已签到");
    sleep(1200);
}