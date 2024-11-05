class ProjectStateManager {
    constructor() {
        this.state = new Map();
        this.listeners = new Map();
        this.history = [];
    }

    setState(key, value) {
        const oldValue = this.state.get(key);
        this.state.set(key, value);
        this.notifyListeners(key, oldValue, value);
        this.updateHistory(key, oldValue, value);
    }

    getState(key) {
        return this.state.get(key);
    }

    subscribe(key, callback) {
        if (!this.listeners.has(key)) {
            this.listeners.set(key, new Set());
        }
        this.listeners.get(key).add(callback);

        // Return unsubscribe function
        return () => {
            this.listeners.get(key).delete(callback);
        };
    }

    notifyListeners(key, oldValue, newValue) {
        if (this.listeners.has(key)) {
            this.listeners.get(key).forEach(callback => {
                callback(newValue, oldValue);
            });
        }
    }

    updateHistory(key, oldValue, newValue) {
        this.history.push({
            timestamp: Date.now(),
            key,
            oldValue,
            newValue
        });

        // Keep history length manageable
        if (this.history.length > 100) {
            this.history.shift();
        }
    }

    getHistory(key) {
        return this.history.filter(entry => entry.key === key);
    }

    reset() {
        this.state.clear();
        this.listeners.clear();
        this.history = [];
    }
} 