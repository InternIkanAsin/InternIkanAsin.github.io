// Costume Data Class
import { costumeData } from '../Outfit Data/CostumeData.js'
import { orientation } from '../ScreenOrientationUtils.js';
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


        costumeData.forEach(({ name, outfitType, x, y, textureAnime, textureButton, textureIcon }) => {
            //Create Buttons and stores it in outfitButtons
            const isItemGloballyLocked = lockedItemsManager.isItemLocked(name);
            const isCurrentlyLocked = isItemGloballyLocked && !unlockManager.isItemUnlocked(name);
            const { x: outfitX, y: outfitY } = outfitPositions[outfitType] || { x: 0, y: 0 };
            const button = new OutfitButton(scene, name, outfitType, x, y, outfitX, outfitY, textureAnime, textureButton, textureIcon, scene.AudioManager, isCurrentlyLocked);

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

    randomizeOutfit() {
        const outfitSets = [
            ["Dress", "Socks", "Shoes"],
            ["Shirt", "Outer", "Lower", "Socks", "Shoes"],
            ["Shirt", "Lower", "Socks", "Shoes"]
        ];
        const chosenSet = outfitSets[Math.floor(Math.random() * outfitSets.length)];
        chosenSet.forEach(outfitType => {
            const buttons = this.scene.outfitButtons[outfitType];
            const randomIndex = Math.floor(Math.random() * buttons.length);
            buttons[randomIndex].toggleOutfit();
        });
    }
    /**
     * @method removeAllOutfits
     * Unequips all currently equipped outfits.
     */
    removeAllOutfits() {
        console.log("[DressUpManager] Removing all outfits...");
        const scene = this.scene;
        const typesToRemove = Object.keys(OutfitButton.selectedOutfits);

        typesToRemove.forEach(outfitType => {
            // Panggil method unequip statis yang sudah berisi Ghost Buster
            OutfitButton.unequip(scene, outfitType);
        });

        OutfitButton.clearAllOutfitHighlights(scene);
        console.log("[DressUpManager] All outfits removed.");
    }


    /**
    * @method updateDressUpButtons - Updates makeup buttons of make up Panel
    */
    updateDressUpButtons(outfitType) {
        const scene = this.scene;
        let itemButtonsForType = [];

        if (outfitType === "Dress") {

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

        itemButtonsForType.forEach(buttonInstance => {
            if (buttonInstance.nameText) {
                buttonInstance.nameText.setY(layout.outfitButton.textYPosition || 70);
            }
        });



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

        const allButtonContainersForPanel = [];
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
                let typeToUnequipActually = outfitType;
                if (outfitType === "Shirt" || outfitType === "Dress") {
                    if (OutfitButton.selectedOutfits["Dress"]?.current) typeToUnequipActually = "Dress";
                    else if (OutfitButton.selectedOutfits["Shirt"]?.current) typeToUnequipActually = "Shirt";
                    else { return; }
                }

                // Panggil method unequip statis yang sudah berisi Ghost Buster
                OutfitButton.unequip(scene, typeToUnequipActually);
                OutfitButton.clearAllOutfitHighlights(scene);
            }

        );
        lepasOutfitButton.setSize(150, 200).setDepth(15);
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

        const gridConfig = layout.grid;
        const columns = gridConfig.columns > 0 ? gridConfig.columns : 4
        const numItems = allButtonContainersForPanel.length;
        console.log('[DEBUG] numItems:', numItems, 'columns:', gridConfig.columns);
        scene.MiniGameManager.buttonGrid = scene.rexUI.add.gridSizer({
            column: gridConfig.columns,
            
            row: Math.max(1, Math.ceil(numItems / columns)),
            
            space: gridConfig.space || {},
            align: 'center',
        });
        scene.MiniGameManager.innerSizer.add(scene.MiniGameManager.buttonGrid, 0, 'center', { expand: true }, true);
        allButtonContainersForPanel.forEach((btnContainer, index) => {
            const rowIndex = Math.floor(index / gridConfig.columns); 
            const columnIndex = index % gridConfig.columns; 
            btnContainer.setVisible(true);
            scene.MiniGameManager.buttonGrid.add(btnContainer, columnIndex, rowIndex, 'center', 0, true);
        });
        scene.MiniGameManager.buttonGrid.layout();
        scene.MiniGameManager.innerSizer.layout();
        if (scene.sidePanel) { scene.sidePanel.layout(); scene.sidePanel.setT(0); }
    }

    displayDressUpButtons(outfitType, scene) {
        if (outfitType === 'Dress') {
            if (scene.selectedCategory.previous) scene.selectedCategory.previous = scene.selectedCategory.current;
            scene.selectedCategory.current = scene.dressButton;
        }
        scene.input.topOnly = false;
        if (outfitType === 'Outer') {
            if (!scene.areOutersLoaded) {
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

            scene.selectedCategory.previous = scene.selectedCategory.current;
            scene.selectedCategory.current = scene.outerButton;
        }



        if (outfitType === 'Lower') {
            if (!scene.areLowersLoaded) {
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

            scene.selectedCategory.previous = scene.selectedCategory.current;
            scene.selectedCategory.current = scene.lowerButton;
        }



        if (outfitType === 'Socks') {
            if (!scene.areSocksLoaded) {
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

            scene.selectedCategory.previous = scene.selectedCategory.current;
            scene.selectedCategory.current = scene.socksButton;
        }

        if (outfitType === 'Shoes') {
            if (!scene.areShoesLoaded) {
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

            scene.selectedCategory.previous = scene.selectedCategory.current;
            scene.selectedCategory.current = scene.shoesButton;
        }

        scene.selectedCategory.current.selectButton();

        console.log(scene.selectedCategory);
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
                const panel = scene.sidePanel;
                if (!scene.animatedCategories.has(outfitType)) panel.setT(1);
                else panel.setT(0);

                if (!panel) return;

                const needsAnimation = panel.isOverflow && !scene.animatedCategories.has(outfitType);

                if (needsAnimation) {
                    panel.setT(1);
                } else {
                    panel.setT(0);
                }

                const categoryPanel = scene.categorySidePanel;
                if (!categoryPanel) return;

                
                if (orientation.isPortrait && categoryPanel.isOverflow) {
                    categoryPanel.setT(1); 
                
                    const needsAnimation = !scene.animatedCategories.has(outfitType);
                    if (needsAnimation) {
                        scene.animatedCategories.add(outfitType);
                        scene.tweens.add({
                            targets: categoryPanel,
                            t: 0, 
                            duration: 500,
                            ease: 'Cubic.easeInOut',
                            delay: 300
                        });
                    }
                }

                const newButtons = scene.MiniGameManager.buttonGrid.getAllChildren();
                newButtons.forEach(btn => btn.setAlpha(0));

                // 6. Tween the panel (now with new items) back into view
                scene.tweens.add({
                    targets: newButtons,
                    alpha: 1,
                    duration: 200,
                    ease: 'Sine.easeInOut',
                    onComplete: () => {
                        if (panel.isOverflow && !scene.animatedCategories.has(outfitType)) {
                            console.log(`[AutoScroll] Triggering for new category: ${outfitType}`);


                            scene.animatedCategories.add(outfitType);


                            scene.tweens.add({
                                targets: panel,
                                t: 0,
                                duration: 400,
                                ease: 'Cubic.easeInOut',
                                delay: 300
                            });
                        }
                        if (scene.miniGameButton) scene.miniGameButton.setInteractive();
                        if (scene.MiniGameManager.backButton) scene.MiniGameManager.backButton.setInteractive();
                    }
                });
            }
        });
    }
}