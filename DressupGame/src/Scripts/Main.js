import PreloaderScene from './Loading Scene/PreloaderScene.js';

import BootScene from './Loading Scene/BootScene.js';

import UIButton from './UI/UIButton.js';

import AssetLoader from './AssetLoader.js'

import { PokiPlugin } from '@poki/phaser-3';

import { progressManager } from './Save System/ProgressManager.js';

import Phaser from 'phaser';

import { defaultMakeUpSkins } from './Makeup Data/MakeUpData.js';

import { lockedItemsManager } from './Save System/LockedItemsManager.js';

import TweenUtils from './TweeningUtils.js'

import { UIManager } from './UI/UIManager.js'

import { MiniGameManager } from './Minigame/MiniGameManager.js'

import { SaveManager } from './Save System/SaveManager.js';

import { DressUpManager } from './Minigame/DressUpManager.js'

import { MakeUpManager } from './Minigame/MakeUpManager.js'

import { OutfitButton, MakeUpButton } from './UI/UIButton.js'

import { DialogueManager } from './Dialogue System/DialogueManager.js'

import { CutsceneSystem } from './Scene System/CutsceneSystem.js'

import { SceneManager } from './Scene System/SceneManager.js'

import { statTracker } from './Outfit Data/CostumeManager.js'

import { AudioManager } from './Audio System/AudioManager.js'

import { InteractiveMakeupSystem } from './Minigame/InteractiveMakeupSystem.js';

import { BachelorManager } from './Bachelor/bachelorManager.js'

import { layout } from './ScreenOrientationUtils.js';
 
function loadFont(name, url) {
    const newFont = new FontFace(name, `url(${url})`);
    newFont.load().then(function (loaded) {
        document.fonts.add(loaded);
        console.log(`Font "${name}" has been loaded.`);
    }).catch(function (error) {
        console.error(`Failed to load font "${name}":`, error);
    });
}

export const GameState = Object.freeze({
    MAKEUP: 'MAKEUP',
    DRESSUP: 'DRESSUP'
});


class Main extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    shutdown() {
        this.input.removeAllListeners();
        this.events.removeAllListeners();

        this.tweens.killAll();
        this.time.removeAllEvents();

        this.darkOverlay?.destroy();
        this.leftDrape?.destroy();
        this.rightDrape?.destroy();
        this.leftCurtain?.destroy();
        this.rightCurtain?.destroy();
        
        if (this.UIManager) {
            this.UIManager.clearMinigameScene(this);
        }

        OutfitButton.selectedOutfits = {};
        MakeUpButton.selectedMakeUp = {};
        
        unlockManager.clearAllUnlocks(); 
        progressManager.clearProgress(); 
        lockedItemsManager.clearLockedItems(); 

        
    }

    init(data) {
        OutfitButton.selectedOutfits = {};
        MakeUpButton.selectedMakeUp = {};
        this.animatedCategories = new Set();
        console.log("[Main.init] Static states (selectedOutfits, selectedMakeUp) have been reset.");
        this.isTransitioning = false;
        this.areShoesLoaded = false;
        this.areSocksLoaded = false;
        this.areLowersLoaded = false;
        this.areOutersLoaded = false;
        this.areEyelashesLoaded = false;
        this.areEyebrowsLoaded = false;
        this.areEyelinerLoaded = false;
        this.areEyeshadowsLoaded = false;
        this.areLipsLoaded = false;
        this.arePupilsLoaded = false;
        this.areBlushLoaded = false;
        this.areStickersLoaded = false;
        this.areHairLoaded = false;
        this.areDressesAndShirtsLoaded = false;
        console.log("[Main.init] Scene flags have been reset.");
        this.chosenBachelorName = data.bachelorName;
        console.log(`MainScene: Memulai game dengan bachelor: ${this.chosenBachelorName}`);
    }

    preload() {
        loadFont('pixelFont', 'Asset/Font/Pixellari.ttf');
        loadFont('regularFont', 'Asset/Font/sourcesanspro-bold.ttf');
        AssetLoader.loadRexUIPlugin(this);
    }

    create() {
        this.isTransitioning = false;
        this.areShoesLoaded = false;
        this.areSocksLoaded = false;
        this.areLowersLoaded = false;
        this.areOutersLoaded = false;

        this.areEyelashesLoaded = false;
        this.areEyelinerLoaded = false;
        this.areEyeshadowsLoaded = false;
        this.areEyebrowsLoaded = false;
        this.areLipsLoaded = false;
        this.arePupilsLoaded = false;
        this.areBlushLoaded = false;
        this.areStickersLoaded = false;
        this.areHairLoaded = false;
        this.animatedCategories = new Set();
        this.areDressesAndShirtsLoaded = false;
        this.initializeSystems();
        lockedItemsManager.initialize();
        OutfitButton.selectedOutfits = {};
        MakeUpButton.selectedMakeUp = {};
        this.makeUpFinished = progressManager.makeUpFinished;
        this.dressUpFinished = progressManager.dressUpFinished;
        MakeUpButton.selectedMakeUp = {};
        const defaultHairTextures = defaultMakeUpSkins['Hair'];
        const registerDefault = (type, name, texture) => {
            MakeUpButton.selectedMakeUp[type] = {
                current: { name, makeupType: type, textureAnime: texture, displayedMakeUp: null, isDefault: true },
                previous: null
            };
        };
        registerDefault('Pupil', 'Default Pupil', 'PupilNormalBlue');
        registerDefault('Lips', 'Default Lips', 'LipNormalDefault');
        registerDefault('Eyebrows', 'Default Eyebrows', 'EyebrowNormalDefault');
        registerDefault('Eyelashes', 'Default Eyelashes', 'EyelashesNormalDefault');
        registerDefault('Hair', 'Default Hair', defaultHairTextures);

        const savedData = this.SaveManager.loadGame();
        this.makeUpFinished = progressManager.makeUpFinished;
        this.dressUpFinished = progressManager.dressUpFinished;

        if (savedData && savedData.playerAppearance) {
            console.log("Save file found. Merging saved state over defaults.");
            this.chosenBachelorName = savedData.bachelor?.chosenName || this.chosenBachelorName;

            Object.assign(OutfitButton.selectedOutfits, savedData.playerAppearance.outfits || {});
            Object.assign(MakeUpButton.selectedMakeUp, savedData.playerAppearance.makeup || {});
        }

        this.state = GameState.MAKEUP;

        this.startGameFlow();

    }

    createSelectionScreen() {
        console.log("[Main.js] Creating Minigame Selection Screen.");
        const scene = this;
        const centerY = scene.scale.height / 2;
        scene.UIManager.setupScene(scene);
        scene.leftDrape = scene.add.image(layout.drapes.closed.leftX, centerY, 'leftDrape').setDepth(101).setScale(2);
        scene.rightDrape = scene.add.image(layout.drapes.closed.rightX, centerY, 'rightDrape').setDepth(101).setScale(2);

        if (layout.drapes.displayHeight) {
            scene.leftDrape.setDisplaySize(scene.leftDrape.width, layout.drapes.displayHeight);
            scene.rightDrape.setDisplaySize(scene.rightDrape.width, layout.drapes.displayHeight);
        }

        scene.leftCurtain = scene.add.image(
            layout.curtain.closed.leftX,
            centerY,
            layout.curtain.leftTexture
        ).setDepth(102).setScale(2);

        scene.rightCurtain = scene.add.image(
            layout.curtain.closed.rightX,
            centerY,
            layout.curtain.rightTexture
        ).setDepth(102).setScale(2);

        this.createSelectionButtons();

        this.MiniGameManager.disableInteraction();
        
        scene.cameras.main.once('camerafadeincomplete', () => {
            
            this.TweeningUtils.openDrapesHalfway(1000);
        });
    }

    createSelectionButtons() {
        const scene = this;
        const btnLayout = layout.selectionButtons; 

        this.dressUpButton = new UIButton(scene, scene.AudioManager, {
            x: btnLayout.dressUpX,
            y: btnLayout.y,
            textureButton: 'buttonIcon',
            buttonWidth: 75,
            buttonHeight: 75,
            textureIcon: 'dressButtonIcon',
            iconYPosition: -10,
            iconScale: 0.8 * 2,
            callback: () => {
                this.dressUpButton.disableInteractive();
                this.makeUpButton.disableInteractive();
                if (this.isTransitioning) return;


                this.isTransitioning = true;
                this.dressUpButton.disableInteractive();
                this.makeUpButton.disableInteractive();

                this.transitionToMinigame(GameState.DRESSUP);
            },
            buttonText: '',
            buttonScale: btnLayout.scale, 
        }).setDepth(99);

        if (this.dressUpFinished && this.MiniGameManager.canContinueToScene2()) {
            this.dressUpTickMark = scene.add.image(
                btnLayout.dressUpX + btnLayout.tickMarkOffsetX,
                btnLayout.y + btnLayout.tickMarkOffsetY,
                'tickMark'
            ).setDepth(100.1).setScale(0.7);
        }

        this.makeUpButton = new UIButton(scene, scene.AudioManager, {
            x: btnLayout.makeUpX,
            y: btnLayout.y,
            textureButton: 'buttonIcon',
            buttonWidth: 75,
            buttonHeight: 75,
            textureIcon: 'makeUpButtonIcon',
            iconYPosition: -10,
            iconScale: 0.8 * 2,
            callback: () => {

                this.dressUpButton.disableInteractive();
                this.makeUpButton.disableInteractive();
                if (this.isTransitioning) return;


                this.isTransitioning = true;
                this.dressUpButton.disableInteractive();
                this.makeUpButton.disableInteractive();

                this.transitionToMinigame(GameState.MAKEUP);
            },
            buttonText: '',
            buttonScale: btnLayout.scale, 
        }).setDepth(99);

        if (this.makeUpFinished) {
            this.makeUpTickMark = scene.add.image(
                btnLayout.makeUpX + btnLayout.tickMarkOffsetX,
                btnLayout.y + btnLayout.tickMarkOffsetY,
                'tickMark'
            ).setDepth(100.1).setScale(0.7);
        }

        if (this.finishMiniGameButton) this.finishMiniGameButton.destroy();
        this.finishMiniGameButton = new UIButton(scene, this.AudioManager, {
            x: layout.finishButton.x,
            y: layout.finishButton.y,
            textureButton: 'readyButtonIcon',
            buttonWidth: 600,
            buttonHeight: 150,
            textureIcon: '',
            iconYPosition: 0,
            iconScale: 1.5,
            callback: () => { this.MiniGameManager.transitionMiniGame() },
            buttonText: 'READY',
            textSize: layout.finishButton.textSize,
            textYPosition: 0,
            font: 'regularFont',
            useNineSlice: true,
            textColor: '#d6525f'
        });

    }


    transitionToMinigame(gameState) {
        this.dressUpButton.disableInteractive();
        this.makeUpButton.disableInteractive();
        this.state = gameState; 
        console.log(`[Main.js] Transitioning to ${gameState} mode.`);
        this.TweeningUtils.closeDrapes(500, async () => {
            if (this.dressUpButton) this.dressUpButton.destroy();
            if (this.makeUpButton) this.makeUpButton.destroy();
            if (this.dressUpTickMark) this.dressUpTickMark.destroy();
            if (this.makeUpTickMark) this.makeUpTickMark.destroy();
            if (this.miniGameFinishButton) this.miniGameFinishButton.destroy();

            if (this.finishMiniGameButton) {
                this.finishMiniGameButton.destroy();
                this.finishMiniGameButton = null;
            }

            this.dressUpButton = null;
            this.makeUpButton = null;

            if (gameState === GameState.DRESSUP) {
                if (!this.dressUpLoaded) {
                    await AssetLoader.loadDressUpAssets(this);
                    this.dressUpLoaded = true;
                }
                this.TweeningUtils.zoomOut();
            } else {
                if (!this.makeUpLoaded) {
                    await AssetLoader.loadMakeUpAssets(this);
                    this.makeUpLoaded = true;
                }
                this.TweeningUtils.zoomIn();
            }

            this.setUpMiniGame();
            if (gameState === GameState.DRESSUP) {
                this.DressUpManager.displayDressUpButtons('Dress', this);
            } else {
                this.MakeUpManager.displayMakeUpButtons('Eyebrows', this);
            }
            this.TweeningUtils.openDrapes(1000, () => {
                console.log("[Transition] Lock released.");
                this.isTransitioning = false;
            });
        });
        console.log(OutfitButton.selectedOutfits['Dress']);
        console.log(OutfitButton.selectedOutfits['Shoes']);
    }

    initializeSystems() {
        this.DialogueManager = new DialogueManager(this);
        this.CutsceneSystem = new CutsceneSystem(this);
        this.statTracker = new statTracker(this);
        this.AudioManager = new AudioManager(this);
        this.OutfitButton = OutfitButton;
        this.SaveManager = SaveManager;
        this.AudioManager.initializeSounds();
        this.UIManager = new UIManager(this, this.AudioManager);
        this.MiniGameManager = new MiniGameManager(this, this.AudioManager);
        this.DressUpManager = new DressUpManager(this, this.AudioManager);

        this.MakeUpManager = new MakeUpManager(this, this.AudioManager);
        this.SceneManager = new SceneManager(this);
        this.TweeningUtils = new TweenUtils(this);
        this.interactiveMakeupSystem = new InteractiveMakeupSystem(this);
        this.BachelorManager = new BachelorManager(this);
    }

    startGameFlow() {


        const bachelorData = this.BachelorManager.initializeAndSelectBachelor(this.chosenBachelorName);
        this.SaveManager.saveBachelorChoice(this.chosenBachelorName);

        this.chosenBachelor = bachelorData.bachelorSprite;
        this.chosenBachelorExpression = bachelorData.bachelorExpression;


        this.darkOverlay = this.add.rectangle(
            this.scale.width / 2,
            this.scale.height / 2,
            this.scale.width,
            this.scale.height,
            0x000000,
            0.5
        ).setDepth(150).setVisible(false);

        this.DialogueManager.createDialogueUI();


        this.CutsceneSystem.initiateCutscene1(this.chosenBachelor, this.chosenBachelorName, "Hangout1");
    }

    setUpMiniGame() {

        this.MakeUpManager.setupMakeUpButtons(this);
        this.DressUpManager.setupCostumeButtons(this);
        this.MiniGameManager.setUpGame(this);

    }



}
const LANDSCAPE_WIDTH = 1920;
const LANDSCAPE_HEIGHT = 1080;
const PORTRAIT_WIDTH = 720;
const PORTRAIT_HEIGHT = 1280;

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: LANDSCAPE_WIDTH,
        height: LANDSCAPE_HEIGHT,
    },
    plugins: {
        global: [
            {
                plugin: PokiPlugin,
                key: 'poki',
                start: true,
                data: {
                    loadingSceneKey: 'PreloaderScene',
                    gameplaySceneKey: 'MainScene',

                    autoCommercialBreak: true
                }
            }
        ]
    },
    scene: [BootScene, PreloaderScene, Main]
};

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isMobile) {
    config.scale.width = PORTRAIT_WIDTH;
    config.scale.height = PORTRAIT_HEIGHT;
} else {
    
    config.scale.width = LANDSCAPE_WIDTH;
    config.scale.height = LANDSCAPE_HEIGHT;
}

const game = new Phaser.Game(config);