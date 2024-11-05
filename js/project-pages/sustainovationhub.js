class SustainovationHubPage {
    constructor() {
        this.metrics = {
            sellers: 500,
            products: 5000,
            impact: 30
        };
        this.charts = new Map();
    }

    init() {
        this.initializeMetrics();
        this.initializeFeatures();
        this.initializeAOS();
        this.setupEventListeners();
    }

    initializeMetrics() {
        Object.entries(this.metrics).forEach(([key, value]) => {
            const element = document.getElementById(`${key}-metric`);
            if (element) {
                this.animateNumber(element, 0, value, 2000);
            }
        });
    }

    animateNumber(element, start, end, duration) {
        const range = end - start;
        const increment = end > start ? 1 : -1;
        const stepTime = Math.abs(Math.floor(duration / range));
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = current.toLocaleString() + (key === 'impact' ? '%' : '+');
            if (current === end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    initializeFeatures() {
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 200 * index);
        });
    }

    initializeAOS() {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }

    setupEventListeners() {
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }
}

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', () => {
    const page = new SustainovationHubPage();
    page.init();
}); 