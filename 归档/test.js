//log(textContains('0/').findOnce().parent().child(0).text());
//log(text('前往').findOnce().parent().child(0).child(0).text());
//log(className('Image').textContains('.png').find()[0].parent().parent().parent().child(0).click());
// 商品点击
//log(text('逛商品').findOnce().parent().parent().child(3).child(1).click());

sClick(text('招钱进宝').findOne());
function sClick(element) {
    if (element != null) {
        if (!element.click()) {
            click(element.bounds().centerX(), element.bounds().centerY());
            return 1;
        }
    }
    return 0;
}

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