//toastLog(id("com.jd.lib.cashier.feature:id/cd").findOnce().click());
var func = require("func_list.js");
//test on laptop


var selectFunc = dialogs.select(["万商付3比", "钱宝付3比", "计算手续费"]);
switch (selectFunc) {
    case "万商付3比":
        万商3比();
        break;
    case "钱宝付3比":
        钱宝3比();
        break;
    case "计算手续费":
        手续费();
        break;
}


function 万商3比() { }

function 钱宝3比() { }


function 手续费() {
    selectedArr = ["钱宝手续费", "快钱手续费"];
    var selectIndex = dialogs.select("选择时间", selectedArr);
    if (selectIndex == -1) {
        exit();
    }

    if (selectedArr[selectIndex] == "钱宝手续费") {
        钱宝手续费();
    }
    else {
        快钱手续费();
    }
}

function 快钱手续费() {
    while (text("资产明细").findOnce() == null) {
        toastLog("请打开资产明细页面");
        sleep(2000);
    }
    var times, inBills, moneyTypes;
    var lastTime, recordTime, moneyText, total_fees = 0.0;
    var lastTimePay, recordTimePay, moneyTextPay, total_feesPay = 0.0;
    let dict = {}, dictPay = {};
    recordTime = "";
    while (true) {
        times = id("com.bill.quickmoney:id/time_").find();
        inBills = id("com.bill.quickmoney:id/mon_").find();
        moneyTypes = id("com.bill.quickmoney:id/type_").find();
        lastTime = times[times.length - 1].text();     // 记录最后一个值
        if (recordTime == lastTime) {
            break;
        } else {
            recordTime = lastTime;
        }
        for (i = 0; i < times.length; i++) {
            if ((moneyTypes[i].text().indexOf("提现") != -1) && !(times[i].text() in dict)) {
                dict[times[i].text()] = 1;
                moneyText = inBills[i].text();
                moneyText = moneyText.substring(2, moneyText.length - 1);
                log(moneyText);
                total_fees = total_fees + moneyText * 1;
            }

            if ((moneyTypes[i].text().indexOf("消费") != -1) && !(times[i].text() in dictPay)) {
                dictPay[times[i].text()] = 1;
                moneyTextPay = inBills[i].text();
                moneyTextPay = moneyTextPay.substring(2, moneyTextPay.length - 1);
                log(moneyTextPay);
                total_feesPay = total_feesPay + moneyTextPay * 1;
            }
        }
        toastLog("当前提现共：" + total_fees + "\n当前消费共：" + total_feesPay);
        // 翻页

        swipe(300, 850, 300, 600, 400);
        sleep(2000);
        scrollDown();
        sleep(2000);
    }
    alert("提现共：" + total_fees + "\n消费共：" + total_feesPay);
}

function 钱宝手续费() {
    while (text("账户明细").findOnce() == null) {
        toastLog("请打开账户明细页面");
        sleep(2000);
    }
    toastLog(id("com.example.mposstandard:id/amount").find().length);

    let targetCnt = id("com.example.mposstandard:id/trade_num").findOne().text();
    let curCnt = 0;
    let dict = {};

    var dates, times, amounts, fees;
    var date_time, total_fees;
    total_fees = 0.0;
    while (targetCnt != curCnt) {
        dates = id("com.example.mposstandard:id/date").find();
        times = id("com.example.mposstandard:id/time").find();
        amounts = id("com.example.mposstandard:id/amount").find();
        fees = id("com.example.mposstandard:id/fee_amount").find();
        for (i = 0; i < dates.length; i++) {
            date_time = dates[i].text() + times[i].text();
            if (!(date_time in dict)) {
                dict[date_time] = 1;
                log(fees[i].text());
                total_fees = total_fees + parseFloat(fees[i].text());
            }
        }
        curCnt = Object.keys(dict).length;
        toastLog("当前已统计：" + curCnt + "条");
        toastLog("当前总手续费:" + total_fees);
        // 翻页
        scrollDown();
        sleep(3000);
    }

    alert("总手续费:" + total_fees + "\n总条目：" + curCnt);
}