var chartDom = document.getElementById('confer-delay-num');
var myChart = echarts.init(chartDom);
var option;

option = {
  backgroundColor: 'transparent',  title: {
    text: '2007年至2022年博士学位授予数与延毕人数',
    subtext: '数据来源：国家统计局',
    left: 'center',
    textStyle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#2c3e50'
    },
    subtextStyle: {
      fontSize: 12,
      color: '#7f8c8d'
    },
    padding: [0, 0, 20, 0]
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    formatter: function(params) {
      var year = params[0].axisValue;
      var html = year + '<br/>';
      for (var i = 0; i < params.length; i++) {
        var marker = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + params[i].color + '"></span>';
        html += marker + params[i].seriesName + ': ' + params[i].value + '人<br/>';
      }
      return html;
    },
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderColor: '#ccc',
    textStyle: {
      color: '#333'
    }
  },
  legend: {
    data: ['学位授予数', '延毕人数'],
    top: '50px',
    textStyle: {
      color: '#333'
    }
  },  grid: {
    left: '10%',
    right: '10%',
    bottom: '5%',
    top: '15%',
    containLabel: true
  },dataZoom: [
    {
      type: 'slider',
      show: true,
      yAxisIndex: [0],
      start: 0,
      end: 100,
      width: 25,
      right: '1%',      borderColor: 'transparent',
      backgroundColor: 'rgba(63, 114, 175, 0.1)',
      fillerColor: 'rgba(53, 92, 125, 0.25)',
      textStyle: {
        color: '#666'
      },
      handleStyle: {
        color: '#ffffff',
        borderColor: '#cccccc',
        borderWidth: 1,
        borderRadius: 6,
        shadowBlur: 3,
        shadowColor: 'rgba(0, 0, 0, 0.2)'
      },      
      selectedDataBackground: {
        lineStyle: {
          color: '#355c7d'
        },
        areaStyle: {
          color: '#3f72af'
        }
      }
    },
    {
      type: 'inside',
      yAxisIndex: [0],
      start: 0,
      end: 100
    }
  ],
  xAxis: {
    type: 'value',
    name: '人数',
    nameTextStyle: {
      color: '#333',
      fontSize: 14,
      padding: [0, 0, 0, -5]
    },
    axisLabel: {
      formatter: '{value}人',
      fontSize: 12,
      color: '#333'
    },
    axisLine: {
      lineStyle: {
        color: '#999'
      }
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(200, 200, 200, 0.6)',
        type: 'dashed'
      }
    }
  },
  yAxis: {
    type: 'category',
    data: ["2007年", "2008年", "2009年", "2010年", "2011年", "2012年", "2013年", "2014年", "2015年", "2016年", "2017年", "2018年", "2019年", "2020年", "2021年", "2022年"].reverse(),
    axisTick: {
      alignWithLabel: true,
      lineStyle: {
        color: '#666'
      }
    },
    axisLabel: {
      fontSize: 12,
      color: '#333'
    },
    axisLine: {
      lineStyle: {
        color: '#999'
      }
    }
  },
  series: [
    {
      name: '学位授予数',
      type: 'bar',
      data: [39592, 42217, 46616, 47407, 48551, 50399, 51714, 52352, 52654, 53360, 56606, 59368, 61060, 65585, 70514, 81887].reverse(),      itemStyle: {
        color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
            { offset: 0, color: '#3f72af' },
            { offset: 1, color: '#355c7d' }
        ]),
        borderRadius: [0, 5, 5, 0]
      },
      emphasis: {
        itemStyle: {
          color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
            { offset: 0, color: '#5a7db8' },
            { offset: 0.7, color: '#4a6a96' },
            { offset: 1, color: '#2d4a66' }
          ])
        }
      }
    },
    {
      name: '延毕人数',
      type: 'bar',
      data: [13692, 12577, 9339, 10615, 11213, 11512, 12048, 13207, 15716, 17102, 16028, 15048, 16192, 18293, 24988, 23282].reverse(),      itemStyle: {
        color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
          { offset: 0, color: '#ffa9a9' },
          { offset: 1, color: '#e88a8a' }
        ]),
        borderRadius: [0, 5, 5, 0]
      },
      emphasis: {
        itemStyle: {
          color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
            { offset: 0, color: '#ff7575' },
            { offset: 0.7, color: '#ff7575' },
            { offset: 1, color: '#ffa9a9' }
          ])
        }
      }
    }
  ]
};

option && myChart.setOption(option);

// 响应式调整
window.addEventListener('resize', function() {
  myChart.resize();
});