auto.waitFor();
// 导入模块
var func = require("func_list.js");

main();

function main() {
    var selectedArr = [
        "光大活动",
        "中信活动",
        "工行活动",
        // "交行9点5积分",
        // "京东腾讯月",
        "京东",
        "掌上生活",
        "农行缴费20-10"
    ];

    //---------------配置区域-----------------
    var scriptName = func.dialogsWin(selectedArr);      // 设置查找的文本        
    // 设置屏幕常亮6分钟
    device.keepScreenOn(1000 * 60 * 6);
    switch (scriptName) {
        case "光大活动":
            光大活动();
            break;
        case "中信活动":
            中信活动();
            break;
        case "工行活动":
            工行活动();
            break;
        case "掌上生活":
            掌上生活活动();
            break;
        case "交行9点5积分":
            交行9点5积分();
            break;
        case "京东腾讯月":
            京东腾讯月();
            break;
        case "农行缴费20-10":
            农行缴费();
            break;
        case "京东":
            京东();
    }
    toastLog("结束");
    device.cancelKeepingAwake();
}
// ------------------------------------------------------
function 京东() {
    var appName;
    var timeArea = "北京时间";
    var startTime, targetViewText;
    var actNames = ["京喜整点沃尔玛"];
    var actName = func.dialogsWin(actNames);      // 设置查找的文本
    var actWay, actWays;
    switch (actName) {
        // 10点
        case "京喜整点沃尔玛":
            actWays = ["直接领券", "下单自动领券"];
            actWay = func.dialogsWin(actWays);      // 设置查找的文本
            appName = "京喜";
            targetViewText = "沃尔玛电子卡"
            startTime = (new Date()).getHours() + ",59,59,800";
            func.toApp(appName);             // 启动APP
            // 等待进入指定页面
            var couClick = textContains(targetViewText).findOnce();
            while (couClick == null) {
                couClick = textContains(targetViewText).findOnce();
                func.sClick(text("购物车").findOnce());
                toastLog("请跳转到 京喜 购物车 页面，直到提示 已到达等待页面");
                sleep(1000);
            }
            toastLog("元素文本：" + couClick.text());
            func.getTimeDiff(timeArea, startTime);              // 等待时间
            func.sClick(couClick);             // 点击元素
            switch (actWay) {
                case "直接领券":
                    // 第一种领券方式
                    func.sClick(text("10元补贴券").findOne());
                    if (func.sClick(id("com.jd.pingou.newmodule.feature:id/btn_lingqu").text("领取").findOne())) {
                        toastLog("已点击领取");
                    }
                    break;
                case "下单自动领券":
                    // 第二种领券
                    func.sClick(text("领券参团").findOne());
                    textContains("购买时会自动领取并使用").findOne();
                    if (func.sClick(id("com.jd.pingou.newmodule.feature:id/bt_confirm").text("领券参团").findOne())) {
                        toastLog("购买时自动领取");
                    }
                    break;
            }
            sleep(3000);
            break;
    }
}


function 农行缴费() {
    var startTime, targetViewText;
    var appName = "云闪付";
    var timeArea = "北京时间";
    toastLog("到点点击");
    startTime = "09,59,59,700";
    targetViewText = "[6179]";
    func.toApp(appName);
    // 等待进入指定页面
    var card = textContains(targetViewText).findOnce();
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
    var startTime, targetViewText;
    var actNames = ["周三五折", "10点拼团星巴克"];
    var actName = func.dialogsWin(actNames);      // 设置查找的文本
    var appName = "掌上生活";
    var timeArea = "北京时间";
    var cnt = 3;
    switch (actName) {
        // 10点
        case "周三五折":            //10点
            toastLog("提前5秒进入");
            startTime = "09,59,55,000";
            targetViewText = func.dialogsWin(["（周三5折）喜茶20元代金券",
                "（周三5折）必胜客50元代金券",
                "（周三5折）肯德基20元全场通兑代金券"]);
            func.toApp(appName);
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
            func.toApp(appName);
            // 等待进入指定页面
            while (!text("成团领奖").findOnce()) {
                toastLog("请跳转到券领取页面，直到提示  已到达等待页面");
                sleep(800);
            }
            toastLog("已到达指定页面，等待");
            //  提前10秒 开始进入
            func.getTimeDiff(timeArea, startTime);
            func.sClick(text("成团领奖").findOnce());
            var clickBtn;
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
    var startTime, targetViewText;
    var actNames = ["必胜客50买100元", "青桔单车2.5买月卡",
        "饿了么1分买6元", "饿了么1分买10元"
    ];
    var actName = func.dialogsWin(actNames);      // 设置查找的文本
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

    var appName = "阳光惠生活";
    var timeArea = "北京时间";
    func.toApp(appName);
    // 等待进入指定页面
    while (!textContains(targetViewText).findOnce()) {
        toastLog("请跳转到券领取页面，直到提示  已到达等待页面");
        sleep(1000);
    }
    toastLog("已到达指定页面，等待");
    //   定位元素
    func.getTimeDiff(timeArea, startTime);
    var cnt = 0, loopBreak;
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
    var appName = "买单吧";
    var actNames = ["加油卡充值30元红包", "缴费类15元红包", "话费20元红包", "话费10元红包"];
    var actName = func.dialogsWin(actNames);      // 设置查找的文本
    func.toApp(appName);
    // 等待进入指定页面
    var gasPacket;
    text("本月可用兑换资格2次").findOne();
    var countDown, countDownParent, idxCountDown, minuteIdx, secIdx, minuteText, secText;
    var tempSec = "", cnt = 0;
    while (1) {
        countDown = text("抢兑倒计时：").findOne();
        countDownParent = countDown.parent();
        // 获取倒计时在母空间的位置
        idxCountDown = countDown.indexInParent();
        // 分钟和时钟的位置
        minuteIdx = idxCountDown + 1;
        secIdx = idxCountDown + 3;
        // 分钟和时钟的值
        minuteText = countDownParent.child(minuteIdx).text();
        secText = countDownParent.child(secIdx).text();
        cnt = cnt + 1;
        if (!(tempSec == secText)) {
            if (cnt >= 5) {
                cnt = 0;
                toastLog("倒计时 分钟:" + minuteText + " 秒:" + secText);
            }
        }
        tempSec = secText;
        if (minuteText == "00" && secText == "01") {
            sleep(500);
            break;
        }
    }
    var sureBtn;
    while (1) {
        //点击元素
        try {
            sureBtn = className("android.view.View").text("确认").findOnce();
            //如果找到确认按钮则不继续点击抢兑
            if (sureBtn == null) {
                gasPacket = className("android.view.View").text(actName).findOnce().parent().parent().child(1);
                if (gasPacket.text() == "抢兑") {
                    func.sClick(gasPacket);
                    sleep(300);
                } else {
                    continue;
                }
            } else {
                if (func.sClick(sureBtn)) {
                    toastLog("已点击");
                    break;
                }
            }
        } catch (e) {
            continue;
        }
    }
}


// 等待页面变价
function 中信活动() {
    var appName = "动卡空间";
    var timeArea = "北京时间";
    var startTime, targetViewText;
    var actNames = ["10点-9积分兑换", "周三六11点-5折必胜客百果园", "15点-星巴克中杯"];
    var actName = func.dialogsWin(actNames);      // 设置查找的文本
    var couDes;    // 券描述列表
    switch (actName) {
        case "10点-9积分兑换":
            toastLog("等待页面变化");
            startTime = "09,59,50,000"
            couDes = ["星巴克中杯饮品电子券", "奈雪", "喜茶25元", "苏宁支付券20元", "京东支付券20元", "天猫20元", "滴滴出行20元", "美团外卖20元"];
            targetViewText = func.dialogsWin(couDes);               // 设置查找的文本
            func.toApp(appName);             // 启动APP
            var couClick = null;          // 找券
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
            targetViewText = "价格: 1个权益+9个积分";               // 设置查找的文本
            text(targetViewText).findOne();             // 等待进入指定页面
            toastLog("已到达指定页面，等待");
            //点击元素
            while (func.sClick(text("去兑换").findOnce()) == false) {
                sleep(100);
            }
            while (func.sClick(text("去支付").findOnce()) == false) {
                sleep(100);
            }
            toastLog("已点击，等待验证码");
            sleep(3000);
            break;
        case "周三六11点-5折必胜客百果园":
            toastLog("到点点击");
            startTime = "10,59,59,700";             // 设置时间点
            couDes = ["必胜客50元代金券", "达美乐50元代金券", "肯德基50元代金券"];             // 券名称
            targetViewText = func.dialogsWin(couDes);               // 设置查找的文本
            func.toApp(appName);             // 启动APP
            // 等待进入指定页面
            var couClick = text(targetViewText).findOnce();
            while (!couClick) {
                couClick = text(targetViewText).findOnce();
                toastLog("请跳转到券 列表 页面，直到提示  已到达等待页面");
            }
            toastLog("元素文本：" + couClick.text());
            func.getTimeDiff(timeArea, startTime);              // 等待时间
            func.sClick(couClick);             // 点击元素
            // 点击元素
            while (text("购买后1天内有效").findOnce() == null) {
                func.sClick(text("立即购买").findOnce());
                sleep(80);
            }
            func.sClick(text("确认").findOne());
            toastLog("已点击，请确认结果");
            sleep(3000);
            break;
        case "15点-星巴克中杯":
            toastLog("等待页面变化");
            startTime = "14,59,50,000"
            targetViewText = "星巴克中杯饮品电子券（15点抢兑）";               // 设置查找的文本
            func.toApp(appName);             // 启动APP
            var couClick = textContains(targetViewText).findOnce();          // 找券
            while (couClick == null) {
                couClick = textContains(targetViewText).findOnce();          // 找券
                toastLog("请跳转到券 列表 页面，直到提示  已到达等待页面");
                sleep(1000);
            }
            toastLog("元素文本：" + couClick.text());
            func.getTimeDiff(timeArea, startTime);              // 等待到15秒的时候再进入
            func.sClick(couClick);              // 点击标签
            targetViewText = "价格: 1个权益+9个积分";               // 设置查找的文本
            text(targetViewText).findOne();             // 等待进入指定页面
            toastLog("已到达指定页面，等待");
            //点击元素
            while (func.sClick(text("去兑换").findOnce()) == false) {
                sleep(100);
            }
            while (func.sClick(text("去支付").findOnce()) == false) {
                sleep(100);
            }
            toastLog("已点击，等待验证码");
            sleep(3000);
            break;
        case "2021积分兑换":
            startTime = "14,00,00,000"
            targetViewText = "已报名，快去抢兑吧";               // 设置查找的文本
            func.toApp(appName);             // 启动APP
            var btnClick = text(targetViewText).findOnce();          // 找按钮
            while (btnClick == null) {
                btnClick = text(targetViewText).findOnce();          // 找按钮
                toastLog("请跳转到对应页面，直到提示  已到达等待页面");
                sleep(800);
            }
            func.getTimeDiff(timeArea, startTime);              // 等待时间
            func.sClick(btnClick);
            var goodsText = "SKG 颈部按摩仪"
            buyBtn = text(goodsText).findOnce();
            while (buyBtn == null) {
                buyBtn = text(goodsText).findOnce();
                scrollDown();
            }
            var idx = buyBtn.indexInParent();
            var goodsParent = buyBtn.parent();
            func.sClick(goodsParent.child([idx + 3]));
            break;
    }
}

// 等待页面变价
function 京东腾讯月() {
    var actNames = ["腾讯视频VIP月卡"]; //, "肯德基10元代金券"];
    //var actName = func.dialogsWin(actNames);      // 设置查找的文本
    toastLog("等待页面变化");
    var appName = "京东金融";
    func.toApp(appName);
    var tVip, getBtn;
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
    var appName = "工银e生活";
    var timeArea = "北京时间";
    var startTime = "10,29,59,680";
    couName = "确定"
    func.toApp(appName);             // 启动APP
    // 找到使用流程，且找到对应券名称沃尔玛的情况下就是 券的详情页
    while (!(text("安全验证").findOnce())) {
        toastLog("请进入活动页面，直到提示  已到达等待页面");
        sleep(333);
    }
    var sureBtn = className("android.widget.Button").text(couName).findOne();
    toastLog("已到达指定页面，等待");
    func.getTimeDiff(timeArea, startTime);              // 等待时间
    // 等待点击立即购买
    func.sClick(sureBtn);
    toastLog("已点击，请确认结果");
    sleep(3000);
}