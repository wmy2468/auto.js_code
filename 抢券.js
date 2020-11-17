auto.waitFor();
// 导入模块
var func = require('func_list.js');
// 123
var selectedArr = [
    '每日10点光大天猫',
    '中信9积分',
    '中行赞卡微信',
    '中行赞卡缤纷'
];

//淘宝测试();
main();

//---------------配置区域-----------------
function main() {
    let selectIndex = dialogs.select('先打开抢购页面,再启动', selectedArr);
    if (selectIndex == -1) {
        exit();
    }
    let scriptName = selectedArr[selectIndex];
    //engines.execScript(scriptName, (eval(scriptName + '()')));
    eval(scriptName + '()');
    toastLog('结束');
}

function 模板() {
    let appName = '交通银行';
    let targetTime = '12,00,00,000';
    let clickEle;
    isInApp(appName);
    //   定位元素
    isInTime(targetTime);
    func.sClick(clickEle);
    func.sClick(text('确认兑换').findOne());
}

// ------------------------------------------------------
function getToday() {
    var date = new Date();
    var seperator1 = ",";
    var year = date.getFullYear();
    var month = date.getMonth();
    var strDate = date.getDate();
    return year + seperator1 + month + seperator1 + strDate;
}

// 判断是否切换到APP
function isInApp(appName) {
    // 等待APP启动
    while (currentPackage() != getPackageName(appName)) {
        log('等待APP加载');
        sleep(500);
    }
    toastLog('APP已加载');
    sleep(400);
}
// 判断时间
function isInTime(targetTime) {
    let tDate = getToday() + ',' + targetTime;
    stDate = tDate.split(',');
    let targetTimestamp = new Date(stDate[0], stDate[1], stDate[2], stDate[3], stDate[4], stDate[5], stDate[6]).getTime();
    let timeDiff = func.getTimeDiff('a');
    curTimestamp = new Date().getTime() + timeDiff;
    // 等待时间
    while (curTimestamp < targetTimestamp) {
        curTimestamp = new Date().getTime() + timeDiff;
    }
}
// ------------------------------------------------------

// 等待页面变价
function 每日10点光大天猫() {
    let appName = '阳光惠生活';
    let elements;
    isInApp(appName);
    // 等待进入指定页面
    text('【活动编号】23851').findOne();
    toastLog('已到达指定页面，等待');
    sleep(800);
    //   定位元素
    toastLog(text('提醒我').findOnce());
    while (1) {
        if !(text('提醒我').findOnce()) {
            sleep(300);
            continue;
        }
        break;
    }
    func.sClick(text('确认购买').findOne());
    toastLog('结束');
    sleep(800);
}

// 等待页面变价
function 交行贴金() {
    let appName = '交通银行';
    let targetTime = '12,00,00,100';
    let elements, clickEle;
    isInApp(appName);
    //   定位元素
    while (1) {
        elements = text('立即抢兑').find();
        if (elements.empty()) {
            continue;
        }
        let cnt = 0;
        while (1) {
            if (elements[cnt].parent().parent().child(1).text == '满10元可用') {
                clickEle = elements[cnt];
                toastLog('已找到点击的元素');
                break;
            }
            cnt = cnt + 1;
            if (cnt == elements.length) {
                cnt = 0;
            }
        }
        break;
    }
    isInTime(targetTime);
    func.sClick(clickEle);
    func.sClick(text('确认兑换').findOne());
}

// 跳转页面提交订单
function 天猫茅台() {
    let appName = '手机淘宝';
    let targetTime = '20,00,00,100';
    let elements;
    isInApp(appName);
    //   定位元素
    while (1) {
        elements = text('结算(1)').findOnce();
        if (elements == null) {
            continue;
        }
        toastLog('已找到点击的元素');
        break;
    }
    isInTime(targetTime);
    func.sClick(elements);
    func.sClick(className("TextView").text("提交订单").findOne());
}


// 准点进页面
function 中行赞卡微信() {
    let appName = '微信';
    let targetTime = '10,00,00,100';
    let elements;
    isInApp(appName);
    //   定位元素
    while (1) {
        elements = text('【赞卡专享】全国三网通用话费30元电子券').findOnce();
        if (elements == null) {
            continue;
        }
        toastLog('已找到点击的元素');
        break;
    }
    // 确认时间
    isInTime(targetTime);
    // 加载第一个
    func.sClick(elements);
    // 查找并 点击立即获取
    func.sClick(className('Button').text('立即获取').findOne());
}

// 准点进页面
function 中行赞卡缤纷() {
    let appName = '缤纷生活';
    let targetTime = '10,00,00,100';
    let elements;
    isInApp(appName);
    //   定位元素
    while (1) {
        elements = text('【赞卡专享】全国三网通用话费30元电子券').findOnce();
        if (elements == null) {
            continue;
        }
        toastLog('已找到点击的元素');
        break;
    }
    // 确认时间
    isInTime(targetTime);
    // 加载第一个
    func.sClick(elements);
    // 查找并 点击立即获取
    func.sClick(className('TextView').id('tvExchangetext').text('立即获取').findOne());
}