//log(textContains('0/').findOnce().parent().child(0).text());
//log(text('前往').findOnce().parent().child(0).child(0).text());
//log(className('Image').textContains('.png').find()[0].parent().parent().parent().child(0).click());
// 商品点击
//log(text('逛商品').findOnce().parent().parent().child(3).child(1).click());

log(center_click(className('ImageView').desc('浮层活动').findOnce().parent()));


function center_click(element) {
    if (element != null) {
        if (element.clickable()) {
            element.click();
            return true;
        } else {
            click(element.bounds().centerX(), element.bounds().centerY());
            sleep(800);
            return true;
        }
    } else { return false; }
}