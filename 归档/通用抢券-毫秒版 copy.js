//---------------配置区域-----------------
var dic = new Array();
/*  
如果要跑新的软件，需要在这里新增
0. 抢购软件名称             dic['苏宁茅台'] =  [
1. 抢购时间 格式10: 10: 10 10点10分10秒     '10:00:00',
2. 第一个元素, 元素参数含义
    a) 要点击位置的文本                          例： ['茅台 飞天 酱香型白酒 53度 500ml', 2, 1],              
    b) 点击的次数， 如存在多个相同文本的按钮     例： 2
    c) 设置点击第几个文本，默认1                例： 1
    d) 查找Text还是Desc                        例： TEXT,TEXT-CONTAINS(含有某个字符) DESC，DESC-CONTAINS(含有某个字符) 一般为TEXT
    e) 特殊字符串定位                          例: 某些字符存在多个，需要绑定另一个参数才能定位
    最后一个元素后面没有逗号 注意看
3. 第二个元素....N个元素
*/
// 任务列表，有新的就加入到这里来
dic['天猫茅台'] = [
    '手机淘宝',
    '19,59,59,950',
    ['结算(1)', 1, 1, 'TEXT'],
    ['提交订单', 5, 1, 'TEXT']
];
dic['光大天猫'] = [
    '阳光惠生活',
    '10,00,00,000',
    ['确认购买', 2, 1, 'TEXT']
];
dic['工行京东199-100'] = [
    '京东金融',
    '10,00,00,000',
    ['javascript, void 0;', 100, 1, 'TEXT']
];
dic['苏宁茅台'] = [
    '苏宁易购',
    '9,59,59,765',
    ['javascript:void(0);', 1, 1, 'TEXT'],
    ['立即抢购', 1, 1, 'TEXT'],
    ['提交订单', 1, 1, 'TEXT']
];
dic['e生活30-10'] = [
    '工银e生活',
    '9,30,00,000',
    ['确 定', 2, 1, 'TEXT']
];
dic['e生活50-25'] = [
    '工银e生活',
    '10,30,00,005',
    ['去支付', 2, 1, 'TEXT']
];
dic["交行贴金"] = [
    '交通银行',
    '12,00,00,000',
    ['text(\'立即抢兑\').find()', 2, '.parent().parent().child(1).text() === \'满5元可用\''],
    ['text(\'确认兑换\').findOnce()', 2, 1]
];

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
// ------------------------------------------------------
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
    var tDate = getToday() + ',' + targetTime;
    stDate = tDate.split(',');
    var targetTimestamp = new Date(stDate[0], stDate[1], stDate[2], stDate[3], stDate[4], stDate[5], stDate[6]).getTime();
    curTimestamp = new Date().getTime();
    // 等待时间
    while (curTimestamp < targetTimestamp) {
        curTimestamp = new Date().getTime();
    }
}

function 交行贴金() {
    var appName = '交通银行';
    var targetTime = '12,00,00,000';
    var elements, clickEle;
    isInApp(appName);
    //   定位元素
    while (1) {
        elements = text('立即抢兑').find();
        if (elements.empty()) {
            continue;
        }
        var cnt = 0;
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