let Pkg, LastPkg;

//MainPkg = 'org.autojs.autojs';

LastPkg = 'org.autojs.autojs';
//京东金融
Pkg = 'com.jd.jrapp';
LastPkg = run_wait_pkg(Pkg, LastPkg);

//云闪付
Pkg = 'com.unionpay';
LastPkg = run_wait_pkg(Pkg, LastPkg);

//掌上生活
Pkg = 'com.cmbchina.ccd.pluto.cmbActivity';
LastPkg = run_wait_pkg(Pkg, LastPkg);

//邮储信用卡
Pkg = 'com.yitong.mbank.psbc.creditcard';
LastPkg = run_wait_pkg(Pkg, LastPkg);

//浦发银行
Pkg = 'com.spdbccc.app';
LastPkg = run_wait_pkg(Pkg, LastPkg);

//交行
Pkg = 'com.bankcomm.maidanba';
LastPkg = run_wait_pkg(Pkg, LastPkg);

home();
alert('运行完成');

function run_wait_pkg(pack, last_pack) {
    launch(pack);
    sleep(2000);
    waitForPackage(last_pack, 500);
    return pack;
}