var func = require('./function_list');

toastLog(text('已完成').findOnce());
//toastLog(textContains("1080").findOnce().parent().child(3).click());
//text("去完成").findOnce().parent().parent().parent().children().forEach(function (child) {
    // toastLog(child.text());
    // toastLog(child.desc());
    // });
//toastLog(text("恭喜完成").findOnce());

// var unComplete = text("去完成").find();
// if (unComplete != null) {
//     for (var i = 0; i < unComplete.length; i++) {
//         if (!(i == 0 || i == 2)) {
//             while (true) {
//                 toastLog(i);
//                 //toastLog(unComplete[i]);
//                 click(unComplete[i].bounds().centerX(), unComplete[i].bounds().centerY());
//                 action('guang');
//             }
//         }
//     }
// }

function main() {
    // 等待京东主界面加载
    className("android.view.View").desc("我的").findOnce();
    // 进入蛋糕界面
    className("android.widget.ImageView").desc("浮层活动").findOne().click();
    // 等待蛋糕界面加载
    className("android.view.View").textContains("当前蛋糕").findOnce();
    // 点击任务
    let mission = text("做任务领金币").findOne();
    click(mission.bounds().centerX(), mission.bounds().centerY())
    // 等待任务界面出现
    className("android.view.View").textContains("签到").findOnce()

    var unComplete = text("去完成").find();
    if (unComplete != null) {
        for (var i = 0; i < unComplete.length; i++) {
            if (!(i == 0 || i == 2)) {
                while (true) {
                    toastLog(i);
                    unComplete[i].click();
                    action('guang')
                }
            }
        }
    }

}


function after_click() {
    sleep(2000);
    let share = text("分享到").findOnce();
    let city_player = text("京喜城市玩家").findOnce(); //恭喜完成
    let festa = text("京东物流嘉年华").findOnce(); //恭喜完成
    let shop_list = text("点击加购以下").findOnce();  //idContains(str)
    //idContains('cart_').child(3).click()
    //text('已完成').findOnce()加购等待已完成 每4个向下滑动一次
}

function action(act) {
    switch (act) {
        case 'guang':
            //等待恭喜完成
            textContains("恭喜完成").findOne();
            back();
            sleep(2500);
    }
}