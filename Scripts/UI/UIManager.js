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
        scene.background = scene.add.image(centerX / 0.5, centerY, 'background').setScale(1.5);

        // Setup character
        scene.body = scene.add.image(centerX * 1.05, centerY * 2.6, 'player').setScale(1.9).setOrigin(0.5).setDepth(1);
        scene.hair = scene.add.image(centerX, centerY * 1.47, 'hair').setScale(0.8).setOrigin(0.5).setDepth(3); // Keep as is from "after"

        // Create initial facial feature GameObjects
        // These textures are the "visual defaults" when the game starts.
        scene.pupils = scene.add.image(0, 0, 'PupilNormalBlue').setScale(0.55).setDepth(2);
        scene.lips = scene.add.image(0, 0, 'LipNormalDefault').setScale(0.55).setDepth(2);
        scene.eyebrows = scene.add.image(0, 0, 'EyebrowNormalDefault').setScale(0.55).setDepth(2);
        scene.eyelashes = scene.add.image(0, 0, 'EyelashesNormalDefault').setScale(0.55).setDepth(2);

        scene.faceContainer = scene.add.container(centerX * 0.95, centerY / 1.2, [scene.pupils, scene.lips, scene.eyebrows, scene.eyelashes]).setDepth(2);

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

        // console.log("Initial MakeUpButton.selectedMakeUp:", JSON.stringify(MakeUpButton.selectedMakeUp, null, 2)); // For debugging
    }


    createBackButton(scene) {

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

    clearMinigameScene(scene) {
        // 1. Destroy outfit and UI containers
        if (scene.outfitButtons) {
            Object.values(scene.outfitButtons).flat().forEach(button => {
                button.displayedOutfit?.destroy();
                button.container?.destroy();
            });
            scene.outfitButtons = {};
        }

        // 2. Destroy stat panel
        scene.statPanel?.destroy();
        scene.statText?.destroy();
        scene.currentStatText?.destroy();

        // 3. Destroy category panels and buttons
        scene.categoryButtonsPanel?.destroy();
        scene.outfitButtonsTypePanel?.destroy();
        scene.openButton?.destroy();
        scene.continueButton?.destroy();
        scene.backButton?.destroy();

        // 4. Reset outfit selections
        OutfitButton.selectedOutfits = {};

        // 5. Destroy background and player
        scene.body?.destroy();
        scene.hair?.destroy();
        scene.faceContainer?.destroy();
        scene.background?.destroy();
        scene.AudioManager?.fadeOutMusic('minigameMusic', 500);

        // 6. Destroy status message
        scene.statusPanel?.destroy();

        scene.xMark?.destroy();
        scene.failStatusText?.destroy();

        scene.checkMark?.destroy();
        scene.successStatusText?.destroy();
    }

    createContinueButton(scene, x, y) {

        const button = new GeneralButton(scene, x, y, 'emptyButton', 'outfitButtonOutline', 'Lanjut →', () => {
            if (this.scene.state === GameState.DRESSUP) {
                if (this.canContinueToScene2()) {
                    this.scene.TweeningUtils.displayStatusPanel(true);
                    this.scene.AudioManager.playSFX('success');
                    this.scene.ParticleSystem.emitParticle(scene, scene.emitter);
                } else {
                    this.scene.TweeningUtils.displayStatusPanel(false);
                }
            } else if (this.scene.state === GameState.MAKEUP) {
                this.scene.TweeningUtils.transitionMiniGame();
                this.scene.AudioManager.playSFX('success');
            }

        }, scene.AudioManager);

        button.container.setDepth(5);
        scene.continueButton = button.container;
        console.log(scene.continueButton.x);
        console.log(scene.continueButton.y);
    }

    canContinueToScene2() {
        const selected = OutfitButton.selectedOutfits;

        const has = type => !!selected[type]?.current;

        const isSet1 = has("Dress") && has("Shoes");
        const isSet2 = has("Shirt") && has("Underwear") && has("Socks") && has("Shoes");

        return isSet1 || isSet2;
    }
}