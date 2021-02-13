auto.waitFor();
// 导入模块
var func = require("func_list.js");
var doubleApp = true;
var appNumbers = 0;

main();

function main() {
    setClip("意%n3Eun52jaa!去");

    var selectedArr = ["第一个APP", "第二个APP"]
    var selNum;
    if (device.brand == "xiaomi") {
        selNum = func.dialogsWin(selectedArr);
        switch (selNum) {
            case "第一个APP":
                appNumbers = 1;
                break;
            case "第二个APP":
                appNumbers = 2;
                break;
        }
    }
    func.toAppMulti("京东", appNumbers);

    kouling();
    monster();
    alert("已完成！");
}

function kouling() {

    func.sClick(id("com.jingdong.app.mall:id/bci").text("立即查看").findOne());
    var popUp, popUpLen;
    toastLog("等待任务页面加载");
    while (textContains("当前关卡").findOnce() == null) {
        func.sClick(text("送爆竹").findOnce());
        sleep(2500);
        // 关闭弹窗
        func.sClick(text("我知道了").findOnce());

        popUp = text("立即抽奖").findOnce();
        if (popUp == null) {
            popUp = text("继续炸年兽分红包").findOnce();
        }

        if (popUp != null) {
            try {
                popUpLen = popUp.parent().parent().parent().parent().childCount();
                func.sClick(popUp.parent().parent().parent().parent().child(popUpLen - 1));
            }
            catch (e) {
                continue;
            }
        }
    }
    sleep(1000);
}

// ======================年兽代码==================================
function monster() {
    var unCompletes, unText;
    var idx, idx2 = 0;
    var pngs;
    while (1) {
        textContains("当前关卡").findOne();
        pngs = textContains("png").depth(19).find();
        toastLog("当前关卡长度：" + pngs.length);
        if (pngs.nonEmpty()) {
            if (idx2 >= pngs.length || pngs.length <= 1) { break; }
            while (textContains('剩余').findOnce() == null) {
                func.sClick(pngs[idx2]);
                sleep(2000);
            }
            idx = 0;
            while (1) {
                textContains('剩余').findOne();
                unCompletes = text("去完成").find();
                toastLog("去完成长度：" + unCompletes.length);
                if (unCompletes.nonEmpty()) {
                    if (idx >= unCompletes.length || unCompletes.length <= 1) { break; }
                    unText = unCompletes[idx].parent().child([unCompletes[idx].indexInParent() - 2]).text();
                    if (unText.indexOf("会员") != -1) {
                        idx = idx + 1;
                        continue;
                    }
                    func.sClick(unCompletes[idx]);
                    sleep(3000);
                    if (func.sClick(textContains("确认授权并加入").findOnce()) || textContains('剩余').findOnce()) {
                        sleep(3000);
                    } else {
                        back();
                        sleep(3000);
                    }
                    idx = idx + 1;
                } else {
                    break;
                }
            }

            while (text("剩余0次").findOnce() == null) {
                func.sClick(textContains("剩余").findOnce());
                sleep(5000);
                if (textContains("恭喜你，").findOnce()) {
                    toastLog("点击关闭按钮");
                    func.sClick(textContains("恭喜你，").findOnce().parent().parent().parent().parent().child(0));
                    sleep(4000);
                }
            }
        }
        back();
        sleep(2000);
        idx2 = idx2 + 1;
    }
}