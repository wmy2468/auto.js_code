let t1 = new Date().getTime();
let go1 = className('android.view.View').text('去完成').find()
let t2 = new Date().getTime();
toastLog(t2-t1);
toastLog(go1.length);
toastLog(go1[1])