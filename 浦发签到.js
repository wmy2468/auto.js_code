//launchApp("浦发信用卡");
var pkg = "com.spdbccc.app";
// 登陆
run_app(pkg);
// 等待加载，我的，点击
var text = "我的";
wait_text_load(pkg, text);
text_click(text);
var id = "iv_user_leader_title_3";
// 等待 签到 加载 并点击
wait_id_load(pkg, id);
id_click(id);
// 等待签到页面加载
var clsname = "android.view.View";
text = "今天";
wait_text_load(pkg, text, clsname);
text = "今日已签到，明天再来吧！";
// 如果找到今天已经签到 则退出
if (item_is_load(pkg, text, clsname)) {
    toastLog("今天已签到，退出");
    exit();
}
else {
    click(288 + (792 - 288) / 2, 1081 + (1177 - 1081) / 2); //点击立即签到
}
text = "指纹验证";
wait_text_load(pkg, text);
text = "我知道了";
wait_text_load(pkg, text, clsname);
text_click(text, clsname);

//run_app("com.spdbccc.app");
//app_status("com.spdbccc.app.activity.MainActivity");

// 首页 "com.spdbccc.app.activity.MainActivity"
// 签到 "com.spdbccc.app.activity.CommonTreatyActivity"


//等待元素
function wait_text_load(pkg, text, className) {
    if (className == undefined) {
        className = "android.widget.TextView"
    }
    if (packageName(pkg).text(text).className(className).findOne() != null) {
        log(pkg + " 文本： " + text + " 已加载");
        return true;
    } else {
        log(pkg + " 文本： " + text + " 未加载");
        return false;
    }
}


function wait_id_load(pkg, id, className) {
    if (className == undefined) {
        className = "android.widget.ImageView"
    }
    if (packageName(pkg).id(id).className(className).findOne() != null) {
        log(pkg + " id： " + id + " 已加载");
        return true;
    } else {
        log(pkg + " id： " + id + " 未加载");
        return false;
    }
}


function item_is_load(pkg, text, clsName) {
    if (clsName == undefined) {
        clsName = "android.widget.ImageView"
    }
    if (packageName(pkg).text(text).className(clsName).findOnce(1) != null) {
        log(pkg + " text " + id + " 已加载");
        return true;
    } else {
        log(pkg + " text " + id + " 未加载");
        return false;
    }
}

//点击元素
function text_click(text, clsName) {
    if (clsName == undefined) {
        clsName = "android.widget.TextView";
    }
    log("点击元素text " + text);
    var po = className(clsName).text(text).findOnce().parent().bounds();
    click(po.centerX(), po.centerY());
}


//点击元素
function id_click(text, clsName) {
    log("id: " + text);
    if (clsName == undefined) {
        clsName = "android.widget.ImageView";
    }
    log("点击元素id: " + id);
    if (className(clsName).id(text).findOnce() != null) {
        className(clsName).id(text).findOnce().click();
       }
}


// 判断是否启动app
function run_app(pac_name) {
    while (true) {
        if (currentPackage() != pac_name) {
            log("当前未处于 " + pac_name + " 中，执行打开...");
            app.launch(pac_name);
            sleep(3000);
        } else {
            sleep(1000);
            break;
        }
    }
}