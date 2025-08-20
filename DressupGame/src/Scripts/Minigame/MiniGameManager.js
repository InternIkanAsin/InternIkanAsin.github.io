//UI Button Class
import UIButton, { OutfitButton, GeneralButton, CategoryButton } from '../UI/UIButton.js'
import { SaveManager } from '../Save System/SaveManager.js';

import { createMakeUpCategoryButtons, createDressUpCategoryButtons, createDummyButtons, disableCategoryButtonsInteraction, enableCategoryButtonsInteraction } from './MiniGameCategoryButtons.js'
import { unlockManager } from '../Save System/UnlockManager.js';
//Costume Data Class
import { progressManager } from '../Save System/ProgressManager.js';

//Game State Class
import { GameState } from '../Main.js';

import Phaser from 'phaser';
import AssetLoader from '../AssetLoader.js';
import { orientation } from '../ScreenOrientationUtils.js';
import { layout } from '../ScreenOrientationUtils.js';
import { lockedItemsManager } from '../Save System/LockedItemsManager.js';

function _createConfettiTextures(scene) {
    const confettiColors = [0xffd700, 0xff69b4, 0x00bfff, 0x32cd32, 0xff4500, 0x9370db];
    const textureKeys = [];

    confettiColors.forEach(color => {
        // Kita tetap butuh kunci, tapi kunci ini hanya "hidup" selama scene ini aktif.
        const key = `confetti_local_${color.toString(16)}`;
        textureKeys.push(key);

        // Periksa apakah tekstur dari scene SEBELUMNYA masih ada di manajer global,
        // dan hapus jika ada untuk menghindari konflik.
        if (scene.textures.exists(key)) {
            scene.textures.remove(key);
        }

        // Gunakan metode createCanvas yang paling stabil.
        const texture = scene.textures.createCanvas(key, 10, 20);
        if (texture) {
            const context = texture.getContext();
            const colorString = '#' + ('000000' + color.toString(16)).substr(-6);
            context.fillStyle = colorString;
            context.fillRect(0, 0, 10, 20);
            texture.refresh();
        }
    });

    console.log('[Confetti] Self-contained textures created:', textureKeys);
    return textureKeys;
}

export class MiniGameManager {
    constructor(scene, AudioManager) {
        this.scene = scene;
        this.AudioManager = AudioManager;
    }


    setUpGame(scene) {
        this.minigameButtons = [];
        this.categoryButtons = scene.state === GameState.DRESSUP ? createDressUpCategoryButtons(scene, scene.AudioManager) : createMakeUpCategoryButtons(scene, scene.AudioManager);

        const currentButton = scene.state === GameState.DRESSUP ? scene.dressButton : scene.eyebrowsButton;

        scene.selectedCategory = { current: currentButton, previous: null }
        console.log(scene.selectedCategory)
        this.backButton = new UIButton(scene, scene.AudioManager, {
            x: layout.backButton.x,
            y: layout.backButton.y,
            textureButton: 'yellowButton',
            buttonWidth: 75,
            buttonHeight: 75,
            textureIcon: { atlas: 'Icon_spritesheet', frame: 'Exit_Button.png' },
            iconYPosition: -5,
            iconScale: layout.backButton.iconScale,
            callback: () => {
                scene.TweeningUtils.transitionBackToSelection();
            },
            buttonText: '',
            buttonScale: layout.backButton.scale,
        }).setDepth(99);


        if (orientation.isPortrait) {
            const randomizeLayout = layout.randomizeButton;
            const lineLayout = layout.purpleLines;
            const removeAllLayout = layout.removeAllButton;
            const finishLayout = layout.minigameFinishButton;

            scene.background.y = layout.background.y / 1.5;
            scene.purpleLine1 = scene.add.image(
                randomizeLayout.x + lineLayout.offsetX,
                lineLayout.randomize.y,
                'buttonIcon2Highlighted'
            ).setScale(lineLayout.scale).setDepth(99);

            scene.purpleLine2 = scene.add.image(
                removeAllLayout.x + lineLayout.offsetX,
                lineLayout.removeAll.y,
                'buttonIcon2Highlighted'
            ).setScale(lineLayout.scale).setDepth(99);

            scene.purpleLine3 = scene.add.image(
                finishLayout.x + lineLayout.offsetX - 15,
                lineLayout.finish.y,
                'buttonIcon2Highlighted'
            ).setScale(lineLayout.scale).setDepth(99);

            scene.randomizeButton = new UIButton(scene, scene.AudioManager, {
                x: randomizeLayout.x,
                y: randomizeLayout.y,
                textureButton: 'blueButton',
                textureIcon: { atlas: 'Icon_spritesheet', frame: 'Random_Box_Icon.png' },
                iconScale: randomizeLayout.iconScale,
                buttonScale: randomizeLayout.scale,
                callback: () => {
                    if (scene.state === GameState.MAKEUP) {
                        scene.MakeUpManager.removeAllMakeup();
                        Object.keys(scene.makeUpButtons).forEach(makeUpType => {
                            const buttons = scene.makeUpButtons[makeUpType];
                            const randomIndex = Math.floor(Math.random() * buttons.length);
                            console.log(buttons[randomIndex]);
                            buttons[randomIndex].toggleMakeUp();
                        });
                    } else if (scene.state === GameState.DRESSUP) {
                        scene.DressUpManager.removeAllOutfits();
                        scene.DressUpManager.randomizeOutfit();
                    }
                }
            }).setDepth(99);

            scene.removeAllButton = new UIButton(scene, scene.AudioManager, {
                x: layout.removeAllButton.x,
                y: layout.removeAllButton.y,
                textureButton: 'blueButton',
                buttonWidth: 75,
                buttonHeight: 75,
                textureIcon: { atlas: 'Icon_spritesheet', frame: 'Remove_Button.png' },
                iconYPosition: -5,

                iconScale: layout.removeAllButton.iconScale,
                callback: () => {
                    if (scene.state === GameState.MAKEUP) {
                        scene.MakeUpManager?.removeAllMakeup();
                    } else if (scene.state === GameState.DRESSUP) {
                        scene.DressUpManager?.removeAllOutfits();
                    }
                },
                buttonText: '',
                textSize: 24,
                textYPosition: 60,

                buttonScale: layout.removeAllButton.buttonScale,
            }).setDepth(99);


            scene.finishButton = new UIButton(scene, this.AudioManager, {
                x: finishLayout.x,
                y: finishLayout.y,
                textureButton: finishLayout.texture,
                textureIcon: 'tickMark',
                iconScale: finishLayout.iconScale,
                buttonScale: finishLayout.buttonScale,
                callback: () => {
                    scene.finishButton.disableInteractive();
                    if (scene.state === GameState.DRESSUP) {
                        if (this.canContinueToScene2()) {
                            this.showConfirmationPanel();
                        } else {
                            this.incompletePanel = this.createIncompletePanel();
                            this.scene.tweens.add({ targets: this.incompletePanel, scale: 1, duration: 200, ease: 'Back.Out' });
                        }
                    } else {
                        this.showConfirmationPanel();
                    }
                }
            }).setDepth(99).setScale(3);
        } else {

            scene.purpleLine1 = scene.add.image(layout.randomizeButton.x - 90, layout.randomizeButton.y, 'buttonIcon2Highlighted').setScale(0.3).setDepth(99);
            scene.purpleLine2 = scene.add.image(layout.removeAllButton.x - 90, layout.removeAllButton.y, 'buttonIcon2Highlighted').setScale(0.3).setDepth(99);
            scene.purpleLine3 = scene.add.image(layout.minigameFinishButton.x - 110, layout.minigameFinishButton.y, 'buttonIcon2Highlighted').setScale(0.3).setDepth(99);

            scene.randomizeButton = new UIButton(scene, scene.AudioManager, {
                x: layout.randomizeButton.x,
                y: layout.randomizeButton.y,
                textureButton: 'blueButton',
                buttonWidth: 75,
                buttonHeight: 75,
                textureIcon: { atlas: 'Icon_spritesheet', frame: 'Random_Box_Icon.png' },
                iconYPosition: -5,
                callback: () => {
                    if (scene.state === GameState.MAKEUP) {
                        scene.MakeUpManager.removeAllMakeup();
                        Object.keys(scene.makeUpButtons).forEach(makeUpType => {
                            const buttons = scene.makeUpButtons[makeUpType];
                            const randomIndex = Math.floor(Math.random() * buttons.length);
                            buttons[randomIndex].toggleMakeUp();
                        });
                    } else if (scene.state === GameState.DRESSUP) {
                        scene.DressUpManager.removeAllOutfits();
                        scene.DressUpManager.randomizeOutfit();
                    }
                },
                iconScale: layout.randomizeButton.iconScale,
                buttonScale: layout.randomizeButton.scale
            }).setDepth(99);

            const btnLayout = layout.actionButtons;
            scene.removeAllButton = new UIButton(scene, scene.AudioManager, {
                x: layout.removeAllButton.x,
                y: layout.removeAllButton.y,
                textureButton: 'blueButton',
                buttonWidth: 75,
                buttonHeight: 75,
                textureIcon: { atlas: 'Icon_spritesheet', frame: 'Remove_Button.png' },
                iconYPosition: -5,
                iconScale: layout.removeAllButton.iconScale,
                callback: () => {
                    if (scene.state === GameState.MAKEUP) {
                        scene.MakeUpManager?.removeAllMakeup();
                    } else if (scene.state === GameState.DRESSUP) {
                        scene.DressUpManager?.removeAllOutfits();
                    }
                },
                buttonText: '',
                buttonScale: layout.removeAllButton.buttonScale,
            }).setDepth(100);;

            scene.finishButton = new UIButton(scene, this.AudioManager, {
                x: layout.minigameFinishButton.x,
                y: layout.minigameFinishButton.y,
                textureButton: 'yellowButton',
                buttonWidth: layout.minigameFinishButton.width,
                buttonHeight: layout.minigameFinishButton.height,
                textureIcon: 'tickMark',
                iconYPosition: 0,
                iconScale: layout.minigameFinishButton.iconScale,
                callback: () => {
                    scene.finishButton.disableInteractive();
                    if (scene.state === GameState.DRESSUP) {
                        if (this.canContinueToScene2()) {
                            this.showConfirmationPanel();
                        } else {
                            this.incompletePanel = this.createIncompletePanel();
                            this.scene.tweens.add({ targets: this.incompletePanel, scale: 1, duration: 200, ease: 'Back.Out' });
                        }
                    } else {
                        this.showConfirmationPanel();
                    }
                },
                buttonText: '',
                useNineSlice: layout.minigameFinishButton.useNineSlice !== false,
                buttonScale: layout.minigameFinishButton.buttonScale,
            }).setDepth(99);
            scene.flower1 = scene.add.image(layout.minigameFinishButton.x + 60, layout.minigameFinishButton.y + 70, 'flowers').setScale(0.3).setDepth(99);
            scene.flower1.angle = 90;
        }

        this.setupPanels(scene);

        if (scene.categorySidePanel) {
            scene.tweens.add({
                targets: scene.categorySidePanel,
                t: 0,
                duration: 500,
                ease: 'Sine.easeInOut'
            })
        }
    }

    clearMinigameUI() {
        const scene = this.scene;
        console.log("[MiniGameManager] Clearing Minigame UI for selection screen transition.");

        this.scene.topBlocker?.destroy()
        scene.backToSelectionButton?.destroy();
        scene.removeAllButton?.destroy();

        scene.finishButton?.destroy();

        scene.finishButton = null;

        scene.purpleLine1?.destroy();
        scene.purpleLine2?.destroy();
        scene.purpleLine3?.destroy();
        scene.flower1?.destroy();
        scene.flower2?.destroy();
        scene.flower3?.destroy();
        scene.statPanelContainer?.destroy();
        scene.applyMakeUpContainer?.destroy();
        scene.sidePanel?.destroy();
        scene.panelDivider?.destroy();
        scene.categorySidePanel?.destroy();
        this.backButton?.destroy();
        scene.randomizeButton?.destroy();
        scene.dressUpCategoryButtons?.forEach(buttons => buttons.destroy());
        scene.makeUpCategoryButtons?.forEach(buttons => buttons.destroy());
        scene.finishMiniGameButton?.destroy();

        scene.sidePanelHeaderText?.destroy();
        scene.sidePanelLine?.destroy();
        scene.sidePanelIcon?.destroy();

        scene.backToSelectionButton = null;
        scene.removeAllButton = null;

        scene.randomizeButton = null;
        scene.finishButton = null;
        scene.statPanelContainer = null;
        scene.sidePanel = null;
        scene.categorySidePanel = null;
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


        this.scene.finishButton?.resetVisuals();
        this.scene.finishMiniGameButton?.resetVisuals();

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

        const panel = this.scene.add.nineslice(0, 0, 'dialogueBox', '', layout.confirmationPanel.width, layout.confirmationPanel.height, 128, 128, 64, 68)
            .setDepth(101);

        const text = this.scene.add.text(0, -20, questionText, {
            fontSize: '36px',
            fontFamily: 'regularFont',
            color: '#d6525f',
            align: 'center',
            lineSpacing: 10,
            wordWrap: { width: layout.confirmationPanel.wordWrap }
        }).setOrigin(0.5).setDepth(102);

        const yesButton = new UIButton(this.scene, this.AudioManager, {
            x: 120,
            y: 170,
            textureButton: 'yellowButton',
            textureIcon: 'tickMark',
            iconYPosition: 0,
            iconScale: 0.8,
            callback: () => {
                this.finishMiniGame(state);
            },
            buttonText: '',
            buttonScale: 0.4
        })

        const noButton = new UIButton(this.scene, this.AudioManager, {
            x: -120,
            y: 170,
            textureButton: 'blueButton',
            textureIcon: 'crossMark',
            iconYPosition: 0,
            iconScale: 0.3,
            callback: () => {
                this.closeConfirmationPanel();
            },
            buttonText: '',
            buttonScale: 0.3
        })
        const container = this.scene.add.container(centerX, centerY, [panel, text, yesButton, noButton]);
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

        const panel = this.scene.add.nineslice(0, 0, 'dialogueBox', '', 690, 390, 128, 128, 64, 68)
            .setDepth(101);

        const okButton = new GeneralButton(this.scene, 0, 60, 'readyButtonIcon', null, 'OK',
            () => this.closeConfirmationPanel(), this.scene.AudioManager).setDepth(151);


        const container = this.scene.add.container(centerX, centerY, [panel, text, okButton]);
        return container.setDepth(1000).setScale(0);
    }

    createEndingConfirmationPanel() {
        const centerX = this.scene.scale.width / 2;
        const centerY = this.scene.scale.height / 2;

        this.scene.darkOverlay.setVisible(true);

        this.disableInteraction()
        const panel = this.scene.add.nineslice(0, 0, 'dialogueBox', '', 690, 390, 128, 128, 64, 68)
            .setDepth(101);

        const text = this.scene.add.text(0, -20, 'Are you sure about the make up and outfit you chose?', {
            fontSize: '32px',
            fontFamily: 'regularFont',
            color: '#d6525f',
            align: 'center',
            wordWrap: { width: 500 },
            lineSpacing: 10
        }).setOrigin(0.5).setDepth(102);

        const yesButton = new UIButton(this.scene, this.AudioManager, {
            x: 120,
            y: 170,
            textureButton: 'yellowButton',
            textureIcon: 'tickMark',
            iconYPosition: 0,
            iconScale: 0.8,
            callback: () => {
                this.transitionToCutscene();
            },
            buttonText: '',
            buttonScale: 0.4
        })

        const noButton = new UIButton(this.scene, this.AudioManager, {
            x: -120,
            y: 170,
            textureButton: 'blueButton',
            textureIcon: 'crossMark',
            iconYPosition: 0,
            iconScale: 0.3,
            callback: () => {
                this.closeConfirmationPanel();
            },
            buttonText: '',
            buttonScale: 0.3
        })
        const container = this.scene.add.container(centerX, centerY, [panel, text, yesButton, noButton]);
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
        this.scene.CutsceneSystem.cleanupEmitters();

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

    setupPanels(scene) {
        if (orientation.isPortrait) {
            this.setUpBottomPanel_Portrait(scene);
        } else {
            this.setUpSidePanel_Landscape(scene);
        }
    }
    setUpBottomPanel_Portrait(scene) {
        const catLayout = layout.categoryBar;
        const panelLayout = layout.bottomPanel;
        scene.input.topOnly = false;

        const categoryButtons = scene.state === GameState.DRESSUP ? scene.dressUpCategoryButtons : scene.makeUpCategoryButtons;

        if (!Array.isArray(categoryButtons) || categoryButtons.length === 0) {
            console.error("FATAL: categoryButtons is not valid.");
            return;
        }

        const categorySizer = scene.rexUI.add.sizer({
            x: catLayout.x,
            y: catLayout.y,
            orientation: 'x',
            space: { item: catLayout.space.column }
        }).setDepth(11);

        categoryButtons.forEach(btn => {
            if (btn) {
                categorySizer.add(btn, { padding: { left: 5, right: 5 } });
            }
        });
        categorySizer.layout();
        let categoryWidth = categorySizer.width;


        const targetViewport = Math.max(200, catLayout.width);
        let panelWidth = Math.min(targetViewport, categoryWidth - 40);


        if (panelWidth <= 0 || panelWidth >= categoryWidth) {
            const bufferRight = Math.max(120, Math.floor((targetViewport * 0.5)));

            categorySizer.add(
                scene.add.rectangle(1, 1, 1, 1, 0x000000, 0).setAlpha(0),
                { padding: { right: bufferRight } }
            );
            categorySizer.layout();
            categoryWidth = categorySizer.width;
            panelWidth = Math.min(targetViewport * 100, categoryWidth - 40);
        }
        const scrollPanel = scene.rexUI.add.scrollablePanel({
            x: catLayout.x + 100,
            y: catLayout.y - 80,
            width: panelWidth + 400,
            height: catLayout.height - 500,
            scrollMode: 1,
            scrollDetectionMode: 0,
            panel: {
                child: categorySizer,
                mask: { padding: { top: 150, left: 150, bottom: 0, right: 20 } }
            },
            mouseWheelScroller: { speed: 1, focus: false },
            clampChildOX: false,


            slider: false
        }).setOrigin(0.5, 0).layout();

        scene.add.existing(scrollPanel);
        scene.scrollPanel = scrollPanel;





        this.buttonGrid = scene.rexUI.add.gridSizer({
            column: 1,
            row: 1
        });
        this.innerSizer = scene.rexUI.add.sizer({ orientation: 'y', space: { top: 0, left: 30 } });
        this.innerSizer.add(scene.rexUI.add.space(0, 0));
        this.innerSizer.add(this.buttonGrid, { expand: true });
        scene.panelDivider = scene.add.nineslice(layout.sidePanel.x - 60, layout.sidePanel.y + 380, 'sidePanelDividerPortrait', '', 720, 90, 60, 60, 40, 60).setDepth(99);

        scene.flower2 = scene.add.image(layout.sidePanel.x - 325, layout.sidePanel.y + 395, 'flowers').setScale(0.27).setDepth(99)
        scene.flower2.angle = 270;

        scene.sidePanel = scene.rexUI.add.scrollablePanel({
            x: panelLayout.x, y: panelLayout.y,
            width: panelLayout.width, height: panelLayout.height,
            scrollMode: 0,
            background: scene.add.nineslice(0, 0, 'sidePanelPortrait', '', panelLayout.width, panelLayout.height, 20, 20, 20, 20),
            panel: {
                child: this.innerSizer,
                inputHitArea: false
            },
            scroller: { slider: false },
            space: panelLayout.space,
        }).layout().setDepth(11).setT(0.1);

        const maskBounds = new Phaser.Geom.Rectangle(
            scene.sidePanel.x - scene.sidePanel.width * scene.sidePanel.originX,
            scene.sidePanel.y - scene.sidePanel.height * scene.sidePanel.originY + 300,
            scene.sidePanel.width,
            scene.sidePanel.height
        );
        const catBounds = scene.scrollPanel.getBounds();


        const topBlocker = scene.add.rectangle(
            catBounds.centerX - 30,
            catBounds.centerY - 10,
            catBounds.width + 150,
            catBounds.height,
            0xff0000, 0
        )
            .setInteractive()
            .setDepth(100);

        let activeButton = null;
        topBlocker.on('pointerdown', (pointer, localX, localY, event) => {

            const hitObjects = scene.input.hitTestPointer(pointer);

            let targetButton = null;
            let allowEvent = false;
            for (const hit of hitObjects) {
                let parent = hit.parentContainer;
                while (parent) {
                    if (parent instanceof CategoryButton) {
                        targetButton = parent;
                        break;
                    }
                    parent = parent.parentContainer;
                }
                if (targetButton) break;
                if (hit === scene.scrollPanel || scene.scrollPanel.contains?.(hit)) {
                    allowEvent = true;
                    break;
                }
            }

            if (targetButton) {

                activeButton = targetButton;
                activeButton.button.emit('pointerdown', pointer);
            } else if (!(hitObjects.includes(scene.scrollPanel) || hitObjects.some(h => scene.scrollPanel.contains?.(h)))) {
                // kalau bukan button & bukan scrollPanel, baru block
                event.stopPropagation();
            }
        });


        topBlocker.on('pointerup', (pointer) => {

            if (activeButton) {
                activeButton.button.emit('pointerup', pointer);
            }

            activeButton = null;
        });


        topBlocker.on('pointerout', (pointer) => {

            if (activeButton && activeButton.button) {
                activeButton.button.clearTint();

                activeButton.button.emit('pointerout', pointer);
            }
            activeButton = null;
        });

        scene.topBlocker = topBlocker;

        scene.add.rectangle(
            maskBounds.x + maskBounds.width / 2,
            maskBounds.y + maskBounds.height / 2 + 300,
            maskBounds.width,
            maskBounds.height,
            0x00ff00,
            0.3
        ).setDepth(99999999)


        scrollPanel.setInteractive(
            new Phaser.Geom.Rectangle(
                0, 0,
                scrollPanel.width,
                scrollPanel.height
            ),
            Phaser.Geom.Rectangle.Contains
        );
        const bg = scrollPanel.getElement('background');
        if (bg) {
            bg.setInteractive(
                new Phaser.Geom.Rectangle(0, 0, scrollPanel.width, scrollPanel.height),
                Phaser.Geom.Rectangle.Contains
            );
        }
        console.log(
            `[Category Scroll Portrait] contentWidth=${categoryWidth}, panelWidth=${panelWidth}, ` +
            `targetViewport=${targetViewport}`
        );
    }

    setUpSidePanel_Landscape(scene) {
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


        const sidePanel = this.scene.add.image(0, 0, 'sidePanel').setDepth(10).setScale(1.5);

        this.innerSizer = scene.rexUI.add.sizer({
            orientation: 0,
            space: { top: 70, left: 0 }
        });

        this.innerSizer.add(this.buttonGrid, 0, 'center', {}, false);


        this.scene.sidePanel = this.scene.rexUI.add.scrollablePanel({
            x: layout.sidePanel.x,
            y: layout.sidePanel.y,
            width: layout.sidePanel.width,
            height: layout.sidePanel.height,
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
                    padding: 10
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
            fill: '#d6529c',
            fontFamily: 'regularFont',
            wordWrap: { width: this.scene.scale.width - 120 }
        }).setDepth(10).setOrigin(0.5, 0.5);
        this.scene.sidePanelIcon = this.scene.add.image(layout.sidePanelIcon.x, layout.sidePanelIcon.y, panelIcon).setDepth(10).setScale(0.8);
        this.scene.sidePanelLine = this.scene.add.image(layout.sidePanelLine.x, layout.sidePanelLine.y, 'sidePanelLine').setDepth(10).setScale(2).setDisplaySize(480, 5);
        this.scene.sidePanelLine.setTint(0xD6529C);

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

        scene.panelDivider = scene.add.nineslice(layout.sidePanel.x - 350, layout.sidePanel.y, 'sidePanelDivider', '', 100, 1080, 60, 60, 40, 60).setDepth(99);

        scene.flower2 = scene.add.image(layout.sidePanel.x - 325, layout.sidePanel.y - 400, 'flowers').setScale(0.5).setDepth(99)
        scene.flower2.angle = 180;
        scene.flower3 = scene.add.image(layout.sidePanel.x - 325, layout.sidePanel.y + 400, 'flowers').setScale(0.5).setDepth(99)

        if (this.scene.state !== GameState.MAKEUP) return;
        const categoryButtons = this.scene.state === GameState.MAKEUP ? this.scene.makeUpCategoryButtons : null;

        this.categoryButtonGrid = scene.rexUI.add.gridSizer({
            row: categoryButtons.length,
            column: 1,
            rowProportions: 1,
            space: { column: 0, row: 125 },
            align: 'center'
        });

        categoryButtons.forEach((btnContainer, index) => {
            this.categoryButtonGrid.add(btnContainer, 0, index, '', { left: 120, right: 0, top: 40, bottom: 40 }, false);
        });

        //Create scrollable panel for makeup category buttons
        this.scene.categorySidePanel = this.scene.rexUI.add.scrollablePanel({
            x: 1200,
            y: layout.sidePanel.y,
            width: 400,
            height: this.scene.scale.height,
            scrollMode: 0,

            scrollDetectionMode: 1,
            scroller: {
                pointerOutRelease: false,
                rectBoundsInteractive: false
            },

            background: '',
            panel: {
                child: this.categoryButtonGrid,
                align: 'center',
                expand: true,
                mask: {
                    padding: 100
                }
            },

            slider: {
            },

            mouseWheelScroller: {
                focus: false,
                speed: 1
            },

            space: {
                left: layout.categorySidePanel.left,
                right: layout.categorySidePanel.right,
                top: layout.categorySidePanel.top,
                bottom: layout.categorySidePanel.bottom,
                panel: layout.categorySidePanel.panel
            }
        }).layout().setDepth(10).setT(1);
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
        const centerX = this.scene.scale.width / 2;
        const centerY = this.scene.scale.height / 2;
        this.scene.darkOverlay.setVisible(true);

        const confettiKeys = _createConfettiTextures(this.scene);

        if (confettiKeys && confettiKeys.length > 0) {
            const burstConfig = layout.endingPanel.confettiBurst;
            const allEmitters = [];
            const screenHeight = this.scene.scale.height;
            const screenWidth = this.scene.scale.width;

            const confettiConfig = {
                angle: { min: 240, max: 300 }, 
                speed: { min: 400, max: 800 }, 

                
                lifespan: 5000,
                gravityY: 350,

                
                 rotate: { start: -720, end: 720, random: true },

                
                scaleX: { 
                    onEmit: () => { return (Math.random() * 4) - 2; } 
                },
            
                
                scaleY: {
                    onEmit: () => { return 2; } 
                },

                
                emitting: false
            };



            confettiKeys.forEach(key => {
                allEmitters.push(
                    this.scene.add.particles(screenWidth / 2, screenHeight, key, confettiConfig)
                        .setDepth(152)
                );
            });

            const triggerBurst = () => {
                allEmitters.forEach(emitter => {
                    emitter.explode(burstConfig.quantity / 2);
                });
            };

            triggerBurst();


            this.endingPanelTimer = this.scene.time.addEvent({
                delay: 5000,
                callback: triggerBurst,
                loop: true
            });
        }

        const victoryBox = this.scene.add.nineslice(
            centerX,
            centerY - 250,
            'BoxVictory',
            null,
            this.scene.scale.width,
            170,
            50, 50, 40, 40
        ).setAlpha(0);

        const victoryTextStyle = {
            fontSize: '96px',
            fontFamily: 'regularFont',
            color: '#d6525f',
            stroke: '#ffffff',
            strokeThickness: 8
        };

        const victoryText = this.scene.add.text(centerX + 100, centerY - 250, 'VICTORY!', victoryTextStyle)
            .setOrigin(0.5)
            .setAlpha(0);

        const nextLevelButton = new UIButton(this.scene, this.AudioManager, {
            x: layout.nextLevelButton.x,
            y: layout.nextLevelButton.y,
            textureButton: layout.nextLevelButton.texture,
            buttonWidth: layout.nextLevelButton.width,
            buttonHeight: layout.nextLevelButton.height,
            textureIcon: '',
            useNineSlice: layout.nextLevelButton.useNineSlice,
            nineSliceConfig: layout.nextLevelButton.nineSliceConfig,
            iconScale: 1.5,
            callback: () => {
                this.handleGameEnd(false);
                restartButton.disableInteractive();
                nextLevelButton.disableInteractive();
            },
            buttonText: 'Next Level',
            buttonScale: layout.nextLevelButton.buttonScale,
            textSize: layout.nextLevelButton.textSize,
            textYPosition: 0,
            font: 'regularFont',
            textColor: '#d6525f'
        }).setDepth(151).setScale(0);


        const restartButton = new UIButton(this.scene, this.AudioManager, {
            x: layout.restartButton.x,
            y: layout.restartButton.y,
            textureButton: layout.restartButton.texture,
            buttonWidth: layout.restartButton.width,
            buttonHeight: layout.restartButton.height,
            textureIcon: '',
            iconYPosition: 0,
            iconScale: 1.5,
            buttonScale: layout.restartButton.buttonScale,
            callback: () => {
                this.handleGameEnd(true);
                this.restartGame(true);
                nextLevelButton.disableInteractive();
                restartButton.disableInteractive();
            },
            buttonText: 'Restart',
            textSize: layout.restartButton.textSize,
            useNineSlice: layout.restartButton.useNineSlice,
            nineSliceConfig: layout.restartButton.nineSliceConfig,
            font: 'regularFont',
            textColor: '#d6525f'
        }).setDepth(151).setScale(0);


        const container = this.scene.add.container(0, 0, [
            victoryBox,
            victoryText,
            nextLevelButton,
            restartButton
        ]).setDepth(151);

        this.activeConfirmationPanel = container;

        this.scene.tweens.add({
            targets: victoryBox,
            alpha: 1,
            duration: 500,
            ease: 'Sine.easeInOut'
        });

        this.scene.tweens.add({
            targets: victoryText,
            alpha: 1,
            x: centerX,
            duration: 700,
            ease: 'Power2',
            delay: 200
        });

        this.scene.tweens.add({
            targets: [nextLevelButton, restartButton],
            scale: 1, // <- Ubah dari 'alpha' ke 'scale'
            duration: 500,
            ease: 'Back.Out', // Gunakan ease 'Back.Out' untuk efek 'pop'
            delay: 400
        });
    }

    handleGameEnd(isRestart) {
        unlockManager.clearAllUnlocks();
        SaveManager.clearSave();
        progressManager.clearProgress();
        this.scene.CutsceneSystem.cleanupEmitters();
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

        this.scene.AudioManager.stopMusic('cutsceneMusic2');
        this.scene.cameras.main.fadeOut(2000);

        this.scene.cameras.main.once('camerafadeoutcomplete', async () => {
            await poki.commercialBreak();

            this.scene.scene.start('BootScene');

        });
    }
}