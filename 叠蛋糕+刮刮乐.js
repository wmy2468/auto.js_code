main();

function main() {
    run_app('京东');
    //签到
    jd_sign();
    //叠蛋糕
    cakes();
    //刮刮卡
    scratchCard();
    alert('已完成！');
}


// ======================签到代码==================================
function jd_sign() {
    //等待首页加载
    while (className('TextView').id('ic').text('首页').findOnce() == null) {
        center_click(id('xk').findOnce());
        toastLog('等待首页...');
        sleep(4500);
    }
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
    let idxText, indexTeam, unComplete;
    while (true) {
        // 等待任务界面出现
        className('android.view.View').textContains('签到').findOne();
        sleep(4500);
        unComplete = text('去完成').find();
        if (unComplete.nonEmpty()) {
            if (unComplete.length <= 1) { break; }
            idxText = unComplete[idx].parent().parent().parent().child(0).child(1).text();
            if (idxText.indexOf('去玩AR吃') == -1) {
                if (idxText.indexOf('所在战队') != -1) { idx = 2; }
                if (idx >= unComplete.length) { break; }
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


function after_click() {
    sleep(3500);
    let ddPets = textContains('东东萌宠').findOnce();
    let beans = className('TextView').text('豆豆成长值').findOnce();
    let beans2 = className('TextView').text('豆苗成长值').findOnce();
    let beans3 = className('TextView').text('记得点击气泡浇灌营养液哦！！').findOnce();
    let getBeans = className('TextView').text('领京豆').findOnce();
    let palyPlay = className('TextView').text('玩一玩').id('fd').findOnce();
    let couponCenter = className('ImageView').id('com.jd.lib.coupon:id/abz').desc('领券中心').findOnce();
    let openRedPack = className('android.webkit.WebView').text('全民开红包').findOnce();

    let city_player = className('android.webkit.WebView').text('京喜城市玩家').findOnce();
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
    else if (ddPets != null || beans != null || beans2 != null
        || beans3 != null || getBeans != null || palyPlay != null
        || couponCenter != null || openRedPack != null) {
        sleep(1000);
        back_way();
    }
    else {
        wait_complete();
        back_way();
    }
}

function add_cart() {
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
    let focuseBtn = true;
    //等待恭喜完成
    while (textContains('恭喜完成').findOnce() == null) {
        if (focuseBtn) {
            if (center_click(id('com.jd.lib.jshop:id/nu').desc('关注有礼按钮').findOnce())) {
                focuseBtn = false;
                sleep(2000);
                center_click(id('com.jd.lib.jshop:id/arv').findOnce());
                sleep(1000);
                center_click(id('mj').desc('关闭页面').findOnce());
            }
        }
        sleep(1000);
        if (className('TextView').textContains('出错').findOnce() != null) {
            break;
        }
    }
}


// ======================刮刮卡代码==================================
function scratchCard() {
    home();
    setClip('只需要今日内馥zんí%V5nyr53rFa!这段話后去最新版（京ぃ東）');
    sleep(1500);
    run_app('京东');
    cards();
}

// 做任务集瓜瓜卡
function cards() {
    // 等待口令主界面加载
    id('com.jingdong.app.mall:id/bci').text('立即查看').findOne().click();
    text('我也要集红包').findOne().click();
    idx = 0;
    while (true) {
        // 等待任务界面出现
        unComplete = text('随机逛').find();
        if (unComplete.nonEmpty()) {
            unComplete[idx].click();
            //} else { break; }
            card_after_click();
        } else { break; }
    }
}

function card_after_click() {
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