//toastLog(id("com.jd.lib.cashier.feature:id/cd").findOnce().click());
var func = require("func_list.js");
//test on laptop
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