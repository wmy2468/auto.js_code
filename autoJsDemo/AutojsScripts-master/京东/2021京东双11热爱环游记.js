// 任务关键字
const KEYWORD = '可得';
const FINISHED_KEYWORD = ['任务已完成', /获得\d+汪汪币/, '已浏览'];
// 任务类型
const TASK_TYPE = {
  Browse: 1, // 浏览
  BrowseForWhile: 2, // 浏览一段时间
  AddMarketCar: 3, // 添加购物车
  SeeShop: 4, // 逛店铺
  JoinMember: 5, // 加入会员
  GoHome: 6, // 去首页
  ToShare: 7, // 去分享
  Shopping: 8, // 下单
  JumpToApp: 9, // 去其他界面/App
};

// 判断停留时间
let JUDGE_TIME = 0;
// 定时器
let interval;

main();

function main() {
  //start();

  // 子线程开启计时
  threads.start(function () {
    if (interval == null) {
      // 开启计时器，进行卡顿计时
      JUDGE_TIME = 0; // 启动定时器前，将计数器归为0
      log("开启定时器");
      interval = setInterval(function () {
        JUDGE_TIME = JUDGE_TIME + 1;
      }, 1000);
    }
  });

  //enterActivity();

  while (true) {
    viewTask();
    recoverApp();
  }
}

// 启动京东
function start() {
  auto.waitFor()
  var appName = "京东";
  launchApp(appName);
  console.show();
}

// 进入活动中心 JD这里需要手动进入下活动中心，故没有写代码
function enterActivity() {
  sleep(2000);
  click(1380, 2260);
  sleep(5000);
  click(1285, 2018);
  sleep(2000);
}

function viewTask() {
  if (textContains(KEYWORD).exists()) {
    sleep(500);
    let widgets = textContains(KEYWORD).find();
    for (index = 0; index < widgets.length; index++) {
      let widget = widgets[index];
      let widgetParent = widget.parent();
      let progress = widgetParent.child(1).text();
      let describe = widgetParent.child(2).text();
      let num = parseInt(progress.match(/\d+(?=\/)/g));
      let total = parseInt(progress.match(/\d+(?=\))/g));
      //log(progress + " " + num + "/" + total + " " + describe);
      if (num < total) {

        let taskType = TASK_TYPE.Browse;
        if (/去首页/.test(progress)) {
          taskType = TASK_TYPE.GoHome;
        } else if (/逛大牌店铺/.test(progress)) {
          taskType = TASK_TYPE.SeeShop;
        } else if (/浏览可得/.test(describe)) {
          taskType = TASK_TYPE.Browse;
        } else if (/邀人/.test(describe)
          || /每邀\d+个好友/.test(describe)) {
          taskType = TASK_TYPE.ToShare;
        } else if (/下单/.test(describe)) {
          taskType = TASK_TYPE.Shopping;
        } else if (/浏览.*\d+s可得/.test(describe)) {
          taskType = TASK_TYPE.BrowseForWhile;
        } else if (/\d+个商品/.test(describe)) {
          taskType = TASK_TYPE.AddMarketCar;
        } else if (/成功入会/.test(describe)) {
          taskType = TASK_TYPE.JoinMember;
        } else if (/去小程序/.test(describe)) {
          taskType = TASK_TYPE.JumpToApp;
        }

        // 跳过一些任务
        if (taskType == TASK_TYPE.GoHome
          //|| taskType == TASK_TYPE.JoinMember
          || taskType == TASK_TYPE.ToShare
          || taskType == TASK_TYPE.Shopping
          || taskType == TASK_TYPE.JumpToApp) {
          continue;
        }

        let buttonWidget = widgetParent.child(3);
        //click(buttonWidget.bounds().centerX(), buttonWidget.bounds().centerY());
        if (buttonWidget.click()) {
          JUDGE_TIME = 0;// 点击任务 重置计时
          log("正在进行任务:" + progress.match(/.*(?=\()/) + " " + (num + 1) + "/" + total + " " + describe);
          sleep(3000);

          if (taskType == TASK_TYPE.Browse) {
            returnNow();
          } else if (taskType == TASK_TYPE.BrowseForWhile) {
            returnLater();
          } else if (taskType == TASK_TYPE.AddMarketCar) {
            addMarketCar();
          } else if (taskType == TASK_TYPE.SeeShop) {
            seeShop();
          } else if (taskType == TASK_TYPE.JoinMember) {
            joinMember();
          } else {
            returnNow();
          }
        }
      }
      sleep(1000);
    }
  }
}

function returnNow() {
  sleep(1000);
  if (back()) {
    sleep(1000);
  }
}

function returnLater() {
  sleep(10000);
  if (back()) {
    sleep(1000);
  }
}

function addMarketCar() {
  // textMatches(/¥(?=\d+)/).exists()
  if (textContains('¥').exists()) {
    sleep(500);
    let widgets = textContains('¥').find();
    for (index = 0; index < widgets.length; index++) {
      if (index == 5) {
        if (back()) {
          sleep(1000);
          break;
        }
      }
      let widget = widgets[index];
      let widgetParent = widget.parent();
      let buttonWidget = widgetParent.child(5);
      if (buttonWidget.click()) {
        log("    加购第" + (index + 1) + "个商品");
        sleep(2000);
        if (back()) {
          sleep(1000);
        }
      }
    }
  }
}

function seeShop() {
  if (textContains('自营').exists()) {
    sleep(500);
    let widgets = textContains('自营').find();
    for (index = 0; index < widgets.length; index++) {
      if (index == 5) {
        if (back()) {
          sleep(1000);
          break;
        }
      }
      let widget = widgets[index];
      let widgetParent = widget.parent();
      let buttonWidget = widgetParent.child(4);
      if (buttonWidget.click()) {
        log("    逛第" + (index + 1) + "个店铺");
        sleep(2000);
        if (back()) {
          sleep(1000);
        }
      }
    }
  }
}

function joinMember() {
  sleep(1000);
  if (back()) {
    sleep(1000);
  }
}

// 自动判断程序是否卡顿，恢复方法
// 判断依据：1.不在活动界面 2.停留某个界面长达30s
function recoverApp() {
  if (!text(KEYWORD).exists() && JUDGE_TIME > 30) {
    if (back()) {
      // 计时器重置
      JUDGE_TIME = 0;
      log("停留某个页面超过30s, 自动返回, 关闭定时器。");
    }
  }
}
