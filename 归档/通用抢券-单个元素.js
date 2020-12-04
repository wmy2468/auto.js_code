auto.waitFor();
// 导入模块
var func = require('func_list.js');
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
    最后一个元素后面没有逗号 注意看
3. 第二个元素....N个元素
*/
// 任务列表，有新的就加入到这里来
dic['光大天猫'] = [
    '阳光惠生活',
    '10,00,00,100',
    ['确认购买', 2, 1, 'TEXT']
];
dic['工行京东199-100'] = [
    '京东金融',
    '10,00,00,100',
    ['javascript: void 0;', 100, 1, 'TEXT']
];
dic['e生活30-10'] = [
    '工银e生活',
    '9,30,00,100',
    ['确 定', 2, 1, 'TEXT']
];
dic['e生活50-25'] = [
    '工银e生活',
    '10,30,00,100',
    ['去支付', 2, 1, 'TEXT']
];
/*
dic['掌上生活消费礼'] = [
    '掌上生活',
    '10,00,00,000',
    ['立即抢', 100, 1, 'TEXT']
];
dic['京东茅台'] = [
    '京东',
    '9,59,59,765',
    ['茅台 飞天 酱香型白酒 53度 500ml', 2, 1, 'TEXT-CONTAINS'],
    ['立即抢购', 2, 1, 'TEXT']
];
*/
//---------------配置区域-----------------

//---------------程序区域-----------------
// 设置任务名称
var selectedArr = Object.keys(dic);

var selectIndex = dialogs.select('先打开抢购页面,再启动', selectedArr);
//toastLog(selectIndex);
if (selectIndex == -1) { exit() };
// 数字从0开始。
var selected = selectedArr[selectIndex];

//调用主函数
main();

// 元素点击
function eleClick(clickP, count) {
    if (clickP.click() == false) {
        while (count--) { click(clickP.bounds().centerX(), clickP.bounds().centerY()); }
    } else {
        while (--count) { clickP.click(); }
    }
}

// 根据不同位置获取 要点击的元素。
function getElementText(sText, elementPos, txOrTxC) {
    var res;
    if (elementPos == 1) {
        if (txOrTxC == 'TEXT') {
            return text(sText).findOnce();
        } else {
            return textContains(sText).findOnce();
        }
    } else {
        if (txOrTxC == 'TEXT') {
            res = text(sText).find();
        } else {
            res = textContains(sText).find();
        }
        if (res.empty()) {
            return null;
        } else {
            return res[elementPos - 1];
        }
    }
}

function singleEleClick(element, timeFlag, targetTimestamp, timeArea) {
    //element 要点击位置的文本，    点击的次数， 如存在多个相同文本的按钮      设置点击第几个文本，默认1 
    var eleSearchFlag = 1;
    var clickP, clickCnt, curTimestamp;
    var timeDiff = func.getTimeDiff(timeArea);
    while (1) {
        if (eleSearchFlag) {
            clickP = getElementText(element[0], element[2], element[3]);
            // 如果元素为null则 continue
            if (clickP == null) {
                continue;
            }
            eleSearchFlag = 0;
            clickCnt = element[1];                  //点击的次数
            toastLog('已找到点击的元素');
            log('已找到要点击的元素，' + '点击第' + element[2] + '个' + element[0]);
        }
        if (timeFlag) {
            // 获取时间戳
            curTimestamp = new Date().getTime() + timeDiff;
            // 如果时间不符合条件
            if (curTimestamp < targetTimestamp) {
                continue;
            }
        }
        // 元素点击
        eleClick(clickP, clickCnt);
        break;
    }
}

function getToday() {
    var date = new Date();
    var seperator1 = ",";
    var year = date.getFullYear();
    var month = date.getMonth();
    var strDate = date.getDate();
    return year + seperator1 + month + seperator1 + strDate;
}

//点击函数
function main() {
    var selectVal = dic[selected];
    //如果数据在字典中不存在则退出
    //exit();
    device.keepScreenOn(1000 * 60 * 10);              //设置屏幕6分钟常亮
    var appName = selectVal[0];          // 抢购软件名称
    var timeArea;
    if (appName.indexOf('京东') == -1) {
        timeArea = 'others';
    } else {
        timeArea = '京东';
    }

    // 等待APP启动
    while (currentPackage() != getPackageName(appName)) {
        sleep(500);
    }
    toastLog('已打开抢购APP');
    //设置开始抢购的时间
    var selectValLen = selectVal.length;    // 单个事件的元素个数。
    var mClickFlag = 0;                     //多个点击元素标记
    // 如果元素超过3个。则表示有多个元素要点击，赋值为1
    if (selectValLen > 3) {
        mClickFlag = 1;
    }
    var tDate = getToday() + ',' + selectVal[1];
    stDate = tDate.split(',');
    // 当前日期+时间 转化成时间戳
    var targetTimestamp = new Date(stDate[0], stDate[1], stDate[2], stDate[3], stDate[4], stDate[5], stDate[6]).getTime();
    //alert(targetTimestamp);
    // 等待点击第一个元素
    singleEleClick(selectVal[2], 1, targetTimestamp, timeArea);
    // 判断是否有多个元素
    if (mClickFlag) {
        var startPos = 4;       // 从第4个元素开始点击
        while (startPos <= selectValLen) {
            singleEleClick(selectVal[startPos - 1], 0, 0, 0);
            startPos = startPos + 1;
        }
    }
    toastLog('结束');
    device.cancelKeepingAwake();
}
