//UI Button Class
import UIButton, { OutfitButton, GeneralButton } from '../UI/UIButton.js'

//MakeUp and DressUp Category Buttons
import { createMakeUpCategoryButtons, createDressUpCategoryButtons } from './MiniGameCategoryButtons.js'

//Costume Data Class
import { costumeData } from '../Outfit Data/CostumeData.js'

//Game State Class
import { GameState } from '../Main.js';

//Bachelor outfit preferences / traits 
import { traitsMap } from '../Outfit Data/CostumeTraits.js'
export class MiniGameManager {
    constructor(scene, AudioManager) {
        this.scene = scene;
        this.AudioManager = AudioManager;
    }

    //Set up the Game UI
    setUpGame(scene) {
        this.minigameButtons = [];
        scene.miniGameButton = new UIButton(scene, this.AudioManager, 60, 300, 'selectionBox', 75, 75, 'dressIcon', -17, 3.6, () => { scene.TweeningUtils.transitionMiniGame(); }, 'Dress Up', 23, 45);

        scene.removeAllButton = new UIButton(
            scene,
            this.AudioManager,
            60, 500, 'selectionBox', 75, 75,
            'dressIcon',
            -17, 3.6,
            () => {
                if (scene.state === GameState.MAKEUP) {
                    if (scene.MakeUpManager) {
                        scene.MakeUpManager.removeAllMakeup();
                    } else {
                        console.error("MakeUpManager not found on scene.");
                    }
                } else if (scene.state === GameState.DRESSUP) {
                    if (scene.DressUpManager) {
                        scene.DressUpManager.removeAllOutfits();
                    } else {
                        console.error("DressUpManager not found on scene.");
                    }
                }
                scene.AudioManager?.playSFX?.("buttonClick");
            },
            'Remove All',
            '23px',
            45
        );

        //Set up the tips button and stats
        scene.tipsButton = new UIButton(scene, this.AudioManager, 60, 700, 'selectionBox', 75, 75, 'tipsButton', -17, 2.5, () => { this.showTipsPanel(); }, 'Tips', 23, 45);

        scene.finishButton = new UIButton(scene, this.AudioManager, this.scene.scale.width / 2, this.scene.scale.height - 100, 'continueButton', 125, 40, 'finishChecklist', 0, 1.5, () => { this.showConfirmationPanel(); }, 'Finish', 40, 0, 80, -40);

        this.setupOutfitTipsDisplay();
        scene.statTracker.setupStatPanel(scene);
        this.setUpSidePanel(scene);

        // Craete a dark overlay if needed
        this.scene.darkOverlay = this.scene.add.rectangle(
            this.scene.cameras.main.centerX,
            this.scene.cameras.main.centerY,
            this.scene.cameras.main.width,
            this.scene.cameras.main.height,
            0x000000,
            0.5
        ).setDepth(100).setVisible(false);

    }

    panelInvis() {
        this.scene.sidePanel.setVisible(!this.scene.sidePanel.visible);
    }
    showConfirmationPanel() {
        this.confirmationPanel = this.createConfirmationPanel();

        this.scene.tweens.add({
            targets: this.confirmationPanel,
            scale: 1,
            duration: 100,
            ease: 'Sine.easeInOut'
        })
    }

    closeConfirmationPanel() {
        this.scene.darkOverlay.setVisible(false);
        this.enableInteraction([this.scene.miniGameButton, this.scene.removeAllButton, this.scene.tipsButton, this.scene.finishButton]);
        this.scene.tweens.add({
            targets: this.confirmationPanel,
            scale: 0,
            duration: 100,
            ease: 'Sine.easeInOut',
            onComplete: () => {
                this.confirmationPanel.destroy();
            }
        })
    }
    createConfirmationPanel() {
        if (this.canContinueToScene2()) {
            this.scene.darkOverlay.setVisible(true);
            this.disableInteraction([this.scene.miniGameButton, this.scene.removeAllButton, this.scene.tipsButton, this.scene.finishButton]);
            const confirmationPanel = this.scene.add.nineslice(
                0,
                0,
                'tipsPanel',
                '',
                230,
                130,
                12,
                12,
                12,
                9
            ).setDepth(101).setScale(3); //3

            const notificationText = this.scene.add.text(
                0,
                -20,
                'Are you sure about the outfit you chose?',
                {
                    fontSize: '32px',
                    fontFamily: 'pixelFont',
                    color: '#000000',
                    align: 'center'
                }
            ).setOrigin(0.5).setDepth(102);

            const yesButton = new GeneralButton(this.scene, 120, 80, 'emptyButton2', null, 'YES', () => { this.transitionToCutscene(); }, this.scene.AudioManager).setDepth(102);
            const noButton = new GeneralButton(this.scene, -120, 80, 'emptyButton2', null, 'NO', () => { this.closeConfirmationPanel() }, this.scene.AudioManager).setDepth(102);
            const closeButton = new UIButton(this.scene, this.AudioManager, 310, -170, 'redButton', 40, 40, 'xMarkWhite', 0, 1.5, () => { this.closeConfirmationPanel() }).setDepth(102);
            return this.scene.confirmationPanelContainer = this.scene.add.container(this.scene.scale.width / 2, this.scene.scale.height / 2, [confirmationPanel, notificationText, yesButton, noButton, closeButton]).setDepth(102).setScale(0);

        } else {
            this.scene.darkOverlay.setVisible(true);
            this.disableInteraction([this.scene.miniGameButton, this.scene.removeAllButton, this.scene.tipsButton, this.scene.finishButton]);
            const outfitIncompletePanel = this.scene.add.nineslice(
                0,
                0,
                'tipsPanel',
                '',
                230,
                100,
                12,
                12,
                12,
                9
            ).setDepth(101).setScale(3);

            const notificationText = this.scene.add.text(
                0,
                -20,
                'Your outfit is not complete!',
                {
                    fontSize: '40px',
                    fontFamily: 'pixelFont',
                    color: '#000000',
                    align: 'center'
                }
            ).setOrigin(0.5).setDepth(102);

            const finishButton = new GeneralButton(this.scene, 0, 60, 'emptyButton2', null, 'OK', () => { this.closeConfirmationPanel() }, this.scene.AudioManager).setDepth(102);
            const closeButton = new UIButton(this.scene, this.AudioManager, 310, -130, 'redButton', 40, 40, 'xMarkWhite', 0, 1.5, () => { this.closeConfirmationPanel() }).setDepth(102);

            return this.scene.incompleteOutfitPanelContainer = this.scene.add.container(this.scene.scale.width / 2, this.scene.scale.height / 2, [outfitIncompletePanel, notificationText, finishButton, closeButton]).setDepth(102).setScale(0);

        }
    }

    canContinueToScene2() {
        const selected = OutfitButton.selectedOutfits;

        const has = type => !!selected[type]?.current;

        const isSet1 = has("Dress") && has("Shoes");
        const isSet2 = has("Shirt") && has("Underwear") && has("Socks") && has("Shoes");

        return isSet1 || isSet2;
    }

    transitionToCutscene() {
        // 1. Close the confirmation panel first (visually and functionally)
        //    We can do this quickly or let it fade with the scene.
        //    Let's destroy it immediately so it doesn't interfere.
        if (this.confirmationPanel) { // this.confirmationPanel was set in showConfirmationPanel
            this.confirmationPanel.destroy();
            this.confirmationPanel = null;
        }
        // The darkOverlay and input re-enabling will be handled by the scene transition.
        // If darkOverlay was specifically for the panel, hide it:
        if (this.scene.darkOverlay) this.scene.darkOverlay.setVisible(false);


        // 2. Start fading out the main game camera
        this.scene.cameras.main.fadeOut(2000);
        this.scene.AudioManager.fadeOutMusic('minigameMusic', 1500); // Fade out minigame music

        // 3. Once fade out is complete, then clear the minigame scene and start cutscene 2
        this.scene.cameras.main.once('camerafadeoutcomplete', () => {
            console.log("[MiniGameManager] Camera fade out complete for Cutscene 2 transition.");

            // A. Clear all minigame UI and elements
            //    Pass 'this.scene' to ensure UIManager operates on the correct scene instance.
            this.scene.UIManager.clearMinigameScene(this.scene);

            // B. Initialize and show Cutscene 2
            //    Ensure chosenBachelor and chosenBachelorName are correctly set on this.scene
            //    This likely happens during the BachelorSelection phase.
            if (this.scene.cutsceneSystem && this.scene.chosenBachelor && this.scene.chosenBachelorName) {
                console.log(`[MiniGameManager] Initiating Cutscene 2 for ${this.scene.chosenBachelorName}`);
                this.scene.cutsceneSystem.initiateCutscene2(
                    this.scene.chosenBachelor,      // The bachelor GameObject
                    this.scene.chosenBachelorName,  // String name
                    "Theater",                      // datePlace - make this dynamic if needed
                    this.scene.statTracker.getStatPoints()
                );
            } else {
                console.error("[MiniGameManager] Cannot initiate Cutscene 2: cutsceneSystem, chosenBachelor, or chosenBachelorName is missing on the scene.");
            }
        });
    }

    //Sets up the tips panel
    showTipsPanel() {
        this.scene.darkOverlay.setVisible(true);

        //Set them visible if the panel already exists
        if (this.scene.tipsPanel) {
            this.scene.tipsPanel.setVisible(true);
            this.scene.tipsTitleText.setVisible(true);
            this.scene.closeButton.setVisible(true);
            this.scene.darkOverlay.setVisible(true);


            if (this.outfitStatDisplays) {
                this.outfitStatDisplays.forEach(display => display.setVisible(true));
            }

            //Disables interaction with other buttons while the tips panel is open
            this.disableInteraction([this.scene.miniGameButton, this.scene.removeAllButton, this.scene.tipsButton]);
            this.scene.tweens.add({
                targets: this.scene.tipsPanel,
                scale: 1,
                duration: 100,
                ease: 'Sine.easeInOut'
            })
            return;
        }

        //Disables interaction with other buttons while the tips panel is open
        this.disableInteraction([this.scene.miniGameButton, this.scene.removeAllButton, this.scene.tipsButton]);
        this.createTipsPanel(this.scene);

        this.scene.tweens.add({
            targets: this.scene.tipsPanel,
            scale: 1,
            duration: 100,
            ease: 'Sine.easeInOut'
        })
    }

    //Disables interaction with all buttons while tip panel is open
    disableInteraction(buttons) {
        buttons.forEach(button => {
            button.disableInteractive();
        });


        this.inputBlocker = this.scene.add.rectangle(
            this.scene.sidePanel.x,
            this.scene.sidePanel.y,
            this.scene.sidePanel.width,
            this.scene.scale.height,
            0x000000,
            0 // transparent
        ).setOrigin(0.5).setInteractive().setDepth(101); // make sure it's above everything

        this.scene.sidePanel.getElement('scroller').setEnable(false);
    }

    //Enables interaction with all buttons while tip panel is closed
    enableInteraction(buttons) {
        buttons.forEach(button => {
            button.setInteractive();
        });

        this.inputBlocker?.destroy();

        this.scene.sidePanel.getElement('scroller').setEnable(true);
    }
    createTipsPanel(scene) {
        const COLOR_LIGHT = 0x7b5e57;
        const COLOR_DARK = 0x260e04;
        const { width, height } = this.scene.sys.game.config;
        //Create the close button for the tips panel
        this.scene.closeButton = new UIButton(scene, this.AudioManager, width / 1.4, height / 4.7, 'redButton', 40, 40, 'xMarkWhite', 0, 1.5, () => { this.destroyTipsPanel() }).setDepth(102);

        // Create the tips panel
        const tipsPanel = this.scene.add.nineslice(
            0,
            0,
            'tipsPanel',
            '',
            240,
            200,
            12,
            12,
            12,
            9
        ).setDepth(101).setScale(3);

        //Grid sizer for vertical layout group
        this.outfitButtonStatGrid = this.scene.rexUI.add.gridSizer({
            column: 1,
            row: 20,
            space: { column: 50, row: -20 },
        }).setDepth(1000);

        // Bachelor preferences
        let trait1 = traitsMap[this.scene.chosenBachelorName].trait1;
        let trait2 = traitsMap[this.scene.chosenBachelorName].trait2;

        // Tips text title
        this.scene.tipsTitleText = this.scene.add.text(
            this.scene.cameras.main.centerX,
            this.scene.cameras.main.centerY / 2.15,
            'Tips',
            {
                fontSize: '40px',
                fontFamily: 'pixelFont',
                color: '#000000',
                align: 'center'
            }
        ).setOrigin(0.5).setDepth(102);

        // Bachelor Icon
        const bachelorIcon = this.scene.add.image(
            this.scene.cameras.main.centerX,
            this.scene.cameras.main.centerY / 1.4,
            this.scene.chosenBachelorName + 'Icon'
        ).setScale(0.5).setDepth(102);
        this.outfitButtonStatGrid.add(bachelorIcon, 1, 0, 'center', 0, false);


        const dialogueTemplate = '"I want you to wear something that is {trait1} and {trait2}"';

        // Fill in the template
        const formattedDialogue = dialogueTemplate
            .replace('{trait1}', trait1)
            .replace('{trait2}', trait2);

        // Add rich text
        const tipsText = this.scene.add.text(
            this.scene.cameras.main.centerX,
            this.scene.cameras.main.centerY / 1.15,
            formattedDialogue,
            {
                fontSize: '32px',
                fontFamily: 'pixelFont',
                color: '#000000', // This is the default text color
                align: 'center',
                wordWrap: { width: width - 120 }
            }
        ).setOrigin(0.5).setDepth(102);

        this.outfitButtonStatGrid.add(tipsText, 2, 0, 'center', 0, false);
        this.outfitStatsDisplays = [];

        //Outfit Label 1
        this.createOutfitLabel('dressIcon', 'Dress', 3);

        this.outfitStatsDisplays.push(this.createOutfitStatsDisplay('Dress', 4));

        //Outfit Label 2
        this.createOutfitLabel('dressIcon', 'Shirt', 5);

        this.outfitStatsDisplays.push(this.createOutfitStatsDisplay('Shirt', 6));

        //Outfit Label 3
        this.createOutfitLabel('outerIcon', 'Outer', 7);

        this.outfitStatsDisplays.push(this.createOutfitStatsDisplay('Outer', 8));

        //Outfit Label 4
        this.createOutfitLabel('underwearIcon', 'Underwear', 9);

        this.outfitStatsDisplays.push(this.createOutfitStatsDisplay('Underwear', 10));

        //Outfit Label 5
        this.createOutfitLabel('socksIcon', 'Socks', 11);

        this.outfitStatsDisplays.push(this.createOutfitStatsDisplay('Socks', 12));

        //Outfit Label 6
        this.createOutfitLabel('shoesIcon', 'Shoes', 13);

        this.outfitStatsDisplays.push(this.createOutfitStatsDisplay('Shoes', 14));

        //Extra space 
        this.outfitButtonStatGrid.add(this.scene.add.container(0, 0, []), 15, 0, 'center', { top: 70, bottom: 40 }, false);
        // Create the scrollable panel to display the buttons
        this.scene.tipsPanel = this.scene.rexUI.add.scrollablePanel({
            x: this.scene.cameras.main.centerX,
            y: this.scene.cameras.main.centerY / 1.1,
            width: 700,
            height: 600,
            scrollMode: 0,

            scrollDetectionMode: 1,            // drag dideteksi berdasarkan mask area&#8203;:contentReference[oaicite:0]{index=0}
            scroller: {
                pointerOutRelease: false,      // jangan lepaskan kontrol saat pointer keluar area panel&#8203;:contentReference[oaicite:1]{index=1}
                rectBoundsInteractive: false
            },

            background: tipsPanel,

            panel: {
                child: this.outfitButtonStatGrid,
                align: 'center',
                expand: true,
                mask: {
                    padding: 2
                }
            },

            slider: {
                track: this.scene.add.rectangle(0, 0, 20, 10, COLOR_DARK).setDepth(102),
                thumb: this.scene.add.rectangle(0, 0, 20, 40, COLOR_LIGHT).setDepth(102),
                space: {
                    left: -20,
                    right: 50,
                    top: 0,
                    bottom: 0
                }
            },

            mouseWheelScroller: {
                focus: false,
                speed: 0.1
            },

            space: {
                left: 55,
                right: 0,
                top: 90,
                bottom: 30,
                panel: 30
            }
        }).layout().setScale(0);

    }

    //Destroy the tips panel and its accompanying elements
    destroyTipsPanel() {
        this.scene.tweens.add({
            targets: this.scene.tipsPanel,
            scale: 0,
            duration: 100,
            ease: 'Sine.easeInOut',
            onComplete: () => {
                this.scene.tipsPanel?.setVisible(false);
                this.scene.tipsTitleText?.setVisible(false);
                this.scene.closeButton?.setVisible(false);
                this.scene.darkOverlay?.setVisible(false);

                if (this.outfitStatDisplays) {
                    this.outfitStatDisplays.forEach(display => display.setVisible(false));
                }
                this.enableInteraction([this.scene.miniGameButton, this.scene.removeAllButton, this.scene.tipsButton]);
            }
        })
    }

    createOutfitLabel(outfitIcon, outfitText, index) {
        const outfitTitle1 = this.scene.add.nineslice(
            this.scene.cameras.main.centerX,
            this.scene.cameras.main.centerY / 1.4,
            'categoryButton',
            '',
            250,
            25,
            5, 5, 5, 5
        ).setScale(2.5).setDepth(102);
        const outfitLabel1 = this.scene.rexUI.add.label({
            background: outfitTitle1,

            icon: this.scene.add.image(0, 0, outfitIcon).setScale(2),

            text: this.scene.add.text(0, 0, outfitText, {
                fontSize: '28px',
                fill: '#000000',
                fontFamily: 'pixelFont',
                align: 'left'
            }),

            align: 'left',
            space: {
                icon: 5,
                text: 15,
                left: 10,
                right: 370,
                top: 10,
                bottom: 10
            }
        }).setDepth(102);

        this.outfitButtonStatGrid.add(outfitLabel1, index, 0, 'left', { top: 60 }, true);
    }

    //Creates array to store outfit of all types
    setupOutfitTipsDisplay() {
        const { width, height } = this.scene.sys.game.config;
        this.scene.outfitStats = {};

        costumeData.forEach(({ name, outfitType, x, y, textureAnime, textureButton, textureIcon, stat }) => {
            let statText = stat.toString();
            if (stat > 0) statText = '+' + statText;
            const outfitIcon = this.scene.add.image(0, 0, textureIcon).setScale(0.6);
            const outfitStatText = this.scene.add.text(0, 50, statText, {
                fontSize: '24px',
                fill: '#00000',
                fontFamily: 'pixelFont',
                wordWrap: { width: width - 120 }
            }).setOrigin(0.5, 0.5);

            const outfitStatContainer = this.scene.add.container(0, -100, [outfitIcon, outfitStatText]).setDepth(102);
            if (!this.scene.outfitStats[outfitType]) {
                this.scene.outfitStats[outfitType] = [];
            }
            this.scene.outfitStats[outfitType].push(outfitStatContainer);
        });
    }

    //Create grid display for outfit of specified type
    createOutfitStatsDisplay(outfitType, index) {
        this.buttons = this.scene.outfitStats[outfitType] || [];
        const buttonList = this.buttons;

        let column = 6;
        let row = Math.ceil(buttonList.length / column);

        this.outfitStatsGrid = this.scene.rexUI.add.gridSizer({
            row: row,
            column: column,
            rowProportions: 1, // make columns flexible
            space: { column: 90, row: 100 },
            align: 'center',
        });

        // Add buttons to the grid
        buttonList.forEach((btn, i) => {
            const r = Math.floor(i / column);
            const c = i % column;
            this.outfitStatsGrid.add(btn, c, r, 'center', 0, false);
        });

        this.outfitButtonStatGrid.add(this.outfitStatsGrid, index, 0, 'center', { top: 70, bottom: 70 }, false);
    }
    //Sets up the side panel displayed on the right side
    setUpSidePanel(scene) {
        const centerX = scene.scale.width / 2;
        const centerY = scene.scale.height / 2;

        //Create back button for panel
        this.backButton = new UIButton(scene, this.AudioManager, centerX * 2.3, centerY / 3.5, 'selectionBox', 60, 60, 'backButton', -7, 3.5, () => {
            this.goBackMainPanel(scene);
        });

        if (this.scene.sidePanel) {
            this.scene.state = GameState.MAKEUP;
            this.updateCategoryButtons(this.scene);
            this.scene.sidePanel.setVisible(true).setDepth(102);
            this.scene.sidePanel.layout();
            return;
        }

        //Assign category buttons to buttons variables based on state of minigame (Dressup or Makeup)
        let buttons = (this.scene.state === GameState.MAKEUP) ? createMakeUpCategoryButtons(scene, this.AudioManager) : createDressUpCategoryButtons(scene, this.AudioManager);

        scene.buttons = buttons;
        this.buttonList = buttons;

        //Create header for selected button
        scene.selectedButtonHeader = this.createSelectedButtonHeader(scene);

        //Create a grid sized display for the buttons
        this.buttonGrid = scene.rexUI.add.gridSizer({
            row: this.buttonList.length,
            column: 1,
            rowProportions: 1, // make columns flexible
            space: { column: 0, row: 125 },
            align: 'center'
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
            x: this.scene.scale.width - 70,
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
        }).layout().setDepth(10);


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
            this.scene.sys.displayList.bringToTop(button);
        });

        const maskGraphics = this.scene.add.graphics().setDepth(100);
        const panelWidth = 693;

        maskGraphics.fillStyle(0xffffff);
        maskGraphics.fillRect(12, 0, panelWidth, 10000);
        maskGraphics.setVisible(false);

        const mask = maskGraphics.createGeometryMask();

        Object.values(buttons).flat().forEach(button => {
            button.setMask(mask);
        });

        this.scene.sidePanelMaskGraphics = maskGraphics;
        this.scene.sidePanel.layout();
    }



    createSelectedButtonHeader(scene) {
        const centerX = scene.scale.width / 2;
        const centerY = scene.scale.height / 2;

        //Icon of selected button
        scene.selectedButtonIcon = this.scene.add.image(-50, 0, 'blushIcon').setScale(1.4).setDepth(12).setOrigin(0.5);

        //Name of selected button
        scene.selectedButtonText = scene.add.text(25, 3, 'Blush', {
            fontSize: '24px',
            fontFamily: 'pixelFont',
            color: '#000000'
        }).setOrigin(0.5).setDepth(12);

        //Add padding to dynamically control size of button
        const padding = 70;
        const buttonWidth = (scene.selectedButtonText.width + scene.selectedButtonIcon.width + padding) / 4;

        //Header Panel
        scene.selectedButtonPanel = this.scene.add.nineslice(0, 0, 'button1', '', buttonWidth, 16, 4, 4, 5, 5).setScale(4.2).setDepth(11);

        //Returns a container that holds all the elements created above
        return scene.selectedButtonContainer = scene.add.container(centerX * 1.89, centerY / 6.3, [scene.selectedButtonPanel, scene.selectedButtonIcon, scene.selectedButtonText]).setDepth(13).setAlpha(0);
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
                    x: this.scene.scale.width - 70,
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
        // this.buttonList.forEach(btn => {
        //     if (btn && btn.destroy) {
        //         btn.destroy(); // Properly destroy the button game object
        //     }
        // })
        this.buttonList = scene.buttons;

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
        if (scene.selectedButtonHeader) {
            scene.tweens.killTweensOf(scene.selectedButtonHeader);
            scene.selectedButtonHeader.setAlpha(0);
        }
        if (this.backButton) {
            this.backButton.disableInteractive();
            if (this.backButton) {
                scene.tweens.add({ targets: this.backButton, x: scene.scale.width / 2 * 2.3, duration: 500, ease: 'Sine.easeInOut' });
            }
        }

        scene.tweens.add({
            targets: scene.sidePanel,
            x: scene.scale.width * 1.3,
            duration: 500,
            ease: 'Sine.easeInOut',
            onComplete: () => {
                // 1. Clean up the item grid that was displaying items + Lepas button.
                if (this.buttonGrid) {
                    const children = this.buttonGrid.getAllChildren();
                    children.forEach(childGameObject => {
                        // childGameObject is the Container (e.g., a MakeUpButton instance, or the Lepas UIButton instance)

                        let isPersistentItemButton = false;

                        // Check if this childGameObject is one of the persistent MakeUpButtons
                        if (scene.makeUpButtons && scene.state === GameState.MAKEUP) { // Check current mode
                            for (const type in scene.makeUpButtons) {
                                if (scene.makeUpButtons[type].includes(childGameObject)) {
                                    isPersistentItemButton = true;
                                    break;
                                }
                            }
                        }
                        // Check if this childGameObject is one of the persistent OutfitButtons
                        if (!isPersistentItemButton && scene.outfitButtons && scene.state === GameState.DRESSUP) { // Check current mode
                            for (const type in scene.outfitButtons) {
                                if (scene.outfitButtons[type].includes(childGameObject)) {
                                    isPersistentItemButton = true;
                                    break;
                                }
                            }
                        }

                        if (isPersistentItemButton) {
                            // console.log("Preserving button:", childGameObject.name || childGameObject.constructor.name);
                            this.buttonGrid.remove(childGameObject, false); // Remove WITHOUT destroying
                        } else {
                            // This child is likely the "Lepas" button or something else not in persistent storage.
                            // It will be destroyed when the grid itself is destroyed.
                            // console.log("Letting grid destroy button:", childGameObject.name || childGameObject.constructor.name);
                        }
                    });
                    // Now destroy the grid (and any remaining children like the "Lepas" button)
                    this.buttonGrid.destroy();
                    this.buttonGrid = null;
                }

                if (this.innerSizer) {
                    this.innerSizer.clear(true); // Clear innerSizer which contained the old item grid
                }

                // 2. Re-create and populate with CATEGORY buttons
                const newCategoryButtons = (scene.state === GameState.MAKEUP) ?
                    createMakeUpCategoryButtons(scene, this.AudioManager) :
                    createDressUpCategoryButtons(scene, this.AudioManager);

                scene.buttons = newCategoryButtons;

                this.buttonList = newCategoryButtons;

                this.buttonGrid = scene.rexUI.add.gridSizer({
                    column: 1,
                    row: this.buttonList.length || 1,
                    rowProportions: 1,
                    space: { column: 0, row: 200 }, // Your working CATEGORY spacing
                    align: 'center'
                });

                this.innerSizer.add(this.buttonGrid, { proportion: 1, align: 'center', expand: true });

                this.buttonList.forEach((buttonInstance, index) => {
                    buttonInstance.setVisible(true);
                    this.buttonGrid.add(buttonInstance, 0, index, 'center', 0, false);
                });

                // Apply layout for category view
                this.innerSizer.space.left = 90;
                this.innerSizer.space.right = 70;
                this.innerSizer.space.top = 80;
                this.innerSizer.space.bottom = 30;
                if (scene.sidePanel && scene.sidePanel.space) {
                    scene.sidePanel.space.panel = 30;
                }

                this.buttonGrid.layout();
                this.innerSizer.layout();
                scene.sidePanel.layout();
                scene.sidePanel.setT(0);

                scene.tweens.add({
                    targets: scene.sidePanel,
                    x: scene.scale.width - 70,
                    duration: 500,
                    ease: 'Sine.easeInOut'
                });
            }
        });
    }

    createEndingPanel() {
        const centerX = this.scene.scale.width / 2;
        const centerY = this.scene.scale.height / 2;

        let scoreTextColor;
        let heartTexture;
        let headerText;
        if (this.scene.statTracker.getStatPoints() >= 6) {
            headerText = 'Good Ending'
            scoreTextColor = '#00ff00';
            heartTexture = 'heartIcon2'
        } else {
            headerText = 'Bad Ending'
            scoreTextColor = '#ff4d4d';
            heartTexture = 'brokenHeartIcon'
        }

        this.scene.darkOverlay.setVisible(true);
        const endingPanel = this.scene.add.nineslice(
            0, 0, // relative to container center
            'tipsPanel',
            '',
            160,
            140,
            12,
            12,
            12,
            9
        ).setDepth(101).setScale(4);

        const endingHeader = this.scene.add.nineslice(
            0, -220,
            'endingHeader',
            '',
            160,
            36,
            31,
            31,
            31,
            31
        ).setDepth(101).setScale(3);

        const endingText = this.scene.add.text(0, -225, headerText, {
            fontSize: '62px',
            fill: '#ffffff',
            fontFamily: 'pixelFont',
            wordWrap: { width: this.scene.scale.width - 120 }
        }).setDepth(102).setOrigin(0.5, 0.5);

        const scoreHeader = this.scene.add.text(0, -90, 'Score', {
            fontSize: '72px',
            fill: '#000000',
            fontFamily: 'pixelFont',
            wordWrap: { width: this.scene.scale.width - 120 }
        }).setDepth(102).setOrigin(0.5, 0.5);

        const heart1Icon = this.scene.add.image(0, 0, heartTexture).setDepth(102).setScale(4.1);
        const heart2Icon = this.scene.add.image(-100, 0, heartTexture).setDepth(102).setScale(4.1);
        const heart3Icon = this.scene.add.image(100, 0, heartTexture).setDepth(102).setScale(4.1);

        const heartsContainer = this.scene.add.container(0, 0, [heart2Icon, heart1Icon, heart3Icon]).setDepth(101).setY(-20);

        const scoreBox = this.scene.add.nineslice(
            0,
            0,
            'scoreBox',
            '',
            300,
            70,
            25,
            25,
            25,
            25
        ).setDepth(101);

        const scoreText = this.scene.add.text(0, 5, '0', {
            fontSize: '64px',
            fill: scoreTextColor,
            fontFamily: 'pixelFont',
            wordWrap: { width: this.scene.scale.width - 120 }
        }).setDepth(102).setOrigin(0.5, 0.5);

        scoreText.setText(this.scene.statTracker.getStatPoints().toString());
        const scoreContainer = this.scene.add.container(0, 90, [scoreBox, scoreText]).setDepth(101);

        const quitButton = new GeneralButton(this.scene, -150, 190, 'emptyButton', null, 'Quit', () => { }, this.scene.AudioManager).setDepth(102);
        const restartButton = new GeneralButton(this.scene, 150, 190, 'emptyButton', null, 'Restart', () => { }, this.scene.AudioManager).setDepth(102);

        this.endingPanelContainer = this.scene.add.container(centerX, centerY, [
            endingPanel,
            endingHeader,
            endingText,
            scoreHeader,
            heartsContainer,
            scoreContainer,
            quitButton,
            restartButton
        ]).setDepth(101).setScale(0);

        this.scene.tweens.add({
            targets: this.endingPanelContainer,
            scale: 1,
            duration: 100,
            ease: 'Sine.easeInOut',
            onComplete: () => {
                if (this.scene.statTracker.getStatPoints() >= 6)
                    this.scene.AudioManager.playSFX('success');
            }
        });
    }

    restartGame() {
        this.scene.cameras.main.fadeOut(2000);

        this.scene.cameras.main.once('camerafadeoutcomplete', () => {
            this.endingPanelContainer?.setVisible(false);
            this.scene.darkOverlay.setVisible(false);
            this.scene.bachelorContainer.add(this.scene.chosenBachelor);
            this.scene.chosenBachelor = null;
            this.scene.chosenBachelorName = null;
            this.scene.statTracker.resetStatPoints();
            this.scene.BachelorManager.setUpBachelorChoice();
            this.scene.cameras.main.fadeIn(2000);
        });

    }
}