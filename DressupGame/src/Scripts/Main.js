//Loading logic
import PreloaderScene from './Loading Scene/PreloaderScene.js';

import BootScene from './Loading Scene/BootScene.js';

import UIButton from './UI/UIButton.js';

//Asset Loader Class
import AssetLoader from './AssetLoader.js'

import { PokiPlugin } from '@poki/phaser-3';

import { progressManager } from './Save System/ProgressManager.js';

import Phaser from 'phaser';

//Tweening Utils Class
import TweenUtils from './TweeningUtils.js'

// UI Manager Class
import { UIManager } from './UI/UIManager.js'

// Mini Game Manager Class
import { MiniGameManager } from './Minigame/MiniGameManager.js'

import { SaveManager } from './Save System/SaveManager.js';

// Dress Up Manager Class
import { DressUpManager } from './Minigame/DressUpManager.js'

// Make Up Manager Class
import { MakeUpManager } from './Minigame/MakeUpManager.js'

// OutfitButton Class
import { OutfitButton, MakeUpButton } from './UI/UIButton.js'

//DialogueManager Class
import { DialogueManager } from './Dialogue System/DialogueManager.js'

//CutsceneSystem Class
import { CutsceneSystem } from './Scene System/CutsceneSystem.js'

//SceneManager Class
import { SceneManager } from './Scene System/SceneManager.js'

//Stat Tracker Class
import { statTracker } from './Outfit Data/CostumeManager.js'

//Audio Manager Class
import { AudioManager } from './Audio System/AudioManager.js'

//interactive makeupsystem
import { InteractiveMakeupSystem } from './Minigame/InteractiveMakeupSystem.js';

//Bachelor Manager Class
import { BachelorManager } from './Bachelor/bachelorManager.js'

import { layout } from './ScreenOrientationUtils.js';

//Loading font from game 
function loadFont(name, url) {
    const newFont = new FontFace(name, `url(${url})`);
    newFont.load().then(function (loaded) {
        document.fonts.add(loaded);
        console.log(`Font "${name}" has been loaded.`);
    }).catch(function (error) {
        console.error(`Failed to load font "${name}":`, error);
    });
}
// Game State (Make Up or Dress Up)
export const GameState = Object.freeze({
    MAKEUP: 'MAKEUP',
    DRESSUP: 'DRESSUP'
});

// Main Game Scene
class Main extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    init(data) {
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
        this.areLipsLoaded = false;
        this.arePupilsLoaded = false;
        this.areBlushLoaded = false;
        this.areStickersLoaded = false;
        this.areHairLoaded = false;
        this.areDressesAndShirtsLoaded = false;
        this.initializeSystems();
        const savedData = this.SaveManager.loadGame();
        this.makeUpFinished = progressManager.makeUpFinished;
        this.dressUpFinished = progressManager.dressUpFinished;
        if (savedData) {
            // Pulihkan data sederhana
            this.chosenBachelorName = savedData.bachelor?.chosenName || this.chosenBachelorName;
            this.makeUpFinished = progressManager.makeUpFinished;
            this.dressUpFinished = progressManager.dressUpFinished;

            // --- UBAH DUA BARIS INI ---
            // Akses properti statis langsung melalui nama KELAS, bukan 'this'
            OutfitButton.selectedOutfits = savedData.playerAppearance?.outfits || {};
            MakeUpButton.selectedMakeUp = savedData.playerAppearance?.makeup || {};
            // -------------------------

            console.log("Restored state from save file.");
        }

        this.state = GameState.MAKEUP;

        this.startGameFlow();
        //this.setUpMiniGame();
        //this.BachelorManager.setUpBachelorChoice();
    }

    createSelectionScreen() {
        console.log("[Main.js] Creating Minigame Selection Screen.");
        const scene = this;
        const centerX = scene.scale.width / 2;
        const centerY = scene.scale.height / 2;

        scene.UIManager.setupScene(scene);
        // First Curtain is closed
        const drapeWidth = scene.scale.width / 2;
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

        // fix button size and position
        const buttonXOffset = 350;

        this.createSelectionButtons();

        this.MiniGameManager.disableInteraction();
        // LANGKAH 3: Panggil animasi untuk MEMBUKA tirai setengah
        scene.cameras.main.once('camerafadeincomplete', () => {
            // Animasi openDrapesHalfway sekarang akan menggeser tirai dari tengah ke samping
            this.TweeningUtils.openDrapesHalfway(1000);
        });
    }

    createSelectionButtons() {
        const scene = this;
        const btnLayout = layout.selectionButtons; // Ambil layout tombol untuk kemudahan akses

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
            buttonScale: btnLayout.scale, // Gunakan skala dari layout
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
            buttonScale: btnLayout.scale, // Gunakan skala dari layout
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
        // Make sure transition only happened once
        this.dressUpButton.disableInteractive();
        this.makeUpButton.disableInteractive();


        this.state = gameState; // Set state game
        console.log(`[Main.js] Transitioning to ${gameState} mode.`);

        // Close curtain, while close setup minigame then open it again
        this.TweeningUtils.closeDrapes(500, async () => {


            // destroy selection screen
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

            // Setup UI minigame (panel kategori di samping, tombol finish, dll
            if (gameState === GameState.DRESSUP) {
                this.DressUpManager.displayDressUpButtons('Dress', this);
            } else {
                this.MakeUpManager.displayMakeUpButtons('Eyebrows', this);
            }


            // Buka tirai sepenuhnya
            this.TweeningUtils.openDrapes(1000, () => {
                console.log("[Transition] Lock released.");
                this.isTransitioning = false;
            });
        });
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
    // Untuk mobile, kita paksa mode portrait
    config.scale.width = PORTRAIT_WIDTH;
    config.scale.height = PORTRAIT_HEIGHT;
} else {
    // Untuk desktop, kita gunakan landscape
    config.scale.width = LANDSCAPE_WIDTH;
    config.scale.height = LANDSCAPE_HEIGHT;
}

const game = new Phaser.Game(config);