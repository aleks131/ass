// Mobile Performance Optimizations
document.addEventListener('DOMContentLoaded', function() {
    // Lazy load images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('loading' in HTMLImageElement.prototype) {
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const lazyLoadScript = document.createElement('script');
        lazyLoadScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(lazyLoadScript);
    }

    // Intersection Observer for smooth section animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.project-section').forEach(section => {
        observer.observe(section);
    });

    // Touch event optimizations
    let touchStartY = 0;
    document.addEventListener('touchstart', e => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    // Optimize scroll performance
    let ticking = false;
    document.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Update scroll-based animations
                updateScrollProgress();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Memory management for charts
    function optimizeCharts() {
        const charts = document.querySelectorAll('.chart-container');
        charts.forEach(chart => {
            const canvas = chart.querySelector('canvas');
            if (canvas && !isElementInViewport(canvas)) {
                canvas.style.display = 'none';
            } else if (canvas) {
                canvas.style.display = 'block';
            }
        });
    }

    // Throttle chart optimization
    let throttleTimer;
    window.addEventListener('scroll', () => {
        if (throttleTimer) return;
        throttleTimer = setTimeout(() => {
            optimizeCharts();
            throttleTimer = null;
        }, 100);
    }, { passive: true });

    // Helper function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= window.innerHeight &&
            rect.right <= window.innerWidth
        );
    }
}); 