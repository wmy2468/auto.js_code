//toastLog(id("com.jd.lib.cashier.feature:id/cd").findOnce().click());
var func = require("func_list.js");
//test on laptop

var devBrand = device.brand;
var 小米双开 = true;
if (currentPackage() != "com.jingdong.app.mall") {
    if (devBrand == 'HUAWEI') {
        waitLog(8, '等待一会儿..跳转回JD');
        func.toApp(appName);
    } else if (devBrand == 'xiaomi') {
        if (小米双开) {
            waitLog(15, '等待一会儿..跳转回JD');
            func.toAppMulti(appName, k);
        } else {
            waitLog(15, '等待一会儿..跳转回JD');
            func.toApp(appName);
        }
    } else {
        waitLog(15, '等待一会儿..跳转回JD');
        func.toApp(appName);
    }
}

function waitLog(cnt, textDetail) {
    while (cnt--) {
        toastLog(textDetail);
        sleep(2000);
    }
}