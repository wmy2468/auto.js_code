//https://gitee.com/JJ1573/auto.js_code/raw/master/通用抢券,复杂元素.js
// var originUrl = 'https://gitee.com/JJ1573/auto.js_code/raw/master/';
var originUrl = 'https://raw.githubusercontent.com/mw03251214/auto.js_code/master/';
// var originUrl = "https://gitlab.com/mw03251214/auto-js_code/-/raw/master/";

var jg_user = "mw03251214@163.com";
var jg_key = "arncqibcyzuv5msh";
var jg_headers = {
    "Authorization": "Basic " + java.lang.String(android.util.Base64.encode(java.lang.String(jg_user + ':' + jg_key).getBytes(), 2)),
    "Content-Type": "text/plain;charset=UTF-8",
    "Connection": "Keep-Alive",
    "Accept-Encoding": "gzip",
    "User-Agent": "okhttp/3.12.1"
};


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
    alert('更新' + update_files() + '个文件');
} else if (selectIndex == 1) {
    // 更新图片
    let suffix = "piccs/";
    let pic_path = files.cwd() + "/" + suffix;
    log("删除文件夹：" + files.removeDir(pic_path));
    // update_files("update all.js");
    files.ensureDir(pic_path);          // 确保路径存在
    // 路径
    let file_name_list;
    // Mate30 才需要更新ccb文件
    file_name_list = ["支付宝芭芭农场每日领取.png", "淘宝芭芭农场可拆开.png", "淘宝芭芭农场每日领取.png", "淘宝芭芭农场兔子灯笼.png",
        "ccb收藏任务中心.png"];
    // "支付宝芭芭农场点击领取.png", "支付宝芭芭农场点击领取2.png", "支付宝芭芭农场点击领取3.png"
    // 请求
    let save_path, update_count;
    update_count = 0;
    file_name_list.forEach(pic_name => {
        update_count = update_count + 1;
        save_path = pic_path + pic_name;    // 文件路径
        update_files(pic_name, suffix, true);
    })
    alert("更新:" + update_count + "/" + file_name_list.length + "个文件");
}

function update_files(specific_file_name, specific_path, is_pic) {
    let js_folder = files.cwd() + "/";
    let save_path, file_name, res_text;
    let is_pic = is_pic || false;
    let specific_path = specific_path || "";
    let jg_path = "auto.js_code/" + specific_path;

    // log(jg_path);
    // 更新指定文件名
    if (specific_file_name) {
        save_path = js_folder + specific_path + specific_file_name;    // 文件路径
        // log(jg_path);
        res_text = jianguoyun(jg_path, specific_file_name, is_pic);
        if (res_text == "") {
            toastLog("文件更新失败...");
            sleep(2600);
        }
        else {
            // toastLog(specific_file_name + ",更新成功...");
            // sleep(2600);
            if (is_pic) {
                files.writeBytes(save_path, res_text);
            } else {
                files.write(save_path, res_text);
            }
        }
    } else {
        let dir = files.cwd();
        //获取路径下所有JS结尾的文件
        let jsFiles = files.listDir(dir, function (name) {
            return name.endsWith(".js") && files.isFile(files.join(dir, name));
        });
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
            // log(file_name);
            save_path = js_folder + file_name;    // 文件路径
            res_text = jianguoyun(jg_path, file_name);
            try {
                if (res_text == "") {
                    toastLog(file_name + ",文件更新失败...");
                    sleep(2600);
                }
                else {
                    files.write(save_path, res_text);
                    log(file_name + "，文件更新成功...");
                    successCnt = successCnt + 1;
                    // sleep(2600);
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



function jianguoyun(path, file_name, is_pics) {
    let is_pics = is_pics || false;
    // log("is_pics:", is_pics);
    try {
        let res = http.get('https://dav.jianguoyun.com/dav/' + path + file_name,
            {
                headers: jg_headers
            }
        );
        // threads.shutDownAll();
        if (is_pics) {
            return res.body.bytes();
        } else {
            return res.body.string();
        }
        // engines.execScript(CONFIG.scriptName, res);
    } catch (error) {
        alert("加载超时,请重启脚本,请检查网络.或者该文件已经被作者删除~~~");
        return "";
    }
}