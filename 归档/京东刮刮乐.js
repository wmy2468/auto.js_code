auto.waitFor();

main();

function main() {
    setClip('只需要今日内馥zんí%V5nyr53rFa!这段話后去最新版（京ぃ東）');
    run_app('京东');
    cards();
    alert('已完成！');
}

// 做任务集瓜瓜卡
function cards() {
    // 等待口令主界面加载
    id('com.jingdong.app.mall:id/bci').text('立即查看').findOne().click();
    text('我也要集红包').findOne().click();
    while (textContains('今日还可集1张').findOnce() == null) {
        // 等待任务界面出现
        unComplete = text('随机逛').find();
        if (unComplete.nonEmpty()) {
            if (unComplete.length >= 2) {
                for (i = 0; i <= (unComplete.length - 1); i++) {
                    idx = unComplete[i].parent().child(0).text().indexOf('个免费会员');
                    if (idx == -1) {
                        idx = i;
                        break;
                    }
                }
            } else { idx = 0; }
            unComplete[idx].click();
            //} else { break; }
            card_after_click();
        } else { break; }
    }
}

function card_after_click() {
    sleep(3500);
    var menberCard = textContains('会员卡').findOnce();
    var shopCart = text('购物车').findOnce();
    var shop = textContains('人关注').findOnce();

    if (shopCart != null || shop != null) {
        back_way();
    }
    else if (menberCard != null) {
        while (text('我知道了').findOnce() == null) {
            center_click(textContains('确认授权并加入').findOne());
            sleep(2000);
        }
        center_click(text('我知道了').findOnce());
    }
    else {
        card_wait_complete();
        back_way();
    }
    //等待返回界面
    className('android.webkit.WebView').text('集刮刮乐 赢千万红包').findOne();
    sleep(3000);
    continueCard();
}

function continueCard() {
    center_click(textContains('继续集刮刮卡').findOnce());
    center_click(textContains('继续逛逛').findOnce());
}

function card_wait_complete() {
    //等待恭喜完成
    while (text('任务已完成').findOnce() == null) {
        if (className('TextView').textContains('出错').findOnce() != null) {
            break;
        }
        sleep(1500);
    }
}


// -------------通用部分--------------------
function run_app(act_name) {
    //closeApp(act_name);
    var act_pkg = app.getPackageName(act_name);
    if (currentPackage() == act_pkg) {
        home();
        sleep(1000);
    }
    app.launch(act_pkg);
}


function back_way() {
    sleep(800);
    if (desc('返回').id('fe').findOnce() == null) {
        back();
    } else {
        desc('返回').id('fe').click();
    }
    sleep(800);
}

function center_click(element) {
    if (element != null) {
        click(element.bounds().centerX(), element.bounds().centerY());
        sleep(800);
        return true;
    } else { return false; }
}

function closeApp(appName) {
    var packageName = app.getPackageName(appName);
    app.openAppSetting(packageName);
    text(app.getAppName(packageName)).waitFor();
    var is_sure = textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/).findOne();
    if (is_sure.enabled()) {
        textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/).findOne().click();
        sleep(2500);
        if (textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/).find().length > 1) {
            textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/).find()[1].click();
        } else {
            textMatches(/(.*确.*|.*定.*)/).findOne().click();
        }
        log(app.getAppName(packageName) + "应用已被关闭");
        sleep(1000);
        back();
    } else {
        log(app.getAppName(packageName) + "应用不能被正常关闭或不在后台运行");
        back();
    }
}