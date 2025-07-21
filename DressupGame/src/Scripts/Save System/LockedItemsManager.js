import { costumeData } from '../Outfit Data/CostumeData.js';
import { makeUpData } from '../Makeup Data/MakeUpData.js';

const LOCKED_ITEMS_KEY = 'gameLockedItemStatus';

class LockedItemsManager {
    constructor() {
        this.lockedItems = new Set();
        this.loadOrRandomizeLockedItems();
    }

    loadOrRandomizeLockedItems() {
        try {
            const savedData = localStorage.getItem(LOCKED_ITEMS_KEY);
            if (savedData) {
                // Jika sudah ada data, muat saja
                this.lockedItems = new Set(JSON.parse(savedData));
                console.log("[LockedItemsManager] Loaded locked item status from storage.");
            } else {
                // Jika tidak ada data (game pertama kali main), buat secara acak
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

        // Logika randomisasi untuk Outfit
        const groupedCostumes = {};
        costumeData.forEach(c => {
            if (!groupedCostumes[c.outfitType]) groupedCostumes[c.outfitType] = [];
            groupedCostumes[c.outfitType].push(c);
        });
        Object.values(groupedCostumes).forEach(costumes => {
            const numToLock = Math.floor(costumes.length / 3); // Kunci sekitar 1/3 item
            for (let i = 0; i < numToLock; i++) {
                const randomIndex = Math.floor(Math.random() * costumes.length);
                if (!this.lockedItems.has(costumes[randomIndex].name)) {
                    this.lockedItems.add(costumes[randomIndex].name);
                } else {
                    i--; // Coba lagi jika item sudah dipilih
                }
            }
        });

        // Logika randomisasi untuk Makeup
        const groupedMakeup = {};
        makeUpData.forEach(m => {
            if (m.textureButton && !groupedMakeup[m.makeUpType]) groupedMakeup[m.makeUpType] = [];
            if (m.textureButton) groupedMakeup[m.makeUpType].push(m);
        });
        Object.values(groupedMakeup).forEach(makeups => {
            const numToLock = Math.floor(makeups.length / 3);
            for (let i = 0; i < numToLock; i++) {
                const randomIndex = Math.floor(Math.random() * makeups.length);
                 if (!this.lockedItems.has(makeups[randomIndex].name)) {
                    this.lockedItems.add(makeups[randomIndex].name);
                } else {
                    i--;
                }
            }
        });
        
        // Simpan hasilnya ke Local Storage
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

// Buat satu instance global
export const lockedItemsManager = new LockedItemsManager();