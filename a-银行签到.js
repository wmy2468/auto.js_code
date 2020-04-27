var func = require('./function_list');

spdbccc();
icbc_elife();

// ---------------------浦发签到---------------------------
function spdbccc() {
    let pkg = 'com.spdbccc.app';
    let text, id, className;
    // 登陆
    func.run_app(pkg);
    text = '我的';
    func.wait_item_load(pkg, 'text', text);
    func.item_click(pkg, 'text', text);
    // 等待 签到 加载 并点击
    id = 'iv_user_leader_title_3';
    className = 'android.widget.ImageView';
    func.wait_item_load(pkg, 'id', id, className);
    func.item_click(pkg, 'id', id, className);
    // 等待签到页面加载
    className = 'android.view.View';
    text = '今天';
    func.wait_item_load(pkg, 'text', text, className);
    // 如果找到今天已经签到 则退出
    text = '今日已签到，明天再来吧！';
    if (func.item_is_load(pkg, 'text', text, className)) {
        toastLog('今天已签到，退出');
        return;
    }
    else {
        click(288 + (792 - 288) / 2, 1081 + (1177 - 1081) / 2); //点击立即签到
    }
    text = '指纹验证';
    func.wait_item_load(pkg, 'text', text);
    text = '我知道了';
    func.wait_item_load(pkg, 'text', text, className);
    func.item_click(pkg, 'text', text, className);
}
// ---------------------浦发签到---------------------------

// ---------------------工银e生活签到---------------------------
function icbc_elife() {
    let pkg = 'com.icbc.elife';
    let text, id, className;
    // 登陆
    func.run_app(pkg);
    className = 'android.widget.RadioButton';
    id = 'radio_button3';
    func.wait_item_load(pkg, 'id', id, className);
    // 检查app是否有有弹窗
    id = 'iv_close';
    className = 'android.widget.ImageView';
    if (func.item_is_load(pkg, 'id', id, className)) {
       func.item_click(pkg, 'id', id, className);
    }
    // 等待 签到 加载 并点击
    text = '购物';
    func.wait_load_click(pkg, 'text', text);
    text = '451832580929761280';
    className = 'android.widget.Image';
    func.wait_load_click(pkg, 'text', text, className);
    text = '点击签到';
    className = 'android.view.View';
    func.wait_load_click(pkg, 'text', text, className);
    text = '已签到';
    if (func.wait_item_load(pkg, 'text', text, className)) {
        toastLog('已签到');
    }
}
// ---------------------工银e生活签到---------------------------