var func = require("func_list.js");
main();
function main() {
    京东茅台();
}
function 京东茅台() {
    // 等待页面变价模式
    toastLog("请选择到预约或收藏界面, 如有提示已到达等待页面请重启");

    var appName = "京东"
    var timeArea = "京东时间";
    var startTime = "14,18,00,000";
    var targetViewText = "贵州茅台酒";
    launchApp(appName);             // 启动APP
    // 等待用户选择到指定页面 条件=商品或预约 + 茅台
    while (!(text("商品").findOnce() && textContains(targetViewText).findOnce())) {
        toastLog("请跳转到收藏界面或者 预约界面，直到提示  已到达等待页面");
        sleep(1000);
    }
    toastLog("已到达等待页面");
    func.getTimeDiff(timeArea, startTime);
    // 点击提交订单
    while (!func.sClick(packageName("com.jingdong.app.mall").textContains(targetViewText).findOnce())) {
        log("已变价 立即抢购 Click");
    }
    toastLog("结束");
}
