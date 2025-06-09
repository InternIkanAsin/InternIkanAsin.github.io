// Costume Data Class
import { costumeData, outfitPositions } from '../Outfit Data/CostumeData.js'

// UI Buttons Class
import UIButton, { OutfitButton, GeneralButton, ItemPanelButton } from '../UI/UIButton.js'

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

        // Add buttons to the panel
        costumeData.forEach(({ name, outfitType, x, y, textureAnime, textureButton, textureIcon, stat }) => {
            const { x: outfitX, y: outfitY } = outfitPositions[outfitType] || { x: 0, y: 0 };
            const button = new OutfitButton(scene, name, outfitType, x, y, outfitX, outfitY, textureAnime, textureButton, textureIcon, stat, scene.statTracker, scene.AudioManager);

            // Optional: Hide/show by type
            button.setSize(150, 200).setVisible(false);
            button.setData('instance', button);

            if (!scene.outfitButtons[outfitType]) {
                scene.outfitButtons[outfitType] = [];
            }
            scene.outfitButtons[outfitType].push(button);
        });
    }

    /**
     * @method removeAllOutfits
     * Unequips all currently equipped outfits.
     */
    removeAllOutfits() {
        console.log("[DressUpManager] Removing all outfits...");
        const scene = this.scene;

        if (!scene.OutfitButton || !scene.OutfitButton.selectedOutfits) {
            console.error("[DressUpManager] OutfitButton.selectedOutfits not found!");
            return;
        }
        if (!scene.statTracker) {
            console.error("[DressUpManager] StatTracker not found!");
            return;
        }

        const typesToRemove = Object.keys(scene.OutfitButton.selectedOutfits);

        typesToRemove.forEach(outfitType => {
            const entry = scene.OutfitButton.selectedOutfits[outfitType];
            const currentOutfitButton = entry?.current;

            if (currentOutfitButton && currentOutfitButton instanceof OutfitButton) { // Check if it's an OutfitButton instance
                // console.log(`Removing ${outfitType}: ${currentOutfitButton.name}`);

                // 1. Destroy the displayed GameObject
                if (currentOutfitButton.displayedOutfit && typeof currentOutfitButton.displayedOutfit.destroy === 'function') {
                    currentOutfitButton.displayedOutfit.destroy();
                    currentOutfitButton.displayedOutfit = null; // Nullify on the button instance
                }

                // 2. Update stats
                if (typeof currentOutfitButton.stat === 'number') {
                    scene.statTracker.setStat(currentOutfitButton.stat, false); // false for removing
                }
            }
            // 3. Clear the entry in the selectedOutfits registry for this type
            scene.OutfitButton.selectedOutfits[outfitType] = { current: null, previous: currentOutfitButton || entry?.previous || null };
        });

        // Optional: Play a sound
        if (this.AudioManager) {
            this.AudioManager.playSFX('buttonClick'); // Or a more specific "unequip all" sound
        }
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

        // --- Create and Add "Lepas" Button for Outfits ---
        const lepasOutfitButton = new ItemPanelButton(
            scene,
            scene.AudioManager,
            0, 0,                         // Position will be set by grid sizer
            'button1',                    // Background texture (e.g., same as OutfitButton's textureButton)
            'xMark',                      // Icon texture key for the 'X'
            0.7,                          // Icon scale (to match OutfitButton's iconImg.scale)
            -20,                          // Icon Y offset (to match OutfitButton's iconImg.y)
            'Remove',                     // Text ("Lepas" or "Remove")
            '22px',                       // Text size (to match OutfitButton's textLabel.fontSize)
            70,                           // Text Y offset (to match OutfitButton's textLabel.y)
            () => { // Callback for "Lepas Outfit"
                console.log(`[LepasButton] Clicked for Outfit Type: ${outfitType}`);

                let typeToUnequipActually = outfitType;
                // Special handling for "DressShirt" if it's a combined category view
                if (outfitType === "DressShirt") {

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
                    if (typeof equippedButtonInstance.stat === 'number') {
                        scene.statTracker.setStat(equippedButtonInstance.stat, false);
                    }
                    OutfitButton.selectedOutfits[typeToUnequipActually] = { current: null, previous: equippedButtonInstance };

                    // Clear highlight for this specific button
                    if (equippedButtonInstance.highlightImage) {
                        equippedButtonInstance.highlightImage.setVisible(false);
                    }
                    // If Dress was unequipped, also clear highlights for dependent types
                    if (typeToUnequipActually === "Dress") {
                        OutfitButton.clearHighlightsForType(scene, "Shirt");
                        OutfitButton.clearHighlightsForType(scene, "Underwear");
                    }
                } else {
                    console.log(`[LepasButton] No ${typeToUnequipActually} item currently equipped to remove.`);
                }

            }

        );
        lepasOutfitButton.setSize(150, 200);
        allButtonContainersForPanel.push(lepasOutfitButton.container ? lepasOutfitButton.container : lepasOutfitButton);


        itemButtonsForType.forEach(buttonInstance => {
            allButtonContainersForPanel.push(buttonInstance.container ? buttonInstance.container : buttonInstance);
        });

        scene.MiniGameManager.buttonList.forEach(btn => {
            if (btn && btn.destroy) {
                btn.destroy(); // Properly destroy the button game object
            }
        })
        scene.MiniGameManager.buttonList = allButtonContainersForPanel;


        if (scene.MiniGameManager.buttonGrid) {
            // The grid currently holds CATEGORY buttons.
            // Category buttons are re-created by goBackMainPanel, so they can be destroyed here.
            scene.MiniGameManager.buttonGrid.clear(true, true); // Destroy category buttons
            scene.MiniGameManager.buttonGrid.destroy();          // Destroy the grid sizer itself
            scene.MiniGameManager.buttonGrid = null;
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

        scene.tweens.add({
            targets: [scene.sidePanel],
            x: scene.scale.width * 1.3,
            duration: 500,
            ease: 'Sine.easeInOut',
            onComplete: () => {
                // 2. Bring out back button visual (target its container)
                if (scene.MiniGameManager.backButton) {
                    scene.tweens.add({
                        targets: [scene.MiniGameManager.backButton],
                        x: scene.scale.width / 2 * 1.73,
                        duration: 500,
                        ease: 'Sine.easeInOut'
                        // Interactivity set at the very end
                    });
                }

                // 3. Update the content of the panel with dress-up items
                this.updateDressUpButtons(outfitType);

                // 4. Update selected button header text and icon
                let iconKey = 'dressIcon';
                switch (outfitType) {
                    case 'Dress': iconKey = 'dressIcon'; break;
                    case 'Shirt': iconKey = 'dressIcon'; break;
                    case 'Outer': iconKey = 'outerIcon'; break;
                    case 'Underwear': iconKey = 'underwearIcon'; break;
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
                    targets: [scene.sidePanel],
                    x: scene.scale.width - 70,
                    duration: 500,
                    ease: 'Sine.easeInOut',
                    onComplete: () => {
                        // 7. After panel is in view, fade in the header
                        if (scene.selectedButtonHeader) {
                            scene.tweens.add({
                                targets: [scene.selectedButtonHeader],
                                alpha: 1,
                                duration: 500,
                                ease: 'Sine.easeInOut',
                                onComplete: () => {
                                    //   MAKE BACK BUTTON INTERACTIVE 
                                    if (scene.MiniGameManager && scene.MiniGameManager.backButton) {
                                        scene.MiniGameManager.backButton.setInteractive();

                                    }
                                    if (scene.miniGameButton) {
                                        scene.miniGameButton.setInteractive();
                                    }
                                }
                            });
                        } else {
                            // If no header, still make back button interactive once panel is in
                            if (scene.MiniGameManager && scene.MiniGameManager.backButton) {
                                scene.MiniGameManager.backButton.setInteractive();

                            }
                            if (scene.miniGameButton) {
                                scene.miniGameButton.setInteractive();
                            }
                        }
                    }
                });
            }
        });
    }
}