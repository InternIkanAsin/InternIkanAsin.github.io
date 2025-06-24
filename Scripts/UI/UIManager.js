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
        // Setup background
        const centerX = scene.cameras.main.centerX;
        const centerY = scene.cameras.main.centerY;

        let isMobile = true;
        const bgScale = isMobile ? 1.2 : 1
        scene.background = scene.add.image(centerX, centerY, 'background').setScale(bgScale);

        // Setup character
        scene.body = scene.add.image(layout.character.x, layout.character.y, 'player')
            .setScale(layout.character.scale)
            .setOrigin(0.5)
            .setDepth(1);

        const defaultHairTextures = defaultMakeUpSkins['Hair'];


        //Back hair
        scene.hairBack = scene.add.image(layout.Hair.zoomOutHairX, layout.Hair.zoomOutHairY, defaultHairTextures.back)
            .setScale(0.25)
            .setOrigin(0.5)
            .setDepth(0.9);

        // Front hair
        scene.hairFront = scene.add.image(layout.Hair.zoomOutHairX, layout.Hair.zoomOutHairY, defaultHairTextures.front)
            .setScale(0.25)
            .setOrigin(0.5)
            .setDepth(6);

        // Create initial facial feature GameObjects
        // These textures are the "visual defaults" when the game starts.
        scene.pupils = scene.add.image(0, 0, 'PupilNormalBlue').setScale(0.55).setDepth(2);
        scene.lips = scene.add.image(0, 0, 'LipNormalDefault').setScale(0.55).setDepth(2);
        scene.eyebrows = scene.add.image(0, 0, 'EyebrowNormalDefault').setScale(0.55).setDepth(2);
        scene.eyelashes = scene.add.image(0, 0, 'EyelashesNormalDefault').setScale(0.55).setDepth(2);

        scene.faceContainer = scene.add.container(layout.face.zoomOutFaceX, layout.face.zoomOutFaceY, [scene.pupils, scene.lips, scene.eyebrows, scene.eyelashes]).setDepth(2).setScale(0.3);

        // --- Initialize MakeUpButton's state for default makeup ---
        MakeUpButton.selectedMakeUp = {}; // CRITICAL: Initialize the static property

        // Helper to register the initial state of facial features with MakeUpButton.selectedMakeUp
        const registerInitialFacialFeature = (makeupType, initialTextureKey, gameObject) => {
            // Find the MakeUp object in makeUpData that corresponds to this initial state.
            // This entry in makeUpData might be one specifically for "Default Lips"
            // or it might be a regular selectable item that also serves as the default.
            const defaultMakeUpItemData = makeUpData.find(
                item => item.makeUpType === makeupType && item.textureAnime === initialTextureKey
            );

            if (defaultMakeUpItemData) {
                MakeUpButton.selectedMakeUp[makeupType] = {
                    current: { // This object represents the currently "equipped" default state
                        name: defaultMakeUpItemData.name,
                        makeupType: defaultMakeUpItemData.makeUpType,
                        textureAnime: defaultMakeUpItemData.textureAnime,
                        displayedMakeUp: gameObject, // The actual Phaser GameObject
                        isDefault: true // Flag this as a default that's currently active
                    },
                    previous: null
                };
                console.log(`Registered initial state for ${makeupType}: ${defaultMakeUpItemData.name} using texture ${initialTextureKey}`);
            } else {
                // This is a more critical warning. If the initial texture (e.g., 'LipNormalDefault')
                // doesn't have a corresponding entry in makeUpData, the system can't fully manage it.
                console.warn(`CRITICAL: Initial texture ${initialTextureKey} for ${makeupType} NOT FOUND in makeUpData.js. Default state might not be managed correctly.`);
                // Fallback: still register the game object so it's known, but with limited info
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

        // Register the initial state of the created facial features
        registerInitialFacialFeature('Pupil', 'PupilNormalBlue', scene.pupils);
        registerInitialFacialFeature('Lips', 'LipNormalDefault', scene.lips);
        registerInitialFacialFeature('Eyebrows', 'EyebrowNormalDefault', scene.eyebrows);
        registerInitialFacialFeature('Eyelashes', 'EyelashesNormalDefault', scene.eyelashes);
        //Register default hair
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

    setupStatusPanel(scene) {
        scene.statusPanel = scene.add.nineslice(400, -100, 'statPanel', '', 505, 130, 6, 6, 5, 5);

        //If outfit is not complete
        scene.xMark = scene.add.image(230, -100, 'xMark').setVisible(false);
        scene.failStatusText = scene.add.text(280, -100, 'Pakaian belum lengkap!', {
            fontSize: '32px',
            fill: '#00000',
            fontFamily: 'pixelFont'
        }).setVisible(false);

        //If outfit is complete
        scene.checkMark = scene.add.image(230, -100, 'checkMark').setVisible(false);
        scene.successStatusText = scene.add.text(270, -100, 'Pakaian sudah lengkap! Have fun!', {
            fontSize: '24px',
            fill: '#00000',
            fontFamily: 'pixelFont'
        }).setVisible(false);
    }

    clearMinigameScene(scene) { // Accept scene as a parameter for clarity
        console.log("[UIManager] Clearing Minigame Scene...");
        // 1. Destroy all button in minigame

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
        // 2. Destroy outfitbutton instance and texture anime
        if (OutfitButton.selectedOutfits) {
            // Iterasi melalui setiap entry di selectedOutfits
            Object.values(OutfitButton.selectedOutfits).forEach(entry => {
                const currentButton = entry?.current;
                // Jika ada tombol yang terpilih dan ia memiliki gambar yang ditampilkan
                if (currentButton && currentButton.displayedOutfit && typeof currentButton.displayedOutfit.destroy === 'function') {
                    // Hancurkan gambar outfit yang sebenarnya
                    currentButton.displayedOutfit.destroy();
                }
            });
        }
        // Reset static state SETELAH semua gambar dihancurkan
        OutfitButton.selectedOutfits = {};


        // Destroy OutfitButton instances
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
                    // Handle hair (array of 2 images)
                    item.displayedMakeUp.forEach(img => img?.destroy());
                } else if (item.displayedMakeUp && !item.isDefault) {
                    // Handle single, non-default makeup images (like stickers, colored blush)
                    item.displayedMakeUp?.destroy();
                }
            });
        }

        // Reset Makeup state
        MakeUpButton.selectedMakeUp = {};

        // 3. Destroy UI panel
        scene.statPanelContainer?.destroy();
        scene.sidePanel?.destroy(); // Destroy Rexui and its objects

        if (scene.MiniGameManager) {
            scene.MiniGameManager.backButton?.destroy();
            scene.selectedButtonHeader?.destroy();
        }

        // Destroy popup
        scene.tipsPanel?.destroy();

        if (scene.MiniGameManager && scene.MiniGameManager.activeConfirmationPanel) {
            scene.MiniGameManager.activeConfirmationPanel.destroy();
        }

        // 4. Destroy Character and Background
        scene.body?.destroy();
        scene.hair?.destroy();
        scene.faceContainer?.destroy();
        scene.background?.destroy();

        scene.AudioManager?.fadeOutMusic('minigameMusic', 500);
        console.log("[UIManager] Minigame Scene Cleared.");
    }

    destroySidePanel(scene) {
        // 1. Disable all child interactivity safely
        if (scene.sidePanel) {
            try {
                scene.sidePanel.iterate(child => {
                    if (child.disableInteractive) {
                        child.disableInteractive();
                    }
                });
                scene.sidePanel.removeAllListeners(); // Optional: remove sidePanel-specific events
            } catch (e) {
                console.warn("Failed to disable interactivity:", e);
            }
        }

        // 2. Destroy buttons
        if (scene.buttons) {
            Object.values(scene.buttons).flat().forEach(button => {
                button?.clearMask?.(true);
                button?.destroy?.();
            });
            scene.buttons = null;
        }

        // 3. Destroy layout
        this.buttonGrid?.destroy();
        this.buttonGrid = null;

        this.innerSizer?.destroy();
        this.innerSizer = null;

        // 4. Destroy panel and mask
        scene.sidePanel?.destroy(true);
        scene.sidePanel = null;

        scene.sidePanelMaskGraphics?.destroy();
        scene.sidePanelMaskGraphics = null;

        // 5. Destroy header and back button
        scene.selectedButtonHeader?.destroy();
        scene.selectedButtonHeader = null;

        this.backButton?.destroy();
        this.backButton = null;

        this.buttonList = null;
    }



}