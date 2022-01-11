auto.waitFor();
//toastLog(id("com.jd.lib.cashier.feature:id/cd").findOnce().click());
var func = require("func_list.js");
var cfg = func.config_dict();
var invite_friend_img_text = "047afc56e31d6d4b";
var mission_key_word = "0爆竹";

member_card();

function member_card() {
    let authority, authority_idx;
    sleep(random_second(3500, 300, 1000));
    if (is_in_invite_friend_page()) {
        toastLog("member_card: 已有卡，在去完成界面，直接完成");
        return 0;
    }
    let authority_join;
    authority_join = textContains("确认授权并加入").findOnce();
    if (authority_join == null) {
        toastLog("member_card: 已有卡，未发现去完成描述，直接完成");
        sleep(random_second(1500, 80, 450));
    } else {
        log("member_card2: 加会员");
        while (1) {
            authority = textContains("确认授权即同意").findOnce();
            if (authority != null) {
                authority_idx = authority.indexInParent();
                if (func.cClick(authority.parent().child(authority_idx - 1))) {
                    sleep(random_second(1800, 100, 1000));
                    break;
                }
                sleep(random_second(1800, 100, 1000));
            }
        }
        sleep(1500);
        func.sClick(authority_join);
        sleep(3000);
    }
}

function is_in_invite_friend_page(need_find_one) {
    if (need_find_one == undefined) {
        if (className("Image").text(invite_friend_img_text).findOnce() != null) {
            // toastLog("已找到 邀请好友助力 任务");
            return true;
        } else {
            // toastLog("未找到 邀请好友助力 任务");
            return false;
        }
    } else {
        // toastLog("开始查找邀请好友助力 任务");
        className("Image").text(invite_friend_img_text).findOne();
        // toastLog("已找到 邀请好友助力 任务");
        return true;
    }
}
function random_second(second, st, ed) {
    /** *
    @param {int} second 延迟的时间: 
    @param {int} st 随机开始值
    @param {int} ed 随机结束值
    */
    if (st >= ed) {
        return second;
    } else {
        return func.randomNum(st, ed) + second;
    }
}