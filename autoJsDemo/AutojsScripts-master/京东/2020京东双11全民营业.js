

function main() {

    //launch("com.jingdong.app.mall");

    var activityButton = "浮层活动";
    if (!descContains(activityButton).exists()) {
        alert("温馨提示", "首页没有找到【全民营业】活动入口浮层\n请手动打开活动页，进入后脚本会自动执行");
    }
    else{
        alert("温馨提示", "点击");
        clickContent(activityButton, "desc");
    }


}

/**
 * 通过文字内容模拟点击按钮
 * @param content 按钮文字内容
 * @param type 点击类型，默认为text点击
 * @param sleepTime 等待时间，默认1000毫秒
 */
function clickContent(content, type, sleepTime) {
    var type = type || "text";
    var sleepTime = sleepTime || 1000;
    sleep(sleepTime);
    if (type == "text") {
        var button = text(content).findOne();
    } else {
        var button = desc(content).findOne();
    }
    clickButton(button);
    return button;
}

/**
 * 根据控件的坐标范围随机模拟点击
 * @param button
 */
function clickButton(button) {
    var bounds = button.bounds();
    press(random(bounds.left, bounds.right), random(bounds.top, bounds.bottom), random(50, 100));
}

main();