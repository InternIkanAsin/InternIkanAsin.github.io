// Costume Data Class
import { costumeData } from '../Outfit Data/CostumeData.js'

// UI Buttons Class
import UIButton, { OutfitButton, ItemPanelButton } from '../UI/UIButton.js'
import AssetLoader from '../AssetLoader.js'; 

import { layout } from '../ScreenOrientationUtils.js';

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

        costumeData.forEach(({ name, outfitType, x, y, textureAnime, textureButton, textureIcon, stat }) => {
            const { x: outfitX, y: outfitY } = outfitPositions[outfitType] || { x: 0, y: 0 };
            const button = new OutfitButton(scene, name, outfitType, x, y, outfitX, outfitY, textureAnime, textureButton, { atlas: textureIcon.atlas, frame: textureIcon.frame }, stat, scene.statTracker, scene.AudioManager);

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
            const currentOutfitButton = entry?.current; 

            if (currentOutfitButton && currentOutfitButton instanceof OutfitButton) { 
                
                if (currentOutfitButton.displayedOutfit && typeof currentOutfitButton.displayedOutfit.destroy === 'function') {
                    currentOutfitButton.displayedOutfit.destroy();
                    currentOutfitButton.displayedOutfit = null;
                }

            }
            
            OutfitButton.selectedOutfits[outfitType] = { current: null, previous: currentOutfitButton || entry?.previous || null };
        });

        console.log("[DressUpManager] All outfits removed. Current selection:", scene.OutfitButton.selectedOutfits);
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
            itemButtonsForType = [
                ...(scene.outfitButtons["Dress"] || []),
                ...(scene.outfitButtons["Shirt"] || [])
            ];
        } else {
            itemButtonsForType = scene.outfitButtons[outfitType] || [];
        }

        let allButtonContainersForPanel = [];
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
        
        const lepasOutfitButton = new ItemPanelButton(
            scene,
            scene.AudioManager,
            0, 0,                         
            'buttonIcon2',                
            'xMark',                        
            -15,                          
            'Remove',                     
            '30px',                       
            () => { 
                console.log(`[LepasButton] Clicked for Outfit Type: ${outfitType}`);

                let typeToUnequipActually = outfitType;
                
                if (outfitType === "Shirt" || outfitType === "Dress") {

                    if (OutfitButton.selectedOutfits["Dress"]?.current) {
                        typeToUnequipActually = "Dress"; 
                    } else if (OutfitButton.selectedOutfits["Shirt"]?.current) {
                        typeToUnequipActually = "Shirt";
                    } else {
                       
                        scene.AudioManager?.playSFX?.("buttonClick");
                        return;
                    }
                }

                const currentEntry = OutfitButton.selectedOutfits[typeToUnequipActually];
                const equippedButtonInstance = currentEntry?.current;

                if (equippedButtonInstance && equippedButtonInstance instanceof OutfitButton) {
                    
                    if (equippedButtonInstance.displayedOutfit) {
                        equippedButtonInstance.displayedOutfit.destroy();
                        equippedButtonInstance.displayedOutfit = null;
                    }

                    OutfitButton.selectedOutfits[typeToUnequipActually] = { current: null, previous: equippedButtonInstance };

                    if (equippedButtonInstance.highlightImage) {
                        equippedButtonInstance.highlightImage.setVisible(false);
                    }
                    
                    if (typeToUnequipActually === "Dress") {
                        OutfitButton.clearHighlightsForType(scene, "Shirt");
                        OutfitButton.clearHighlightsForType(scene, "Lower");
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

        itemButtonsForType.forEach(buttonInstance => {
            const type = buttonInstance.outfitType;
            const currentSelectedButton = OutfitButton.selectedOutfits[type]?.current;

            if (currentSelectedButton && currentSelectedButton === buttonInstance) {
                if (buttonInstance.highlightImage) {
                    buttonInstance.highlightImage.setVisible(true);
                }
            } else {
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

        if (!scene.MiniGameManager || !scene.MiniGameManager.backButton) {
            console.error("Critical: MiniGameManager or its backButton not found in displayDressUpButtons!");
            return;
        }

        if (scene.miniGameButton) {
            scene.miniGameButton.disableInteractive();
        }
        
        if (scene.MiniGameManager && scene.MiniGameManager.backButton) {
            scene.MiniGameManager.backButton.disableInteractive();
        }

        let headerText = outfitType;
        if (outfitType === 'Shirt') {
            headerText = 'Dress'; 
        } else if (outfitType === 'Underwear') {
             headerText = 'Lower'; 
        }

        if (scene.sidePanelHeaderText) {
            scene.tweens.add({
                targets: scene.sidePanelHeaderText,
                alpha: 0,
                duration: 200,
                ease: 'Sine.easeInOut',
                onComplete: () => {
                    scene.sidePanelHeaderText.setText(headerText); 
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

                this.updateDressUpButtons(outfitType);

                const newButtons = scene.MiniGameManager.buttonGrid.getAllChildren();
                newButtons.forEach(btn => btn.setAlpha(0));

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

                if (scene.MiniGameManager.updatePanelLayout) {
                    scene.MiniGameManager.updatePanelLayout(30, 100, 30);
                }

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