// --------------url scheme--------------
// 1. 跳转京喜APP，需要修改  => 产品ID
url_京喜 = "openapp.jdpingou://virtual?params=%7B%22des%22%3A%22m%22%2C%22url%22%3A%22https%3A%2F%2Fitem.m.jd.com%2Fitem%2Fjxview%3Fsku%3D" + 产品ID + "%22%2C%22category%22%3A%22jump%22%7D"
url_京东 = "openapp.jdMobile://virtual?params=%7B%22sourceValue%22:%220_productDetail_97%22,%22des%22:%22productDetail%22,%22skuId%22:%22" + 产品ID + "%22,%22category%22:%22jump%22,%22sourceType%22:%22PCUBE_CHANNEL%22%7D";

app.startActivity({
    action: "android.intent.action.VIEW",
    data: url,
});

// --------------url scheme--------------