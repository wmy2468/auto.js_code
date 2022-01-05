const KEYWORD = '去逛逛';

main();

function main() {

  auto.waitFor();
  //console.show();
  queryWidget();
}

function queryWidget() {
  if (textContains(KEYWORD).exists()) {
    sleep(500);
    let widgets = textContains(KEYWORD).find();
    for (index = 0; index < widgets.length; index++) {
      let widget = widgets[index];
      log("widget");
      printWidget(widget)
      childrens = widget.children();
      for (i = 0; i < childrens.length; i++) {
        printWidget(childrens[i]);
      }
      log("----------------------------------");

      let patent_1 = widget.parent();
      let childrens = patent_1.children();
      log("patent_1: " + childrens.length);
      printWidget(patent_1);
      for (i = 0; i < childrens.length; i++) {
        printWidget(childrens[i]);
      }
      log("----------------------------------");

      let patent_2 = widget.parent().parent();
      log("patent_2: " + childrens.length);
      printWidget(patent_2);
      childrens = patent_2.children();
      for (i = 0; i < childrens.length; i++) {
        printWidget(childrens[i]);
      }
      log("----------------------------------");

      continue;
      let patent_3 = widget.parent().parent().parent();
      log("patent_3: " + childrens.length);
      printWidget(patent_3);
      childrens = patent_3.children();
      for (i = 0; i < childrens.length; i++) {
        printWidget(childrens[i]);
      }
      log("----------------------------------");

      let patent_4 = widget.parent().parent().parent().parent();
      log("patent_4: " + childrens.length);
      printWidget(patent_4);
      childrens = patent_4.children();
      for (i = 0; i < childrens.length; i++) {
        printWidget(childrens[i]);
      }
      log("----------------------------------");
    }
  }
}

function queryWidget1() {
  if (textContains("获得").exists()) {
    let widgets = textContains("获得").find();
    for (index = 0; index < widgets.length; index++) {
      let widget = widgets[index];
      log("widget");
      printWidget(widget)
      childrens = widget.children();
      for (i = 0; i < childrens.length; i++) {
        printWidget(childrens[i]);
      }
      log("----------------------------------");
    }
  }
  if (textContains("汪汪币").exists()) {
    let widgets = textContains("汪汪币").find();
    for (index = 0; index < widgets.length; index++) {
      let widget = widgets[index];
      log("widget");
      printWidget(widget)
      childrens = widget.children();
      for (i = 0; i < childrens.length; i++) {
        printWidget(childrens[i]);
      }
      log("----------------------------------");
    }
  }
  if (textContains("3000").exists()) {
    let widgets = textContains("3000").find();
    for (index = 0; index < widgets.length; index++) {
      let widget = widgets[index];
      log("widget");
      printWidget(widget)
      childrens = widget.children();
      for (i = 0; i < childrens.length; i++) {
        printWidget(childrens[i]);
      }
      log("----------------------------------");
    }
  }
}

function printWidget(widget) {
  //packageName: widget.mInfo.mPackageName,
  //className: widget.mInfo.mClassName,
  //text: widget.mInfo.mText,
  //hintText: widget.mInfo.mHintText,
  //contentDescription: widget.mInfo.contentDescription,
  //viewId: widget.mInfo.viewId,
  //checkable: widget.mInfo.checkable,
  //enabled: widget.mInfo.enabled,
  //boundsInParent: widget.mInfo.mBoundsInParent,
  //boundsInScreen: widget.mInfo.mBoundsInScreen

  let simple = JSON.parse(JSON.stringify(widget));
  //let output = `text:${simple.mInfo.mText}`;
  let output = "className: " + simple.mInfo.mClassName + ", text: "
    + simple.mInfo.mText + ", boundsInScreen: Rect("
    + simple.mInfo.mBoundsInScreen.left + " "
    + simple.mInfo.mBoundsInScreen.top + " "
    + simple.mInfo.mBoundsInScreen.right + " "
    + simple.mInfo.mBoundsInScreen.bottom + ")"
    + " ";
  log(output);
}