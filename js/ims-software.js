class IMSSoftware extends ProjectPage {
    constructor() {
        super();
        this.marketData = {
            labels: ['Market 1', 'Market 2', 'Market 3', 'Market 4', 'Market 5'],
            scores: [85, 72, 68, 90, 65]
        };
        this.charts = new Map();
    }

    init() {
        super.init();
        this.initializeMarketChart();
        this.initializeMetricsAnimation();
        this.initializeInteractiveFeatures();
    }

    initializeMarketChart() {
        const ctx = document.getElementById('marketAnalysisChart');
        if (!ctx) return;

        this.charts.set('market', new Chart(ctx, {
            type: 'radar',
            data: {
                labels: this.marketData.labels,
                datasets: [{
                    label: 'Market Score',
                    data: this.marketData.scores,
                    backgroundColor: 'rgba(240, 84, 84, 0.2)',
                    borderColor: '#f05454',
                    pointBackgroundColor: '#f05454'
                }]
            },
            options: {
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        }));
    }

    initializeMetricsAnimation() {
        const metrics = document.querySelectorAll('.metric-value');
        metrics.forEach(metric => {
            const targetValue = parseInt(metric.dataset.value);
            this.animateNumber(metric, targetValue);
        });
    }

    initializeInteractiveFeatures() {
        // Add interactive features specific to IMS Software
        this.initializeMarketComparison();
        this.initializeDataFilters();
    }

    initializeMarketComparison() {
        const compareButtons = document.querySelectorAll('.compare-market');
        compareButtons.forEach(button => {
            button.addEventListener('click', () => {
                const marketId = button.dataset.marketId;
                this.showMarketComparison(marketId);
            });
        });
    }

    showMarketComparison(marketId) {
        // Implementation for market comparison visualization
    }
}

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', () => {
    const imsSoftware = new IMSSoftware();
    imsSoftware.init();
}); 