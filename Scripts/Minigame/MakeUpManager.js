//General Button Class
import { GeneralButton, MakeUpButton } from '../UI/UIButton.js'

// MakeUp Data
import { makeUpData, MakeUpPositions } from '../Makeup Data/MakeUpData.js'
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
                // Use the constructor signature from the "after" MakeUpButton
                const button = new MakeUpButton(scene, name, makeUpType, -100, -100, textureAnime, textureButton, textureIcon, scene.AudioManager);

                button.container.setSize(150, 200); // As per "after" version
                button.container.setData('instance', button);

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

        // Get new buttons
        this.buttons = this.scene.makeUpButtons[makeUpType];
        this.scene.MiniGameManager.buttonList = this.buttons.map(b => b.container);

        // Clear existing children from the grid
        this.scene.MiniGameManager.buttonGrid.clear();
        this.scene.MiniGameManager.innerSizer.clear();

        //Create a grid sized display for the buttons
        this.scene.MiniGameManager.buttonGrid = this.scene.rexUI.add.gridSizer({
            row: this.scene.MiniGameManager.buttonList.length,
            column: 1,
            rowProportions: 1, // make columns flexible
            space: { column: 0, row: 20 },
            align: 'center',
        });

        this.scene.MiniGameManager.innerSizer.add(this.scene.MiniGameManager.buttonGrid, 0, 'center', {}, true);
        // Add new buttons to the grid
        this.scene.MiniGameManager.buttonList.forEach((btn, index) => {
            btn.setVisible(true);
            this.scene.MiniGameManager.buttonGrid.add(btn, index, 0, 'center', 0, false);
        });

        // Relayout the panel to apply the new buttons
        this.scene.sidePanel.layout();
    }

    displayMakeUpButtons(makeUpType, scene) {
        scene.backButton.disableInteractive();

        scene.tweens.add({
            targets: [scene.sidePanel],
            x: this.scene.scale.width + 300,
            duration: 500,
            ease: 'Sine.easeInOut',
            onComplete: () => {

                //Bring out back button
                scene.tweens.add({
                    targets: [scene.backButton],
                    x: this.scene.scale.width / 2 * 1.73,
                    duration: 500,
                    ease: 'Sine.easeInOut'
                })

                //Update makeup buttons to replace current buttons with panel
                scene.MakeUpManager.updateMakeUpButtons(makeUpType);

                scene.selectedButtonText.setText(makeUpType.toString());

                let iconKey = 'blushIcon'; //default
                switch (makeUpType) {
                    case 'Lips': iconKey = 'lipstickIcon'; break;
                    case 'Eyebrows': iconKey = 'eyebrowsIcon'; break;
                    case 'Eyelashes': iconKey = 'eyelashesIcon'; break;
                    case 'Eyeliner': iconKey = 'eyelinerIcon'; break;
                    case 'Pupil': iconKey = 'eyeColorIcon'; break;
                    case 'Blush': iconKey = 'blushIcon'; break;
                    case 'Hair': iconKey = 'hairIcon'; break;
                    case 'Eyeshadow': iconKey = 'eyeshadowIcon'; break;
                  
                    default:
                        console.warn(`No specific header icon found for makeUpType: ${makeUpType}. Using default.`);
                        break;
                }
                scene.selectedButtonIcon.setTexture(iconKey);

                this.scene.MiniGameManager.updatePanelLayout(30, 100, 30)

                scene.tweens.add({
                    targets: [scene.sidePanel],
                    x: this.scene.scale.width / 2 * 1.8,
                    duration: 500,
                    ease: 'Sine.easeInOut',
                    onComplete: () => {
                        scene.tweens.add({
                            targets: [scene.selectedButtonHeader],
                            alpha: 1,
                            duration: 500,
                            ease: 'Sine.easeInOut',
                            onComplete: () => {
                            scene.backButton.setInteractive(); 
                        }
                        })
                    }
                })
            }
        })


    }

    /**
  * @method setMakeUpButtons - Creates Makeup panel to hold Makeup buttons
  */
    setMakeUpButtons(makeUpType, scene) {
        this.scene.currentMakeUpType = makeUpType;
        this.scene.input.topOnly = false;


        this.buttons = this.scene.makeUpButtons[makeUpType];

        this.buttonList = this.buttons.map(b => b.container);
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
            scrollMode: 1,

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
            this.scene.sys.displayList.bringToTop(button.container);
        });

        const maskGraphics = this.scene.add.graphics();
        const panelWidth = 693;

        maskGraphics.fillStyle(0xffffff);
        maskGraphics.fillRect(12, 0, panelWidth, 10000);
        maskGraphics.setVisible(false);

        const mask = maskGraphics.createGeometryMask();

        Object.values(this.scene.makeUpButtons).flat().forEach(button => {
            button.container.setMask(mask);
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
                        if (makeupType !== 'Lips' && makeupType !== 'Eyebrows' && makeupType !== 'Eyelashes' && makeupType !== 'Pupil') {
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