//UI Button Class
import UIButton, { OutfitButton, GeneralButton } from '../UI/UIButton.js'
import { SaveManager } from '../Save System/SaveManager.js';

import { createMakeUpCategoryButtons, createDressUpCategoryButtons, createDummyButtons, disableCategoryButtonsInteraction, enableCategoryButtonsInteraction } from './MiniGameCategoryButtons.js'
import { unlockManager } from '../Save System/UnlockManager.js';
//Costume Data Class
import { progressManager } from '../Save System/ProgressManager.js';

//Game State Class
import { GameState } from '../Main.js';

import Phaser from 'phaser';

import { layout } from '../ScreenOrientationUtils.js';
import { lockedItemsManager } from '../Save System/LockedItemsManager.js';



export class MiniGameManager {
    constructor(scene, AudioManager) {
        this.scene = scene;
        this.AudioManager = AudioManager;
    }

    
    setUpGame(scene) {
        this.minigameButtons = [];
        this.categoryButtons = scene.state === GameState.DRESSUP ? createDressUpCategoryButtons(scene, scene.AudioManager) : createMakeUpCategoryButtons(scene, scene.AudioManager);
        
        this.backButton = new UIButton(scene, scene.AudioManager, {
            x: layout.backButton.x,
            y: layout.backButton.y,
            textureButton: 'backButtonIcon',
            buttonWidth: 75,
            buttonHeight: 75,
            textureIcon: '',
            iconYPosition: -10,
            iconScale: layout.backButton.scale,
            callback: () => {
                scene.TweeningUtils.transitionBackToSelection();
            },
            buttonText: '',
            buttonScale: layout.backButton.scale,
        }).setDepth(99); 

        const removeAllIconKey = scene.state === GameState.MAKEUP ? 'removeMakeUpIcon' : 'removeDressIcon';
        scene.removeAllButton = new UIButton(scene, scene.AudioManager, {
            x: layout.removeAllButton.x,
            y: layout.removeAllButton.y,
            textureButton: 'stitchedButtonIcon',
            buttonWidth: 75,
            buttonHeight: 75,
            textureIcon: removeAllIconKey,
            iconYPosition: -10,
            iconScale: 0.6 * 2,
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
            textYPosition: 60,
            buttonScale: 0.7 * 2,
        }).setDepth(99); 

        scene.finishButton = new UIButton(scene, this.AudioManager, {
            x: layout.minigameFinishButton.x,
            y: layout.minigameFinishButton.y,
            textureButton: layout.minigameFinishButton.texture || 'readyButtonIcon',
            buttonWidth: layout.minigameFinishButton.width,
            buttonHeight: layout.minigameFinishButton.height,
            textureIcon: '',
            iconYPosition: 0,
            iconScale: 1.5,
            callback: () => {
                
                scene.finishButton.disableInteractive();

                
                if (this.scene.interactiveMakeupSystem && this.scene.interactiveMakeupSystem.isActive) {
                    this.scene.interactiveMakeupSystem.stopColoringSession(
                        this.scene.interactiveMakeupSystem.activeMakeupType, true
                    );
                }

                
                if (this.scene.state === GameState.DRESSUP) {
                    if (this.canContinueToScene2()) {

                        this.showConfirmationPanel();
                    } else {


                        this.incompletePanel = this.createIncompletePanel();
                        this.scene.tweens.add({
                            targets: this.incompletePanel,
                            scale: 1,
                            duration: 200,
                            ease: 'Back.Out'
                        });
                    }
                } else {
                    this.showConfirmationPanel();
                    this.scene.TweeningUtils.hideApplyMakeUpPanel();
                }
            },
            buttonText: 'READY',
            textOffset: layout.minigameFinishButton.textOffsetX || 0,
            textSize: layout.minigameFinishButton.textSize,
            textYPosition: 0,
            font: 'regularFont',
            useNineSlice: layout.minigameFinishButton.useNineSlice !== false,
            buttonScale: layout.minigameFinishButton.scale,
            textColor: '#d6525f'
        });

        scene.applyMakeUpPanel = this.scene.add.nineslice(layout.applyMakeUpPanel.x, layout.applyMakeUpPanel.y, 'StitchedButtonWithoutStitchIcon', '', layout.applyMakeUpPanel.width, layout.applyMakeUpPanel.height, 32, 32, 20, 24);
        scene.applyMakeUpText = this.scene.add.text(layout.applyMakeUpText.x, layout.applyMakeUpText.y, 'Swipe the highlighted area to apply the make up', {
            fontSize: layout.applyMakeUpText.fontSize,
            fill: '#FFFFFF',
            fontFamily: 'regularFont',
            wordWrap: { width: this.scene.scale.width - layout.applyMakeUpText.wordWrap }
        }).setOrigin(0.5, 0.5);

        scene.applyMakeUpContainer = this.scene.add.container(layout.applyMakeUpContainer.x, layout.applyMakeUpContainer.y, [scene.applyMakeUpPanel, scene.applyMakeUpText]).setDepth(21);
        this.setUpSidePanel(scene);
    }

    clearMinigameUI() {
        const scene = this.scene;
        console.log("[MiniGameManager] Clearing Minigame UI for selection screen transition.");


        scene.backToSelectionButton?.destroy();
        scene.removeAllButton?.destroy();

        scene.finishButton?.destroy();

        scene.finishButton = null;


        scene.statPanelContainer?.destroy();
        scene.applyMakeUpContainer?.destroy();
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
        
        this.enableInteraction();

        this.scene.finishButton.setAlpha(1);
        this.scene.finishButton?.resetVisuals();

        if (this.activeConfirmationPanel || this.incompletePanel) {
            this.scene.tweens.add({
                targets: this.incompletePanel || this.activeConfirmationPanel,
                scale: 0,
                duration: 150,
                ease: 'Sine.easeInOut',
                onComplete: () => {
                    this.incompletePanel?.destroy();
                    this.activeConfirmationPanel?.destroy();
                    this.activeConfirmationPanel = null; 
                    this.incompletePanel = null; 
                    if (callback) callback();
                }
            });
        }
        
    }
    createConfirmationPanel() {
        const { state, darkOverlay, finishButton, removeAllButton, backToSelectionButton, scale } = this.scene;
        const centerX = scale.width / 2;
        const centerY = scale.height / 2;

        // Always do this
        darkOverlay.setVisible(true);

        const buttonsToDisable = [finishButton, removeAllButton, backToSelectionButton];
        buttonsToDisable.forEach(btn => btn?.disableInteractive());

        const isDressUp = state === GameState.DRESSUP;

        
        if (isDressUp && !this.canContinueToScene2()) {
            const incompleteContainer = this.createIncompletePanel();
            return incompleteContainer.setDepth(151).setScale(0);
        }

       
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
            fontSize: '32px',
            fontFamily: 'regularFont',
            color: '#d6525f',
            align: 'center',
            wordWrap: { width: 600 }
        }).setOrigin(0.5).setDepth(151);

        const panelWidth = Phaser.Math.Clamp(text.width + 20, 100, 200); 
        const panelHeight = 100;
        const panel = this.scene.add.nineslice(0, 0, 'sidePanel', '', panelWidth, panelHeight, 15, 15, 15, 12)
            .setDepth(151).setScale(3);

        const okButton = new GeneralButton(this.scene, 0, 60, 'readyButtonIcon', null, 'OK',
            () => this.closeConfirmationPanel(), this.scene.AudioManager).setDepth(151);

       
        const scaledWidth = panelWidth * 0.5 * 3; 
        const scaledHeight = panelHeight * 0.5 * 3;

        const closeButton = new UIButton(this.scene, this.AudioManager,
            scaledWidth - 20, 
            -scaledHeight + 20, 
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
         if (gameState === GameState.MAKEUP) {
            
            this.scene.makeUpFinished = true;
           
            progressManager.completeMakeUp();
        } else if (gameState === GameState.DRESSUP) {
            
            this.scene.dressUpFinished = true;
            
            progressManager.completeDressUp();
        }
        this.scene.TweeningUtils.transitionBackToSelection();
        
    }

    transitionMiniGame() {
        let text;
        if (!this.scene.dressUpFinished && !this.scene.makeUpFinished) text = "You haven't finished your make up and dress up!";
        else if (!this.scene.makeUpFinished) text = "You haven't finished your make up!";
        else if (!this.scene.dressUpFinished) text = "You haven't finished your dress up!";

        if (text) {
            this.incompletePanel = this.createIncompletePanel(text);
            this.scene.tweens.add({
                targets: this.incompletePanel,
                scale: 1,
                duration: 100,
                ease: 'Back.Out'
            });
            return;
        }

        this.activeConfirmationPanel = this.createEndingConfirmationPanel();
        this.scene.tweens.add({
            targets: this.activeConfirmationPanel,
            scale: 1,
            duration: 100,
            ease: 'Back.Out'
        });
    }
    canContinueToScene2() {
        const selected = OutfitButton.selectedOutfits;

        const has = type => !!(selected[type] && selected[type].current);

        const isSet1 = has("Dress") && has("Shoes");

        const isSet2 = has("Shirt") && has("Lower") && has("Shoes");

        return isSet1 || isSet2;
    }

    transitionToCutscene() {

        const bachelorNameToUse = this.scene.chosenBachelorName;
        const statPointsToUse = this.scene.statTracker.getStatPoints();
        this.disableInteraction();

        if (!bachelorNameToUse) {
            console.error("[MiniGameManager] FATAL: chosenBachelorName tidak ada di scene saat akan transisi!");
            this.closeConfirmationPanel();
            return;
        }

        
        if (this.activeConfirmationPanel) {
            this.activeConfirmationPanel.destroy();
            this.activeConfirmationPanel = null;
        }
        
        if (this.scene.darkOverlay) this.scene.darkOverlay.setVisible(false);


        this.scene.cameras.main.fadeOut(2000);
        this.scene.AudioManager.fadeOutMusic('minigameMusic', 1500);

        this.scene.cameras.main.once('camerafadeoutcomplete', () => {
            console.log("[MiniGameManager] Fade out selesai. Memulai transisi ke Cutscene 2.");

            this.scene.TweeningUtils.openDrapes();
            
            this.scene.UIManager.clearMinigameScene(this.scene);

            
            console.log(`[MiniGameManager] Memulai Cutscene 2 untuk ${bachelorNameToUse}`);
            this.scene.CutsceneSystem.initiateCutscene2(
                bachelorNameToUse,
                "Hangout1",
                statPointsToUse
            );
        });
    }

    
    disableInteraction() {
        this.scene.removeAllButton?.disableInteractive();
        this.backButton?.disableInteractive();
        this.scene.finishButton?.disableInteractive();
        this.scene.makeUpButton?.disableInteractive();
        this.scene.dressUpButton?.disableInteractive();
        this.scene.finishMiniGameButton?.disableInteractive(); 
        this.scene.miniGameButton?.disableInteractive();

        disableCategoryButtonsInteraction(this.scene);
        const minigameButtons = this.buttonGrid ? this.buttonGrid.getAllChildren() : [];
        minigameButtons.forEach(buttons => buttons?.disableInteractive());

        this.scene.sidePanel?.getElement('scroller').setEnable(false);

        if (!this.inputBlocker) {
            this.inputBlocker = this.scene.add.rectangle(
                this.scene.scale.width / 2, this.scene.scale.height / 2,
                this.scene.scale.width, this.scene.scale.height, 0x000000, 0
            ).setInteractive().setDepth(150);
        }
    }

    
    enableInteraction() {
        this.scene.removeAllButton?.setInteractive();
        this.backButton?.setInteractive();
        this.scene.finishButton?.setInteractive();
        this.scene.makeUpButton?.setInteractive();
        this.scene.dressUpButton?.setInteractive();
        this.scene.finishMiniGameButton?.setInteractive();
        this.scene.miniGameButton?.setInteractive();

        enableCategoryButtonsInteraction(this.scene);
        const minigameButtons = this.buttonGrid ? this.buttonGrid.getAllChildren() : [];
        minigameButtons.forEach(buttons => buttons?.setInteractive());

        this.scene.sidePanel?.getElement('scroller').setEnable(true);

        if (this.inputBlocker) {
            this.inputBlocker.destroy();
            this.inputBlocker = null;
        }
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

    createOutfitStatsDisplay(outfitType, index) {
        this.buttons = this.scene.outfitStats[outfitType] || [];
        const buttonList = this.buttons;

        let column = 6;
        let row = Math.ceil(buttonList.length / column);

        this.outfitStatsGrid = this.scene.rexUI.add.gridSizer({
            row: row,
            column: column,
            rowProportions: 1, 
            space: { column: 90, row: 100 },
            align: 'center',
        });

        
        buttonList.forEach((btn, i) => {
            const r = Math.floor(i / column);
            const c = i % column;
            this.outfitStatsGrid.add(btn, c, r, 'center', 0, false);
        });

        this.outfitButtonStatGrid.add(this.outfitStatsGrid, index, 0, 'center', { top: 70, bottom: 70 }, false);
    }
    
    setUpSidePanel(scene) {
        const centerX = scene.scale.width / 2;
        const centerY = scene.scale.height / 2;

        let buttons = createDummyButtons(scene, scene.AudioManager);
        scene.buttons = buttons;
        this.buttonList = buttons;

        
        this.buttonGrid = scene.rexUI.add.gridSizer({
            row: this.buttonList.length,
            column: 1,
            rowProportions: 1, 
            space: { column: 0, row: 125 },
            align: 'center'
        });

       
        this.buttonList.forEach((btnContainer, index) => {
            this.buttonGrid.add(btnContainer, 0, index, '', 30, false);
        });

        
        const sidePanel = this.scene.add.nineslice(0, 0, 'sidePanel', '', 500, 667, 14, 14, 17, 10).setDepth(10).setScale(1.5);

        this.innerSizer = scene.rexUI.add.sizer({
            orientation: 1, 
            space: { top: 70, bottom: 100, left: 60 }
        });

        this.innerSizer.add(this.buttonGrid, 0, 'center', {}, true);

       
        this.scene.sidePanel = this.scene.rexUI.add.scrollablePanel({
            x: layout.sidePanel.x,
            y: layout.sidePanel.y,
            width: layout.sidePanel.width || 500,
            height: layout.sidePanel.height || 1000,
            scrollMode: 0,

            scrollDetectionMode: 1,
            scroller: {
                pointerOutRelease: false,
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
                left: layout.sidePanel.left,
                right: layout.sidePanel.right,
                top: layout.sidePanel.top,
                bottom: layout.sidePanel.bottom,
                panel: layout.sidePanel.panel
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
        this.scene.sidePanelHeaderText = this.scene.add.text(layout.sidePanelHeaderText.x, layout.sidePanelHeaderText.y, headerText, {
            fontSize: layout.sidePanelHeaderText.fontSize,
            fontStyle: 'bold',
            fill: '#d6525f',
            fontFamily: 'regularFont',
            wordWrap: { width: this.scene.scale.width - 120 }
        }).setDepth(10).setOrigin(0.5, 0.5);
        this.scene.sidePanelIcon = this.scene.add.image(layout.sidePanelIcon.x, layout.sidePanelIcon.y, panelIcon).setDepth(10).setScale(0.8);
        this.scene.sidePanelLine = this.scene.add.image(layout.sidePanelLine.x, layout.sidePanelLine.y, 'sidePanelLine').setDepth(10).setScale(2).setDisplaySize(440, 5);

        this.scene.sidePanel
            .setChildrenInteractive({
                targets: this.buttonList,
                targetMode: 'direct'
            })
            .on('child.click', (childContainer) => {
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
        
        this.buttonList = scene.buttons;
        this.buttonGrid.clear();
        this.innerSizer.clear();
        this.scene.MiniGameManager.buttonGrid = this.scene.rexUI.add.gridSizer({
            row: this.scene.MiniGameManager.buttonList.length,
            column: 1,
            rowProportions: 1, 
            space: { column: 0, row: 200 },
            align: 'center',
        });

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
                
                if (this.buttonGrid) {
                    const children = this.buttonGrid.getAllChildren();
                    children.forEach(childGameObject => {
                        
                        let isPersistentItemButton = false;

                        
                        if (scene.makeUpButtons && scene.state === GameState.MAKEUP) { 
                            for (const type in scene.makeUpButtons) {
                                if (scene.makeUpButtons[type].includes(childGameObject)) {
                                    isPersistentItemButton = true;
                                    break;
                                }
                            }
                        }
                        
                        if (!isPersistentItemButton && scene.outfitButtons && scene.state === GameState.DRESSUP) { 
                            for (const type in scene.outfitButtons) {
                                if (scene.outfitButtons[type].includes(childGameObject)) {
                                    isPersistentItemButton = true;
                                    break;
                                }
                            }
                        }

                        if (isPersistentItemButton) {
                            
                            this.buttonGrid.remove(childGameObject, false); 
                        } 
                    });
                   
                    this.buttonGrid.destroy();
                    this.buttonGrid = null;
                }

                if (this.innerSizer) {
                    this.innerSizer.clear(true); 
                }


                scene.buttons = newCategoryButtons;

                this.buttonList = newCategoryButtons;

                this.buttonGrid = scene.rexUI.add.gridSizer({
                    column: 1,
                    row: this.buttonList.length || 1,
                    rowProportions: 1,
                    space: { column: 0, row: 200 }, 
                    align: 'center'
                });

                this.innerSizer.add(this.buttonGrid, { proportion: 1, align: 'center', expand: true });

                this.buttonList.forEach((buttonInstance, index) => {
                    buttonInstance.setVisible(true);
                    this.buttonGrid.add(buttonInstance, 0, index, 'center', 0, false);
                });

               
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
        const nextLevelButton = new UIButton(this.scene, this.AudioManager, {
            x: layout.nextLevelButton.x,
            y: layout.nextLevelButton.y,
            textureButton: 'readyButtonIcon',
            buttonWidth: 600,
            buttonHeight: 150,
            textureIcon: '',
            iconYPosition: 0,
            iconScale: 1.5,
            callback: () => {
                this.handleGameEnd(false);
                restartButton.disableInteractive(); nextLevelButton.disableInteractive();
            },
            buttonText: 'Next Level',
            textSize: 60,
            textYPosition: 0,
            font: 'regularFont',
            useNineSlice: true,
            textColor: '#d6525f'
        }).setDepth(151).setScale(0);


        const restartButton = new UIButton(this.scene, this.AudioManager, {
            x: layout.restartButton.x,
            y: layout.restartButton.y,
            textureButton: 'readyButtonIcon',
            buttonWidth: 600,
            buttonHeight: 150,
            textureIcon: '',
            iconYPosition: 0,
            iconScale: 1.5,
            callback: () => {
                this.handleGameEnd(true);
                this.restartGame(true); nextLevelButton.disableInteractive(); restartButton.disableInteractive();
            },
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

    handleGameEnd(isRestart) {
        unlockManager.clearAllUnlocks();
        SaveManager.clearSave();
        progressManager.clearProgress();
        lockedItemsManager.clearLockedItems();
        console.log("Save data has been cleared on game end.");
        if (isRestart) {
           
            this.scene.registry.set('chosenBachelorNameForRestart', this.scene.chosenBachelorName);
        } else {
            
            this.scene.registry.set('lastBachelorName', this.scene.chosenBachelorName);
            
            this.scene.registry.remove('chosenBachelorNameForRestart');
        }

        
        this.restartGame();
    }

    restartGame() {
        const poki = this.scene.plugins.get('poki');

       
        poki.runWhenInitialized(() => {
            poki.gameplayStop();
            console.log("[Poki SDK] gameplayStop() has been fired.");
        });

        this.scene.AudioManager.stopMusic('cutsceneMusic');
        this.scene.cameras.main.fadeOut(2000);

        this.scene.cameras.main.once('camerafadeoutcomplete', async () => {
            await poki.commercialBreak();
            
            this.scene.scene.start('BootScene');

        });
    }
}