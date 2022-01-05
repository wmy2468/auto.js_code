console.show();
log("请打开任务界面！");
text("做任务领金币").waitFor();
log("开始自动点击小金人...");
sleep(1000);
var i = 0;
while(true)
{
    i++;
    var a = text("点我得金币").findOne(5000);
    if(a != null)
    {
        log("第"+i+"次点击");
        a.parent().parent().click();
        sleep(random(500,800));
        if(i % 5 == 0)
        {
            sleep(7000);
        }
    }
    else
    {
        log("今日小金人已点完！")
        break
    }
}