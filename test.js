var func=require('./function_list');
let po,ids,text;
ids = 'iv_user_leader_title_3';
clsName = 'android.widget.ImageView';
ids = 'user_myrp';
textt = '我的额度';
po = func.item_is_load('text+id', textt+'+'+ids);
toastLog(po);