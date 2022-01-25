auto.waitFor();
// 导入模块
var func = require("func_list.js");
var cfg = func.config_dict();
var dev_model = device.model;
var dev_mate30, dev_honor8, dev_redmi;
dev_mate30 = "TAS-AL00";
dev_honor8 = "FRD-AL00";
dev_redmi = "Redmi Note 7";

main();
// toastLog(text("领取奖励").find().length);
function main() {
    let select_func;
    let selectedArr = ["万商3比", "ZFB相关", "JD相关", "YSF相关", "跳转指定Scheme"];
    //---------------配置区域-----------------
    let scriptName = func.dialogs_select(selectedArr);      // 设置查找的文本  
    if (scriptName == "建行财富季") { 建行财富季(); }
    else if (scriptName == "ZFB相关") {
        select_func = func.dialogs_select(["芭芭农场-小号互助", "芭芭农场-支付宝淘宝浏览", "芭芭农场-淘宝施肥", "ZFB捐款", "余额宝转出", "余额宝转入"]);
        if (select_func == "ZFB捐款") { 支付宝().ZFB捐款(); }
        else if (select_func == "余额宝转入") { 支付宝().余额宝转入(); }
        else if (select_func == "余额宝转出") { 支付宝().余额宝转出(); }
        else if (select_func == "芭芭农场-小号互助") { 芭芭农场().zfb助力(); 芭芭农场().tb助力(); }
        else if (select_func == "芭芭农场-支付宝淘宝浏览") { 芭芭农场().tb(); 芭芭农场().zfb(); }
        else if (select_func == "芭芭农场-淘宝施肥") { 芭芭农场().tb施肥(); }
    }
    else if (scriptName == "JD相关") {
        select_func = func.dialogs_select(["京东评价"]);
        if (select_func == "极速版挖宝") { jd().极速版挖宝(); }
        else if (select_func == "京东评价") { jd().京东评价(); }
    }
    else if (scriptName == "YSF相关") {
        select_func = func.dialogs_select(["YSF福气助力"]);
        if (select_func == "YSF福气助力") { ysf().YSF福气助力(); }
    }
    else if (scriptName == "跳转指定Scheme") { 跳转指定Scheme(); }
    else if (scriptName == "万商3比") { 万商3比(); }
    alert("已完成...");
}

function ysf() {
    let obj = {
        YSF福气助力: function () {
            let url_head, url_end;
            url_head = "upwallet://applet?toLink=https%3A%2F%2Fyouhui.95516.com%2Fnewsign%2Fysfsfq%2Findex.html%3FuserId%3D";
            url_end = "%26greetingId%3D1%26baifuId%3D1&encryptAppId=46411c55b29f8b49&scenarioId=1006";
            url_dict = {
                "JJ-MATE30": "cb895525e54c56e009b24face50d5a814ba088",
                "luyi1": "cb895525e54c50e709b249a0ea0458814aad8a",
                "luyi2": "cb895525e64a55e104b54aa1e00c58804dae84",
                "luyi3": "cb895525e54c50e104b74ea5e50c5b8c4da088",
                "luyi4": "cb895525e64852ef06b14aace50d5c864aa88c",
                "BP1": "cb895525e64a57e201b749ade5045c8145a98e",
                "BP2": "cb895525e64a54e103b549a0ea0754864ca084",
                "BP3": "cb895525e64d55ef04b04face20355874ea884",
                "JJ-REDMI": "cb895525e64b5be602b64cace1035c834eaa88",
                "LP-HONOR8": "cb895525e64b5bef08b641a7e206598049a888",
                "LP-IPHONE": "cb895525e64a53e601b34da6e50459854aac8c",
            }
            let user_id, cnt;
            Object.keys(url_dict).forEach(user_name => {
                cnt = 0;
                user_id = url_dict[user_name];
                log(url_head + user_id + url_end);
                func.to_scheme(url_head + user_id + url_end);
                toastLog("当前为:" + user_name + ",助力...");
                sleep(2000);
                while (text("100%").findOnce() == null) {
                    if (cnt > 25 || cnt == 0) {
                        toastLog("等待助力界面加载...");
                        cnt = 1;
                    }
                    sleep(100);
                    cnt = cnt + 1;
                }
                toastLog("已找到100%");
                sleep(4000);
                toastLog("等待完成，准备切回autojs");
                sleep(2000);
                func.to_autojs();
                toastLog("助力完成,等待下一个...");
                sleep(3000);
            })
            alert("已完成");
        }
    }
    return obj;
}

function 芭芭农场() {
    let obj = {
        zfb_element: function () {
            let btn;
            btn = className("android.widget.Image").textStartsWith("A*").textEndsWith("AAARQnAQ").depth(16).find();
            if (btn.length != 0) { return btn[btn.length - 1]; }
            else { return null; }
            // return className("android.widget.Image").textStartsWith("A*").textEndsWith("AAARQnAQ").depth(16).findOnce();
        },
        tb_element: function () {
            // return text("gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==").depth(13).findOnce();
            btn = className("Image").textContains("jpg").depth(13).findOnce();
            if (btn == null) {
                btn = className("Image").textContains("png").depth(13).findOnce();
                if (btn == null) {
                    btn = className("Image").textContains("gif").depth(13).findOnce();
                }
            }
            return btn;
        },
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
                if (text("做任务赢奖励").depth(14).findOnce() != null || text("拆福袋领奖励").depth(15).findOnce() != null) {
                    return true;
                } return false;
            } else {
                if (textStartsWith("第").textEndsWith("天").depth(21).findOnce() == null) {
                    return false;
                } return true;
            }
        },
        unitl_in_mission_view: function () {
            let tb_ele, zfb_ele;
            while (!obj.in_mission_view()) {
                // if (text("最近你的队友都有努力种树哦").findOnce() != null) {}
                func.sClick(text("继续努力").findOnce());
                // if (textContains("亲密度达到了").textEndsWith("获得了亲密度奖励").findOnce() != null) {}
                func.sClick(text("关闭").depth(13).findOnce());
                toastLog("请手动跳转到农场任务界面");
                sleep(3000);
                try {
                    zfb_ele = obj.zfb_element();
                    if (zfb_ele != null) {
                        // log(zfb_ele);
                        // click(device.width / 2, zfb_ele.centerY());
                        func.sClick(zfb_ele);
                        sleep(2000);
                    }
                    tb_ele = obj.tb_element();
                    if (tb_ele != null) {
                        func.sClick(tb_ele.parent().child(2));
                        sleep(2000);
                    }
                } catch (e) { sleep(500); continue; }

            }
            toastLog("已到达农场任务界面");
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
        },
    }
    // 支付宝
    let work = {
        tb: function (lucky_bag) {
            let click_text;
            click_text = ["去浏览", "去完成", "去逛逛"];
            let todo_text, todo_btn, todo_idx, step, todo_btn_text, todo_detail_text;

            step = 1;
            func.to_scheme(cfg["url_scheme"]["支付宝"]["淘宝农场"]);
            sleep(2500);
            obj.unitl_in_mission_view();
            if (lucky_bag == undefined) {
                todo_idx = 8;
            } else {
                todo_idx = 0;
                while (text("拆福袋领奖励").depth(15).findOnce() == null) {
                    func.sClick(text("领红包").depth(17).findOnce());
                    toastLog("等待跳转到福袋页面");
                    sleep(2500);
                }
                toastLog("已到达福袋页面");
            }
            sleep(3000);
            let continue_flag = false;
            while (1) {
                views = className("ListView").findOnce();
                if (views == null) { break; }
                if (todo_idx + 1 >= views.childCount() - 1) { break; }
                log("当前todo_idx=" + todo_idx);
                todo_btn = views.child(todo_idx).child(1);
                todo_btn_text = todo_btn.text();
                todo_detail_text = views.child(todo_idx).child(0).child(0).text();
                todo_text = views.child(todo_idx).child(0).child(1).child(0).text();
                log("todo_text=" + todo_text);
                log("todo_detail_text=" + todo_detail_text);
                if (click_text.indexOf(todo_btn_text) != -1) {
                    if (lucky_bag == undefined) {
                        if (!obj.arr_in_text(todo_text, ["秒"])) {
                            continue_flag = true;
                        }
                    } else {
                        if (todo_detail_text.indexOf("邀请") != -1) {
                            continue_flag = true;
                        }
                    }
                    if (continue_flag) {
                        continue_flag = false;
                        todo_idx = todo_idx + step;
                        log("todo_idx 增加 step");
                        sleep(300);
                        continue;
                    }
                    func.sClick(todo_btn);
                    while (obj.in_mission_view()) { toastLog("等待任务视图消失"); sleep(2500); }
                    toastLog("Mission 视图已消失");
                    if (todo_detail_text == "逛逛'买多少返多少'(0/1)" || todo_detail_text == "浏览天天领现金(0/1)") {
                        toastLog("找到买返 红包");
                        func.sClick(text("打开链接").findOne());
                        sleep(3000);
                    }
                    obj.view_15_second();
                    sleep(2500);
                } else {
                    todo_idx = todo_idx + step;
                    log("todo_idx 增加 step");
                    sleep(300);
                }
            }
            // click("领取");
            sleep(2000);
        },
        tb施肥: function () {
            func.to_scheme(cfg["url_scheme"]["支付宝"]["淘宝农场"]);
            let btn_ele = null;
            while (btn_ele == null) {
                btn_ele = obj.tb_element();
                if (btn_ele != null) {
                    break;
                } else {
                    toastLog("如长时间未跳转到淘宝农场页面，请手动跳转");
                    sleep(3000);
                }
            }
            let btn_x, btn_y;
            btn_y = btn_ele.bounds().top + btn_ele.bounds().height() / 2;
            btn_x = device.width / 2;
            log(btn_x);
            log(btn_y);
            while (1) {
                click(btn_x, btn_y);
                toast("如需要停止，手动操作");
                sleep(2500);
            }
        },
        zfb: function () {
            func.to_scheme(cfg["url_scheme"]["支付宝"]["芭芭农场"]);
            sleep(2500);
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
        },
        zfb助力: function () {
            let url_dict;
            url_dict = {
                "url_redmi": "alipays://platformapi/startapp?appId=68687599&nbversion=0.1.2101201150.51&nbupdate=synctry&startMultApp=YES&appClearTop=NO&source=share&shareId=MjA4ODgzMjgzNTY5OTY5MjBkMGk1MUFOVEZBUk1fT1JDSEFSRF9TSEFSRV9QMlA=&userId=2088832835699692&chInfo=ch_share__chsub_Weixin&apshareid=2e39b639-86a2-425f-bac9-e59cfa6f729c",
                "url_mate30": "alipays://platformapi/startapp?appId=68687599&nbversion=0.1.2101201150.51&nbupdate=synctry&startMultApp=YES&appClearTop=NO&source=share&shareId=MjA4ODgwMjU2NjcxNDcyMDA5cDFyY0FOVEZBUk1fT1JDSEFSRF9TSEFSRV9QMlA=&userId=2088802566714720&chInfo=ch_share__chsub_Weixin&apshareid=67021669-4f86-433a-b0f8-e9a3d92ffa4a",
                "url_honor": "alipays://platformapi/startapp?appId=68687599&nbversion=0.1.2101201150.51&nbupdate=synctry&startMultApp=YES&appClearTop=NO&source=share&shareId=MjA4ODE0MjMxMzQ4OTE4ODBvNWR3MUFOVEZBUk1fT1JDSEFSRF9TSEFSRV9QMlA=&userId=2088142313489188&chInfo=ch_share__chsub_Weixin&apshareid=f33b8fe2-57ba-468b-8179-708d640216c0",
                "url_lm": "alipays://platformapi/startapp?appId=68687599&nbversion=0.1.2101201150.51&nbupdate=synctry&startMultApp=YES&appClearTop=NO&source=share&shareId=MjA4ODMwMjgyNjc0MjM5NDE2MzF4dkFOVEZBUk1fT1JDSEFSRF9TSEFSRV9QMlA=&userId=2088302826742394&chInfo=ch_share__chsub_Weixin&apshareid=984B5380-ACCD-4099-B658-FAE3E8F5D384",
                "url_lp": "alipays://platformapi/startapp?appId=68687599&nbversion=0.1.2101201150.51&nbupdate=synctry&startMultApp=YES&appClearTop=NO&source=share&shareId=MjA4ODgwMjQ1NTc3NTMzOTFsYnNoM0FOVEZBUk1fT1JDSEFSRF9TSEFSRV9QMlA=&userId=2088802455775339&chInfo=ch_share__chsub_Weixin&apshareid=D4E9A701-E6F4-4622-A775-0AA2DF4C3E00",
            }
            Object.keys(url_dict).forEach(obj_key => {
                jump_url = url_dict[obj_key];
                func.to_scheme(jump_url);
                toastLog("已跳转URL," + obj_key);
                text("为Ta助力").findOne();
                toastLog("已找到，为Ta助力");
                sleep(2500);
                while (text("为Ta助力").findOnce() != null) {
                    func.sClick(text("为Ta助力").findOnce());
                    sleep(2500);
                }
                toastLog("已点击，为Ta助力");
                sleep(2500);
                back();
                toastLog("后退一下");
                sleep(2500);
                func.to_autojs();
                toastLog("切换到autojs，等待3秒，继续下一个");
                sleep(3500);
            })
        },
        tb助力: function () {
            let url_mate30, url_redmi, url_honor, url_lm;
            url_mate30 = "6，去一是要他之得你他么的嘻";
            url_redmi = "8 666:/信里心看她他之得年着学和信";
            url_honor = "1 666:/微生起以么他之得年可么他嘻";
            url_lm = "7 2:/！她出她着他之天里家以那哈";

            let url1, url2, url3, btn_detail, help_for;
            if (dev_model == dev_mate30) { url1 = url_redmi; url2 = url_honor; url3 = url_lm; }
            else if (dev_model == dev_honor8) { url1 = url_mate30; url2 = url_redmi; url3 = url_lm; }
            else if (dev_model == dev_redmi) { url1 = url_mate30; url2 = url_honor; url3 = url_lm; }
            [url1, url2, url3].forEach(jump_url => {
                setClip(jump_url);          // 设置剪贴板
                toastLog("已跳转URL");
                btn_detail = null;
                func.to_app("淘宝");
                while (btn_detail == null) {
                    btn_detail = text("查看详情").findOnce();
                    if (btn_detail == null) { btn_detail = desc("查看详情").findOnce(); }
                    if (btn_detail == null) { btn_detail = text("打开").findOnce(); }
                    if (btn_detail == null) { btn_detail = desc("打开").findOnce(); }
                    func.sClick(idContains("update_imageview_cancel").findOnce());
                    toastLog("等待淘口令弹窗加载");
                    sleep(2500);
                }
                func.sClick(btn_detail);
                toastLog("已点击查看详情")
                sleep(2400);
                help_for = text("为TA助力").findOnce();
                while (help_for == null) {
                    func.sClick(idContains("update_imageview_cancel").findOnce());
                    sleep(2500);
                    help_for = text("为TA助力").findOnce();
                }
                func.sClick(help_for);
                toastLog("已点击助力，等待下一个");
                sleep(3000);
                func.to_autojs();
                toastLog("切换到autojs，等待3秒");
                sleep(2000);
            })
        }
    }

    return work;
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
    numRange = func.dialogs_select(["11-15", "16-20", "20-23"]);
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
    log("total amount = " + sum / 10);
    alert("已完成,共计:" + sum / 10 + "元");
}

function jd() {
    let func_in_func = {
        rate_click: function (element) {
            if (element != null) {
                if (!element.click()) {
                    click(element.bounds().right - 1, element.bounds().centerY());
                }
                return true;
            }
            return false;
        }
    }
    let func_obj = {

        京东评价: function () {
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
                    func_in_func.rate_click(rating_bars[cur_rate]);
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
    }

    return func_obj;
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
        obj_key = func.dialogs_select(Object.keys(obj));
        obj = obj[obj_key];
    }
    func.to_scheme(obj);

}


function 支付宝() {
    let zfb = {
        余额宝转出: function () {
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
        },
        余额宝转入: function () {
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
        },
        ZFB捐款: function () {
            var defaultCount, count, cardNum, banks;
            banks = func.dialogs_select(["渣打5比", "交行3比"])
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
        }
    }
    return zfb;
}
// -----------------------建行财富季-----------------------
function 建行财富季() {
    func.to_appMulti("微信", 1);
    龙支付_戳泡泡();
    // 龙支付_日常任务();
    func.to_appMulti("微信", 2);
    龙支付_戳泡泡();
    // 龙支付_日常任务();
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