//---------------配置区域-----------------
/*  
如果要跑新的软件，需要在这里新增
0. 抢购软件名称             dic['苏宁茅台'] =  [
2. 第一个元素, 元素参数含义
    a) 要点击位置的文本                          例： ['茅台 飞天 酱香型白酒 53度 500ml', 2, 1],              
    b) 点击的次数， 如存在多个相同文本的按钮     例： 2
    c) 设置点击第几个文本，默认1                例： 1
    d) 查找Text还是Desc                        例： TEXT,TEXT-CONTAINS(含有某个字符) DESC，DESC-CONTAINS(含有某个字符) 一般为TEXT
    最后一个元素后面没有逗号 注意看
3. 第二个元素....N个元素
*/
// 任务列表，有新的就加入到这里来
dic = [
    '手机淘宝',
    '20,00,00,000',
    ['结算(1)', 1, 1, 'TEXT'],
    ['提交订单', 10, 1, 'TEXT']
];
//---------------配置区域-----------------

//---------------程序区域-----------------
//调用主函数
main();

// 元素点击
function eleClick(clickP) {
    if (clickP.click() == false) {
        click(clickP.bounds().centerX(), clickP.bounds().centerY())
    }
}

// 根据不同位置获取 要点击的元素。
function getElementText(sText, elementPos, txOrTxC) {
    var res;
    if (elementPos == 1) {
        if (txOrTxC == 'TEXT') {
            return text(sText).findOnce();
        } else if (txOrTxC == 'id') {
            return id(sText).findOnce();
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

//点击函数
function main() {
    var selectVal = dic;
    //如果数据在字典中不存在则退出
    //exit();
    var appName = selectVal[0]          // 抢购软件名称
    launchApp(appName);
    // 等待APP启动
    while (currentPackage() != getPackageName(appName)) {
        sleep(500);
    }
    toastLog('已打开抢购APP');
    var _1stTime = 0, _2ndTime = 0, loadTime = 0;
    var ele1, ele1find, ele2, cnt = 2;
    if (selectVal.length > 3) {
        ele1 = selectVal[cnt];
        while (1) {
            var ele1st = new Date().getTime();
            if (getElementText(ele1[0], ele1[2], ele1[3]) != null) {
                var ele1ed = new Date().getTime();
                _1stTime = ele1ed - ele1st;
                ele1find = getElementText(ele1[0], ele1[2], ele1[3]);
                break;
            }
        }
        eleClick(ele1find);
        ele2 = selectVal[cnt + 1];
        loadst = new Date().getTime();
        while (1) {
            var ele2st = new Date().getTime();
            if (getElementText(ele2[0], ele2[2], ele2[3]) != null) {
                var ele2ed = new Date().getTime();
                _2ndTime = ele2ed - ele2st;
                break;
            }
        }
        var loaded = new Date().getTime();
        loadTime = loaded - loadst - _2ndTime;
    }

    alert("元素1 查找时间:" + _1stTime + "ms\n" + "元素2 查找时间:" + _2ndTime + "ms\n" + "页面加载时间:" + loadTime + "ms\n");
    //device.cancelKeepingAwake();
}
