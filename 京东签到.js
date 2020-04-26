jd_sign()
openInTask()
DoTask()

function Justback(){
    sleep(800);
    back();
    sleep(1500);
}

function jd_sign(){
    if (currentPackage() != "com.jingdong.app.mall") {
        app.startActivity({
            action: "android.intent.action.VIEW", //此处可为其他值
            packageName: "com.jingdong.app.mall",
            className: "com.jingdong.app.mall.main.MainActivity"
             //此处可以加入其他内容，如data、extras
        });
    }

    while (true){
        toastLog(currentActivity())
        if (currentActivity() != "com.jingdong.app.mall.MainFrameActivity") {
            Justback();
            sleep(2000);
        }
        else {
            break;
        }
        
    }
    // 尝试点击首页
    className("android.view.View").desc("首页").findOnce().click();
    //领京豆
    var target = className("android.widget.TextView").depth("13").drawingOrder("2").text("领京豆").findOne().bounds();
    toastLog(target)
    sleep(800);
    click(target.centerX(), target.centerY());

    //等待京豆页面出现
    text("领京豆").className("android.widget.TextView").depth("12").drawingOrder("2").findOne();
    if (className("android.widget.TextView").depth("17").drawingOrder("2").text("已连续签到").findOne()) {
        toast("今日已签到")
    }
    else{
        //签到领京豆
        target = className("android.widget.TextView").text("签到领京豆").findOne().bounds();
        sleep(800);
        click(target.centerX(), target.centerY());
    }     
}

function openInTask() {
    while (true) {
        if (currentActivity() == "com.jingdong.app.mall.MainFrameActivity" && className("android.view.View").desc("我的").findOnce() != null && text("种豆得豆").className("android.widget.TextView").findOnce() != null && text("瓜分亿万京豆").className("android.widget.TextView").findOnce() != null) {
            if (text("种豆得豆").className("android.widget.TextView").findOnce().parent().clickable() == true) {
                text("种豆得豆").className("android.widget.TextView").findOnce().parent().click();
                toastLog("已尝试盲点“种豆得豆”入口按钮");
                sleep(3000);
            } else {
                let a = text("种豆得豆").className("android.widget.TextView").findOnce().parent().bounds();
                click(a.centerX(), a.centerY());
                toastLog("已尝试点击“种豆得豆”入口按钮");
                sleep(3000);
            }
            break;
        } else if (currentActivity() == "com.jingdong.app.mall.MainFrameActivity" && className("android.view.View").desc("我的").findOnce() != null) {
            className("android.view.View").desc("我的").findOnce().click();
            toastLog("已尝试点击京东主页“我的”按钮");
            sleep(2000);
        } else if (currentPackage() != "com.jingdong.app.mall") {
            //app.launchApp("京东");
            app.launch("com.jingdong.app.mall");
            // app.startActivity({
            //     action: "android.intent.action.VIEW", //此处可为其他值
            //     packageName: "com.jingdong.app.mall",
            //     className: "com.jingdong.app.mall.main.MainActivity"
            //     //此处可以加入其他内容，如data、extras
            // });
            toastLog("当前未处于京东APP中，正在重新打开京东……");
            console.warn("当前活动：" + currentActivity() + "，当前包名：" + currentPackage() + "当前应用名：" + getAppName(currentPackage()));
            sleep(2000);
        } else {
            if (className("android.widget.ImageView").desc("返回").clickable(true).findOnce() != null) {
                className("android.widget.ImageView").desc("返回").clickable(true).findOnce().click();
                toastLog("已尝试点击“返回”按钮");
            } else {
                Justback();
            }
            sleep(2000);
        }
    }
    for (var d = 10; d > 0; d--) {
        if (id("com.jingdong.app.mall:id/fd").text("种豆得豆").findOnce() != null && className("android.view.View").text("培养").findOnce() != null) { //8.5.6
            var d = 0;
        } else if (currentActivity() == "com.jingdong.app.mall.WebActivity") {
            toastLog("正在等待“种豆得豆”活动界面加载，剩余" + d + "秒……");
            sleep(2000);
        } else {
            var d = 0;
            toastLog("当前未处于“种豆得豆”活动加载界面，正在重试……");
        }
    }
}

//toastLog(className("android.widget.Image").text("EQTnuMAAAAASUVORK5CYII=").findOnce());//关注任务悬浮按钮

function DoTask() {
    if (id("com.jingdong.app.mall:id/fd").text("种豆得豆").findOnce() != null && className("android.view.View").text("收京豆啦!").findOnce() != null) {
        let a = className("android.view.View").text("收京豆啦!").findOnce().bounds();
        click(a.centerX(), a.centerY());
        toastLog("上期种豆得豆已结束，已找到收京豆按钮");
        sleep(2000);
        if (className("android.view.View").text("炫耀一下").findOnce() != null) {
            toastLog(className("android.view.View").text("炫耀一下").findOne().parent().parent().parent().child(0).text());
        }
        if (className("android.widget.Image").text("8Z8Q+pj1G4IqsY3AAAAABJRU5ErkJggg==").findOnce() != null) {
            let a = className("android.widget.Image").text("8Z8Q+pj1G4IqsY3AAAAABJRU5ErkJggg==").findOnce().bounds();
            click(a.centerX(), a.centerY());
            toastLog("已尝试关闭“炫耀一下”蒙版")
            sleep(2000);
        }
        if (className("android.widget.Image").text("4DW5io8tUgDqsAAAAASUVORK5CYII=").findOnce() != null) {
            let a = className("android.widget.Image").text("4DW5io8tUgDqsAAAAASUVORK5CYII=").findOnce().bounds();
            click(a.centerX(), a.centerY());
            toastLog("已尝试点击“下期”按钮");
            sleep(2000);
        }
    }
    if (id("com.jingdong.app.mall:id/fd").text("种豆得豆").findOnce() != null && className("android.view.View").text("培养").findOnce() != null) {
        toastLog("已处于主页进入的种豆得豆界面");
        if (className("android.widget.Image").text("Aa7y3g6fgjVZAAAAAElFTkSuQmCC").findOnce() != null) {
            let a = className("android.widget.Image").text("Aa7y3g6fgjVZAAAAAElFTkSuQmCC").findOnce().bounds();
            click(a.centerX(), a.centerY());
            toastLog("已尝试点击“收取”按钮");
            sleep(2000);
        }

        function Shou() {
            if (className("android.view.View").textContains("可收X").findOnce() != null && className("android.view.View").textContains("可收X").findOnce().parent().childCount() == 2) {
                let a = className("android.view.View").textContains("可收X").findOnce().parent().child(0).bounds();
                click(a.centerX(), a.centerY());
                toastLog("已尝试点击“可收取营养液”");
                sleep(2000);
            }
            var A = className("android.view.View").text("培养").findOnce();
            if (A != null) {
                toastLog("A控件查找当前正常");
            } else {
                toastLog("界面A控件查找错误，正在重试中……");
                openInTask();
                DoTask();
            }
            while (A.parent().child(2).text() != "x0" && className("android.view.View").text("营养液不足，完成下方任务获取").findOnce() == null) {
                let a = A.parent().child(2).bounds();
                click(a.centerX(), a.centerY());
                toastLog("当前培养液" + A.parent().child(2).text() + "，已尝试点击培养");
                sleep(2000);
                try {
                    var A = className("android.view.View").text("培养").findOnce();
                } catch (e) {
                    console.warn("当前活动：" + currentActivity() + "，当前包名：" + currentPackage() + "当前应用名：" + getAppName(currentPackage()));
                    toastLog("错误0:1！未处于种豆得豆界面，正在重新尝试……");
                    openInTask();
                    DoTask();
                }
            }
            toastLog("已经没有培养液了。" + A.parent().child(2).text());
        }
        Shou();
        try {
            var A = className("android.view.View").text("培养").findOnce();
            var B = A.parent().parent().parent().parent().parent().parent().parent().child(0).child(0);
        } catch (e) {
            console.warn("当前活动：" + currentActivity() + "，当前包名：" + currentPackage() + "当前应用名：" + getAppName(currentPackage()));
            toastLog("错误0！未处于种豆得豆界面，正在重新尝试……");
            openInTask();
            DoTask();
        }
        if (B != null && B.child(0).child(0).child(0).childCount() == 2 && B.child(0).child(0).child(0).child(1).text() == "x1" || B != null && B.child(0).child(0).child(0).childCount() == 3 && B.child(0).child(0).child(0).child(2).text() == "x1") { //每日签到任务
            let a = B.child(0).bounds(); //每日签到按钮
            click(a.centerX(), a.centerY());
            toastLog("已尝试点击“每日签到”按钮");
            sleep(3000);
            if (className("android.widget.TextView").text("签到领京豆").findOnce() != null) {
                let a = className("android.widget.TextView").text("签到领京豆").findOnce().bounds();
                click(a.centerX(), a.centerY());
                toastLog("已尝试点击“签到领京豆”按钮");
                sleep(3000);
                if (className("android.widget.TextView").text("签到成功，").findOnce() != null) {
                    let d = className("android.widget.TextView").text("签到成功，").findOnce().parent();
                    toastLog(d.child(0).text() + d.child(1).text() + d.child(2).text()); //成功完成每日签到任务
                    for (let f = 2; f > 0; f--) {
                        if (className("android.view.ViewGroup").depth(1).findOnce() != null) {
                            let ba = className("android.view.ViewGroup").depth(1).findOnce().bounds();
                            click(ba.centerX(), ba.centerY());
                            toastLog("已尝试点击“返回按钮”");
                            sleep(2000);
                        } else {
                            Justback();
                            sleep(2000);
                        }
                    }
                } else if (className("android.widget.TextView").text("恭喜您获得连签奖励").findOnce() != null || className("android.widget.TextView").text("种豆瓜分京豆").findOnce() != null && className("android.widget.TextView").text("种豆瓜分京豆").findOnce().parent().className() == "android.view.ViewGroup") {
                    toastLog("今日签到任务已完成，正在返回种豆得豆界面");
                    for (let f = 2; f > 0; f--) {
                        if (className("android.view.ViewGroup").depth(1).findOnce() != null) {
                            let ba = className("android.view.ViewGroup").depth(1).findOnce().bounds();
                            click(ba.centerX(), ba.centerY());
                            toastLog("已尝试点击“返回按钮”");
                            sleep(2000);
                        } else {
                            Justback();
                            sleep(2000);
                        }
                    }
                } else {
                    console.warn("当前活动：" + currentActivity() + "，当前包名：" + currentPackage() + "当前应用名：" + getAppName(currentPackage()));
                    toastLog("未找到“签到成功”提示");
                    sleep(2000);
                }
            } else if (className("android.widget.TextView").text("已连续签到").findOnce() != null) {
                let b = className("android.widget.TextView").text("已连续签到").findOne().parent();
                console.warn("若看到此日志，请截图提醒开发者！此处代码不应该运行的哦。");
                if (b.childCount() != 3) {
                    toastLog("今日已签到，本处代码不应该运行的。");
                } else {
                    toastLog(b.child(0).text() + b.child(1).text() + b.child(2).text());
                }
                if (className("android.view.ViewGroup").depth(1).findOnce() != null) {
                    let ba = className("android.view.ViewGroup").depth(1).findOnce().bounds();
                    click(ba.centerX(), ba.centerY());
                    toastLog("已尝试点击“返回按钮”");
                    sleep(2000);
                } else {
                    Justback();
                    sleep(2000);
                }
            } else {
                console.warn("当前活动：" + currentActivity() + "，当前包名：" + currentPackage() + "当前应用名：" + getAppName(currentPackage()));
                toastLog("错误！未找到“签到领京豆”按钮，重新进入并重试中……");
                openInTask();
                DoTask();
            }
        } else if (B != null && B.child(0).child(0).child(0).childCount() == 3 && B.child(0).child(0).child(0).child(2).text() != "x1" || B != null && B.child(0).child(0).child(0).childCount() == 2 && B.child(0).child(0).child(0).child(1).text() != "x1") {
            toastLog("今日“每日签到”任务已完成");
        } else {
            console.warn("当前活动：" + currentActivity() + "，当前包名：" + currentPackage() + "当前应用名：" + getAppName(currentPackage()));
            toastLog("无法找到“每日签到”按钮，重新进入并重试中……");
            openInTask();
            DoTask();
        }
        try {
            var B = A.parent().parent().parent().parent().parent().parent().parent().child(0).child(0);
        } catch (e) {
            console.warn("当前活动：" + currentActivity() + "，当前包名：" + currentPackage() + "当前应用名：" + getAppName(currentPackage()));
            toastLog("错误1！未处于种豆得豆界面，正在重新尝试……");
            openInTask();
            DoTask();
        }
        if (className("android.widget.Image").text("EQTnuMAAAAASUVORK5CYII=").findOnce() != null) {
            let a = className("android.widget.Image").text("EQTnuMAAAAASUVORK5CYII=").findOnce().bounds();
            click(a.centerX(), a.centerY());
            toastLog("发现关注任务的悬浮按钮，已尝试再次点击关闭");
            sleep(2000);
        }
        if (B != null && B.child(1).child(0).child(0).childCount() == 2) { //关注任务
            let a = B.child(1).bounds(); //关注任务按钮
            click(a.centerX(), a.centerY());
            toastLog("已尝试点击“关注任务”按钮");
            sleep(3000);
            if (className("android.widget.Image").text("EQTnuMAAAAASUVORK5CYII=").findOnce() != null) {
                if (className("android.widget.Image").text("EQTnuMAAAAASUVORK5CYII=").findOnce().parent().parent().parent().childCount() == 3) {
                    var C = className("android.widget.Image").text("EQTnuMAAAAASUVORK5CYII=").findOnce().parent().parent().parent().child(2);
                } else if (className("android.widget.Image").text("EQTnuMAAAAASUVORK5CYII=").findOnce().parent().parent().parent().childCount() == 2) {
                    var C = className("android.widget.Image").text("EQTnuMAAAAASUVORK5CYII=").findOnce().parent().parent().parent().child(1);
                }
                if (C.child(0).child(0).child(0).childCount() == 2 && C.child(0).child(0).child(0).child(1).text() == "x1" || C.child(0).child(0).child(0).childCount() == 3 && C.child(0).child(0).child(0).child(2).text() == "x1") { //浏览店铺
                    toastLog("当前浏览店铺：" + C.child(0).child(0).child(0).child(1).text()); //上限
                    let sx = C.child(0).child(0).child(0).child(1).text();
                    var limit = sx.replace("每日上限", "");
                    let m = C.child(0).child(0).child(0).child(0).bounds();
                    click(m.centerX(), m.centerY());
                    toastLog("已尝试点击“浏览店铺”按钮");
                    sleep(3000);
                    var over = 0;
                    try {
                        var X = className("android.view.View").scrollable(true).findOnce().bounds();
                    } catch (e) {
                        console.warn("当前活动：" + currentActivity() + "，当前包名：" + currentPackage() + "当前应用名：" + getAppName(currentPackage()));
                        toastLog("未成功进入“进店并关注”菜单界面，正在重试中……");
                        openInTask();
                        DoTask();

                    }
                    var ALL = className("android.view.View").text("进店并关注").find().size();
                    toastLog("【“进店并关注”数量】：" + ALL + "【可点击区域】：" + X.top, X.bottom);
                    for (var i = 0; i <= ALL; i++) {
                        while (true) {
                            if (over >= limit) {
                                toastLog("“进店并关注”获得营养液已达每日上限" + limit + "，返回继续进行下一任务");
                                if (className("android.widget.ImageView").desc("返回").clickable(true).findOnce() != null) {
                                    className("android.widget.ImageView").desc("返回").clickable(true).findOnce().click();
                                } else {
                                    Justback();
                                }
                                sleep(3000);
                                var i = ALL;
                                break;
                            } else if (i >= ALL) {
                                toastLog("已找完全部" + ALL + "个店铺，在浏览" + i + "个店铺后共找到" + over + "瓶营养液，但未达到今日" + limit + "个上限")
                                if (className("android.widget.ImageView").desc("返回").clickable(true).findOnce() != null) {
                                    className("android.widget.ImageView").desc("返回").clickable(true).findOnce().click();
                                } else {
                                    Justback();
                                }
                                sleep(3000);
                                break;
                            } else {
                                let a = className("android.view.View").text("进店并关注").findOnce(i);
                                if (a == null) {
                                    toastLog("找不到“进店并关注”按钮，正在重新尝试中……");
                                    openInTask();
                                    DoTask();
                                    break;
                                } else if (a.bounds().top != X.top && a.bounds().bottom != X.bottom) {
                                    toastLog("【已点击】第" + i + "个“进店并关注”范围为：" + a.bounds().centerX(), a.bounds().centerY(), "上边缘点下边缘点分别为：" + a.bounds().top, a.bounds().bottom);
                                    click(a.bounds().centerX(), a.bounds().centerY());
                                    sleep(3000);
                                    if (currentActivity() == "com.jd.lib.jshop.jshop.JshopMainShopActivity" || className("android.widget.EditText").findOnce() != null) {
                                        for (var z = 5; z > 0; z--) {
                                            if (className("android.view.View").text("营养液走丢了～").findOnce() != null) {
                                                var z = 0;
                                                if (className("android.view.View").text("营养液走丢了～").findOnce().parent().parent().childCount() == 3) {
                                                    var za = className("android.view.View").text("营养液走丢了～").findOnce().parent().parent().child(2).child(1);
                                                } else if (className("android.view.View").text("营养液走丢了～").findOnce().parent().parent().childCount() == 2) {
                                                    var za = className("android.view.View").text("营养液走丢了～").findOnce().parent().parent().child(1).child(1);
                                                }
                                                if (za.clickable() == true) {
                                                    za.click();
                                                    toastLog("营养液走丢了～已盲点“继续找营养液”");
                                                } else {
                                                    let zb = za.bounds();
                                                    click(zb.centerX(), zb.centerY());
                                                    toastLog("营养液走丢了～已点击“继续找营养液（" + zb.centerX(), zb.centerY() + "）”");
                                                }
                                                sleep(3000);
                                            } else if (className("android.view.View").text("1个营养液").findOnce() != null || className("android.view.View").textContains("个营养液").findOnce() != null) {
                                                var z = 0;
                                                if (className("android.view.View").text("1个营养液").findOnce() != null && className("android.view.View").text("1个营养液").findOnce().parent().parent().childCount() == 3) {
                                                    var zat = className("android.view.View").text("1个营养液").findOnce();
                                                    var za = className("android.view.View").text("1个营养液").findOnce().parent().parent().child(2).child(1);
                                                } else if (className("android.view.View").textContains("个营养液").findOnce() != null && className("android.view.View").textContains("个营养液").findOnce().parent().parent().childCount() == 3) {
                                                    var zat = className("android.view.View").textContains("个营养液").findOnce();
                                                    var za = className("android.view.View").textContains("个营养液").findOnce().parent().parent().child(2).child(1);
                                                } else if (className("android.view.View").text("1个营养液").findOnce() != null && className("android.view.View").text("1个营养液").findOnce().parent().parent().childCount() == 2) {
                                                    var zat = className("android.view.View").text("1个营养液").findOnce();
                                                    var za = className("android.view.View").text("1个营养液").findOnce().parent().parent().child(1).child(1);
                                                } else if (className("android.view.View").textContains("个营养液").findOnce() != null && className("android.view.View").textContains("个营养液").findOnce().parent().parent().childCount() == 2) {
                                                    var zat = className("android.view.View").textContains("个营养液").findOnce();
                                                    var za = className("android.view.View").textContains("个营养液").findOnce().parent().parent().child(1).child(1);
                                                }
                                                if (za.clickable() == true) {
                                                    za.click();
                                                    toastLog("已找到" + zat.text() + "～已盲点“继续找营养液”");
                                                } else {
                                                    let zb = za.bounds();
                                                    click(zb.centerX(), zb.centerY());
                                                    toastLog("已找到" + zat.text() + "～已点击“继续找营养液（" + zb.centerX(), zb.centerY() + "）”");
                                                }
                                                over++;
                                                sleep(3000);
                                            } else {
                                                toastLog("正在浏览第" + i + "个店铺，剩余" + z + "秒后返回……");
                                                sleep(2500);
                                            }
                                        }
                                        if (currentActivity() == "com.jd.lib.jshop.jshop.JshopMainShopActivity" || className("android.widget.EditText").findOnce() != null) {
                                            toastLog("仍然处于店铺中正在尝试返回种豆得豆界面");
                                            Justback();
                                            sleep(3000);
                                        }
                                    }
                                    break;
                                } else if (a.bounds().top == X.top) {
                                    swipe(X.centerX(), X.centerY(), X.centerX(), X.centerY() + 300, 500);
                                } else if (a.bounds().bottom == X.bottom) {
                                    swipe(X.centerX(), X.centerY(), X.centerX(), X.centerY() - 300, 500);
                                }
                            }
                        }
                    }
                } else {
                    toastLog("“关注任务：浏览店铺”任务已完成");
                    sleep(2000);
                }
            }
        } else if (B != null && B.child(1).child(0).child(0).childCount() == 3) {
            toastLog("今日“关注任务：浏览店铺”任务已完成");
        } else {
            console.warn("当前活动：" + currentActivity() + "，当前包名：" + currentPackage() + "当前应用名：" + getAppName(currentPackage()));
            toastLog("无法找到“关注任务”按钮，重新进入并重试中……");
            openInTask();
            DoTask();
        }
        //挑选商品任务
        var A = className("android.view.View").text("培养").findOnce();
        try {
            var B = A.parent().parent().parent().parent().parent().parent().parent().child(0).child(0);
        } catch (e) {
            console.warn("当前活动：" + currentActivity() + "，当前包名：" + currentPackage() + "当前应用名：" + getAppName(currentPackage()));
            toastLog("错误1！未处于种豆得豆界面，正在重新尝试……");
            openInTask();
            DoTask();
        }
        if (className("android.widget.Image").text("EQTnuMAAAAASUVORK5CYII=").findOnce() != null) {
            let a = className("android.widget.Image").text("EQTnuMAAAAASUVORK5CYII=").findOnce().bounds();
            click(a.centerX(), a.centerY());
            toastLog("发现关注任务的悬浮按钮，已尝试再次点击关闭");
            sleep(2000);
        }
        if (B != null && B.child(1).child(0).child(0).childCount() == 2) { //关注任务
            let a = B.child(1).bounds(); //关注任务按钮
            click(a.centerX(), a.centerY());
            toastLog("已尝试点击“关注任务”按钮");
            sleep(3000);
            if (className("android.widget.Image").text("EQTnuMAAAAASUVORK5CYII=").findOnce() != null) {
                if (className("android.widget.Image").text("EQTnuMAAAAASUVORK5CYII=").findOnce().parent().parent().parent().childCount() == 3) {
                    var C = className("android.widget.Image").text("EQTnuMAAAAASUVORK5CYII=").findOnce().parent().parent().parent().child(2);
                } else if (className("android.widget.Image").text("EQTnuMAAAAASUVORK5CYII=").findOnce().parent().parent().parent().childCount() == 2) {
                    var C = className("android.widget.Image").text("EQTnuMAAAAASUVORK5CYII=").findOnce().parent().parent().parent().child(1);
                }
                if (C.child(1).child(0).child(0).childCount() == 2 && C.child(1).child(0).child(0).child(1).text() == "x1" || C.child(1).child(0).child(0).childCount() == 3 && C.child(1).child(0).child(0).child(2).text() == "x1") { //挑选商品
                    toastLog("当前挑选商品：" + C.child(1).child(0).child(0).child(1).text()); //上限
                    let sx = C.child(1).child(0).child(0).child(1).text();
                    var limit = sx.replace("每日上限", "");
                    let m = C.child(1).child(0).child(0).child(0).bounds();
                    click(m.centerX(), m.centerY());
                    toastLog("已尝试点击“挑选商品”按钮");
                    sleep(3000);
                    var over = 0;
                    var i = 1;
                    while (true) {
                        try {
                            var C = className("android.webkit.WebView").text("种豆得豆").findOnce().child(0).child(0).child(0).child(0).child(0).child(0).child(0).parent().child(3).child(0);
                        } catch (e) {
                            console.warn("当前活动：" + currentActivity() + "，当前包名：" + currentPackage() + "当前应用名：" + getAppName(currentPackage()));
                            toastLog("未处于进入“选ta并关注”菜单界面，正在重试中……");
                            openInTask();
                            DoTask();
                            break;
                        }
                        var str = C.child(1).text(); // N/总数
                        let x = str.search("/");
                        var ALL = null;
                        for (var a = str.length; a > 0; a--) {
                            if (a == x) {
                                var a = 0;
                            } else {
                                if (ALL == null) {
                                    var ALL = str[a];
                                } else {
                                    var ALL = str[a] + ALL;
                                }
                            }
                        }
                        var Now = str.replace("/" + ALL, "");
                        toastLog("当前为第" + Now + "个卡片，卡片总数为" + ALL);
                        if (over >= limit) {
                            toastLog("“选ta并关注”获得营养液已达每日上限" + limit + "，返回继续进行下一任务");
                            if (className("android.widget.ImageView").desc("返回").clickable(true).findOnce() != null) {
                                className("android.widget.ImageView").desc("返回").clickable(true).findOnce().click();
                            } else {
                                Justback();
                            }
                            sleep(3000);
                            break;
                        } else if (i >= ALL) {
                            toastLog("已找完全部" + ALL + "个店铺，在浏览" + i + "个店铺后共找到" + over + "瓶营养液，但未达到今日" + limit + "个上限")
                            if (className("android.widget.ImageView").desc("返回").clickable(true).findOnce() != null) {
                                className("android.widget.ImageView").desc("返回").clickable(true).findOnce().click();
                            } else {
                                Justback();
                            }
                            sleep(3000);
                            break;
                        } else {
                            if (Now != i) {
                                swipe(C.bounds().centerX(), C.bounds().centerY(), 0, C.bounds().centerY(), 500);
                                toastLog("已尝试按顺序滑动至第" + i + "个卡片");
                                sleep(2000);
                            } else {
                                let d = C.child(0).child(0).child(2).child(0).child(0).child(0).child(4).child(0).child(0).bounds();
                                click(d.centerX(), d.centerY());
                                toastLog("已尝试点击“选ta并关注”按钮");
                                if (className("android.view.View").text("关注成功，获得1瓶营养液").findOne(3000) != null) {
                                    toastLog("关注成功，获得1瓶营养液");
                                    over++;
                                }
                                for (var loop = 5; loop > 0; loop--) {
                                    if (currentActivity() == "com.jd.lib.productdetail.ProductDetailActivity" || id("com.jd.lib.productdetail:id/akl").findOnce() != null) {
                                        var loop = 0;
                                        sleep(2000);
                                        if (className("android.widget.ImageView").desc("返回").clickable(true).findOnce() != null) {
                                            className("android.widget.ImageView").desc("返回").clickable(true).findOnce().click();
                                            toastLog("已盲点返回");
                                            sleep(3000);
                                        } else {
                                            Justback();
                                            sleep(3000);
                                        }
                                    } else {
                                        toastLog("正在等待商品页加载，剩余" + loop + "秒……");
                                        sleep(2000);
                                    }
                                }
                                i++;
                            }
                        }
                    }
                } else {
                    toastLog("“关注任务：挑选商品”任务已完成");
                    sleep(2000);
                }
            }
        } else if (B != null && B.child(1).child(0).child(0).childCount() == 3) {
            toastLog("今日“关注任务：挑选商品”任务已完成");
        } else {
            console.warn("当前活动：" + currentActivity() + "，当前包名：" + currentPackage() + "当前应用名：" + getAppName(currentPackage()));
            toastLog("无法找到“关注任务”按钮，重新进入并重试中……");
            openInTask();
            DoTask();
        }
        //关注频道
        try {
            var A = className("android.view.View").text("培养").findOnce();
            var B = A.parent().parent().parent().parent().parent().parent().parent().child(0).child(0);
        } catch (e) {
            console.warn("当前活动：" + currentActivity() + "\n当前包名：" + currentPackage() + "当前应用名：" + getAppName(currentPackage()));
            toastLog("错误1！未处于种豆得豆界面，正在重新尝试……");
            openInTask();
            DoTask();
        }
        if (className("android.widget.Image").text("EQTnuMAAAAASUVORK5CYII=").findOnce() != null) {
            let a = className("android.widget.Image").text("EQTnuMAAAAASUVORK5CYII=").findOnce().bounds();
            click(a.centerX(), a.centerY());
            toastLog("发现关注任务的悬浮按钮，已尝试再次点击关闭");
            sleep(2000);
        }
        if (B != null && B.child(1).child(0).child(0).childCount() == 2) { //关注任务
            let a = B.child(1).bounds(); //关注任务按钮
            click(a.centerX(), a.centerY());
            toastLog("已尝试点击“关注任务”按钮");
            sleep(3000);
            if (className("android.widget.Image").text("EQTnuMAAAAASUVORK5CYII=").findOnce() != null) {
                if (className("android.widget.Image").text("EQTnuMAAAAASUVORK5CYII=").findOnce().parent().parent().parent().childCount() == 3) {
                    var C = className("android.widget.Image").text("EQTnuMAAAAASUVORK5CYII=").findOnce().parent().parent().parent().child(2);
                } else if (className("android.widget.Image").text("EQTnuMAAAAASUVORK5CYII=").findOnce().parent().parent().parent().childCount() == 2) {
                    var C = className("android.widget.Image").text("EQTnuMAAAAASUVORK5CYII=").findOnce().parent().parent().parent().child(1);
                }
                if (C.child(2).child(0).child(0).childCount() == 2 && C.child(2).child(0).child(0).child(1).text() == "x1" || C.child(2).child(0).child(0).childCount() == 3 && C.child(2).child(0).child(0).child(2).text() == "x1") { //关注频道
                    toastLog("当前关注频道：" + C.child(2).child(0).child(0).child(1).text()); //上限
                    let sx = C.child(2).child(0).child(0).child(1).text();
                    var limit = sx.replace("每日上限", "");
                    let m = C.child(2).child(0).child(0).child(0).bounds();
                    click(m.centerX(), m.centerY());
                    toastLog("已尝试点击“关注频道”按钮");
                    sleep(3000);
                    var over = 0;
                    try {
                        var X = id("com.jingdong.app.mall:id/fd").text("关注频道任务").findOnce().parent().bounds();
                    } catch (e) {
                        console.warn("当前活动：" + currentActivity() + "，当前包名：" + currentPackage() + "当前应用名：" + getAppName(currentPackage()));
                        toastLog("未成功进入“进入并关注”菜单界面，正在重试中……");
                        openInTask();
                        DoTask();

                    }
                    var ALL = className("android.view.View").text("进入并关注").find().size();
                    toastLog("【“进入并关注”数量】：" + ALL + "【可点击区域】：" + X.bottom, device.height);
                    for (var i = 0; i <= ALL; i++) {
                        while (true) {
                            if (over >= limit) {
                                toastLog("“进入并关注”获得营养液已达每日上限" + limit + "，返回继续进行下一任务");
                                if (className("android.widget.ImageView").desc("返回").clickable(true).findOnce() != null) {
                                    className("android.widget.ImageView").desc("返回").clickable(true).findOnce().click();
                                } else {
                                    Justback();
                                }
                                sleep(3000);
                                var i = ALL;
                                break;
                            } else if (i >= ALL) {
                                toastLog("已找完全部" + ALL + "个店铺，在浏览" + i + "个店铺后共找到" + over + "瓶营养液，但未达到今日" + limit + "个上限")
                                if (className("android.widget.ImageView").desc("返回").clickable(true).findOnce() != null) {
                                    className("android.widget.ImageView").desc("返回").clickable(true).findOnce().click();
                                } else {
                                    Justback();
                                }
                                sleep(3000);
                                break;
                            } else {
                                let a = className("android.view.View").text("进入并关注").findOnce(i);
                                if (a == null) {
                                    toastLog("找不到“进入并关注”按钮，正在重新尝试中……");
                                    openInTask();
                                    DoTask();
                                    break;
                                } else if (a.clickable() == true) {
                                    a.click();
                                    toastLog("已盲点第" + i + "个“进入并关注”");
                                    if (className("android.view.View").text("恭喜获得1瓶营养液").findOne(5000) != null) {
                                        toastLog("恭喜获得1瓶营养液");
                                        over++;
                                    }
                                    for (let a = 5; a > 0; a--) {
                                        toastLog("正在等待活动加载，剩余" + a + "秒……");
                                        sleep(2000);
                                    }
                                    if (id("com.jingdong.app.mall:id/fd").text("关注频道任务").findOnce() == null) {
                                        if (className("android.widget.ImageView").desc("返回").clickable(true).findOnce() != null) {
                                            className("android.widget.ImageView").desc("返回").clickable(true).findOnce().click();
                                            sleep(3000);
                                        } else {
                                            Justback();
                                            sleep(3000);
                                        }
                                    } else {
                                        toastLog("点击后未完成活动或未成功点击");
                                        sleep(2000);
                                    }
                                    break;
                                } else if (a.bounds().top > X.bottom && a.bounds().bottom != device.height) {
                                    toastLog("【已点击】第" + i + "个“进入并关注”范围为：" + a.bounds().centerX(), a.bounds().centerY(), "上边缘点下边缘点分别为：" + a.bounds().top, a.bounds().bottom);
                                    click(a.bounds().centerX(), a.bounds().centerY());
                                    if (className("android.view.View").text("恭喜获得1瓶营养液").findOne(5000) != null) {
                                        toastLog("恭喜获得1瓶营养液");
                                        over++;
                                    }
                                    for (let a = 5; a > 0; a--) {
                                        toastLog("正在等待活动加载，剩余" + a + "秒……");
                                        sleep(2500);
                                    }
                                    if (id("com.jingdong.app.mall:id/fd").text("关注频道任务").findOnce() == null) {
                                        if (className("android.widget.ImageView").desc("返回").clickable(true).findOnce() != null) {
                                            className("android.widget.ImageView").desc("返回").clickable(true).findOnce().click();
                                            toastLog("已尝试盲点返回按钮");
                                            sleep(3000);
                                        } else {
                                            Justback();
                                            sleep(3000);
                                        }
                                    }
                                    break;
                                } else if (a.bounds().top <= X.bottom) {
                                    swipe(device.width / 2, device.height / 2, device.width / 2, device.height / 2 + 300, 500);
                                } else if (a.bounds().bottom == device.height) {
                                    swipe(device.width / 2, device.height / 2, device.width / 2, device.height / 2 - 300, 500);
                                }
                            }
                        }
                    }
                } else {
                    toastLog("“关注任务：关注频道”任务已完成");
                    sleep(2000);
                }
            }
        } else if (B != null && B.child(1).child(0).child(0).childCount() == 3) {
            toastLog("今日“关注任务：关注频道”任务已完成");
        } else {
            console.warn("当前活动：" + currentActivity() + "，当前包名：" + currentPackage() + "当前应用名：" + getAppName(currentPackage()));
            toastLog("无法找到“关注任务”按钮，重新进入并重试中……");
            openInTask();
            DoTask();
        }
    } else {
        toastLog("未处于京东“种豆得豆”界面，正在重新尝试中……");
        sleep(2000);
        openInTask();
        DoTask();
    }
    if (className("android.widget.Image").text("EQTnuMAAAAASUVORK5CYII=").findOnce() != null) {
        let a = className("android.widget.Image").text("EQTnuMAAAAASUVORK5CYII=").findOnce().bounds();
        click(a.centerX(), a.centerY());
        toastLog("发现关注任务的悬浮按钮，已尝试再次点击关闭");
        sleep(2000);
    }
    try {
        var A = className("android.view.View").text("培养").findOnce();
        var B = A.parent().parent().parent().parent().parent().parent().parent().child(0).child(0);
    } catch (e) {
        console.warn("当前活动：" + currentActivity() + "，当前包名：" + currentPackage() + "当前应用名：" + getAppName(currentPackage()));
        toastLog("错误2！未处于种豆得豆界面，正在重新尝试……");
        openInTask();
        DoTask();
    }
    if (B != null && B.child(3).child(0).child(0).childCount() == 2 && B.child(3).child(0).child(0).child(1).text() == "x1" || B != null && B.child(3).child(0).child(0).childCount() == 3 && B.child(3).child(0).child(0).child(2).text() == "x1") { //逛逛会场任务
        let a = B.child(3).bounds(); //逛逛会场按钮
        click(a.centerX(), a.centerY());
        toastLog("已尝试点击“逛逛会场”按钮");
        if (className("android.widget.Image").text("53lRFGmtboD5P17e27NNUN5iAAAAAElFTkSuQmCC").findOne(3000) != null) {
            let a = className("android.widget.Image").text("53lRFGmtboD5P17e27NNUN5iAAAAAElFTkSuQmCC").findOnce().bounds();
            click(a.centerX(), a.centerY());
            toastLog("已尝试点击蒙版“逛逛会场”按钮");
            sleep(2000);
        }
        for (var w = 10; w > 0; w--) {
            toastLog("正在等待“会场”加载，剩余" + w + "秒……");
            sleep(1000);
        }
        if (className("android.widget.ImageView").desc("返回").findOnce() != null) {
            className("android.widget.ImageView").desc("返回").findOnce().click();
            toastLog("已尝试盲点返回按钮");
            sleep(2000);
        } else {
            Justback();
            sleep(2000);
        }
    } else if (B != null && B.child(3).child(0).child(0).childCount() == 2 && B.child(3).child(0).child(0).child(1).text() != "x1" || B != null && B.child(3).child(0).child(0).childCount() == 3 && B.child(3).child(0).child(0).child(2).text() != "x1") {
        toastLog("今日“逛逛会场”任务已完成");
        sleep(2000);
    } else {
        console.warn("当前活动：" + currentActivity() + "，当前包名：" + currentPackage() + "当前应用名：" + getAppName(currentPackage()));
        toastLog("无法找到“逛逛会场”按钮，重新进入并重试中……");
        openInTask();
        DoTask();
    }

    try {
        var A = className("android.view.View").text("培养").findOnce();
        var B = A.parent().parent().parent().parent().parent().parent().parent().child(0).child(0);
    } catch (e) {
        console.warn("当前活动：" + currentActivity() + "，当前包名：" + currentPackage() + "当前应用名：" + getAppName(currentPackage()));
        toastLog("错误4！未处于种豆得豆界面，正在重新尝试……");
        openInTask();
        DoTask();
    }
    if (B.child(4) != null) {
        let a = B.child(4).bounds(); //更多任务按钮
        click(a.centerX(), a.centerY());
        toastLog("已尝试点击“更多任务”按钮");
        sleep(2000);
        try {
            if (className("android.widget.Image").text("YSQ7wR+wHq088KUgADXA0kgqiXVZzkpOXp3mMuy4waYlSIFHAiEDjlZIoim5vUKBkZ9q8iF7zkDEapiHhX5BrWYKWuqiWOzWluZm2T9Hw5B8zQFuQb2AAAAAElFTkSuQmCC").findOnce().parent().parent().parent().childCount() == 3) {
                var b = className("android.widget.Image").text("YSQ7wR+wHq088KUgADXA0kgqiXVZzkpOXp3mMuy4waYlSIFHAiEDjlZIoim5vUKBkZ9q8iF7zkDEapiHhX5BrWYKWuqiWOzWluZm2T9Hw5B8zQFuQb2AAAAAElFTkSuQmCC").findOnce().parent().parent().parent().child(2);
            } else if (className("android.widget.Image").text("YSQ7wR+wHq088KUgADXA0kgqiXVZzkpOXp3mMuy4waYlSIFHAiEDjlZIoim5vUKBkZ9q8iF7zkDEapiHhX5BrWYKWuqiWOzWluZm2T9Hw5B8zQFuQb2AAAAAElFTkSuQmCC").findOnce().parent().parent().parent().childCount() == 2) {
                var b = className("android.widget.Image").text("YSQ7wR+wHq088KUgADXA0kgqiXVZzkpOXp3mMuy4waYlSIFHAiEDjlZIoim5vUKBkZ9q8iF7zkDEapiHhX5BrWYKWuqiWOzWluZm2T9Hw5B8zQFuQb2AAAAAElFTkSuQmCC").findOnce().parent().parent().parent().child(1);
            }
        } catch (e) {
            console.warn("当前活动：" + currentActivity() + "，当前包名：" + currentPackage() + "当前应用名：" + getAppName(currentPackage()));
            toastLog("错误5X!找不到悬浮的更多任务按钮，正在重试中……");
            openInTask();
            DoTask();
        }
        if (b != null && b.child(0).child(0).child(0).childCount() == 2 && b.child(0).child(0).child(0).child(1).text() == "x1" || b != null && b.child(0).child(0).child(0).childCount() == 3 && b.child(0).child(0).child(0).child(2).text() == "x1") {
            let c = b.child(0).bounds(); //金融双签
            click(c.centerX(), c.centerY());
            toastLog("已尝试点击“金融双签”按钮");
            sleep(2000);
            for (let w = 10; w > 0; w--) {
                toastLog("正在等待“金融双签”加载，剩余" + w + "秒……");
                sleep(1000);
            }
            if (className("android.widget.ImageView").desc("返回").findOnce() != null) {
                className("android.widget.ImageView").desc("返回").findOnce().click();
                toastLog("已尝试盲点返回按钮");
                sleep(2000);
            } else {
                Justback();
                sleep(2000);
            }
        } else if (b == null) {
            console.warn("当前活动：" + currentActivity() + "，当前包名：" + currentPackage() + "当前应用名：" + getAppName(currentPackage()));
            toastLog("无法找到“更多任务：金融双签”按钮，重新进入并重试中……");
            openInTask();
            DoTask();
        } else {
            toastLog("今日“更多任务：金融双签”已完成");
            sleep(2000);
        }
        toastLog("暂不支持完成“更多任务：评价商品”任务");
    } else {
        console.warn("当前活动：" + currentActivity() + "，当前包名：" + currentPackage() + "当前应用名：" + getAppName(currentPackage()));
        toastLog("无法找到“更多任务”按钮，重新进入并重试中……");
        openInTask();
        DoTask();
    }
    if (className("android.widget.Image").text("YSQ7wR+wHq088KUgADXA0kgqiXVZzkpOXp3mMuy4waYlSIFHAiEDjlZIoim5vUKBkZ9q8iF7zkDEapiHhX5BrWYKWuqiWOzWluZm2T9Hw5B8zQFuQb2AAAAAElFTkSuQmCC").findOnce() != null) {
        let v = className("android.widget.Image").text("YSQ7wR+wHq088KUgADXA0kgqiXVZzkpOXp3mMuy4waYlSIFHAiEDjlZIoim5vUKBkZ9q8iF7zkDEapiHhX5BrWYKWuqiWOzWluZm2T9Hw5B8zQFuQb2AAAAAElFTkSuQmCC").findOnce().bounds();
        click(v.centerX(), v.centerY());
        toastLog("已发现悬浮的“更多任务”按钮，并已点击关闭");
        sleep(2000);
    }
    Shou();
    dialogs.alert("种豆得豆自动脚本：\n脚本已运行完成");
    exit();
}