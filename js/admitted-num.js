// 注册图表到懒加载管理器
function initAdmittedNumChart() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('admitted-num'), null, {
        width: 'auto',
        height: 500
    });

    // 指定图表的配置项和数据
    var option = {
  backgroundColor: 'transparent',  title: {
    text: '2004-2022年全国博士生招生数量',
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
    padding: [20, 0, 20, 0]
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    formatter: '{b}博士生招生数量：{c}人',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderColor: '#ccc',
    textStyle: {
      color: '#333',
    }
  },
  grid: {
    left: '5%',
    right: '5%',
    bottom: '15%',
    top: '15%',
    containLabel: true  },    dataZoom: [
    {
      type: 'slider',
      show: true,
      xAxisIndex: [0],
      start: 0,
      end: 100,
      height: 25,      bottom: '5%',
      borderColor: 'transparent',      backgroundColor: 'rgba(91, 125, 166, 0.1)',
      fillerColor: 'rgba(118, 143, 165, 0.25)',
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
        },        areaStyle: {
          color: '#3f72af'
        }
      }
    },
    {
      type: 'inside',
      xAxisIndex: [0],
      start: 0,
      end: 100
    }
  ],
  xAxis: [
    {
      type: 'category',
      data: ["2004年", "2005年", "2006年", "2007年", "2008年", "2009年", "2010年", "2011年", "2012年", "2013年", "2014年", "2015年", "2016年", "2017年", "2018年", "2019年", "2020年", "2021年", "2022年"],
      axisTick: {
        alignWithLabel: true,
        lineStyle: {
          color: '#666'
        }
      },      
      axisLabel: {
        fontSize: 12,
        color: '#333',
      },
      axisLine: {
        lineStyle: {
          color: '#999'
        }
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '招生人数',
      nameTextStyle: {
        color: '#333',
        fontSize: 14,
        padding: [0, 0, 0, 50]
      },
      axisLabel: {
        formatter: '{value}人',
        fontSize: 12,
        color: '#333'
      },
      axisLine: {
        show: true,
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
    }
  ],
  series: [
    {
      name: '招生数量',
      type: 'bar',
      barWidth: '50%',      
      data: [53284, 54794, 55955, 58022, 59764, 61911, 63762, 65559, 68370, 70462, 72634, 74416, 77252, 83878, 95502, 105169, 116047, 125823, 138951],      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color:  '#3f72af'},
          { offset: 1, color: '#355c7d'}
        ]),
        borderRadius: [5, 5, 0, 0]
      },      
      emphasis: {
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#5a7db8' },
            { offset: 0.5, color: '#4a6a96' },
            { offset: 1, color: '#2d4a66' }
          ])
        }
      },label: {
        show: false,
        position: 'top',
        formatter: '{c}',
        color: '#333'
      }
    }  ]
};

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    return myChart;
}

// 注册到懒加载管理器
if (window.chartLazyLoader) {
    window.chartLazyLoader.registerChart('admitted-num', initAdmittedNumChart);
} else {
    // 如果懒加载管理器还没有加载，等待后再注册
    document.addEventListener('DOMContentLoaded', function() {
        if (window.chartLazyLoader) {
            window.chartLazyLoader.registerChart('admitted-num', initAdmittedNumChart);
        }
    });
}