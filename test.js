//toastLog(id("com.jd.lib.cashier.feature:id/cd").findOnce().click());
var func = require("func_list.js");
//test on laptop

func.sClick(text("稍后再说").findOnce());

function inputPwd(number) {
    var centerX = 540, centerY = 1952;
    var offsetX = 360, offsetY = 154;
    var nums = {
        0: [centerX, centerY + offsetY + offsetY],      //x,y++

        1: [centerX - offsetX, centerY - offsetY],      //x-,y-
        2: [centerX, centerY - offsetY],                //x,y-
        3: [centerX + offsetX, centerY - offsetY],      //x+,y-
        4: [centerX - offsetX, centerY],                //x-,y
        5: [centerX, centerY],                          //x,y
        6: [centerX + offsetX, centerY],                //x+,y
        7: [centerX - offsetX, centerY + offsetY],      //x-,y+
        8: [centerX, centerY + offsetY],                //x,y+
        9: [centerX + offsetX, centerY + offsetY]       //x+,y+
    }
    var point = nums[number];
    click(point[0], point[1]);
}