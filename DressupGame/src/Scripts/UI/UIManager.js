import UIButton, { OutfitButton, GeneralButton, MakeUpButton } from './UIButton.js';

import { GameState } from '../Main.js';

import { makeUpData, defaultMakeUpSkins, } from '../Makeup Data/MakeUpData.js';
import { costumeData } from '../Outfit Data/CostumeData.js';

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
        scene.background = scene.add.image(bgLayout.x, bgLayout.y, 'newBackground').setOrigin(bgLayout.originX, bgLayout.originY).setScale(bgLayout.scale).setDisplaySize(bgLayout.displayWidth, bgLayout.displayHeight);
        scene.body = scene.add.image(layout.character.x, layout.character.y, 'player').setScale(layout.character.scale).setOrigin(0.5).setDepth(1);



        const defaultHairTextures = defaultMakeUpSkins['Hair'];
        scene.hairBack = scene.add.image(layout.Hair.zoomOutHairX, layout.Hair.zoomOutHairY, defaultHairTextures.back).setScale(0.5 * 256 / 225).setOrigin(0.5).setDepth(0.9).setRotation(Phaser.Math.DegToRad(0));
        scene.hairFront = scene.add.image(layout.Hair.zoomOutHairX, layout.Hair.zoomOutHairY, defaultHairTextures.front).setScale(0.5 * 256 / 225).setOrigin(0.5).setDepth(7).setRotation(Phaser.Math.DegToRad(0));

        scene.hairBack.postFX.setPadding(128);
        const hairBackFX = scene.hairBack.postFX.addGlow();
        hairBackFX.outerStrength = 0.5;
        scene.hairFront.postFX.setPadding(128);
        const hairFrontFX = scene.hairFront.postFX.addGlow();
        hairFrontFX.outerStrength = 0.5;

        scene.eyeshadows = scene.add.image(layout.MakeupPosition.Eyeshadow.x, layout.MakeupPosition.Eyeshadow.y, 'eyeshadownormaldefault').setScale(layout.MakeupPosition.Eyeshadow.scale * 2).setDepth(1.9);
        scene.pupils = scene.add.image(layout.MakeupPosition.Pupil.x, layout.MakeupPosition.Pupil.y, 'PupilNormalBlue').setScale(layout.MakeupPosition.Pupil.scale * 2).setDepth(4);
        scene.lips = scene.add.image(layout.MakeupPosition.Lips.x, layout.MakeupPosition.Lips.y, 'LipNormalDefault').setScale(layout.MakeupPosition.Lips.scale * 2).setDepth(2.6);
        scene.eyebrows = scene.add.image(layout.MakeupPosition.Eyebrows.x, layout.MakeupPosition.Eyebrows.y, 'EyebrowNormalDefault').setScale(layout.MakeupPosition.Eyebrows.scale * 2).setDepth(2.4);
        scene.eyelashes = scene.add.image(layout.MakeupPosition.Eyelashes.x, layout.MakeupPosition.Eyelashes.y, 'EyelashesNormalDefault').setScale(layout.MakeupPosition.Eyelashes.scale * 2).setDepth(6);
        scene.faceContainer = scene.add.container(layout.face.zoomOutFaceX, layout.face.zoomOutFaceY, [scene.pupils, scene.lips, scene.eyebrows, scene.eyelashes, scene.eyeshadows]).setDepth(2).setScale(0.3).setRotation(Phaser.Math.DegToRad(0));

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
            'Eyeliner': { flag: 'areEyelinerLoaded', loader: AssetLoader.loadEyeliner },
            'Eyeshadow': { flag: 'areEyeshadowsLoaded', loader: AssetLoader.loadEyeShadow },
            'Lips': { flag: 'areLipsLoaded', loader: AssetLoader.loadLip },
            'Pupil': { flag: 'arePupilsLoaded', loader: AssetLoader.loadPupil },
            'Blush': { flag: 'areBlushLoaded', loader: AssetLoader.loadBlush },
            'Sticker': { flag: 'areStickersLoaded', loader: AssetLoader.loadSticker },
            'Hair': { flag: 'areHairLoaded', loader: AssetLoader.loadHair },
            'Eyebrows': { flag: 'areEyebrowsLoaded', loader: AssetLoader.loadEyebrow },
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
        scene.load.once('complete', function () { // Gunakan fungsi biasa, bukan arrow function
            console.log('All saved assets loaded!');

            // Di sini, `this` akan merujuk ke instance UIManager karena .bind(this)
            this.makeupRestored = this.restoreSavedMakeup(scene);
            this.outfitRestored = this.restoreSavedOutfits(scene);
        }.bind(this));

        // 4. Mulai pemuatan jika ada
        if (assetsToLoad) {
            scene.load.start();
        } else {
            // Jika tidak ada yang dimuat, kita perlu menautkan objek default secara manual
            this.linkDefaultMakeupObjects(scene);
        }
    }

    cleanupOrphanedOutfits(scene) {
        console.log("[UIManager] Running cleanup for orphaned outfit images...");

        // 1. Buat daftar semua gambar outfit yang "sah" menurut state kita.
        const validOutfitImages = new Set();
        Object.values(OutfitButton.selectedOutfits).forEach(entry => {
            if (entry?.current?.displayedOutfit) {
                validOutfitImages.add(entry.current.displayedOutfit);
            }
        });

        // 2. Kumpulkan semua atlas yang digunakan oleh outfit untuk identifikasi.
        const outfitAtlasKeys = new Set();
        costumeData.forEach(item => {
            if (item.textureAnime.atlas) {
                outfitAtlasKeys.add(item.textureAnime.atlas);
            }
        });

        // 3. Iterasi semua objek di layar.
        for (let i = scene.children.list.length - 1; i >= 0; i--) {
            const child = scene.children.list[i];

            // Cek apakah ini adalah gambar outfit
            if (child.type === 'Image' && child.texture && outfitAtlasKeys.has(child.texture.key)) {
                // Cek apakah gambar ini TIDAK ADA di dalam daftar gambar yang sah.
                if (!validOutfitImages.has(child)) {
                    console.warn(`[Cleanup] Found and destroyed an orphaned ghost image with texture: ${child.texture.key}`);
                    child.destroy();
                }
            }
        }
    }

    playGlitterExplosion(targetImage, itemType = null) {
        if (!targetImage || !targetImage.scene || !targetImage.active) {
            console.warn("Cannot create particle explosion: targetImage is not valid or active.");
            return;
        }

        const scene = this.scene;
        scene.AudioManager?.playSFX?.('glitterSFX');

        let particleBounds; // Variabel untuk menyimpan rectangle final
        const isMakeup = targetImage.parentContainer === scene.faceContainer;

        if (isMakeup) {
            // --- LOGIKA KHUSUS UNTUK MAKEUP ---
            console.log(`[Particle] Using MAKEUP logic for ${itemType}`);

            const container = scene.faceContainer;
            const offset = (itemType && layout.particleOffsets && layout.particleOffsets[itemType]) ? layout.particleOffsets[itemType] : { x: 0, y: 0 };
            const sizeOffset = (itemType && layout.particleSizeAdjustments && layout.particleSizeAdjustments[itemType]) ? layout.particleSizeAdjustments[itemType] : { w: 0, h: 0 };

            // 1. Hitung posisi dunia dari item makeup
            // Posisi container + (posisi lokal item * skala container) + (offset lokal * skala container)
            const worldX = container.x + ((targetImage.x + offset.x) * container.scaleX);
            const worldY = container.y + ((targetImage.y + offset.y) * container.scaleY);

            // 2. Hitung ukuran dunia dari item makeup
            const worldWidth = targetImage.displayWidth * container.scaleX + sizeOffset.w;
            const worldHeight = targetImage.displayHeight * container.scaleY + sizeOffset.h;

            // 3. Buat rectangle final di posisi dunia
            particleBounds = new Phaser.Geom.Rectangle(
                worldX - (worldWidth / 2), // Geser ke kiri setengah lebar untuk mendapatkan pojok kiri atas
                worldY - (worldHeight / 2), // Geser ke atas setengah tinggi untuk mendapatkan pojok kiri atas
                worldWidth,
                worldHeight
            );

        } else {
            // --- LOGIKA UNTUK OUTFIT (YANG SUDAH BEKERJA) ---
            console.log(`[Particle] Using OUTFIT logic for ${itemType}`);

            const bounds = targetImage.getBounds();
            if (itemType && layout.particleOffsets && layout.particleOffsets[itemType]) {
                const offset = layout.particleOffsets[itemType];
                bounds.x += offset.x;
                bounds.y += offset.y;
            }
            if (itemType && layout.particleSizeAdjustments && layout.particleSizeAdjustments[itemType]) {
                const sizeOffset = layout.particleSizeAdjustments[itemType];
                bounds.width += sizeOffset.w;
                bounds.height += sizeOffset.h;
                bounds.x -= sizeOffset.w / 2;
                bounds.y -= sizeOffset.h / 2;
            }
            particleBounds = bounds;
        }

        // 4. Buat zona emisi dari rectangle yang sudah dihitung (baik dari makeup maupun outfit)
        const emitZone = {
            source: new Phaser.Geom.Rectangle(0, 0, particleBounds.width, particleBounds.height),
            type: 'random',
            quantity: 100
        };

        // 5. Buat Particle Emitter di posisi pojok kiri atas rectangle
        const particles = scene.add.particles(
            particleBounds.x,
            particleBounds.y,
            'particle_star',
            {
                speed: { min: 30, max: 70 },
                angle: { min: 0, max: 360 },
                scale: { start: 0.1, end: 0 },
                lifespan: { min: 300, max: 500 },
                blendMode: 'ADD',
                emitZone: emitZone,
                emitting: true
            }
        ).setDepth(1000);

        // Sisa kode...
        scene.time.delayedCall(500, () => {
            particles.emitting = false;
            scene.time.delayedCall(500, () => {
                if (particles.active) {
                    particles.destroy();
                }
            });
        });
    }
    restoreSavedOutfits(scene) {
        console.log("[UIManager] Applying restored outfits to the character.");
        return new Promise((resolve) => {
            Object.entries(OutfitButton.selectedOutfits).forEach(([outfitType, equippedOutfit]) => {
                if (!equippedOutfit?.current) return;

                const { name, textureAnime } = equippedOutfit.current;
                const depthValues = { "Socks": 1, "Shoes": 2, "Lower": 3, "Shirt": 4, "Outer": 6, "Dress": 5 };
                const outfitCustomSizes = layout.outfit.customSizes;
                const usesCustomSize = !!outfitCustomSizes[name];
                if (usesCustomSize) {
                    const custom = outfitCustomSizes[name];
                    this.dressUpViewDisplayWidth = custom.width;
                    this.dressUpViewDisplayHeight = custom.height;
                }

                if (textureAnime && scene.textures.exists(textureAnime.atlas)) {
                    const outfitPositions = layout.outfit.positions;
                    const outfitCustomSizes = layout.outfit.customSizes;
                    const outfitManualOffsets = layout.outfit.manualOffsets;

                    const basePosition = outfitPositions[outfitType] || { x: 0, y: 0 };
                    const manualOffset = outfitManualOffsets[name] || { x: 0, y: 0 };
                    const finalX = basePosition.x + manualOffset.x;
                    const finalY = basePosition.y + manualOffset.y;

                    const newOutfitImage = scene.add.image(finalX, finalY, textureAnime.atlas, textureAnime.frame)
                        .setDepth(depthValues[outfitType] || 1);

                    const usesCustomSize = !!outfitCustomSizes[name];
                    if (usesCustomSize) {

                        const custom = outfitCustomSizes[name];
                        newOutfitImage.setDisplaySize(custom.width, custom.height);
                    } else {

                        const defaultScale = (outfitType === 'Dress' || outfitType === 'Outer' || outfitType === 'Shirt') ? 0.6 * layout.outfitButton.outfitScale : 1.2 * layout.outfitButton.outfitScale2;
                        newOutfitImage.setScale(defaultScale);
                    }

                    scene[outfitType] = newOutfitImage;
                    equippedOutfit.current.displayedOutfit = newOutfitImage;

                    newOutfitImage.setData({
                        baseWorldOutfitX: finalX, baseWorldOutfitY: finalY,
                        initialScaleX: newOutfitImage.scaleX, initialScaleY: newOutfitImage.scaleY,
                        refBodyX: scene.body.x, refBodyY: scene.body.y, refBodyScale: scene.body.scale
                    });
                }
            });
            resolve();
        });
    }

    /**
     * Menampilkan kembali makeup yang tersimpan.
     * @param {Phaser.Scene} scene 
     */
    restoreSavedMakeup(scene) {
        console.log("[UIManager] Applying restored makeup to the character.");

        return new Promise((resolve) => {
            Object.entries(MakeUpButton.selectedMakeUp).forEach(([makeupType, equippedMakeup]) => {
                if (!equippedMakeup?.current) return;

                const { name, textureAnime } = equippedMakeup.current;
                let imageToUpdate;

                switch (makeupType) {
                    case 'Lips':
                        imageToUpdate = scene.lips;

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

                        scene.hairBack.setTexture(textureAnime.back.atlas || textureAnime.back, textureAnime.back.frame || null);
                        scene.hairFront.setTexture(textureAnime.front.atlas || textureAnime.front, textureAnime.front.frame || null);
                        break;
                    case 'Blush': case 'Eyeliner': case 'Eyeshadow': case 'Sticker':
                        if (equippedMakeup.current.isDefault) break;
                        const pos = layout.MakeupPosition[makeupType] || { x: 0, y: 0 };
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
            resolve();
        });
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
        scene.flower4?.destroy();
        scene.flower5?.destroy();
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