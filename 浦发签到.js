//launchApp("浦发信用卡");
var pkg = "com.spdbccc.app";
// 登陆
run_app(pkg);
// 等待加载，我的，点击
var text = "我的";
wait_text_load(pkg, text);
text_click(text);
// 等待加载 我的
text = "注册 / 登录"
wait_text_load(pkg, text);
// 点击 签到
id_click("iv_user_leader_title_3");
// 等待签到页面加载
var clsname = "android.view.View";
text = "今天"
wait_text_load(pkg, text, clsname);
click(288 + (792-288)/2, 1081 + (1177-1081)/2);     //点击立即签到
text = "指纹验证"
wait_text_load(pkg, text);
text = "我知道了"
wait_text_load(pkg, text);
text_click(text);

//run_app("com.spdbccc.app");
//app_status("com.spdbccc.app.activity.MainActivity");

// 首页 "com.spdbccc.app.activity.MainActivity"
// 签到 "com.spdbccc.app.activity.CommonTreatyActivity"


//等待元素
function wait_text_load(pkg, text, className) {
    if (className == undefined) {className = "android.widget.TextView"}
    if (packageName(pkg).text(text).className(className).findOne() != null) {
        toastLog(pkg + " 文本： " + text + " 已加载");
        return true;
    }
    else 
    {
        toastLog(pkg + " 文本： " + text + " 未加载");
        return false;
    }    
}

//点击元素
function text_click(text, className) {
    if (className == undefined) {
        className = "android.widget.TextView"
    }
    toastLog("text: " + text);
    var po = className(className).text(text).findOnce().parent().bounds();
    click(po.centerX(), po.centerY());
}


//点击元素
function id_click(text) {
    toastLog("id: " + text);
    var po = className("android.widget.TextView").id(text).findOnce().parent().bounds();
    click(po.centerX(), po.centerY());
}


// 判断是否启动app
function run_app(pac_name) {
    while (true) {
        if (currentPackage() != pac_name) {
            toastLog("当前未处于 " + pac_name + " 中，执行打开...");
            app.launch(pac_name);
            sleep(4000);
        }
        else {
            sleep(1000);
            break;
        }
    }
}