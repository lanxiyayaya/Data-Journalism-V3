// 注册图表到懒加载管理器
function initTotalDelayChart() {
    var chartDom = document.getElementById('total-delay');
    var myChart = echarts.init(chartDom, null, {
        width: 'auto',
        height: 500
    });
    var option;

    // 2007-2022年博士生总体延毕率数据
    const years = ["2007年", "2008年", "2009年", "2010年", "2011年", "2012年", "2013年", "2014年", "2015年", "2016年", "2017年", "2018年", "2019年", "2020年", "2021年", "2022年"];
    const delayRates = [0.235979456, 0.210444415, 0.200338939, 0.22391208, 0.230953018, 0.228417231, 0.232973663, 0.252273075, 0.298476849, 0.320502249, 0.283150196, 0.253469883, 0.265181788, 0.278920485, 0.354369345, 0.284318634];

    // 将延毕率转换为百分比格式，便于显示
    const delayRatesPercent = delayRates.map(rate => (rate * 100).toFixed(2));

    // 构建数据对
    const data = years.map((year, index) => [year, delayRates[index]]);
    const dateList = years;
    const valueList = delayRates;
option = {  backgroundColor: 'transparent',  // Make gradient line here
  visualMap: [
    {
      show: false,
      type: 'continuous',
      seriesIndex: 0,
      min: 0.15,
      max: 0.40,
      inRange: {
        color: ['#769fcd', '#5a8db3']
      }
    }
  ],  
  title: {
    left: 'center',
    text: '2007-2022年博士生总体延毕率变化趋势',
    subtext: '数据来源：国家统计局 教育部',
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
      type: 'line'
    },
    formatter: function(params) {
      return params[0].name + '<br/>延毕率: ' + (params[0].value * 100).toFixed(2) + '%';
    },
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderColor: '#ccc',
    textStyle: {
      color: '#333'
    }
  },  
  xAxis: {
    data: dateList,
    boundaryGap: false,
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
  yAxis: {
    type: 'value',
    name: '延毕率',
    nameTextStyle: {
      color: '#333',
      fontSize: 14,
      padding: [0, 0, 0, 50]
    },
    axisLabel: {
      formatter: function(value) {
        return (value * 100).toFixed(0) + '%';
      },
      fontSize: 12,
      color: '#333'
    },
    min: 0.18,
    max: 0.36,
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
  },
  grid: {
    left: '5%',
    right: '5%',
    bottom: '10%',
    top: '15%',
    containLabel: true
  },    series: [
    {
      type: 'line',
      showSymbol: true, // 显示数据点
      symbolSize: 6, // 数据点大小
      data: valueList,
      smooth: true,
      // 数据点样式
      itemStyle: {
        color: '#3170a7',
        borderColor: '#fff',
        borderWidth: 2
      },      // 添加数据标签
      label: {
        show: true,
        position: 'top',
        formatter: function(params) {
          return (params.value * 100).toFixed(2) + '%';
        },
        fontSize: 11,
        color: '#333',
        fontWeight: 'bold',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 3,
        padding: [2, 4]
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 12,
          fontWeight: 'bold',
          color: '#333'
        },
        itemStyle: {
          color: '#5a8db3',
          borderColor: '#fff',
          borderWidth: 3,
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.3)'
        }
      },
      // 添加面积样式，实现堆叠效果
      areaStyle: {
        opacity: 0.5,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(118, 159, 205, 0.8)'
          },
          {
            offset: 1,
            color: 'rgba(118, 159, 205, 0.1)'
          }
        ])
      },
      // 线条样式
      lineStyle: {
        width: 2,
        color: '#3170a7'
      }
    }  ]
};

    option && myChart.setOption(option);

    return myChart;
}

// 注册到懒加载管理器
if (window.chartLazyLoader) {
    window.chartLazyLoader.registerChart('total-delay', initTotalDelayChart);
} else {
    // 如果懒加载管理器还没有加载，等待后再注册
    document.addEventListener('DOMContentLoaded', function() {
        if (window.chartLazyLoader) {
            window.chartLazyLoader.registerChart('total-delay', initTotalDelayChart);
        }
    });
}
