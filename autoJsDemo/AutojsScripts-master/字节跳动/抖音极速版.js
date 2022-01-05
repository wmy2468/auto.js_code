/**
 * 抖音极速版
*/

let _totalTime = 2 * 60 * 60 // 刷视频的总时长
let _watchIntervalTime = 15 // 视频观看间隔15s
let _adIntervalTime = 25 * 60 // 广告观看间隔25m
let _delayTime = 1000
let _adTime = 35 * 1000
let float = 1.25
let width = device.width
let height = device.height
let halfWidth = device.width / 2
let halfHeight = device.height / 2
let activityBtnID = "com.ss.android.ugc.aweme.lite:id/b1u"
let taskList = ["签到", "看小说", "刷视频", "调节脚本速度"]
let speedList = [1, 1.5, 2, 3, 4, 5]

main();

function main() {
    auto() // 检查无障碍服务是否已经启用
    taskChoose()
}

function taskChoose() {
    let options = dialogs.multiChoice("需要执行的任务", taskList, [2])
    if (options == '') {
        toast("脚本已退出")
        exit()
    }
    options.indexOf(3) > -1 && speedChoose()

    setScreenMetrics(width, height)
    showConsole()

    if (launchApp()) {
        for (let i = 0; i < options.length; i++) {
            let option = options[i]
            switch (option) {
                case 0: signin(); break; // 签到
                case 1: readNovels(); break; // 看小说
                case 2: swipeVideo(); break; // 刷视频
                default: break;
            }
        }
    }
}

function speedChoose() {
    let option = dialogs.singleChoice("操作间隔的倍数(越大越慢)", speedList, 1);
    if (option == -1) {
        toast("脚本已退出")
        exit()
    }
    _delayTime *= speedList[option]
}

function launchApp() {
    let isLauchApp = false
    do {
        log("尝试启动抖音极速版")
        isLauchApp = launchPackage("com.ss.android.ugc.aweme.lite")
        sleep(_delayTime * 2)
    } while (!isLauchApp)
    log("抖音极速版已启动")
    return true
}

function swipeVideo() {
    let watchTimer = 0
    let adTimer = _adIntervalTime + 1 // 启动后马上尝试开始看广告
    let watchCount = _totalTime / _watchIntervalTime
    for (let i = 1; i < watchCount; i++) {

        if (adTimer > _adIntervalTime) {
            watchAD()
            openBox()
            eatSubsidy()
            adTimer = 0
            back()
            sleep(_delayTime * 2)
        }

        randomSwipe()

        let onceTime = _watchIntervalTime + random(-5, 5)
        log("第[%d]个视频看[%d]秒", i, onceTime)
        sleep(onceTime / 2 * 1000)
        dbClickLike(30)
        sleep(onceTime / 2 * 1000)
        watchTimer += onceTime
        adTimer += onceTime
        //log("总时间[%d]秒", watchTimer)

        if (watchTimer > _totalTime) {
            log("时间到")
            sleep(2000)
            hideConsole()
            exit()
            return
        }
    }
}

// 双击喜欢
function dbClickLike(chance) {
    //let likeBtn = id("com.ss.android.ugc.aweme.lite:id/ws").untilFind() // 有3个不好判断
    let isLike = random(0, 100)
    if (isLike <= chance) {
        click(halfWidth + 200, halfHeight)
        sleep(50)
        click(halfWidth + 205, halfHeight)
        log("双击喜欢")
    }
}

// 签到
function signin() {
    log("签到")
    let activityBtn = id(activityBtnID).findOne(_delayTime)
    if (activityBtn) {
        activityBtn.click()

        let signinBtn = text("签到").findOne()
        if (signinBtn) {
            signinBtn.click()

            // 看广告
            let adTextTag = text("看广告视频再赚").findOne(_delayTime)
            if (adTextTag) {
                adTextTag.parent().click()
                sleep(_adTime)
                click(1359, 134)
            }
            else {
                click(715, 2412)
            }
        }
        sleep(_delayTime)
        back()
        sleep(_delayTime)
    }
}

// 看广告
function watchAD() {
    log("看广告")
    let activityBtn = id(activityBtnID).findOne(_delayTime)
    if (activityBtn) {
        activityBtn.click()

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
                sleep(_delayTime)
            }
        }
        back()
        sleep(_delayTime)
    }
}

// 开宝箱得金币
function openBox() {
    log("开宝箱得金币")
    let activityBtn = id(activityBtnID).findOne(_delayTime)
    if (activityBtn) {
        activityBtn.click()

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
        back()
        sleep(_delayTime)
    }
}

// 吃饭补贴
function eatSubsidy() {
    log("吃饭补贴")
    let activityBtn = id(activityBtnID).findOne(_delayTime)
    if (activityBtn) {
        activityBtn.click()

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
                    back()
                }
            }
        }
        sleep(_delayTime)
        back()
        sleep(_delayTime)
    }
}

// 看小说
function readNovels() {
    log("看小说")
    let activityBtn = id(activityBtnID).findOne(_delayTime)
    if (activityBtn) {
        activityBtn.click()
        sleep(_delayTime)

        let readTag = text("看小说赚金币").findOne()
        if (readTag) {
            let number = readTag.parent().parent().child(1) // 已完成 10/10 次
            if (number.text().match("10/10")) {
                log("已完成过看小说任务")
            }
            else {
                let readBtn = readTag.parent().parent()
                readBtn.click()
                sleep(_delayTime)

                // 看推荐榜第一的书
                let heatTag = textMatches(/.*热度$/).findOne(_delayTime)
                //log(heatTag.text())
                if (heatTag) {
                    let novelBtn = heatTag.parent()
                    novelBtn.click()
                    sleep(_delayTime)

                    let isRead = false
                    let startReadBtn = text("立即阅读").findOne(_delayTime)
                    //log(startReadBtn)
                    if (startReadBtn) {
                        startReadBtn.click()
                        isRead = true
                        sleep(_delayTime)
                    }
                    else {
                        let keepReadBtn = text("继续阅读").findOne(_delayTime)
                        //log(keepReadBtn)
                        if (keepReadBtn) {
                            keepReadBtn.click()
                            isRead = true
                            sleep(_delayTime)
                        }
                    }

                    if (isRead) {
                        for (let i = 1; i < 120; i++) {
                            sleep(1000 + random(1, 2) * 1000)
                            click(width - 300, halfHeight - 100)
                        }
                    }
                }

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
        }
        sleep(_delayTime)
        back()
        sleep(_delayTime)
    }
}

function test() {

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

/**
 * 根据float倍数sleep随机时间
 * @param time
 */
function randomSleep(time) {
    sleep(ramdomByFloat(time));
}

/**
 * 随机滑动
 */
function randomSwipe() {
    smlMove(ramdomByFloat(width / 2), ramdomByFloat(height / 1.5), ramdomByFloat(width / 2), ramdomByFloat(height / 4), ramdomByFloat(800));
}

/**
 * 范围随机数生成
 * @param min
 * @param max
 */
function random(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

/**
 * 根据float生成随机数
 * @param number
 */
function ramdomByFloat(number) {
    return random(number, number * float);
}

/**
 * 仿真随机带曲线滑动
 * @param qx 起点x轴坐标
 * @param qy 起点y轴坐标
 * @param zx 终点x轴坐标
 * @param zy 终点y轴坐标
 * @param time 滑动时间，毫秒
 */
function smlMove(qx, qy, zx, zy, time) {
    var xxy = [time];
    var point = [];
    var dx0 = {
        "x": qx,
        "y": qy
    };
    var dx1 = {
        "x": random(qx - 100, qx + 100),
        "y": random(qy, qy + 50)
    };
    var dx2 = {
        "x": random(zx - 100, zx + 100),
        "y": random(zy, zy + 50),
    };
    var dx3 = {
        "x": zx,
        "y": zy
    };
    for (var i = 0; i < 4; i++) {
        eval("point.push(dx" + i + ")");
    }
    ;
    for (let i = 0; i < 1; i += 0.08) {
        xxyy = [parseInt(bezierCurves(point, i).x), parseInt(bezierCurves(point, i).y)];
        xxy.push(xxyy);
    }
    gesture.apply(null, xxy);
}

function bezierCurves(cp, t) {
    cx = 3.0 * (cp[1].x - cp[0].x);
    bx = 3.0 * (cp[2].x - cp[1].x) - cx;
    ax = cp[3].x - cp[0].x - cx - bx;
    cy = 3.0 * (cp[1].y - cp[0].y);
    by = 3.0 * (cp[2].y - cp[1].y) - cy;
    ay = cp[3].y - cp[0].y - cy - by;

    tSquared = t * t;
    tCubed = tSquared * t;
    result = {
        "x": 0,
        "y": 0
    };
    result.x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x;
    result.y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y;
    return result;
}