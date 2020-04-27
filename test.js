let pkg, act, className,text;
var func = require('function_list.js');

pkg = 'com.jingdong.app.mall';
func.run_app('com.jingdong.app.mall');
act = 'com.jingdong.app.mall.MainFrameActivity';
if (!func.check_activity(act)) {
    func.go_back();
}
sleep(1000);
className = 'android.widget.TextView';
text = '首页';
func.item_click(pkg, 'text', text, className);
text = '领京豆';
func.wait_load_click(pkg, 'text', text, className);
text = '进店领豆';
func.wait_item_load(pkg, 'text', text, className);
text = '已连续签到';
if (func.item_is_load(pkg, 'text', text, className)) {
    toastLog('今日已签到');
}
else {
    text = '签到领京豆';
    func.item_click(pkg, 'text', text, className);
    text = '签到提醒';
    func.wait_item_load(pkg, 'text', text, className);
    toastLog('签到成功');
}

func.go_back();