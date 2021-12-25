auto.waitFor();
// 导入模块
var func = require("func_list.js");

main();
// toastLog(text("领取奖励").find().length);
function main() {
    let selectedArr = ["建行财富季", "ZFB捐款", "余额宝转出"];
    //---------------配置区域-----------------
    let scriptName = func.dialogsWin(selectedArr);      // 设置查找的文本  
    let zfb = 支付宝();
    switch (scriptName) {
        case "建行财富季":
            建行财富季();
            break;
        case "ZFB捐款":
            zfb.ZFB捐款();
            break;
        case "余额宝转入":
            zfb.余额宝转入();
            break;
        case "余额宝转出":
            zfb.余额宝转出();
            break;
    }

}


function 支付宝() {
    this.余额宝转出 = function () {
        let url_zfb_余额宝 = "alipays://platformapi/startapp?appId=20000032";
        app.startActivity({
            action: "android.intent.action.VIEW",
            data: url_zfb_余额宝,
        });
        while (text("使用密码").findOnce() == null) {
            func.sClick(text("转出").findOnce());
            if (func.sClick(text("全部").findOnce()) == true) {
                sleep(1500);
                func.sClick(text("确认转出").findOnce());
            }
        }
        toastLog("已完成。。。");
    }
    this.余额宝转入 = function () {
        let url_zfb_余额宝 = "alipays://platformapi/startapp?appId=20000032";

        app.startActivity({
            action: "android.intent.action.VIEW",
            data: url_zfb_余额宝,
        });
    }
    this.ZFB捐款 = function () {
        var defaultCount, count, cardNum, banks;
        banks = func.dialogsWin(["渣打5比", "交行3比"])
        switch (banks) {
            case "渣打5比":
                cardNum = "(9101)";
                defaultCount = 5;
                break;
            case "交行3比":
                cardNum = "(5629)";
                defaultCount = 3;
                break;
        }
        count = dialogs.rawInput("请输入捐款次数", defaultCount);
        func.toApp("支付宝");
        var cnt = 1;
        sleep(1000);
        while (count > 0) {
            while (text("项目介绍").findOnce() == null) {
                toastLog("请跳转到 捐赠项目 界面...");
                sleep(2500);
            }
            while (1) {
                if (func.sClick(text("单笔捐").findOnce())) {
                    break;
                }
                if (func.sClick(text("再捐一笔").findOnce())) {
                    break;
                }
            }
            text("《支付宝爱心捐赠协议》").findOne();
            sleep(800);
            func.sClick(className("EditText").findOnce());
            sleep(800);
            setText(0, "0.01");
            sleep(800);
            func.sClick(text("匿名捐款").findOne());
            sleep(800);
            func.sClick(text("同意协议并捐款").findOne());
            text("立即付款").findOne();
            sleep(800);
            while (textContains(cardNum).findOnce() == null) {
                func.sClick(text("付款方式").findOnce());
                if (text("选择付款方式").findOnce() != null) {
                    sleep(800);
                    if (func.cClick(text(cardNum).findOnce()) == false) {
                        scrollDown();
                        sleep(800);
                    } else {
                        toastLog("已选择银行卡，等待...");
                        sleep(3200);
                    }
                }
            }
            func.sClick(text("立即付款").findOne());
            text("支付成功").findOne();
            sleep(1200);
            func.sClick(text("完成").findOne());
            text("感谢捐助").findOne();
            sleep(1500);
            back();
            toastLog("已完成第 " + cnt + " 次...");
            cnt = cnt + 1;
            sleep(2500);
            count = count - 1;
        }
        alert("已完成");
    }

    return this;
}
// -----------------------建行财富季-----------------------
function 建行财富季() {
    func.toAppMulti("微信", 1);
    龙支付_戳泡泡();
    // 龙支付_日常任务();
    func.toAppMulti("微信", 2);
    龙支付_戳泡泡();
    // 龙支付_日常任务();
    alert("已完成");
    // 日常任务
    // 消保 答题
    // 外汇答题
    // 消保 眼力
}

function 龙支付_日常任务() {
    var checkText = "每日签到涨财富";
    var see, seeText;
    seeText = "去完成";
    while (text(checkText).findOnce() == null) {
        toastLog("请跳转到龙支付 每日签到涨财富 界面");
        sleep(2000);
    }
    func.sClick(text("立即签到").findOnce());
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
            back();
            sleep(2500);                        // 返回
            // 检查是否已返回
            while (text(checkText).findOnce() == null) {
                if (func.sClick(text("拒绝").findOnce())) { sleep(2000); }
                if (func.sClick(text("否").findOnce())) { sleep(2000); }
                back();
                sleep(3000);
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

    var checkText = "龙支付5周年 “5”限畅享";
    var see, seeText, refreshCnt;
    refreshCnt = 0;
    seeText = "去看看";
    // 如果没找到则刷新一下
    while (text(seeText).findOnce() == null) {
        WX_刷新();
        refreshCnt = refreshCnt + 1;
        if (refreshCnt > 3) {
            break;
        }
    }
    // 避免bug，刷新3次
    see = text(seeText).find();
    while (see.nonEmpty()) {
        func.sClick(see[0]);       // 点击最后一个去看看
        // 如果还能找到 龙支付分会场,则等待
        while (text(checkText).findOnce() != null) {
            sleep(800);
        }
        toastLog("LZF 会场 已消失");
        sleep(2200);
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
        if (keyWord != undefined) {
            func.sClick(text(keyWord).findOne());   // 点击关键字
        }
        sleep(1500);
        see = text(seeText).find();        // 重新检索
    }
}

function 龙支付_戳泡泡() {

    var checkText = "龙支付5周年 “5”限畅享";
    while (text(checkText).findOnce() == null) {
        toastLog("请跳转到龙支付 攒财富 界面");
        sleep(2000);
    }
    toastLog("已到达 龙支付 攒财富 界面");
    sleep(2000);
    龙支付攒财富_浏览();
    // 切换到主会场
    // var refresh, main_place;
    // refresh = true;
    // sleep(1000);
    // while (text("每日签到涨财富").findOnce() == null) {
    //     main_place = textEndsWith("次机会 >").findOnce();
    //     if (main_place != null) {
    //         if (func.sClick(main_place.parent().child(1))) {
    //             toastLog("已点击 主会场 按钮，等待切换");
    //             refresh = false;
    //             sleep(4000);
    //         }
    //     } else {
    //         if (refresh) {
    //             WX_刷新();
    //         }
    //     }
    //     // func.sClick(className("android.view.View").text("/").depth(22).findOnce());
    //     if (func.sClick(text("做任务").findOnce())) {
    //         refresh = false;
    //     }
    //     sleep(2000);
    // }
    sleep(1000);
}

function 龙支付_攒财富() {
    var checkText = "龙支付5周年 “5”限畅享";
    var keyList;
    keyList = ["在路上", "商超日", "乐活日"];
    while (text(checkText).findOnce() == null) {
        toastLog("请跳转到龙支付 攒财富 界面");
        sleep(2000);
    }
    toastLog("已到达 龙支付 攒财富 界面");
    sleep(2000);
    keyList.forEach(keyWord => {
        func.sClick(text(keyWord).findOne());   // 点击关键字
        sleep(2000);
        龙支付攒财富_浏览(keyWord);
    })
    // 切换到主会场
    var refresh;
    refresh = true;
    sleep(1000);
    while (text("每日签到涨财富").findOnce() == null) {
        if (func.sClick(text("btn_1").findOnce())) {
            toastLog("已点击 主会场 按钮，等待切换");
            refresh = false;
            sleep(4000);
        } else {
            if (refresh) {
                WX_刷新();
            }
        }
        // func.sClick(className("android.view.View").text("/").depth(22).findOnce());
        if (func.sClick(text("做任务").findOnce())) {
            refresh = false;
        }
        sleep(2000);
    }
    sleep(1000);
}
// -----------------------建行财富季-----------------------

function WX_刷新() {
    toastLog("刷新");
    // func.sClick(id("com.tencent.mm:id/kl1").findOne());
    func.sClick(desc("更多信息").findOne());
    sleep(2000);
    func.sClick(text("刷新").findOne());
    sleep(2000);
}