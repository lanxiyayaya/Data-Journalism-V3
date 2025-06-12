// js/pagination.js
document.addEventListener('DOMContentLoaded', function() {
  // fullPage.js 初始化
  if (typeof fullpage !== 'undefined') {
    new fullpage('#fullpage', {
      // 配置项可以根据需要调整
      navigation: true,          // 右侧小圆点导航
      scrollingSpeed: 700,       // 滑动速度
      // 你可以添加更多配置项，比如loopTop, loopBottom等
    });
  } else {
    console.error('fullPage.js 未正确加载！');
  }
});