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

func.cClick(text("签到领京豆").findOnce());


function 持续响铃(时间秒) {
    while (时间秒 > 0) {
        时间秒 = 时间秒 - 1;
        铃声通知();
        sleep(1000);
    }
}

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