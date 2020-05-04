var func = require('./function_list');

pufa();
func.go_home();
zhaohang();
yunshanfu();
youchu();
jiaohang();
jdjr();
gonghang();
alert('执行完成');

// ---------------------京东金融签到---------------------------
function jdjr() {
    func.go_home();
    let pkg = 'com.jd.jrapp';
    let texts, ids, clsName;
    // 登陆
    func.run_app(pkg);
    //等待主界面加载
    while (func.item_is_load('text','总资产','TextView') == false) {
        //检测是否有弹窗，有则关闭
        let po = func.item_is_load('id', 'rl_top_searchiv_close', 'ImageView');
        let poo = func.item_is_load('id', 'iv_close', 'ImageView');
        let pooo = func.item_is_load('id', 'ibtn_zc_product_popup_close', 'ImageView');
        if (po != false) {func.item_click(po);}
        if (poo != false) {func.item_click(poo);}
        if (pooo != false) {func.item_click(pooo);}
        sleep(1500);
    }

    //点击信用
    ids = 'iv_third_icon';
    clsName = 'android.widget.ImageView';
    func.wait_load_click('id', ids, clsName);
    // 查找白条权益
    texts = '白条权益';
    clsName = 'android.widget.TextView';
    func.wait_load_click('text', texts, clsName);
    //判断是否已经加载
    clsName = 'android.view.View';
    texts = '信用白条 ';
    func.wait_item_load('text', texts, clsName);
    sleep(1000);
    // 白条抽奖
    texts = '今日机会已用完';
    // 判断是否已抽奖
    if (func.item_is_load('text', texts, clsName) != false) {
        console.log('今日已抽奖');
    } else {
        texts = '点击抽奖';
        func.wait_load_click('text', texts, clsName);
        sleep(5000);
    }
    // 切换到免费领券
    texts = '免费领券';
    func.wait_load_click('text', texts, clsName);
    texts = '支付券';
    func.wait_item_load('text', texts, clsName);

    let descs = '已领取';
    texts = '已领取';
    // 判断是否已领券
    if (func.item_is_load('text', texts, clsName) != false) {
        console.log('今日已领券');
        return;
    } 
    if (func.item_is_load('desc', descs, clsName) != false) {
        console.log('今日已领券');
        return;
    } 
    
    descs = '可领取';
    texts = '可领取';
    // 判断是否已领券
    po = func.item_is_load('text', texts, clsName);
    if (po != false) {
        func.item_click(po);
        return;
    } 
    else {
        po = func.item_is_load('desc', descs, clsName);
        func.item_click(po);
        return;
    }
}
// ---------------------京东金融签到---------------------------

// ---------------------云闪付签到---------------------------
function yunshanfu() {
    func.go_home();
    let pkg = 'com.unionpay';
    let texts, ids, clsName;
    // 登陆
    func.run_app(pkg);
    //等待主界面加载
    texts = '首 页';
    func.wait_item_load('text', texts);
    //等待主页元素加载完成
    clsName = 'android.widget.RelativeLayout';
    ids = 'rl_search';
    func.wait_item_load('id', ids, clsName);
    //点击签到
    ids = 'frog_float_notgif';
    clsName = 'android.widget.ImageView';
    if (func.item_is_load('id', ids, clsName) == false) {
        func.go_home();
        sleep(1000);
        func.run_app(pkg);
    }
    func.wait_load_click('id', ids, clsName);
    // 等待签到页面
    clsName = 'android.widget.TextView';
    let reg = '\\已连续签到.*';
    className(clsName).textMatches(reg).findOne();
    // 判断是否已签到
    texts = '已签到';
    if (func.item_is_load('text', texts)) {
        console.log('今日已签到');
    }
    else{
        texts = '立即签到';
        func.wait_load_click('text', texts);
        console.log('云闪付完成');
    }
}
// ---------------------云闪付签到---------------------------


// ---------------------掌上生活签到---------------------------
function zhaohang() {
    func.go_home();
    let pkg = 'com.cmbchina.ccd.pluto.cmbActivity';
    let texts, clsName;
    // 登陆
    func.run_app(pkg);
    //等待主界面加载
    texts = '我的';
    func.wait_load_click('text', texts);
    sleep(1500);
    //等待我的页面加载
    texts = '额度信贷';
    if (func.item_is_load('text', text)) {
        func.go_home();
        func.run_app(pkg);
        }
    func.wait_item_load('text', texts);
    // 检查签到按钮
    texts = 'sticky_top_scrolling_view';
    clsName = 'android.widget.ImageView';
    po = func.find_child_item('id', texts, clsName);
    console.log(po);
    if (po) {
        func.item_click(po);}
    else {
        sleep(2000);
        click((1026-798)/2+798,(420-324)/2+324);
    }
    // 等待活动规则页面加载完成
    clsName = 'android.view.View';
    texts = '活动规则';
    func.wait_item_load('text', texts, clsName);
    
    texts = '我知道了';
    while (func.item_is_load('text', texts, clsName) == false) {
        sleep(800);
        // 点击签到
        click((945-135)/2+135,(741-363)/2+363);
        sleep(2000);
    }
    func.wait_load_click('text', texts, clsName);
    console.log('招行完成');
}
// ---------------------掌上生活签到---------------------------

// ---------------------邮储签到---------------------------
function youchu() {
    func.go_home();
    let pkg = 'com.yitong.mbank.psbc.creditcard';
    let texts, clsName, ids;
    // 登陆
    func.run_app(pkg);
    //等待主界面加载
    texts = '我的';
    while (func.item_is_load('text', texts) == false) {
        texts = '继续使用';
        let po = func.item_is_load('text', texts);
        if (po != false) {
            func.item_click(po);
            break;
        }
        sleep(1500);
        texts = '我的';
    }
    texts = '我的';
    func.wait_load_click('text', texts);
    //等待我的页面加载
    texts = '我的额度'; 
    func.wait_item_load('text', texts);

    // 检查每日签到
    clsName = 'android.widget.ImageView';
    ids = 'module_08000000_iv';
    if (func.item_is_load('id', ids ,clsName) == false) {
        func.go_home();
        sleep(1000);
        func.run_app(pkg);
        }
    func.wait_load_click('id', ids, clsName);

    clsName = 'android.view.View';
    texts = '活动规则';
    func.wait_item_load('text', texts, clsName);
    sleep(1200);
    texts = '今日未签到';
    // 如果未签到，则执行 签到，否则返回
    if (func.item_is_load('text', texts, clsName) != false) {
        console.log('马上签到');
        texts = '马上签到';
        func.wait_load_click('text', texts, clsName);
    } 
    else {
        console.log('邮储完成');
    }
}
// ---------------------邮储吧签到---------------------------

// ---------------------浦发签到---------------------------
function pufa() {
    func.go_home();
    let pkg = 'com.spdbccc.app';
    let texts, ids, clsName;
    // 登陆
    func.run_app(pkg);
    // 等待首页扫一扫加载
    texts = '我的';
    clsName = 'android.widget.TextView';
    func.wait_load_click('text', texts);
    //等待我的页面加载
    texts = '已绑卡';
    func.wait_item_load('text', texts)
    // 等待 签到 加载 并点击
    ids = 'iv_user_leader_title_3';
    clsName = 'android.widget.ImageView';
    if (func.item_is_load('id', ids, clsName) == false) {
        func.go_home();
        func.run_app(pkg);
    }
    func.wait_load_click('id', ids, clsName);
    // 等待签到页面加载
    clsName = 'android.view.View';
    texts = '活动细则';
    func.wait_item_load('text', texts, clsName);
    // 如果找到今天已经签到 则退出
    texts = '今日已签到，明天再来吧！';
    if (func.item_is_load('text', texts, clsName) != false) {
        console.log('今天已签到，退出');
        return;
    }
    else {
        sleep(2000);
        click(288 + (792 - 288) / 2, 1081 + (1177 - 1081) / 2); //点击立即签到
        console.log('已点击 立即签到');
    }
    texts = '我知道了';
    func.wait_item_load('text', texts, clsName);
    console.log('浦发完成');
}
// ---------------------浦发签到---------------------------

// ---------------------工银e生活签到---------------------------
function gonghang() {
    func.go_home();
    let pkg = 'com.icbc.elife';
    let texts, ids, clsName;
    // 登陆
    func.run_app(pkg);
    clsName = 'android.widget.RadioButton';
    ids = 'radio_button3';
    func.wait_item_load('id', ids, clsName);
    // 检查app是否有有弹窗
    ids = 'iv_close';
    clsName = 'android.widget.ImageView';
    if (func.item_is_load('id', ids, clsName) != false) {
       func.item_click('id', ids, clsName);
    }
    // 等待 签到 加载 并点击
    texts = '购物';
    func.wait_load_click('text', texts);
    texts = '451832580929761280';
    clsName = 'android.widget.Image';
    func.wait_load_click('text', texts, clsName);
    
    // 循环判断是否已加载
    clsName = 'android.view.View';
    texts1 = '已签到';
    texts2 = '非签到日，周一见';
    while (func.item_is_load('text', texts1, clsName) == false
    &&
     func.item_is_load('text', texts2, clsName) == false) {
        texts = '点击签到';
        func.wait_load_click('text', texts, clsName);
        sleep(2000);
    }
    console.log('工行完成');
}
// ---------------------工银e生活签到---------------------------

// ---------------------买单吧签到---------------------------
function jiaohang() {
    func.go_home();
    let pkg = 'com.bankcomm.maidanba';
    let texts, clsName, act, po;
    // 登陆
    func.run_app(pkg);
    //等待主界面加载
    texts = '我的';
    func.wait_load_click('text', texts);
    // 检查每日签到
    texts = '每日签到';
    po = func.wait_item_load('text', texts);
    //如果银行卡位置没有数字，则点击后验证指纹
    ids = 'iv_card_empty';
    if (func.item_is_load('id', ids) != false) {
        func.wait_load_click('text', texts);
        // 等待 指纹加载
        texts = '通过指纹认证';
        func.wait_item_load('text', texts);
    }
    func.wait_load_click('text', texts);

    act = 'com.bankcomm.maidanba.activity.secpage.WelfareSocietyNewActivity';
    waitForActivity(act);
    texts = '客官明天再来呦';
    //如果没找到已签到 则点击签到
    if (func.item_is_load('text', texts) != false) {
        // 点击签到
        sleep(2000);
        click((1005-651)/2+651, (482-295)/2+295);
        sleep(2000);
        click((799-281)/2+281, (1647-1428)/2+1428);
    }
    else {
        console.log('交行完成');
    }
}
// ---------------------买单吧签到---------------------------
