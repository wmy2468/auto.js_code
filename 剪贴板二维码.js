// 获取剪贴板
var clipText = getClip();
// 判断剪贴板内容，如果为空，则退出
if (clipText == "") {
    exit();
    toastLog('剪贴板无数据');
}

if (clipText.indexOf("＆") == 0) {
    clipText = clipText.substr(1, clipText.length - 2);
}
if (clipText.indexOf("http") == 0) {
    clipText = encodeURIComponent(clipText);
}
log(clipText);

var imgPath = files.cwd() + "//qr.png";
//toastLog(filepath);
var picUrl = "http://apis.juhe.cn/qrcode/api?key=684e3d257f6034ebdfd80a2bbeddeb18&type=2&fgcolor=00b7ee&w=450&m=50&text=" + clipText;
threads.start(function () {
    var img = null, maxTime = 10;
    while (img == null) {
        maxTime = maxTime - 1;
        img = images.load(picUrl);
        toastLog('生成中,等待...');
        sleep(2000);
        if (maxTime == 0) {
            alert('接口读取失败。退出');
            exit();
        }
        sleep(2000);
    }
    images.save(img, imgPath, "png", 100);
    app.viewFile(imgPath);
    sleep(800);
    files.remove(imgPath);  //删除文件
})
