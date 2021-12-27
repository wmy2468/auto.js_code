// --------------url scheme--------------
let 产品ID = "http://coupon.m.jd.com/coupons/show.action?key=g7udi9d8e5260e8b7a8a76c0d01209e8&roleId=62130462";
// 1. 跳转京喜APP，需要修改  => 产品ID
let url_京喜 = "openapp.jdpingou://virtual?params=%7B%22des%22%3A%22m%22%2C%22url%22%3A%22https%3A%2F%2Fitem.m.jd.com%2Fitem%2Fjxview%3Fsku%3D" + 产品ID + "%22%2C%22category%22%3A%22jump%22%7D"
// 跳转京东APP的商品详情
let url_京东 = "%7B%22des%22%3A%22productDetail%22%2C%22category%22%3A%22jump%22%2C%22skuId%22%3A%22" + 产品ID + "%22%7D";

券链接 = ""
let url_京喜_券页面 = "openapp.jdpingou://virtual?params=%7B%22des%22%3A%22m%22%2C%22url%22%3A%22" + 券链接 + "%22%2C%22category%22%3A%22jump%22%7D"

// let url_工行小象 = "com.icbc.androidclient://startType=PORTALINJECT&menuId=xiaoxiangleyuan&shareCurrentUUID=";
let url_工行小象 = "com.icbc.androidclient://startType=PORTALINJECT&menuId=taskCenter&injectParams=dGFyZ2V0PWVsZmxk&shareCurrentUUID="

let url_农行小豆 = "bankabc://%7B%22method%22%3A%22jumpToSharedProduct%22%2C%22param%22%3A%22rR4uOmAzpF49gqwDYQiLp20AltfnLciJg3Fyp5ijEIlD6KSfPdLMNyKsM8JboO6MwU4dRe9KEsPXqC4shEX19X6hEiWyiILqbgLFXv9xJ5Jc7WP8cgtQBKyWQwTlznpR47%2BlnPSHUcgGQwprcCrZljQQsb3H9RhiJ2D2qeBt4JJz84Yh2iQ9R1lu%2FY%2BWKtaP25m0LbNLiCBYzuVXpAI%2BZfQKjVDNu72M0bgLPJtM1yg7oAXVGsadNuQMbKRz0XWTmkZzKVNYYupr4XqG08l6VvoOh1qETuzMO5mSCup%2FrhpJbwn4v5yYWC68q2FmK6K8YXpHZRtZyVIQwKrZKYjGCZ%2BdeHNIQKJe2plRNjawvy1QfB%2FYEIxcT68HT63j3KJK0%2FxlZSrAvT9cbSKRHkxleVMdKn8uj8HVMWs8l1DMdrLJK0tNFerEfKnSptOj4bSiQ6kvE4M2fMWrUzVIDPYLCHe2xvp9kZOZufXgyE5wze30A6S1HhYbMbNNCql08lmP0wQ3l%2Fp8fBF6hmgoQ73vZPphwCEOQxonP7IzQJC9%2Bl03cbmmPDij%2BBHrrczU55456whyF167TTNstajIJ4rERfcYdlkv3VOQEaXo%2BsUUrdXbI6wjb9vErff5hUgaW2%2FMl%2FZjNZthSCybk58RIUT3ndyGTtBSg%2B3hP4C4%2FvzRl3TXL0yiIELKVkzrELbYENRqWib%2B5aGXN1a54ll48VdKQiJFSZhEfYp27AW49Qxe7epmorgOuUBd76FZwMZCR%2Bg1QRnSS21%2F0PRVHSvWj3BDeST7nIue51s83rsZb9rkrE52ADZNwBV5mFrcRYyQoaKe%22%7D"

let url_浦发储蓄卡金豆页面 = "spdbbank://wap.spdb.com.cn/awakeapp?login_flag=0&support_type=1&path=vue|mspmk-cli-welfare/goldenBean/";

let url_招商便民 = "cmbmobilebank://cmbls/functionjump?action=gocorpno&corpno=791166&cmb_app_trans_parms_start=here&channel=share&appflag=0";

let url_ccb签到 = "ccbapp://utils?ccbEncodeParam=ruapsj7I2qua8pR6GnzLuNDjkpEFwI6MLyIzj8A6hPaK13CAzdfO7%2F6FFEhz6IaYUiKwTF8ckUCewiBaPOk9a0gAifErjtXiC0HouhULgghYW08MmyPehRxGnG7a2aIGU2QjeJhu7V0b6NBf0Dn4bm%2BVZNZM91%2FAchT1Q3CtLi5xA7XtYGFbHP%2FS3%2FE%3D"

let url_招商饭票签到 = "cmbmobilebank://cmbls/functionjump?action=gocorpno&corpno=100856&cmb_app_trans_parms_start=here&param=v2&appflag=0"

let url_ysf会员中心 = "upwallet://applet?encryptAppId=472741b326b7bb5c&toLink=https%3A%2F%2Fcloudvip.95516.com%2F&scenarioId=1006"

let url_中信 = "citicbankdkkj://go?dl=ctrl%3A%2F%2FcommonWap%7B%22wapType%22%3A%22noMerchantNum%22%2C%22merchantNum%22%3A%22%22%2C%22merchantUrl%22%3A%22https%3A%2F%2Fmtp.creditcard.ecitic.com%2Fciticcard%2Fmtplocallife%2Findex.html%23%2FgoodsDetail%3Fitem_id%3D000001774871d8380001ab01%22%2C%22utm_info%22%3A%7B%22utm_campaign%22%3A%22%22%2C%22utm_entrance%22%3A%22%22%2C%22utm_source%22%3A%22%22%2C%22utm_term%22%3A%22%22%7D%7D"

let url_jd_陪伴计划签到 = "openApp.jdMobile://virtual?params=%7B%22category%22%3A%22jump%22%2C%22des%22%3A%22m%22%2C%22url%22%3A%22https%3A%2F%2Fprodev.m.jd.com%2Fmall%2Factive%2FkPM3Xedz1PBiGQjY4ZYGmeVvrts%2Findex.html%22%7D";

let url_zfb_余额宝 = "alipays://platformapi/startapp?appId=20000032";

let url_ysf = "upwallet://rn/rncoupondetail?couponId=3102021122131595";

let url_auto_Js = "upwallet://rn/rncoupondetail?couponId=3102021122131595";

let url_ccb = "ccbapp://applet.ccb.com?funcid=18001001&app_type=1&appid=app2021071500000001&appName=龙支付签到&launchFrom=desktop&launchFrom=desktop";

app.startActivity({
    action: "android.intent.action.VIEW",
    data: url_jd_test,
});

// --------------url scheme--------------