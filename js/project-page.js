class ProjectPage {
    constructor() {
        this.initialized = false;
        this.loadingScreen = document.querySelector('.loading-screen');
        this.progressBar = document.querySelector('.progress');
        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.scrollElements = document.querySelectorAll('.fade-up');
    }

    init() {
        if (this.initialized) return;
        
        this.handleLoading();
        this.initializeGallery();
        this.initializeScrollAnimations();
        this.initializeNavigation();
        
        this.initialized = true;
    }

    handleLoading() {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 30;
            if (progress > 100) {
                progress = 100;
                clearInterval(interval);
                setTimeout(() => {
                    this.loadingScreen.classList.add('fade-out');
                }, 500);
            }
            this.progressBar.style.width = `${progress}%`;
        }, 200);
    }

    initializeGallery() {
        if (!this.galleryItems.length) return;

        this.galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const imgSrc = item.querySelector('img').src;
                this.openLightbox(imgSrc);
            });
        });
    }

    openLightbox(imgSrc) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${imgSrc}" alt="Project Image">
                <button class="close-lightbox">&times;</button>
            </div>
        `;

        document.body.appendChild(lightbox);
        setTimeout(() => lightbox.classList.add('visible'), 10);

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('close-lightbox')) {
                lightbox.classList.remove('visible');
                setTimeout(() => lightbox.remove(), 300);
            }
        });
    }

    initializeScrollAnimations() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '50px'
            }
        );

        this.scrollElements.forEach(element => observer.observe(element));
    }

    initializeNavigation() {
        const navbar = document.getElementById('navbar');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > lastScroll && currentScroll > 100) {
                navbar.classList.add('navbar-hidden');
            } else {
                navbar.classList.remove('navbar-hidden');
            }

            if (currentScroll > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }

            lastScroll = currentScroll;
        });
    }
}

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', () => {
    const projectPage = new ProjectPage();
    projectPage.init();
}); 