const TIMER = 5 * 1000;

main();

function main() {

  while (true) {
    viewTask();
  }
}

function viewTask() {
  click(740, 2240);
  sleep(TIMER);
}
