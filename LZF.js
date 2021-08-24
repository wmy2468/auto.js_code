auto.waitFor();
// 导入模块
var func = require("func_list.js");

main();
// toastLog(text("领取奖励").find().length);

function 日常任务() {
    var checkText = "每日签到涨财富";
    var see, seeText;
    seeText = "去完成";
    while (text(checkText).findOnce() == null) {
        toastLog("请跳转到龙支付 每日签到涨财富 界面");
        sleep(2000);
    }
    toastLog("已到达 龙支付 每日签到涨财富 界面");
    sleep(2000);
    see = text(seeText).find();
    while (see.nonEmpty()) {
        // 判断除邀请任务外是否都已经完成
        if (see.length > 1) {
            func.sClick(see[0]);                // 点击第一个元素
            // 如果还能找到 每日签到涨财富,则等待
            while (text(checkText).findOnce() != null) {
                sleep(800);
            }
            log("LZF 每日签到涨财富 已消失");
            sleep(2000);
            back();                             // 返回
            // 检查是否已返回
            while (text(checkText).findOnce() == null) {
                func.sClick(text("拒绝").findOnce();
                // 如果点击了 获取位置的否，需要等待1秒，再返回
                if (func.sClick(text("否").findOnce()) == true) {
                    sleep(1000);
                    back();
                }
            }
            sleep(800);
            log("LZF 每日签到涨财富 已找到");
            func.sClick(text("领取奖励").findOne());   // 点击领取奖励
            sleep(5000);
            see = text(seeText).find();        // 重新检索
        } else {
            break;
        }
    }
    toastLog(checkText + "，已完成！");
}

function 龙支付攒财富_浏览(keyWord) {
    var checkText = "龙支付分会场";
    var see, seeText;
    seeText = "去看看";
    see = text(seeText).find();
    while (see.nonEmpty()) {
        func.sClick(see[0]);       // 点击最后一个去看看
        // 如果还能找到 龙支付分会场,则等待
        while (text(checkText).findOnce() != null) {
            sleep(800);
        }
        log("LZF 会场 已消失");
        sleep(2000);
        back();                             // 返回
        // 检查是否已返回
        while (text(checkText).findOnce() == null) {
            // 如果点击了 获取位置的否，需要等待1秒，再返回
            if (func.sClick(text("否").findOnce()) == true) {
                sleep(1000);
                back();
            }
        }
        sleep(1000);
        log("LZF 会场 已找到");
        func.sClick(text(keyWord).findOne());   // 点击关键字
        sleep(1500);
        see = text(seeText).find();        // 重新检索
    }
    toastLog(keyWord + "，已完成！");
}

function 龙支付攒财富() {
    var checkText = "龙支付分会场";
    var keyList;
    keyList = ["在路上", "乐活日", "商超日"];
    while (text(checkText).findOnce() == null) {
        toastLog("请跳转到龙支付 攒财富 界面");
        sleep(2000);
    }
    toastLog("已到达 龙支付 攒财富 界面");
    sleep(2000);
    keyList.forEach(keyWord => {
        func.sClick(text(keyWord).findOne());   // 点击关键字
        sleep(1000);
        龙支付攒财富_浏览(keyWord);
    })
}



function main() {
    func.toApp("微信");
    // 龙支付攒财富
    龙支付攒财富();
    日常任务();
    alert("已完成");
    // 日常任务
    // 消保 答题
    // 外汇答题
    // 消保 眼力
}