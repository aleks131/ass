class SolarPanelPage {
    constructor() {
        this.metrics = {
            energyGenerated: 25000,
            efficiency: 92,
            co2Reduced: 15000
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
        // Power Generation Chart
        const powerCtx = document.getElementById('powerGenerationChart');
        if (powerCtx) {
            const powerChart = new Chart(powerCtx, {
                type: 'line',
                data: {
                    labels: ['6AM', '8AM', '10AM', '12PM', '2PM', '4PM', '6PM'],
                    datasets: [{
                        label: 'Power Output (kW)',
                        data: this.generateRandomData(7, 10, 50),
                        borderColor: '#FFB400',
                        tension: 0.4,
                        fill: true,
                        backgroundColor: 'rgba(255, 180, 0, 0.1)'
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
            this.charts.set('power', powerChart);
        }

        // Efficiency Chart
        const efficiencyCtx = document.getElementById('efficiencyChart');
        if (efficiencyCtx) {
            const efficiencyChart = new Chart(efficiencyCtx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Efficiency (%)',
                        data: this.generateRandomData(7, 85, 95),
                        borderColor: '#FF9100',
                        fill: true,
                        backgroundColor: 'rgba(255, 145, 0, 0.1)'
                    }]
                },
                options: this.chartOptions
            });
            this.charts.set('efficiency', efficiencyChart);
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
            element.textContent = current.toLocaleString() + (key === 'efficiency' ? '%' : '');
            if (current === end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    startLiveUpdates() {
        // Update real-time values
        setInterval(() => {
            this.updateRealTimeValues();
            this.updateChartData();
        }, 5000);
    }

    updateRealTimeValues() {
        const powerOutput = document.getElementById('current-power');
        const temperature = document.getElementById('panel-temp');
        const efficiency = document.getElementById('current-efficiency');

        if (powerOutput) {
            powerOutput.textContent = `${Math.floor(Math.random() * 30 + 20)} kW`;
            powerOutput.classList.add('updating');
            setTimeout(() => powerOutput.classList.remove('updating'), 500);
        }

        if (temperature) {
            temperature.textContent = `${Math.floor(Math.random() * 15 + 20)}°C`;
            temperature.classList.add('updating');
            setTimeout(() => temperature.classList.remove('updating'), 500);
        }

        if (efficiency) {
            efficiency.textContent = `${Math.floor(Math.random() * 10 + 85)}%`;
            efficiency.classList.add('updating');
            setTimeout(() => efficiency.classList.remove('updating'), 500);
        }
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
    const page = new SolarPanelPage();
    page.init();
}); 