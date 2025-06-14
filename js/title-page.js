// 标题页面交互脚本
document.addEventListener('DOMContentLoaded', function() {
    initTitlePage();
});

function initTitlePage() {
    // 添加标题打字机效果
    addTypewriterEffect();
    
    // 添加页面加载动画
    addLoadAnimation();
    
    // 添加响应式字体大小调整
    adjustFontSize();
}

// 添加标题打字机效果
function addTypewriterEffect() {
    const titleElement = document.querySelector('#title-sec h1');
    if (!titleElement) return;
    
    const originalText = titleElement.textContent;
    titleElement.innerHTML = ''; // 清空内容
    titleElement.style.opacity = '1'; // 确保标题容器可见
    
    // 添加闪烁光标
    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor-blink';
    cursor.textContent = '|';
    titleElement.appendChild(cursor);
    
    // 光标闪烁1.5秒后开始打字
    setTimeout(() => {
        // 停止闪烁，变为静态光标
        cursor.className = 'typewriter-cursor-static';
        
        let index = 0;
        const typeInterval = setInterval(() => {
            if (index < originalText.length) {
                // 在光标前插入字符
                const charSpan = document.createElement('span');
                charSpan.textContent = originalText.charAt(index);
                charSpan.style.opacity = '0';
                charSpan.style.animation = 'fadeInChar 0.1s ease-in forwards';
                titleElement.insertBefore(charSpan, cursor);
                index++;
            } else {
                // 打字完成，让光标持续闪烁
                clearInterval(typeInterval);
                cursor.className = 'typewriter-cursor-blink';
            }
        }, 200); // 每个字符显示间隔120ms，更流畅
    }, 2000); // 1.5秒后开始打字
}

// 添加页面加载动画
function addLoadAnimation() {
    const titleSec = document.getElementById('title-sec');
    // 移除可能干扰打字机效果的opacity设置
    // titleSec.style.opacity = '0';
    
    window.addEventListener('load', function() {
        // 确保页面加载完成后标题区域可见
        titleSec.style.transition = 'opacity 0.5s ease-in-out';
        titleSec.style.opacity = '1';
    });
}

// 添加响应式字体大小调整
function adjustFontSize() {
    const titleElement = document.querySelector('#title-sec h1');
    if (!titleElement) return;
    
    function updateFontSize() {
        const screenWidth = window.innerWidth;
        let fontSize;
        
        if (screenWidth > 1200) {
            fontSize = '2.8rem';
        } else if (screenWidth > 768) {
            fontSize = '2.2rem';
        } else if (screenWidth > 480) {
            fontSize = '1.8rem';
        } else {
            fontSize = '1.5rem';
        }
        
        titleElement.style.fontSize = fontSize;
    }
    
    updateFontSize();
    window.addEventListener('resize', updateFontSize);
}
