// 注册图表到懒加载管理器
function initReformChart() {
    var myChart = echarts.init(document.getElementById('reform'), null, {
  width: 'auto',
  height: 500
});
var option = {
    backgroundColor: 'transparent',
    title: {
        text: '博士生认为亟待改革的问题',
        left: 'center',
        textStyle: {
            fontWeight: 'bold',
            fontSize: 18,
            color: '#2c3e50'
        },
        subtext: '数据来源：北京大学中国博士教育研究中心',
        subtextStyle: {
            fontSize: 12,
            color: '#7f8c8d'
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        },
        backgroundColor: 'rgba(50, 50, 50, 0.9)',
        borderColor: '#333',
        borderWidth: 1,
        textStyle: {
            color: '#fff',
            fontSize: 13
        },
        formatter: function(params) {
            var param = params[0];
            return param.name + '<br/>' + 
                   '占比: ' + (param.value * 100).toFixed(1) + '%';
        }
    },    
    grid: {
        top: '10%',
        bottom: '10%',
    },      yAxis: [
        {
            type: 'category',
            data: ["其他", "提高导师的指导质量", "取消论文发表的要求", "提高待遇", "加强对博士生的课题研究的支持", "减轻科研压力"],
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                fontSize: 11
            }
        }
    ],    
    xAxis: [
        {
            type: 'value',
            name: '占比：%',
            nameLocation: 'end',
            nameTextStyle: {
                color: '#2c3e50',
                fontSize: 12,
                padding: [0, 0, 0, 10]
            },
            axisLabel: {
                formatter: function (value) {
                    // 将比例值（0-1）转换为百分比（0%-100%）
                    return (value * 100) + '%'; 
                },
                fontSize: 11,
                color: '#2c3e50'
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(114, 172, 209, 0.3)',
                    type: 'dashed'
                }
            }
        }
    ],
    series: [          
        {
            name: '博士生改革需求',
            type: 'bar',
            barWidth: '70%',                
            data: [0.15, 0.22, 0.10, {
                value: 0.41,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        { offset: 0, color: '#e74c3c' },
                        { offset: 1, color: '#c0392b' }
                    ])
                },                
                emphasis: {
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                            { offset: 0, color: '#ff6b7a' },
                            { offset: 1, color: '#e74c3c' }
                        ]),
                        shadowBlur: 12,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(231, 76, 60, 0.4)'
                    }
                }
            }, 0.06, 0.06],            
            itemStyle: {
                color: function(params) {
                    return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        { offset: 0, color: '#3f72af' },
                        { offset: 1, color: '#3170a7'}
                    ]);
                },
                borderRadius: [0, 4, 4, 0]
            }, 
            emphasis: {
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        { offset: 0, color: '#73b1c9' },
                        { offset: 1, color: '#1b5b7e' }
                    ]),
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.3)'
                }
            },
            label: {
                show: true,
                position: 'right',
                formatter: function(params) {
                    return (params.value * 100).toFixed(1) + '%';
                },
                fontSize: 11,
                color: '#2c3e50',
                fontWeight: 'bold'
            }        }
    ],
    animation: true // 添加动画效果
};

    myChart.setOption(option);

    return myChart;
}

// 注册到懒加载管理器
if (window.chartLazyLoader) {
    window.chartLazyLoader.registerChart('reform', initReformChart);
} else {
    // 如果懒加载管理器还没有加载，等待后再注册
    document.addEventListener('DOMContentLoaded', function() {
        if (window.chartLazyLoader) {
            window.chartLazyLoader.registerChart('reform', initReformChart);
        }
    });
}
