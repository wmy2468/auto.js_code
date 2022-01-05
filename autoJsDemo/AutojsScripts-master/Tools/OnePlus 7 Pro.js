var onePlus7Pro = {};

// 解锁
onePlus7Pro.unlock = function () {
    auto.waitFor(); // 检查无障碍服务是否已经启用
    device.wakeUpIfNeeded(); // 如果屏幕没有点亮，则唤醒设备
    sleep(500);
    swipe(800, 2000, 800, 800, 500); // 上滑打开密码界面
    sleep(500);
    unlockByPassword("6683");
};

function unlockByPassword(password) {
    for (var i = 0; i < password.length; i++) {
        var char = password.charAt(i);
        click(char);
        sleep(200);
    }
    click(1111, 2257);
}

// 设置屏幕亮度
function SetBrightness() {
    device.keepScreenDim(7200 * 1000)
    toast("设置屏幕常量2小时");
    //device.cancelKeepingAwake()
}

module.exports = onePlus7Pro;