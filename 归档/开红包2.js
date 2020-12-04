main();

function main() {
    checkClock();
    unlock();
    var i = 1;
    //while (i <= 2) {
    toAutojs();
    toWechat(2);
    toFavorite();
    openPacket();
    //i = i + 1;
    //}
    home();
    sleep(800);
    click(459, 2088);
}

// 元素点击
function sClick(ele) {
    if (ele != null) {
        if (!(ele.click())) {
            click(ele.bounds().centerX(), ele.bounds().centerY());
        }
        sleep(600);
        return true;
    } else { return false; }
}

// 切换到autojs
function toAutojs() {
    if (currentPackage() != getPackageName('Auto.js')) {
        launchApp('Auto.js');
        sleep(1000);
    }
}

//检查闹钟
function checkClock() {
    sleep(1000);
    var clock = text('滑动关闭闹铃').findOnce();
    if (clock != null) {
        var x1 = clock.bounds().centerX();
        var y = clock.bounds().centerY();
        x2 = device.width * 0.9;
        while (text('滑动关闭闹铃').findOnce() != null) {
            swipe(x1, y, x2, y, 400);
            sleep(700);
        }
    }
}

//2020-07月版本
// 4. 点红包
function openPacket() {
    var count = 0;
    while (text('中国银行信用卡微信红包').findOnce() == null) {
        sleep(800);
    }
    sClick(text('中国银行信用卡微信红包').findOnce());
    // 8月新增修改  
    while (textContains('个红包没有拆').findOnce() == null) {
        sClick(textContains('2020年餐饮鼓励金').findOnce());
        sleep(1000);
        // 如果超过60秒未加载 退出
        if (count > 60) { break; }
        count = count + 1;
    }
    // 8月新增修改
    sleep(1000);
    if (textContains('0个红包没有拆').findOnce() != null) {
        console.log('当前微信无红包 退出');
    } else {
        sClick(textContains('个红包没有拆').findOnce().parent().child(0).child(0).child(0));
        sleep(5000);
    }
}

// 3. 启动到微信收藏
function toFavorite() {
    while (text('通讯录').findOnce() == null) {
        back();
        sleep(1300);
    }
    while (text('我的收藏').findOnce() == null) {
        sClick(text('我').findOnce());
        sleep(1000);
        sClick(text('收藏').findOnce());
        sleep(1000);
    }
    sClick(text('收藏').findOnce());
    sleep(1000);
}

// 2. 启动到微信
function toWechat(cnt) {
    launchApp('微信');
    // 等待弹窗
    while (text('使用以下方式打开').findOnce() == null) {
        sleep(500);
    }
    sleep(1000);
    // 第一个微信 234,1824,402,1992
    if (cnt == 1) { click(264, 1854); }
    // 第二个微信 678,1824,846,1992
    if (cnt == 2) { click(698, 1854); }
    sleep(3000);
}

// 1， 解锁
function unlock() {
    var pwd = "081573" //解锁密码
    while (!device.isScreenOn()) {
        device.wakeUp();
        sleep(800);
    }
    toastLog('unlock');
    //while (text("紧急呼叫").findOnce() == null) {
    while (text('紧急呼叫').findOnce() == null) {
        swipe(300, 60, 300, 850, 400);
        sleep(900);
    }
    toastLog('输入密码');
    for (var i = 0; i < pwd.length; i++) {
        desc(pwd[i]).findOne().click();
    }
}