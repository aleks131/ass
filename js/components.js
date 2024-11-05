class InteractiveComponents {
    constructor() {
        this.components = new Map();
        this.eventListeners = new Map();
    }

    registerComponent(id, component) {
        this.components.set(id, component);
        this.initializeComponent(id, component);
    }

    initializeComponent(id, component) {
        switch(component.type) {
            case 'chart':
                this.initializeChart(id, component);
                break;
            case 'gallery':
                this.initializeGallery(id, component);
                break;
            case 'carousel':
                this.initializeCarousel(id, component);
                break;
            case 'form':
                this.initializeForm(id, component);
                break;
        }
    }

    initializeChart(id, config) {
        const ctx = document.getElementById(id);
        if (!ctx) return;

        const chart = new Chart(ctx, {
            type: config.chartType,
            data: config.data,
            options: {
                ...config.options,
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                },
                responsive: true,
                maintainAspectRatio: false
            }
        });

        this.components.set(id, chart);
    }

    initializeGallery(id, config) {
        const gallery = document.getElementById(id);
        if (!gallery) return;

        const masonry = new Masonry(gallery, {
            itemSelector: '.gallery-item',
            columnWidth: '.gallery-sizer',
            percentPosition: true,
            transitionDuration: '0.3s'
        });

        this.components.set(id, masonry);
    }

    initializeCarousel(id, config) {
        const carousel = document.getElementById(id);
        if (!carousel) return;

        const swiper = new Swiper(carousel, {
            slidesPerView: config.slidesPerView || 'auto',
            spaceBetween: config.spaceBetween || 30,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            autoplay: config.autoplay || false
        });

        this.components.set(id, swiper);
    }

    initializeForm(id, config) {
        const form = document.getElementById(id);
        if (!form) return;

        const validator = new FormValidator(form, {
            ...config,
            onSuccess: async (data) => {
                try {
                    await this.submitForm(data);
                    this.showSuccess(config.successMessage);
                } catch (error) {
                    this.showError(error.message);
                }
            }
        });

        this.components.set(id, validator);
    }

    async submitForm(data) {
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Form submission failed');
        }

        return response.json();
    }

    showSuccess(message) {
        const toast = document.createElement('div');
        toast.className = 'toast success';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    showError(message) {
        const toast = document.createElement('div');
        toast.className = 'toast error';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    destroy(id) {
        const component = this.components.get(id);
        if (component && component.destroy) {
            component.destroy();
        }
        this.components.delete(id);
        this.eventListeners.delete(id);
    }
} 