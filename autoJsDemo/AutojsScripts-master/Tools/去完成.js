// 任务关键字
const KEYWORD = '去完成';
const TIMER = 15 * 1000;

let count = 1;

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
      let buttonWidget = widgets[index];
      if (buttonWidget.click()) {
        log("正在进行任务:" + count++);
        sleep(3000);

        sleep(TIMER);
        if (back()) {
          sleep(1000);
        }
      }
      sleep(1000);
    }
  }
}
