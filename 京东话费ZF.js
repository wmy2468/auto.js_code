// 导入模块
var func = require("func_list.js");
var selectArr = ["weiXinn", "YunShaofu"];

// toastLog(text("再次购买").findOnce());
// func.sClick(text("全部").findOnce());

var result;

var textPay = "待付款";
var textAll = "全部";
var textBar = "京东收银台"

result = func.dialogsWin(selectArr);
var cardEndNumber;
var pwds = ['0', '8', '1', '5', '7', '3'];

if (result == "weiXinn") {
    func.toApp("京东");
    weiXinn();
} else if (result == "YunShaofu") {
    var cardName = func.dialogsWin(["JJ-中信", "LP-中信", "华夏", "JJ-京东红卡", "浦发", "交通", "LM-中行", "邮储", "JJ-建行"]);
    switch (cardName) {
        case "JJ-中信":
            cardEndNumber = "2079"
            break;
        case "LP-中信":
            cardEndNumber = "5177"
            break;
        case "华夏":
            cardEndNumber = "8589"
            break;
        case "浦发":
            cardEndNumber = "8636"
            break;
        case "交通":
            cardEndNumber = "4471"
            break;
        case "JJ-京东红卡":
            cardEndNumber = "2743"
            break;
        case "邮储":
            cardEndNumber = "3780"
            break;
        case "JJ-建行":
            cardEndNumber = "5135"
            break;
        case "LM-中行":
            cardEndNumber = "5976"
            break;
    }
    func.toApp("京东");
    hwzhifu();
}

function hwzhifu() {

    while (true) {
        sleep(1000);
        // 在全部订单和待付款切换
        try {
            func.sClick(text(textPay).findOnce());
            sleep(1250);
            func.sClick(text(textAll).findOnce());
        } catch (e) { }
        if (text("重新加载").findOnce()) {
            back();
            sleep(500);
        }
        func.sClick(textContains("去支付").findOnce());
        if (text(textBar).findOnce() != null) {
            func.sClick(textContains("云闪付").findOne());
            sleep(500);
            func.sClick(className("android.widget.TextView").textContains("银联支付").findOne());
            toastLog("切换到YunShaofu");
            text("付款详情").findOne();
            sleep(1000);
            func.sClick(text("付款方式").findOne());

            while (func.sClick(text("Huawei Pay").findOnce()) == false) {
                scrollDown();
                sleep(500);
            }
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
            for (var i = 0; i < pwds.length; i++) {
                func.sClick(text(pwds[i]).findOnce());
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


function weiXinn() {
    var cnt;
    while (true) {
        sleep(2000);
        try {
            func.sClick(text(textPay).findOnce());
            sleep(2000);
            func.sClick(text(textAll).findOnce());
            sleep(2000);
        } catch (e) {

        }
        if (text("重新加载").findOnce()) {
            back();
            sleep(500);
        }
        func.sClick(textContains("去支付").findOnce());
        if (text(textBar).findOnce() != null) {
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