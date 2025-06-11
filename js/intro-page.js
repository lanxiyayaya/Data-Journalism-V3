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
      
      // 激活当前步骤
      step.classed("is-active", function (d, i) {
        return i === response.index;
      });
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