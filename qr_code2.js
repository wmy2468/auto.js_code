"ui";
//导入包
importClass(java.net.URL);
importClass(android.graphics.BitmapFactory);
importClass(android.graphics.Bitmap);

let clipText = getClip();
// 判断剪贴板内容，如果为空，则退出
if (clipText == "") {
    exit();
    toastLog('剪贴板无数据');
}

if (clipText.indexOf("＆") == 0) {
    clipText = clipText.substr(1, clipText.length - 2);
}
log(clipText);

// <img id = "ewm" src="https://img.zcool.cn/community/010ad7575faad10000012e7e0be5bb.gif"/>
ui.layout(
    <frame>     
        <img id = "ewm"/>
    </frame>
);


var imgUrl = "https://my.tv.sohu.com/user/a/wvideo/getQRCode.do?width=600&height=600&text=" + encodeURI(clipText);
//必须线程运行
threads.start(function() {
    //在新线程执行的代码
    try {
        //需要异常处理
        let picUrl = new URL(imgUrl);
        let pngBM = BitmapFactory.decodeStream(picUrl.openStream());
        ui.run(function() {
            //进行线程更新
            ui.ewm.setImageBitmap(pngBM);
        })

    } catch (err) {
        //输出错误信息
        log(err);
    }
});