// Costume Data Class
import { costumeData } from '../Outfit Data/CostumeData.js'

// UI Buttons Class
import UIButton, { OutfitButton, ItemPanelButton } from '../UI/UIButton.js'
import { SaveManager } from '../Save System/SaveManager.js';
import AssetLoader from '../AssetLoader.js';
import { unlockManager } from '../Save System/UnlockManager.js';
import { layout } from '../ScreenOrientationUtils.js';
import { lockedItemsManager } from '../Save System/LockedItemsManager.js';

export class DressUpManager {
    constructor(scene, AudioManager) {
        this.scene = scene;
        this.AudioManager = AudioManager;
    }

    /**
     * @method setupCostumeButtons - Initializes an array and creates costumedata SOs and stores it in the array created based on its type
     */
    setupCostumeButtons(scene) {
        this.scene.outfitButtons = {};
        const outfitPositions = layout.outfit.positions;
        

        costumeData.forEach(({ name, outfitType, x, y, textureAnime, textureButton, textureIcon, isLocked: defaultLockStatus }) => {
            const isItemGloballyLocked = lockedItemsManager.isItemLocked(name);
            const isCurrentlyLocked = isItemGloballyLocked && !unlockManager.isItemUnlocked(name);
            const { x: outfitX, y: outfitY } = outfitPositions[outfitType] || { x: 0, y: 0 };
            const button = new OutfitButton(scene, name, outfitType, x, y, outfitX, outfitY, textureAnime, textureButton, { atlas: textureIcon.atlas, frame: textureIcon.frame }, scene.AudioManager, isCurrentlyLocked);

            button.setSize(150, 200).setVisible(false);
            button.setData('instance', button);


            const currentSelectedEntry = OutfitButton.selectedOutfits[outfitType];
            const oldButtonInstance = currentSelectedEntry?.current;
            

            if (oldButtonInstance && oldButtonInstance.name === name) {

                button.highlightImage.setVisible(true);


                button.displayedOutfit = oldButtonInstance.displayedOutfit;

                currentSelectedEntry.current = button;
            }



            if (!scene.outfitButtons[outfitType]) {
                scene.outfitButtons[outfitType] = [];
            }
            scene.outfitButtons[outfitType].push(button);
        });
    }

    randomizeLockedOutfits() {
        const groupedCostumeData = {};
        const lockedCostumeSaveData = SaveManager.loadGame();
        console.log(lockedCostumeSaveData.lockedOutfitButtonLength);
        costumeData.forEach(costume => {
            if (!groupedCostumeData[costume.outfitType]) {
                groupedCostumeData[costume.outfitType] = [];
            }
            groupedCostumeData[costume.outfitType].push(costume);
        });

        if (lockedCostumeSaveData.lockedOutfitButtonLength === 0) {
            Object.keys(groupedCostumeData).forEach(outfitType => {
                const costumes = groupedCostumeData[outfitType];
                const lockedButtonNumber = Math.floor(costumes.length * 1 / 3) + 1;
                for (let i = 0; i < lockedButtonNumber; i++) {
                    const randomIndex = Math.floor(Math.random() * costumes.length);
                    costumes[randomIndex].isLocked = true;
                    lockedCostumeSaveData.lockedOutfitButtonStatus[costumes[randomIndex].name] = {
                        isLocked: true
                    };
                }
            });
            lockedCostumeSaveData.lockedOutfitButtonLength = Object.keys(lockedCostumeSaveData.lockedOutfitButtonStatus).length;
            SaveManager.saveGame(this.scene);
        } else {
            console.log(lockedCostumeSaveData.lockedOutfitButtonLength);
            costumeData.forEach(costume => {
                costume.isLocked = lockedCostumeSaveData.lockedOutfitButtonStatus[costume.name].isLocked || false;
            });

        }
    }
    /**
     * @method removeAllOutfits
     * Unequips all currently equipped outfits.
     */
    removeAllOutfits() {
        console.log("[DressUpManager] Removing all outfits...");
        const scene = this.scene;

        if (!OutfitButton.selectedOutfits) {
            console.error("[DressUpManager] OutfitButton.selectedOutfits not found!");
            return;
        }
        if (!scene.statTracker) {
            console.error("[DressUpManager] StatTracker not found!");
            return;
        }

        const typesToRemove = Object.keys(OutfitButton.selectedOutfits);

        typesToRemove.forEach(outfitType => {
            const entry = OutfitButton.selectedOutfits[outfitType];
            const currentOutfit = entry?.current;

           
            let outfitImageDestroyed = false;

            // Prioritas 1: Hancurkan melalui referensi `displayedOutfit` yang benar.
            if (currentOutfit && currentOutfit.displayedOutfit && typeof currentOutfit.displayedOutfit.destroy === 'function') {
                currentOutfit.displayedOutfit.destroy();
                currentOutfit.displayedOutfit = null;
                outfitImageDestroyed = true;
            }

            // Prioritas 2 (Fallback): Hancurkan melalui referensi di scene.
            if (scene[outfitType] && typeof scene[outfitType].destroy === 'function') {
                scene[outfitType].destroy();
                scene[outfitType] = null;
                outfitImageDestroyed = true;
            }
            
            if (outfitImageDestroyed) {
                 console.log(`[RemoveAll] Successfully removed visual for ${outfitType}`);
            }
            // 3. Clear the entry in the selectedOutfits registry for this type
            OutfitButton.selectedOutfits[outfitType] = { current: null, previous: currentOutfit || entry?.previous || null };
        });

        OutfitButton.clearAllOutfitHighlights(scene);
        console.log("[DressUpManager] All outfits removed. Current selection:", scene.OutfitButton.selectedOutfits);
    }


    /**
    * @method updateDressUpButtons - Updates makeup buttons of make up Panel
    */
    updateDressUpButtons(outfitType) {
        const scene = this.scene;
        let itemButtonsForType = [];

        if (outfitType === "Dress") { // <<<< MODIFIED HERE
            // When "Dress" category is selected, show both Dress and Shirt items
            itemButtonsForType = [
                ...(scene.outfitButtons["Dress"] || []),
                ...(scene.outfitButtons["Shirt"] || [])
            ];
        } else if (outfitType === "DressShirt") {
            // Keep this if you have a SEPARATE "DressShirt" button for some reason
            itemButtonsForType = [
                ...(scene.outfitButtons["Dress"] || []),
                ...(scene.outfitButtons["Shirt"] || [])
            ];
        } else {
            itemButtonsForType = scene.outfitButtons[outfitType] || [];
        }

        let allButtonContainersForPanel = [];
        // ... (rest of the method for creating Lepas button and populating the grid) ...
        // Make sure when creating the Lepas button, its callback correctly targets
        // "Dress" or "Shirt" for un-equipping if the panel shows combined items.
        // The 'activeType' passed to the LepasButton constructor should be smart.

        // For the "Lepas" button logic when outfitType is "Dress" (showing Dress+Shirt):
        const lepasButtonCallbackType = (outfitType === "Dress" || outfitType === "DressShirt") ? "DressShirt" : outfitType;


        if (scene.sidePanelHeaderText) {
            scene.tweens.add({
                targets: scene.sidePanelHeaderText,
                alpha: 0,
                duration: 200,
                ease: 'Sine.easeInOut',
                onComplete: () => {
                    scene.sidePanelHeaderText.setText(outfitType.toString());
                    scene.tweens.add({
                        targets: scene.sidePanelHeaderText,
                        alpha: 1,
                        duration: 200,
                        ease: 'Sine.easeInOut'
                    })
                }
            });
        }
        // --- Create and Add "Lepas" Button for Outfits ---
        const lepasOutfitButton = new ItemPanelButton(
            scene,
            scene.AudioManager,
            0, 0,                         // Position will be set by grid sizer
            'buttonIcon2',                    // Background texture (same as MakeUpButton)
            'xMark',                      // Icon texture key for the 'X'                      
            -15,                          // Icon Y offset (matches MakeUpButton iconImage.y)
            'Remove',                     // Text ("Lepas" or "Remove")
            '30px',                       // Text size (matches MakeUpButton textLbl)
            () => { // Callback for "Lepas Outfit"
                console.log(`[LepasButton] Clicked for Outfit Type: ${outfitType}`);

                let typeToUnequipActually = outfitType;
                // Special handling for "DressShirt" if it's a combined category view
                if (outfitType === "Shirt" || outfitType === "Dress") {

                    if (OutfitButton.selectedOutfits["Dress"]?.current) {
                        typeToUnequipActually = "Dress"; // Prioritize Dress
                    } else if (OutfitButton.selectedOutfits["Shirt"]?.current) {
                        typeToUnequipActually = "Shirt";
                    } else {
                        // Nothing from Dress/Shirt to unequip if DressShirt was a filter and nothing selected
                        scene.AudioManager?.playSFX?.("buttonClick");
                        return;
                    }
                }

                const currentEntry = OutfitButton.selectedOutfits[typeToUnequipActually];
                const equippedButtonInstance = currentEntry?.current;

                if (equippedButtonInstance && equippedButtonInstance instanceof OutfitButton) {
                    // Unequip it: destroy visual, update stat, clear selection in registry
                    if (equippedButtonInstance.displayedOutfit) {
                        equippedButtonInstance.displayedOutfit.destroy();
                        equippedButtonInstance.displayedOutfit = null;
                    }

                    OutfitButton.selectedOutfits[typeToUnequipActually] = { current: null, previous: equippedButtonInstance };

                    // Clear highlight for this specific button
                    if (equippedButtonInstance.highlightImage) {
                        equippedButtonInstance.highlightImage.setVisible(false);
                    }
                    // If Dress was unequipped, also clear highlights for dependent types
                    if (typeToUnequipActually === "Dress") {
                        OutfitButton.clearHighlightsForType(scene, "Shirt");
                        OutfitButton.clearHighlightsForType(scene, "Lower");
                    }
                } else {
                    console.log(`[LepasButton] No ${typeToUnequipActually} item currently equipped to remove.`);
                }
                if (scene[outfitType]) {
                    scene[outfitType].destroy();
                    scene[outfitType] = null;
                }
            }

        );
        lepasOutfitButton.setSize(150, 200);
        allButtonContainersForPanel.push(lepasOutfitButton.container ? lepasOutfitButton.container : lepasOutfitButton);


        itemButtonsForType.forEach(buttonInstance => {
            allButtonContainersForPanel.push(buttonInstance.container ? buttonInstance.container : buttonInstance);
        });

        itemButtonsForType.forEach(buttonInstance => {
            // 'buttonInstance' is instance of OutfitButton
            const type = buttonInstance.outfitType;
            const currentSelectedButton = OutfitButton.selectedOutfits[type]?.current;

            // Check if the current button is selected button
            if (currentSelectedButton && currentSelectedButton === buttonInstance) {
                // if yes, highlight
                if (buttonInstance.highlightImage) {
                    buttonInstance.highlightImage.setVisible(true);
                }
            } else {
                // if not, disable highlight
                if (buttonInstance.highlightImage) {
                    buttonInstance.highlightImage.setVisible(false);
                }
            }
        });

        if (scene.MiniGameManager.buttonGrid) {
            const children = scene.MiniGameManager.buttonGrid.getAllChildren();

            children.forEach(childGameObject => {

                const instance = childGameObject.getData ? childGameObject.getData('instance') : null;

                if (instance instanceof OutfitButton) {

                    scene.MiniGameManager.buttonGrid.remove(childGameObject, false);
                }

            });


            scene.MiniGameManager.buttonGrid.destroy();
            scene.MiniGameManager.buttonGrid = null;
        }


        scene.MiniGameManager.buttonList = allButtonContainersForPanel;

        if (scene.MiniGameManager.innerSizer) {
            scene.MiniGameManager.innerSizer.clear(true);
        }
        if (scene.MiniGameManager.innerSizer) {
            scene.MiniGameManager.innerSizer.clear(true);
        }

        scene.MiniGameManager.buttonGrid = scene.rexUI.add.gridSizer({
            column: 1, row: scene.MiniGameManager.buttonList.length || 1,
            space: { column: 0, row: 20 }, align: 'center',
        });
        scene.MiniGameManager.innerSizer.add(scene.MiniGameManager.buttonGrid, 0, 'center', { expand: true }, true);
        scene.MiniGameManager.buttonList.forEach((btnContainer, index) => {
            btnContainer.setVisible(true);
            scene.MiniGameManager.buttonGrid.add(btnContainer, 0, index, 'center', 0, false);
        });
        scene.MiniGameManager.buttonGrid.layout();
        scene.MiniGameManager.innerSizer.layout();
        if (scene.sidePanel) { scene.sidePanel.layout(); scene.sidePanel.setT(0); }
    }

    displayDressUpButtons(outfitType, scene) {
        //if ((outfitType === 'Dress' || outfitType === 'Shirt') && !scene.areDressesAndShirtsLoaded) {
        //    scene.UIManager.showLoadingOverlay('Loading Dresses & Shirts...');
        //    scene.MiniGameManager.disableInteraction();
        //    
        //    scene.load.once('complete', () => {
        //        console.log('Dress and Shirt assets loaded!');
        //        scene.areDressesAndShirtsLoaded = true;
        //        scene.UIManager.hideLoadingOverlay();
        //        scene.MiniGameManager.enableInteraction();
        //        this.displayDressUpButtons(outfitType, scene); 
        //    });
        //    
        //    AssetLoader.loadDressAndShirt(scene);
        //    return;
        //}



        if (outfitType === 'Outer' && !scene.areOutersLoaded) {
            scene.UIManager.showLoadingOverlay('Loading Outers...');
            scene.MiniGameManager.disableInteraction();

            scene.load.once('complete', () => {
                console.log('Outer assets loaded!');
                scene.areOutersLoaded = true;
                scene.UIManager.hideLoadingOverlay();
                scene.MiniGameManager.enableInteraction();
                this.displayDressUpButtons('Outer', scene);
            });

            AssetLoader.loadOuter(scene);
            return;
        }



        if (outfitType === 'Lower' && !scene.areLowersLoaded) {
            scene.UIManager.showLoadingOverlay('Loading Lowers...');
            scene.MiniGameManager.disableInteraction();

            scene.load.once('complete', () => {
                console.log('Lower assets loaded!');
                scene.areLowersLoaded = true;
                scene.UIManager.hideLoadingOverlay();
                scene.MiniGameManager.enableInteraction();
                this.displayDressUpButtons('Lower', scene);
            });

            AssetLoader.loadLower(scene);
            return;
        }



        if (outfitType === 'Socks' && !scene.areSocksLoaded) {
            scene.UIManager.showLoadingOverlay('Loading Socks...');
            scene.MiniGameManager.disableInteraction();

            scene.load.once('complete', () => {
                console.log('Socks assets loaded!');
                scene.areSocksLoaded = true;
                scene.UIManager.hideLoadingOverlay();
                scene.MiniGameManager.enableInteraction();
                this.displayDressUpButtons('Socks', scene);
            });

            AssetLoader.loadSocks(scene);
            return;
        }

        if (outfitType === 'Shoes' && !scene.areShoesLoaded) {
            scene.UIManager.showLoadingOverlay('Loading Shoes...');
            scene.MiniGameManager.disableInteraction();
            scene.load.once('complete', () => {
                console.log('Shoes assets loaded!');
                scene.areShoesLoaded = true;
                scene.UIManager.hideLoadingOverlay();
                scene.MiniGameManager.enableInteraction();
                this.displayDressUpButtons('Shoes', scene);
            });

            AssetLoader.loadShoes(scene);
            return;
        }

        // Ensure MiniGameManager and its backButton exist before trying to use them
        if (!scene.MiniGameManager || !scene.MiniGameManager.backButton) {
            console.error("Critical: MiniGameManager or its backButton not found in displayDressUpButtons!");
            return;
        }

        if (scene.miniGameButton) {
            scene.miniGameButton.disableInteractive();
        }
        // 1. Disable back button at the start of this specific transition
        if (scene.MiniGameManager && scene.MiniGameManager.backButton) {
            scene.MiniGameManager.backButton.disableInteractive();
        }

        let headerText = outfitType;
        if (outfitType === 'Shirt') {
            headerText = 'Dress'; // Saat di kategori Shirt, header tetap "Dress"
        } else if (outfitType === 'Underwear') {
            headerText = 'Lower'; // Mengganti nama header
        }

        if (scene.sidePanelHeaderText) {
            scene.tweens.add({
                targets: scene.sidePanelHeaderText,
                alpha: 0,
                duration: 200,
                ease: 'Sine.easeInOut',
                onComplete: () => {
                    scene.sidePanelHeaderText.setText(headerText); // Gunakan headerText yang sudah disesuaikan
                    scene.tweens.add({
                        targets: scene.sidePanelHeaderText,
                        alpha: 1,
                        duration: 200,
                        ease: 'Sine.easeInOut'
                    })
                }
            });
        }
        const oldButtons = scene.MiniGameManager.buttonGrid ? scene.MiniGameManager.buttonGrid.getAllChildren() : [];
        scene.tweens.add({
            targets: oldButtons,
            alpha: 0,
            duration: 200,
            ease: 'Sine.easeInOut',
            onComplete: () => {

                // 3. Update the content of the panel with dress-up items
                this.updateDressUpButtons(outfitType);

                const newButtons = scene.MiniGameManager.buttonGrid.getAllChildren();
                newButtons.forEach(btn => btn.setAlpha(0));

                // 4. Update selected button header text and icon
                let iconKey = 'dressIcon';
                switch (outfitType) {
                    case 'Dress': iconKey = 'dressIcon'; break;
                    case 'Shirt': iconKey = 'dressIcon'; break;
                    case 'Outer': iconKey = 'outerIcon'; break;
                    case 'Lower': iconKey = 'LowerIcon'; break;
                    case 'Socks': iconKey = 'socksIcon'; break;
                    case 'Shoes': iconKey = 'shoesIcon'; break;
                    case 'DressShirt': iconKey = 'dressIcon'; break;
                    default: console.warn(`No specific header icon defined for outfitType: ${outfitType}. Using default.`); break;
                }
                if (scene.selectedButtonIcon) scene.selectedButtonIcon.setTexture(iconKey);
                if (scene.selectedButtonText) scene.selectedButtonText.setText(outfitType.toString());

                // 5. Adjust panel layout if necessary
                if (scene.MiniGameManager.updatePanelLayout) {
                    scene.MiniGameManager.updatePanelLayout(30, 100, 30);
                }

                // 6. Tween the panel (now with new items) back into view
                scene.tweens.add({
                    targets: newButtons,
                    alpha: 1,
                    duration: 200,
                    ease: 'Sine.easeInOut',
                    onComplete: () => {
                        if (scene.miniGameButton) scene.miniGameButton.setInteractive();
                        if (scene.MiniGameManager.backButton) scene.MiniGameManager.backButton.setInteractive();
                    }
                });
            }
        });
    }
}