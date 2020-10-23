// 获取剪贴板
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

let imgPath = files.cwd() + "//qr.png";
//toastLog(filepath);
let picUrl = "http://api.qrserver.com/v1/create-qr-code/?size=900x900&data=" + clipText; 
//let picUrl = "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png";
threads.start(function() {
    let img = null, maxTime = 10;
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
