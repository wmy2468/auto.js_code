var selectedArr = ['交行贴金',
    '天猫茅台',
    '中行赞卡微信',
    '中行赞卡缤纷'
];


main();

//---------------配置区域-----------------
function main() {
    let selectIndex = dialogs.select('先打开抢购页面,再启动', selectedArr);
    if (selectIndex == -1) {
        exit();
    }
    let scriptName = selectedArr[selectIndex];
    engines.execScript(scriptName, (eval(scriptName + '()')).toString);
}

function 模板() {
    let appName = '交通银行';
    let targetTime = '12,00,00,000';
    let elements, clickEle;
    isInApp(appName);
    //   定位元素
    isInTime(targetTime);
    sClick(clickEle);
    sClick(text('确认兑换').findOne());
}

// ------------------------------------------------------
function cClick(element) {
    if (element != null) {
        click(element.bounds().centerX(), element.bounds().centerY());
        return true;
    } else { return false; }
}

function sClick(element) {
    if (element != null) {
        if (!element.click()) {
            click(element.bounds().centerX(), element.bounds().centerY());
        }
        sleep(500);
        return true;
    } else { return false; }
}

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
}
// 判断时间
function isInTime(targetTime) {
    let tDate = getToday() + ',' + targetTime;
    stDate = tDate.split(',');
    let targetTimestamp = new Date(stDate[0], stDate[1], stDate[2], stDate[3], stDate[4], stDate[5], stDate[6]).getTime();
    curTimestamp = new Date().getTime();
    // 等待时间
    while (curTimestamp < targetTimestamp) {
        curTimestamp = new Date().getTime();
    }
}
// ------------------------------------------------------

// 等待页面变价
function 交行贴金() {
    let appName = '交通银行';
    let targetTime = '12,00,00,000';
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
            if (elements[cnt].parent().parent().child(1).text == '满5元可用') {
                clickEle = elements[cnt];
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
    sClick(clickEle);
    sClick(text('确认兑换').findOne());
}

// 跳转页面提交订单
function 天猫茅台() {
    let appName = '手机淘宝';
    let targetTime = '20,00,00,000';
    let elements;
    isInApp(appName);
    //   定位元素
    while (1) {
        elements = text('结算(1)').findOnce();
        if (elements == null) {
            continue;
        }
        break;
    }
    isInTime(targetTime);
    sClick(elements);
    sClick(className("TextView").text("提交订单").findOne());
}

// 准点进页面
function 中行赞卡微信() {
    let appName = '微信';
    let targetTime = '10,00,00,000';
    let elements;
    isInApp(appName);
    //   定位元素
    while (1) {
        elements = text('【赞卡专享】全国三网通用话费30元电子券').findOnce();
        if (elements == null) {
            continue;
        }
        break;
    }
    // 确认时间
    isInTime(targetTime);
    // 加载第一个
    sClick(elements);
    // 查找并 点击立即获取
    sClick(className('Button').text('立即获取').findOne());
}

// 准点进页面
function 中行赞卡缤纷() {
    let appName = '缤纷生活';
    let targetTime = '10,00,00,000';
    let elements;
    isInApp(appName);
    //   定位元素
    while (1) {
        elements = text('【赞卡专享】全国三网通用话费30元电子券').findOnce();
        if (elements == null) {
            continue;
        }
        break;
    }
    // 确认时间
    isInTime(targetTime);
    // 加载第一个
    sClick(elements);
    // 查找并 点击立即获取
    sClick(className('TextView').id('tvExchangetext').text('立即获取').findOne());
}