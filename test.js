//log(text('京东小魔方').findOnce());

// log(text('线上线下同款同价').find());

let ddPets = className('TextView').text('东东萌宠').findOnce();
let beans = className('TextView').text('豆豆成长值').findOnce();
let beans2 = className('TextView').text('豆苗成长值').findOnce();
let beans3 = className('TextView').text('记得点击气泡浇灌营养液哦！！').findOnce();
let getBeans = className('TextView').text('领京豆').findOnce();
let palyPlay = className('TextView').text('玩一玩').findOnce();
let couponCenter = className('ImageView').desc('领券中心').findOnce();
let cityFeast = className('android.view.View').text('线上线下同款同价').findOnce();
let oneRnb = className('android.webkit.WebView').text('京东1元包邮').findOnce();
let millionCoupon = className('android.webkit.WebView').text('618万券齐发').findOnce();
let openRedPack2 = className('android.webkit.WebView').text('全民开红包').findOnce();
let goodThing = textContains('互动好物会场').findOnce();
//let magCube = className('android.webkit.WebView').text('京东小魔方').findOnce();
let newGoods = className('android.webkit.WebView').text('逛新品 赚京豆').findOnce();


log(1, ddPets);
log(2, beans);
log(3, beans2);
log(4, beans3);
log(5, getBeans);
log(6, palyPlay);
log(7, couponCenter);
log(8, cityFeast);
log(9, oneRnb);
log(10, millionCoupon);
log(11, openRedPack2);
log(12, goodThing);
//log(13, magCube);
log(14, newGoods);
