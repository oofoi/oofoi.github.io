// 获取导航栏元素
const navBar = document.getElementById('navBar');
let navPosition = navBar.offsetTop; // 初始位置

// 核心滚动处理函数
function handleScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const shouldFix = scrollY > navPosition;

    // 动态切换固定定位类
    navBar.classList.toggle('fixed-nav', shouldFix);

    // 修改点：直接控制高度变化
    // navBar.style.height = shouldFix ? '70px' : '80px';

    // 防止内容跳动（根据当前高度计算 padding）
    document.body.style.paddingTop = shouldFix ?
        `${navBar.offsetHeight}px` : '0';
}

// 节流函数优化性能
function throttle(func, wait = 100) {
    let lastTime = 0;
    return function (...args) {
        const now = Date.now();
        if (now - lastTime >= wait) {
            func.apply(this, args);
            lastTime = now;
        }
    };
}

// 事件监听 ======================================
// 1. 监听滚动事件（使用节流）
window.addEventListener('scroll', throttle(handleScroll));

// 2. 窗口大小变化时更新导航栏初始位置
window.addEventListener('resize', () => {
    navPosition = navBar.offsetTop;
});

// 3. 页面加载完成时确保初始化位置正确
window.addEventListener('load', () => {
    navPosition = navBar.offsetTop;
    handleScroll(); // 首次主动触发
});

// 4. DOM加载完成后立即初始化
document.addEventListener('DOMContentLoaded', () => {
    navPosition = navBar.offsetTop;
});