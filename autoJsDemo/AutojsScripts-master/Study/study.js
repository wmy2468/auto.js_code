function main() {

    //unlock();
    //sleep(2000);

    //toast("test");
    //sleep(2000);

    //study_App();
    //study_Console();
    //study_Device();
    //study_Dialogs();
    //study_Events();
}

function unlock() {
    auto.waitFor();
    device.wakeUpIfNeeded();
    sleep(500);
    swipe(800, 2000, 800, 800, 500);
    sleep(500);

    click(6);
    sleep(200);
    click(6);
    sleep(200);
    click(8);
    sleep(200);
    click(3);
    sleep(200);

    click(1111, 2257);
}

function study_App() {
    alert("\n当前软件版本号:" + app.versionCode
        + "\n当前软件的版本名称:" + app.versionName
        + "\nAuto.js版本号:" + app.autojs.versionCode
        + "\nAuto.js版本名称:" + app.autojs.versionName
    );
/*
    // 通过应用名称启动应用。如果该名称对应的应用不存在，则返回false; 否则返回true
    app.launchApp("appName")

    // 通过应用包名启动应用。如果该包名对应的应用不存在，则返回false；否则返回true
    app.launch("packageName")
    app.launchPackage("packageName")

    // 获取应用名称对应的已安装的应用的包名。如果该找不到该应用，返回null
    app.getPackageName("appName")

    // 获取应用包名对应的已安装的应用的名称。如果该找不到该应用，返回null
    app.getAppName("packageName")

    // 卸载应用，执行后会会弹出卸载应用的提示框
    app.uninstall("packageName")

    // 用浏览器打开网站url，如果不以"http://"或"https://"开头则默认是"http://"
    app.openUrl("url")

    // 启动特定界面
    app.startActivity("name")

    // 返回为当前用户安装的所有应用程序包的列表
    let apps = app.getInstalledApps({
        get: ['meta_data'],
        match: ['system_only']
    })
    alert(apps);
*/
}

function study_Console() {

    // 显示控制台。这会显示一个控制台的悬浮窗(需要悬浮窗权限)
    console.show()

    // 设置控制台的大小，单位像素
    console.setSize(device.width / 2, device.height / 2)

    // 设置控制台的位置，单位像素
    console.setPosition(100, 100)

    // 设置日志保存的路径和配置，该函数会影响所有脚本的日志记录
    // config {Object} 日志配置，可选的项有
    //   file {string} 日志文件路径，将会把日志写入该文件中
    //   maxFileSize {number} 最大文件大小，单位字节，默认为512 * 1024 (512KB)
    //   rootLevel {string} 写入的日志级别，默认为"ALL"（所有日志），可以为"OFF"(关闭), "DEBUG", "INFO", "WARN", "ERROR", "FATAL"等
    //   maxBackupSize {number} 日志备份文件最大数量，默认为5
    //   filePattern {string} 日志写入格式，参见PatternLayout
    //console.setGlobalLogConfig(config)
    //console.setGlobalLogConfig({ "file": "/sdcard/1.txt" })

    // 打印到控制台，并带上换行符。 可以传入多个参数，第一个参数作为主要信息，其他参数作为类似于 printf(3) 中的代替值
    // 该函数也可以作为全局函数使用
    console.log('console.log')
    print('print') // 相当于log
    console.log('log: %d', 1)
    console.log('log:', 2)

    // console.log类似，但输出结果以灰色字体显示。输出优先级低于log，用于输出观察性质的信息
    console.verbose('verbose: %d', 2)

    // 与console.log类似，但输出结果以绿色字体显示。输出优先级高于log, 用于输出重要信息
    console.info('info: %d', 3)

    // 与console.log类似，但输出结果以蓝色字体显示。输出优先级高于info, 用于输出警告信息
    console.warn('warn: %d', 4)

    // 与console.log类似，但输出结果以红色字体显示。输出优先级高于warn, 用于输出错误信息
    console.error('error: %d', 5)

    // 与console.log类似，同时会打印出调用这个函数所在的调用栈信息
    console.trace('trace: %d', 6)

    // 断言。如果value为false则输出错误信息message并停止脚本运行
    console.assert(true, "message")

    // 清空控制台
    sleep(2000)
    console.clear()

    // 与console.log一样输出信息，并在控制台显示输入框等待输入。部分机型有bug
    //var n1 = console.input("input:") // 将输入的字符串用eval计算后返回
    //var n2 = console.rawInput("rawInput:") // 将输入的字符串直接返回
    //console.log('input:', n1)
    //console.log('rawInput:', n2)

    // 启动一个定时器，用以计算一个操作的持续时间。定时器由一个唯一的 label(可省略) 标识
    // 重复启动同一个标签的定时器会覆盖之前启动同一标签的定时器
    console.time("label")
    // 停止之前通过调用 console.time() 启动的定时器，并打印结果到控制台
    sleep(2345)
    console.timeEnd("label")

    // 隐藏控制台悬浮窗
    sleep(2000)
    console.hide()
}

function study_Device() {
    alert("\n屏幕分辨率宽度:" + device.width
        + "\n屏幕分辨率高度:" + device.height
        + "\n修订版本号:" + device.buildId
        + "\n设备的主板(?)型号:" + device.broad
        + "\n厂商品牌:" + device.brand
        + "\n设备型号:" + device.model
        + "\n整个产品的名称:" + device.product
        + "\nBootloader的版本:" + device.bootloader
        + "\n硬件名称:" + device.hardware
        //+ "\n构建(build)的唯一标识码:" + device.fingerprint
        + "\n硬件序列号:" + device.serial
        + "\n安卓系统API版本:" + device.sdkInt
        + "\nAndroid系统版本号:" + device.release
        + "\nIncremental:" + device.incremental
        //+ "\nThe base OS build the product is based on:" + device.baseOS
        + "\n安全补丁程序级别:" + device.securityPatch
        + "\n开发代号:" + device.codename
    );

    alert("\nIMEI:" + device.getIMEI()
        + "\nAndroidID:" + device.getAndroidId() // ID为一个用16进制字符串表示的64位整数，在设备第一次使用时随机生成，之后不会更改，除非恢复出厂设置
        + "\nMac地址:" + device.getMacAddress() // 需要在有WLAN连接的情况下才能获取，否则会返回null
        + "\n当前的(手动)亮度:" + device.getBrightness() // 范围为0~255
        + "\n当前亮度模式:" + device.getBrightnessMode() // 0为手动亮度，1为自动亮度
        + "\n媒体音量的最大值:" + device.getMusicMaxVolume()
        + "\n当前媒体音量:" + device.getMusicVolume()
        + "\n通知音量的最大值:" + device.getNotificationMaxVolume()
        + "\n当前通知音量:" + device.getNotificationVolume()
        + "\n闹钟音量的最大值:" + device.getAlarmMaxVolume()
        + "\n当前闹钟音量:" + device.getAlarmVolume()
        + "\n当前电量百分比:" + device.getBattery() // 0.0~100.0的浮点数
        + "\n是否正在充电:" + device.isCharging()
        + "\n内存总量:" + device.getTotalMem() // 单位字节(B)
        + "\n当前可用的内存:" + device.getAvailMem() // 单位字节(B)
        + "\n屏幕是否是亮着:" + device.isScreenOn()
    );
    /*
        // 设置当前手动亮度。如果当前是自动亮度模式，该函数不会影响屏幕的亮度
        device.setBrightness(0) // 范围0~255
    
        // 设置当前亮度模式
        device.setBrightnessMode(0) // 0为手动亮度，1为自动亮度
    
        // 设置当前媒体音量
        device.setMusicVolume(0)
        // 设置当前通知音量
        device.setNotificationVolume(1)
        // 设置当前闹钟音量
        device.setAlarmVolume(6)
    
        // 唤醒设备。包括唤醒设备CPU、屏幕等
        device.wakeUp() // 可以用来点亮屏幕
        device.wakeUpIfNeeded() // 如果屏幕没有点亮，则唤醒设备
    
        // 设置屏幕保持常亮，无法阻止用户使用锁屏键等正常关闭屏幕
        // 如果此函数调用时屏幕没有点亮，则会唤醒屏幕
        device.keepScreenOn(2000) // 屏幕保持常亮的时间, 单位毫秒
        device.keepScreenOn() // 一直保持屏幕常亮
        device.keepScreenDim(2000) // 允许屏幕变暗来节省电量
        device.keepScreenDim() // 可以用于定时脚本唤醒屏幕操作
        device.cancelKeepingAwake() // 取消屏幕常亮
    
        // 设备震动
        device.vibrate(2000)
        //device.cancelVibration() // 如果设备处于震动状态，则取消震动
    */
}

function study_Dialogs() {

    // 弹出一个消息提示框，并在用户点击"确定"后继续运行
    alert("Hello Word")

    // 弹出一个对话框并让用户选择"是"或"否"
    var value = confirm("y/n?")
    if (value) {
        alert("yes!")
    }
    /*
    // 对话框在ui模式下不能像通常那样使用，应该使用回调函数或者Promise的形式
    // 回调形式
    confirm("回调形式 y/n?", function (value) {
        if (value) {
            alert("yes!");
        }
    });
    // Promise形式
    confirm("Promise形式 y/n?").then(value => {
            if (value) {
                alert("yes!")
            }
        })
    */
/*
    // 显示一个只包含"确定"按钮的提示对话框
    // 可以作为全局函数使用
    dialogs.alert("Error", "An unknown error has occurred.")

    // 显示一个包含"确定"和"取消"按钮的提示对话框，一般用于ui模式
    // 可以作为全局函数使用
    value = dialogs.confirm("sure?", "Are you sure")
    if (value) {
        alert("yes!")
    } else {
        alert("no!")
    }

    // 显示一个包含输入框的对话框，等待用户输入内容，并在用户点击确定时将输入的字符串返回
    // 如果用户取消了输入，返回null
    var name = rawInput("Please enter your name", "xiaoming")
    //name = prompt("Please enter your name", "xiaoming") // 相当于 dialogs.rawInput()
    alert("Your name is:" + name)

    // 会把输入的字符串用eval计算一遍再返回，可以用该函数输入数字、数组等
    var age = dialogs.input("Please enter your age", "18")
    // new Date().getYear() + 1900 可获取当前年份
    var year = new Date().getYear() + 1900 - age
    alert("Your year of birth is:" + year)

    // 显示一个带有选项列表的对话框，等待用户选择。如果用户取消了选择，返回-1
    var options = ["OptionA", "OptionB", "OptionC", "OptionD"]
    var i = dialogs.select("Please select an option", options)
    if (i >= 0) {
        alert("You choose:" + options[i])
    } else {
        alert("You deselected")
    }

    // 显示一个单选列表对话框，等待用户选择并点击确定。如果用户取消了选择，返回-1
    i = dialogs.singleChoice("Please select an option", options)
    if (i >= 0) {
        alert("You choose:" + options[i])
    } else {
        alert("You deselected")
    }

    // 显示一个多选列表对话框，等待用户选择，返回用户选择的选项索引的数组。如果用户取消了选择，返回[]
    var iList = dialogs.multiChoice("Please select an option", options)
    alert("You choose:" + iList)

    // 创建一个可自定义的对话框
    // https://pro.autojs.org/docs/#/dialogs?id=dialogsbuildproperties
    dialogs.build({
        title: "★标题★", // 对话框标题
        content: "★内容★", // 对话框内容
        positive: "★确定键★", // 确定键内容
        negative: "★取消键★", // 取消键内容
        neutral: "★中性建★", // 中性键内容
        //checkBoxPrompt: "★勾选框★", // 勾选框内容
        inputPrefill: "★输入框★", // 勾选框内容
        //items: ["★A★", "★B★", "★C★", "★D★"],
        //itemsSelectMode: "select" // select/singleChoice/multiChoice
    }).on("show", (dialog) => {
        alert("对话框显示了" + dialog)
    }).on("dismiss", (dialog) => {
        alert("对话框消失了" + dialog)
    }).on("positive", () => {
        alert("监听确定键")
    }).on("negative", (dialog) => {
        alert("监听取消键") // 在cancel后调用
    }).on("cancel", (dialog) => {
        alert("对话框取消了")
    }).on("neutral", () => {
        alert("监听中性键")
    }).on("check", (checked) => {
        alert("监听勾选框" + checked)
    }).on("item_select", (index, item, dialog) => { // select
        alert("您选择的是第" + (index + 1) + "项, 选项为" + item)
    }).on("single_choice", (index, item, dialog) => { // singleChoice
        alert("您选择的是第" + (index + 1) + "项, 选项为" + item)
    }).on("multi_choice", (indices, items, dialog) => { // multiChoice
        alert("您选择的项目为" + indices + ", 选项为" + items)
    }).on("input", (text, dialog) => {
        alert("你输入的是" + text)
    }).on("input_change", (text, dialog) => {
        alert("你输入的是" + text)
    }).on("any", (action, dialog) => {
        if (action == "positive") {
            alert("any——确定")
        } else if (action == "negative") {
            alert("any——取消")
        }
    }).show()
*/
}

function study_Events() {

}

function study_X() {

}

main();