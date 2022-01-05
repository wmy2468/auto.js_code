
let height = device.height;
let width = device.width;
let count = 1;

main();

function main() {

  while (true) {
    viewTask();
  }
}

function viewTask() {
  if (textContains('去逛逛').exists()) {
    sleep(500);
    let widgets = textContains('去逛逛').find();
    for (index = 0; index < widgets.length; index++) {
      let buttonWidget = widgets[index];
      if (buttonWidget.click()) {
        log("正在进行任务:" + count++);
        sleep(1000);
        randomSwipe();
        sleep(3000);

        sleep(15000);
        if (back()) {
          sleep(1000);
        }
      }
      sleep(1000);
    }
  } else if (textContains('去浏览').exists()) {
    sleep(500);
    let widgets = textContains('去浏览').find();
    for (index = 0; index < widgets.length; index++) {
      let buttonWidget = widgets[index];
      if (buttonWidget.click()) {
        log("正在进行任务:" + count++);
        sleep(1000);
        randomSwipe();
        sleep(3000);

        sleep(30000);
        if (back()) {
          sleep(1000);
        }
      }
      sleep(1000);
    }
  } else if (textContains('去完成').exists()) {
    sleep(500);
    let widgets = textContains('去完成').find();
    for (index = 0; index < widgets.length; index++) {
      let buttonWidget = widgets[index];
      if (buttonWidget.click()) {
        log("正在进行任务:" + count++);
        sleep(1000);
        randomSwipe();
        sleep(3000);

        sleep(15000);
        if (back()) {
          sleep(1000);
        }
      }
      sleep(1000);
    }
  }
}

function randomSwipe() {
  smlMove(ramdomByFloat(width / 2), ramdomByFloat(height / 1.5), ramdomByFloat(width / 2), ramdomByFloat(height / 4), ramdomByFloat(800));
}

function random(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

function ramdomByFloat(number) {
  return random(number, number);
}

function smlMove(qx, qy, zx, zy, time) {
  var xxy = [time];
  var point = [];
  var dx0 = {
    "x": qx,
    "y": qy
  };
  var dx1 = {
    "x": random(qx - 100, qx + 100),
    "y": random(qy, qy + 50)
  };
  var dx2 = {
    "x": random(zx - 100, zx + 100),
    "y": random(zy, zy + 50),
  };
  var dx3 = {
    "x": zx,
    "y": zy
  };
  for (var i = 0; i < 4; i++) {
    eval("point.push(dx" + i + ")");
  };
  for (let i = 0; i < 1; i += 0.08) {
    xxyy = [parseInt(bezierCurves(point, i).x), parseInt(bezierCurves(point, i).y)];
    xxy.push(xxyy);
  }
  gesture.apply(null, xxy);
}

function bezierCurves(cp, t) {
  cx = 3.0 * (cp[1].x - cp[0].x);
  bx = 3.0 * (cp[2].x - cp[1].x) - cx;
  ax = cp[3].x - cp[0].x - cx - bx;
  cy = 3.0 * (cp[1].y - cp[0].y);
  by = 3.0 * (cp[2].y - cp[1].y) - cy;
  ay = cp[3].y - cp[0].y - cy - by;

  tSquared = t * t;
  tCubed = tSquared * t;
  result = {
    "x": 0,
    "y": 0
  };
  result.x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x;
  result.y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y;
  return result;
}
