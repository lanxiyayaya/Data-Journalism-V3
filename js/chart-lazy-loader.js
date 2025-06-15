/**
 * 图表懒加载管理器
 * 在用户滚动到图表位置时才初始化和播放动画
 */
class ChartLazyLoader {
    constructor() {
        this.charts = new Map(); // 存储已初始化的图表实例
        this.chartConfigs = new Map(); // 存储图表配置
        this.observer = null;
        this.manualCheckTimer = null;
        this.init();
    }

    init() {
        // 创建 Intersection Observer
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const chartId = entry.target.id;
                    this.loadChart(chartId);
                    // 停止观察已加载的图表
                    this.observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5, // 当图表10%进入视口时触发
            rootMargin: '50px' // 提前100px开始加载
        });

        // 等待DOM加载完成后开始观察图表容器
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => this.startObserving(), 100);
            });
        } else {
            setTimeout(() => this.startObserving(), 100);
        }

        // 为 fullPage.js 添加特殊处理
        this.setupFullPageIntegration();
    }

    // 设置与 fullPage.js 的集成
    setupFullPageIntegration() {
        // 监听 fullPage.js 的滚动事件
        document.addEventListener('wheel', () => {
            this.scheduleManualCheck();
        });

        // 监听 fullPage.js 的 section 变化
        if (window.fullpage) {
            // 如果 fullPage.js 已经初始化
            this.bindFullPageEvents();
        } else {
            // 等待 fullPage.js 初始化
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => {
                    if (window.fullpage) {
                        this.bindFullPageEvents();
                    }
                }, 500);
            });
        }
    }

    // 绑定 fullPage.js 事件
    bindFullPageEvents() {
        if (window.fullpage && window.fullpage.getActiveSection) {
            // 手动检查当前可见的图表
            setInterval(() => {
                this.checkVisibleCharts();
            }, 1000);
        }
    }

    // 安排手动检查
    scheduleManualCheck() {
        if (this.manualCheckTimer) {
            clearTimeout(this.manualCheckTimer);
        }
        this.manualCheckTimer = setTimeout(() => {
            this.checkVisibleCharts();
        }, 300);
    }

    // 手动检查可见的图表
    checkVisibleCharts() {
        const chartContainers = [
            'admitted-num',
            'confer-delay-num', 
            'total-delay',
            'delay-among-subjects',
            'pressure-source',
            'comments-on-tutor',
            'reform',
            'comments-on-bonus',
            'marriage-and-gender',
            'wordcloud'
        ];

        chartContainers.forEach(chartId => {
            const element = document.getElementById(chartId);
            if (element && !this.charts.has(chartId)) {
                const rect = element.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                // 检查元素是否在视口内或接近视口
                if (rect.top < windowHeight && rect.bottom > -100) {
                    this.loadChart(chartId);
                }
            }
        });
    }

    // 注册图表配置
    registerChart(chartId, initFunction) {
        console.log(`Registering chart: ${chartId}`);
        this.chartConfigs.set(chartId, initFunction);
        
        // 如果容器已经存在且可见，立即检查是否需要加载
        setTimeout(() => {
            const element = document.getElementById(chartId);
            if (element && !this.charts.has(chartId)) {
                const rect = element.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                if (rect.top < windowHeight && rect.bottom > 0) {
                    this.loadChart(chartId);
                }
            }
        }, 100);
    }

    // 开始观察所有图表容器
    startObserving() {
        const chartContainers = [
            'admitted-num',
            'confer-delay-num', 
            'total-delay',
            'delay-among-subjects',
            'pressure-source',
            'comments-on-tutor',
            'reform',
            'comments-on-bonus',
            'marriage-and-gender',
            'wordcloud'
        ];

        chartContainers.forEach(chartId => {
            const element = document.getElementById(chartId);
            if (element && !this.charts.has(chartId)) {
                this.observer.observe(element);
                console.log(`Started observing: ${chartId}`);
            }
        });
        
        // 立即进行一次手动检查
        this.checkVisibleCharts();
    }

    // 加载并初始化图表
    loadChart(chartId) {
        if (this.charts.has(chartId)) {
            return; // 已经加载过了
        }

        const initFunction = this.chartConfigs.get(chartId);
        if (initFunction) {
            console.log(`Loading chart: ${chartId}`);
            try {
                const chartInstance = initFunction();
                this.charts.set(chartId, chartInstance);
                
                // 添加窗口resize事件监听
                if (chartInstance && chartInstance.resize) {
                    const resizeHandler = () => chartInstance.resize();
                    window.addEventListener('resize', resizeHandler);
                    
                    // 存储resize处理器，便于后续清理
                    chartInstance._resizeHandler = resizeHandler;
                }
                
                console.log(`Chart loaded successfully: ${chartId}`);
            } catch (error) {
                console.error(`Failed to load chart ${chartId}:`, error);
            }
        } else {
            console.warn(`No init function found for chart: ${chartId}`);
        }
    }

    // 获取图表实例
    getChart(chartId) {
        return this.charts.get(chartId);
    }

    // 清理资源
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        
        if (this.manualCheckTimer) {
            clearTimeout(this.manualCheckTimer);
        }
        
        this.charts.forEach((chart, chartId) => {
            if (chart.dispose) {
                chart.dispose();
            }
            if (chart._resizeHandler) {
                window.removeEventListener('resize', chart._resizeHandler);
            }
        });
        
        this.charts.clear();
        this.chartConfigs.clear();
    }
}

// 创建全局实例
window.chartLazyLoader = new ChartLazyLoader();
