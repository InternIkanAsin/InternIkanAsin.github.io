const GAME_PROGRESS_KEY = 'gameProgressStatus';


class ProgressManager {
    constructor() {
        this.makeUpFinished = false;
        this.dressUpFinished = false;
        this.loadProgress();
    }

    
    loadProgress() {
        try {
            const savedProgress = localStorage.getItem(GAME_PROGRESS_KEY);
            if (savedProgress) {
                const data = JSON.parse(savedProgress);
                this.makeUpFinished = data.makeUpFinished || false;
                this.dressUpFinished = data.dressUpFinished || false;
                console.log("[ProgressManager] Progress loaded:", { 
                    makeUpFinished: this.makeUpFinished, 
                    dressUpFinished: this.dressUpFinished 
                });
            }
        } catch (e) {
            console.error("Failed to load game progress. Resetting.", e);
            this.resetProgress();
        }
    }

    saveProgress() {
        try {
            const progressToSave = {
                makeUpFinished: this.makeUpFinished,
                dressUpFinished: this.dressUpFinished
            };
            localStorage.setItem(GAME_PROGRESS_KEY, JSON.stringify(progressToSave));
            console.log("[ProgressManager] Progress saved.");
        } catch (e) {
            console.error("Failed to save game progress.", e);
        }
    }

   
    completeMakeUp() {
        if (!this.makeUpFinished) {
            this.makeUpFinished = true;
            this.saveProgress();
        }
    }

   
    completeDressUp() {
        if (!this.dressUpFinished) {
            this.dressUpFinished = true;
            this.saveProgress();
        }
    }

    
    resetProgress() {
        this.makeUpFinished = false;
        this.dressUpFinished = false;
    }

    
    clearProgress() {
        this.resetProgress();
        localStorage.removeItem(GAME_PROGRESS_KEY);
        console.log("[ProgressManager] Game progress cleared.");
    }
}

export const progressManager = new ProgressManager();