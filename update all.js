//https://gitee.com/JJ1573/auto.js_code/raw/master/通用抢券,复杂元素.js
var originUrl = 'https://gitee.com/JJ1573/auto.js_code/raw/master/';
// var originUrl = 'https://raw.githubusercontent.com/mw03251214/auto.js_code/master/';
// var originUrl = "https://gitlab.com/mw03251214/auto-js_code/-/raw/master/";

// 获取脚本路径
let dir = files.cwd();
//获取路径下所有JS结尾的文件
var jsFiles = files.listDir(dir, function (name) {
    return name.endsWith(".js") && files.isFile(files.join(dir, name));
});

let selectedArr = ["更新所有文件", "更新图片文件"];
let selectIndex = dialogs.select('选择功能', selectedArr);
let req, successCnt = 0;
// 设置超时5秒
http.__okhttp__.setTimeout(5000);

let input_name;
if (selectIndex == -1) {
    input_name = rawInput("请输入要下载的文件名,例:XXX，不需要输入.JS");
    if (input_name == null || input_name == '') {
        toastLog("未输入文件名，退出");
        exit();
    }
    // 判断文件名
    if (input_name.indexOf('.js') == -1) {
        input_name = input_name + '.js';
    }
    update_files(input_name);
    alert("更新完成，请刷新页面");
} else if (selectIndex == 0) {
    alert('更新' + update_files() + '/' + jsFiles.length + '个文件');
} else if (selectIndex == 1) {
    // 更新图片
    let suffix = "piccs/";
    let pic_path = files.cwd() + "/" + suffix;
    update_files("update all.js");
    files.ensureDir(pic_path);          // 确保路径存在
    // 路径
    let file_name_list;
    // Mate30 才需要更新ccb文件
    if (device.model == "TAS-AL00") {
        file_name_list = ["芭芭农场施肥可拆开.png", "芭芭农场施肥点击领取.png",
            "ccb福气任务签到按钮.png", "ccb福气任务去完成.png", "ccb福气任务刷新按钮.png", "ccb福气任务领取奖励.png",];
    } else {
        file_name_list = ["芭芭农场施肥可拆开.png", "芭芭农场施肥点击领取.png"];
    }
    // 请求
    let save_path, req_url, update_count;
    update_count = 0;
    file_name_list.forEach(pic_name => {
        save_path = pic_path + pic_name;    // 文件路径
        req_url = originUrl + suffix + pic_name;     // 网络文件路径
        req = http.get(req_url)
        if (req.statusCode != '200') {
            toastLog('网络读取错误，可能文件不存在')
            sleep(800);
            log(pic_name + ", 更新失败");
            // alert('更新失败 退出');
        } else {
            // 写入文件
            log(pic_name + ", 更新成功");
            update_count = update_count + 1;
            // files.write(save_path, req.body.string());
            files.writeBytes(save_path, req.body.bytes());
        }
    })
    alert("更新:" + update_count + "/" + file_name_list.length + "个文件");
}

function update_files(specific_file_name) {
    let js_folder = files.cwd() + "/";
    let save_path, req_url, file_name;
    if (specific_file_name) {
        save_path = js_folder + specific_file_name;    // 文件路径
        req_url = originUrl + specific_file_name;     // 网络文件路径
        req = http.get(req_url);
        if (req.statusCode != '200') {
            toastLog("文件更新失败...");
            sleep(2600);
        }
        else {
            files.write(save_path, req.body.string());
            toastLog("文件更新成功...");
            sleep(2600);
        }
    } else {
        let download_progress = dialogs.build(
            {
                title: "下载进度",
                progress: {
                    max: jsFiles.length
                }
            }
        );
        download_progress.show();
        // 遍历读取文件
        for (i = 0; i <= jsFiles.length - 1; i++) {
            file_name = jsFiles[i];              // 文件名
            save_path = js_folder + file_name;    // 文件路径
            req_url = originUrl + file_name;     // 网络文件路径
            try {
                req = http.get(req_url);
                if (req.statusCode != '200') {
                    log(file_name + '网络读取错误，可能文件不存在')
                    sleep(800);
                } else {
                    log(file_name + ',更新完成 写入文件')
                    successCnt = successCnt + 1;
                    // 写入文件
                    files.write(save_path, req.body.string());
                }
                download_progress.setProgress(i + 1);
            }
            catch (err) {
                log(err);
                continue;
            }
        }
        download_progress.dismiss();
        return successCnt;
    }
}