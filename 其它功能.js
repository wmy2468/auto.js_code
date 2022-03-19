auto.waitFor();
// 导入模块
var func = require("func_list.js");
var cfg = func.config_dict();
var dev_model = device.model;
var dev_mate30, dev_honor8, dev_redmi;
dev_mate30 = "TAS-AL00";
dev_honor8 = "FRD-AL00";
dev_redmi = "Redmi Note 7";

// log(Object.keys(京东()));

main();
// toastLog(text("领取奖励").find().length);
function main() {
    let select_func;
    let selectedArr;
    if (dev_model == dev_mate30) {
        selectedArr = ["支付宝相关", "万商3比", "建行相关", "JD相关", "跳转指定Scheme"];
    } else {
        selectedArr = ["支付宝相关", "万商3比", "JD相关", "跳转指定Scheme"];
    }
    //---------------配置区域-----------------
    let scriptName = func.dialogs_select(selectedArr);      // 设置查找的文本  
    if (scriptName == "建行相关") {
        select_func = func.dialogs_select(["财付季助力", "财付季答题助手"]);
        if (select_func == "财付季助力") { 建行财富季().财付季助力(); }
        else if (select_func == "财付季答题助手") { 建行财富季().财付季答题助手(); }
    }
    else if (scriptName == "支付宝相关") {
        let farms;
        select_func = func.dialogs_select(["芭芭农场-助力浏览施肥", "支付宝捐款", "余额宝转入", "余额宝转出", "芭芭农场-助力浏览", "芭芭农场-淘宝施肥", "芭芭农场-支付宝施肥"]);
        if (select_func == "支付宝捐款") { 支付宝().支付宝捐款(); }
        else if (select_func == "余额宝转入") { 支付宝().余额宝转入(); }
        else if (select_func == "余额宝转出") { 支付宝().余额宝转出(); }
        else if (select_func == "芭芭农场-支付宝施肥") {
            requestScreenCapture();
            芭芭农场().施肥("支付宝");
        }
        else if (select_func == "芭芭农场-淘宝施肥") {
            requestScreenCapture();
            芭芭农场().施肥("淘宝");
        }
        else if (select_func == "芭芭农场-助力浏览") {
            farms = 芭芭农场();
            farms.zfb助力();
            farms.tb助力();
            farms.tb(); farms.zfb();
        } else if (select_func == "芭芭农场-助力浏览施肥") {
            requestScreenCapture();
            farms = 芭芭农场();
            farms.zfb助力(); farms.tb助力();
            farms.tb(); farms.zfb();
            farms.施肥("支付宝");
        }
    }
    else if (scriptName == "JD相关") {
        // select_func = func.dialogs_select(["京东评价", "跳转京东_剪贴板", "跳转极速版_剪贴板"]);
        select_func = func.dialogs_select(Object.keys(京东()));
        if (select_func == "极速版挖宝") { 京东().极速版挖宝(); }
        else if (select_func == "跳转京东_剪贴板") { 京东().跳转京东_剪贴板(); }
        else if (select_func == "跳转极速版_剪贴板") { 京东().跳转极速版_剪贴板(); }
        else if (select_func == "京东评价") { 京东().京东评价(); }
    }
    else if (scriptName == "YSF相关") {
        select_func = func.dialogs_select(Object.keys(云闪付()));
        if (select_func == "YSF福气助力") { 云闪付().YSF福气助力(); }
        else if (select_func == "YSF点福气任务") { 云闪付().YSF点福气任务(); }

    }
    else if (scriptName == "跳转指定Scheme") { 跳转指定Scheme(); }
    else if (scriptName == "万商3比") {
        select_func = func.dialogs_select(["万商3比", "ysf码",]);
        if (select_func == "万商3比") { 万商3比(); }
        else if (select_func == "ysf码") { 云闪付().ysf码(); }
    }
    func.dialogs_alert("已完成...");
}

function 云闪付() {
    let func_obj = {
        ysf码: function () {
            func.to_scheme("upwallet://pay");
            sleep(3000);
            while (1) {
                if (textEndsWith("成功").findOnce() != null) {
                    sleep(800);
                    back();
                    // func.to_autojs();
                    toastLog("返回一下");
                    sleep(3000);
                    func.sClick(text("付款码").findOne());
                    // func.to_scheme("upwallet://pay");
                    toastLog("已执行跳转 fuk码");
                    sleep(3000);
                }
                if (textEndsWith("商家付款").findOnce() != null) {
                    toastLog("等待被扫，有需要请手动停止");
                    sleep(3000);
                }
            }
        },
        YSF福气助力: function () {
            let url_head, url_end;
            url_head = "upwallet://applet?toLink=https%3A%2F%2Fyouhui.95516.com%2Fnewsign%2Fysfsfq%2Findex.html%3FuserId%3D";
            url_end = "%26greetingId%3D1%26baifuId%3D1&encryptAppId=46411c55b29f8b49&scenarioId=1006";
            url_dict = {
                // "JJ-MATE30": "cb895525e54c56e009b24face50d5a814ba088",
                // "luyi1": "cb895525e54c50e709b249a0ea0458814aad8a",
                // "luyi2": "cb895525e64a55e104b54aa1e00c58804dae84",
                // "luyi3": "cb895525e54c50e104b74ea5e50c5b8c4da088",
                // "luyi4": "cb895525e64852ef06b14aace50d5c864aa88c",
                // "BP1": "cb895525e64a57e201b749ade5045c8145a98e",
                // "BP2": "cb895525e64a54e103b549a0ea0754864ca084",
                "BP3": "cb895525e64d55ef04b04face20355874ea884",
                // "JJ-REDMI": "cb895525e64b5be602b64cace1035c834eaa88",
                // "LP-HONOR8": "cb895525e64b5bef08b641a7e206598049a888",
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
        }
    }
    return func_obj;
}

function 芭芭农场() {
    let func_in_func = {
        zfb_element: function (up_and_down) {
            up_and_down = up_and_down || 1;     //2表示上半个屏幕 1表示下半个,默认为1
            let left, top, right, bottom;
            if (up_and_down == 1) {
                left = 0;
                top = device.height / 2;
                right = device.width;
                bottom = device.height;
            } else {
                left = 0;
                top = 0;
                right = device.width;
                bottom = device.height / 2;
            }
            let btn;
            btn = className("android.widget.Image").textStartsWith("A*").textEndsWith("AAARQnAQ").depth(16).
                boundsInside(left, top, right, bottom).findOnce();
            return btn;
            // if (btn.length != 0) { return btn[btn.length - 1]; }
            // else { return null; }
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
            while (!func_in_func.in_mission_view()) {
                // if (text("最近你的队友都有努力种树哦").findOnce() != null) {}
                func.sClick(text("继续努力").findOnce());
                // if (textContains("亲密度达到了").textEndsWith("获得了亲密度奖励").findOnce() != null) {}
                func.sClick(text("关闭").depth(13).findOnce());
                toastLog("请手动跳转到农场任务界面");
                sleep(3000);
                try {
                    zfb_ele = func_in_func.zfb_element();
                    if (zfb_ele != null) {
                        // log(zfb_ele);
                        // click(device.width / 2, zfb_ele.centerY());
                        func.sClick(zfb_ele);
                        sleep(2000);
                    }
                    tb_ele = func_in_func.tb_element();
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
            while (func_in_func.in_mission_view() == false) {
                back();
                sleep(4000);
            }
            toastLog("已返回...");
        },
    }
    // 支付宝
    let func_obj = {
        tb: function (lucky_bag) {
            let click_text;
            click_text = ["去浏览", "去完成", "去逛逛"];
            let todo_text, todo_btn, todo_idx, step, todo_btn_text, todo_detail_text;

            step = 1;
            func.to_scheme(cfg["url_scheme"]["支付宝"]["淘宝农场"]);
            sleep(2500);
            func_in_func.unitl_in_mission_view();
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
            click("去签到");
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
                        if (!func_in_func.arr_in_text(todo_text, ["秒"])) {
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
                    while (func_in_func.in_mission_view()) { toastLog("等待任务视图消失"); sleep(2500); }
                    toastLog("Mission 视图已消失");
                    if (todo_detail_text == "逛逛'买多少返多少'(0/1)" || todo_detail_text == "浏览天天领现金(0/1)") {
                        toastLog("找到买返 红包");
                        func.sClick(text("打开链接").findOne());
                        sleep(3000);
                    }
                    func_in_func.view_15_second();
                    sleep(2500);
                } else {
                    todo_idx = todo_idx + step;
                    log("todo_idx 增加 step");
                    sleep(300);
                }
            }
            click("去领取");
            sleep(2000);
        },
        施肥: function (施肥app) {
            let img_list, pic_folder = files.cwd() + '/piccs/';;
            let btn_ele = null, current_pkg;
            // 1. 先去淘宝点击领取
            func.to_scheme(cfg["url_scheme"]["支付宝"]["淘宝农场"]);
            while (func_in_func.tb_element() == null) {
                toastLog("如长时间未跳转到淘宝农场页面，请手动跳转");
                sleep(3000);
            }
            let tb_img;
            tb_img = images.read(pic_folder + "淘宝芭芭农场每日领取.png");
            if (func.match_img_click(tb_img, screenshot, find_region)) {
                toastLog("已点击淘宝立即领取");
            } else {
                if (func.match_img_click(tb_img, screenshot, find_region)) {
                    toastLog("已点击淘宝立即领取");
                } else {
                    if (func.match_img_click(tb_img, screenshot, find_region)) {
                        toastLog("已点击淘宝立即领取");
                    } else {
                        toastLog("未成功 点击 淘宝立即领取");
                    }
                }
            }
            tb_img.recycle();
            sleep(2000);
            // 2. 再区分app施肥
            if (施肥app == "支付宝") {
                current_pkg = "com.eg.android.AlipayGphone";
                func.to_scheme(cfg["url_scheme"]["支付宝"]["芭芭农场"]);
                while (btn_ele == null) {
                    btn_ele = func_in_func.zfb_element();
                    toastLog("如长时间未跳转到支付宝农场页面，请手动跳转");
                    sleep(3000);
                }
                img_list = {
                    支付宝芭芭农场每日领取: images.read(pic_folder + "支付宝芭芭农场每日领取.png"),
                }
            } else if (施肥app == "淘宝") {
                current_pkg = "com.taobao.taobao";
                func.to_scheme(cfg["url_scheme"]["支付宝"]["淘宝农场"]);
                while (btn_ele == null) {
                    btn_ele = func_in_func.tb_element();
                    toastLog("如长时间未跳转到淘宝农场页面，请手动跳转");
                    sleep(3000);
                }
                img_list = {
                    淘宝芭芭农场可拆开: images.read(pic_folder + "淘宝芭芭农场可拆开.png"),
                    淘宝芭芭农场每日领取: images.read(pic_folder + "淘宝芭芭农场每日领取.png"),
                }
            } else {
                toastLog("未设置app名称，退出");
                exit();
            }

            let btn_x, btn_y;
            btn_y = btn_ele.bounds().centerY();
            btn_x = device.width / 2;
            log(btn_x);
            log(btn_y);
            // 领取新人礼包
            btn_ele = func_in_func.zfb_element(2);
            if (btn_ele != null) {
                try {
                    if (btn_ele.parent().parent().parent().child(4).child(0).click()) {
                        toastLog("已点击 新人礼包"); sleep(2600);
                        while (!func.sClick(text("今日已领奖，去施肥>").findOnce())) {
                            if (func.sClick(text("抽取今日肥料奖励>").findOnce())) {
                                toastLog("今日抽取肥料成功"); sleep(2600);
                                break;
                            }
                            toastLog("等待 今日领奖成功"); sleep(2600);
                        }
                        toastLog("今日领奖成功"); sleep(2600);
                    }
                }
                catch (e) {
                    toastLog("点击失败 新人礼包"); sleep(2600);
                }
            }

            let cnt = 0;
            let screenshot, find_region;
            find_region = [0, device.height / 2];

            let get_now, i;
            while (1) {
                cnt = cnt + 1;
                if (current_pkg != currentPackage()) {
                    toastLog("当前pkg已经不同，退出");
                    sleep(2600);
                    break;
                }
                if (cnt > 50) {
                    break;
                }

                if (func.sClick(packageName(current_pkg).text("点击领取").findOnce())) {
                    toastLog("已点击 施肥次数奖励");
                    sleep(3000);
                    if (func.sClick(packageName(current_pkg).text("收下去施肥").findOnce())) {
                        toastLog("已点击 收下施肥");
                        sleep(2600);
                    } else {
                        if (func.sClick(packageName(current_pkg).text("收下去施肥").findOnce())) {
                            toastLog("已点击 收下施肥");
                            sleep(2600);
                        } else {
                            toastLog("点击失败 收下施肥"); sleep(2600);
                        }
                    }
                }
                if (func.sClick(packageName(current_pkg).className("Button").text("立即领取").findOnce())) {
                    toastLog("找到亲密度立即领取按钮, 等待5秒");
                    sleep(5000);
                    if (textContains("合种管理").findOnce() != null) {
                        log("找到合种管理");
                        sleep(1500);
                        get_now = className("Button").text("立即领取").find();
                        if (get_now.length != 0) {
                            for (i = get_now.length - 1; i >= 0; i--) {
                                func.sClick(get_now[i]);
                                sleep(1000);
                            }
                        }
                        toastLog("已点击亲密度 领取 按钮");
                        sleep(2600);
                        // func.sClick(text("完成任务").findOnce());
                    } else {
                        toastLog("未找到合种管理 按钮");
                        sleep(2600);
                    }
                    func.sClick(packageName(current_pkg).className("Button").text("立即领取").findOnce());
                }
                click(btn_x, btn_y);
                func.sClick(text("关闭").findOnce());
                screenshot = images.captureScreen();
                Object.keys(img_list).forEach(img_idx => {
                    if (func.match_img_click(img_list[img_idx], screenshot, find_region)) {
                        sleep(1000);
                    }
                })
            }
            // 释放所有图片
            Object.keys(img_list).forEach(opend_img => {
                img_list[opend_img].recycle();
            })
        },
        zfb: function () {
            func.to_scheme(cfg["url_scheme"]["支付宝"]["芭芭农场"]);
            sleep(2500);
            let click_text;
            click_text = ["去浏览", "去完成", "去逛逛"];
            let todo_text, todo_btn, todo_idx, step, todo_btn_text;
            todo_idx = 1;
            step = 4
            func_in_func.unitl_in_mission_view();
            sleep(2000);
            while (1) {
                views = className("android.view.View").scrollable(true).findOnce();
                if (views == null) { break; }
                if (todo_idx + 3 >= views.childCount() - 1) { break; }
                log("当前todo_idx=" + todo_idx);
                todo_btn = views.child(todo_idx + 3).child(0);
                todo_btn_text = todo_btn.text();
                todo_text = views.child(todo_idx + 2).text();
                if (func_in_func.arr_in_text(todo_text, ["秒"]) && click_text.indexOf(todo_btn_text) != -1) {
                    log(todo_text);
                    func.sClick(todo_btn);
                    while (func_in_func.in_mission_view()) { toastLog("等待任务视图消失"); sleep(2500); }
                    toastLog("Mission 视图已消失");
                    func_in_func.view_15_second();
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
            let url_dict, url_keys;
            url_dict = {
                "url_lm": "alipays://platformapi/startapp?appId=68687599&nbversion=0.1.2101201150.51&nbupdate=synctry&startMultApp=YES&appClearTop=NO&source=share&shareId=MjA4ODMwMjgyNjc0MjM5NDE2MzF4dkFOVEZBUk1fT1JDSEFSRF9TSEFSRV9QMlA=&userId=2088302826742394&chInfo=ch_share__chsub_Weixin&apshareid=984B5380-ACCD-4099-B658-FAE3E8F5D384",
                "url_lp": "alipays://platformapi/startapp?appId=68687599&nbversion=0.1.2101201150.51&nbupdate=synctry&startMultApp=YES&appClearTop=NO&source=share&shareId=MjA4ODgwMjQ1NTc3NTMzOTFsYnNoM0FOVEZBUk1fT1JDSEFSRF9TSEFSRV9QMlA=&userId=2088802455775339&chInfo=ch_share__chsub_Weixin&apshareid=D4E9A701-E6F4-4622-A775-0AA2DF4C3E00",
                "url_mate30": "alipays://platformapi/startapp?appId=68687599&nbversion=0.1.2101201150.51&nbupdate=synctry&startMultApp=YES&appClearTop=NO&source=share&shareId=MjA4ODgwMjU2NjcxNDcyMDA5cDFyY0FOVEZBUk1fT1JDSEFSRF9TSEFSRV9QMlA=&userId=2088802566714720&chInfo=ch_share__chsub_Weixin&apshareid=67021669-4f86-433a-b0f8-e9a3d92ffa4a",
                "url_honor": "alipays://platformapi/startapp?appId=68687599&nbversion=0.1.2101201150.51&nbupdate=synctry&startMultApp=YES&appClearTop=NO&source=share&shareId=MjA4ODE0MjMxMzQ4OTE4ODBvNWR3MUFOVEZBUk1fT1JDSEFSRF9TSEFSRV9QMlA=&userId=2088142313489188&chInfo=ch_share__chsub_Weixin&apshareid=f33b8fe2-57ba-468b-8179-708d640216c0",
                // "url_redmi": "alipays://platformapi/startapp?appId=68687599&nbversion=0.1.2101201150.51&nbupdate=synctry&startMultApp=YES&appClearTop=NO&source=share&shareId=MjA4ODgzMjgzNTY5OTY5MjBkMGk1MUFOVEZBUk1fT1JDSEFSRF9TSEFSRV9QMlA=&userId=2088832835699692&chInfo=ch_share__chsub_Weixin&apshareid=2e39b639-86a2-425f-bac9-e59cfa6f729c",
            }
            // Object.keys(url_dict).forEach(obj_key => { }
            url_keys = Object.keys(url_dict);
            let obj_key, cnt, refind;
            for (let i = 0; i < url_keys.length; i++) {
                refind = false;
                cnt = 0;
                obj_key = url_keys[i];
                jump_url = url_dict[obj_key];
                func.to_scheme(jump_url);
                toastLog("已跳转URL," + obj_key);
                while (text("为Ta助力").findOnce() == null) {
                    func.sClick(text("抽取今日肥料奖励>").findOnce());
                    cnt = cnt + 1;
                    sleep(2000);
                    if (cnt > 6) {
                        toastLog("超过10秒未找到, 后退一下，重新执行");
                        back();
                        sleep(3000);
                        refind = true;
                        break;
                    }
                }
                if (refind) {
                    i = i - 1; // 重新执行未助力的部分
                    continue;
                }
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
            }
        },
        tb助力: function () {
            let url_dict, url_keys;
            url_dict = {
                "url_lm": "7 2:/！她出她着他之天里家以那哈",
                "url_lp": "3啊都来上以有他在时时是心微",
                "url_mate30": "6，去一是要他之得你他么的嘻",
                "url_honor": "1 666:/微生起以么他之得年可么他嘻",
                "url_redmi": "8 666:/信里心看她他之得年着学和信",
            }
            // Object.keys(url_dict).forEach(obj_key => { }
            url_keys = Object.keys(url_dict);

            url_keys.forEach(jump_url => {
                setClip(url_dict[jump_url]);          // 设置剪贴板
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
                    if (textContains("不能帮自己助力哦").findOnce() != null) {
                        break;
                    }
                    toastLog("等待 为TA助力 加载");
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
    return func_obj;
}


function 万商3比() {
    var now, h, m;
    now = new Date();
    h = now.getHours();
    m = now.getMinutes();
    if (h >= 7 && h <= 18) {
        if (m >= 39 && m <= 50) {
            func.dialogs_alert("宾馆不刷，退出");
            exit();
        }
    } else if (h >= 19 && h <= 22) {
        if (m >= 19 && m <= 30) {
            func.dialogs_alert("宾馆不刷，退出");
            exit();
        }
    } else if (h >= 23 || h <= 6) {
        if ((m >= 49 && m <= 60) || (m >= 9 && m <= 20)) {
            func.dialogs_alert("宾馆不刷，退出");
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
    let counting = 1, total_count;
    total_count = count;
    while (count > 0) {
        inputVal = random(min * 10, max * 10) / 10;
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
        toastLog("当前第：" + counting + "次，总" + total_count + "次");
        setText(inputVal);
        sleep(500);
        while (text("将二维码/条码放入框内，即可自动扫描").findOnce() == null) {
            func.sClick(text("确定").findOnce());
            sleep(500);
        }
        while (text("支付成功！").findOnce() == null) {
            sleep(500);
        }
        back();
        counting = counting + 1;
        count = count - 1;
    }
    log("total amount = " + sum / 10);
    func.dialogs_alert("已完成,共计:" + sum / 10 + "元");
    exit();
}

function 京东() {
    let func_in_func = {
        rate_click: function (element) {
            if (element != null) {
                if (!element.click()) {
                    click(element.bounds().right - 1, element.bounds().centerY());
                }
                return true;
            }
            return false;
        },
        path_date_string: function () {
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
        },
        clip_text_jump: function (target_app) {
            func.to_autojs();
            let clip_text = getClip();
            if (clip_text == "") {
                func.dialogs_alert("剪贴板为空，");
            } else {
                log("剪贴板文本:" + clip_text);
                let jump_url_st, jump_url_ed;
                jump_url_ed = '"}'
                if (target_app == "京东极速版") {
                    jump_url_st = 'jdlite://virtual?params={"category":"jump","des":"m","url":"';
                } else {
                    // (target_app == "京东")
                    jump_url_st = 'openApp.jdMobile://virtual?params={"category":"jump","des":"m","url":"';
                }
                func.to_scheme(jump_url_st + clip_text + jump_url_ed);
            }
        },
    }
    let func_obj = {
        跳转京东_剪贴板: function () {
            func_in_func.clip_text_jump("京东");
        },
        跳转极速版_剪贴板: function () {
            func_in_func.clip_text_jump("京东极速版");
        },
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
                        file_path = func_in_func.path_date_string();
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
                    func.dialogs_alert("豆子未满，请检查 是否有误，并手动提交");
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


function 跳转指定Scheme() {
    let func_obj, obj_key;
    func_obj = cfg["url_scheme"];
    while (typeof (func_obj) != "string") {
        obj_key = func.dialogs_select(Object.keys(func_obj));
        func_obj = func_obj[obj_key];
    }
    func.to_scheme(func_obj);

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
        支付宝捐款: function () {
            var defaultCount, count, cardNum, banks;
            banks = func.dialogs_select(["渣打5比", "交行3比"])
            switch (banks) {
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
    let ccb = {
        财付季助力: function () {
            // let select_items = func.dialogs_select([1, 2, "1 + 2"], "CCB任务选择微信", "多选");
            // requestScreenCapture(); sleep(1000);
            let func_obj = {
                to_wechat_favorite: function () {
                    sleep(800);
                    // 先找到 底部按钮 我
                    while (func.sClick(text("我").findOnce()) == false) {
                        back(); toastLog("等待我的页面加载，等4秒"); sleep(4000);
                    }
                    toastLog("已点击 微信底部 我");
                    sleep(2600);
                    // 点击收藏
                    while (func.sClick(text("收藏").findOnce()) == false) {
                        toastLog("等待收藏页面加载"); sleep(2600);
                    }
                    toastLog("已点击 收藏 按钮");
                    sleep(2600);
                    // 点击收藏内容
                    func.sClick(textStartsWith("主会场").findOne());
                    toastLog("已点击收藏夹的 主会场");
                    sleep(2600);
                    id("android:id/text1").text("详情").findOne();
                    toastLog("收藏夹 主会场 已加载");
                    sleep(3600);
                    // let match_result, match_img;
                    // let pic_folder = files.cwd() + '/piccs/';
                    // match_img = images.read(pic_folder + "ccb收藏任务中心.png");
                    // match_result = null;
                    // while (match_result == null) {
                    //     match_result = func.match_img(match_img, null);
                    //     toastLog("等待找图出现...");
                    //     sleep(2600);
                    // }
                    // match_img.recycle();
                    click(70, 886 + 88);
                    toastLog("已点击链接...");
                    sleep(2600);
                },
                in_mission_view: function () {
                    while (text("刷新").findOnce() == null) {
                        func.sClick(text("允许").findOnce());
                        toast("请跳转到 ccb福气任务界面");
                        sleep(2600);
                    }
                    toastLog("已到达 ccb福气任务界面");
                    sleep(2600);
                },
                to_do_mission: function () {
                    // 点击签到
                    if (func.sClick(text("立即签到").findOnce())) {
                        toastLog("已点击 立即签到");
                    } else {
                        toastLog("未找到 立即签到");
                    }
                    sleep(2000);
                    // 循环
                    let to_do;
                    while (1) {
                        to_do = text("去完成").findOnce();
                        if (to_do != null) {
                            if (to_do.bounds().top > device.height) {
                                toastLog("当前屏幕已完成");
                                sleep(2600);
                                break;
                            }
                        } else {
                            toastLog("等待去完成按钮加载");
                            sleep(4000);
                        }
                        func.sClick(to_do);
                        toastLog("已点击，去完成，等待3秒");
                        sleep(3000);
                        toastLog("等待页面加载5秒");
                        sleep(5000);
                        // 等待返回
                        while (text("刷新").findOnce() == null) {
                            back();
                            toastLog("执行返回，等待4秒");
                            sleep(4000);
                        }
                        while (!func.sClick(text("刷新").findOnce())) {
                            toastLog("点击刷新,失败");
                            sleep(4000);
                        }
                        toastLog("点击刷新,成功");
                        sleep(3000);
                        if (func.sClick(text("领取奖励").findOnce())) {
                            toastLog("点击领取奖励, 成功");
                            sleep(3000);
                        }
                    }
                },
                to_friends_page: function () {
                    let my_friend_btn, fuqi_btn, close_popup;
                    while (text("好友列表").findOnce() == null) {
                        // 点击主会场按钮
                        if (func.sClick(text("主会场").findOnce())) {
                            toastLog("已点击 ccb主会场按钮"); sleep(2600);
                        }
                        sleep(400);
                        // 弹窗关闭按钮
                        close_popup = text("/").findOnce();
                        if (close_popup != null) {
                            if (func.sClick(close_popup.parent())) {
                                toastLog("已点击 ccb主会场弹窗关闭按钮");
                                sleep(2600);
                            }
                        }
                        sleep(400);
                        // 点击我的好友按钮
                        fuqi_btn = textStartsWith("福气值Lv").findOnce();
                        if (fuqi_btn != null) {
                            try {
                                // my_friend_btn = fuqi_btn.parent().parent().child(5);
                                func.sClick(fuqi_btn.parent().parent().child(5));
                                func.sClick(fuqi_btn.parent().parent().child(6));
                            }
                            catch (e) {
                                log(e);
                            }
                        }
                        toastLog("查找完毕，等待下一次查找"); sleep(2600);
                    }
                    sleep(200);
                },
                help_friend: function () {
                    while (textStartsWith("助力你：") == null) {
                        toastLog("等待 助力页面加载"); sleep(2600);
                    }
                    toastLog("助力页面 已加载"); sleep(2600);
                    if (func.sClick(text("助力好友").findOnce())) {
                        toastLog("已点击助力，等待返回"); sleep(2600);
                    } else {
                        toastLog("未成功 点击助力，等待返回"); sleep(2600);
                    }
                    while (text("好友列表").findOnce() == null) {
                        back();
                        toastLog("执行返回，等待4秒");
                        sleep(3000);
                    }
                    sleep(200);
                },
                help_process: function () {
                    let to_help, to_visit, miss_count, last_length, help_length;
                    last_length = 0;
                    miss_count = 0;
                    while (1) {
                        try {
                            to_visit = text("去拜访").find();
                            if (to_visit.length > 10) {
                                break;
                            }
                            to_help = text("去助力").find();
                            help_length = to_help.length;
                            // 如果执行完后，去完成的总数不变，则错过数+1
                            if (last_length == help_length) {
                                miss_count = miss_count + 1;
                            }
                            last_length = help_length;
                            while (textStartsWith("助力你：").findOnce() == null) {
                                if (func.sClick(to_help[help_length - miss_count - 1])) {
                                    toastLog("已点击去助力按钮，等待加载"); sleep(2600);
                                    break;
                                }
                            }
                            func_obj.help_friend();
                            help_count = help_count - 1;
                        }
                        catch (e) {
                            continue;
                        }
                    }
                },
            };
            [1, 2].forEach(app_count => {
                func.toAppMulti("微信", app_count);
                func_obj.to_wechat_favorite();
                func_obj.in_mission_view();     // 到达任务界面
                func_obj.to_do_mission();     // 做任务
                func_obj.to_friends_page();
                func_obj.help_process();
                toastLog("第" + app_count + "个已完成，准备切换");
            })
        },
        财付季答题助手: function () {
            let func_obj = {
                正面词汇: function (in_positive_view) {
                    let key_words = {
                        "教导有方": 1, "格物致知": 1, "价格合理": 1, "自愿选择": 1, "诚实信用": 1, "尊重意愿": 1, "责任追究": 1, "知无不言": 1, "准确计价": 1,
                        "安全保障": 1, "民事调解": 1, "以礼相待": 1, "自愿": 1, "真心实意": 1, "自由裁量": 1, "自由": 1, "敬老尊贤": 1, "举案齐眉": 1,
                        "稳健投资": 1, "友好协商": 1, "货值其价": 1, "倾囊相授": 1, "符合原则": 1, "弥补损害": 1, "信息对称": 1, "合法使用": 1, "充分披露": 1,
                        "严格保密": 1, "学海无涯": 1, "博古通今": 1, "保护弱小": 1, "真实": 1, "资金安全": 1, "力学不倦": 1, "你敬我爱": 1, "及时受理": 1,
                        "受理依据": 1, "春风中坐": 1, "内容检查": 1, "交易自主": 1, "心口如一": 1, "奉若神明": 1, "受理有效": 1, "彬彬有礼": 1, "求知若渴": 1,
                        "个人权益": 1, "敬如上宾": 1, "风险警示": 1, "耳提面命": 1, "数据字典": 1, "数据安全": 1, "金融素养": 1, "密钥安全": 1, "首问负责": 1,
                        "学无止境": 1, "抵制不当": 1, "防止损失": 1, "多元化解": 1, "格式合同": 1, "诲人不倦": 1, "审慎对待": 1, "学而不厌": 1, "依法赔偿": 1,
                        "自行判断": 1, "敏而好学": 1, "买卖自由": 1, "居安思危": 1, "请勿轻信": 1, "及时处理": 1, "防止纠纷": 1, "保质保量": 1, "信息真实": 1,
                        "落落大方": 1, "循循善诱": 1, "和解机制": 1, "合理维权": 1, "斯抬斯敬": 1, "准确": 1, "学以致用": 1, "因材施教": 1, "举证通报": 1, "信息安全": 1,
                        "诚实": 1, "事实明显": 1, "密码安全": 1, "平等": 1, "受理有效": 1, "热情周到": 1, "敬老慈幼": 1, "学富五车": 1, "保障权益": 1,
                        "货真价实": 1, "流程标准": 1, "正当合法": 1, "敬老怜贫": 1, "实事求是": 1, "价格合理": 1, "信用": 1, "东风化雨": 1, "真实全面": 1, "等价交换": 1,
                        "勤学好问": 1, "竭诚相待": 1, "有理有据": 1, "解释合理": 1, "依法监督": 1, "推荐": 1, "鉴别能力": 1, "溯源整改": 1, "风险提示": 1, "嘉言善行": 1,
                        "透明公开": 1, "依法收集": 1, "力学笃行": 1, "公平交易": 1, "安全秘钥": 1, "信息交换": 1, "依法合规": 1, "机会平等": 1, "如实相告": 1,
                        "直截了当": 1, "合理赔付": 1, "依法查询": 1, "自愿行为": 1, "扫径以待": 1, "防微杜渐": 1, "赔礼道歉": 1, "价格公开": 1, "授权使用": 1,
                        "毕恭毕敬": 1, "鸿儒硕学": 1, "及时规避": 1, "程门立雪": 1, "尊年尚齿": 1, "代位追偿": 1, "投诉畅通": 1, "财产安全": 1, "公平竞争": 1,
                        "自主选择": 1, "证据确凿": 1, "诚实守信": 1, "博学多才": 1, "坦诚相对": 1, "满腹经纶": 1, "公正": 1, "实不相瞒": 1, "信息对等": 1, "合理使用": 1,
                        "虹膜技术": 1, "电子签名": 1, "情真意切": 1, "电话畅通": 1, "指纹安全": 1, "自由谈判": 1, "分散风险": 1, "有法可依": 1, "洗耳恭听": 1, "获利公平": 1,
                        "开诚布公": 1, "尊重": 1, "笃实好学": 1, "履行义务": 1, "充分尊重": 1, "仗气直书": 1, "合法权益": 1, "公平互惠": 1, "杜绝侵害": 1, "负弩前驱": 1,
                        "倒履相迎": 1, "交易公平": 1, "网络安全": 1, "自主": 1, "公之于众": 1, "合适": 1, "平等自愿": 1, "公平公正": 1, "万无一失": 1, "千真万确": 1, "通俗易懂": 1,
                        "安老怀少": 1, "自主决定": 1, "书通二酉": 1, "防范意识": 1, "正大光明": 1, "开门见山": 1, "实话实说": 1, "手不释卷": 1, "账户安全": 1, "信息隐私": 1,
                        "妥善处理": 1, "信息加密": 1, "合理收费": 1, "规范文本": 1, "信息透明": 1, "买卖公平": 1, "去伪存真": 1, "风险防范": 1, "智周万物": 1, "严格准入": 1,
                        "公开": 1, "维护权益": 1, "有教无类": 1, "承担责任": 1, "尊闻行知": 1, "一目了然": 1, "数据准确": 1, "快速核查": 1, "尊师重道": 1, "": 1, "": 1, "": 1,
                    }
                    let answer, idx, triggers, trigger_text = "请选出所有正面词汇";
                    try {
                        trigger = textContains(trigger_text).findOnce();
                        if (trigger != null && in_positive_view) {
                            idx = trigger.indexInParent();
                            triggers = trigger.parent().child(idx + 2);
                            for (i = 0; i < triggers.childCount(); i++) {
                                answer = triggers.child(i).child(0).text();
                                log("题目词汇：" + answer);
                                if (answer in key_words) {
                                    log("👆👆👆正面词汇 已点击辅助答案");
                                    func.cClick(triggers.child(i));
                                    sleep(200);
                                }
                            }
                            toastLog("已点击所有符合条件数据");
                            sleep(2600);
                        }
                    }
                    catch (e) {
                        log("正面词汇 查找报错");
                        log(e);
                    }
                },
                last_level_text: function (ele_obj) {
                    let ele = ele_obj;
                    while (ele.childCount() != 0) {
                        ele = ele.child(0);
                    }
                    return ele.text();
                },
                消保跨境答题: function () {
                    let answers_dict = {
                        "湛江": 1, "小红是美国人，持护照": 1, "仅限于本人账户之间、个人与近亲属账户之间": 1, "“南向通”投资本金来源可以不是汇款户": 1,
                        "银行告知小明不能办理": 1, "风险承受能力为稳健型及以上": 1, "100万": 1, "内地存款产品": 1, "不纳入": 1, "港澳投资者业务资格需由内地银行进行审核": 1,
                        "内地代销银行和内地合作银行无需审核客户投资资金来源": 1, "向银行申领《携带外汇出境许可证》": 1, "1500亿": 1, "只需提供本人有效身份证件": 1,
                        "内地代销银行故意隐瞒相关产品风险": 1, "自助取款机": 1, "1家": 1, "业务环节发生地原则": 1, "境内个人办理外汇汇出，银行有权对其购汇用途和付汇用途进行一致性审核": 1,
                        "购买“南向通”投资产品到期或赎回后所得收益可不受“南向通”资金用途管控": 1, "因私旅游": 1, "有偿帮助他人提供贷款担保。": 1, "不要亲自办理金融业务，尽量委托他人或中介代办。": 1,
                        "和服务员一起去前台结账，刷卡时遮挡密码键盘。": 1, "第四份": 1, "到银行申请正规贷款。": 1, "全部都是": 1, "只有在柜面办理个人购汇的时候，需要填写《个人购汇申请书》": 1,
                        // "对": 1, 
                        "不正确": 1, "否": 1,
                        "沉迷网络游戏，购买游戏币不够钱可以申请网络贷款提前消费。": 1, "商家": 1, "谢女士每个月按时归还房贷。": 1, "保护个人身份信息，不点击不明来源的链接。": 1,
                        "不可以": 1, "小红在柜面持身份证件办理2万美元的购汇": 1, "人民币": 1, "“跨境理财通” 可跨境投资对方银行销售的所有投资产品": 1, "": 1,
                        "": 1, "": 1, "": 1,
                    };
                    let trigger, triggers, trigger_text = "答对3题即算闯关成功";
                    let question = "", answer = ""; click_flag = false;
                    try {
                        trigger = textContains(trigger_text).findOnce();
                        while (trigger == null) {
                            toast("未找到匹配字符...");
                            sleep(3000);
                            trigger = textContains(trigger_text).findOnce();
                        }
                        triggers = trigger.parent().parent().child(0);
                        let i;
                        for (i = 0; i < triggers.childCount(); i++) {
                            if (i == 0) {
                                question = func_obj.last_level_text(triggers.child(i));
                                log("question:" + question);
                                continue;
                            } else {
                                answer = func_obj.last_level_text(triggers.child(i));
                                log("answer:" + answer);
                            }
                            if (answer in answers_dict) {
                                func.sClick(triggers.child(i));
                                toastLog("👆👆👆 正确答案：" + answer + ",等待3秒");
                                sleep(3000);
                                click_flag = true;
                                break;
                            }
                        }
                        if (!click_flag) {
                            toastLog("无满足条件的答案，请手动执行");
                            sleep(3000);
                            toastLog("无满足条件的答案，请手动执行");
                            sleep(3000);
                            toastLog("无满足条件的答案，请手动执行");
                            sleep(3000);
                        }
                    }
                    catch (e) {
                        log("消保跨境答题 查找报错");
                        log(e);
                    }
                }
            }
            let is_in_positive = true;
            while (1) {
                if (textContains("请选出所有正面词汇").findOnce() != null) {
                    // toastLog("已找到 正面词汇 标识, 答题完成后，等待提示继续下次后再开始答题");
                    // sleep(2600);
                    func_obj.正面词汇(is_in_positive);
                    is_in_positive = false;
                    continue;
                }
                is_in_positive = true;
                if (textContains("答对3题即算闯关成功").findOnce() != null) {
                    // toastLog("👇👇👇 已找到  消保跨境答题 标识, 答题完成后，等待提示继续下次后再开始答题");
                    // sleep(2600);
                    func_obj.消保跨境答题();
                }
                toast("执行完，等待2秒，继续下次");
                sleep(2000);
                // auto.service.resources.flushLayoutCache();
            }
        }

    }
    return ccb;

}
