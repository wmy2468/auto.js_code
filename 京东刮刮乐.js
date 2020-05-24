auto.waitFor();

main();
//toastLog(textContains('确认').findOnce());
// textContains('去完成').findOnce().parent().children().forEach(function (child) {
//     toastLog(child.text());
//     toastLog(child.desc());
// });
function main() {
    setClip('只需要今日内馥zんí%V5nyr53rFa!这段話后去最新版（京ぃ東）');
    run_app('京东');
    cards();
    alert('已完成！');
}


function run_app(act_name) {
    //closeApp(act_name);
    let act_pkg = app.getPackageName(act_name);
    if (currentPackage() == act_pkg) {
        home();
    } 
    app.launch(act_pkg);
    // 等待口令主界面加载
    id('com.jingdong.app.mall:id/bci').text('立即查看').findOne().click();
    text('我也要集红包').findOne().click();
    // 做任务集瓜瓜卡
    //center_click(textContains('刮刮卡').findOnce().parent().parent().child(2))
}


function cards() {
    idx = 0;
    while (true) {
        // 等待任务界面出现
        unComplete = text('随机逛').find();
        if (unComplete.nonEmpty()) {
            unComplete[idx].click();
            //} else { break; }
            after_click();
        } else { break; }
    }
}

//log(id('com.jd.lib.jshop:id/aay').text('商品').findOnce());

function after_click() {
    sleep(3500);
    let menberCard = textContains('会员卡').findOnce();
    let shopCart = text('购物车').findOnce();
    let shop = id('com.jd.lib.jshop:id/aay').text('商品').findOnce();
    
    if (menberCard != null) {
        center_click(textContains('确认授权并加入').findOne());
        sleep(2000);
        center_click(text('我知道了').findOnce());
    }
    else if (shopCart != null || shop != null) {
        back_way();
    }
    else {
        wait_complete();
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

//toastLog(id('com.jd.lib.jshop:id/arv').findOnce());

function wait_complete() {
    //等待恭喜完成
    text('任务已完成').findOne();
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
    let packageName = app.getPackageName(appName);
    app.openAppSetting(packageName);
    text(app.getAppName(packageName)).waitFor();
    let is_sure = textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/).findOne();
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