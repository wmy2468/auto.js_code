auto.waitFor();

main();
//toastLog(textContains('继续领红包').findOnce());
// textContains('去完成').findOnce().parent().children().forEach(function (child) {
//     toastLog(child.text());
//     toastLog(child.desc());
// });
function main() {
    run_app('京东');
    jd_sign();
    cakes();
    alert('已完成！');
}

function run_app(act_name) {
    let act_pkg = app.getPackageName(act_name);
    if (currentPackage() != act_pkg) {
        app.launch(act_pkg);
    }
    // 等待京东主界面加载
    while (currentPackage() == act_pkg) {
        if (className('TextView').id('ic').text('首页').findOnce() == null) {
            sleep(1000);
        }
    }
}

function jd_sign() {
    //等待首页加载
    className('TextView').id('ic').text('首页').findOne();
    center_click(className('TextView').text('领京豆').findOne());
    //等待进店领豆加载
    className('TextView').text('进店领豆').findOne();
    if (className('TextView').text('已连续签到').findOnce()) {
        toastLog('今日已签到');
    }
    else {
        center_click(className('TextView').text('签到领京豆').findOnce());
        className('TextView').text('签到提醒').findOne();
        toastLog('签到成功');
    }
    while (className('TextView').id('ic').text('首页').findOnce() == null) {
        back_way();
        sleep(4000);
    }
    center_click(className('TextView').text('领券').findOnce());
    className('ImageView').id('com.jd.lib.coupon:id/abz').desc('领券中心').findOne();

    if (className('TextView').id('com.jd.lib.coupon:id/a7y').text('立即签到').findOnce() == null) {
        toastLog('今日已领券');
    }
    else {
        className('TextView').id('com.jd.lib.coupon:id/a7y').text('立即签到').findOnce().click();
        className('ImageView').id('com.jd.lib.coupon:id/kz').desc('关闭弹窗').findOne();
        className('ImageView').id('com.jd.lib.coupon:id/kz').desc('关闭弹窗').findOne().click();
    }
    while (className('TextView').id('ic').text('首页').findOnce() == null) {
        back_way();
        sleep(4000);
    }
}


function cakes() {
    // 等待蛋糕界面加载
    while (className('android.view.View').text('当前蛋糕：').findOnce() == null) {
        let cake_view = className('ImageView').desc('浮层活动').findOnce();
        center_click(cake_view);
        sleep(2000);
    }
    sleep(1000);
    // 检测弹窗是否有立即签到
    sign_immediately = textContains('立即签到').findOnce();
    if (sign_immediately != null) {
        center_click(sign_immediately);
    }
    // 点击任务
    let mission = className('android.view.View').text('做任务领金币').findOne();
    center_click(mission);
    let idx = 1;
    let idxText, unComplete;
    while (true) {
        // 等待任务界面出现
        className('android.view.View').textContains('签到').findOne();
        sleep(3500);
        unComplete = text('去完成').find();
        if (unComplete.nonEmpty()) {
            if (unComplete.length == 1) { break; }
            idxText = unComplete[idx].parent().parent().parent().child(0).child(1).text();
            if (idxText.indexOf('去玩AR吃') == -1) {
                sleep(1500);
                if (textContains('继续领红包').findOnce() != null) {
                    textContains('继续领红包').findOnce().click();
                    sleep(1500);
                }
                unComplete[idx].click();
            } else { break; }
            after_click();
        } else { break; }
    }
}

//toastLog(desc('关注有礼按钮').id('com.jd.lib.jshop:id/nu').findOnce());

function after_click() {
    sleep(3500);
    let ddPets = textContains('东东萌宠').findOnce();
    let beans = className('TextView').text('豆豆成长值').findOnce();
    let beans2 = className('TextView').text('豆苗成长值').findOnce();
    let beans3 = className('TextView').text('记得点击气泡浇灌营养液哦！！').findOnce();
    let city_player = className('android.webkit.WebView').text('京喜城市玩家').findOnce();
    let getBeans = className('TextView').text('领京豆').findOnce();
    let palyPlay = className('TextView').text('玩一玩').id('fd').findOnce();
    let couponCenter = className('ImageView').id('com.jd.lib.coupon:id/abz').desc('领券中心').findOnce();

    let viewList = text('浏览以下5个商品').depth(17).findOnce(); //恭喜完成
    let addCart = textContains('点击加购以下').findOnce();  //idContains(str)

    if (addCart != null) {
        add_cart();
        back_way();
    }
    else if (viewList != null) {
        view_list();
        back_way();
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
        back_way();
    }
    else if (ddPets != null || beans != null || getBeans != null
        || couponCenter != null || palyPlay != null || beans2 != null 
        || beans3 != null) {
        sleep(1000);
        back_way();
    }
    else {
        wait_complete();
        back_way();
    }
}

function add_cart() {
    log('add_cart');
    let carts
    i = 0;
    while (i <= 4 && (text('已完成').findOnce() == null)) {
        //点击商品加购物车按钮
        if (idContains('cart_').findOnce() != null) {
            carts = idContains('cart_').find()[i];
            if (carts.child(0).text() != '已加购') {
                carts.child(2).click();
            }
            sleep(2500);
        }                   //加购等待已完成 
        i = i + 1;
    }
}


function view_list() {
    log('view_list');
    i = 0;
    while (i <= 4 && (text('已完成').findOnce() == null)) {
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
}

function wait_complete() {
    //等待恭喜完成
    while (textContains('恭喜完成').findOnce() == null) {
        sleep(1000);
        center_click(id('com.jd.lib.jshop:id/nu').desc('关注有礼按钮').findOnce());
    }
    
}


function back_way() {
    if (desc('返回').id('fe').findOnce() == null) {
        back();
    } else {
        desc('返回').id('fe').click();
    }
}

function center_click(element) {
    if (element != null) {
        click(element.bounds().centerX(), element.bounds().centerY());
        return true;
    } else { return false; }
}