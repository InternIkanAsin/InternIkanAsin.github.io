//Asset Loader Class
import AssetLoader from './AssetLoader.js'

//Tweening Utils Class
import TweenUtils from './TweeningUtils.js'
// UI Manager Class
import { UIManager } from './UI/UIManager.js'

// OutfitButton Class
import { OutfitButton } from './UI/UIButton.js'

//DialogueManager Class
import { DialogueManager } from './Dialogue System/DialogueManager.js'

//DialogueData Class
import { DialogueData } from './Dialogue System/DialogueData.js'

//CutsceneSystem Class
import { CutsceneSystem } from './Scene System/CutsceneSystem.js'

//SceneManager Class
import { SceneManager } from './Scene System/SceneManager.js'

//Stat Tracker Class
import { statTracker } from './Outfit Data/CostumeManager.js'

//Audio Manager Class
import { AudioManager } from './Audio System/AudioManager.js'

//Particle System Class
import { ParticleSystem } from './Particle System/ParticleSystem.js'
function loadFont(name, url) {
    const newFont = new FontFace(name, `url(${url})`);
    newFont.load().then(function (loaded) {
        document.fonts.add(loaded);
        console.log(`Font "${name}" has been loaded.`);
    }).catch(function (error) {
        console.error(`Failed to load font "${name}":`, error);
    });
}

// Main Game Scene
class Main extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
        loadFont('pixelFont', 'Asset/Font/Pixellari.ttf');

        AssetLoader.loadAllAssets(this);
        this.DialogueManager = new DialogueManager(this);
        this.CutsceneSystem = new CutsceneSystem(this);
        this.statTracker = new statTracker(this);
        this.AudioManager = new AudioManager(this);
    }

    create() {
        this.initializeSystems();
        this.CutsceneSystem.initiateCutscene1();
        this.DialogueManager.createDialogueUI();
        //this.setupDressMiniGame();
    }

    initializeSystems() {
        this.OutfitButton = OutfitButton;
        this.UIManager = new UIManager(this, this.AudioManager);
        this.SceneManager = new SceneManager(this);
        this.AudioManager.initializeSounds();
        this.cutsceneSystem = new CutsceneSystem(this);
        this.TweeningUtils = new TweenUtils(this);
        this.ParticleSystem = new ParticleSystem(this);
    }
    initializeDialogueSystem() {
        this.DialogueManager = new DialogueManager(this);
        this.DialogueManager.createDialogueUI();
    }

    setupDressMiniGame() {
        this.UIManager.setupScene(this);
        this.UIManager.setupCostumeButtons(this);
        this.UIManager.setupCategoryButtons(this);
        this.UIManager.createContinueButton(this);
    }


}

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 720,
        height: 1280,
    },
    scene: Main
};

const game = new Phaser.Game(config);