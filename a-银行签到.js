var func = require('./function_list');

pufa();
gonghang();
youchu();
zhanshang();
yunshanfu();
jdjr();
jiaohang();
alert('执行完成');
// ---------------------京东金融签到---------------------------
function jdjr() {
    let pkg = 'com.jd.jrapp';
    let text, id, clsName;
    // 登陆
    func.run_app(pkg);
    //等待主界面加载
    clsName = 'android.widget.RelativeLayout';
    id = 'rl_top_search';
    func.wait_item_load('id', id, clsName);
    //检测是否有弹窗，有则关闭
    clsName = 'android.widget.ImageView';
    id = 'rl_top_searchiv_close';
    let po = func.item_is_load('id', id, clsName);
    if (po) {
        func.item_click(po);
    }
    //点击信用
    id = 'iv_third_icon';
    clsName = 'android.widget.ImageView';
    func.wait_load_click('id', id, clsName);
    // 查找白条权益
    text = '白条权益';
    clsName = 'android.widget.TextView';
    func.wait_load_click('text', text, clsName);
    //判断是否已经加载
    clsName = 'android.view.View';
    text = '信用白条 ';
    func.wait_item_load('text', text, clsName);
    sleep(1000);
    // 白条抽奖
    text = '今日机会已用完';
    // 判断是否已抽奖
    if (func.item_is_load('text', text, clsName)) {
        toastLog('今日已抽奖');
    } else {
        text = '点击抽奖';
        func.wait_load_click('text', text, clsName);
        sleep(5000);
    }
    // 切换到免费领券
    text = '免费领券';
    func.wait_load_click('text', text, clsName);
    text = '支付券';
    func.wait_item_load('text', text, clsName);
    text = '已领取';
    // 判断是否已领券
    if (func.item_is_load('text', text, clsName)) {
        toastLog('今日已领券');
    } else {
        func.item_click(po.parent().child(1));
    }
}
// ---------------------京东金融签到---------------------------

// ---------------------云闪付签到---------------------------
function yunshanfu() {
    let pkg = 'com.unionpay';
    let text, id, clsName;
    // 登陆
    func.run_app(pkg);
    //等待主界面加载
    text = '首 页';
    func.wait_item_load('text', text);
    
    //点击签到
    id = 'frog_float_notgif';
    clsName = 'android.widget.ImageView';
    if (!func.item_is_load('id', id, clsName)) {
        home();
        func.run_app(pkg);
    }
    func.wait_load_click('id', id, clsName);
    // 等待签到页面
    clsName = 'android.widget.TextView';
    let reg = '\\已连续签到.*';
    className(clsName).textMatches(reg).findOne();
    // 判断是否已签到
    text = '已签到';
    if (func.item_is_load('text', text)) {
        toastLog('今日已签到');
    }
    else{
        text = '立即签到';
        func.wait_load_click('text', text);
        toastLog('签到完成');
    }
}
// ---------------------云闪付签到---------------------------


// ---------------------掌上生活签到---------------------------
function zhaohang() {
    let pkg = 'com.cmbchina.ccd.pluto.cmbActivity';
    let text, clsName;
    // 登陆
    func.run_app(pkg);
    //等待主界面加载
    text = '我的';
    func.wait_load_click('text', text);
    //等待我的页面加载
    text = '额度信贷';
    func.wait_item_load('text', text);
    // 检查签到按钮
    text = 'sticky_top_scrolling_view';
    clsName = 'android.widget.ImageView';
    po = func.find_child_item('id', text, clsName);
    toastLog(po);
    if (po) {
        func.item_click(po);}
    else {
        click((1026-798)/2+798,(420-324)/2+324);
    }
    // 等待活动规则页面加载完成
    clsName = 'android.view.View';
    text = '活动规则';
    func.wait_item_load('text', text, clsName);
    sleep(1000);
    // 如果未签到，则执行 签到，否则返回
    click((945-135)/2+135,(741-363)/2+363);
    text = '我知道了';
    func.wait_load_click('text', text, clsName);
    toastLog('签到完成');
}
// ---------------------掌上生活签到---------------------------

// ---------------------邮储签到---------------------------
function youchu() {
    let pkg = 'com.yitong.mbank.psbc.creditcard';
    let text, clsName, po;
    // 登陆
    func.run_app(pkg);
    toastLog();
    //等待主界面加载
    text = '我的';
    func.wait_load_click('text', text);
    //等待我的页面加载
    id = 'user_myrp';
    text = '我的额度';
    func.wait_item_load('text+id', text + '+' + id);
    // 检查每日签到
    clsName = 'android.widget.ImageView';
    id = 'module_08000000_iv';
    po = func.wait_load_click('id', id, clsName);

    clsName = 'android.view.View';
    text = '活动规则';
    func.wait_item_load('text', text, clsName);
    text = '今日未签到';
    // 如果未签到，则执行 签到，否则返回
    if (func.item_is_load('text', text, clsName)) {
        toastLog('马上签到');
        text = '马上签到';
        func.wait_load_click('text', text, clsName);
    } 
    else {
        toastLog('今日已签到');
    }
}
// ---------------------邮储吧签到---------------------------

// ---------------------浦发签到---------------------------
function pufa() {
    let pkg = 'com.spdbccc.app';
    let text, id, clsName;
    // 登陆
    func.run_app(pkg);
    // 等待首页扫一扫加载
    text = '我的';
    clsName = 'android.widget.TextView';
    func.wait_load_click('text', text);
    // 等待 签到 加载 并点击
    id = 'iv_user_leader_title_3';
    clsName = 'android.widget.ImageView';
    if (!func.item_is_load('id', id, clsName)) {
        home();
        func.run_app(pkg);
    }
    func.wait_load_click('id', id, clsName);
    // 等待签到页面加载
    clsName = 'android.view.View';
    text = '活动细则';
    func.wait_item_load('text', text, clsName);
    // 如果找到今天已经签到 则退出
    text = '今日已签到，明天再来吧！';
    if (func.item_is_load('text', text, clsName)) {
        toastLog('今天已签到，退出');
        return;
    }
    else {
        click(288 + (792 - 288) / 2, 1081 + (1177 - 1081) / 2); //点击立即签到
    }
    text = '指纹验证';
    func.wait_item_load('text', text);
    text = '我知道了';
    func.wait_item_load('text', text, clsName);
    func.item_click('text', text, clsName);
}
// ---------------------浦发签到---------------------------

// ---------------------工银e生活签到---------------------------
function gonghang() {
    let pkg = 'com.icbc.elife';
    let text, id, clsName;
    // 登陆
    func.run_app(pkg);
    clsName = 'android.widget.RadioButton';
    id = 'radio_button3';
    func.wait_item_load('id', id, clsName);
    // 检查app是否有有弹窗
    id = 'iv_close';
    clsName = 'android.widget.ImageView';
    if (func.item_is_load('id', id, clsName)) {
       func.item_click('id', id, clsName);
    }
    // 等待 签到 加载 并点击
    text = '购物';
    func.wait_load_click('text', text);
    text = '451832580929761280';
    clsName = 'android.widget.Image';
    func.wait_load_click('text', text, clsName);
    text = '点击签到';
    clsName = 'android.view.View';
    func.wait_load_click('text', text, clsName);
    text = '已签到';
    if (func.wait_item_load('text', text, clsName)) {
        toastLog('已签到');
    }
}
// ---------------------工银e生活签到---------------------------

// ---------------------买单吧签到---------------------------
function jiaohang() {
    let pkg = 'com.bankcomm.maidanba';
    let text, clsName, act, po;
    // 登陆
    func.run_app(pkg);
    //等待主界面加载
    text = '我的';
    func.wait_load_click('text', text);
    // 检查每日签到
    text = '每日签到';
    po = func.wait_item_load('text', text);
    //如果银行卡位置没有数字，则点击后验证指纹
    id = 'iv_card_empty';
    if (func.item_is_load('id', id)) {
        func.wait_load_click('text', text);
        // 等待 指纹加载
        text = '通过指纹认证';
        func.wait_item_load('text', text);
    }
    func.wait_load_click('text', text);

    act = 'com.bankcomm.maidanba.activity.secpage.WelfareSocietyNewActivity';
    waitForActivity(act);
    text = '客官明天再来呦';
    //如果没找到已签到 则点击签到
    if (!func.item_is_load('text', text)) {
        // 点击签到
        click((1005-651)/2+651, (482-295)/2+295);
        sleep(1500);
        click((799-281)/2+281, (1647-1428)/2+1428);
    }
    else {
        toastLog('买单吧已签到');
    }
}
// ---------------------买单吧签到---------------------------

