//toastLog(id("com.jd.lib.cashier.feature:id/cd").findOnce().click());
var func = require("func_list.js");
//test on laptop

func.sClick(id('com.jd.lib.jshop:id/asj').findOnce());
func.sClick(id('com.jd.lib.jshop.feature:id/gd').findOnce());
func.sClick(id('com.jd.lib.jshop.feature:id/mj').findOnce());
func.sClick(desc('关闭页面').findOnce());
func.sClick(idContains('close').findOnce());
func.sClick(textContains('离开').findOnce());
func.sClick(textContains('我要离开').findOnce());
func.sClick(textContains('放弃').findOnce());
func.sClick(textContains('知道了').findOnce());
func.sClick(textContains('待会再来').findOnce());
func.sClick(className("android.widget.ImageView").depth(11).findOnce())