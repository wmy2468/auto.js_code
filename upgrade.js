//https://gitee.com/JJ1573/auto.js_code/raw/master/通用抢券,复杂元素.js
var originUrl = 'https://gitee.com/JJ1573/auto.js_code/raw/master/';

// 获取脚本路径
var dir = files.cwd();

//获取路径下所有JS结尾的文件
var jsFiles = files.listDir(dir, function(name){
    return name.endsWith(".js") && files.isFile(files.join(dir, name));
});

var selectedArr = jsFiles;
var fileName;
var selectIndex = dialogs.select('选择需要更新的文件', selectedArr);
if (selectIndex == -1) {
    fileName = rawInput("请输入要下载的文件名,例:XXX.JS");
    if (fileName == null) {
        toastLog("未输入文件名，退出");
        exit();
    }
} else {
    fileName = selectedArr[selectIndex];
}

var filePath = dir + '/' + fileName;
var fileUrl = originUrl + fileName;

var req = http.get(fileUrl);
if (req.statusCode != '200') {
    toastLog('网络读取错误，可能文件不存在，退出' + res_script.statusMessage)
    exit();
}

files.write(filePath, req.body.string());

alert('更新完成');