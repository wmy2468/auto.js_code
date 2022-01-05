function main() {

    unlock();

    sleep(2000);
    toast("京东小米官方旗舰店");
    app.startActivity({
        action: "VIEW",
        data: "openApp.jdMobile://virtual?params={\"category\":\"jump\",\"des\":\"jshopMain\",\"shopId\":\"1000004123\",\"sourceType\":\"M_sourceFrom\",\"sourceValue\":\"dp\"}"
    });

    sleep(5000);
    toast("京东小米6详情页");
    app.startActivity({
        action: "VIEW",
        data: "openApp.jdMobile://virtual?params={\"category\":\"jump\",\"des\":\"productDetail\",\"skuId\":\"4099139\",\"sourceType\":\"JSHOP_SOURCE_TYPE\",\"sourceValue\":\"JSHOP_SOURCE_VALUE\"}"
    });
}

function unlock() {
    auto.waitFor();
    device.wakeUpIfNeeded();
    sleep(500);
    swipe(800, 2000, 800, 800, 500);
    sleep(500);

    click(6);
    sleep(500);
    click(6);
    sleep(500);
    click(8);
    sleep(500);
    click(3);
    sleep(500);

    click(1111, 2257);
}

main();