auto.waitFor();

var i = 0;
var j = 0;
var taskList = ['去完成'];

let kouLing = '28.0复制整段话 Https:/JYDWNoVro4qHi1【全民在线营业啦，帮我助力，11.11一起来分京东10亿】￥N2Jae9a23b%→打开（京つ東】';
let appName = '京东';
setClip(kouLing);
sleep(1000);
log("正在打开淘宝");
func.toApp(appName);
log("正在等待进入活动页面");
//等待点击 立即查看按钮
func.click(className("TextView").text("立即查看").findOne());
// 助力关闭按钮
func.click(className('android.view.View').textContains('的助力邀请').findOne().parent().parent().child(1));

let getGold = text('领金币').findOne();
sleep(800);
func.click(getGold);

textContains('邀请好友助力').waitFor();
sleep(800);

func.click(text('签到'.findOnce()));
let idx = 2;

taskList.forEach(task => {
    while (textContains(task).exists()) {
		unComplete = text('去完成').find();
		if (unComplete.nonEmpty()) {
			idxText = unComplete[idx].parent().parent().parent().child(0).child(1).text();
			toastLog(idxText);
			if (idxText.indexOf('去玩AR吃') == -1) {
			}
		}
    }
});

log("Done!");
exit();