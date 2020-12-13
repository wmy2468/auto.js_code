//https://gitee.com/JJ1573/auto.js_code/raw/master/通用抢券,复杂元素.js
var originUrl = 'https://gitee.com/JJ1573/auto.js_code/raw/master/';

// 获取脚本路径
var dir = files.cwd();

//获取路径下所有JS结尾的文件
var jsFiles = files.listDir(dir, function (name) {
    return name.endsWith(".js") && files.isFile(files.join(dir, name));
});

var fileName, filePath, fileUrl;
for (i = 0; i <= jsFiles.length; i++) {
    fileName = jsFiles[i];              // 文件名
    filePath = dir + '/' + fileName;    // 文件路径
    fileUrl = originUrl + fileName;     // 网络文件路径
    var req = http.get(fileUrl);
    if (req.statusCode != '200') {
        toastLog('网络读取错误，可能文件不存在，继续下一个' + req.statusMessage)
        //exit();
    } else {
        // 写入文件
        files.write(filePath, req.body.string());
    }

}

alert(fileName + '更新完成');