/**
 * 抖音极速版
*/

let _adIntervalTime = 22 * 60 * 1000 // 广告观看间隔22m
let _delayTime = 1000
let _adTime = 35 * 1000
let width = device.width
let height = device.height

main();

function main() {
    auto() // 检查无障碍服务是否已经启用

    setScreenMetrics(width, height)
    showConsole()
    device.keepScreenDim() // 屏幕常亮

    swipeAD()
}

function swipeAD() {
    while (true) {
        watchAD()
        openBox()
        eatSubsidy()
        sleep(_adIntervalTime)
    }
}

// 看广告
function watchAD() {
    log("看广告")
    let adTag = text("限时任务赚金币").findOne()
    if (adTag) {
        //adTag.parent().parent().parent().click()
        adTag.parent().parent().click()
        sleep(_delayTime)
        let tips = text("金币收益").findOne(_delayTime)
        //log(tips)
        if (tips) { // 未能开启广告
        } else { // 成功开启广告
            sleep(_adTime)
            click(1359, 134)
        }
    }
    sleep(_delayTime)
}

// 开宝箱得金币
function openBox() {
    log("开宝箱得金币")
    let textTag = text("开宝箱得金币").findOne()
    //log(textTag)
    if (textTag) {
        textTag.parent().click()

        // 看广告
        let adTextTag = text("看广告视频再赚").findOne(_delayTime)
        if (adTextTag) {
            adTextTag.parent().click()
            sleep(_adTime)
            click(1359, 134)
        }
    }
    sleep(_delayTime)
}

// 吃饭补贴
function eatSubsidy() {
    log("吃饭补贴")
    let textTag = text("吃饭补贴").findOne()
    if (textTag) {
        textTag.parent().parent().click()

        let subsidyBtn = textMatches(/^领取.*金币$/).findOne(_delayTime)
        //log(subsidyBtn)
        if (subsidyBtn) {
            subsidyBtn.click()

            // 看广告
            let adTextTag = text("看视频再领").findOne(_delayTime)
            if (adTextTag) {
                adTextTag.parent().parent().click()
                sleep(_adTime)
                click(1359, 134)
                sleep(_delayTime)
            }
        }
    }
    back()
    sleep(_delayTime)
}

function showConsole() {
    let x = 10
    let y = 680
    let width_console = device.width / 2
    let height_console = device.height / 2
    console.show()
    sleep(100)
    console.setPosition(x, y)
    console.setSize(width_console, height_console)
}

function hideConsole() {
    console.hide()
}