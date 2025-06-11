/**
 * 页面布局管理器
 * 负责处理页面间的分隔、滚动控制和视觉效果
 */

class PageLayoutManager {
    constructor() {
        this.sections = [
            { id: 'title-sec', name: '标题页' },
            { id: 'intro-sec', name: '引入页' },
            { id: 'phd-num', name: '博士生数量页' },
            { id: 'interviews', name: '访谈页' },
            { id: 'uncertainty', name: '悬而未决页' },
            { id: 'burdens', name: '压力页' },
            { id: 'marriage', name: '婚育页' },
            { id: 'end', name: '结尾页' }
        ];
        
        this.currentSection = 0;
        this.isScrolling = false;
        
        this.init();
    }
    
    init() {
        this.addPageClasses();
        this.setupScrollControl();
        this.addPageDividers();
        console.log('页面布局管理器已初始化');
    }
    
    /**
     * 为所有页面添加统一的class
     */
    addPageClasses() {
        this.sections.forEach(section => {
            const element = document.getElementById(section.id);
            if (element) {
                element.classList.add('page-section');
            }
        });
    }
    
    /**
     * 设置滚动控制
     */
    setupScrollControl() {
        // 防止快速滚动导致的页面重叠
        let scrollTimeout;
        
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            
            scrollTimeout = setTimeout(() => {
                this.updateCurrentSection();
            }, 100);
        });
        
        // 监听窗口大小变化
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }
    
    /**
     * 更新当前所在的页面
     */
    updateCurrentSection() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        
        this.sections.forEach((section, index) => {
            const element = document.getElementById(section.id);
            if (element) {
                const rect = element.getBoundingClientRect();
                const elementTop = rect.top + scrollTop;
                
                if (scrollTop >= elementTop - windowHeight / 2 && 
                    scrollTop < elementTop + element.offsetHeight - windowHeight / 2) {
                    this.currentSection = index;
                }
            }
        });
    }
    
    /**
     * 添加页面分隔线
     */
    addPageDividers() {
        // 在关键页面之间添加分隔线
        const criticalDividers = [
            { after: 'title-sec', class: 'primary' },
            { after: 'intro-sec', class: 'primary' },
            { after: 'phd-num', class: 'normal' }
        ];
        
        criticalDividers.forEach(divider => {
            const section = document.getElementById(divider.after);
            if (section) {
                const dividerElement = document.createElement('div');
                dividerElement.className = `page-divider ${divider.class}`;
                section.insertAdjacentElement('afterend', dividerElement);
            }
        });
    }
    
    /**
     * 处理窗口大小变化
     */
    handleResize() {
        // 重新计算页面高度和位置
        this.updateCurrentSection();
    }
    
    /**
     * 平滑滚动到指定页面
     */
    scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            this.isScrolling = true;
            
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            setTimeout(() => {
                this.isScrolling = false;
            }, 1000);
        }
    }
    
    /**
     * 获取当前页面信息
     */
    getCurrentSection() {
        return this.sections[this.currentSection];
    }
    
    /**
     * 调试方法：显示当前页面信息
     */
    debug() {
        console.log('当前页面:', this.getCurrentSection());
        console.log('滚动位置:', window.pageYOffset);
        console.log('视窗高度:', window.innerHeight);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 创建全局页面管理器实例
    window.pageLayoutManager = new PageLayoutManager();
    
    // 添加调试快捷键 (Ctrl+Shift+D)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'D') {
            window.pageLayoutManager.debug();
        }
    });
});
