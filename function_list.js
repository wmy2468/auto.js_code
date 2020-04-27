// Function list-----------------------------------------------------------
function wait_load_click(pkg, type, value, className ,value_id) {
    wait_item_load(pkg, type, value, className,value_id);
    if (item_is_load(pkg, type, value, className,value_id)) {
        item_click(pkg, type, value, className,value_id);
    }
}
// 判断元素是否加载
function item_is_load(pkg, type, value, className, value_id) {
    // 设置classname 默认值
    if (className == undefined || className == '') {
        className = 'android.widget.TextView';
    }
    let result;
    switch (type) {
        case 'text':
            result = packageName(pkg).text(value).className(className).findOnce();
            break;
        case 'id':
            result = packageName(pkg).id(value).className(className).findOnce();
            break;
        case 'text+id':
            result = packageName(pkg).text(value).id(value_id).className(className).findOnce();
            break;
    }
    if (result != null) {
        toastLog(type + '--' + value + '--已加载');
        return true;
    } 
    else {
        toastLog(type + '--' + value + '--未加载');
        return false;
    }
}
// 等待元素加载
function wait_item_load(pkg, type, value, className, value_id) {
    // 设置classname 默认值
    if (className == undefined || className == '') {
        className = 'android.widget.TextView';
    }
    let result;
    switch (type) {
        case 'text':
            result = packageName(pkg).text(value).className(className).findOne();
            break;
        case 'id':
            result = packageName(pkg).id(value).className(className).findOne();
            break;
        case 'text+id':
            result = packageName(pkg).text(value).id(value_id).className(className).findOne();
            break;
    }
    if (result != null) {
        toastLog(type + '--' + value + '--已加载');
        return true;
    } 
    else {
        toastLog(type + '--' + value + '--未加载');
        return false;
    }
}
// 点击元素
function item_click(pkg, type, value, className, value_id) {
    let point;
    // 设置classname 默认值
    if (className == undefined || className == '') {
        className = 'android.widget.TextView';
    }
    switch (type) {
        case 'id':
            point = packageName(pkg).className(className).id(value).findOnce();
            if (point != null) {
                if (point.clickable()) {
                    point.click();
                }
                else {
                    click(point.bounds().centerX(), point.bounds().centerY());
                }
            }
            sleep(800);
            break;
        case 'text':
            point = packageName(pkg).className(className).text(value).findOnce();
            if (point != null) {
                if (point.clickable()) {
                    point.click();
                }
                else {
                    click(point.bounds().centerX(), point.bounds().centerY());
                }
            }
            sleep(800);
            break;
        case 'text+id':
            point = packageName(pkg).className(className).text(value).id(value_id).findOnce();
            if (point != null) {
                if (point.clickable()) {
                    point.click();
                }
                else {
                    click(point.bounds().centerX(), point.bounds().centerY());
                }
            }
            sleep(800);
            break;
    }
}
// 判断是否启动app
function run_app(pkg) {
    while (true) {
        if (currentPackage() != pkg) {
            toastLog(pkg + '--未打开，执行打开...');
            app.launch(pkg);
            sleep(3000);
        } else {
            sleep(1000);
            break;
        }
    }
}

function check_activity(act) {
    if (currentActivity() == act) {return true;}
    else {return false;}
}

function go_back(){
    back();
    sleep(1000);
}

module.exports = {
    wait_load_click : wait_load_click,
    item_is_load : item_is_load,
    wait_item_load : wait_item_load,
    item_click : item_click,
    run_app : run_app,
    check_activity : check_activity,
    go_back : go_back
};

//例子
// const square = require('square.js');
// const mySquare = square(2);
// console.log("正方形的面积是 %d", mySquare.area());
// square 模块定义在 square.js 中：

// 赋值给 `exports` 不会修改模块，必须使用 `module.exports`
// module.exports = function(width) {
//   return {
//     area: () => width ** 2
//   };
// };