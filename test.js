auto.waitFor();
//toastLog(id("com.jd.lib.cashier.feature:id/cd").findOnce().click());
var func = require("func_list.js");
//test on laptop

什么值得买();

function 什么值得买() {
    let appName = "什么值得买";
    func.toApp(appName);
    let signBtn = null;
    while (signBtn == null) {
        signBtn = id("tv_login_sign").findOnce();
        func.sClick(id("tab_usercenter").text("我的").findOnce());
        sleep(800);
        func.sClick(idContains("close").findOnce());
        sleep(800);
        //func.passAd();
    }
    sleep(800);
    func.sClick(signBtn);
    sleep(1000);
    //textContains("已连续签到").findOne();
    toastLog(appName + "已签到");
    sleep(1200);
}

function 中信活动() {
    var appName = "动卡空间";
    var timeArea = "北京时间";
    var startTime, targetViewText;
    var actNames = ["10点-15点-9积分兑换", "周三六11点-5折必胜客百果园", "9积分捡漏"];
    var actName = func.dialogsWin(actNames);      // 设置查找的文本
    var couDes;    // 券描述列表
    var nowDate = new Date();
    var item_page_text = "价格: 1个权益+9个积分";
    switch (actName) {
        case "10点-15点-9积分兑换":
            toastLog("等待页面变化");
            // log(nowDate.getHours() <= 9);
            // 如果当前小时数 大于10，则是15点场
            if (nowDate.getHours() <= 9) {
                startTime = "09,59,52,000"
                couDes = ["App Store 充值卡20元", "迪士尼", "必胜客20元", "奈雪", "喜茶25元",
                    "苏宁支付券20元", "京东支付券20元", "天猫20元", "百果园20元", "滴滴出行20元", "美团外卖20元", "星巴克中杯饮品电子券"];
            } else {
                startTime = "14,59,53,000"
                couDes = ["【下午茶】喜茶25元抵用券（15点抢兑）"];
            }

            if (couDes.length == 1) {
                targetViewText = couDes[0];               // 设置查找的文本
            } else {
                targetViewText = func.dialogsWin(couDes);               // 设置查找的文本
            }

            func.toApp(appName);             // 启动APP
            var couClick = null;          // 找券
            while (couClick == null) {
                if (couDes == "星巴克中杯饮品电子券") {
                    couClick = text(targetViewText).findOnce();          // 找券
                } else {
                    couClick = textContains(targetViewText).findOnce();          // 找券
                }
                toastLog("请跳转到券 列表 页面，直到提示  已到达等待页面");
                sleep(1000);
            }
            // toastLog("已到达等待页面，提前15秒自动进入");
            toastLog("元素文本：" + couClick.text());
            func.getTimeDiff(timeArea, startTime);              // 等待到15秒的时候再进入
            func.sClick(couClick);              // 点击标签
            text(item_page_text).findOne();             // 等待进入指定页面
            toastLog("已到达指定页面，等待");
            //点击元素
            var to_pay = null;
            while (to_pay == null) {
                func.sClick(text("去兑换").findOnce());
                func.sClick(text("未开始").findOnce());
                sleep(100);
                to_pay = text("去支付").findOnce();
            }
            func.sClick(to_pay);
            toastLog("已点击，等待验证码");
            sleep(3000);
            break;
        case "周三六11点-5折必胜客百果园":
            toastLog("到点点击");
            startTime = "10,59,59,850";             // 设置时间点
            couDes = ["必胜客100元代金券", "达美乐50元代金券", "肯德基50元"];             // 券名称
            targetViewText = func.dialogsWin(couDes);               // 设置查找的文本
            func.toApp(appName);             // 启动APP
            // 等待进入指定页面
            var couClick = textContains(targetViewText).findOnce();
            while (!couClick) {
                couClick = textContains(targetViewText).findOnce();
                toastLog("请跳转到券 列表 页面，直到提示  已到达等待页面");
            }
            toastLog("元素文本：" + couClick.text());
            func.getTimeDiff(timeArea, startTime);              // 等待时间
            func.sClick(couClick);             // 点击元素
            // 点击元素
            while (func.sClick(text("确认").findOnce()) == false) {
                func.sClick(className("Button").text("立即购买").findOnce());
                func.sClick(className("Button").text("已售罄").findOnce());
                sleep(100);
            }
            // func.sClick(text("确认").findOne());
            toastLog("已点击，请确认结果");
            sleep(3000);
            break;
        case "9积分捡漏":
            appName = "动卡空间"
            var cnt = 0;
            couDes = ["App Store 充值卡20元", "迪士尼", "必胜客20元", "奈雪", "喜茶25元",
                "苏宁支付券20元", "京东支付券20元", "天猫20元", "百果园20元", "滴滴出行20元", "美团外卖20元"];
            targetViewText = func.dialogsWin(couDes);               // 设置查找的文本
            func.toApp(appName);             // 启动APP
            while (text(item_page_text).findOnce() == null) {
                sleep(100);
                cnt = cnt + 1;
                if (cnt >= 25) {
                    cnt = 0;
                    toastLog("请手动切换到要捡漏的商品页面");
                }
            }             // 等待进入指定页面
            nowDate = new Date();
            if (nowDate.getHours() <= 10) {
                startTime = "10,18,20,000"
            } else if (nowDate.getHours() >= 15) {
                startTime = "15,18,20,000"
            } else {
                startTime = "00,01,01,100"
            }
            func.getTimeDiff(timeArea, startTime);              // 等待时间
            sleep(300);
            var exWhile = false;
            // 门店查找方式
            if (text("适用门店").findOnce() != null) {
                while (1) {
                    if (func.sClick(text("去兑换").findOnce())) {
                        func.sClick(text("去支付").findOne());
                        while (1) {
                            if (text("适用门店").findOnce() != null) {
                                exWhile = false
                                break;
                            }
                            if (text("交易时间").findOnce() != null) {
                                exWhile = true
                                break;
                            }
                        }
                        if (exWhile) { break; }
                    }
                    if (func.sClick(text("适用门店").findOnce())) {
                        className("EditText").depth(14).findOne();
                        back();
                        sleep(400);
                    }
                    sleep(150);
                }
            } else {
                var item = null;
                // 无门店查找
                while (1) {
                    if (func.sClick(text("去兑换").findOnce())) {
                        func.sClick(text("去支付").findOne());
                        while (1) {
                            if (text("适用门店").findOnce() != null) {
                                exWhile = false
                                break;
                            }
                            if (text("交易时间").findOnce() != null) {
                                exWhile = true
                                break;
                            }
                        }
                        if (exWhile) { break; }
                    } else {
                        back();
                        item = textContains(targetViewText).depth(17).findOnce();
                        cnt = 0;
                        while (item == null) {
                            item = textContains(targetViewText).depth(17).findOnce();
                            sleep(50);
                            scrollDown(0);
                            cnt = cnt + 1;
                            // 滑动3次就手动滑动一次
                            if (cnt >= 3) {
                                swipe(500, 850, 500, 600, 100);
                                cnt = 0;
                            }
                            sleep(50);
                            func.sClick(text("点击查看更多").findOnce());
                            sleep(50);
                        }
                        func.sClick(item);
                        text(item_page_text).findOne();
                    }
                    sleep(150);
                }
            }
    }
}

function 招商() {
    this.饭票签到 = function () {
        func.toAutojs();
        var url_招商饭票签到 = "cmbmobilebank://cmbls/functionjump?action=gocorpno&corpno=100856&cmb_app_trans_parms_start=here&param=v2&appflag=0"
        app.startActivity({
            action: "android.intent.action.VIEW",
            data: url_招商饭票签到,
        });
        var today;
        today = text("今日").depth(12).findOne();
        sleep(1500);
        func.sClick(today.parent().parent().child(1));
        toast("已点击打卡领饭票,等待5s");
        sleep(5000);
        // 判断如果还在饭票页面则说明 已经打过卡
        if (text("每周一到周五打卡浏览指定页面，打卡当天可获得一次抽奖机会").findOnce() == null) {
            back();
        }
        toast("今日已打卡");
        sleep(3000);
    }
    this.便民生活 = function () {
        func.toAutojs();
        var appName = "招商银行";
        var url_招商便民 = "cmbmobilebank://cmbls/functionjump?action=gocorpno&corpno=791166&cmb_app_trans_parms_start=here&channel=share&appflag=0";
        app.startActivity({
            action: "android.intent.action.VIEW",
            data: url_招商便民,
        });
        // 等待手势密码加载
        id("vGestureContentView").findOne();
        sleep(500);
        func.gesture_pwd(appName);
        sleep(2000);
        var my_energy, get_energy;
        while (text("查询我的公积金").findOnce() == null) {
            my_energy = text("我的能量：").findOnce();
            if (my_energy != null) {
                get_energy = my_energy.parent().parent().child(2);
                sleep(1200);
                func.sClick(get_energy);
            }
            sleep(2000);
        }
        sleep(2000);
        var plus30, plus_parent, plus_parent_childcount;
        var sign_btn, sign_text;

        plus30 = text("+30").depth(14).findOne();
        plus_parent = plus30.parent().parent();
        plus_parent_childcount = plus_parent.childCount();
        sign_btn = plus_parent.child(plus_parent_childcount - 1);
        sleep(1200);
        if (sign_btn.childCount() != 0) {
            sign_text = sign_btn.child(0).text();
            if (sign_text == "去签到") {
                func.sClick(sign_btn);          // 点击签到
                while (text("服务大厅").findOnce() == null) {
                    toast("已点击，等待服务大厅加载");
                    sleep(2500);
                }
                toast("服务大厅 已加载");
                sleep(3000);
                back();
                toast("返回，等待领取");
                while (sign_text == "去签到") {
                    plus30 = text("+30").depth(14).findOnce();
                    if (plus30 != null) {
                        plus_parent = plus30.parent().parent();
                        plus_parent_childcount = plus_parent.childCount();
                        sign_btn = plus_parent.child(plus_parent_childcount - 1);
                        sign_text = sign_btn.child(0).text();
                    }
                    sleep(1000);
                }
                func.sClick(sign_btn);      // 点击领取
                toast("已点击领取");
                sleep(2000);
            }
        }
        toastLog("便民生活, 已签到");
        sleep(3000);
    }
    return this;
}

// func.sClick(idContains("radio_button5").findOnce());



// 浦发金豆签到
function 浦发银行() {
    this.ppf = function () {
        toastLog(123)
    }
    this.ppb = function () {
        toastLog(456)
    }
    return this;
}

// // 问题解决了，参照（http://www.cocoachina.com/bbs/read.php?tid-1689677.html ）用urlscheme跳转京东某个商品页面可行！
// //            String url = "https://item.jd.com/231023.html";
// 产品ID = "66144896261";
// // url = "openapp.jdMobile://virtual?params=%7B%22sourceValue%22:%220_productDetail_97%22,%22des%22:%22productDetail%22,%22skuId%22:%22" + 产品ID + "%22,%22category%22:%22jump%22,%22sourceType%22:%22PCUBE_CHANNEL%22%7D";

// // url = "openapp.jdpingou://virtual?params=%7B%22sourceValue%22:%220_productDetail_97%22,%22des%22:%22productDetail%22,%22skuId%22:%22" + 产品ID + "%22,%22category%22:%22jump%22,%22sourceType%22:%22PCUBE_CHANNEL%22%7D";

// // 惊喜
// url = "openapp.jdpingou://virtual?params=%7B%22des%22%3A%22m%22%2C%22url%22%3A%22https%3A%2F%2Fitem.m.jd.com%2Fitem%2Fjxview%3Fsku%3D" + 产品ID + "%22%2C%22category%22%3A%22jump%22%7D"
// app.startActivity({
//     action: "android.intent.action.VIEW",
//     data: url,
// });

function 品牌墙() {
    var find_text, find_object, find_object_index, find_object_parent;	// 定义查找的变量
    find_text = "到底了，没有更多了～"
    var click_index;
    click_index = 0;
    while (1) {
        find_object == null
        while (find_object == null) {
            toastLog("等待 " + find_text + " 加载");
            sleep(2500);
            find_object = text(find_text).findOnce();
        }
        find_object_parent = find_object.parent();
        find_object_index = find_object.indexInParent();
        var brands;
        brands = find_object_parent.child(find_object_index - 1).child(1);
        // 如果点击成功，延迟8秒 后返回
        if (func.sClick(brands.child(click_index))) {
            toastLog("等待跳转，然后返回");
            sleep(2500);
            toastLog("等待跳转，然后返回");
            sleep(2500);
            toastLog("等待跳转，然后返回");
            sleep(2500);
            toastLog("等待跳转，然后返回");
            sleep(2500);
            back();
            click_index = click_index + 1;
            // 等待返回
            find_object = text(find_text).findOne();
            toastLog("已返回...");
            sleep(2500);
        }
        if (click_index >= 5) {
            break;
        }
        // 1. 等待品牌墙页面加载
        // 2. 查找品牌，索引1，2，3

        // 3. 完成后back
        // 4. 检测首页，如是，直接执行banna启动
    }
    click_index = 20;
    while (click_index--) {
        scrollUp();
        sleep(random_second(900, 100, 300));
    }
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