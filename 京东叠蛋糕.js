auto.waitFor();

main();

function main() {
    run_app('京东');
    jd_sign();
    cakes();
    alert('已完成！');
}

// ======================签到代码==================================
function jd_sign() {
    //等待首页加载
    while (className('TextView').text('首页').findOnce() == null) {
        center_click(id('xk').findOnce());
        toastLog('等待首页...');
        sleep(4500);
    }
    sleep(1000);
    center_click(className('TextView').text('领京豆').findOne());
    //等待进店领豆加载
    className('TextView').text('进店领豆').findOne();
    if (className('TextView').text('已连续签到').findOnce()) {
        toastLog('今日已签到');
    }
    else {
        center_click(className('TextView').text('签到领京豆').findOnce());
        while (className('TextView').text('签到提醒').findOnce() == null && text('全民抢京豆').findOnce() == null) {
            sleep(1000);
        }
        toastLog('签到成功');
    }
    while (className('TextView').text('首页').findOnce() == null) {
        back_way();
        sleep(4000);
    }
    center_click(className('TextView').text('领券').findOnce());
    className('ImageView').desc('领券中心').findOne();

    if (className('TextView').text('立即签到').findOnce() == null) {
        toastLog('今日已领券');
    }
    else {
        className('TextView').text('立即签到').findOnce().click();
        className('ImageView').desc('关闭弹窗').findOne();
        className('ImageView').desc('关闭弹窗').findOne().click();
    }
    while (className('TextView').text('首页').findOnce() == null) {
        back_way();
        sleep(4000);
    }
}

// ======================叠蛋糕代码==================================
function cakes() {
    // 等待蛋糕界面加载
    while (className('android.view.View').text('当前蛋糕：').findOnce() == null) {
        let cake_view = className('ImageView').desc('浮层活动').findOnce();
        center_click(cake_view);
        sleep(2000);
    }
    sleep(3000);
    // 检测弹窗是否有立即签到
    sign_immediately = text('立即签到').findOnce();
    if (sign_immediately != null) {
        center_click(sign_immediately);
    }
    // 点击任务
    let mission = className('android.view.View').text('做任务领金币').findOne();
    center_click(mission);
    let idx = 1;
    let idxText, unComplete, textStr;
    while (true) {
        textStr = '';
        // 等待任务界面出现
        className('android.view.View').textContains('签到').findOne();
        sleep(4500);
        unComplete = text('去完成').find();
        if (unComplete.nonEmpty()) {
            if (unComplete.length <= 1 || idx >= unComplete.length) { break; }
            idxText = unComplete[idx].parent().parent().parent().child(0).child(1).text();
            if (idxText.indexOf('去玩AR吃') == -1) {
                // 如果有战队相关则+1
                if (idxText.indexOf('战队') != -1) {
                    idx = idx + 1;
                    continue;
                }

                if (idx >= unComplete.length) { break; }
                sleep(1500);
                if (textContains('继续领红包').findOnce() != null) {
                    textContains('继续领红包').findOnce().click();
                    sleep(1500);
                }
                while (text('去完成').findOnce() != null) {
                    unComplete[idx].click();
                    sleep(1000);
                }
                if (idxText.indexOf('浏览可得') != -1) { textStr = '直接返回' }
                if (idxText.indexOf('秒可得') != -1) { textStr = '等待返回' }
                if (idxText.indexOf('成功开通得') != -1) { textStr = '会员' }
            } else {
                break;
            }
            after_click(textStr);
        } else {
            break;
        }
    }
}


function after_click(textStr) {
    sleep(4500);
    let city_player = className('android.webkit.WebView').text('京喜城市玩家').findOnce();
    let viewList = text('浏览以下5个商品').depth(17).findOnce(); //恭喜完成
    let addCart = textContains('点击加购以下').findOnce();  //idContains(str)

    if (addCart != null) {
        add_cart();
    }
    else if (viewList != null) {
        view_list();
    }
    else if (city_player != null) {
        sleep(1000);
        let join_imd = text('确认定位 立即参与').findOnce();
        if (join_imd != null) {
            join_imd.click()
            sleep(1000);
            let happy_get = className('android.view.View').text('开心收下').findOnce();
            if (happy_get != null) { happy_get.click() }
        }
        wait_complete();
    }
    else if (textStr == '直接返回') {
        sleep(1000);
        back_way();
    }
    else if (textStr == '等待返回') {
        wait_complete();
    }
    else if (textStr == '会员') {
        member_card();
    }
    else {
        wait_complete();
    }

}

function add_cart() {
    let carts
    i = 0;
    while (text('已完成').findOnce() == null) {
        //点击商品加购物车按钮
        if (idContains('cart_').findOnce() != null) {
            carts = idContains('cart_').find()[i];
            //if (carts.child(0).text() != '已加购') {
            carts.click();
            //}
            sleep(2500);
        }                   //加购等待已完成 
        i = i + 1;
    }
    back_way();
}


function view_list() {
    i = 0;
    while (text('已完成').findOnce() == null) {
        idContains('view_').findOne();
        //点击商品加购物车按钮
        if (idContains('view_').findOnce() != null) {
            idContains('view_').find()[i].click();
            textContains('购物车').findOne();
            sleep(1500);
            back_way();
            sleep(2500);
        }
        i = i + 1;
    }
    back_way();
}

function member_card() {
    sleep(3600);
    if (text('去完成').findOnce() == null) {
        center_click(textContains('确认授权并加入').findOne());
        sleep(4500);
        if (text('去完成').findOnce() == null) {
            back_way();
        }
    }
}

function wait_complete() {
    let focuseBtn = true;
    //等待恭喜完成
    while (textContains('恭喜完成').findOnce() == null) {
        if (focuseBtn) {
            if (center_click(className('ImageView').desc('关注有礼按钮').findOnce())) {
                focuseBtn = false;
                sleep(3000);
                let sureBtn = className('TextView').text('确认').findOnce();
                if (sureBtn != null) {
                    sureBtn.click();
                    sleep(1000);
                }
                let closeBtn2 = text('收下好礼').findOnce();
                if (closeBtn2 != null) {
                    closeBtn2.click();
                    sleep(1000);
                }
                let closeBtn3 = textContains('领取奖励').findOnce();
                if (closeBtn3 != null) {
                    closeBtn3.click();
                    sleep(1000);
                }
                let closeBtn = className('ImageView').id('com.jd.lib.jshop:id/asj').findOnce();
                if (closeBtn != null) {
                    closeBtn.click();
                    sleep(1000);
                }
            }
        }
        sleep(1000);
        if (className('TextView').textContains('出错').findOnce() != null) {
            break;
        }
    }
    back_way();
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
        let closeBtn = className('ImageView').id('com.jd.lib.jshop:id/asj').findOnce();
        if (closeBtn != null) {
            closeBtn.click();
            sleep(1000);
        }
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