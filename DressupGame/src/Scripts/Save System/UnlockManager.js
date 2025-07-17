const UNLOCKED_ITEMS_KEY = 'unlockedGameItems';

class UnlockManager {
    constructor() {
        
        this.unlockedItems = new Set();
        this.loadUnlockedItems();
    }

    
    loadUnlockedItems() {
        try {
            const savedItems = localStorage.getItem(UNLOCKED_ITEMS_KEY);
            if (savedItems) {
                
                this.unlockedItems = new Set(JSON.parse(savedItems));
                console.log("[UnlockManager] Unlocked items loaded:", Array.from(this.unlockedItems));
            }
        } catch (e) {
            console.error("Failed to load unlocked items. Resetting.", e);
            this.unlockedItems = new Set();
        }
    }

   
    saveUnlockedItems() {
        try {
            
            const itemsToSave = Array.from(this.unlockedItems);
            localStorage.setItem(UNLOCKED_ITEMS_KEY, JSON.stringify(itemsToSave));
        } catch (e) {
            console.error("Failed to save unlocked items.", e);
        }
    }

    unlockItem(itemName) {
        if (!this.unlockedItems.has(itemName)) {
            this.unlockedItems.add(itemName);
            this.saveUnlockedItems(); 
            console.log(`[UnlockManager] Item unlocked and saved: ${itemName}`);
        }
    }

    isItemUnlocked(itemName) {
        return this.unlockedItems.has(itemName);
    }

    clearAllUnlocks() {
        this.unlockedItems.clear();
        localStorage.removeItem(UNLOCKED_ITEMS_KEY);
        console.log("[UnlockManager] All unlocked item data has been cleared.");
    }
}

export const unlockManager = new UnlockManager();