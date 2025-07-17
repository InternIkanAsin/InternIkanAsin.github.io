import UIButton, { OutfitButton, GeneralButton, MakeUpButton } from './UIButton.js';

import { GameState } from '../Main.js';

import { makeUpData, defaultMakeUpSkins } from '../Makeup Data/MakeUpData.js';

import { layout } from '../ScreenOrientationUtils.js';


export class UIManager {
    constructor(scene, AudioManager) {
        this.scene = scene;
        scene.panelVisible = false;
        scene.outfitpanelVisible = false;
        this.AudioManager = AudioManager;
    }

    /**
     * @method setupScene - Setup the scene by setting background and character
     */
    setupScene(scene) {


        const bgLayout = layout.background;

        scene.background = scene.add.image(
            bgLayout.x,
            bgLayout.y,
            'background'
        )
            .setOrigin(bgLayout.originX, bgLayout.originY)
            .setScale(bgLayout.scale);


        scene.body = scene.add.image(layout.character.x, layout.character.y, 'player')
            .setScale(layout.character.scale)
            .setOrigin(0.5)
            .setDepth(1);

        const defaultHairTextures = defaultMakeUpSkins['Hair'];



        scene.hairBack = scene.add.image(layout.Hair.zoomOutHairX, layout.Hair.zoomOutHairY, defaultHairTextures.back)
            .setScale(0.5 * 256 / 225)
            .setOrigin(0.5)
            .setDepth(0.9);


        scene.hairFront = scene.add.image(layout.Hair.zoomOutHairX, layout.Hair.zoomOutHairY, defaultHairTextures.front)
            .setScale(0.5 * 256 / 225)
            .setOrigin(0.5)
            .setDepth(7);


        scene.pupils = scene.add.image(0, 0, 'PupilNormalBlue').setScale(0.55 * 2).setDepth(2);
        scene.lips = scene.add.image(0, 0, 'LipNormalDefault').setScale(0.55 * 2).setDepth(2);
        scene.eyebrows = scene.add.image(0, 0, 'EyebrowNormalDefault').setScale(0.55 * 2).setDepth(2);
        scene.eyelashes = scene.add.image(0, 0, 'EyelashesNormalDefault').setScale(0.55 * 2).setDepth(2);

        scene.faceContainer = scene.add.container(layout.face.zoomOutFaceX, layout.face.zoomOutFaceY, [scene.pupils, scene.lips, scene.eyebrows, scene.eyelashes]).setDepth(2).setScale(0.3);
        //Load Assets yang diperlukan untuk dressup
        Object.entries(OutfitButton.selectedOutfits).forEach(([outfitType, outfit]) => {
            scene.load.atlas(
                outfit.current.textureAnime.atlas,
                `Asset/Outfit/${outfitType}/${outfit.current.textureAnime.atlas}.png`,
                `Asset/Outfit/${outfitType}/${outfit.current.textureAnime.atlas}.json`
            );
            console.log(outfit.current.textureAnime.atlas);
        });

        // Wait for all to finish loading, then run a callback
        scene.load.once('complete', () => {
            console.log('All outfit atlases loaded!');

            // You can now safely apply textures
            Object.entries(OutfitButton.selectedOutfits).forEach(([outfitType, equippedOutfit]) => {
                const textureAnime = equippedOutfit?.current?.textureAnime;

                let outfitScale;
                if (outfitType === 'Dress' || outfitType === 'Outer' || outfitType === 'Shirt') {
                    outfitScale = 0.6;
                } else {
                    outfitScale = 1.2
                }

                const outfitManualOffsets = layout.outfit.manualOffsets;

                const baseManualOffset = outfitManualOffsets[textureAnime.name] || { x: 0, y: 0 };
                if (textureAnime) {
                    //To Do: possibly refactor function in OutfitButton to handle this
                    scene.add.image(layout.outfit.positions[outfitType].x + baseManualOffset.x, layout.outfit.positions[outfitType].y + baseManualOffset.y, textureAnime.atlas, textureAnime.frame).setScale(outfitScale).setDepth(100);
                }
            });
        });

        scene.load.start(); // Important to start the dynamic load



        MakeUpButton.selectedMakeUp = {};


        const registerInitialFacialFeature = (makeupType, initialTextureKey, gameObject) => {

            const defaultMakeUpItemData = makeUpData.find(
                item => item.makeUpType === makeupType && item.textureAnime === initialTextureKey
            );

            if (defaultMakeUpItemData) {
                MakeUpButton.selectedMakeUp[makeupType] = {
                    current: {
                        name: defaultMakeUpItemData.name,
                        makeupType: defaultMakeUpItemData.makeUpType,
                        textureAnime: defaultMakeUpItemData.textureAnime,
                        displayedMakeUp: gameObject,
                        isDefault: true
                    },
                    previous: null
                };
                console.log(`Registered initial state for ${makeupType}: ${defaultMakeUpItemData.name} using texture ${initialTextureKey}`);
            } else {


                MakeUpButton.selectedMakeUp[makeupType] = {
                    current: {
                        name: `Initial ${makeupType}`,
                        makeupType: makeupType,
                        textureAnime: initialTextureKey,
                        displayedMakeUp: gameObject,
                        isDefault: true
                    },
                    previous: null
                };
            }
        };


        registerInitialFacialFeature('Pupil', 'PupilNormalBlue', scene.pupils);
        registerInitialFacialFeature('Lips', 'LipNormalDefault', scene.lips);
        registerInitialFacialFeature('Eyebrows', 'EyebrowNormalDefault', scene.eyebrows);
        registerInitialFacialFeature('Eyelashes', 'EyelashesNormalDefault', scene.eyelashes);

        MakeUpButton.selectedMakeUp['Hair'] = {
            current: {
                name: 'Default Hair',
                makeupType: 'Hair',
                textureAnime: defaultHairTextures,
                displayedMakeUp: [scene.hairBack, scene.hairFront],
                isDefault: true
            },
            previous: null
        };


    }

    showLoadingOverlay(text = 'Loading...') {
        const scene = this.scene;
        this.hideLoadingOverlay();

        if (!scene.darkOverlay) {
            scene.darkOverlay = scene.add.rectangle(
                scene.scale.width / 2, scene.scale.height / 2,
                scene.scale.width, scene.scale.height, 0x000000, 0.7
            ).setDepth(200);
        }
        scene.darkOverlay.setVisible(true).setInteractive();

        this.loadingText = scene.add.text(
            scene.scale.width / 2, scene.scale.height / 2,
            text,
            { font: '48px pixelFont', fill: '#ffffff' }
        ).setOrigin(0.5).setDepth(201);
    }

    hideLoadingOverlay() {
        if (this.scene.darkOverlay) {
            this.scene.darkOverlay.setVisible(false).disableInteractive();
        }
        if (this.loadingText) {
            this.loadingText.destroy();
            this.loadingText = null;
        }
    }

    setupStatusPanel(scene) {
        scene.statusPanel = scene.add.nineslice(400, -100, 'statPanel', '', 505, 130, 6, 6, 5, 5);

        scene.xMark = scene.add.image(230, -100, 'xMark').setVisible(false);
        scene.failStatusText = scene.add.text(280, -100, 'Pakaian belum lengkap!', {
            fontSize: '32px',
            fill: '#00000',
            fontFamily: 'pixelFont'
        }).setVisible(false);

        scene.checkMark = scene.add.image(230, -100, 'checkMark').setVisible(false);
        scene.successStatusText = scene.add.text(270, -100, 'Pakaian sudah lengkap! Have fun!', {
            fontSize: '24px',
            fill: '#00000',
            fontFamily: 'pixelFont'
        }).setVisible(false);
    }

    clearMinigameScene(scene) {
        console.log("[UIManager] Clearing Minigame Scene...");

        scene.backToSelectionButton?.destroy();
        scene.removeAllButton?.destroy();
        scene.tipsButton?.destroy();
        scene.finishButton?.destroy();

        scene.makeUpButton?.destroy();
        scene.makeUpTickMark?.destroy();
        scene.dressUpButton?.destroy();
        scene.dressUpTickMark?.destroy();
        scene.miniGameFinishButton?.destroy();
        scene.leftDrape?.destroy();
        scene.rightDrape?.destroy();
        scene.finishMiniGameButton?.destroy();
        if (OutfitButton.selectedOutfits) {

            Object.values(OutfitButton.selectedOutfits).forEach(entry => {
                const currentButton = entry?.current;

                if (currentButton && currentButton.displayedOutfit && typeof currentButton.displayedOutfit.destroy === 'function') {

                    currentButton.displayedOutfit.destroy();
                }
            });
        }

        OutfitButton.selectedOutfits = {};

        if (scene.outfitButtons) {
            Object.values(scene.outfitButtons).flat().forEach(buttonInstance => {
                buttonInstance?.destroy();
            });
            scene.outfitButtons = {};
        }

        if (MakeUpButton.selectedMakeUp) {
            Object.values(MakeUpButton.selectedMakeUp).forEach(entry => {
                const item = entry?.current;
                if (!item) return;

                if (Array.isArray(item.displayedMakeUp)) {
                    item.displayedMakeUp.forEach(img => img?.destroy());
                } else if (item.displayedMakeUp && !item.isDefault) {

                    item.displayedMakeUp?.destroy();
                }
            });
        }


        MakeUpButton.selectedMakeUp = {};


        scene.statPanelContainer?.destroy();
        scene.sidePanel?.destroy();

        if (scene.MiniGameManager) {
            scene.MiniGameManager.backButton?.destroy();
            scene.selectedButtonHeader?.destroy();
        }

        if (scene.MiniGameManager && scene.MiniGameManager.activeConfirmationPanel) {
            scene.MiniGameManager.activeConfirmationPanel.destroy();
        }

        scene.body?.destroy();
        scene.hairFront?.destroy();
        scene.hairBack?.destroy();
        scene.faceContainer?.destroy();
        scene.background?.destroy();

        scene.AudioManager?.fadeOutMusic('minigameMusic', 500);
        console.log("[UIManager] Minigame Scene Cleared.");
    }

    destroySidePanel(scene) {

        if (scene.sidePanel) {
            try {
                scene.sidePanel.iterate(child => {
                    if (child.disableInteractive) {
                        child.disableInteractive();
                    }
                });
                scene.sidePanel.removeAllListeners();
            } catch (e) {
                console.warn("Failed to disable interactivity:", e);
            }
        }


        if (scene.buttons) {
            Object.values(scene.buttons).flat().forEach(button => {
                button?.clearMask?.(true);
                button?.destroy?.();
            });
            scene.buttons = null;
        }


        this.buttonGrid?.destroy();
        this.buttonGrid = null;

        this.innerSizer?.destroy();
        this.innerSizer = null;


        scene.sidePanel?.destroy(true);
        scene.sidePanel = null;

        scene.sidePanelMaskGraphics?.destroy();
        scene.sidePanelMaskGraphics = null;

        scene.selectedButtonHeader?.destroy();
        scene.selectedButtonHeader = null;

        this.backButton?.destroy();
        this.backButton = null;

        this.buttonList = null;
    }



}