auto.waitFor();
// 导入模块
var func = require("func_list.js");
var cfg = func.config_dict();

main();
// toastLog(text("领取奖励").find().length);
function main() {
    let selectedArr = ["芭芭农场", "万商3比", "ZFB捐款", "余额宝转出", "余额宝转入", "京东评价", "跳转指定Scheme"];
    //---------------配置区域-----------------
    let scriptName = func.dialogsWin(selectedArr);      // 设置查找的文本  
    if (scriptName == "建行财富季") { 建行财富季(); }
    else if (scriptName == "ZFB捐款") { ZFB捐款(); }
    else if (scriptName == "余额宝转入") { let zfb = 支付宝(); zfb.余额宝转入(); }
    else if (scriptName == "余额宝转出") { let zfb = 支付宝(); zfb.余额宝转出(); }
    else if (scriptName == "跳转指定Scheme") { 跳转指定Scheme(); }
    else if (scriptName == "京东评价") { 京东评价(); }
    else if (scriptName == "万商3比") { 万商3比(); }
    else if (scriptName == "芭芭农场") { 芭芭农场(); }
}

function 芭芭农场() {
    let obj = {
        arr_in_text: function (target_str, arr) {
            for (let i = 0; i < arr.length; i++) {
                if (target_str.indexOf(arr[i]) != -1) {
                    return true;
                }
            }
            return false;
        },
        in_mission_view: function () {
            if (currentPackage() == "com.taobao.taobao") {
                if (text("做任务赢奖励").depth(14).findOnce() == null) {
                    return false;
                } return true;
            } else {
                if (text("今天").depth(21).findOnce() == null) {
                    return false;
                } return true;
            }
        },
        unitl_in_mission_view: function () {
            while (!obj.in_mission_view()) {
                toastLog("请手动跳转到农场任务界面");
                func.sClick(text("A*ccswT6bSKCsAAAAAAAAAAAAAARQnAQ").findOnce());
                sleep(2000);
            }
            toastLog("已到达农场任务界面");
        },
        to_zfb: function () {
            setClip("小手、一抖领~~肥~~料~~ https://mobile.alipay.com/s7blGEP72ln#一起互相助力，复~制本消、息去支付宝首页看看，你也会领肥~料一起来种真水果");
            sleep(1500);
            func.to_app("支付宝");
            func.sClick(text("去看看").findOne());
            let help_for_her, help_parent;
            help_for_her = text("为Ta助力").findOne();
            help_parent = help_for_her.parent().parent();
            func.sClick(help_parent.child(help_parent.childCount() - 1));
        },
        to_tb: function () {
            setClip("0嘻地要中好他么对多下到好信🍑{Ьáò或点几url链 https://m.tb.cn/h.f9BE0MW?sm=624352 至浏览er【╭ァ菓樹⒐筷種好ロ拉℅！壹定要️啊！】");
            sleep(1500);
            func.to_app("手机淘宝");
            func.sClick(desc("查看详情").findOne());
            let help_for_her, help_parent;
            while (1) {
                help_for_her = text("为TA助力").findOnce();
                if (help_for_her == null) {
                    help_for_her = text("去种果树").findOnce();
                }
                if (help_for_her != null) { break; }
                sleep(2000);
            }
            help_parent = help_for_her.parent().parent();
            func.sClick(help_parent.child(help_parent.childCount() - 1));
        },
        view_15_second: function () {
            sleep(5000);
            swipe(500, 800, 500, 600, 200);
            toastLog("已滑动，等待15秒");
            sleep(17000);
            toastLog("完成，准备返回");
            while (obj.in_mission_view() == false) {
                back();
                sleep(4000);
            }
            toastLog("已返回...");
        }
    }
    // 支付宝
    let work = {
        tb: function () {
            obj.to_tb();
            let click_text;
            click_text = ["去浏览", "去完成", "去逛逛"];
            let todo_text, todo_btn, todo_idx, step, todo_btn_text;
            todo_idx = 8;
            step = 1;
            obj.unitl_in_mission_view();
            sleep(2000);
            while (1) {
                views = className("ListView").findOnce();
                if (views == null) { break; }
                if (todo_idx + 1 >= views.childCount() - 1) { break; }
                log("当前todo_idx=" + todo_idx);
                todo_btn = views.child(todo_idx).child(1);
                todo_btn_text = todo_btn.text();
                todo_text = views.child(todo_idx).child(0).child(1).child(0).text();
                if (obj.arr_in_text(todo_text, ["秒"]) && click_text.indexOf(todo_btn_text) != -1) {
                    log(todo_text);
                    func.sClick(todo_btn);
                    while (obj.in_mission_view()) { toastLog("等待任务视图消失"); sleep(2500); }
                    toastLog("Mission 视图已消失");
                    obj.view_15_second();
                    sleep(2500);
                } else {
                    todo_idx = todo_idx + step;
                    log("todo_idx 增加 step");
                    sleep(300);
                }
            }
            click("领取");
            sleep(2000);
            alert("已完成");
        },
        zfb: function () {
            obj.to_zfb();
            let click_text;
            click_text = ["去浏览", "去完成", "去逛逛"];
            let todo_text, todo_btn, todo_idx, step, todo_btn_text;
            todo_idx = 1;
            step = 4
            obj.unitl_in_mission_view();
            sleep(2000);
            while (1) {
                views = className("android.view.View").scrollable(true).findOnce();
                if (views == null) { break; }
                if (todo_idx + 3 >= views.childCount() - 1) { break; }
                log("当前todo_idx=" + todo_idx);
                todo_btn = views.child(todo_idx + 3).child(0);
                todo_btn_text = todo_btn.text();
                todo_text = views.child(todo_idx + 2).text();
                if (obj.arr_in_text(todo_text, ["秒"]) && click_text.indexOf(todo_btn_text) != -1) {
                    log(todo_text);
                    func.sClick(todo_btn);
                    while (obj.in_mission_view()) { toastLog("等待任务视图消失"); sleep(2500); }
                    toastLog("Mission 视图已消失");
                    obj.view_15_second();
                    sleep(2500);
                } else {
                    todo_idx = todo_idx + step;
                    log("todo_idx 增加 step");
                    sleep(300);
                }
            }
            click("领取");
            sleep(2000);
            alert("已完成");
        }
    }
    let select_item = func.dialogsWin(["淘宝", "支付宝"])
    if (select_item == "淘宝") {
        work.tb();
    } else {
        work.zfb();
    }
}


function 万商3比() {
    var now, h, m;
    now = new Date();
    h = now.getHours();
    m = now.getMinutes();
    if (h >= 7 && h <= 18) {
        if (m >= 39 && m <= 50) {
            alert("宾馆不刷，退出");
            exit();
        }
    } else if (h >= 19 && h <= 22) {
        if (m >= 19 && m <= 30) {
            alert("宾馆不刷，退出");
            exit();
        }
    } else if (h >= 23 || h <= 6) {
        if ((m >= 49 && m <= 60) || (m >= 9 && m <= 20)) {
            alert("宾馆不刷，退出");
            exit();
        }
    }
    var count, inputVal, appName;
    count = dialogs.rawInput("请输入次数", 3);
    numRange = func.dialogsWin(["11-15", "16-20", "20-23"]);
    appName = "万商云";
    var min, max;
    min = numRange.substring(0, 2) * 1;
    max = numRange.substring(3, 5) * 1;
    func.to_app(appName);
    sum = 0;
    while (count > 0) {
        inputVal = func.randomNum(min, max, digit = 1);
        sum = sum + inputVal * 10
        while (text("请输入收款金额").findOnce() == null) {
            func.sClick(id("home_qrcodepay").findOnce());
            if (text("请绘制手势密码登录").findOnce()) {
                sleep(1000);
                func.gesture_pwd(appName);
                sleep(4000);
            }
            func.sClick(text("扫一扫").findOnce());
            sleep(500);
            // 如果找到信用卡认证，则点击关闭
            func.sClick(idContains("cancel").findOnce());
        }
        setText(inputVal);
        sleep(500);
        while (text("将二维码/条码放入框内，即可自动扫描").findOnce() == null) {
            func.sClick(text("确定").findOnce());
            sleep(500);
        }
        while (text("支付成功！").findOnce() == null) {
            sleep(2000);
        }
        sleep(1000);
        back();
        count = count - 1;
    }
    alert("已完成,共计:" + sum / 10 + "元");
}

function 京东评价() {
    if (!requestScreenCapture()) {
        toast("请求截图失败");
        exit();
    }
    toastLog("请求截图成功");
    sleep(1000);

    // 1. 跳转评价中心
    func.to_scheme(cfg["url_scheme"]["京东"]["评价中心"]);
    // 2. 判断是否到达评价页面
    while (className("TextView").text("已评价/追评").findOnce() == null) { toastLog("未到达,评价界面"); sleep(2500); }
    while (text("待评价").findOne().parent().child(1).text() != "· 1") {
        // 3. 点击评价商品
        func.sClick(className("TextView").text("评价").findOne().parent().parent());
        // fullId = com.jd.lib.evaluatecenter.feature:id/dm =>text == text = · 47
        // fullId = com.jd.lib.evaluatecenter.feature:id/m8,text = 评价
        // items = className = android.widget.ListView, fullId = android:id/list =>list[1]
        // 4. 确保到达商品页面 下滑获取评价按钮
        className("TextView").text("购物车").findOne();
        sleep(1000);
        scrollDown();
        sleep(2500);
        text("评价").findOne().parent().click();
        // 5. 判断到评价详情界面
        // while (textStartsWith("按").textEndsWith("查看评价").findOnce() == null) { toastLog("未到达,评价详情"); sleep(2500); }
        while (className("RatingBar").depth(20).findOnce() == null) { toastLog("未到达,评价详情"); sleep(2500); }
        toastLog("到达商品评价处");
        sleep(2500);
        // 记录评论内容
        let comment_text_b, comment_text, comment = null;
        while (comment == null) {
            try {
                comment = textStartsWith("按").textEndsWith("查看评价").findOnce().parent().parent().parent().parent().parent().child(1).child(1).child(0).child(0).child(1).child(0).child(0);
                sleep(800);
            } catch (e) {
                sleep(500);
                continue;
            }
        }
        comment_text = comment.text();
        // 6. 选择是否有图
        let pic_video, has_pic;
        pic_video = className("android.widget.CheckBox").textContains("图/视频").findOnce();
        if (pic_video == null) { has_pic = false } else {
            has_pic = true;
            func.sClick(pic_video);
            toastLog("已点击 图/视频 按钮");
            sleep(2500);
            comment = null;
            while (comment == null) {
                try {
                    comment = textStartsWith("按").textEndsWith("查看评价").findOnce().parent().parent().parent().parent().parent().child(1).child(1).child(0).child(0).child(1).child(0).child(0);
                    sleep(800);
                } catch (e) {
                    sleep(500);
                    continue;
                }
            }
            comment_text_b = comment.text();
            if (random(0, 9) >= 5) {
                comment_text = comment_text_b;
            }
        };
        // textContains("图/视频").findOne().click()

        // 7. 没图就复制文案，有图就截屏
        let big_pic, pic_text, cur_pic, all_pic;
        let height, width, x, y;
        if (has_pic) {
            func.sClick(comment);
            toastLog("已点击第一条评价");
            // 有图：最新排序.parent.parent.parent.parent.parent.child(1).child(1)
            // 8 判断到达评价详情
            text("  说点儿什么呗~").findOne();
            sleep(1000);
            // 9. 获取文本
            // fullId = com.jd.lib.evaluatecenter.feature:id/g5，depth = 9
            // 点击图片
            func.sClick(className("RatingBar").findOnce().parent().parent().parent().child(3).child(0));
            // className = android.widget.ImageView，depth = 9
            height = device.height;
            width = device.width;
            x = 0;
            y = Math.floor(height / 6);
            height = Math.floor(height / 4 * 3);
            big_pic = textContains("1/").findOne();
            toastLog("已打开大图");
            sleep(2500);
            pic_text = big_pic.text();
            cur_pic = pic_text.substring(0, 1);
            all_pic = pic_text.substring(pic_text.length - 1);
            log("cur_pic:" + cur_pic);
            log("all_pic:" + all_pic);
            if (all_pic > 8) { all_pic = 8; }
            // className = android.widget.ImageButton，depth = 5，fullId = com.jd.lib.evaluatecenter.feature:id/b2
            let img, img_clip, file_path;
            while (cur_pic <= all_pic) {
                // 截屏
                img = images.captureScreen();
                img_clip = images.clip(img, x, y, width, height);
                file_path = path_date_string();
                images.save(img_clip, file_path);
                // app.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, android.net.Uri.fromFile(java.io.File(file_path))));        //刷新图库
                media.scanFile(file_path);
                swipe(width - 1, y, 100, y, 300);
                cur_pic = cur_pic * 1 + 1;
                log("cur_pic in:" + cur_pic);
                sleep(1500);
            }
            toastLog("截屏完成");
            sleep(2500);
        } else {
            toastLog("无图片，直接返回");
            sleep(2500);
        }
        // 返回到评价页面，点击评价
        while (className("TextView").text("已评价/追评").findOnce() == null) { back(); toastLog("未到达评价界面"); sleep(3500); }
        // 点击评价商品
        func.sClick(className("TextView").text("评价").findOne());
        // 等待商品评价页面加载
        textStartsWith("/").textEndsWith("京豆").findOne();
        sleep(1500);
        // 点击所有rate
        className("android.widget.RatingBar").findOne();
        let rating_bars, rating_count, cur_rate = 0;
        rating_bars = className("android.widget.RatingBar").find();
        rating_count = rating_bars.length;
        while (cur_rate < rating_count) {
            rate_click(rating_bars[cur_rate]);
            toastLog("点击第" + (cur_rate + 1) + "个星级");
            sleep(1000);
            if (cur_rate == 0) { scrollDown(); sleep(800); scrollDown(); sleep(800); scrollDown(); sleep(800); }
            rating_bars = null;
            while (rating_bars == null) {
                rating_bars = className("android.widget.RatingBar").find();
                sleep(800);
            }
            cur_rate = cur_rate + 1;
        }
        // 设置文本
        setText(comment_text);
        toastLog("设置文本完成");
        sleep(1500);
        if (has_pic) {
            // 点击选择图片
            func.sClick(textContains("添加图片").findOnce());
            className("android.widget.TextView").depth(6).text("最近添加").findOne();
            sleep(1000);
            let img_list, img_cnt;
            img_cnt = 2;
            while ((img_cnt - 1) <= all_pic) {
                img_list = className("android.widget.ImageView").find();
                if (img_list.nonEmpty()) {
                    func.sClick(img_list[img_cnt].parent().child(1));
                    sleep(800);
                    img_cnt = img_cnt + 1
                } else { continue; }
            }
            // func.sClick(className("android.widget.ImageView").find()[3].parent().child(1))
            //点击下一步 =》 完成
            func.sClick(textContains("下一步").findOne());
            sleep(1500);
            func.sClick(textContains("完成").findOne());
            sleep(1500);
        }
        // 返回商品评价页面
        textStartsWith("/").textEndsWith("京豆").findOne();
        // 检查评价京豆是否已满
        let beans_a, beans_b, text_a, text_b;
        beans_a = textContains("京豆").findOne();
        beans_b = beans_a.parent().child(0);
        text_a = beans_a.text().substring(1, 3);
        text_b = beans_b.text();
        if (text_a != text_b) {
            alert("豆子未满，请检查 是否有误，并手动提交");
        } else {
            // 提交
            while (!func.sClick(textContains("提交").findOnce())) {
                toastLog("未成功，点击提交");
                sleep(2500);
            }
            toastLog("已成功，点击提交");
            sleep(2500);
            // 评价成功    
        }
        while (text("评价成功，感谢您！").findOnce() == null) {
            if (func.sClick(text("确认提交").findOnce())) { sleep(1500); }
            // if (func.sClick(text("提交").findOnce())) { sleep(1500); }
            sleep(1000);
        }
        toastLog("评价已完成，等待返回");
        sleep(2500);
        // 返回到评价页面，点击评价
        while (className("TextView").text("已评价/追评").findOnce() == null) { back(); toastLog("未到达评价界面"); sleep(3500); }
    }
    // 评价成功    text = 评价成功，感谢您！
}

function rate_click(element) {
    if (element != null) {
        if (!element.click()) {
            click(element.bounds().right - 1, element.bounds().centerY());
        }
        return true;
    }
    return false;
}

function path_date_string() {
    let dev_brand = device.brand;
    if (dev_brand == "HUAWEI" || dev_brand == "honor") { save_path = "/sdcard/Pictures/Screenshots/Screenshot_" }
    else if (dev_brand == "xiaomi") { save_path = "/sdcard/DCIM/screenshots/IMG_" }
    let dt, monthes, dates, hours, minutes, seconds;
    dt = new Date();
    monthes = dt.getMonth() + 1;
    dates = dt.getDate();
    hours = dt.getHours();
    minutes = dt.getMinutes();
    seconds = dt.getSeconds();
    if (monthes < 10) { monthes = "0" + monthes } else { monthes = monthes.toString(); }
    if (dates < 10) { dates = "0" + dates } else { dates = dates.toString(); }
    if (hours < 10) { hours = "0" + hours } else { hours = hours.toString(); }
    if (minutes < 10) { minutes = "0" + minutes } else { minutes = minutes.toString(); }
    if (seconds < 10) { seconds = "0" + seconds } else { seconds = seconds.toString(); }
    return (save_path + dt.getFullYear().toString() + monthes + dates + "-" + hours + minutes + seconds + ".png");
}


function 跳转指定Scheme() {
    let obj, obj_key;
    obj = cfg["url_scheme"];
    while (typeof (obj) != "string") {
        obj_key = func.dialogsWin(Object.keys(obj));
        obj = obj[obj_key];
    }
    func.to_scheme(obj);

}


function 支付宝() {
    this.余额宝转出 = function () {
        func.to_scheme(cfg["url_scheme"]["支付宝"]["余额宝"]);
        while (text("使用密码").findOnce() == null) {
            func.sClick(text("转出").findOnce());
            if (func.sClick(text("全部").findOnce()) == true) {
                sleep(1500);
                func.sClick(text("确认转出").findOnce());
            }
            sleep(100);
        }
        toastLog("已完成。。。");
    }
    this.余额宝转入 = function () {
        func.to_scheme(cfg["url_scheme"]["支付宝"]["余额宝"]);
        let pwd = "188";
        while (text("使用密码").findOnce() == null) {
            func.sClick(text("转入").findOnce());
            if (textContains("转入金额").findOnce() != null) {
                while (text("确定").rowSpan(2).depth(16).findOnce() == null) {
                    func.sClick(text("请输入转入金额").findOnce());
                    toastLog("已尝试点击 输入金额框");
                    sleep(3000);
                }
                sleep(3000);
                for (let i = 0; i < pwd.length; i++) {
                    log(pwd[i]);
                    text(pwd[i]).findOne().click();
                    sleep(500);
                }
                sleep(1500);
                if (func.sClick(text("确认转入").findOnce())) {
                    sleep(1500);
                }
            }
            sleep(300);
        }
        toastLog("已完成。。。");
    }
    this.ZFB捐款 = function () {
        var defaultCount, count, cardNum, banks;
        banks = func.dialogsWin(["渣打5比", "交行3比"])
        switch (banks) {
            case "渣打5比":
                cardNum = "(9101)";
                defaultCount = 5;
                break;
            case "交行3比":
                cardNum = "(5629)";
                defaultCount = 3;
                break;
        }
        count = dialogs.rawInput("请输入捐款次数", defaultCount);
        func.to_app("支付宝");
        var cnt = 1;
        sleep(1000);
        while (count > 0) {
            while (text("项目介绍").findOnce() == null) {
                toastLog("请跳转到 捐赠项目 界面...");
                sleep(2500);
            }
            while (1) {
                if (func.sClick(text("单笔捐").findOnce())) {
                    break;
                }
                if (func.sClick(text("再捐一笔").findOnce())) {
                    break;
                }
            }
            text("《支付宝爱心捐赠协议》").findOne();
            sleep(800);
            func.sClick(className("EditText").findOnce());
            sleep(800);
            setText(0, "0.01");
            sleep(800);
            func.sClick(text("匿名捐款").findOne());
            sleep(800);
            func.sClick(text("同意协议并捐款").findOne());
            text("立即付款").findOne();
            sleep(800);
            while (textContains(cardNum).findOnce() == null) {
                func.sClick(text("付款方式").findOnce());
                if (text("选择付款方式").findOnce() != null) {
                    sleep(800);
                    if (func.cClick(text(cardNum).findOnce()) == false) {
                        scrollDown();
                        sleep(800);
                    } else {
                        toastLog("已选择银行卡，等待...");
                        sleep(3200);
                    }
                }
            }
            func.sClick(text("立即付款").findOne());
            text("支付成功").findOne();
            sleep(1200);
            func.sClick(text("完成").findOne());
            text("感谢捐助").findOne();
            sleep(1500);
            back();
            toastLog("已完成第 " + cnt + " 次...");
            cnt = cnt + 1;
            sleep(2500);
            count = count - 1;
        }
        alert("已完成");
    }

    return this;
}
// -----------------------建行财富季-----------------------
function 建行财富季() {
    func.to_appMulti("微信", 1);
    龙支付_戳泡泡();
    // 龙支付_日常任务();
    func.to_appMulti("微信", 2);
    龙支付_戳泡泡();
    // 龙支付_日常任务();
    alert("已完成");
    // 日常任务
    // 消保 答题
    // 外汇答题
    // 消保 眼力
}

function 龙支付_日常任务() {
    var checkText = "每日签到涨财富";
    var see, seeText;
    seeText = "去完成";
    while (text(checkText).findOnce() == null) {
        toastLog("请跳转到龙支付 每日签到涨财富 界面");
        sleep(2000);
    }
    func.sClick(text("立即签到").findOnce());
    toastLog("已到达 龙支付 每日签到涨财富 界面");
    sleep(2000);
    see = text(seeText).find();
    while (see.nonEmpty()) {
        // 判断除邀请任务外是否都已经完成
        if (see.length > 1) {
            func.sClick(see[0]);                // 点击第一个元素
            // 如果还能找到 每日签到涨财富,则等待
            while (text(checkText).findOnce() != null) {
                sleep(800);
            }
            log("LZF 每日签到涨财富 已消失");
            sleep(2000);
            back();
            sleep(2500);                        // 返回
            // 检查是否已返回
            while (text(checkText).findOnce() == null) {
                if (func.sClick(text("拒绝").findOnce())) { sleep(2000); }
                if (func.sClick(text("否").findOnce())) { sleep(2000); }
                back();
                sleep(3000);
            }
            sleep(800);
            log("LZF 每日签到涨财富 已找到");
            func.sClick(text("领取奖励").findOne());   // 点击领取奖励
            sleep(5000);
            see = text(seeText).find();        // 重新检索
        } else {
            break;
        }
    }
    toastLog(checkText + "，已完成！");
}

function 龙支付攒财富_浏览(keyWord) {

    var checkText = "龙支付5周年 “5”限畅享";
    var see, seeText, refreshCnt;
    refreshCnt = 0;
    seeText = "去看看";
    // 如果没找到则刷新一下
    while (text(seeText).findOnce() == null) {
        WX_刷新();
        refreshCnt = refreshCnt + 1;
        if (refreshCnt > 3) {
            break;
        }
    }
    // 避免bug，刷新3次
    see = text(seeText).find();
    while (see.nonEmpty()) {
        func.sClick(see[0]);       // 点击最后一个去看看
        // 如果还能找到 龙支付分会场,则等待
        while (text(checkText).findOnce() != null) {
            sleep(800);
        }
        toastLog("LZF 会场 已消失");
        sleep(2200);
        back();                             // 返回
        // 检查是否已返回
        while (text(checkText).findOnce() == null) {
            // 如果点击了 获取位置的否，需要等待1秒，再返回
            if (func.sClick(text("否").findOnce()) == true) {
                sleep(1000);
                back();
            }
        }
        sleep(1000);
        log("LZF 会场 已找到");
        if (keyWord != undefined) {
            func.sClick(text(keyWord).findOne());   // 点击关键字
        }
        sleep(1500);
        see = text(seeText).find();        // 重新检索
    }
}

function 龙支付_戳泡泡() {

    var checkText = "龙支付5周年 “5”限畅享";
    while (text(checkText).findOnce() == null) {
        toastLog("请跳转到龙支付 攒财富 界面");
        sleep(2000);
    }
    toastLog("已到达 龙支付 攒财富 界面");
    sleep(2000);
    龙支付攒财富_浏览();
    // 切换到主会场
    // var refresh, main_place;
    // refresh = true;
    // sleep(1000);
    // while (text("每日签到涨财富").findOnce() == null) {
    //     main_place = textEndsWith("次机会 >").findOnce();
    //     if (main_place != null) {
    //         if (func.sClick(main_place.parent().child(1))) {
    //             toastLog("已点击 主会场 按钮，等待切换");
    //             refresh = false;
    //             sleep(4000);
    //         }
    //     } else {
    //         if (refresh) {
    //             WX_刷新();
    //         }
    //     }
    //     // func.sClick(className("android.view.View").text("/").depth(22).findOnce());
    //     if (func.sClick(text("做任务").findOnce())) {
    //         refresh = false;
    //     }
    //     sleep(2000);
    // }
    sleep(1000);
}

function 龙支付_攒财富() {
    var checkText = "龙支付5周年 “5”限畅享";
    var keyList;
    keyList = ["在路上", "商超日", "乐活日"];
    while (text(checkText).findOnce() == null) {
        toastLog("请跳转到龙支付 攒财富 界面");
        sleep(2000);
    }
    toastLog("已到达 龙支付 攒财富 界面");
    sleep(2000);
    keyList.forEach(keyWord => {
        func.sClick(text(keyWord).findOne());   // 点击关键字
        sleep(2000);
        龙支付攒财富_浏览(keyWord);
    })
    // 切换到主会场
    var refresh;
    refresh = true;
    sleep(1000);
    while (text("每日签到涨财富").findOnce() == null) {
        if (func.sClick(text("btn_1").findOnce())) {
            toastLog("已点击 主会场 按钮，等待切换");
            refresh = false;
            sleep(4000);
        } else {
            if (refresh) {
                WX_刷新();
            }
        }
        // func.sClick(className("android.view.View").text("/").depth(22).findOnce());
        if (func.sClick(text("做任务").findOnce())) {
            refresh = false;
        }
        sleep(2000);
    }
    sleep(1000);
}
// -----------------------建行财富季-----------------------

function WX_刷新() {
    toastLog("刷新");
    // func.sClick(id("com.tencent.mm:id/kl1").findOne());
    func.sClick(desc("更多信息").findOne());
    sleep(2000);
    func.sClick(text("刷新").findOne());
    sleep(2000);
}