import { costumeData } from '../Outfit Data/CostumeData.js';
import { makeUpData } from '../Makeup Data/MakeUpData.js';

const LOCKED_ITEMS_KEY = 'gameLockedItemStatus';

class LockedItemsManager {
    constructor() {
        // Hanya inisialisasi properti di constructor
        this.lockedItems = new Set();
    }

    // Buat method baru untuk inisialisasi yang bisa dipanggil kapan saja
    initialize() {
        this.loadOrRandomizeLockedItems();
    }

    loadOrRandomizeLockedItems() {
        try {
            const savedData = localStorage.getItem(LOCKED_ITEMS_KEY);
            if (savedData) {
                this.lockedItems = new Set(JSON.parse(savedData));
                console.log("[LockedItemsManager] Loaded locked item status from storage.");
            } else {
                console.log("[LockedItemsManager] No locked item data found. Randomizing now...");
                this.randomizeAndSave();
            }
        } catch (e) {
            console.error("Failed to load or randomize locked items. Defaulting to none.", e);
            this.lockedItems = new Set();
        }
    }

    randomizeAndSave() {
        this.lockedItems.clear();
        const groupedCostumes = {};
        costumeData.forEach(c => {
            if (!groupedCostumes[c.outfitType]) groupedCostumes[c.outfitType] = [];
            groupedCostumes[c.outfitType].push(c);
        });
        Object.values(groupedCostumes).forEach(costumes => {
            const numToLock = Math.round(costumes.length / 3);
            for (let i = 0; i < numToLock; i++) {
                const randomIndex = Math.floor(Math.random() * costumes.length);
                if (!this.lockedItems.has(costumes[randomIndex].name)) {
                    this.lockedItems.add(costumes[randomIndex].name);
                } else {
                    i--;
                }
            }
        });

        const groupedMakeup = {};
        makeUpData.forEach(m => {
            if (m.textureButton && !groupedMakeup[m.makeUpType]) groupedMakeup[m.makeUpType] = [];
            if (m.textureButton) groupedMakeup[m.makeUpType].push(m);
        });
        Object.values(groupedMakeup).forEach(makeups => {
            const numToLock = Math.round(makeups.length / 3);
            for (let i = 0; i < numToLock; i++) {
                const randomIndex = Math.floor(Math.random() * makeups.length);
                if (!this.lockedItems.has(makeups[randomIndex].name)) {
                    this.lockedItems.add(makeups[randomIndex].name);
                } else {
                    i--;
                }
            }
        });

        localStorage.setItem(LOCKED_ITEMS_KEY, JSON.stringify(Array.from(this.lockedItems)));
        console.log("[LockedItemsManager] Randomized and saved locked items:", this.lockedItems);
    }

    isItemLocked(itemName) {
        return this.lockedItems.has(itemName);
    }

    clearLockedItems() {
        this.lockedItems.clear();
        localStorage.removeItem(LOCKED_ITEMS_KEY);
        console.log("[LockedItemsManager] Cleared all locked item data.");
    }
}

export const lockedItemsManager = new LockedItemsManager();