// 博士生延毕率数据（按性别和婚育状态）
const marriageData = [
  { name: '男', 婚育状态: '未婚', 延毕率: 0.424 },
  { name: '男', 婚育状态: '已婚未育', 延毕率: 0.437 },
  { name: '男', 婚育状态: '已育', 延毕率: 0.52 },
  { name: '女', 婚育状态: '未婚', 延毕率: 0.401 },
  { name: '女', 婚育状态: '已婚未育', 延毕率: 0.457 },
  { name: '女', 婚育状态: '已育', 延毕率: 0.579 },
];

const marriageChart = new G2.Chart({
  container: 'marriage-and-gender',
  autoFit: true,
});

marriageChart.options({
  title: {
    title: '不同性别和婚育状态下博士生延毕率',
    subtitle: '数据来源：北京大学中国博士教育研究中心',
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

marriageChart
  .interval()
  .data(marriageData)
  .encode('x', '婚育状态')
  .encode('y', '延毕率')
  .encode('color', 'name')
  .scale('color', {
    range: ['#3170a7', '#ffb3a7'] // 男性蓝色，女性橙色
  })
  .scale('y', {
    formatter: (val) => (val * 100).toFixed(1) + '%' // Y轴显示百分比
  })  
  .transform({ type: 'dodgeX' })
  .interaction('elementHighlight', { background: true })
  .axis('y', {
    title: false,
    labelFormatter: (val) => (val * 100).toFixed(1) + '%',
    line: true,
    tick: true
  })
  .axis('x', {
    title: false,
    line: true,
    tick: true
  })
  .axis('y', {
    title: '延毕率',
    labelFormatter: (val) => (val * 100).toFixed(1) + '%',
    line: true,
    tick: true
  })
  .legend({
    position: 'top-right',
    itemName: {
      style: {
        fontSize: 14,
        fontWeight: 'bold'
      }
    }
  })
  .tooltip({
    title: (d) => `${d.name} - ${d.婚育状态}`,
    items: [
      {
        field: '延毕率',
        name: '延毕率',
        valueFormatter: (val) => (val * 100).toFixed(1) + '%'
      }
    ]
  })
  .label({
    text: (d) => (d.延毕率 * 100).toFixed(1) + '%',
    position: 'inside',
    style: {
      fontSize: 12,
      fill: '#333',
      fontWeight: 'bold'
    }
  });

marriageChart.render();