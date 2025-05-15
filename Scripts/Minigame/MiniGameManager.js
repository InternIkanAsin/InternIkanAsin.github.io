//UI Button Class
import UIButton, { CategoryButton, MakeUpButton } from '../UI/UIButton.js'

//MakeUp and DressUp Category Buttons
import { createMakeUpCategoryButtons, createDressUpCategoryButtons } from './MiniGameCategoryButtons.js'
//Game State Class
import { GameState } from '../Main.js';


export class MiniGameManager {
    constructor(scene, AudioManager) {
        this.scene = scene;
        this.AudioManager = AudioManager;
    }

    //Set up the Game UI
    setUpGame(scene) {
        scene.miniGameButton = new UIButton(scene, this.AudioManager, 60, 350, 'selectionBox', 75, 75, 'dressIcon', -17, 3.6, () => { scene.TweeningUtils.transitionMiniGame(); }, 'Dress Up');

        scene.removeAllMakeupButton = new UIButton(
            scene,
            this.AudioManager,
            60, 550, 'selectionBox', 75, 75,
            'dressIcon',
            -17, 3.6,
            () => {
                if (scene.MakeUpManager && scene.state === GameState.MAKEUP) {
                    scene.MakeUpManager.removeAllMakeup();
                } else if (scene.state !== GameState.MAKEUP) {

                } else {
                    console.error("MakeUpManager not found on scene for Remove All.");
                }
            },
            'Remove All'
        );

        scene.tipsButton = new UIButton(scene, this.AudioManager, 60, 750, 'selectionBox', 75, 75, 'tipsButton', -17, 2.5, () => { /* Tips */ }, 'Tips');

        scene.statTracker.setupStatPanel(scene);
        this.setUpSidePanel(scene);
    }


    //Sets up the side panel displayed on the right side
    setUpSidePanel(scene) {
        const centerX = scene.scale.width / 2;
        const centerY = scene.scale.height / 2;

        //Create back button for panel
        scene.backButton = new UIButton(scene, this.AudioManager, centerX * 2.3, centerY / 8, 'selectionBox', 60, 60, 'backButton', -7, 3.5, () => {
            this.goBackMainPanel(scene);
        }).container.setDepth(4);

        //Assign category buttons to buttons variables based on state of minigame (Dressup or Makeup)
        let buttons = (this.scene.state === GameState.MAKEUP) ? createMakeUpCategoryButtons(scene, this.AudioManager) : createDressUpCategoryButtons(scene, this.AudioManager);

        scene.buttons = buttons;
        this.buttonList = buttons.map(btn => btn.container);

        //Create header for selected button
        scene.selectedButtonHeader = this.createSelectedButtonHeader(scene);

        //Create a grid sized display for the buttons
        this.buttonGrid = scene.rexUI.add.gridSizer({
            row: this.buttonList.length,
            column: 1,
            rowProportions: 1, // make columns flexible
            space: { column: 0, row: 125 },
            align: 'center',
        });

        // Add buttons to the grid
        this.buttonList.forEach((btnContainer, index) => {
            this.buttonGrid.add(btnContainer, 0, index, '', 30, false);
        });

        // Set up side panel
        const sidePanel = this.scene.add.nineslice(0, 0, 'sidePanel', '', 80, 250, 14, 14, 17, 10).setDepth(10).setScale(4);

        this.innerSizer = scene.rexUI.add.sizer({
            orientation: 1, // vertical
            space: { top: 40, bottom: 100, left: 60 }
        });

        this.innerSizer.add(this.buttonGrid, 0, 'center', {}, true);

        // Create the scrollable panel to display the buttons
        this.scene.sidePanel = this.scene.rexUI.add.scrollablePanel({
            x: centerX * 1.8,
            y: centerY,
            width: 320,
            height: 1000,
            scrollMode: 0,

            scrollDetectionMode: 1,            // drag dideteksi berdasarkan mask area&#8203;:contentReference[oaicite:0]{index=0}
            scroller: {
                pointerOutRelease: false,      // jangan lepaskan kontrol saat pointer keluar area panel&#8203;:contentReference[oaicite:1]{index=1}
                rectBoundsInteractive: false
            },

            background: sidePanel,

            panel: {
                child: this.innerSizer,
                align: 'center',
                expand: true,
                mask: {
                    padding: 2
                }
            },

            slider: {
            },

            mouseWheelScroller: {
                focus: false,
                speed: 0.1
            },

            space: {
                left: 45,
                right: 10,
                top: 80,
                bottom: 30,
                panel: 30
            }
        }).layout();

        this.scene.sidePanel
            .setChildrenInteractive({
                targets: this.buttonList,
                targetMode: 'direct'
            })
            .on('child.click', (childContainer) => {
                // childContainer adalah container OutfitButton yang diklik
                // panggil callback toggleOutfit di sini, misal:
                const btn = childContainer.getData('instance');
                btn.toggleOutfit(btn.outfitX, btn.outfitY, btn.outfitType);
                this.scene.AudioManager.playSFX('buttonClick');
            });

        Object.values(buttons).flat().forEach(button => {
            this.scene.sys.displayList.bringToTop(button.container);
        });

        const maskGraphics = this.scene.add.graphics();
        const panelWidth = 693;

        maskGraphics.fillStyle(0xffffff);
        maskGraphics.fillRect(12, 0, panelWidth, 10000);
        maskGraphics.setVisible(false);

        const mask = maskGraphics.createGeometryMask();

        Object.values(buttons).flat().forEach(button => {
            button.container.setMask(mask);
        });

        this.scene.sidePanelMaskGraphics = maskGraphics;
        this.scene.sidePanel.layout();
    }

    createSelectedButtonHeader(scene) {
        const centerX = scene.scale.width / 2;
        const centerY = scene.scale.height / 2;

        //Icon of selected button
        scene.selectedButtonIcon = this.scene.add.image(centerX * 1.55, centerY / 3.45, 'blushIcon').setScale(1.4).setDepth(12).setOrigin(0.5);

        //Name of selected button
        scene.selectedButtonText = scene.add.text(centerX * 1.75, centerY / 3.4, 'Blush', {
            fontSize: '24px',
            fontFamily: 'pixelFont',
            color: '#000000'
        }).setOrigin(0.5).setDepth(12);

        //Add padding to dynamically control size of button
        const padding = 70;
        const buttonWidth = (scene.selectedButtonText.width + scene.selectedButtonIcon.width + padding) / 4;

        //Header Panel
        scene.selectedButtonPanel = this.scene.add.nineslice(centerX * 1.70, centerY / 3.45, 'button1', '', buttonWidth, 16, 4, 4, 5, 5).setScale(4.2).setDepth(11);

        //Returns a container that holds all the elements created above
        return scene.selectedButtonContainer = scene.add.container(0, 0, [scene.selectedButtonPanel, scene.selectedButtonIcon, scene.selectedButtonText]).setDepth(13).setAlpha(0);
    }

    updatePanelCategory(scene) {
        scene.tweens.add({
            targets: scene.sidePanel,
            x: this.scene.scale.width * 1.3,
            duration: 500,
            ease: 'Sine.easeInOut',
            onComplete: () => {
                //Switch the category buttons based on the current state of the game
                this.updateCategoryButtons(scene);
                scene.tweens.add({
                    targets: scene.sidePanel,
                    x: this.scene.scale.width / 2 * 1.8,
                    duration: 500,
                    ease: 'Sine.easeInOut'
                });
            }
        });
    }
    updatePanelLayout(left = null, right = null, top = null, bottom = null) {
        // Only update if the value is not null
        if (top !== null) this.innerSizer.space.top = top;
        if (bottom !== null) this.innerSizer.space.bottom = bottom;
        if (left !== null) this.innerSizer.space.left = left;
        if (right !== null) this.innerSizer.space.right = right;


        this.buttonGrid.layout();
        this.innerSizer.layout();
        this.scene.sidePanel.layout();
        this.scene.sidePanel.setT(0);

    }

    updateCategoryButtons(scene) {
        scene.buttons = (this.scene.state === GameState.MAKEUP) ? createMakeUpCategoryButtons(scene, this.AudioManager) : createDressUpCategoryButtons(scene, this.AudioManager);
        this.buttonList = scene.buttons.map(btn => btn.container);

        // Clear existing children from the grid
        this.buttonGrid.clear();
        this.innerSizer.clear();

        //Create a grid sized display for the buttons
        this.scene.MiniGameManager.buttonGrid = this.scene.rexUI.add.gridSizer({
            row: this.scene.MiniGameManager.buttonList.length,
            column: 1,
            rowProportions: 1, // make columns flexible
            space: { column: 0, row: 200 },
            align: 'center',
        });

        // Add new buttons to the grid
        this.scene.MiniGameManager.buttonList.forEach((btn, index) => {
            btn.setVisible(true);
            this.scene.MiniGameManager.buttonGrid.add(btn, index, 0, 'center', 0, false);
        });

        this.scene.MiniGameManager.innerSizer.add(this.scene.MiniGameManager.buttonGrid, 0, 'center', {}, true);

        this.updatePanelLayout(90, 70, 80);

        this.scene.sidePanel.layout();
        this.scene.sidePanel.setT(0);
    }

    goBackMainPanel(scene) {
         scene.tweens.killTweensOf(scene.selectedButtonHeader); 
        scene.selectedButtonHeader.setAlpha(0); 
        scene.backButton.disableInteractive(); 
        scene.tweens.killTweensOf(scene.selectedButtonHeader);
        scene.selectedButtonHeader.setAlpha(0);

        scene.tweens.add({
            targets: scene.selectedButtonHeader,
            alpha: 0,
            duration: 250,
            ease: 'Sine.easeInOut',
            onComplete: () => {
                //Tween side Panel
                scene.tweens.add({
                    targets: scene.sidePanel,
                    x: this.scene.scale.width * 1.3,
                    duration: 500,
                    ease: 'Sine.easeInOut',
                    onComplete: () => {
                        this.buttons = scene.buttons;
                        this.scene.MiniGameManager.buttonList = [];
                        this.scene.MiniGameManager.buttonList = this.buttons.map(b => b.container);
                        console.log(this.scene.MiniGameManager.buttonList);

                        // Clear existing children from the grid
                        this.scene.MiniGameManager.buttonGrid.clear();

                        this.scene.MiniGameManager.innerSizer.clear();

                        //Create a grid sized display for the buttons
                        this.scene.MiniGameManager.buttonGrid = this.scene.rexUI.add.gridSizer({
                            row: this.scene.MiniGameManager.buttonList.length,
                            column: 1,
                            rowProportions: 1, // make columns flexible
                            space: { column: 0, row: 200 },
                            align: 'center',
                        });

                        this.scene.MiniGameManager.innerSizer.add(this.scene.MiniGameManager.buttonGrid, 0, 'center', {}, true);

                        // Add new buttons to the grid
                        this.scene.MiniGameManager.buttonList.forEach((btn, index) => {
                            btn.setVisible(true);
                            this.scene.MiniGameManager.buttonGrid.add(btn, index, 0, 'center', 0, false);
                        });

                        this.updatePanelLayout(90, 70, 80);
                        // Relayout the panel to apply the new buttons
                        this.scene.sidePanel.layout();
                        this.scene.sidePanel.setT(0);

                        scene.tweens.add({
                            targets: scene.sidePanel,
                            x: this.scene.scale.width / 2 * 1.8,
                            duration: 500,
                            ease: 'Sine.easeInOut'
                        })
                    }
                })
            }
        })

        //Tween Back Button
        scene.tweens.add({
            targets: scene.backButton,
            x: scene.scale.width / 2 * 2.3,
            duration: 750,
            ease: 'Sine.easeInOut'
        });
    }
}