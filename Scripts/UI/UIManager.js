import UIButton, { OutfitButton, GeneralButton, MakeUpButton } from './UIButton.js';

import { GameState } from '../Main.js';

import { makeUpData, defaultMakeUpSkins } from '../Makeup Data/MakeUpData.js';


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
        const centerX = scene.scale.width / 2;
        const centerY = scene.scale.height / 2;
        scene.background = scene.add.image(centerX, centerY, 'background');

        // Setup character
        scene.body = scene.add.image(centerX * 1.05, centerY * 2.9, 'player').setScale(1.9).setOrigin(0.5).setDepth(1);
        const defaultHairTextureKey = defaultMakeUpSkins['Hair']; // e.g., "hair"
        if (!scene.textures.exists(defaultHairTextureKey)) {
            console.error(`[UIManager] Default hair texture key "${defaultHairTextureKey}" NOT LOADED! Check AssetLoader.`);
            // Fallback or error handling
        }
        scene.hair = scene.add.image(centerX * 1.04, centerY * 1.6, defaultHairTextureKey)
            .setScale(0.8)      // Initial scale for hair
            .setOrigin(0.5)
            .setDepth(3);       // Hair depth
        console.log(`[UIManager] scene.hair created with texture: ${scene.hair.texture.key}`);

        // Create initial facial feature GameObjects
        // These textures are the "visual defaults" when the game starts.
        scene.pupils = scene.add.image(0, 0, 'PupilNormalBlue').setScale(0.55).setDepth(2);
        scene.lips = scene.add.image(0, 0, 'LipNormalDefault').setScale(0.55).setDepth(2);
        scene.eyebrows = scene.add.image(0, 0, 'EyebrowNormalDefault').setScale(0.55).setDepth(2);
        scene.eyelashes = scene.add.image(0, 0, 'EyelashesNormalDefault').setScale(0.55).setDepth(2);

        scene.faceContainer = scene.add.container(centerX * 1.01, centerY / 1.21, [scene.pupils, scene.lips, scene.eyebrows, scene.eyelashes]).setDepth(2);

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
        registerInitialFacialFeature('Hair', defaultHairTextureKey, scene.hair);

        // console.log("Initial MakeUpButton.selectedMakeUp:", JSON.stringify(MakeUpButton.selectedMakeUp, null, 2)); // For debugging
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
        // 1. Destroy OutfitButton instances and their displayed outfits
        if (scene.outfitButtons) {
            Object.values(scene.outfitButtons).flat().forEach(buttonInstance => {
                if (buttonInstance instanceof OutfitButton) { // Ensure it's the correct type
                    buttonInstance.displayedOutfit?.destroy();
                }
                buttonInstance?.destroy(); // Destroy the button container itself
            });
            scene.outfitButtons = {};
        }
        OutfitButton.selectedOutfits = {}; // Reset static selection

        // 1b. Destroy MakeUpButton instances (if they are not meant to persist across minigame sessions)
        // Or if they are part of a RexUI panel that gets destroyed, they might be handled there.
        // For now, let's assume MakeUpManager handles its own buttons if needed.
        // MakeUpButton.selectedMakeUp = {}; // Reset static makeup selection (IMPORTANT)

        // 2. Destroy stat panel elements
        scene.statPanelContainer?.destroy(); // If you have this container
        scene.statPanel?.destroy();          // Destroy individual parts if not in container
        scene.heartIcon?.destroy();
        scene.currentStatText?.destroy();


        // 3. Destroy main UI buttons and panels created by MiniGameManager or UIManager
        scene.miniGameButton?.destroy();
        scene.removeAllButton?.destroy();
        scene.tipsButton?.destroy();
        scene.finishButton?.destroy();

        // Destroy Side Panel and its contents (back button, category header are part of it or managed by MiniGameManager)
        if (scene.MiniGameManager) {
            scene.MiniGameManager.backButton?.destroy(); // Destroy the back button instance
            scene.MiniGameManager.backButton = null;
            scene.selectedButtonHeader?.destroy(); // Destroy the header container
            scene.selectedButtonHeader = null;
        }
        //scene.sidePanel?.destroy(); // <<<< CRITICAL: Destroy the RexUI ScrollablePanel
        //scene.sidePanel = null;
        scene.sidePanel.setVisible(false);

        // Destroy Tips Panel and Confirmation Panel if they exist
        scene.tipsPanel?.destroy();
        scene.tipsPanel = null;
        scene.tipsTitleText?.destroy();
        scene.closeButton?.destroy();


        scene.confirmationPanelContainer?.destroy();
        scene.incompleteOutfitPanelContainer?.destroy();
        scene.darkOverlay?.destroy(); // The general dark overlay

        // 4. Reset any specific selections (OutfitButton.selectedOutfits already done)
        MakeUpButton.selectedMakeUp = {}; // Reset selected makeup

        // 5. Destroy character and background
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


    canContinueToScene2() {
        const selected = OutfitButton.selectedOutfits;

        const has = type => !!selected[type]?.current;

        const isSet1 = has("Dress") && has("Shoes");
        const isSet2 = has("Shirt") && has("Underwear") && has("Socks") && has("Shoes");

        return isSet1 || isSet2;
    }
}