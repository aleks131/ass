class DataDashboardPage {
    constructor() {
        this.metrics = {
            sources: 15,
            visualizations: 25,
            kpis: 40
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
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#ffffff'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#ffffff'
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
        this.startLiveUpdates();
    }

    initializeCharts() {
        // Sales Performance Chart
        const salesCtx = document.getElementById('salesChart');
        if (salesCtx) {
            const salesChart = new Chart(salesCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Sales Performance',
                        data: this.generateRandomData(6, 1000, 5000),
                        borderColor: '#9C27B0',
                        tension: 0.4,
                        fill: true,
                        backgroundColor: 'rgba(156, 39, 176, 0.1)'
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
            this.charts.set('sales', salesChart);
        }

        // Demographics Chart
        const demoCtx = document.getElementById('demographicsChart');
        if (demoCtx) {
            const demoChart = new Chart(demoCtx, {
                type: 'doughnut',
                data: {
                    labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
                    datasets: [{
                        data: [15, 30, 25, 20, 10],
                        backgroundColor: [
                            '#9C27B0', '#673AB7', '#3F51B5', 
                            '#2196F3', '#03A9F4'
                        ]
                    }]
                },
                options: {
                    ...this.chartOptions,
                    animation: {
                        duration: 2000,
                        animateRotate: true
                    }
                }
            });
            this.charts.set('demographics', demoChart);
        }

        // Regional Distribution Chart
        const regionCtx = document.getElementById('regionChart');
        if (regionCtx) {
            const regionChart = new Chart(regionCtx, {
                type: 'bar',
                data: {
                    labels: ['North', 'South', 'East', 'West', 'Central'],
                    datasets: [{
                        label: 'Regional Distribution',
                        data: this.generateRandomData(5, 100, 500),
                        backgroundColor: '#673AB7'
                    }]
                },
                options: this.chartOptions
            });
            this.charts.set('region', regionChart);
        }

        // Trend Analysis Chart
        const trendCtx = document.getElementById('trendChart');
        if (trendCtx) {
            const trendChart = new Chart(trendCtx, {
                type: 'line',
                data: {
                    labels: Array.from({length: 12}, (_, i) => `Month ${i+1}`),
                    datasets: [{
                        label: 'Growth Trend',
                        data: this.generateRandomData(12, 50, 150),
                        borderColor: '#9C27B0',
                        fill: true,
                        backgroundColor: 'rgba(156, 39, 176, 0.1)'
                    }]
                },
                options: this.chartOptions
            });
            this.charts.set('trend', trendChart);
        }

        // Handle window resize
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
            }
        }, stepTime);
    }

    startLiveUpdates() {
        setInterval(() => {
            this.updateChartData();
        }, 5000);
    }

    updateChartData() {
        this.charts.forEach((chart, key) => {
            const newData = this.generateRandomData(
                chart.data.datasets[0].data.length,
                Math.min(...chart.data.datasets[0].data),
                Math.max(...chart.data.datasets[0].data)
            );
            chart.data.datasets[0].data = newData;
            chart.update('none');
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
    const page = new DataDashboardPage();
    page.init();
}); 