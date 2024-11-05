class ComponentsLoader {
    static async loadComponents() {
        await this.loadHeader();
        await this.loadFooter();
    }

    static async loadHeader() {
        try {
            const response = await fetch('../components/header.html');
            const html = await response.text();
            document.body.insertAdjacentHTML('afterbegin', html);
        } catch (error) {
            console.error('Error loading header:', error);
        }
    }

    static async loadFooter() {
        try {
            const response = await fetch('../components/footer.html');
            const html = await response.text();
            document.body.insertAdjacentHTML('beforeend', html);
        } catch (error) {
            console.error('Error loading footer:', error);
        }
    }
}

// Load components when document is ready
document.addEventListener('DOMContentLoaded', () => {
    ComponentsLoader.loadComponents();
}); 