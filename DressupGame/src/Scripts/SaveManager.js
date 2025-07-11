import { MakeUpButton, OutfitButton } from './UI/UIButton.js';
const SAVE_KEY = 'dressupGameSaveData';

export class SaveManager {

    static saveGame(scene) {
        try {
            // 1. Kumpulkan semua data yang relevan
            const dataToSave = {
                version: "1.0.0",
                lastPlayed: new Date().toISOString(),
                bachelor: {
                    chosenName: scene.chosenBachelorName
                },
                progress: {
                    makeUpFinished: scene.makeUpFinished,
                    dressUpFinished: scene.dressUpFinished
                },
                playerAppearance: {
                    // Kita panggil fungsi helper untuk membersihkan data
                    outfits: SaveManager.cleanSaveData(OutfitButton.selectedOutfits),
                    makeup: SaveManager.cleanSaveData(MakeUpButton.selectedMakeUp)
                }
            };

            // 2. Ubah menjadi string dan simpan
            const jsonString = JSON.stringify(dataToSave);
            localStorage.setItem(SAVE_KEY, jsonString);
            console.log("Game Saved!", dataToSave);

        } catch (error) {
            console.error("Failed to save game:", error);
        }
    }

    static loadGame() {
        try {
            const jsonString = localStorage.getItem(SAVE_KEY);
            if (jsonString) {
                const loadedData = JSON.parse(jsonString);
                console.log("Game Loaded!", loadedData);
                return loadedData;
            }
            return null;
        } catch (error) {
            console.error("Failed to load game:", error);
            return null;
        }
    }

    // Fungsi helper untuk membersihkan data dari referensi Phaser
    static cleanSaveData(selectedItems) {
        const cleanedData = {};
        for (const type in selectedItems) {
            const item = selectedItems[type].current;
            if (item) {
                cleanedData[type] = {
                    current: {
                        name: item.name,
                        textureAnime: item.textureAnime, 
                    }
                };
            }
        }
        return cleanedData;
    }
    static clearSave() {
        try {
            
            localStorage.removeItem(SAVE_KEY);
            console.log("Save data cleared from localStorage.");

           
            OutfitButton.selectedOutfits = {};
            MakeUpButton.selectedMakeUp = {};
            console.log("In-memory static state (selectedOutfits, selectedMakeUp) has been reset.");

            if (scene && scene.registry) {
                
                scene.registry.remove('gameRestarted');
                scene.registry.remove('currentBachelorIndex');
                console.log("Phaser registry 'gameRestarted' and 'currentBachelorIndex' cleared.");
            }

        } catch (error) {
            console.error("Failed to clear save data:", error);
        }
    }
}