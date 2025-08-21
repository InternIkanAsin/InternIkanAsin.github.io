const BACHELOR_HISTORY_KEY = 'bachelorSelectionHistory';

class BachelorProgressManager {
    constructor() {
        this.history = this.loadHistory();
    }

    /**
     * Memuat daftar bachelor yang sudah pernah dipilih dari Local Storage.
     * @returns {string[]} Array berisi nama-nama bachelor.
     */
    loadHistory() {
        try {
            const savedHistory = localStorage.getItem(BACHELOR_HISTORY_KEY);
            if (savedHistory) {
                return JSON.parse(savedHistory);
            }
        } catch (e) {
            console.error("Failed to load bachelor history. Resetting.", e);
        }
        return []; 
    }

    /**
     * Menyimpan daftar bachelor yang sudah pernah dipilih ke Local Storage.
     */
    saveHistory() {
        try {
            localStorage.setItem(BACHELOR_HISTORY_KEY, JSON.stringify(this.history));
        } catch (e) {
            console.error("Failed to save bachelor history.", e);
        }
    }

    /**
     * Menambahkan nama bachelor baru ke dalam daftar riwayat.
     * @param {string} bachelorName - Nama bachelor yang baru saja dipilih.
     */
    addBachelorToHistory(bachelorName) {
        if (!this.history.includes(bachelorName)) {
            this.history.push(bachelorName);
            this.saveHistory();
            console.log(`[BachelorProgress] Added ${bachelorName} to history. History is now:`, this.history);
        }
    }

    /**
     * Mendapatkan daftar bachelor yang BELUM pernah dipilih.
     * @param {string[]} allBachelorNames - Array berisi semua nama bachelor yang mungkin.
     * @returns {string[]} Array berisi nama-nama bachelor yang tersedia untuk dipilih.
     */
    getAvailableBachelors(allBachelorNames) {
        const available = allBachelorNames.filter(name => !this.history.includes(name));
        console.log(`[BachelorProgress] History:`, this.history);
        console.log(`[BachelorProgress] Available bachelors:`, available);
        return available;
    }

    /**
     * Memeriksa apakah semua bachelor sudah pernah dipilih.
     * @param {string[]} allBachelorNames - Array berisi semua nama bachelor yang mungkin.
     * @returns {boolean}
     */
    haveAllBachelorsBeenChosen(allBachelorNames) {
        return this.history.length >= allBachelorNames.length;
    }
    
    // Fungsi ini tidak diperlukan karena Anda tidak ingin meresetnya,
    // tapi baik untuk dimiliki jika nanti berubah pikiran.
    clearHistory() {
        this.history = [];
        localStorage.removeItem(BACHELOR_HISTORY_KEY);
        console.log("[BachelorProgress] Bachelor history cleared.");
    }
}

// Ekspor sebagai instance singleton
export const bachelorProgressManager = new BachelorProgressManager();