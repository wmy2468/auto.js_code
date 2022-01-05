let width = device.width
let height = device.height
let halfWidth = device.width / 2
let halfHeight = device.height / 2
let _delayTime = 1000
let _adTime = 35 * 1000
let _adIntervalTime = 22 * 60 * 1000 // 广告观看间隔22m
let _configName = "mobile:Sony Fleece"

let activityBtnID = "com.ss.android.ugc.aweme.lite:id/b9t"

main()

function main() {
    auto() // 检查无障碍服务是否已经启用
    setScreenMetrics(width, height)
    showConsole()
    device.keepScreenDim() // 屏幕保持常亮

    // 设置当前音量
    device.setMusicVolume(0)
    device.setNotificationVolume(0)
    device.setAlarmVolume(0)

    //douyin()

    readNovels()

    // while (true) {
    //     openTreasureBox()
    //     sleep(_adIntervalTime)
    // }

}




//-------------------------------------------------------------------------------
//                              抖音
//-------------------------------------------------------------------------------
function douyin() {
    if (launchDouyin()) {

        //signin()

        openTreasureBox()
    }
}

function launchDouyin() {
    let isLauchApp = false
    do {
        isLauchApp = launchPackage("com.ss.android.ugc.aweme.lite")
        sleep(_delayTime)
    } while (!isLauchApp)
    log("打开抖音极速版")
    return true
}

// 签到
function signin() {
    // 获取上次签到日期
    let storage = storages.create(_configName)
    let lastDate = storage.get("Douyin:signin")
    let now = java.text.SimpleDateFormat("yyyy-MM-dd").format(new Date())
    if (!lastDate || compareDate(now, lastDate)) {

        // 签到
        id(activityBtnID).findOne().click()

        text("点击领取").findOne().click()
        storage.put("Douyin:signin", now)
        log("签到成功")

        // TODO 看广告

        sleep(_delayTime)
        back()
        sleep(_delayTime)
    }
}

// 看小说
function readNovels() {
    // 获取上次看小说日期
    let storage = storages.create(_configName)
    let lastDate = storage.get("Douyin:readNovels")
    let now = java.text.SimpleDateFormat("yyyy-MM-dd").format(new Date())
    if (!lastDate || compareDate(now, lastDate)) {
        // 看小说
        let activityBtn = id(activityBtnID).findOne()
        if (activityBtn) {
            activityBtn.click()

            text("看小说").findOne().click()

            // 看推荐榜第一的书
            textMatches(/.*热度$/).findOne().parent().click()

            className("android.view.View").filter(function (btn) {
                return btn.text() == "立即阅读" || btn.text() == "继续阅读"
            }).findOne().click()

            for (let i = 1; i < 200; i++) {
                sleep(1000 + random(1, 2) * 1000)
                click(width - 5, halfHeight + halfHeight / 2)
            }

            storage.put("Douyin:readNovels", now)
            log("已完成看小说")

            sleep(_delayTime)
            back()
            sleep(_delayTime)

            // 判断是否加入书架
            let joinBtn = text("确认").findOne(_delayTime)
            if (joinBtn) {
                joinBtn.click()
                sleep(_delayTime)
            }

            back()
            sleep(_delayTime)
            back()
        }

        sleep(_delayTime)
        back()
        sleep(_delayTime)
    }
}

// 开宝箱得金币
function openTreasureBox() {
    let activityBtn = id(activityBtnID).findOne()
    if (activityBtn) {
        activityBtn.click()

        className("TextView").text("开宝箱得金币").findOne().parent().click()

        log("开宝箱得金币")

        sleep(_delayTime)
        clickButton(495, 1257, 585, 1347)

        // TODO 看广告

        sleep(_delayTime)
        back()
        sleep(_delayTime)
    }
}







function showConsole() {
    let x = 18
    let y = 180
    console.show()
    sleep(100)
    console.setPosition(x, y)
    console.setSize(halfWidth, halfHeight)
}

function hideConsole() {
    console.hide()
}

// 比较日期大小
function compareDate(date1, date2) {
    var d1 = new Date(date1)
    var d2 = new Date(date2)
    if (d1.getTime() > d2.getTime()) {
        return true
    } else {
        return false
    }
}

// 通过坐标范围随机模拟点击
function clickButton(left, bottom, right, top) {
    click(random(left + 1, right - 1), random(bottom - 1, top + 1))
}