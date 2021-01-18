auto.waitFor();
// 导入模块
var func = require("func_list.js");

main();

function main() {
    run_app('京东');
    kouling();
    monster();
    alert('已完成！');
}

function kouling() {
    setClip('18.0复制整段话 http:/J8KywSROEN3jkp幫皒助屴，1起炸哖獸分10億吧！>>ㄣ￥mDmQ3EB2Rb%da開(倞A崬pp）');
    func.sClick(id('com.jingdong.app.mall:id/bci').text('立即查看').findOne());

    toastLog("等待任务页面加载");
    while (text("每邀1个好友可得10000爆竹").findOnce() == null) {
        func.sClick(text('集爆竹').findOnce());
        func.sClick(className('ImageView').id('com.jd.lib.jshop:id/asj').findOnce());
    }
    sleep(3500);
}

// ======================年兽代码==================================
function monster() {
    var idx = 1;
    var idxText, unComplete, textStr;
    while (true) {
        textStr = '';
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
                else if (idxText.indexOf('秒可得') != -1) { textStr = '等待返回' }
                else if (idxText.indexOf('成功开通得') != -1) { textStr = '会员' }
                else if (idxText.indexOf('浏览5个商品可得') != -1) { textStr = '浏览' }
                else if (idxText.indexOf('加购5个商品可得') != -1) { textStr = '加购' }
            } else {
                break;
            }
            toastLog(textStr);
            after_click(textStr);
        } else {
            break;
        }
    }
}


function after_click(textStr) {
    sleep(4500);
    var city_player = className('android.webkit.WebView').text('京喜城市玩家').findOnce();
    //var viewList = text('浏览以下5个商品').depth(17).findOnce(); //恭喜完成
    //var addCart = textContains('点击加购以下').findOnce();  //idContains(str)

    if (textStr == '加购') {
        add_cart();
    }
    else if (textStr == '浏览') {
        view_list();
    }
    else if (city_player != null) {
        sleep(1000);
        var join_imd = text('确认定位 立即参与').findOnce();
        if (join_imd != null) {
            join_imd.click()
            sleep(1000);
            var happy_get = className('android.view.View').text('开心收下').findOnce();
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
    var carts
    i = 0;
    while (text('已完成').findOnce() == null) {
        //点击商品加购物车按钮
        if (idContains('cart_').findOnce() != null) {
            carts = idContains('cart_').find()[i].click();
            //if (carts.child(0).text() != '已加购') {
            //}
            sleep(2000);
        }                   //加购等待已完成 
        i = i + 1;
    }
    while (className('android.view.View').textContains('签到').findOnce() == null) {
        back_way();
        sleep(2000);
    }
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
    while (className('android.view.View').textContains('签到').findOnce() == null) {
        back_way();
        sleep(2000);
    }
}

function member_card() {
    var count = 0;
    //toastLog('会员卡');
    sleep(3000);
    while (text('去完成').findOnce() == null) {
        if (count >= 4) {
            back_way();
            sleep(4000);
        }
        if (center_click(textContains('确认授权并加入').findOnce())) {
            sleep(3000);
            center_click(text('我知道了').findOnce())
        }
        count = count + 1;
        sleep(3000);
    }
}

function wait_complete() {
    //等待恭喜完成
    textContains('恭喜完成').findOne();
    back_way();
}

// -------------通用部分--------------------
function run_app(act_name) {
    var act_pkg = app.getPackageName(act_name);
    if (currentPackage() == act_pkg) {
        home();
        sleep(1000);
    }
    app.launch(act_pkg);
}

function back_way() {
    sleep(800);
    var backBtn = desc('返回').findOnce();
    if (backBtn == null) {
        back();
    } else {
        var closeBtn = className('ImageView').id('com.jd.lib.jshop:id/asj').findOnce();
        if (closeBtn != null) {
            closeBtn.click();
            sleep(1000);
        }
        if (backBtn.clickable()) {
            backBtn.click();
        } else {
            center_click(backBtn);
        }
    }
    sleep(800);
    center_click(textContains('离开').findOnce());
    center_click(textContains('知道了').findOnce());
}



function center_click(element, centerClick) {
    if (element != null) {
        if (centerClick == null) {
            if (element.clickable()) {
                element.click();
                return true;
            } else {
                click(element.bounds().centerX(), element.bounds().centerY());
                sleep(800);
                return true;
            }
        } else {
            click(element.bounds().centerX(), element.bounds().centerY());
            sleep(800);
            return true;
        }
    } else { return false; }
}