function main() {

    unlock();

    sleep(2000);
    toast("淘宝李宁官方旗舰店");
    app.startActivity({
        action: "VIEW",
        data: "taobao://shop.m.taobao.com/shop/shop_index.htm?shop_id=57299736"
    });

    sleep(5000);
    toast("淘宝时尚潮流复古学生眼镜框");
    app.startActivity({
        action: "VIEW",
        data: "taobao://shop.m.taobao.com/shop/shop_index.htm?shop_id=525249416835"
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