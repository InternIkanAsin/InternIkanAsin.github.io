//UI Button Class
import UIButton, { OutfitButton, GeneralButton } from '../UI/UIButton.js'

//MakeUp and DressUp Category Buttons
import { createMakeUpCategoryButtons, createDressUpCategoryButtons, createDummyButtons, disableDressUpMakeUpCategoryButtons, enableDressUpMakeUpCategoryButtons } from './MiniGameCategoryButtons.js'

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
        this.categoryButtons = scene.state === GameState.DRESSUP ? createDressUpCategoryButtons(scene, scene.AudioManager) : createMakeUpCategoryButtons(scene, scene.AudioManager);
        //Create back button for panel
        this.backButton = new UIButton(scene, scene.AudioManager, {
            x: scene.scale.width * 0.08,
            y: scene.scale.height * 0.1,
            textureButton: 'backButtonIcon',
            buttonWidth: 75,
            buttonHeight: 75,
            textureIcon: '',
            iconYPosition: -10,
            iconScale: 0.22,
            callback: () => { scene.TweeningUtils.transitionBackToSelection(); },
            buttonText: '',
            buttonScale: 0.22,
        }).setDepth(99); // Depth DI BAWAH tirai

        const removeAllButtonIcon = scene.state === GameState.DRESSUP ? 'removeDressIcon' : 'removeMakeUpIcon';
        scene.removeAllButton = new UIButton(scene, scene.AudioManager, {
            x: 70,
            y: 500,
            textureButton: 'stitchedButtonIcon',
            buttonWidth: 75,
            buttonHeight: 75,
            textureIcon: removeAllButtonIcon,
            iconYPosition: -30,
            iconScale: 0.7,
            callback: () => {
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
            },
            buttonText: 'Remove All',
            textSize: 24,
            textYPosition: 65,
            buttonScale: 0.8,
        }).setDepth(99); // Depth DI BAWAH tirai

        scene.finishButton = new UIButton(scene, this.AudioManager, {
            x: this.scene.scale.width / 2,
            y: this.scene.scale.height - 100,
            textureButton: 'readyButtonIcon',
            buttonWidth: 600,
            buttonHeight: 150,
            textureIcon: '',
            iconYPosition: 0,
            iconScale: 1.5,
            callback: () => { this.showConfirmationPanel(); },
            buttonText: 'READY',
            textSize: 60,
            textYPosition: 0,
            font: 'regularFont',
            useNineSlice: true,
            textColor: '#d6525f'
        });

        this.setupOutfitTipsDisplay();
        this.setUpSidePanel(scene);

    }

    clearMinigameUI() {
        const scene = this.scene;
        console.log("[MiniGameManager] Clearing Minigame UI for selection screen transition.");


        scene.backToSelectionButton?.destroy();
        scene.removeAllButton?.destroy();
        scene.tipsButton?.destroy();
        scene.finishButton?.destroy();


        scene.statPanelContainer?.destroy();
        scene.sidePanel?.destroy();
        this.backButton?.destroy();
        scene.dressUpCategoryButtons?.forEach(buttons => buttons.destroy());
        scene.makeUpCategoryButtons?.forEach(buttons => buttons.destroy());
        scene.finishMiniGameButton?.destroy();

        scene.sidePanelHeaderText?.destroy();
        scene.sidePanelLine?.destroy();
        scene.sidePanelIcon?.destroy();

        scene.backToSelectionButton = null;
        scene.removeAllButton = null;
        scene.tipsButton = null;
        scene.finishButton = null;
        scene.statPanelContainer = null;
        scene.sidePanel = null;
        this.backButton = null;

    }

    panelInvis() {
        this.scene.sidePanel.setVisible(!this.scene.sidePanel.visible);
    }
    showConfirmationPanel() {
        if (this.activeConfirmationPanel && this.activeConfirmationPanel.scene) {
            this.activeConfirmationPanel.destroy();
        }

        this.disableInteraction();
        this.activeConfirmationPanel = this.createConfirmationPanel();


        if (this.activeConfirmationPanel) {
            this.scene.tweens.add({
                targets: this.activeConfirmationPanel,
                scale: 1,
                duration: 200,
                ease: 'Back.Out'
            });
        }
    }

    closeConfirmationPanel(callback = null) {
        this.scene.darkOverlay.setVisible(false);
        // Pastikan semua tombol yang relevan diaktifkan kembali
        this.enableInteraction();

        if (this.activeConfirmationPanel || this.incompletePanel) {
            this.scene.tweens.add({
                targets: this.incompletePanel || this.activeConfirmationPanel,
                scale: 0,
                duration: 150,
                ease: 'Sine.easeInOut',
                onComplete: () => {
                    this.incompletePanel?.destroy();
                    this.activeConfirmationPanel?.destroy();
                    if (callback) callback();
                }
            });
        }
    }
    createConfirmationPanel() {
        const { state, darkOverlay, finishButton, tipsButton, removeAllButton, backToSelectionButton, scale } = this.scene;
        const centerX = scale.width / 2;
        const centerY = scale.height / 2;

        // Always do this
        darkOverlay.setVisible(true);

        const buttonsToDisable = [finishButton, tipsButton, removeAllButton, backToSelectionButton];
        buttonsToDisable.forEach(btn => btn?.disableInteractive());

        const isDressUp = state === GameState.DRESSUP;

        // Case: outfit not complete
        if (isDressUp && !this.canContinueToScene2()) {
            const incompleteContainer = this.createIncompletePanel();
            return incompleteContainer.setDepth(151).setScale(0);
        }

        // Case: confirmation panel
        const questionText = isDressUp
            ? 'Are you sure about the outfit you chose?'
            : 'Are you sure about the make up you chose?';

        const panel = this.scene.add.nineslice(0, 0, 'sidePanel', '', 230, 130, 12, 12, 12, 9)
            .setDepth(101).setScale(3);

        const text = this.scene.add.text(0, -20, questionText, {
            fontSize: '32px',
            fontFamily: 'regularFont',
            color: '#d6525f',
            align: 'center',
            lineSpacing: 10
        }).setOrigin(0.5).setDepth(102);

        const yesButton = new GeneralButton(this.scene, 120, 80, 'readyButtonIcon', null, 'YES',
            () => this.finishMiniGame(state), this.scene.AudioManager).setDepth(102);

        const noButton = new GeneralButton(this.scene, -120, 80, 'readyButtonIcon', null, 'NO',
            () => this.closeConfirmationPanel(), this.scene.AudioManager).setDepth(102);

        const closeButton = new UIButton(this.scene, this.AudioManager, 310, -170,
            'redButton', 40, 40, 'xMarkWhite', 0, 1.5,
            () => this.closeConfirmationPanel()).setDepth(102);

        const container = this.scene.add.container(centerX, centerY, [panel, text, yesButton, noButton, closeButton]);
        return container.setDepth(151).setScale(0);
    }

    createIncompletePanel(panelText = null) {
        const centerX = this.scene.scale.width / 2;
        const centerY = this.scene.scale.height / 2;

        this.scene.darkOverlay.setVisible(true);

        this.disableInteraction();
        const textContent = panelText || 'Your outfit is not complete!';
        const text = this.scene.add.text(0, -20, textContent, {
            fontSize: '40px',
            fontFamily: 'regularFont',
            color: '#d6525f',
            align: 'center',
            wordWrap: { width: 600 }
        }).setOrigin(0.5).setDepth(151);

        const panelWidth = Phaser.Math.Clamp(text.width + 40, 200, 300); // Add padding for aesthetics
        const panelHeight = 100;
        const panel = this.scene.add.nineslice(0, 0, 'sidePanel', '', panelWidth, panelHeight, 15, 15, 15, 12)
            .setDepth(151).setScale(3);

        const okButton = new GeneralButton(this.scene, 0, 60, 'readyButtonIcon', null, 'OK',
            () => this.closeConfirmationPanel(), this.scene.AudioManager).setDepth(151);

        // Position close button at top-right of panel
        const scaledWidth = panelWidth * 0.5 * 3;  // half width * scale
        const scaledHeight = panelHeight * 0.5 * 3;

        const closeButton = new UIButton(this.scene, this.AudioManager,
            scaledWidth - 20, // 20px inset from right edge
            -scaledHeight + 20, // 20px inset from top edge
            'redButton', 40, 40, 'xMarkWhite', 0, 1.5,
            () => this.closeConfirmationPanel()).setDepth(151);

        const container = this.scene.add.container(centerX, centerY, [panel, text, okButton, closeButton]);
        return container.setDepth(1000).setScale(0);
    }

    createEndingConfirmationPanel() {
        const centerX = this.scene.scale.width / 2;
        const centerY = this.scene.scale.height / 2;

        this.scene.darkOverlay.setVisible(true);

        this.disableInteraction()
        const panel = this.scene.add.nineslice(0, 0, 'sidePanel', '', 230, 130, 12, 12, 12, 9)
            .setDepth(101).setScale(3);

        const text = this.scene.add.text(0, -20, 'Are you sure about the make up and outfit you chose?', {
            fontSize: '32px',
            fontFamily: 'regularFont',
            color: '#d6525f',
            align: 'center',
            wordWrap: { width: 500 },
            lineSpacing: 10
        }).setOrigin(0.5).setDepth(102);

        const yesButton = new GeneralButton(this.scene, 120, 100, 'readyButtonIcon', null, 'YES',
            () => this.transitionToCutscene(), this.scene.AudioManager).setDepth(102);

        const noButton = new GeneralButton(this.scene, -120, 100, 'readyButtonIcon', null, 'NO',
            () => this.closeConfirmationPanel(), this.scene.AudioManager).setDepth(102);

        const closeButton = new UIButton(this.scene, this.AudioManager, 310, -170,
            'redButton', 40, 40, 'xMarkWhite', 0, 1.5,
            () => this.closeConfirmationPanel()).setDepth(102);
        const container = this.scene.add.container(centerX, centerY, [panel, text, yesButton, noButton, closeButton]);

        return container.setDepth(151).setScale(0);
    }
    finishMiniGame(gameState) {
        this.closeConfirmationPanel();
        this.scene.TweeningUtils.transitionBackToSelection();
        if (gameState === GameState.MAKEUP) this.scene.makeUpFinished = true;
        else if (gameState === GameState.DRESSUP) this.scene.dressUpFinished = true;
    }

    transitionMiniGame() {
        let text;
        if (!this.scene.makeUpFinished && !this.scene.dressUpFinished) text = "You haven't finished your make up and dress up!";
        else if (!this.scene.makeUpFinished) text = "You haven't finished your make up!";
        else if (!this.scene.dressUpFinished) text = "You haven't finished your dress up!";

        if (text) {
            this.incompletePanel = this.createIncompletePanel(text);
            this.scene.tweens.add({
                targets: this.incompletePanel,
                scale: 1,
                duration: 100,
                ease: 'Sine.easeInOut'
            });
            return;
        }

        this.activeConfirmationPanel = this.createEndingConfirmationPanel();
        this.scene.tweens.add({
            targets: this.activeConfirmationPanel,
            scale: 1,
            duration: 100,
            ease: 'Sine.easeInOut'
        });
    }
    canContinueToScene2() {
        const selected = OutfitButton.selectedOutfits;

        const has = type => !!selected[type];

        const isSet1 = has("Dress") && has("Shoes");
        const isSet2 = has("Shirt") && has("Underwear") && has("Socks") && has("Shoes");

        return isSet1 || isSet2;
    }

    transitionToCutscene() {

        const bachelorNameToUse = this.scene.chosenBachelorName;
        const statPointsToUse = this.scene.statTracker.getStatPoints();


        if (!bachelorNameToUse) {
            console.error("[MiniGameManager] FATAL: chosenBachelorName tidak ada di scene saat akan transisi!");
            this.closeConfirmationPanel();
            return;
        }

        // Destroy confirmation panel
        if (this.activeConfirmationPanel) {
            this.activeConfirmationPanel.destroy();
            this.activeConfirmationPanel = null;
        }
        // Hide Overlay
        if (this.scene.darkOverlay) this.scene.darkOverlay.setVisible(false);


        this.scene.cameras.main.fadeOut(2000);
        this.scene.AudioManager.fadeOutMusic('minigameMusic', 1500);

        this.scene.cameras.main.once('camerafadeoutcomplete', () => {
            console.log("[MiniGameManager] Fade out selesai. Memulai transisi ke Cutscene 2.");

            this.scene.TweeningUtils.openDrapes();
            // Clear Minigame objects
            this.scene.UIManager.clearMinigameScene(this.scene);

            // Call InitiateCutscene2
            console.log(`[MiniGameManager] Memulai Cutscene 2 untuk ${bachelorNameToUse}`);
            this.scene.CutsceneSystem.initiateCutscene2(
                bachelorNameToUse,
                "Theater",
                statPointsToUse
            );
        });
    }

    //Disables interaction with all buttons while tip panel is open
    disableInteraction() {
        this.scene.removeAllButton?.disableInteractive();
        this.backButton?.disableInteractive();
        this.scene.finishButton?.disableInteractive();
        this.scene.makeUpButton?.disableInteractive();
        this.scene.dressUpButton?.disableInteractive();
        this.scene.finishMiniGameButton.disableInteractive();

        const minigameButtons = this.buttonGrid ? this.buttonGrid.getAllChildren() : [];
        //disableDressUpMakeUpCategoryButtons(this.scene);

        minigameButtons.forEach(buttons => buttons.disableInteractive());
        this.scene.sidePanel?.getElement('scroller').setEnable(false);
    }

    //Enables interaction with all buttons while tip panel is closed
    enableInteraction() {
        this.scene.removeAllButton?.setInteractive();
        this.backButton?.setInteractive();
        this.scene.finishButton?.setInteractive();
        this.scene.makeUpButton?.setInteractive();
        this.scene.dressUpButton?.setInteractive();
        this.scene.finishMiniGameButton.setInteractive();

        const minigameButtons = this.buttonGrid ? this.buttonGrid.getAllChildren() : [];
        //enableDressUpMakeUpCategoryButtons(this.scene);

        minigameButtons.forEach(buttons => buttons.setInteractive());
        this.scene.sidePanel?.getElement('scroller').setEnable(true);
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

        //Assign category buttons to buttons variables based on state of minigame (Dressup or Makeup)
        let buttons = createDummyButtons(scene, scene.AudioManager);
        scene.buttons = buttons;
        this.buttonList = buttons;

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
        const sidePanel = this.scene.add.nineslice(0, 0, 'sidePanel', '', 500, 667, 14, 14, 17, 10).setDepth(10).setScale(1.5);

        this.innerSizer = scene.rexUI.add.sizer({
            orientation: 1, // vertical
            space: { top: 70, bottom: 100, left: 60 }
        });

        this.innerSizer.add(this.buttonGrid, 0, 'center', {}, true);

        // Create the scrollable panel to display the buttons
        this.scene.sidePanel = this.scene.rexUI.add.scrollablePanel({
            x: this.scene.scale.width - 70,
            y: centerY,
            width: 500,
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
                speed: 1
            },

            space: {
                left: 60,
                right: 10,
                top: 105,
                bottom: 30,
                panel: 30
            }
        }).layout().setDepth(10);

        let headerText;
        let panelIcon

        if (this.scene.state === GameState.DRESSUP) {
            headerText = 'Dress Up';
            panelIcon = 'dressButtonIcon2';
        } else {
            headerText = 'Make Up'
            panelIcon = 'makeUpButtonIcon2'
        }
        this.scene.sidePanelHeaderText = this.scene.add.text(this.scene.scale.width - 180, 110, headerText, {
            fontSize: '48px',
            fontStyle: 'bold',
            fill: '#d6525f',
            fontFamily: 'regularFont',
            wordWrap: { width: this.scene.scale.width - 120 }
        }).setDepth(10).setOrigin(0.5, 0.5);
        this.scene.sidePanelIcon = this.scene.add.image(this.scene.scale.width - 35, centerY / 5.1, panelIcon).setDepth(10).setScale(0.4);
        this.scene.sidePanelLine = this.scene.add.image(this.scene.scale.width - 70, centerY / 3.9, 'sidePanelLine').setDepth(10).setScale(2).setDisplaySize(440, 5);

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
        ).setDepth(151).setScale(3);

        const endingText = this.scene.add.text(0, -225, headerText, {
            fontSize: '62px',
            fill: '#ffffff',
            fontFamily: 'pixelFont',
            wordWrap: { width: this.scene.scale.width - 120 }
        }).setDepth(151).setOrigin(0.5, 0.5);


        const nextLevelButton = new UIButton(this.scene, this.AudioManager, {
            x: this.scene.scale.width / 2.7,
            y: this.scene.scale.height / 2,
            textureButton: 'readyButtonIcon',
            buttonWidth: 600,
            buttonHeight: 150,
            textureIcon: '',
            iconYPosition: 0,
            iconScale: 1.5,
            callback: () => { this.restartGame() },
            buttonText: 'Next Level',
            textSize: 60,
            textYPosition: 0,
            font: 'regularFont',
            useNineSlice: true,
            textColor: '#d6525f'
        }).setDepth(151).setScale(0);


        const restartButton = new UIButton(this.scene, this.AudioManager, {
            x: this.scene.scale.width / 1.6,
            y: this.scene.scale.height / 2,
            textureButton: 'readyButtonIcon',
            buttonWidth: 600,
            buttonHeight: 150,
            textureIcon: '',
            iconYPosition: 0,
            iconScale: 1.5,
            callback: () => { this.restartGame(true) },
            buttonText: 'Restart',
            textSize: 60,
            textYPosition: 0,
            font: 'regularFont',
            useNineSlice: true,
            textColor: '#d6525f'
        }).setDepth(151).setScale(0);

        this.scene.tweens.add({
            targets: [nextLevelButton, restartButton],
            scale: 1,
            duration: 200,
            ease: 'Sine.easeInOut'
        })
    }

    restartGame(isRestarted = false) {
        if (isRestarted) this.scene.registry.set('gameRestarted', true);
        this.scene.AudioManager.stopMusic('cutsceneMusic');

        this.scene.cameras.main.fadeOut(2000);

        this.scene.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.scene.start('BootScene');
        });

    }
}