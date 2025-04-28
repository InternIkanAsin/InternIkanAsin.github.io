// Costume Data Class
import { statTracker } from '../Outfit Data/CostumeManager.js'
import { costumeData, outfitPositions } from '../Outfit Data/CostumeData.js'

// UI Buttons Class
import UIButton, { OutfitButton, ContinueButton } from './UIButton.js'

import { CutsceneSystem } from '../Scene System/CutsceneSystem.js';

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
        scene.background = scene.add.image(centerX / 0.5, centerY, 'background').setScale(1.2);

        // Setup character
        scene.player = scene.add.image(centerX / 2, centerY / 0.9, 'player').setScale(0.6);
        scene.expression = scene.add.image(centerX / 2.05, centerY / 1.43, 'expression').setScale(0.9);
        scene.hair = scene.add.image(centerX / 2.03, centerY / 1.31, 'hair').setScale(0.25);

        console.log("Initial background y:", scene.background.y);
        console.log("Initial player y:", scene.player.y);
        console.log("Initial hair y:", scene.hair.y);
        console.log("Initial expression y:", scene.expression.y);

        //Setup back button
        scene.backButton = new UIButton(scene, this.AudioManager, 80, -170, 'outfitButton', 'backButton', () => {
            if (scene.activePanel === "outfit") {
                scene.TweeningUtils.hideButtons(scene.currentType);
                scene.activePanel = null;
                scene.TweeningUtils.hideBackButton(); // hide back button
                this.AudioManager.playSFX('buttonClick');
            } else {
                scene.TweeningUtils.hideBackButton(); // hide back button
            }
        }).container.setAlpha(1);

        // Setup stat panel
        scene.statTracker.setupStatPanel(scene);

        //Setup status message
        scene.UIManager.setupStatusPanel(scene);
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
    clearDressupScene(scene) {
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

        // 5. Destroy background
        scene.background?.destroy();
        scene.AudioManager?.fadeOutMusic('minigameMusic', 500);

        // 6. Destroy status message
        scene.statusPanel?.destroy();

        scene.xMark?.destroy();
        scene.failStatusText?.destroy();

        scene.checkMark?.destroy();
        scene.successStatusText?.destroy();
    }


    /**
     * @method setupCategoryButtons - Sets up the category buttons for different types of outfit
     */
    setupCategoryButtons(scene) {
        // Define the toggle function and attach it to the scene
        scene.toggleCategoryPanel = async function () {
            if (scene.activePanel === "category") {
                await scene.TweeningUtils.hideCategoryButtons();
                scene.activePanel = null;
            } else {
                if (scene.activePanel === "outfit") {
                    await scene.TweeningUtils.hideButtons(scene.currentType);
                    scene.TweeningUtils.hideBackButton();
                }
                scene.TweeningUtils.displayCategoryButtons();
                scene.activePanel = "category";

            }
        };

        // Create the panel and button
        scene.categoryButtonsPanel = scene.add.nineslice(scene.scale.width + 200, scene.scale.height / 2, 'categoryButtonsPanel', '', 200, 800, 0.5, 0.5, 1.5, 1.5);
        scene.categoryButtonsPanel.setVisible(false);

        scene.activePanel = null;

        scene.openButton = scene.add.image(scene.scale.width, scene.scale.height - 700, 'openIcon')
            .setScale(5)
            .setInteractive()
            .on('pointerdown', () => {
                scene.toggleCategoryPanel();
                this.AudioManager.playSFX('openPanel');
            });
        scene.openButton.angle = 270;

        // Outfit buttons with their corresponding outfit types
        scene.dressShirtButton = new UIButton(scene, this.AudioManager, scene.scale.width - 100, scene.scale.height - 950, 'outfitButton', 'dressIcon', () => {
            scene.TweeningUtils.displayButtons("DressShirt");
            this.AudioManager.playSFX('buttonClick');
            scene.TweeningUtils.displayBackButton();
        }).container;

        scene.outerButton = new UIButton(scene, this.AudioManager, scene.scale.width - 100, scene.scale.height - 800, 'outfitButton', 'outerIcon', () => {
            scene.TweeningUtils.displayButtons("Outer");
            this.AudioManager.playSFX('buttonClick');
            scene.TweeningUtils.displayBackButton();
        }).container;

        scene.underwearButton = new UIButton(scene, this.AudioManager, scene.scale.width - 100, scene.scale.height - 650, 'outfitButton', 'underwearIcon', () => {
            scene.TweeningUtils.displayButtons("Underwear");
            this.AudioManager.playSFX('buttonClick');
            scene.TweeningUtils.displayBackButton();
        }).container;

        scene.socksButton = new UIButton(scene, this.AudioManager, scene.scale.width - 100, scene.scale.height - 500, 'outfitButton', 'socksIcon', () => {
            scene.TweeningUtils.displayButtons("Socks");
            this.AudioManager.playSFX('buttonClick');
            scene.TweeningUtils.displayBackButton();
        }).container;

        scene.shoesButton = new UIButton(scene, this.AudioManager, scene.scale.width - 100, scene.scale.height - 350, 'outfitButton', 'shoesIcon', () => {
            scene.TweeningUtils.displayButtons("Shoes");
            this.AudioManager.playSFX('buttonClick');
            scene.TweeningUtils.displayBackButton();
        }).container;

        scene.TweeningUtils.hideCategoryButtons();
    }


    /**
     * @method setupCostumeButtons - Initializes an array and creates costumedata SOs and stores it in the array created based on its type
     */
    setupCostumeButtons(scene) {
        const COLOR_PRIMARY = 0x4e342e;
        const COLOR_LIGHT = 0x7b5e57;
        const COLOR_DARK = 0x260e04;

        this.scene.outfitButtons = {};

        // Add buttons to the panel
        costumeData.forEach(({ name, outfitType, x, y, textureAnime, textureButton, textureIcon, stat }) => {
            const { x: outfitX, y: outfitY } = outfitPositions[outfitType] || { x: 0, y: 0 };
            const button = new OutfitButton(scene, name, outfitType, x, y, outfitX, outfitY, textureAnime, textureButton, textureIcon, stat, scene.statTracker, scene.AudioManager);

            // Optional: Hide/show by type
            button.container.setSize(150, 200).setVisible(false);
            button.container.setData('instance', button);

            if (!scene.outfitButtons[outfitType]) {
                scene.outfitButtons[outfitType] = [];
            }
            scene.outfitButtons[outfitType].push(button);
        });
    }

    // Creates a new panel based on the outfit type
    setCostumeButtons(outfitType, scene) {
        this.scene.input.topOnly = false;

        const COLOR_PRIMARY = 0x4e342e;
        const COLOR_LIGHT = 0x7b5e57;
        const COLOR_DARK = 0x260e04;

        let buttons = [];
        if (outfitType === "DressShirt") {
            buttons = [...(this.scene.outfitButtons["Dress"] || []), ...(this.scene.outfitButtons["Shirt"] || [])];
        } else {
            buttons = this.scene.outfitButtons[outfitType] || [];
        }

        const buttonList = buttons.map(b => b.container);
        const buttonGrid = this.scene.rexUI.add.gridSizer({
            column: buttonList.length,
            row: 1,
            space: { column: 100, row: -100 },
        });

        // Add buttons to the grid
        buttonList.forEach((btnContainer, index) => {
            buttonGrid.add(btnContainer, index, 0, 'center', 0, false);
        });

        const panelBackground = this.scene.add.nineslice(0, 0, 'categoryButtonsPanel', '', 1000, 400, 3, 3, 2, 2);
        panelBackground.setDepth(7);

        // Create the scrollable panel
        this.scene.outfitButtonsTypePanel = this.scene.rexUI.add.scrollablePanel({
            x: 360,
            y: 1500,
            width: 700,
            height: 250,
            scrollMode: 1,

            scrollDetectionMode: 1,            // drag dideteksi berdasarkan mask area&#8203;:contentReference[oaicite:0]{index=0}
            scroller: {
                pointerOutRelease: false,      // jangan lepaskan kontrol saat pointer keluar area panel&#8203;:contentReference[oaicite:1]{index=1}
                rectBoundsInteractive: false
            },

            background: panelBackground,

            panel: {
                child: buttonGrid,
                mask: {
                    padding: 2
                }
            },

            slider: {
                track: this.scene.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK).setDepth(8),
                thumb: this.scene.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT).setDepth(8),
            },

            mouseWheelScroller: {
                focus: false,
                speed: 0.1
            },

            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
                panel: 10
            }
        }).layout().setVisible(false);

        this.scene.outfitButtonsTypePanel
            .setChildrenInteractive({
                targets: buttonList,
                targetMode: 'direct'
            })
            .on('child.click', (childContainer) => {
                // childContainer adalah container OutfitButton yang diklik
                // panggil callback toggleOutfit di sini, misal:
                const btn = childContainer.getData('instance');
                btn.toggleOutfit(btn.outfitX, btn.outfitY, btn.outfitType);
                this.scene.AudioManager.playSFX('buttonClick');
            });

        Object.values(this.scene.outfitButtons).flat().forEach(button => {
            button.container.setDepth(8);
            button.button.setDepth(8);
            button.icon.setDepth(8);
        });

        Object.values(this.scene.outfitButtons).flat().forEach(button => {
            this.scene.sys.displayList.bringToTop(button.container);
        });

        const maskGraphics = this.scene.add.graphics();
        const panelWidth = 693;

        maskGraphics.fillStyle(0xffffff);
        maskGraphics.fillRect(12, 0, panelWidth, 10000);
        maskGraphics.setVisible(false);

        const mask = maskGraphics.createGeometryMask();

        Object.values(this.scene.outfitButtons).flat().forEach(button => {
            button.container.setMask(mask);
        });

        this.scene.outfitPanelMaskGraphics = maskGraphics;
        this.scene.outfitButtonsTypePanel.layout();
    }

    createContinueButton(scene) {
        const { width, height } = scene.sys.game.config;
        const button = new ContinueButton(scene, width / 2, height - 80, 'emptyButton', 'Lanjut →', async () => {
            if (this.canContinueToScene2()) {
                this.scene.TweeningUtils.displayStatusPanel(true);
                this.scene.AudioManager.playSFX('success');
                this.scene.ParticleSystem.emitParticle(scene, scene.emitter);
            } else {
                this.scene.TweeningUtils.displayStatusPanel(false);
            }
        });

        scene.continueButton = button.container;
    }

    canContinueToScene2() {
        const selected = OutfitButton.selectedOutfits;

        const has = type => !!selected[type]?.current;

        const isSet1 = has("Dress") && has("Shoes");
        const isSet2 = has("Shirt") && has("Underwear") && has("Socks") && has("Shoes");

        return isSet1 || isSet2;
    }
}