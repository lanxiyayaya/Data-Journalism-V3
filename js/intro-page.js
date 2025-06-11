document.addEventListener("DOMContentLoaded", function() {
  const scroller = scrollama();

  scroller
    .setup({
      step: "#intro-sec .step",
      offset: 0.5,
      debug: false
    })
    .onStepEnter(response => {
      // 移除所有步骤的激活状态
      document.querySelectorAll("#intro-sec .step").forEach(el => {
        el.classList.remove("active");
      });
      
      // 为当前步骤添加激活状态
      response.element.classList.add("active");
    });
    // 删除 .onStepExit() - 这是导致闪动的主要原因

  // 适应窗口大小变化
  window.addEventListener("resize", scroller.resize);
});