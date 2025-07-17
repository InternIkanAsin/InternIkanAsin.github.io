import { MakeUpButton, OutfitButton } from '../UI/UIButton.js';
import { SaveManager } from './SaveManager.js';

export function SaveData(scene, prevData = {}) {
    let savedData = {
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
            
            outfits: SaveManager.cleanSaveData(OutfitButton.selectedOutfits),
            makeup: SaveManager.cleanSaveData(MakeUpButton.selectedMakeUp)
        },
        lockedButtonStatus: prevData.lockedButtonStatus || {
            'Dress 18': { isLocked: true },
            'Dress 19': { isLocked: true },
            'Dress 20': { isLocked: true }
        }
    }

    return savedData;
}

export function unlockDress(scene, itemName) {
    if (scene.savedData.lockedButtonStatus[itemName]) {
        scene.savedData.lockedButtonStatus[itemName].isLocked = false;

    }
}

export function isButtonLocked(scene, itemName) {
    console.log(scene.savedData);
}