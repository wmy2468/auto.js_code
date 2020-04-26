// 判断是否启动app
function run_app(pac_name, activity) {
    while (true) {
        if (currentPackage() != pac_name) {
            toastLog("当前未处于 " + pac_name + " 中，执行打开...");
            toastLog("当前活动：" + currentActivity() + "，当前包名：" + currentPackage() + "当前应用名：" + getAppName(currentPackage()));
            app.launch(pac_name);
            sleep(4000);
        }
        else {
            sleep(1000);
            break;
        }
    }
}


//等待元素
function wait_text_load(pkg, text, timeout) {
    if (timeout == undefined) {timeout = 1000 }
    if (packageName(pkg).text(text).className("android.widget.TextView").findOne(timeout) != null) {
        return true;
    }
    else 
    {
        return false;
    }    
}

//点击元素
function text_click(text) {
    let po = text(text).className("android.widget.TextView").findOnce().parent().bounds();
    click(po.centerX, po.centerY);
}