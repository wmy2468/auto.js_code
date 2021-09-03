auto.waitFor();
// 导入模块
var func = require("func_list.js");

var ringCount = 4;
var textPay = "待付款";
var textAll = "全部";
var textBar = "京东收银台"

var pwds = ['0', '8', '1', '5', '7', '3'];
var pwdYsf = ['1', '0', '0', '0', '0', '0'];


var selectFunc = func.dialogsWin(["话费支付", "删除话费订单", "进90减2界面领券"]);
switch (selectFunc) {
    case "话费支付":
        话费支付();
        break;
    case "删除话费订单":
        删除话费订单();
        break;
    case "进90减2界面领券":
        进90减2界面领券();
        break;
}

function 话费支付() {
    var result;
    var selectArr = ["微信", "华为支付", "云闪付", "JD支付"];
    var selectPerson = ["JJ", "LP", "LM"];
    var cardPerson = {
        "JJ": {
            "JJ中信": "2079",
            "JJ交行": "4471",
            "JJ浦发": "8636",
            "JJ建行": "5135",
            "JJ华夏": "8589",
            "JJ汇丰": "8633",
            "JJ中行": "3842",
            "JJ工行": "4897",
            "JJ邮储": "3780"
        },
        "LP":
        {
            "LP中信": "5177",
            "LP平安": "1672",
            "LP光大": "4419",
            "LP建行": "6806",
            "LP招商": "8940"
        },
        "LM": {
            "LM中行": "6946"
        }
    };
    // 定义选择卡对应的人
    var person, personCardList;
    result = func.dialogsWin(selectArr);

    var cardEndNumber;
    if (result == "微信") {
        func.toApp("京东");
        weiXinn();
    } else if (result == "华为支付" || result == "云闪付" || result == "JD支付") {
        // var cardName = func.dialogsWin(["JJ-中信", "JJ-华为中信", "LP-中信", "华夏", "JJ-京东红卡", "浦发", "交通", "LM-中行", "邮储", "JJ-建行"]);
        person = func.dialogsWin(selectPerson);
        // 根据人名 获取卡的尾号 字典
        personCardList = cardPerson[person];
        cardEndNumber = personCardList[func.dialogsWin(Object.keys(personCardList))];
        func.toApp("京东");
        while (text(textPay).findOnce() == null) {
            func.sClick(text("我的").findOnce());
            sleep(1000);
        }
        switch (result) {
            case "华为支付":
                hwzhifu(cardEndNumber);
                break;
            case "云闪付":
                yunshanfu(cardEndNumber);
                break;
            case "JD支付":
                jd_pay(cardEndNumber);
                break;
        }
    }
}

function 进90减2界面领券() {
    var timeArea;
    timeArea = "京东时间";
    func.toApp("京东");

    var pay90_40, targetView;
    targetView = desc("购物车").depth(14).findOnce();
    payBtn = text("生活·缴费").findOnce();
    while (targetView == null) {
        targetView = desc("购物车").depth(14).findOnce();
        func.passAd();
        func.sClick(text("生活·缴费").findOnce());
        pay90_40 = className("TextView").text("抢90减40话费券").findOnce();
        if (pay90_40 != null) {
            sleep(800);
            // 如果是华为荣耀8，需要向下滑动一下
            if (device.model == "FRD-AL00") {
                scrollDown();
                sleep(1000);
                pay90_40 = className("TextView").text("抢90减40话费券").findOnce();
            } else {
                // 如果其它机型，向上滑动一下
                scrollUp();
                sleep(1000);
            }
            func.sClick(pay90_40);
        }
        sleep(800);
    }
    // 获取当前时间
    var curHour, startTime;
    curHour = new Date().getHours() + 1;
    if (curHour < 10) {
        startTime = "0" + curHour + ",00,00,200"  // "10,00,00,000"
    } else {
        startTime = curHour + ",00,00,200"  // "10,00,00,000"
    }
    log("startTime: " + startTime);
    // 查找话费按钮
    var callFeeBtns;
    callFeeBtns = targetView.parent().parent().parent().parent().parent().parent().parent().parent().parent().child(0).child(0).child(0).child(0).child(1);

    // 等待
    func.getTimeDiff(timeArea, startTime);
    // 点击
    callFeeBtns.children().forEach(feeBtn => {
        func.sClick(feeBtn);
    })
    // 提示完成
    alert("点击完成");
}

function 删除话费订单() {
    var cnt;
    cnt = 0;
    func.toApp("京东");
    while (text("筛选").findOnce() == null) {
        func.sClick(text("我的").findOnce());
        func.sClick(text("我的订单").findOnce());
        toastLog("请打开 全部订单 界面");
        sleep(2000);
    }
    toastLog("已跳转到页面");
    var delBtn, title;
    while (1) {
        try {
            title = text("话费充值").findOnce();
            // 右上角 删除框形式
            if (title.depth() != 20) {
                delParent = title.parent().parent().parent().parent();
                if (delParent.childCount() == 2) {
                    delBtn = delParent.child(1).child(2);
                } else {
                    delBtn = delParent.child(2).child(0);
                }
            } else {
                // 删除订单 按钮形式
                delParent = title.parent().parent().parent().parent().parent();
                if (delParent.childCount() == 2) {
                    delBtn = delParent.child(2).child(1).child(0).child(0).child(0)
                } else {
                    delBtn = delParent.child(2).child(1).child(0).child(0).child(0)
                }
            }
            if (func.sClick(delBtn)) {
                func.sClick(text("删除").findOne());
                sleep(1000);
            }
            cnt = 0;
        }
        catch (e) {
            classNameContains("RecyclerView").scrollable().findOne().scrollForward();
            sleep(800);
            cnt = cnt + 1;
            if (cnt > 10) {
                break;
            }
        }
    }
    alert("删除完成");
}

function yunshanfu(cardEndNumber) {
    var clickCnt = 0, cnt;
    while (true) {
        sleep(2000);
        if (clickCnt > ringCount) {
            持续响铃(20);
            break;
        }
        // 在全部订单和待付款切换
        try {
            if (func.sClick(text(textPay).findOnce())) {
                clickCnt = clickCnt + 1;
            }
            sleep(2000);
            func.sClick(text(textAll).findOnce());
            sleep(2000);
        } catch (e) { }
        if (text("重新加载").findOnce()) {
            toastLog("找到重新加载，返回");
            back();
            sleep(1000);
        }
        func.sClick(textContains("去支付").findOnce());
        if (text(textBar).findOnce() != null) {
            clickCnt = 0;
            func.sClick(textContains("云闪付").findOne());
            sleep(500);
            func.sClick(className("android.widget.TextView").textContains("银联支付").findOne());
            toastLog("切换到云闪付");
            text("付款详情").findOne();
            sleep(1000);
            func.sClick(text("付款方式").findOne());
            text("选择付款方式").findOne();
            while (text("付款详情").findOnce() == null) {
                sleep(500);
                if (!func.cClick(text("[" + cardEndNumber + "]").findOnce())) {
                    scrollDown();
                    sleep(1000);
                } else {
                    sleep(2500);
                }
            }
            sleep(1200);
            func.sClick(text("确认付款").findOnce());

            while (text("验证支付密码").findOnce() == null) { sleep(1000); }
            toastLog("...等待输入MM...");
            sleep(3000);

            for (var i = 0; i < pwdYsf.length; i++) {
                inputPwd(pwdYsf[i]);
                sleep(1200);
            }
            text("支付成功").findOne();
            toastLog("...支付完成...");
            sleep(1200);
            back();
            log(text("查看订单").findOne());
            //if (func.sClick(text("立即抽奖").findOnce())) {
            if (text("立即抽奖").findOnce()) {
                toastLog("找到抽奖，等待返回");
                sleep(8000);
                back();
                // 待付款滑动栏
                textContains(textPay).findOne();
                cnt = 6;
                while (cnt > 0) {
                    cnt = cnt - 1;
                    toastLog("...等待下一单...");
                    sleep(4000);
                }
            }
        }
    }
}


function hwzhifu(cardEndNumber) {
    var clickCnt = 0, cnt;
    while (true) {
        sleep(2000);
        if (clickCnt > ringCount) {
            持续响铃(20);
            break;
        }
        // 在全部订单和待付款切换
        try {
            if (func.sClick(text(textPay).findOnce())) {
                clickCnt = clickCnt + 1;
            }
            sleep(1000);
            func.sClick(text(textAll).findOnce());
            sleep(1000);
        } catch (e) { }
        if (text("重新加载").findOnce()) {
            toastLog("找到重新加载，返回");
            back();
            sleep(1000);
        }
        func.sClick(textContains("去支付").findOnce());
        if (text(textBar).findOnce() != null) {
            scrollDown();
            sleep(500);
            clickCnt = 0;
            func.sClick(textContains("云闪付").findOne());
            sleep(500);
            func.sClick(className("android.widget.TextView").textContains("银联支付").findOne());
            toastLog("切换到YunShaofu");
            text("付款详情").findOne();
            sleep(500);
            func.sClick(text("付款方式").findOne());
            sleep(500);
            while (textContains("京东闪付").findOnce() == null) {
                func.cClick(text("Huawei Pay").findOnce());
                scrollDown();
                sleep(500);
            }
            sleep(500);
            while (text("付款详情").findOnce() == null) {
                sleep(500);
                if (!func.cClick(text("[" + cardEndNumber + "]").findOnce())) {
                    scrollDown();
                    sleep(500);
                } else {
                    sleep(1000);
                }
            }
            sleep(1200);
            func.sClick(text("确认付款").findOnce());

            while (text("验证支付密码").findOnce() == null) { sleep(1000); }
            toastLog("...等待输入MM...");
            sleep(1000);
            for (var i = 0; i < pwds.length; i++) {
                if (textContains("密码泄露").findOnce() != null) {
                    func.sClick(text("知道了").findOnce());
                    cnt = 5;
                    while (cnt > 0) {
                        func.sClick(desc("删除").findOnce());
                        cnt = cnt - 1;
                        sleep(800);
                    }
                    i = 0;
                }
                func.cClick(text(pwds[i]).findOnce());
                sleep(500);
            }
            text("支付成功").findOne();
            toastLog("...支付完成...");
            sleep(1200);
            back();
            text("查看订单").findOne();
            //if (func.sClick(text("立即抽奖").findOnce())) {
            if (text("立即抽奖").findOnce()) {
                toastLog("找到抽奖，等待返回");
                sleep(2000);
                back();
                // 待付款滑动栏
                textContains(textPay).findOne();
                cnt = 6;
                while (cnt > 0) {
                    cnt = cnt - 1;
                    toastLog("...等待下一单...");
                    sleep(1300);
                }
            }
        }
    }
}


function jd_pay(cardEndNumber) {
    var clickCnt = 0, cnt;
    while (true) {
        sleep(2000);
        if (clickCnt > ringCount) {
            持续响铃(20);
            break;
        }
        // 在全部订单和待付款切换
        try {
            if (func.sClick(text(textPay).findOnce())) {
                clickCnt = clickCnt + 1;
            }
            sleep(1000);
            func.sClick(text(textAll).findOnce());
            sleep(1000);
        } catch (e) { }
        if (text("重新加载").findOnce()) {
            toastLog("找到重新加载，返回");
            back();
            sleep(1000);
        }
        func.sClick(textContains("去支付").findOnce());
        // 如果找到京东收银台
        if (text(textBar).findOnce() != null) {
            sleep(1000);
            // 如果没点击到卡，则展开所有付款方式
            if (func.cClick(textContains(cardEndNumber).findOnce()) == false) {
                toastLog("展开卡列表点击");
                // 点击全部，展开所有card
                func.sClick(text("全部付款方式").findOne());
                sleep(1000);
                // 等待页面加载
                text("付款方式").findOne();
                while (!func.cClick(textContains(cardEndNumber).findOnce())) {
                    sleep(850);
                    scrollDown();
                    sleep(850);
                }
            } else {
                toastLog("已直接点击");
            }
            sleep(1200);
            func.sClick(text("银行卡支付").findOne());

            text("支付成功").findOne();
            toastLog("...支付完成...");
            sleep(1200);
            // back();
            text("查看订单").findOne();
            sleep(1200);
            //if (func.sClick(text("立即抽奖").findOnce())) {
            if (text("立即抽奖").findOnce() != null) {
                toastLog("找到抽奖，等待返回");
                sleep(2000);
                back();
                // 待付款滑动栏
                textContains(textPay).findOne();
                cnt = 10;
                while (cnt > 0) {
                    cnt = cnt - 1;
                    toastLog("...等待下一单...");
                    sleep(1300);
                }
            }
        }
    }
}

function weiXinn() {
    var cnt;
    var clickCnt = 0;
    while (true) {
        sleep(2000);
        if (clickCnt > ringCount) {
            持续响铃(20);
            break;
        }
        try {
            if (func.sClick(text(textPay).findOnce())) {
                clickCnt = clickCnt + 1;
            }
            sleep(2000);
            func.sClick(text(textAll).findOnce());
            sleep(2000);
        } catch (e) { }
        if (text("重新加载").findOnce()) {
            toastLog("找到重新加载，返回");
            back();
            sleep(1000);
        }
        func.sClick(textContains("去支付").findOnce());
        if (text(textBar).findOnce() != null) {
            clickCnt = 0;
            log("find the bar");
            func.sClick(textContains("微信支付").findOne());
            toastLog("...等待跳转微信...");
            sleep(500);
            func.sClick(className("android.widget.TextView").depth(12).text("微信支付").findOne());
            if (device.brand == "HUAWEI") {
                text("使用以下方式打开").findOne();
                sleep(1000);
                click(250, 1900);
            }
            // 尝试自动输入支付密码
            while (func.cClick(text("请输入支付密码").findOnce()) == false) {
                func.sClick(text("立即支付").findOnce());
                sleep(800);
                func.sClick(text("继续支付").findOnce());
                sleep(800);
                func.sClick(text("确认支付").findOnce());
                sleep(800);
            }
            toastLog("...等待输入...");
            sleep(3000);
            for (var i = 0; i < pwds.length; i++) {
                inputPwd(pwds[i]);
                sleep(1200);
            }
            toastLog("...等待返回...");
            sleep(3000);
            while (func.cClick(text("返回商家").findOnce()) == false) {
                func.sClick(text("稍后再说").findOnce());
                sleep(1000);
            }
            toastLog("...等待显示完成...");
            sleep(3000);
            text("完成").findOne();
            toastLog("...已完成...");
            sleep(2000);
        }
        //if (func.sClick(text("立即抽奖").findOnce())) {
        if (text("立即抽奖").findOnce()) {
            toastLog("找到抽奖，等待返回");
            sleep(8000);
            back();
            // 待付款滑动栏
            textContains(textPay).findOne();
            cnt = 6;
            while (cnt > 0) {
                cnt = cnt - 1;
                toastLog("...等待下一单...");
                sleep(5000);
            }
        };
        sleep(2000);
    }
}


function inputPwd(number) {
    var centerX = 540, centerY = 1952;
    var offsetX = 360, offsetY = 154;
    var nums = {
        '0': [centerX, centerY + offsetY + offsetY],      //x,y++
        '1': [centerX - offsetX, centerY - offsetY],      //x-,y-
        '2': [centerX, centerY - offsetY],                //x,y-
        '3': [centerX + offsetX, centerY - offsetY],      //x+,y-
        '4': [centerX - offsetX, centerY],                //x-,y
        '5': [centerX, centerY],                          //x,y
        '6': [centerX + offsetX, centerY],                //x+,y
        '7': [centerX - offsetX, centerY + offsetY],      //x-,y+
        '8': [centerX, centerY + offsetY],                //x,y+
        '9': [centerX + offsetX, centerY + offsetY]       //x+,y+
    }
    var point = nums[number];
    click(point[0], point[1]);
}


function 持续响铃(时间秒) {
    while (时间秒 > 0) {
        时间秒 = 时间秒 - 1;
        铃声通知();
        sleep(1000);
    }
}

function 铃声通知(播放时长, 音量) {
    var 音量 = 音量 || 13;
    var 播放时长 = 播放时长 || 1000;
    var 铃声 = android.media.RingtoneManager.TYPE_NOTIFICATION;
    var mp = new android.media.MediaPlayer();
    device.setMusicVolume(音量)
    mp.setDataSource(context, android.media.RingtoneManager.getDefaultUri(铃声));
    mp.prepare();
    mp.start();
}

function 震动(vibrate_time) {
    var vibrate_time = vibrate_time || 1000;
    device.vibrate(vibrate_time);
}
