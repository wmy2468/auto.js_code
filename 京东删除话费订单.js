auto.waitFor();
// 导入模块
var func = require("func_list.js");

main();

function main() {
    var title = id("pk").text("话费充值").findOne();
    toastLog("已跳转到页面");
    var delBtn;
    while (1) {
        try {
            title = id("pk").text("话费充值").findOnce();
            delBtn = title.parent().parent().parent().child[2].child[0];
            if (func.sClick(delBtn)) {
                func.sClick(text("删除").findOne());
                sleep(1000);
            }
        }
        catch (e) {
            scrollDown();
        }
    }
}