// 注册图表到懒加载管理器
function initDelayAmongSubjectsChart() {
    var chartDom = document.getElementById('delay-among-subjects');
    var myChart = echarts.init(chartDom, null, {
      width: 'auto',
      height: 500
    });
    var option;

// 2022年各学科博士生延毕率数据
var subjects = ['哲学', '经济学', '法学', '教育学', '文学', '历史学', '理学', '工学', '农学', '医学','管理学', '艺术学'];
var delayPer = [
    0.273396425,
    0.259293971,
    0.264242424,
    0.366215072,
    0.199329983,
    0.182842288,
    0.153516943,
    0.296494355,
    0.18622449,
    0.045536519,
    0.216663345,
    0.242829828
];

// 构造ECharts需要的数据格式
var delay_data = subjects.map(function(sub, idx) {
    var percent = (delayPer[idx] * 100).toFixed(2);
    return {
        value: percent,
        name: sub
    };
});

option = {
  backgroundColor: 'transparent',
  title: {
    text: '2022年各学科博士生延毕率',
    subtext: '数据来源：教育部',
    left: 'center',
    top: '3%',
    textStyle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#2c3e50'
    },
    subtextStyle: {
      fontSize: 12,
      color: '#7f8c8d'
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: function(params) {
      return params.seriesName + '<br/>' + 
             params.name + ': ' + params.value + '%<br/>'
    },
    backgroundColor: 'rgba(50, 50, 50, 0.9)',
    borderColor: '#333',
    borderWidth: 1,
    textStyle: {
      color: '#fff',
      fontSize: 13
    }
  },
  legend: {
    top: '12%',
    left: 'center',
    data: subjects,
    textStyle: {
      fontSize: 12,
      color: '#2c3e50'
    },
    itemWidth: 14,
    itemHeight: 14,
    itemGap: 20
  },
  series: [
    {
      name: '2022年各学科博士生延毕率',
      type: 'pie',
      radius: ['35%', '65%'],
      center: ['50%', '58%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 8,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 18,
          fontWeight: 'bold',
          color: '#333'
        },
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      labelLine: {
        show: false
      },
      data: delay_data,
      color: [
        '#a4c2db', '#73b1c9', '#4a9ab0', '#2b7e9c', 
        '#1b5b7e', '#1a3c6b', '#497b9c', '#779fb1',
        '#a7d3d0', '#89c8be', '#2b7e9c', '#73b1c9'
      ]    }
  ]
};

    option && myChart.setOption(option);

    return myChart;
}

// 注册到懒加载管理器
if (window.chartLazyLoader) {
    window.chartLazyLoader.registerChart('delay-among-subjects', initDelayAmongSubjectsChart);
} else {
    // 如果懒加载管理器还没有加载，等待后再注册
    document.addEventListener('DOMContentLoaded', function() {
        if (window.chartLazyLoader) {
            window.chartLazyLoader.registerChart('delay-among-subjects', initDelayAmongSubjectsChart);
        }
    });
}
