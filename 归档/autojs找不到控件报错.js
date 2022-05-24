let w = func.floaty_win_init();
setInterval(() => { }, 1000);
ui.run(function () {
    w.text.setFocusable(true);
})

thd_floaty = threads.start(function () {
    ui.run(function () {
        w.text.setText("jd run");
        w.requestFocus();
        w.text.requestFocus();
        ui.post(function () {
            w.text.clearFocus();
            w.disableFocus();
        }, 200);
    });
});
sleep(500);
thd_floaty.interrupt();