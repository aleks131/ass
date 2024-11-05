class IMSSoftwarePage {
    constructor() {
        this.metrics = {
            markets: 50,
            datapoints: 10000,
            accuracy: 90
        };
        this.charts = new Map();
        this.animationDuration = 2000;
        this.chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#ffffff',
                        padding: 20,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(52, 152, 219, 0.9)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    padding: 10,
                    displayColors: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#ffffff',
                        font: {
                            size: 12
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#ffffff',
                        font: {
                            size: 12
                        }
                    }
                }
            }
        };
    }

    init() {
        this.initializeCharts();
        this.initializeAnimations();
        this.setupEventListeners();
        this.initializeAOS();
        this.handleResize();
    }

    initializeCharts() {
        // Market Potential Chart
        this.initializeMarketPotentialChart();
        // Risk Analysis Chart
        this.initializeRiskAnalysisChart();
        // Growth Forecast Chart
        this.initializeGrowthForecastChart();
    }

    initializeMarketPotentialChart() {
        const ctx = document.getElementById('marketPotentialChart');
        if (ctx) {
            const chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Market 1', 'Market 2', 'Market 3', 'Market 4', 'Market 5'],
                    datasets: [{
                        label: 'Market Potential Score',
                        data: this.generateRandomData(5, 60, 100),
                        backgroundColor: 'rgba(52, 152, 219, 0.6)',
                        borderColor: '#3498db',
                        borderWidth: 1,
                        borderRadius: 5
                    }]
                },
                options: {
                    ...this.chartOptions,
                    animation: {
                        duration: 2000,
                        easing: 'easeInOutQuart'
                    }
                }
            });
            this.charts.set('market', chart);
        }
    }

    initializeRiskAnalysisChart() {
        const ctx = document.getElementById('riskAnalysisChart');
        if (ctx) {
            const chart = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: [
                        'Political Risk',
                        'Economic Stability',
                        'Market Competition',
                        'Infrastructure',
                        'Legal Framework',
                        'Cultural Barriers',
                        'Trade Regulations',
                        'Currency Risk'
                    ],
                    datasets: [{
                        label: 'Risk Level',
                        data: this.generateRandomData(8, 20, 80),
                        backgroundColor: 'rgba(52, 152, 219, 0.2)',
                        borderColor: '#3498db',
                        borderWidth: 2,
                        pointBackgroundColor: '#3498db',
                        pointHoverBackgroundColor: '#fff'
                    }]
                },
                options: {
                    ...this.chartOptions,
                    scales: undefined,
                    elements: {
                        line: {
                            tension: 0.4
                        }
                    }
                }
            });
            this.charts.set('risk', chart);
        }
    }

    initializeGrowthForecastChart() {
        const ctx = document.getElementById('growthForecastChart');
        if (ctx) {
            const chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'],
                    datasets: [{
                        label: 'Projected Growth',
                        data: this.generateRandomData(6, 100, 200),
                        borderColor: '#3498db',
                        backgroundColor: 'rgba(52, 152, 219, 0.1)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: this.chartOptions
            });
            this.charts.set('growth', chart);
        }
    }

    handleResize() {
        window.addEventListener('resize', () => {
            this.charts.forEach(chart => {
                chart.resize();
            });
        });
    }

    generateRandomData(count, min, max) {
        return Array.from({length: count}, () => 
            Math.floor(Math.random() * (max - min + 1)) + min
        );
    }

    initializeAnimations() {
        Object.entries(this.metrics).forEach(([key, value]) => {
            const element = document.querySelector(`#${key}-metric`);
            if (element) {
                this.animateNumber(element, 0, value, this.animationDuration);
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
            element.textContent = current.toLocaleString();
            if (current === end) {
                clearInterval(timer);
                element.classList.add('completed');
            }
        }, stepTime);
    }

    setupEventListeners() {
        const cards = document.querySelectorAll('.metric-card, .feature-card, .tech-icon');
        cards.forEach(card => {
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
    const page = new IMSSoftwarePage();
    page.init();
}); 