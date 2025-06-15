// 注册图表到懒加载管理器
function initPressureSourceChart() {
    var myChart = echarts.init(document.getElementById('pressure-source'), null, {
      width: 'auto',
      height: 500
    });
var option = {
    backgroundColor: 'transparent',
    title: {
        text: '博士生压力主要来源',
        subtext: '数据来源：北京大学中国博士教育研究中心',
        left: 'center',
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
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        },
        // 自定义样式
        backgroundColor: 'rgba(50, 50, 50, 0.9)',
        borderColor: '#333',
        borderWidth: 1,
        textStyle: {
            color: '#fff',
            fontSize: 13
        },
        formatter: function (params) {
            var tar = params[1];
            return tar.name + '<br/>' + 
                   tar.seriesName + ': ' + tar.value + '人次<br/>' +
                   '占比: ' + ((tar.value / 17305) * 100).toFixed(1) + '%';
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        splitLine: { show: false },
        data: ['总计', '发表学术论文', '完成学位论文', '就业问题', '经济问题'],
    },
    yAxis: {
        type: 'value',
        name: '人次',
    },
    series: [
        {
            name: 'Placeholder',
            type: 'bar',
            stack: 'Total',
            itemStyle: {
                borderColor: 'transparent',
                color: 'rgba(0, 0, 0, 0)' // 设置为透明
            },
            data: [0, 17305-7538, 17305-7538-5288, 17305-7538-5288-2801, 17305-7538-5288-2801-1578]
        },
        {
            name: '数量',
            type: 'bar',
            stack: 'Total',
            label: {
                show: true,
                position: 'top',
                formatter: '{c}人次',
            },            data: [17305, 7538, 5388, 2801, 1578],
            itemStyle: {
                color: '#3170a7', // 设置柱形颜色
                borderRadius: [5, 5, 0, 0] // 添加圆角样式：上左、上右、下右、下左
            }
        }    ]
};

    myChart.setOption(option);

    return myChart;
}

// 注册到懒加载管理器
if (window.chartLazyLoader) {
    window.chartLazyLoader.registerChart('pressure-source', initPressureSourceChart);
} else {
    // 如果懒加载管理器还没有加载，等待后再注册
    document.addEventListener('DOMContentLoaded', function() {
        if (window.chartLazyLoader) {
            window.chartLazyLoader.registerChart('pressure-source', initPressureSourceChart);
        }
    });
}