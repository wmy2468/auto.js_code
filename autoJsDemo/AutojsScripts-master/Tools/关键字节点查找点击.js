// 任务关键字
const KEYWORD = '浏览';
const TIMER = 10 * 1000;

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
      let widget = widgets[index];
      let widgetParent = widget.parent();
      let progress = widgetParent.child(1).text();
      let describe = widgetParent.child(2).text();
      let num = parseInt(progress.match(/\d+(?=\/)/g));
      let total = parseInt(progress.match(/\d+(?=\))/g));
      //log(progress + " " + num + "/" + total + " " + describe);
      if (num < total) {

        let buttonWidget = widgetParent.child(3);
        if (buttonWidget.click()) {
          log("正在进行任务:" + progress.match(/.*(?=\()/) + " " + (num + 1) + "/" + total + " " + describe);
          sleep(3000);

          sleep(TIMER);
          if (back()) {
            sleep(1000);
          }
        }
      }
      sleep(1000);
    }
  }
}
