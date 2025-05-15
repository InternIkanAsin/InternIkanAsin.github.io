//Asset Loader Class
import AssetLoader from './AssetLoader.js'

//Tweening Utils Class
import TweenUtils from './TweeningUtils.js'

// UI Manager Class
import { UIManager } from './UI/UIManager.js'

// Mini Game Manager Class
import { MiniGameManager } from './Minigame/MiniGameManager.js'

// Dress Up Manager Class
import { DressUpManager } from './Minigame/DressUpManager.js'

// Make Up Manager Class
import { MakeUpManager } from './Minigame/MakeUpManager.js'

// OutfitButton Class
import { OutfitButton } from './UI/UIButton.js'

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

//Particle System Class
import { ParticleSystem } from './Particle System/ParticleSystem.js'

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
        this.state = GameState.MAKEUP;
        //this.CutsceneSystem.initiateCutscene1();
        //this.DialogueManager.createDialogueUI();
        this.setUpMiniGame();
    }

    initializeSystems() {
        this.OutfitButton = OutfitButton;
        this.AudioManager.initializeSounds();
        this.UIManager = new UIManager(this, this.AudioManager);
        this.MiniGameManager = new MiniGameManager(this, this.AudioManager);
        this.DressUpManager = new DressUpManager(this, this.AudioManager);
        this.MakeUpManager = new MakeUpManager(this, this.AudioManager);
        this.SceneManager = new SceneManager(this);
        this.cutsceneSystem = new CutsceneSystem(this);
        this.TweeningUtils = new TweenUtils(this);
        this.ParticleSystem = new ParticleSystem(this);
    }

    initializeDialogueSystem() {
        this.DialogueManager = new DialogueManager(this);
        this.DialogueManager.createDialogueUI();
    }

    setUpMiniGame() {
        this.UIManager.setupScene(this);
        this.MakeUpManager.setupMakeUpButtons(this);
        this.DressUpManager.setupCostumeButtons(this);
        this.MiniGameManager.setUpGame(this);
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