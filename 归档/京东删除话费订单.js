auto.waitFor();
// 导入模块
var func = require("func_list.js");


main();

function main() {
    func.to_app("京东");
    while (text("话费充值").findOnce() == null) {
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
            delParent = title.parent().parent().parent().parent();
            if (delParent.childCount() == 2) {
                delBtn = delParent.child(1).child(2);
            } else {
                delBtn = delParent.child(2).child(0);
            }
            if (func.sClick(delBtn)) {
                func.sClick(text("删除").findOne());
                sleep(1000);
            }
        }
        catch (e) {
            swipe(400, 2000, 400, 1000, 200);
        }
    }
}