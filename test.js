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
// func.sClick(text("奖励中心").depth(17).findOnce());

// toastLog(x + "," + y);
// toastLog(func.sClick(text("生活·缴费").findOnce()));
// targetView = desc("购物车").depth(14).findOnce();
// callFeeBtns = targetView.parent().parent().parent().parent().parent().parent().parent().parent().parent().child(0).child(0).child(0).child(0).child(1);
// log(callFeeBtns);
// 等待
// func.getTimeDiff(timeArea, startTime);
// 点击
// callFeeBtns.children().forEach(feeBtn => {
//     func.sClick(feeBtn);
// })

// var signs = textStartsWith("+").find();
// for (var i = 0; i < signs.length; i++) {
//     func.sClick(signs[i]);
// }

left_banana = textStartsWith("剩余").findOne();
sleep(1000);
// 查找并点击香蕉
var bananas;
bananas = className("ListView").rowCount(5).findOnce();
if (bananas != null) {
    bananas.children().forEach(bans => {
        func.cClick(bans);
        sleep(20000);
    })
}


function 买单吧() {
    var appName = "买单吧";
    //closeApp(appName);
    func.toApp(appName);
    while (className("TextView").id("tv_title").text("我的").findOnce() == null) {
        func.passAd();
        func.sClick(id("ivADClose").findOnce());
    }
    // func.sClick(text("我的").findOne().parent().parent().parent().parent().child(2));
    func.cClick(id("iv_icon").desc("买单吧").findOne());      // id-iv_icon
    text("羊毛资讯").findOne();
    sleep(1000);
    // 任意一个找到就退出循环
    while (!(textContains("客官明天再来哟").findOnce() != null || textContains("今日已签到").findOnce() != null)) {
        func.sClick(id("com.bankcomm.maidanba:id/iv_signin").findOnce());
        func.sClick(text("立即签到").findOnce());
        sleep(1000);
        func.sClick(id("com.bankcomm.maidanba:id/bt_welfare_lottery").text("去抽奖").findOnce());
        if (text("手势登录").findOnce() != null) {
            sleep(500);
            func.gesture_pwd(appName);
            sleep(1000);
        }
        // 点击完成按钮
        func.sClick(id("com.bankcomm.maidanba:id/bt_ws_lottery_close").findOnce());
    }
    toastLog(appName + "已签到");
    sleep(1000);
}

function random_second(second, st, ed) {
    /** *
    @param {int} second 延迟的时间: 
    @param {int} st 随机开始值
    @param {int} ed 随机结束值
    */
    if (st >= ed) {
        return second;
    } else {
        return func.randomNum(st, ed) + second;
    }
}

function member_card() {
    //toastLog('会员卡');
    sleep(4000);
    if (textContains('邀请好友助力').findOnce() != null) {
        return 0;
    }
    sleep(1000);
    if (textContains('确认授权并加入').findOnce() == null) {
        return 0;
    }
    var authority, authorited;
    authorited = false;		// 表示是否勾选授权
    while (1) {
        log('加会员');
        authority = textContains('确认授权即同意').findOnce();
        if (authority != null) {
            if (func.cClick(authority.parent().child(0))) {
                authorited = true;
            }
        }
        sleep(2000);
        if (authorited) {
            if (text("姓名").findOnce() != null) {
                if (setText(1, "老陈")) {
                    sleep(1500);
                    back();
                }
            }
            if (text("邮箱").findOnce() != null) {
                if (setText(2, "273343029@qq.com")) {
                    sleep(1500);
                    back();
                }
            }
            if (text("生日").findOnce() != null) {
                func.sClick(className("android.widget.Spinner").findOne());
                sleep(1000);
                func.sClick(text("确定").findOnce());
                sleep(1000);
            }
            sleep(2000);
            if (func.cClick(textContains('确认授权并加入').findOnce())) {
                sleep(2000);
                break;
            }
        }
    }
    sleep(1500);
    back();
    sleep(1500);
}

// filePath = "/storage/emulated/0/脚本";
// var screenW;
// screenW = device.width;
// log("screenW: " + screenW);
// if (!requestScreenCapture()) {
//     alert("请求截图权限失败！");
//     exit();
// }
// sleep(800);
// // 查找拼图是否已加载
// var blockLine;
// blockLine = text("向右拖动滑块并拼合图片").findOnce();
// while (blockLine == null) {
//     sleep(800);
//     blockLine = text("向右拖动滑块拼合图片").findOnce();
// }
// // 获取滑块坐标
// var blockBounds, blockLeft, blockTop;
// blockBounds = blockLine.bounds();
// blockLeft = blockBounds.left;
// blockTop = blockBounds.top;

// // 查找图片，得到截图裁剪位置
// var dragImg, dragImgBounds;
// var blockLine, blockLineBounds;
// dragImg = idContains("wpcs_drag_img").findOnce();
// blockLine = idContains("wpcs_drag_block_line").findOnce();

// if (dragImg == null || blockLine == null) {
//     toastLog("未找到滑动的图片 退出");
//     exit();
// }

// dragImgBounds = dragImg.bounds();
// blockLineBounds = blockLine.bounds();

// // 定义截图坐标
// var img1X, img1Y, img1H, img1W, blockR;
// var img2X, img2Y, img2H, img2W;
// blockR = blockLineBounds.right;
// // 在img2 中查找img1
// //查找的图像35*44
// img1X = dragImgBounds.left;          // 设为滑块的右边
// img1Y = dragImgBounds.top;
// img1W = screenW - dragImgBounds.left * 2;        // 右边-左边
// img1H = dragImgBounds.bottom - dragImgBounds.top;        // 底部-顶部
// log(img1X, img1Y, img1W, img1H);

// img2X = dragImgBounds.right;          // 设为滑块的右边
// img2Y = dragImgBounds.top;
// img2H = dragImgBounds.bottom - dragImgBounds.top;        // 底部-顶部
// img2W = screenW - dragImgBounds.right;        // 右边-左边


// var img1;
// log("截图开始");
// img = captureScreen();      // 截图
// img = images.clip(img, img1X, img1Y, img1W, img1H); // 裁剪图片
// img = images.scale(img, 0.7, 0.7);
// superMan(images.toBytes(img));
// // img2 = images.clip(img, img2X, img2Y, img2W, img2H); // 裁剪图片
// img = images.cvtColor(img, "BGR2GRAY"); // 灰度
// superMan(images.toBytes(img));
// images.save(img, filePath + "/grey.png");


// toastLog("截图处理完成");

// var returnXY;
// // returnXY = superMan(images.toBytes(img));

// var targetX, targetY;
// 先还原比例，再加上截图的X,Y
// targetX = Math.floor(returnXY[0] / 0.7) + imgX;
// targetY = Math.floor(returnXY[1] / 0.7) + imgY;


/**
 * 
 * @param {输入bytes类型的图片} img
 */
function superMan(img) {
    //>>>>>>>>基础设置<<<<<<<<<
    var username = 'mw03251214_2'  //超人云帐号
    var password = '003451jj'  //超人云密码
    var softid = '76206' //软件ID，在作者帐号后台设置，为图片长度和作者分成凭证
    // var baseurl = 'http://api2.sz789.net:88/' //简单图片识别接口，如常见字母，数字
    var baseurl = 'http://apib.sz789.net:88/'  //复杂图片识别接口，如滑动题，坐标题，计算题
    // var imgid = '' //由识别接口返回，用于报告错误识别结果

    //>>>>>>>>查询余额<<<<<<<<<
    // console.show();
    // var url = baseurl + 'GetUserInfo.ashx'
    // var res = http.post(url, {
    //     "username": username,
    //     "password": password
    // });
    // if (res.statusCode == 200) {
    //     var rjson = res.body.json();
    //     log('剩余点数为：' + rjson.left);
    // }
    // else {
    //     log('接口请求失败')
    // }
    //>>>>>>>>上传图片等待识别结果<<<<<<<<<
    /*读取图片至16进制字符串*/
    log("requests start")
    var sb = new java.lang.StringBuilder();
    var hex;
    for (var i = 0; i < img.length; i++) {
        hex = ((img[i] & 0xF0) >> 4).toString(16) + (img[i] & 0x0F).toString(16);
        sb.append(hex);
    }
    var imgdata = sb.toString();
    var url = baseurl + 'RecvByte.ashx';
    var res = http.post(url, {
        "username": username,
        "password": password,
        "softId": softid,
        "imgdata": imgdata
    })

    if (res.statusCode == 200) {
        var rjson = res.body.json();
        // log(rjson);
        log("识别结果:", rjson.result);
        // imgid = rjson.imgId
        // log(imgid);
    }
    else {
        log('接口请求失败');
    }
    toastLog("requests end");

    //>>>>>>>>报告错误(识别结果错误时调用)<<<<<<<<<
    /*** 
    var url = baseurl + 'ReportError.ashx'
    http.post(url,{"username":username,"password":password,"imgid":imgid})
    ***/
}

function 云闪付锦鲤活动() {
    var startTime, targetViewText, clickText;
    var appName = "云闪付";
    var timeArea = "北京时间";
    toastLog("到点点击");

    var currentWeekday = new Date().getDay();
    var counponText;
    // 返回的周日0 周一返回1，周二2
    switch (currentWeekday) {
        case 5:
            counponText = "满20可用";
            break;
        case 6:
            counponText = "满35可用";
            break;
        case 0:
            counponText = "满50可用";
            break;
    }

    targetViewText = func.dialogsWin(["每日券", "周五六日10点", "周五六日15点"]);
    var targetText, everyText;
    targetText = "线下指定商户";
    switch (targetViewText) {
        case "每日券":
            targetText = func.dialogsWin(["线下指定商户", "线上指定商户"]);
            startTime = "08,59,59,600";
            counponText = "满10可用"
            break;
        case "周五六日10点":
            startTime = "09,59,59,600";
            break;
        case "周五六日15点":
            startTime = "14,59,59,600";
            break;
    }
    func.toApp(appName);
    while (text("激励金提现").findOnce() == null) {
        // 如果能点击按钮，就等待设置文本
        if (func.sClick(id("rl_search_coupon").findOnce()) == true) {
            if (textContains("跳过").findOnce() == null) {
                text("历史记录").findOne();
                setText(0, "奖励中心");
                func.sClick(text("奖励中心").depth(16).findOne());
                func.sClick(text("奖励中心").depth(17).findOne());
            } else {
                sleep(600);
                continue;
            }
        }
    }

    var exWhile, clickItems, clickItem, itemParent, itemIndex, upItemText;
    exWhile = false;
    // 等待进入指定页面
    while (text("奖励中心").findOnce() == null) {
        toastLog("请跳转到 \" 奖励中心 \"，直到提示  已到达等待页面");
        sleep(800);
    }
    while (1) {
        try {
            clickItems = text(counponText).find();
            if (clickItems.nonEmpty()) {
                for (var i = 0; i < clickItems.length; i++) {
                    clickItem = clickItems[i];
                    itemIndex = clickItem.indexInParent();
                    itemParent = clickItem.parent();
                    upItemText = (itemParent.child(itemIndex + 1)).text();
                    log(upItemText);
                    if (upItemText == targetText) {
                        exWhile = true;
                        break;
                    }
                }
            }
            if (exWhile) {
                break;
            }
        }
        catch (e) {
            log("123");
        }
    }

    toastLog("已到达指定页面，等待");
    //  等待倒计时
    func.getTimeDiff(timeArea, startTime);
    // 点击进入 等待
    func.sClick(clickItem);
    text("优惠券到账后24小时内有效").findOne();
    func.sClick(text("立即领取").findOne());
    toastLog("已完成");
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