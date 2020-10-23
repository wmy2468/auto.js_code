"ui";
//导入包
importClass(java.net.URL);
importClass(android.graphics.BitmapFactory);
importClass(android.graphics.Bitmap);

ui.layout(
    <frame>
        <img id = "ewm" src="https://img.zcool.cn/community/010ad7575faad10000012e7e0be5bb.gif"/>
    </frame>
);
let str = "我是要生成的二维码内容";
var imgUrl = "http://qr.topscan.com/api.php?text=" +str;
//必须线程运行
threads.start(function() {
    //在新线程执行的代码
    try {
        //需要异常处理
        let picUrl = new URL(imgUrl);
        let pngBM = BitmapFactory.decodeStream(picUrl.openStream());
        ui.run(function() {
            //进行线程更新
            ui.ewm.setImageBitmap(pngBM);
        })

    } catch (err) {
        //输出错误信息
        log(err);
    }
});