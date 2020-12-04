auto.waitFor();
// Function list-----------------------------------------------------------
function find_child_item(type, val, clsName) {
    if (clsName == undefined || clsName == '') {
        clsName = 'android.widget.TextView';
    }
    var target = null;
    switch (type) {
        case 'text':
            if (text(val).findOnce() != null) {
                text(val).findOnce().children().forEach(
                    child => { target = child.findOne(className(clsName)); });
            }
            break;
        case 'id':
            if (id(val).findOnce() != null) {
                id(val).findOnce().children().forEach(
                    child => { target = child.findOne(className(clsName)); });
            }
            break;
    }
    if (target != null) { return target; }
    else { return false; }
}

function wait_load_click(type, val, clsName) {
    var po = wait_item_load(type, val, clsName);
    item_click(po);
}
// 判断元素是否加载
function item_is_load(type, val, clsName) {
    // 设置classname 默认值
    if (clsName == undefined || clsName == '') {
        clsName = 'android.widget.TextView';
    }
    var target;
    switch (type) {
        case 'text':
            target = text(val).className(clsName).findOnce();
            break;
        case 'id':
            target = id(val).className(clsName).findOnce();
            break;
        case 'desc':
            target = desc(val).className(clsName).findOnce();
            break;
        case 'text+id':
            var text_id = val.split('+');
            var text_val = text_id[0];
            var id_val = text_id[1];
            target = text(text_val).id(id_val).className(clsName).findOnce();
            break;
    }
    if (target != null) {
        log(type + '--' + val + '--已加载');
        return target;
    }
    else {
        log(type + '--' + val + '--未加载');
        return false;
    }
}
// 等待元素加载
function wait_item_load(type, val, clsName) {
    // 设置classname 默认值
    if (clsName == undefined || clsName == '') {
        clsName = 'android.widget.TextView';
    }
    var target;
    switch (type) {
        case 'text':
            target = text(val).className(clsName).findOne();
            break;
        case 'id':
            target = id(val).className(clsName).findOne();
            break;
        case 'desc':
            target = desc(val).className(clsName).findOne();
            break;
        case 'text+id':
            var text_id = val.split('+');
            var text_val = text_id[0];
            var id_val = text_id[1];
            target = text(text_val).id(id_val).className(clsName).findOne();
            break;
    }
    log(type + '--' + val + '--已加载');
    return target;
}
// 点击元素
function item_click(po) {
    if (po == null) {
        log('输入点为null 无法点击');
        return;
    }
    if (po.clickable()) {
        log('已点击clickable');
        sleep(2000);
        po.click();
    }
    else {
        log('已点击centerXY');
        sleep(2000);
        click(po.bounds().centerX(), po.bounds().centerY());
    }
}
// 判断是否启动app
function run_app(pkg) {
    while (true) {
        if (currentPackage() != pkg) {
            log(pkg + '--未打开，执行打开...');
            app.launch(pkg)
            //var apps = getAppName(pkg);
            //app.launchApp(apps);
            sleep(4000);
        } else {
            break;
        }
    }
}

function act_is_load(act) {
    if (currentActivity() === act) { return true; }
    else { return false; }
}

function go_back() {
    back();
    sleep(1000);
}


function go_home() {
    sleep(800);
    launchApp("Auto.js");
    sleep(2000);
}

module.exports = {
    go_home: go_home,
    wait_load_click: wait_load_click,
    item_is_load: item_is_load,
    wait_item_load: wait_item_load,
    item_click: item_click,
    run_app: run_app,
    go_back: go_back,
    act_is_load: act_is_load,
    find_child_item: find_child_item
}

//例子
// const square = require('square.js');
// const mySquare = square(2);
// console.log("正方形的面积是 %d", mySquare.area());
// square 模块定义在 square.js 中：

// 赋值给 `exports` 不会修改模块，必须使用 `module.exports`
// module.exports (width) {
//   return {
//     area: () => width ** 2
//   };
// };