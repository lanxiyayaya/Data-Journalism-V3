var scrolly = d3.select("#scrolly");
    var article = scrolly.select("article");
    var step = article.selectAll(".step");
    var scroller = scrollama();

    function handleResize() {
      var stepH = Math.floor(window.innerHeight * 0.75);
      step.style("height", stepH + "px");
      scroller.resize();
    }    function handleStepEnter(response) {
      // 移除所有激活状态
      step.classed("is-active", false);
      
      // 激活当前步骤（但跳过隐藏步骤的视觉效果）
      step.classed("is-active", function (d, i) {
        return i === response.index;
      });
      
      // 如果是隐藏步骤，不执行额外的视觉效果
      var currentStep = d3.select(step.nodes()[response.index]);
      if (currentStep.classed("step-hidden")) {
        // 隐藏步骤被激活时的特殊处理
        console.log("隐藏步骤被激活，索引:", response.index);
        // 可以在这里添加特殊的过渡效果或逻辑
      }
    }

    function init() {
      handleResize();
      scroller
        .setup({
          step: "#scrolly article .step",
          offset: 0.5,
          debug: false
        })
        .onStepEnter(handleStepEnter);

      window.addEventListener("resize", handleResize);
    }
    init();