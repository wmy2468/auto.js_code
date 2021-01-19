auto.waitFor();
// 导入模块
var func = require("func_list.js");

main();

function main() {
    launchApp('京东');
    kouling();
    monster();
    alert('已完成！');
}

function kouling() {
    setClip('18.0复制整段话 http:/J8KywSROEN3jkp幫皒助屴，1起炸哖獸分10億吧！>>ㄣ￥mDmQ3EB2Rb%da開(倞A崬pp）');
    func.sClick(id('com.jingdong.app.mall:id/bci').text('立即查看').findOne());
    var popUp, popUpLen;
    toastLog("等待任务页面加载");
    while (text("每邀1个好友可得10000爆竹").findOnce() == null) {
        func.sClick(text('集爆竹').findOnce());
        sleep(2500);
        // 关闭弹窗
        popUp = className('android.view.View').text("我知道了").findOnce();
        if (popUp) {
            try {
                popUpLen = popUp.parent().parent().parent();
                func.sClick(popUp.child(popUpLen - 1));
            }
            catch (e) {
                continue;
            }
        }
        popUp = className('android.view.View').text("立即抽奖").findOnce();
        if (popUp) {
            try {
                popUpLen = popUp.parent().parent().parent();
                func.sClick(popUp.child(popUpLen - 1));
            }
            catch (e) {
                continue;
            }
        }
    }
    sleep(1000);
}

// ======================年兽代码==================================
function monster() {
    var idx = 1;
    var idxText, unComplete, textStr;
    while (true) {
        textStr = '';
        text("每邀1个好友可得10000爆竹").findOne();
        unComplete = text('去完成').find();
        if (unComplete.nonEmpty()) {
            log("去完成长度：" + unComplete.length);
            if (unComplete.length <= 1 || idx >= unComplete.length) { break; }
            idxText = unComplete[idx].parent().child(2).text();
            sleep(1500);
            while (text('去完成').findOnce() != null) {
                func.sClick(unComplete[idx]);
                sleep(1000);
            }
            if (idxText.indexOf('浏览可得') != -1) { textStr = '直接返回' }
            else if (idxText.indexOf('秒可得') != -1) { textStr = '等待返回' }
            else if (idxText.indexOf('浏览并加购5个商品可得') != -1) { textStr = '加购' }
            else if (idxText.indexOf('成功入会可得') != -1) { textStr = '会员' }
            else if (idxText.indexOf('浏览并关注频道可得') != -1) { textStr = '直接返回' }
            toastLog(textStr);
            after_click(textStr);
        } else {
            break;
        }
    }
}


function after_click(textStr) {
    sleep(3000);
    toastLog("已点击去完成，等待下一步...");
    //var city_player = className('android.webkit.WebView').text('京喜城市玩家').findOnce();
    //var viewList = text('浏览以下5个商品').depth(17).findOnce(); //恭喜完成
    //var addCart = textContains('点击加购以下').findOnce();  //idContains(str)

    if (textStr == '加购') {
        add_cart();
    }
    else if (textStr == '浏览') {
        view_list();
    }
    else if (textStr == '直接返回') {
        sleep(2500);
        back();
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
    check_current_pkg("京东");
}

function add_cart() {
    var carts, cartComplete;
    i = 0;
    while (1) {
        cartComplete = text("在当前页加购5个商品").findOne();
        if (cartComplete.parent().childCount() == 5) {
            break;
        }
        //点击商品加购物车按钮
        if (idContains('jmdd-react-smash').findOnce() != null) {
            carts = idContains('jmdd-react-smash').find()[i].click();
            //if (carts.child(0).text() != '已加购') {
            //}
            while (!(textContains("购物车").findOnce() || textContains("店铺").findOnce())) {
                sleep(1000);
            }
            toastLog("已找到商品描述");
            sleep(1000);
            back();
            sleep(2000);
        }                   //加购等待已完成 
        i = i + 1;
    }
    back();
    sleep(2000);
}


function wait_complete() {
    //等待恭喜完成
    var backNow, count;
    count = 0;
    while (1) {
        count = count + 1;
        backNow = className("android.widget.ImageView").depth(9).findOnce();
        if (backNow != null) {
            break;
        } else {
            backNow = className("android.widget.Image").text("vk image").findOnce();
            if (backNow != null) {
                break;
            } else {
                backNow = backNow.parent();
            }
        }
        sleep(1000);
        if (count > 10) {
            toastLog("等待超时，返回...");
            // 针对双开手机
            if (func.sClick(text("取消").findOnce()) || func.sClick(desc("取消").findOnce())) {
                sleep(1500);
            }
            back();
            return false;
        }
    }
    toastLog("等待完成");
    sleep(2800);
    toastLog("等待完成");
    sleep(2800);
    toastLog("等待完成");
    sleep(2800);

    // 针对双开手机
    if (func.sClick(text("取消").findOnce()) || func.sClick(desc("取消").findOnce())) {
        sleep(1500);
    }
    // 针对奇怪的弹窗
    if (className("android.widget.ImageView").clickable(true).depth(2).findOnce()) {
        sleep(1500);
    }
    func.sClick(backNow)
}

// -------------通用部分--------------------
function check_current_pkg(act_name) {
    var act_pkg = app.getPackageName(act_name);
    if (currentPackage() == act_pkg) {
        return true;
    } else {
        app.launch(act_pkg);
        sleep(2000);
    }
}

function member_card() {
    var count = 0;
    //toastLog('会员卡');
    sleep(3000);
    while (text('去完成').findOnce() == null) {
        if (count >= 4) {
            func.sClick(className('android.view.View').text("295042cd75137e90").findOnce());
            back();
            sleep(2000);
        }
        if (func.cClick(textContains('确认授权并加入').findOnce())) {
            sleep(3000);
            func.cClick(text('我知道了').findOnce())
        }
        count = count + 1;
        toastLog("未找到会员...等待返回")
        sleep(1500);
    }
}
// function view_list() {
//     i = 0;
//     while (text('已完成').findOnce() == null) {
//         idContains('view_').findOne();
//         //点击商品加购物车按钮
//         if (idContains('view_').findOnce() != null) {
//             idContains('view_').find()[i].click();
//             textContains('购物车').findOne();
//             sleep(1500);
//             back_way();
//             sleep(2500);
//         }
//         i = i + 1;
//     }
//     while (className('android.view.View').textContains('签到').findOnce() == null) {
//         back_way();
//         sleep(2000);
//     }
// }

