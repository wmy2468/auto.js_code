var txt = "https://ifom.icbc.com.cn/mobile/common/startApp.jhtml?channelId=1&promotionId=20201211202012S12407&startType=ATTEND_GROUP&teamId=020201216023986163";
var result = "https%3a%2f%2fifom.icbc.com.cn%2fmobile%2fcommon%2fstartApp.jhtml%3fchannelId%3d1%26promotionId%3d20201211202012S12407%26startType%3dATTEND_GROUP%26teamId%3d020201216023986163";
toastLog(encodeURIComponent(txt));
toastLog(encodeURIComponent(txt) == result);