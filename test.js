let clipText = getClip();
// 判断剪贴板内容，如果为空，则退出
if (clipText == "") {
    exit();
    toastLog('剪贴板无数据');
}

if (clipText.indexOf("＆") == 0) {
    clipText = clipText.substr(1, clipText.length - 2);
}

fileUrl = "https://my.tv.sohu.com/user/a/wvideo/getQRCode.do?width=600&height=600&text=" + clipText;
var req = http.get(fileUrl)
//log(req.body.string())