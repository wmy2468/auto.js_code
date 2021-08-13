//toastLog(id("com.jd.lib.cashier.feature:id/cd").findOnce().click());
var func = require("func_list.js");
//test on laptop

//toastLog(textContains("更多卡币").findOnce());
// func.sClick(className("Image").text("c143642ad0850f7a").findOnce());
// func.getTimeDiff("beijing", "00,00,00,700");
// var targetViewText = "沃尔玛电子卡";
// log(func.sClick(textContains(targetViewText).findOnce()));
// func.sClick(text("10元补贴券").findOne());
// func.sClick(text("满10.1元可用").findOne());

// func.sClick(text("领券参团").findOne());
// textContains("购买时会自动领取并使用").findOne();
// func.sClick(id("com.jd.pingou.newmodule.feature:id/bt_confirm").text("领券参团").findOne());
// var timeArea = "淘宝时间";
// toastLog(classNameContains("RecyclerView").scrollable().findOne().scrollForward());
// sleep(800);
// startTime = (new Date()).getHours() + ",56,10,700";
// func.getTimeDiff(timeArea, startTime);              // 等待时间

// var st, ed;
// st = new Date();
// func.sClick(text("补贴券可抵10元").findOne().parent().parent().child(1));
// //func.sClick(text("领券").id("com.jd.pingou.newmodule.feature:id/tv_youhui_title").findOne());
// ed = new Date();
// toastLog(ed - st);

// func.sClick(className("Button").depth(12).text("立即购买").findOnce());

// func.sClick(text("小爷酸汤鱼100元代金券").findOnce().parent().parent());             // 点击元素
// // 点击元素
// while (className("android.view.View").text("购买后1天内有效").findOnce() == null) {
//     func.sClick(className("Button").text("立即购买").findOnce());
//     func.sClick(className("Button").text("已售罄").findOnce());
// }

//运行环境为auto.js pro版本

// var window = floaty.window(
//     <vertical gravity="center" >
//         <button id='移动' layout_weight="1" alpha="0"></button>
//         <text id='text' layout_weight="1" gravity="center" textColor="red"> 一十一 </text>
//         <button id='关闭' layout_weight="1">关闭</button>
//     </vertical >
// );




// toastLog(x + "," + y);

function 铃声通知(播放时长, 音量) {
    var 音量 = 音量 || 13;
    var 播放时长 = 播放时长 || 1000;
    var 铃声 = android.media.RingtoneManager.TYPE_NOTIFICATION;
    var mp = new android.media.MediaPlayer();
    device.setMusicVolume(音量)
    mp.setDataSource(context, android.media.RingtoneManager.getDefaultUri(铃声));
    mp.prepare();
    mp.start();
}