// 注册图表到懒加载管理器
function initCommentsOnTutorChart() {
    var myChart = echarts.init(document.getElementById('comments-on-tutor'), null, {
  width: 'auto',
  height: 500
});

// 数据处理 - 将四个维度的数据转换为气泡图格式
var dimensions = [
    '导师项目与论文关系不密切',
    '参与导师项目的收获较少', 
    '导师对学位论文的指导不够',
    '每月与导师见面较少'
];

// 延毕博士生数据和应届博士毕业生数据
var delayedData = [0.496, 0.53, 0.318, 0.271];
var graduatedData = [0.395, 0.255, 0.081, 0.172];

// 转换为气泡图数据格式 [x轴索引, y轴值, 气泡大小]
var delayedBubbleData = delayedData.map((value, index) => [index, value, value * 80]);
var graduatedBubbleData = graduatedData.map((value, index) => [index, value, value * 80]);

var option = {
    backgroundColor: 'transparent',
    title: {
        text: '延毕博士生和应届博士毕业生对导师的评价',
        subtext: '数据来源：北京大学中国博士教育研究中心',
        left: 'center',
        top: '3%',
        textStyle: {
            fontWeight: 'bold',
            fontSize: 18,
            color: '#2c3e50'
        },
        subtextStyle: {
            fontSize: 12,
            color: '#7f8c8d'
        }
    },
    tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(50, 50, 50, 0.9)',
        borderColor: '#333',
        borderWidth: 1,
        textStyle: {
            color: '#fff',
            fontSize: 13
        },
        formatter: function(params) {
            var dimensionName = dimensions[params.value[0]];
            // var score = (params.value[1] * 100).toFixed(1);
            return params.seriesName + '<br/>' +
                   '项目：' + dimensionName + '<br/>' +
                   '得分: ' + params.value[1].toFixed(3) + '<br/>' ;
        }
    },    
    legend: {
        data: ['延毕博士生', '应届博士毕业生'],
        right: '8%',
        top: '8%',
        textStyle: {
            color: '#2c3e50',
            fontSize: 12
        },
        itemWidth: 14,
        itemHeight: 14,
        itemGap: 20
    },
    grid: {
        left: '10%',
        right: '10%',
        bottom: '15%',
        top: '20%',
        containLabel: true
    },    
    xAxis: {
        type: 'category',
        data: dimensions,
        axisLabel: {
            fontSize: 11,
            interval: 0,
            margin: 10
        },
        axisTick: {
            lineStyle: {
                color: '#72acd1'
            }
        },
        splitLine: {
            lineStyle: {
                type: 'dashed',
                // color: 'rgba(114, 172, 209, 0.3)'
            }
        }
    },
    yAxis: {
        type: 'value',
        name: '项目得分',
        nameTextStyle: {
            color: '#2c3e50',
            fontSize: 12
        },
        axisLabel: {
            fontSize: 11,
            color: '#2c3e50'
        },
        axisLine: {
            lineStyle: {
                color: '#72acd1',
                width: 2
            }
        },
        splitLine: {
            lineStyle: {
                // color: 'rgba(114, 172, 209, 0.3)',
                type: 'dashed'
            }
        },
        min: 0,
        max: 0.6,
        scale: true
    },    
    series: [        {
            name: '延毕博士生',
            type: 'scatter',
            data: delayedBubbleData,
            symbolSize: function(data) {
                return data[2] * 2; // 根据数值调整气泡大小
            },
            emphasis: {
                focus: 'series',
                label: {
                    show: true,
                    formatter: function(param) {
                        return dimensions[param.data[0]];
                    },
                    position: 'top'
                }
            },            
            itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(255, 110, 97, 0.5)',
                shadowOffsetY: 5,
                color: '#ff6e61',
                borderColor: '#fff',
                borderWidth: 2
            },            
            label: {
                show: true,
                position: 'top',
                fontSize: 10,
                color: '#e74c3c',
                fontWeight: 'bold',
                formatter: function(params) {
                    return params.value[1].toFixed(3);
                }
            }
        },
        {
            name: '应届博士毕业生',
            type: 'scatter',
            data: graduatedBubbleData,
            symbolSize: function(data) {
                return data[2] * 2; // 根据数值调整气泡大小
            },
            emphasis: {
                focus: 'series',
                label: {
                    show: true,
                    formatter: function(param) {
                        return dimensions[param.data[0]];
                    },
                    position: 'top'
                }
            },            
            itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(147, 172, 218, 0.5)',
                shadowOffsetY: 5,
                color: '#3170a7',
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: true,
                position: 'bottom',
                fontSize: 10,
                color: '#93a9d2',
                fontWeight: 'bold',
                formatter: function(params) {
                    return params.value[1].toFixed(3);
                }
            }        }
    ]
};

    myChart.setOption(option);

    return myChart;
}

// 注册到懒加载管理器
if (window.chartLazyLoader) {
    window.chartLazyLoader.registerChart('comments-on-tutor', initCommentsOnTutorChart);
} else {
    // 如果懒加载管理器还没有加载，等待后再注册
    document.addEventListener('DOMContentLoaded', function() {
        if (window.chartLazyLoader) {
            window.chartLazyLoader.registerChart('comments-on-tutor', initCommentsOnTutorChart);
        }
    });
}