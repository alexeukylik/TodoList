class Visual {
  constructor() {

  }

  startVisual(tasksBlock, btn, loder, input, flag) {
    if (flag) {
        tasksBlock.style.display = "none";
        btn.style.display = "none";
        loder.style.display = "block";
        input.disabled = 1;
    } else {
        tasksBlock.style.display = 'block';
        input.disabled = 0;
        btn.style.display = 'inline-block';
        loder.style.display = 'none';
    }
  }

  
}
