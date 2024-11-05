class WasteWisePage {
    constructor() {
        this.metrics = {
            accuracy: 95,
            space: 60,
            waste: 250
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

        // Animate timeline
        this.animateTimeline();
    }

    animateNumber(element, start, end, duration) {
        const range = end - start;
        const increment = end > start ? 1 : -1;
        const stepTime = Math.abs(Math.floor(duration / range));
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = current.toLocaleString() + '%';
            if (current === end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    animateTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 300 * index);
        });
    }

    setupEventListeners() {
        // Feature cards hover effect
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });

        // CAD model gallery
        const modelImages = document.querySelectorAll('.model-gallery img');
        modelImages.forEach(img => {
            img.addEventListener('click', () => {
                this.openImageModal(img.src);
            });
        });
    }

    openImageModal(imageSrc) {
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <img src="${imageSrc}" alt="CAD Model">
                <button class="close-modal">&times;</button>
            </div>
        `;

        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.className === 'close-modal') {
                modal.remove();
            }
        });

        document.body.appendChild(modal);
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
    const page = new WasteWisePage();
    page.init();
}); 