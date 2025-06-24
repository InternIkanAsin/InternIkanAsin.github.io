//General Button Class
import { MakeUpButton, ItemPanelButton } from '../UI/UIButton.js'

import { InteractiveMakeupSystem } from '../Minigame/InteractiveMakeupSystem.js';
// MakeUp Data
import { makeUpData, MakeUpPositions } from '../Makeup Data/MakeUpData.js'

import UIButton, { OutfitButton, GeneralButton } from '../UI/UIButton.js'
export class MakeUpManager {
    constructor(scene, AudioManager) {
        this.scene = scene;
        this.AudioManager = AudioManager;
    }


    /**
    * @method setupCostumeButtons - Initializes an array and creates costumedata SOs and stores it in the array created based on its type
    */
    setupMakeUpButtons(scene) {
        this.scene.makeUpButtons = {};
        makeUpData.forEach(makeupItem => {
            const { name, makeUpType, textureAnime, textureButton, textureIcon } = makeupItem;
            if (textureButton && textureIcon) {
                const button = new MakeUpButton(scene, name, makeUpType, -100, -100, textureAnime, textureButton, textureIcon, scene.AudioManager, 'highlightTexture'); // Added highlightTextureKey
                button.setSize(150, 200);
                button.setData('instance', button);
                if (!scene.makeUpButtons[makeUpType]) {
                    scene.makeUpButtons[makeUpType] = [];
                }
                scene.makeUpButtons[makeUpType].push(button);
            }
        });
    }

    /**
    * @method updateMakeUpButtons - Updates makeup buttons of make up Panel
    */
    updateMakeUpButtons(makeUpType) {
        const scene = this.scene;
        const itemButtonsForType = scene.makeUpButtons[makeUpType] || [];
        let allButtonContainersForPanel = [];

        if (this.currentLepasButton && this.currentLepasButton.destroy) {
            this.currentLepasButton.destroy();
            this.currentLepasButton = null;
        }

        // --- Create and Add "Lepas" Button ---
        const lepasButton = new ItemPanelButton(
            scene,
            scene.AudioManager,
            0, 0,                         // Position will be set by grid sizer
            'buttonIcon2',                    // Background texture (same as MakeUpButton)
            'xMark',                      // Icon texture key for the 'X'
            -15,                          // Icon Y offset (matches MakeUpButton iconImage.y)
            'Remove',                     // Text ("Lepas" or "Remove")
            '30px',                       // Text size (matches MakeUpButton textLbl)
            () => { // Callback for "Lepas"
                console.log(`[LepasButton] Clicked for MakeUp Type: ${makeUpType}`);
                if (scene.interactiveMakeupSystem?.isActive && scene.interactiveMakeupSystem.activeMakeupType === makeUpType) {
                    scene.interactiveMakeupSystem.stopColoringSession(makeUpType, true);
                }
                const currentEntry = MakeUpButton.selectedMakeUp[makeUpType];
                const currentEquipped = currentEntry?.current;
                let helperButton = itemButtonsForType[0];
                if (!helperButton && scene.makeUpButtons && Object.values(scene.makeUpButtons).flat().length > 0) {
                    helperButton = Object.values(scene.makeUpButtons).flat()[0];
                }

                if (helperButton && helperButton instanceof MakeUpButton) {
                    // Destroy displayed makeup if it's an additive type
                    if (currentEquipped && currentEquipped.displayedMakeUp) {
                        const typeOfEquipped = currentEquipped.makeupType || makeUpType;
                        if (!['Lips', 'Eyebrows', 'Eyelashes', 'Pupil', 'Hair'].includes(typeOfEquipped)) {
                            if (typeof currentEquipped.displayedMakeUp.destroy === 'function') {
                                currentEquipped.displayedMakeUp.destroy();
                            }
                        }
                        if (currentEquipped instanceof MakeUpButton) {
                            currentEquipped.displayedMakeUp = null;
                        }
                    }
                    helperButton._equipDefaultMakeUp(makeUpType, currentEquipped || null);
                } else {
                    console.error(`[LepasButton] Could not find a MakeUpButton instance for unequip: ${makeUpType}`);
                }
                MakeUpButton.clearMakeupHighlightsForType(scene, makeUpType);

            }

        );

        lepasButton.setSize(150, 200);
        allButtonContainersForPanel.push(lepasButton.container ? lepasButton.container : lepasButton);

        if (scene.sidePanelHeaderText) {
            scene.tweens.add({
                targets: scene.sidePanelHeaderText,
                alpha: 0,
                duration: 200,
                ease: 'Sine.easeInOut',
                onComplete: () => {
                    scene.sidePanelHeaderText.setText(makeUpType.toString());
                    scene.tweens.add({
                        targets: scene.sidePanelHeaderText,
                        alpha: 1,
                        duration: 200,
                        ease: 'Sine.easeInOut'
                    })
                }
            });
        }
        // Add the actual makeup item buttons (their containers)

        itemButtonsForType.forEach(buttonInstance => {
            buttonInstance.setVisible(true);
            allButtonContainersForPanel.push(buttonInstance);
        });

        if (scene.MiniGameManager.buttonGrid) {
            const children = scene.MiniGameManager.buttonGrid.getAllChildren();

            children.forEach(childGameObject => {
                // Kita periksa apakah child ini adalah instance OutfitButton yang persisten.
                // Kita bisa menggunakan data yang kita set saat pembuatan tombol.
                const instance = childGameObject.getData ? childGameObject.getData('instance') : null;

                if (instance instanceof MakeUpButton) {
                    // Jika ini adalah OutfitButton, kita hapus dari grid TANPA menghancurkannya.
                    // Ini "menyelamatkan" tombol agar bisa dipakai lagi.
                    scene.MiniGameManager.buttonGrid.remove(childGameObject, false); // false = jangan hancurkan
                }
                // Jika bukan (misalnya, ini adalah tombol "Lepas"), kita tidak melakukan apa-apa.
                // Tombol "Lepas" akan hancur bersama dengan grid di bawah ini.
            });

            // Setelah tombol-tombol persisten diselamatkan, baru kita hancurkan grid-nya.
            // Ini juga akan menghancurkan anak-anak yang tersisa (yaitu tombol "Lepas" yang lama).
            scene.MiniGameManager.buttonGrid.destroy();
            scene.MiniGameManager.buttonGrid = null;
        }

        // Setelah pembersihan selesai, baru kita update buttonList dengan yang baru.
        scene.MiniGameManager.buttonList = allButtonContainersForPanel;

        if (scene.MiniGameManager.innerSizer) {
            scene.MiniGameManager.innerSizer.clear(true);
        }

        scene.MiniGameManager.buttonGrid = scene.rexUI.add.gridSizer({
            column: 1,
            row: scene.MiniGameManager.buttonList.length || 1,
            space: { column: 0, row: 20 },
            align: 'center',
        });

        scene.MiniGameManager.innerSizer.add(scene.MiniGameManager.buttonGrid, 0, 'center', { expand: true }, true);

        scene.MiniGameManager.buttonList.forEach((btnContainer, index) => {
            btnContainer.setVisible(true);
            scene.MiniGameManager.buttonGrid.add(btnContainer, 0, index, 'center', 0, false);
        });

        scene.MiniGameManager.buttonGrid.layout();
        scene.MiniGameManager.innerSizer.layout();
        if (scene.sidePanel) {
            scene.sidePanel.layout();
            scene.sidePanel.setT(0);
        }
    }

    displayMakeUpButtons(makeUpType, scene) {
        if (scene.miniGameButton) { // The main mode toggle button
            scene.miniGameButton.disableInteractive();
        }

        if (scene.interactiveMakeupSystem?.isActive) {
            scene.interactiveMakeupSystem.stopColoringSession(true); // force discard
        }
        if (scene.MiniGameManager && scene.MiniGameManager.backButton) {
            scene.MiniGameManager.backButton.disableInteractive();
        } else {
            console.error("scene.MiniGameManager.backButton not found in displayMakeUpButtons!");
            // return; // Optionally stop if button is critical
        }
        if (scene.sidePanelHeaderText) {
            scene.tweens.add({
                targets: scene.sidePanelHeaderText,
                alpha: 0,
                duration: 200,
                ease: 'Sine.easeInOut',
                onComplete: () => {
                    scene.sidePanelHeaderText.setText(makeUpType.toString());
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

                // Update makeup buttons
                scene.MakeUpManager.updateMakeUpButtons(makeUpType);

                // ... (iconKey and text setting logic - this is fine) ...
                let iconKey = 'blushIcon';

                switch (makeUpType) {
                    case 'Lips': iconKey = 'lipstickIcon'; break;
                    case 'Eyebrows': iconKey = 'eyebrowsIcon'; break;
                    case 'Eyelashes': iconKey = 'eyelashesIcon'; break;
                    case 'Eyeliner': iconKey = 'eyelinerIcon'; break;
                    case 'Eyeshadow': iconKey = 'eyeshadowIcon'; break;
                    case 'Pupil': iconKey = 'eyeColorIcon'; break;
                    case 'Blush': iconKey = 'blushIcon'; break;
                    case 'Hair': iconKey = 'hairIcon'; break;
                    case 'Sticker': iconKey = 'stickerIcon'; break; // Assuming you have 'stickerIcon' for the header
                    default:
                        console.warn(`No specific header icon found for makeUpType: ${makeUpType}. Using default '${iconKey}'.`);
                        break;
                }
                if (scene.selectedButtonIcon) scene.selectedButtonIcon.setTexture(iconKey);
                if (scene.selectedButtonText) scene.selectedButtonText.setText(makeUpType.toString());

                if (scene.MiniGameManager) { // Check existence
                    scene.MiniGameManager.updatePanelLayout(30, 100, 30);
                }
                const newButtons = scene.MiniGameManager.buttonGrid.getAllChildren();
                newButtons.forEach(btn => btn.setAlpha(0));
                scene.tweens.add({
                    targets: newButtons,
                    alpha: 1,
                    duration: 200,
                    ease: 'Sine.easeInOut',
                    onComplete: () => {

                        // If no header, still make button interactive after panel is in
                        if (scene.MiniGameManager && scene.MiniGameManager.backButton) {
                            scene.MiniGameManager.backButton.setInteractive();
                        }

                        if (scene.miniGameButton) {
                            scene.miniGameButton.setInteractive();
                        }

                    }
                });
            }
        });
    }

    /**
  * @method setMakeUpButtons - Creates Makeup panel to hold Makeup buttons
  */
    setMakeUpButtons(makeUpType, scene) {
        this.scene.currentMakeUpType = makeUpType;
        this.scene.input.topOnly = false;


        this.buttons = this.scene.makeUpButtons[makeUpType];

        this.buttonList = this.buttons;
        this.buttonGrid = this.scene.rexUI.add.gridSizer({
            column: this.buttonList.length,
            row: 1,
            space: { column: 100, row: -100 },
        });

        // Add buttons to the grid
        this.buttonList.forEach((btnContainer, index) => {
            this.buttonGrid.add(btnContainer, index, 0, 'center', 0, false);
        });

        const panelBackground = this.scene.add.nineslice(0, 0, 'categoryButtonsPanel', '', 1000, 400, 3, 3, 2, 2);
        panelBackground.setDepth(7);

        // Create the scrollable panel
        this.scene.makeUpButtonsTypePanel = this.scene.rexUI.add.scrollablePanel({
            x: 360,
            y: 1010,
            width: 720,
            height: 250,
            scrollMode: 0,

            scrollDetectionMode: 1,            // drag dideteksi berdasarkan mask area&#8203;:contentReference[oaicite:0]{index=0}
            scroller: {
                pointerOutRelease: false,      // jangan lepaskan kontrol saat pointer keluar area panel&#8203;:contentReference[oaicite:1]{index=1}
                rectBoundsInteractive: false
            },

            background: panelBackground,

            panel: {
                child: this.buttonGrid,
                mask: {
                    padding: 2
                }
            },

            mouseWheelScroller: {
                focus: false,
                speed: 0.1
            },

            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
                panel: 10
            }
        }).layout().setAlpha(0.9);

        this.scene.makeUpButtonsTypePanel
            .setChildrenInteractive({
                targets: this.buttonList,
                targetMode: 'direct'
            })
            .on('child.click', (childContainer) => {
                // childContainer adalah container OutfitButton yang diklik
                // panggil callback toggleOutfit di sini, misal:
                const btn = childContainer.getData('instance');
            });


        Object.values(this.scene.makeUpButtons).flat().forEach(button => {
            this.scene.sys.displayList.bringToTop(button);
        });

        const maskGraphics = this.scene.add.graphics();
        const panelWidth = 693;

        maskGraphics.fillStyle(0xffffff);
        maskGraphics.fillRect(12, 0, panelWidth, 10000);
        maskGraphics.setVisible(false);

        const mask = maskGraphics.createGeometryMask();

        Object.values(this.scene.makeUpButtons).flat().forEach(button => {
            button.setMask(mask);
        });

        this.scene.makeUpPanelMaskGraphics = maskGraphics;
        this.scene.makeUpButtonsTypePanel.layout();
    }

    /**
     * @method removeAllMakeup
     * Unequips all currently applied custom makeup.
     * If a makeup type has a default skin, it reverts to that skin.
     * Otherwise, the makeup for that type is cleared.
     */
    removeAllMakeup() {
        if (this.scene.interactiveMakeupSystem?.isActive) {
            this.scene.interactiveMakeupSystem.stopColoringSession(true); // force discard
        }
        // console.log("Attempting to remove all makeup...");
        const scene = this.scene;

        // Iterate over a copy of the keys to avoid issues if the underlying selectedMakeUp object is modified during iteration (though less likely here)
        const makeupTypesCurrentlySelected = Object.keys(MakeUpButton.selectedMakeUp);

        for (const makeupType of makeupTypesCurrentlySelected) {
            const entry = MakeUpButton.selectedMakeUp[makeupType];
            const currentEquippedItemInfo = entry?.current;

            if (currentEquippedItemInfo) { // If something is equipped for this type
                // console.log(`Processing 'Remove All' for type: ${makeupType}, current: ${currentEquippedItemInfo.name}`);

                // We need to call _equipDefaultMakeUp.
                // This method is on the MakeUpButton prototype and expects a 'this' context of a MakeUpButton.

                let buttonInstanceToCallHelper;

                if (currentEquippedItemInfo instanceof MakeUpButton) {
                    // If the current item is a MakeUpButton instance itself, we can use it.
                    // This means a custom, non-default item is selected.
                    buttonInstanceToCallHelper = currentEquippedItemInfo;

                    // Since we are removing this custom item, its own displayedMakeUp (if additive) needs to be destroyed.
                    // The _equipDefaultMakeUp method called below will handle setting the new default.
                    if (buttonInstanceToCallHelper.displayedMakeUp) {
                        if (makeupType !== 'Lips' && makeupType !== 'Eyebrows' && makeupType !== 'Eyelashes' && makeupType !== 'Pupil' && makeupType !== 'Hair' && makeupType !== 'Sticker') {
                            if (typeof buttonInstanceToCallHelper.displayedMakeUp.destroy === 'function') {
                                // console.log(`Destroying displayedMakeUp of button ${buttonInstanceToCallHelper.name} for ${makeupType}`);
                                buttonInstanceToCallHelper.displayedMakeUp.destroy();
                            }
                        }
                        buttonInstanceToCallHelper.displayedMakeUp = null; // Nullify on the button instance
                    }
                } else if (currentEquippedItemInfo.isDefault) {
                    // A default is already active. For "Remove All", we typically don't need to do anything further
                    // unless we want to explicitly "refresh" the default display.
                    // console.log(`${makeupType} is already showing its default. Skipping explicit action for Remove All.`);
                    continue; // Skip to the next makeup type
                } else {
                    // This case should ideally not happen if currentEquippedItemInfo is always either a MakeUpButton or a default info object.
                    // If it does, we need a fallback to find *any* MakeUpButton instance to make the call.
                    console.warn(`currentEquippedItemInfo for ${makeupType} is neither MakeUpButton nor default. Finding fallback button.`);
                    const allMakeUpButtonsFlat = Object.values(scene.makeUpButtons || {}).flat();
                    if (allMakeUpButtonsFlat.length > 0) {
                        buttonInstanceToCallHelper = allMakeUpButtonsFlat[0]; // Use the first available button
                    } else {
                        console.error(`Cannot 'Remove All' for ${makeupType}: No MakeUpButton instances available to call helper method.`);
                        continue; // Skip this type
                    }
                }

                // If we decided we need to act (i.e., it wasn't already default or we found a button)
                if (buttonInstanceToCallHelper) {
                    // Call the instance method _equipDefaultMakeUp on the determined button instance.
                    // It will handle setting the correct default texture and updating MakeUpButton.selectedMakeUp.
                    buttonInstanceToCallHelper._equipDefaultMakeUp(makeupType, currentEquippedItemInfo);
                }
            }
        }

        this.AudioManager.playSFX('buttonClick'); // Or a more specific "removeAll" sound
        // console.log("Finished 'Remove All'. Final state:", JSON.stringify(MakeUpButton.selectedMakeUp, (key, value) => (key === 'displayedMakeUp' && value) ? '[PhaserGameObject]' : value, 2));
    }

}