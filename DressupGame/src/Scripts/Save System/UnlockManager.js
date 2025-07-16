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

    /**
     * Menambahkan item baru ke daftar yang sudah di-unlock dan langsung menyimpannya.
     * @param {string} itemName Nama unik dari item (contoh: "Dress 18").
     */
    unlockItem(itemName) {
        if (!this.unlockedItems.has(itemName)) {
            this.unlockedItems.add(itemName);
            this.saveUnlockedItems(); // Langsung simpan perubahan
            console.log(`[UnlockManager] Item unlocked and saved: ${itemName}`);
        }
    }

    /**
     * Memeriksa apakah sebuah item sudah ada di dalam daftar yang di-unlock.
     * @param {string} itemName Nama unik dari item.
     * @returns {boolean} True jika item sudah di-unlock, false jika belum.
     */
    isItemUnlocked(itemName) {
        return this.unlockedItems.has(itemName);
    }

    /**
     * Menghapus semua data item yang sudah di-unlock.
     * Dipanggil saat pemain menekan "Next Level" atau "Restart".
     */
    clearAllUnlocks() {
        this.unlockedItems.clear();
        localStorage.removeItem(UNLOCKED_ITEMS_KEY);
        console.log("[UnlockManager] All unlocked item data has been cleared.");
    }
}

// Buat satu instance global dari UnlockManager yang akan kita gunakan di seluruh game.
export const unlockManager = new UnlockManager();