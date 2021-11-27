// --------------url scheme--------------
var 产品ID = "";
产品ID = "http://coupon.m.jd.com/coupons/show.action?key=g7udi9d8e5260e8b7a8a76c0d01209e8&roleId=62130462";
// 1. 跳转京喜APP，需要修改  => 产品ID
url_京喜 = "openapp.jdpingou://virtual?params=%7B%22des%22%3A%22m%22%2C%22url%22%3A%22https%3A%2F%2Fitem.m.jd.com%2Fitem%2Fjxview%3Fsku%3D" + 产品ID + "%22%2C%22category%22%3A%22jump%22%7D"
// 跳转京东APP的商品详情
url_京东 = "openapp.jdMobile://virtual?params=%7B%22sourceValue%22:%220_productDetail_97%22,%22des%22:%22productDetail%22,%22skuId%22:%22" + 产品ID + "%22,%22category%22:%22jump%22,%22sourceType%22:%22PCUBE_CHANNEL%22%7D";

券链接 = ""
url_京喜_券页面 = "openapp.jdpingou://virtual?params=%7B%22des%22%3A%22m%22%2C%22url%22%3A%22" + 券链接 + "%22%2C%22category%22%3A%22jump%22%7D"

url_工行小象 = "com.icbc.androidclient://startType=PORTALINJECT&menuId=xiaoxiangleyuan&shareCurrentUUID=";

url_农行小豆 = "bankabc://%7B%22method%22%3A%22jumpToSharedProduct%22%2C%22param%22%3A%22rR4uOmAzpF49gqwDYQiLp20AltfnLciJg3Fyp5ijEIlD6KSfPdLMNyKsM8JboO6MwU4dRe9KEsPXqC4shEX19X6hEiWyiILqbgLFXv9xJ5Jc7WP8cgtQBKyWQwTlznpR47%2BlnPSHUcgGQwprcCrZljQQsb3H9RhiJ2D2qeBt4JJz84Yh2iQ9R1lu%2FY%2BWKtaP25m0LbNLiCBYzuVXpAI%2BZfQKjVDNu72M0bgLPJtM1yg7oAXVGsadNuQMbKRz0XWTmkZzKVNYYupr4XqG08l6VvoOh1qETuzMO5mSCup%2FrhpJbwn4v5yYWC68q2FmK6K8YXpHZRtZyVIQwKrZKYjGCZ%2BdeHNIQKJe2plRNjawvy1QfB%2FYEIxcT68HT63j3KJK0%2FxlZSrAvT9cbSKRHkxleVMdKn8uj8HVMWs8l1DMdrLJK0tNFerEfKnSptOj4bSiQ6kvE4M2fMWrUzVIDPYLCHe2xvp9kZOZufXgyE5wze30A6S1HhYbMbNNCql08lmP0wQ3l%2Fp8fBF6hmgoQ73vZPphwCEOQxonP7IzQJC9%2Bl03cbmmPDij%2BBHrrczU55456whyF167TTNstajIJ4rERfcYdlkv3VOQEaXo%2BsUUrdXbI6wjb9vErff5hUgaW2%2FMl%2FZjNZthSCybk58RIUT3ndyGTtBSg%2B3hP4C4%2FvzRl3TXL0yiIELKVkzrELbYENRqWib%2B5aGXN1a54ll48VdKQiJFSZhEfYp27AW49Qxe7epmorgOuUBd76FZwMZCR%2Bg1QRnSS21%2F0PRVHSvWj3BDeST7nIue51s83rsZb9rkrE52ADZNwBV5mFrcRYyQoaKe%22%7D"

var url_浦发储蓄卡金豆页面 = "spdbbank://wap.spdb.com.cn/awakeapp?login_flag=0&support_type=1&path=vue|mspmk-cli-welfare/goldenBean&APP_VERSION=@appVersion&from=shouye&login_flag=0&support_type=1"

var url_招商便民 = "cmbmobilebank://cmbls/functionjump?action=gocorpno&corpno=791166&cmb_app_trans_parms_start=here&channel=share&appflag=0";

app.startActivity({
    action: "android.intent.action.VIEW",
    data: url_招商便民,
});

// --------------url scheme--------------