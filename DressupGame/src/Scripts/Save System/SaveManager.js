import { MakeUpButton, OutfitButton } from '../UI/UIButton.js';

import { SaveData } from './SaveData.js';
const SAVE_KEY = 'dressupGameSaveData';

export class SaveManager {

    static saveGame(scene) {
        try {
            const prevData = SaveManager.loadGame() || {};
            const data = SaveData(scene, prevData);
            const jsonString = JSON.stringify(data);
            localStorage.setItem(SAVE_KEY, jsonString);
            console.log("Game Saved!", data);

        } catch (error) {
            console.error("Failed to save game:", error);
        }
    }

    static saveBachelorChoice(bachelorName) {
        if (!bachelorName) {
            console.error("[SaveManager] Attempted to save bachelor choice with no name.");
            return;
        }

        try {
            const existingData = SaveManager.loadGame() || {
                version: "1.2.0",
                bachelor: {},
                progress: {},
                playerAppearance: { outfits: {}, makeup: {} }
            };
            existingData.bachelor.chosenName = bachelorName;
            const jsonString = JSON.stringify(existingData);
            localStorage.setItem(SAVE_KEY, jsonString);
            console.log(`[SaveManager] Bachelor choice saved: ${bachelorName}`);

        } catch (error) {
            console.error("Failed to save bachelor choice:", error);
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



        } catch (error) {
            console.error("Failed to clear save data:", error);
        }
    }
}