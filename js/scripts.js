// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Initialize ParticlesJS
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    // Sticky Navigation
    const navbar = document.getElementById('navbar');
    const sticky = navbar.offsetTop;

    window.onscroll = function() {
        if (window.pageYOffset >= sticky) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    };

    // Skills Chart Configuration
    const chartsData = [
        { id: 'jsChart', label: 'JavaScript', value: 65, color: '#f0db4f' },
        { id: 'pythonChart', label: 'Python', value: 70, color: '#306998' },
        { id: 'javaChart', label: 'Java', value: 65, color: '#f89820' },
        { id: 'csharpChart', label: 'C#', value: 40, color: '#68217a' },
        { id: 'htmlCssChart', label: 'HTML & CSS', value: 75, color: '#e34c26' },
        { id: 'reactChart', label: 'React', value: 50, color: '#61dafb' },
        { id: 'sqlChart', label: 'SQL', value: 70, color: '#00758f' },
        { id: 'dataAnalysisChart', label: 'Data Analysis', value: 75, color: '#34a853' },
        { id: 'dataGatheringChart', label: 'Data Gathering', value: 80, color: '#4285f4' }
    ];

    const chartOptions = {
        type: 'doughnut',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                animateScale: true,
                animateRotate: true,
                duration: 2000,
                easing: 'easeInOutQuart'
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            },
            cutout: '80%',
            rotation: -90,
            circumference: 360
        }
    };

    // Function to animate percentage
    function animatePercentage(element, targetValue) {
        let currentValue = 0;
        const duration = 1500; // Match with skillLoad animation
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = targetValue / steps;

        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';

        setTimeout(() => {
            element.style.transition = 'opacity 0.3s, transform 0.3s';
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';

            const animation = setInterval(() => {
                currentValue += increment;
                if (currentValue >= targetValue) {
                    currentValue = targetValue;
                    clearInterval(animation);
                }
                element.textContent = `${Math.round(currentValue)}%`;
            }, stepTime);
        }, 500);
    }

    // Initialize charts with animations
    function initializeCharts() {
        chartsData.forEach((skill, index) => {
            const ctx = document.getElementById(skill.id).getContext('2d');
            const percentageElement = ctx.canvas.parentElement.querySelector('.percentage');
            const chartWrapper = ctx.canvas.closest('.chart-wrapper');

            // Set initial opacity and animation delay
            chartWrapper.style.animationDelay = `${index * 100}ms`;

            new Chart(ctx, {
                ...chartOptions,
                data: {
                    datasets: [{
                        data: [skill.value, 100 - skill.value],
                        backgroundColor: [skill.color, 'rgba(255, 255, 255, 0.1)'],
                        borderWidth: 0
                    }]
                }
            });

            // Observe for animation
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        percentageElement.classList.add('visible');
                        animatePercentage(percentageElement, skill.value);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(chartWrapper);
        });
    }

    // Initialize charts when document is ready
    document.addEventListener('DOMContentLoaded', initializeCharts);

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Project Cards Hover Effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                y: -10,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    // Contact Form Validation
    const formElement = document.querySelector('.contact-form');
    if (formElement) {
        formElement.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form submission logic here
        });
    }

    // Loading Animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Add this to your existing JavaScript
    window.addEventListener('scroll', () => {
        const scrollProgress = document.querySelector('.scroll-progress');
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        
        const progressWidth = `${(scrolled / scrollable) * 100}%`;
        scrollProgress.style.width = progressWidth;
    });

    // Add this to your existing JavaScript
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Function to handle CV download
    function trackDownload(event) {
        event.preventDefault(); // Prevent default action temporarily
        
        const button = event.currentTarget;
        const icon = button.querySelector('i');
        
        // Add loading state
        button.classList.add('loading');
        icon.classList.remove('fa-download');
        icon.classList.add('fa-spinner', 'fa-spin');
        
        
        
        // Trigger the download
        setTimeout(() => {
            link.click();
            
            // Reset button state
            button.classList.remove('loading');
            icon.classList.remove('fa-spinner', 'fa-spin');
            icon.classList.add('fa-check');
            
            // Show success message
            showToast('CV downloaded successfully!', 'success');
            
            // Reset icon after 3 seconds
            setTimeout(() => {
                icon.classList.remove('fa-check');
                icon.classList.add('fa-download');
            }, 3000);
        }, 1000);
    }

    // Function to show toast notifications
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast-notification ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    // Add this to handle potential errors
    function handleFileError() {
        showToast('Error accessing the file. Please try again.', 'error');
    }

    // Toast notification styles (add if not already present)
    const toastStyles = `
        .toast-notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 5px;
            color: white;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            z-index: 1000;
            animation: slideIn 0.3s ease, slideOut 0.3s ease 2.7s forwards;
        }

        .toast-notification.success {
            background: rgba(46, 204, 113, 0.9);
        }

        .toast-notification.error {
            background: rgba(231, 76, 60, 0.9);
        }

        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }

        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;

    // Add styles to document
    if (!document.querySelector('#toast-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'toast-styles';
        styleSheet.textContent = toastStyles;
        document.head.appendChild(styleSheet);
    }

    // Make sure the function is available globally
    window.trackDownload = trackDownload;

    // Add these to your existing JavaScript

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('#navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for animations
    const createObserver = (elements, callback, options = {}) => {
        const defaultOptions = {
            root: null,
            threshold: 0.1,
            rootMargin: "0px",
            ...options
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    callback(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, defaultOptions);

        elements.forEach(element => observer.observe(element));
        return observer;
    };

    // Animate elements when they come into view
    const animateElement = (element) => {
        element.classList.add('animate');
    };

    // Initialize animations for different sections
    document.addEventListener('DOMContentLoaded', () => {
        // Animate sections
        const sections = document.querySelectorAll('.animate-on-scroll');
        if (sections.length > 0) {
            createObserver(sections, animateElement);
        }

        // Animate project cards
        const projectCards = document.querySelectorAll('.project-card');
        if (projectCards.length > 0) {
            createObserver(projectCards, (card) => {
                card.classList.add('appear');
            });
        }

        // Animate skill bars
        const skillBars = document.querySelectorAll('.skill-bar');
        if (skillBars.length > 0) {
            createObserver(skillBars, (bar) => {
                const percentage = bar.getAttribute('data-percentage');
                bar.style.width = percentage + '%';
            });
        }
    });

    // Form validation
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            let isValid = true;
            const inputs = this.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });

            if (isValid) {
                // Handle form submission
                console.log('Form submitted successfully');
                this.reset();
            }
        });
    }

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    });

    // Animate skill bars when they come into view
    function initializeSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const percentage = entry.target.getAttribute('data-percentage');
                    entry.target.style.width = percentage + '%';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        skillBars.forEach(bar => observer.observe(bar));
    }

    // Call this function when the document is loaded
    document.addEventListener('DOMContentLoaded', () => {
        initializeSkillBars();
        // ... your other initialization code
    });

    // Add this to your existing scripts.js

    function initializeSkillDonuts() {
        const skillCircles = document.querySelectorAll('.skill-progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const circle = entry.target;
                    const percent = circle.getAttribute('data-percent');
                    const radius = circle.getAttribute('r');
                    const circumference = 2 * Math.PI * radius;
                    const offset = circumference - (percent / 100) * circumference;
                    
                    // Set the progress
                    circle.style.strokeDasharray = `${circumference} ${circumference}`;
                    circle.style.strokeDashoffset = circumference;
                    
                    // Trigger animation
                    setTimeout(() => {
                        circle.style.strokeDashoffset = offset;
                    }, 100);
                    
                    observer.unobserve(circle);
                }
            });
        }, {
            threshold: 0.5
        });

        skillCircles.forEach(circle => observer.observe(circle));
    }

    // Call this function when the document is loaded
    document.addEventListener('DOMContentLoaded', () => {
        initializeSkillDonuts();
        // ... your other initialization code
    });

    // Enhanced Skill Animations with Number Counter
    function initializeSkillAnimations() {
        const skillCircles = document.querySelectorAll('.skill-progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const circle = entry.target;
                    const percent = parseInt(circle.getAttribute('data-percent'));
                    const radius = circle.getAttribute('r');
                    const circumference = 2 * Math.PI * radius;
                    const offset = circumference - (percent / 100) * circumference;
                    
                    // Set initial state
                    circle.style.strokeDasharray = `${circumference} ${circumference}`;
                    circle.style.strokeDashoffset = circumference;
                    
                    // Add loading class
                    circle.classList.add('loading');
                    
                    // Animate with delay based on index
                    setTimeout(() => {
                        // Animate the circle
                        circle.style.transition = 'stroke-dashoffset 2s ease-out';
                        circle.style.strokeDashoffset = offset;
                        
                        // Get the percentage element
                        const percentElement = circle.closest('.skill-item').querySelector('.skill-percent');
                        
                        // Start counting animation
                        startCountingAnimation(percentElement, percent);
                        
                        // Add glow effect after loading
                        setTimeout(() => {
                            circle.classList.remove('loading');
                            circle.classList.add('loaded');
                        }, 2000);
                        
                    }, index * 200);
                    
                    observer.unobserve(circle);
                }
            });
        }, {
            threshold: 0.2
        });

        skillCircles.forEach(circle => observer.observe(circle));
    }

    // New function for counting animation
    function startCountingAnimation(element, targetNumber) {
        let currentNumber = 0;
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = targetNumber / steps;
        const stepTime = duration / steps;
        
        // Reset the element
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
            
            const counter = setInterval(() => {
                currentNumber += increment;
                
                if (currentNumber >= targetNumber) {
                    currentNumber = targetNumber;
                    clearInterval(counter);
                    element.classList.add('visible');
                }
                
                // Update the number with percentage symbol
                element.innerHTML = `${Math.round(currentNumber)}<span class="percent-symbol">%</span>`;
            }, stepTime);
        }, 500);
    }

    // Initialize when document is ready
    document.addEventListener('DOMContentLoaded', () => {
        initializeSkillAnimations();
        // ... other initialization code
    });

    // Project Card Animations
    function initializeProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            // Hover animations using GSAP
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -10,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                
                const image = card.querySelector('.project-image img');
                gsap.to(image, {
                    scale: 1.05,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                
                const image = card.querySelector('.project-image img');
                gsap.to(image, {
                    scale: 1,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });
        });
    }

    // Initialize when document is ready
    document.addEventListener('DOMContentLoaded', () => {
        initializeProjectCards();
    });

    // Add this function for handling project downloads
    function trackProjectDownload(event, projectName) {
        event.preventDefault();
        const button = event.currentTarget;
        const icon = button.querySelector('i');
        
        // Add loading state
        button.classList.add('loading');
        icon.classList.remove('fa-download');
        icon.classList.add('fa-spinner', 'fa-spin');
        
        // Simulate download preparation (you can add actual processing here)
        setTimeout(() => {
            // Start the download
            const link = document.createElement('a');
            link.href = button.href;
            link.download = `${projectName}.zip`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Show success state
            button.classList.remove('loading');
            icon.classList.remove('fa-spinner', 'fa-spin');
            icon.classList.add('fa-check');
            
            // Show success message
            showToast(`${projectName} project downloaded successfully!`, 'success');
            
            // Reset button after 3 seconds
            setTimeout(() => {
                icon.classList.remove('fa-check');
                icon.classList.add('fa-download');
            }, 3000);
        }, 1000);
    }

    // Add this to your existing showToast function if not already present
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast-notification ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Add mobile menu functionality
    document.addEventListener('DOMContentLoaded', function() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('.nav-menu');

        if (mobileMenuBtn && navMenu) {
            mobileMenuBtn.addEventListener('click', function() {
                this.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close menu when clicking a link
            const navLinks = navMenu.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenuBtn.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    mobileMenuBtn.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        }

        // Handle touch events for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        document.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });

        document.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchEndX - touchStartX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0 && navMenu.classList.contains('active')) {
                    // Swipe right, close menu
                    mobileMenuBtn.classList.remove('active');
                    navMenu.classList.remove('active');
                } else if (diff < 0 && !navMenu.classList.contains('active')) {
                    // Swipe left, open menu
                    mobileMenuBtn.classList.add('active');
                    navMenu.classList.add('active');
                }
            }
        }
    });

    // Add smooth loading indicator
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Enhance smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });

    // Add error handling for project downloads
    function handleProjectDownload(event, projectName) {
        event.preventDefault();
        const button = event.target;
        button.classList.add('loading');
        
        try {
            // Download logic
            setTimeout(() => {
                button.classList.remove('loading');
            }, 2000);
        } catch (error) {
            console.error('Download failed:', error);
            button.classList.remove('loading');
            showNotification('Download failed. Please try again.');
        }
    }

    // Add notification system
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
});

// Dynamic Copyright Year
document.addEventListener('DOMContentLoaded', function() {
    const yearSpan = document.querySelector('.copyright-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}); 