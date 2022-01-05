// 任务关键字
const KEYWORD = '去浏览';
// 任务类型
const TASK_TYPE = {
  Browse: 1, // 浏览
  BrowseForWhile: 2, // 浏览一段时间
  AddMarketCar: 3, // 添加购物车
  SeeShop: 4, // 逛店铺
  JoinMember: 5, // 加入会员
  GoHome: 6, // 去首页
  Shopping: 7, // 下单
};

main();

function main() {

  while (true) {
    viewTask();
  }
}

function viewTask() {
  if (textContains(KEYWORD).exists()) {
    sleep(500);
    let widgets = textContains(KEYWORD).find();
    for (index = 0; index < widgets.length; index++) {
      let widget = widgets[index];
      let buttonWidget = widget;
      if (buttonWidget.click()) {
        sleep(3000);

        returnLater();
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
  sleep(20000);
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
