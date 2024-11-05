class HandmadePage {
    constructor() {
        this.metrics = {
            artisans: 500,
            products: 2500,
            customers: 10000
        };
        this.animationDuration = 2000;
    }

    init() {
        this.initializeAnimations();
        this.setupEventListeners();
        this.initializeAOS();
    }

    initializeAnimations() {
        // Animate metrics
        Object.entries(this.metrics).forEach(([key, value]) => {
            const element = document.querySelector(`#${key}-metric`);
            if (element) {
                this.animateNumber(element, 0, value, this.animationDuration);
            }
        });

        // Animate process steps
        this.animateProcessSteps();
    }

    animateNumber(element, start, end, duration) {
        const range = end - start;
        const increment = end > start ? 1 : -1;
        const stepTime = Math.abs(Math.floor(duration / range));
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = current.toLocaleString();
            if (current === end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    animateProcessSteps() {
        const steps = document.querySelectorAll('.process-step');
        steps.forEach((step, index) => {
            step.style.opacity = '0';
            step.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                step.style.transition = 'all 0.5s ease';
                step.style.opacity = '1';
                step.style.transform = 'translateY(0)';
            }, 300 * index);
        });
    }

    setupEventListeners() {
        // Research findings hover effect
        const findings = document.querySelectorAll('.research-findings li');
        findings.forEach(finding => {
            finding.addEventListener('mouseenter', () => {
                finding.style.transform = 'translateX(10px)';
            });
            
            finding.addEventListener('mouseleave', () => {
                finding.style.transform = 'translateX(0)';
            });
        });

        // Feature cards interaction
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

    initializeAOS() {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }
}

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', () => {
    const page = new HandmadePage();
    page.init();
}); 