auto.waitFor();

main();

function main() {
    //设置口令跳转主界面
    setClip('鍑zんí%q1n2F9iqRb!这段話后去最新版【京⌒東】');
    run_app('京东');
    managers();
    alert('已完成！');
}


function managers() {
    id('com.jingdong.app.mall:id/bci').text('立即查看').findOne().click();
    //等待加载
    className('android.view.View').text('星店长首页').findOne();
    //1. 找各个店长
    let managerPNG = className('Image').textContains('.png').findOnce();
    let managerJPG = className('Image').textContains('.jpg').findOnce();
    //有找到元素才执行
    let mngs, count;
    if (managerPNG != null) {
        count = managerPNG.parent().parent().parent().childCount();
        for (i = 0; i < count; i++) {
            //等待加载
            className('android.view.View').text('星店长首页').findOne();
            mngs = className('Image').textContains('.png').findOnce().parent().parent().parent();
            manager(mngs.child(i));
        }
    }
    else if (managerJPG != null) {
        count = managerJPG.parent().parent().parent().childCount();
        for (i = 0; i < count; i++) {
            //等待加载
            className('android.view.View').text('星店长首页').findOne();
            mngs = className('Image').textContains('.png').findOnce().parent().parent().parent();
            manager(mngs.child(i));
        }
    }
}


function manager(starts) {
    //切换到店长
    //for (i = 0; i < 5; i++) {
    starts.click();
    sleep(500);
    //点击为他加人气
    text('为他加人气 >').findOne().click();
    sleep(2000);
    text('每日签到为爱豆加人气').findOne();
    sleep(2000);

    //逛商品有bug 有时候不刷新
    text('逛商品').findOne();
    while (text('逛商品').findOnce().parent().child(1).text() != '5/5') {
        for (i = 0; i < 5; i++) {
            text('逛商品').findOne();
            text('逛商品').findOnce().parent().parent().child(3).child(i).click();
            sleep(2500);
            back_way();
        }
    }

    let idx = 0;
    while (true) {
        let taskGo = text('前往').find();
        if (taskGo.nonEmpty()) {
            if (taskGo.length <= 1) { break; }
            let taskGoBtn = taskGo[idx];
            let taskName = taskGoBtn.parent().child(0).child(0).text();
            if (taskName == '开通品牌会员') {
                taskGoBtn.click();
                text('会员卡详情').findOne();
                sleep(3000);
                if (center_click(textContains('确认授权并加入').findOnce())) {
                    sleep(2500);
                    if (center_click(textContains('我知道了').findOnce())) { sleep(2000); };
                } else {
                    back_way();
                }
                text('为他加人气 >').findOne().click();
            }
            else if (taskName == '提醒签到') {
                taskGoBtn.click();
                sleep(2000);
            } else if (taskName != '好友助力') {
                taskGoBtn.click();
                sleep(2000);
                back_way();
            } else {
                idx = 1;
            }
        }
    }
    //关闭按钮
    textContains('星店长任务').findOnce().parent().child(0).click();
    sleep(3000);
    log('切换到下一位店长');
}

// -------------通用部分--------------------
function run_app(act_name) {
    let act_pkg = app.getPackageName(act_name);
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