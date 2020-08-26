text('立即领取').findOne();
sleep(800);
let getNow = text('立即领取').find();
let i = getNow.length;
while (i--) {
    log(getNow[i].parent().child(0).text());
}
toastLog('done');