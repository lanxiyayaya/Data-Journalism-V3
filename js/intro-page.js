document.addEventListener("DOMContentLoaded", function() {
  const scroller = scrollama();

  scroller
    .setup({
      step: "#intro-sec .step",
      offset: 0.5,
      debug: false
    })
    .onStepEnter(response => {
      document.querySelectorAll("#intro-sec .step").forEach(el => el.classList.remove("active"));
      response.element.classList.add("active");
    })
    .onStepExit(response => {
      response.element.classList.remove("active");
    });

  // 适应窗口大小
  window.addEventListener("resize", scroller.resize);
});