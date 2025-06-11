// 博士生延毕相关关键词数据 (权重已调整为10-100范围，增大差距)
const wordCloudData = [
    // 第一层：核心高频词 (90-100)
    {name: '延毕', value: 100},
    {name: '科研', value: 95},
    {name: '导师', value: 92},
    {name: '运气', value: 90},
    
    // 第二层：重要关键词 (70-85)
    {name: '毕业', value: 85},
    {name: '博士', value: 82},
    {name: '学术', value: 80},
    {name: '父母', value: 78},
    {name: '项目', value: 75},
    {name: '发表', value: 72},
    {name: '相信', value: 70},
    
    // 第三层：频繁提及词 (55-68)
    {name: '怎么办', value: 68},
    {name: '成果', value: 65},
    {name: '论文', value: 62},
    {name: '读博', value: 60},
    {name: '累', value: 58},
    {name: '补助', value: 55},
    
    // 第四层：中等频率词 (40-52)
    {name: '瓶颈', value: 52},
    {name: '催婚', value: 50},
    {name: '选择', value: 48},
    {name: '怀疑', value: 46},
    {name: '熬', value: 45},
    {name: '焦虑', value: 43},
    {name: '拒稿', value: 42},
    {name: '指导', value: 40},
    
    // 第五层：情感状态词 (25-38)
    {name: '前方', value: 38},
    {name: '时间', value: 36},
    {name: '自我', value: 35},
    {name: '竞争', value: 33},
    {name: '数据', value: 32},
    {name: '理想', value: 30},
    {name: '现实', value: 28},
    {name: '方向', value: 27},
    {name: '学位', value: 25},
    
    // 第六层：生活困扰词 (15-23)
    {name: '待遇', value: 23},
    {name: '研究生', value: 22},
    {name: '感受', value: 21},
    {name: '失败', value: 20},
    {name: '换方向', value: 19},
    {name: '抑郁', value: 18},
    {name: '不后悔', value: 17},
    {name: '学校', value: 16},
    {name: '心理健康', value: 15},
    
    // 第七层：一般状态词 (10-14)
    {name: '难受', value: 14},
    {name: '孤独', value: 13},
    {name: '命运', value: 12},
    {name: '钱', value: 12},
    {name: '试错', value: 11},
    {name: '房价', value: 11},
    {name: '找对象', value: 11},
    {name: '痛苦', value: 10},
    {name: '挑战', value: 10},
    {name: '坚持', value: 10},
    {name: '逃避', value: 10},
    {name: '重来', value: 10},
    {name: '压力', value: 10},
    {name: '成为', value: 10},
    {name: '未来', value: 10},
    {name: '单身', value: 10},
    {name: '生孩子', value: 10},
    {name: '拖着', value: 10},
    {name: '分手', value: 10},
    {name: '生活', value: 10},
    {name: '努力', value: 10},
    {name: '出路', value: 10},
    {name: '动力', value: 10},
    {name: '适合', value: 10},
    {name: '找工作', value: 10},
    {name: '能力', value: 10},
    {name: '成就', value: 10},
    {name: '快乐', value: 10},
    {name: '尝试', value: 10},
    {name: '走下去', value: 10},
    {name: '分析', value: 10},
    {name: '以为', value: 10},
    {name: '天才', value: 10},
    {name: '天真', value: 10},
    {name: '拖延', value: 10},
    {name: '出国', value: 10},
    {name: '兼职', value: 10},
    {name: '社交', value: 10},
    {name: '失眠', value: 10}
];

// 词云颜色配置 - 蓝色系及相互搭配的颜色
const colors = [
    // 原有蓝色系
    '#a4c2db', '#73b1c9', '#4a9ab0', '#2b7e9c', 
    '#1b5b7e', '#1a3c6b', '#497b9c', '#779fb1',
    '#a7d3d0', '#89c8be', 
    
    // 扩展的蓝色变化
    '#87ceeb', '#6fa8cd', '#5b9bd5', '#4682b4',
    '#3a7ca8', '#2e6a8f', '#1e4a6b', '#0f3460',
    
    // 青色和蓝绿色系
    '#20b2aa', '#40e0d0', '#66cdaa', '#5f9ea0',
    '#4682b4', '#6495ed', '#4169e1', '#0066cc',
    
    // 灰蓝和石板蓝
    '#708090', '#6a7b83', '#556b7d', '#465a6b',
    '#576d7e', '#627586', '#6b7d8e', '#748596',
    
    // 靛蓝和天蓝色
    '#4b0082', '#483d8b', '#6a5acd', '#7b68ee',
    '#87cefa', '#b0c4de', '#b0e0e6', '#add8e6'
];

// 初始化词云图
function initWordCloud() {
    const chartDom = document.getElementById('wordcloud');
    if (!chartDom) {
        console.error('词云容器未找到');
        return;
    }

    const myChart = echarts.init(chartDom);
    
    // 创建图片对象来加载蝴蝶图片
    const maskImage = new Image();
    maskImage.crossOrigin = 'anonymous';
    
    maskImage.onload = function() {
        // 图片加载成功后配置词云
        const option = {
            title: {
                text: '博士们多次提及的关键词',
                subtext: '数据来源：深度访谈',
                left: 'center',
                top: 15,
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
                    return '关键词：' + params.name +'<br>' +' 权重：' + params.value;
                }
            },            
            series: [{
                type: 'wordCloud',
                sizeRange: [12, 80], // 调整字体大小范围以匹配新的权重范围
                rotationRange: [-80,80],
                rotationStep: 15,
                gridSize: 8,
                
                // 使用蝴蝶图片作为形状
                shape: 'circle',
                maskImage: maskImage,
                
                // 布局配置
                left: 'center',
                top: 'center',
                width: '80%',
                height: '80%',
                
                
                // 文字样式
                textStyle: {
                    fontFamily: 'Microsoft YaHei, Arial, sans-serif',
                    color: function() {
                        return colors[Math.floor(Math.random() * colors.length)];
                    }
                },
                
                // 强调样式（鼠标悬停）
                emphasis: {
                    focus: 'self',
                    textStyle: {
                        textShadowBlur: 10,
                        textShadowColor: '#D3D3D3',
                    }
                },
                
                data: wordCloudData
            }],
            
            // 动画配置
            animationDuration: 2000,
            animationEasing: 'elasticOut'
        };        
        // 设置配置项
        myChart.setOption(option);
        
        // 响应式处理
        window.addEventListener('resize', function() {
            myChart.resize();
        });
    };
    
    maskImage.onerror = function() {
        console.warn('蝴蝶图片加载失败，使用默认形状');
        // 如果图片加载失败，使用默认配置
        initDefaultWordCloud(myChart);
    };
    
    // 设置图片路径
    maskImage.src = '../pic/蝴蝶2.png';
}

// 默认词云配置（图片加载失败时使用）
function initDefaultWordCloud(myChart) {    const option = {
        title: {
            text: '访谈中多次提到的关键词',
            subtext: '数据来源：深度访谈',
            left: 'center',
            top: 15,
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
            trigger: 'item'
        },        
        series: [{
            type: 'wordCloud',
            sizeRange: [5, 80], // 调整字体大小范围以匹配新的权重范围
            rotationRange: [-70, 70],
            rotationStep: 15,
            gridSize: 6,
            shape: 'circle',
            
            left: 'center',
            top: 'center',
            width: '80%',
            height: '80%',
            


            textStyle: {
                fontFamily: 'Microsoft YaHei, Arial, sans-serif',
                fontWeight: function(params) {
                    return params.value > 15 ? 'bold' : 'normal';
                },
                color: function() {
                    return colors[Math.floor(Math.random() * colors.length)];
                }
            },
            
            emphasis: {
                focus: 'self',
                textStyle: {
                    textShadowBlur: 10,
                    textShadowColor: '#333',
                    fontSize: function(params) {
                        return Math.max(params.textStyle.fontSize * 1.2, 25);
                    }
                }
            },
            
            data: wordCloudData
        }],
        
        animationDuration: 2000,
        animationEasing: 'elasticOut'
    };    myChart.setOption(option);
    
    window.addEventListener('resize', function() {
        myChart.resize();
    });
}

// 页面加载完成后初始化词云
document.addEventListener('DOMContentLoaded', function() {
    // 确保ECharts已加载
    if (typeof echarts !== 'undefined') {
        initWordCloud();
    } else {
        console.error('ECharts未加载，请检查脚本引入');
    }
});

// 如果页面已经加载完成，直接初始化
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    if (typeof echarts !== 'undefined') {
        initWordCloud();
    }
}