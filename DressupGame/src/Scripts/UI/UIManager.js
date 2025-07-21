import UIButton, { OutfitButton, GeneralButton, MakeUpButton } from './UIButton.js';

import { GameState } from '../Main.js';

import { makeUpData, defaultMakeUpSkins, MakeUpPositions } from '../Makeup Data/MakeUpData.js';

import { layout } from '../ScreenOrientationUtils.js';
import AssetLoader from '../AssetLoader.js';


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
        scene.background = scene.add.image(bgLayout.x, bgLayout.y, 'background').setOrigin(bgLayout.originX, bgLayout.originY).setScale(bgLayout.scale);
        scene.body = scene.add.image(layout.character.x, layout.character.y, 'player').setScale(layout.character.scale).setOrigin(0.5).setDepth(1);

        const defaultHairTextures = defaultMakeUpSkins['Hair'];
        scene.hairBack = scene.add.image(layout.Hair.zoomOutHairX, layout.Hair.zoomOutHairY, defaultHairTextures.back).setScale(0.5 * 256 / 225).setOrigin(0.5).setDepth(0.9);
        scene.hairFront = scene.add.image(layout.Hair.zoomOutHairX, layout.Hair.zoomOutHairY, defaultHairTextures.front).setScale(0.5 * 256 / 225).setOrigin(0.5).setDepth(7);
        
        scene.pupils = scene.add.image(0, 0, 'PupilNormalBlue').setScale(0.55 * 2).setDepth(2);
        scene.lips = scene.add.image(0, 0, 'LipNormalDefault').setScale(0.55 * 2).setDepth(2);
        scene.eyebrows = scene.add.image(0, 0, 'EyebrowNormalDefault').setScale(0.55 * 2).setDepth(2);
        scene.eyelashes = scene.add.image(0, 0, 'EyelashesNormalDefault').setScale(0.55 * 2).setDepth(2);
        scene.faceContainer = scene.add.container(layout.face.zoomOutFaceX, layout.face.zoomOutFaceY, [scene.pupils, scene.lips, scene.eyebrows, scene.eyelashes]).setDepth(2).setScale(0.3);

        // --- PEMUATAN DINAMIS (SEKARANG AKAN BERFUNGSI) ---
        let assetsToLoad = false;
        
        // 1. Antrekan Aset Outfit
        Object.entries(OutfitButton.selectedOutfits).forEach(([outfitType, outfit]) => {
            const atlasKey = outfit?.current?.textureAnime?.atlas;
            if (atlasKey && !scene.textures.exists(atlasKey)) {
                const path = `Asset/Outfit/${outfitType}/${atlasKey}`;
                scene.load.atlas(atlasKey, `${path}.png`, `${path}.json`);
                assetsToLoad = true;
            }
        });

        // 2. Antrekan Aset Makeup
        const loaderMap = {
            'Eyelashes': { flag: 'areEyelashesLoaded', loader: AssetLoader.loadEyelash },
                'Eyeliner':  { flag: 'areEyelinerLoaded', loader: AssetLoader.loadEyeliner },
                'Eyeshadow': { flag: 'areEyeshadowsLoaded', loader: AssetLoader.loadEyeShadow },
                'Lips':      { flag: 'areLipsLoaded', loader: AssetLoader.loadLip },
                'Pupil':     { flag: 'arePupilsLoaded', loader: AssetLoader.loadPupil },
                'Blush':     { flag: 'areBlushLoaded', loader: AssetLoader.loadBlush },
                'Sticker':   { flag: 'areStickersLoaded', loader: AssetLoader.loadSticker },
                'Hair':      { flag: 'areHairLoaded', loader: AssetLoader.loadHair },
                'Eyebrows':  { flag: 'areEyebrowsLoaded', loader: AssetLoader.loadEyebrow },
        };
        Object.entries(MakeUpButton.selectedMakeUp).forEach(([makeupType, makeup]) => {
            if (loaderMap[makeupType]) {
                const mapEntry = loaderMap[makeupType];
                const textureKey = makeup?.current?.textureAnime;
                if (textureKey && !makeup.current.isDefault && !scene.textures.exists(textureKey.atlas || textureKey)) {
                    mapEntry.loader(scene);
                    assetsToLoad = true;
                }
            }
        });

        // 3. Callback setelah semua selesai dimuat
        scene.load.once('complete', function() { // Gunakan fungsi biasa, bukan arrow function
            console.log('All saved assets loaded!');
            
            // Di sini, `this` akan merujuk ke instance UIManager karena .bind(this)
            this.restoreSavedOutfits(scene);
            this.restoreSavedMakeup(scene);
        }.bind(this));
        
        // 4. Mulai pemuatan jika ada
        if (assetsToLoad) {
            scene.load.start();
        } else {
            // Jika tidak ada yang dimuat, kita perlu menautkan objek default secara manual
            this.linkDefaultMakeupObjects(scene);
        }
    }

    // Tambahkan method `linkDefaultMakeupObjects` untuk menangani kasus tanpa save file
    restoreSavedOutfits(scene) {
        console.log("[UIManager] Applying restored outfits to the character.");
        
        Object.entries(OutfitButton.selectedOutfits).forEach(([outfitType, equippedOutfit]) => {
            if (!equippedOutfit?.current) return;

            const { name, textureAnime } = equippedOutfit.current;
            const depthValues = { "Socks": 1, "Shoes": 2, "Lower": 3, "Shirt": 4, "Outer": 6, "Dress": 5 };
            const outfitScale = (outfitType === 'Dress' || outfitType === 'Outer' || outfitType === 'Shirt') ? 0.6 : 1.2;
            const manualOffset = layout.outfit.manualOffsets[name] || { x: 0, y: 0 };
            const finalX = layout.outfit.positions[outfitType].x + manualOffset.x;
            const finalY = layout.outfit.positions[outfitType].y + manualOffset.y;

            if (textureAnime && scene.textures.exists(textureAnime.atlas)) {
                const newOutfitImage = scene.add.image(finalX, finalY, textureAnime.atlas, textureAnime.frame)
                    .setScale(outfitScale)
                    .setDepth(depthValues[outfitType] || 1);

                scene[outfitType] = newOutfitImage;
                equippedOutfit.current.displayedOutfit = newOutfitImage;

                newOutfitImage.setData({
                    baseWorldOutfitX: finalX, baseWorldOutfitY: finalY,
                    initialScaleX: newOutfitImage.scaleX, initialScaleY: newOutfitImage.scaleY,
                    refBodyX: scene.body.x, refBodyY: scene.body.y, refBodyScale: scene.body.scale
                });
            }
        });
    }

    /**
     * Menampilkan kembali makeup yang tersimpan.
     * @param {Phaser.Scene} scene 
     */
    restoreSavedMakeup(scene) {
        console.log("[UIManager] Applying restored makeup to the character.");

        Object.entries(MakeUpButton.selectedMakeUp).forEach(([makeupType, equippedMakeup]) => {
            if (!equippedMakeup?.current) return;

            const { name, textureAnime } = equippedMakeup.current;
            let imageToUpdate;

            switch (makeupType) {
                case 'Lips':
                    imageToUpdate = scene.lips;
                    // Cek jika textureAnime adalah string (default) atau objek (kustom)
                    if (typeof textureAnime === 'string') {
                        imageToUpdate.setTexture(textureAnime);
                    } else {
                        imageToUpdate.setTexture(textureAnime.atlas, textureAnime.frame);
                    }
                    break;
                case 'Eyebrows':
                    imageToUpdate = scene.eyebrows;
                    if (typeof textureAnime === 'string') {
                        imageToUpdate.setTexture(textureAnime);
                    } else {
                        imageToUpdate.setTexture(textureAnime.atlas, textureAnime.frame);
                    }
                    break;
                case 'Eyelashes':
                    imageToUpdate = scene.eyelashes;
                    if (typeof textureAnime === 'string') {
                        imageToUpdate.setTexture(textureAnime);
                    } else {
                        imageToUpdate.setTexture(textureAnime.atlas, textureAnime.frame);
                    }
                    break;
                case 'Pupil':
                    imageToUpdate = scene.pupils;
                    if (typeof textureAnime === 'string') {
                        imageToUpdate.setTexture(textureAnime);
                    } else {
                        imageToUpdate.setTexture(textureAnime.atlas, textureAnime.frame);
                    }
                    break;
                case 'Hair':
                    imageToUpdate = [scene.hairBack, scene.hairFront];
                    // Logika rambut sudah menangani objek, jadi tidak perlu diubah
                    scene.hairBack.setTexture(textureAnime.back.atlas || textureAnime.back, textureAnime.back.frame || null);
                    scene.hairFront.setTexture(textureAnime.front.atlas || textureAnime.front, textureAnime.front.frame || null);
                    break;
                case 'Blush': case 'Eyeliner': case 'Eyeshadow': case 'Sticker':
                    if (equippedMakeup.current.isDefault) break; // Jangan buat gambar untuk item aditif default (yang tidak ada)
                    const pos = MakeUpPositions[makeupType] || { x: 0, y: 0 };
                    imageToUpdate = scene.add.image(pos.x, pos.y, textureAnime.atlas || textureAnime, textureAnime.frame || null)
                        .setScale(0.55 * 2)
                        .setDepth(MakeUpButton.DEPTH_VALUES[makeupType] || 2.7);
                    scene.faceContainer.add(imageToUpdate);
                    break;
            }

            if (imageToUpdate) {
                equippedMakeup.current.displayedMakeUp = imageToUpdate;
            }
        });
        
        if (scene.faceContainer) {
            scene.faceContainer.sort('depth');
        }
    }

    /**
     * Menautkan objek visual makeup default ke struktur data saat tidak ada save file.
     * @param {Phaser.Scene} scene 
     */
    linkDefaultMakeupObjects(scene) {
        if (MakeUpButton.selectedMakeUp['Pupil']?.current) MakeUpButton.selectedMakeUp['Pupil'].current.displayedMakeUp = scene.pupils;
        if (MakeUpButton.selectedMakeUp['Lips']?.current) MakeUpButton.selectedMakeUp['Lips'].current.displayedMakeUp = scene.lips;
        if (MakeUpButton.selectedMakeUp['Eyebrows']?.current) MakeUpButton.selectedMakeUp['Eyebrows'].current.displayedMakeUp = scene.eyebrows;
        if (MakeUpButton.selectedMakeUp['Eyelashes']?.current) MakeUpButton.selectedMakeUp['Eyelashes'].current.displayedMakeUp = scene.eyelashes;
        if (MakeUpButton.selectedMakeUp['Hair']?.current) MakeUpButton.selectedMakeUp['Hair'].current.displayedMakeUp = [scene.hairBack, scene.hairFront];
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