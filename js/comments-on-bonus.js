const bonusChart = new G2.Chart({
  container: 'comments-on-bonus',
  autoFit: true,
});

// 添加标题配置
bonusChart.options({
  title: {
    title: '博士生对奖助支持的评价',
    subtitle: '数据来源：北京大学中国博士教育研究中心 | 满分：5分',
    align: 'center',
    style: {
      titleFontSize: 18,
      titleFontWeight: 'bold',
      titleFill: '#2c3e50',
      subtitleFontSize: 12,
      subtitleFill: '#7f8c8d'
    }
  }
});

bonusChart.coordinate({ type: 'radial', endAngle: Math.PI });

bonusChart
  .interval()  .data({
    // 博士生对奖学金资助体系的评价数据
    value: [
      { item: '学校提供了丰富的资助渠道', '得分': 3.72 },
      { item: '我对学校的资助体系非常满意', '得分': 3.92 },
      { item: '奖学金确实授予了应得之人', '得分': 4.01 },
      { item: '奖学金评选标准科学合理', '得分': 3.97 },
      { item: '学校提供的奖助能够满足我的生活需要', '得分': 3.61 },
      { item: '奖学金评选过程公开透明', '得分': 4.05 }
    ],
    transform: [{ type: 'sortBy', fields: [['得分', true]] }],
  })
  .encode('x', 'item')  .encode('y', '得分')
  .scale('y', { type: 'sqrt' })
  .encode('color', 'item')
  .scale('color', {
    range: [
      '#b4d4e4','#a4c2db','#73b1c9','#4a9ab0','#2b7e9c','#1b5b7e'
    ]
  })
  .encode('size', 60)
  .style('radius', 30)  .label({
    text: '得分',
    position: 'inside',
    autoRotate: false,
    rotateToAlignArc: true,
    style: {
      fill: '#000000'
    }
  })
  .axis('x', { title: false })
  .axis('y', false)
  .animate('enter', { type: 'waveIn', duration: 1000 });

bonusChart.render();