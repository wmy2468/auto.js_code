//toastLog(id("com.jd.lib.cashier.feature:id/cd").findOnce().click());
var func = require("func_list.js");
//test on laptop

log(textContains(".jpg").find().length);

// var cnt = 5;
// while (cnt > 0) {
//     scrollDown();
//     sleep(1000);
//     cnt = cnt - 1;
// }

// func.sClick((textContains('¥').find()[5]).parent().child(5));
// (function () {
//     let request = http.request;
//     // 覆盖http关键函数request，其他http返回最终会调用这个函数
//     http.request = function () {
//         try {
//             // 捕捉所有异常
//             return request.apply(http, arguments);
//         } catch (e) {
//             // 出现异常返回null
//             console.error(e);
//             return null;
//         }
//     }
// })();

// var originUrl = 'https://raw.githubusercontent.com/mw03251214/auto.js_code/master/func_list.js'
// http.__okhttp__.setTimeout(10000);
// try {
//     http.get(originUrl);
// }
// catch (err) {
//     log(err);
// }

// github下载的脚本 = 获取下载的脚本()
// log("github下载的脚本=", github下载的脚本)
// engines.execScript('auto.js&github', github下载的脚本)
// function 获取下载的脚本() {
//     try {
//         var r = http.get(githubUrl)
//         log('code=', r.statusCode)
//         var zipFile = r.body.bytes()
//         if (zipFile) {
//             var 代码路径 = 保存zip文件(zipFile)
//             return files.read(代码路径)
//         } else {
//             console.error('下载github代码失败')
//             exit()
//         }
//     } catch (err) {
//         console.error(err)
//         exit()
//     }
// }





// YunShaofu
function YunShaofu() {
    var appName = "com.unionpay";
    //closeApp(appName);
    func.toPackage(appName);
    while (className("TextView").text("我的").findOnce() == null) {
        sleep(1000);
    }
    sleep(1500);
    func.sClick(className("TextView").text("首页").findOnce());
    //点击签到按钮
    func.sClick(id("com.unionpay:id/frog_float").findOne());
    // 等待签到页面加载
    textContains("连续签到").findOne();

    if (text("今日已签到").findOnce() == null) {
        func.sClick(text("立即签到").findOnce());
        sleep(1500);
    }
    toastLog(appName + "已签到");
    sleep(1000);
}