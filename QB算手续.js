//toastLog(id("com.jd.lib.cashier.feature:id/cd").findOnce().click());
var func = require("func_list.js");
//test on laptop

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

function 快钱手续费() {
    var selectedArr = ["提现", "消费"];
    var selectIndex = dialogs.select("选择提现、消费", selectedArr);
    if (selectIndex == -1) {
        exit();
    }
    text("资产明细").findOne();
    var times, inBills, moneyTypes;
    var lastTime, recordTime, moneyText, total_fees = 0.0;;
    let dict = {};
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
            if ((moneyTypes[i].text().indexOf(selectedArr[selectIndex]) != -1) && !(times[i].text() in dict)) {
                dict[times[i].text()] = 1;
                moneyText = inBills[i].text();
                moneyText = moneyText.substring(2, moneyText.length - 1);
                log(moneyText);
                total_fees = total_fees + moneyText * 1;
            }
        }
        toastLog("当前计算手续费:" + total_fees);
        // 翻页
        scrollDown();
        sleep(1000);
        swipe(300, 850, 300, 600, 400);
        sleep(2000);
    }
    alert("总手续费:" + total_fees);
}

function 钱宝手续费() {
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

    alert("总手续费:" + total_fees);
}