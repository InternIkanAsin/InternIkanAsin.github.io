//General Button Class
import { MakeUpButton, ItemPanelButton } from '../UI/UIButton.js'

import { InteractiveMakeupSystem } from '../Minigame/InteractiveMakeupSystem.js';
// MakeUp Data
import { makeUpData, MakeUpPositions } from '../Makeup Data/MakeUpData.js'

import AssetLoader from '../AssetLoader.js';

import UIButton, { OutfitButton, GeneralButton } from '../UI/UIButton.js'
export class MakeUpManager {
    constructor(scene, AudioManager) {
        this.scene = scene;
        this.AudioManager = AudioManager;
    }


    /**
    * @method setupCostumeButtons - Initializes an array and creates costumedata SOs and stores it in the array created based on its type
    */
    setupMakeUpButtons(scene) {
        this.scene.makeUpButtons = {};
        makeUpData.forEach(makeupItem => {
            const { name, makeUpType, textureAnime, textureButton, textureIcon } = makeupItem;
            if (textureButton && textureIcon) {
                const button = new MakeUpButton(scene, name, makeUpType, -100, -100, textureAnime, textureButton, textureIcon, scene.AudioManager);
            
                button.setSize(150, 200);
                button.setData('instance', button);
            
                const currentSelectedMakeup = MakeUpButton.selectedMakeUp[makeUpType]?.current;
                if (currentSelectedMakeup && currentSelectedMakeup.name === name) {
                    
                    // 1. Aktifkan highlight (logika ini sudah benar).
                    button.highlightImage.setVisible(true);
                    
                    // 2. Perbarui referensi 'current' di state agar menunjuk ke instance tombol BARU.
                    MakeUpButton.selectedMakeUp[makeUpType].current = button;
                    
                    // --- LOGIKA BARU YANG LEBIH PINTAR ---
                    // Periksa apakah item ini adalah item additive.
                    if (!['Lips', 'Eyebrows', 'Eyelashes', 'Pupil', 'Hair'].includes(makeUpType)) {
                        // Cek apakah visualnya SUDAH ADA dan MASIH VALID.
                        // `currentSelectedMakeup` di sini merujuk ke state LAMA.
                        const oldVisual = currentSelectedMakeup.displayedMakeUp;
                        
                        if (oldVisual && oldVisual.scene) {
                            // Jika visual lama masih ada di scene, kita tidak perlu membuat yang baru.
                            // Cukup perbarui referensi di instance tombol yang baru.
                            console.log(`[Setup] Visual for ${name} already exists. Re-linking.`);
                            button.displayedMakeUp = oldVisual;
                        } else {
                            // Jika visual lama tidak ada (misalnya, ini load pertama kali atau state rusak),
                            // maka kita buat ulang visualnya.
                            console.log(`[Setup] Visual for ${name} not found. Re-rendering.`);
                            const pos = MakeUpPositions[makeUpType] || { x: 0, y: 0 };
                            const newImage = scene.add.image(pos.x, pos.y, textureAnime);
                            
                            // Terapkan skala & depth
                            if (['Blush', 'Eyeliner', 'Sticker'].includes(makeUpType)) {
                                newImage.setScale(0.55 * 2);
                            } else { // Eyeshadow
                                newImage.setScale(0.9 * 2);
                            }
                            newImage.setDepth(MakeUpButton.DEPTH_VALUES[makeUpType] || 2.7);
                            
                            if (scene.faceContainer) {
                                scene.faceContainer.add(newImage);
                            }
                            
                            // Simpan referensi visual baru ini ke state dan ke tombol.
                            button.displayedMakeUp = newImage;
                            MakeUpButton.selectedMakeUp[makeUpType].current.displayedMakeUp = newImage;
                        }
                    }
                    // --- AKHIR LOGIKA BARU ---
                }
            
                if (!scene.makeUpButtons[makeUpType]) {
                    scene.makeUpButtons[makeUpType] = [];
                }
                scene.makeUpButtons[makeUpType].push(button);
            }
        });
        
        // Panggil sort setelah semua item yang mungkin ada telah dibuat ulang.
        if (scene.faceContainer) {
            scene.faceContainer.sort('depth');
        }
    }
    /**
    * @method updateMakeUpButtons - Updates makeup buttons of make up Panel
    */
    updateMakeUpButtons(makeUpType) {
        const scene = this.scene;
        if (!scene.makeUpButtons[makeUpType]) {
        console.log(`[Update] Button instances for '${makeUpType}' not found. Creating them now...`);
        scene.makeUpButtons[makeUpType] = []; // Buat array kosongnya dulu
        
        const itemsToCreate = makeUpData.filter(item => item.makeUpType === makeUpType);
        
        itemsToCreate.forEach(makeupItem => {
            const { name, textureAnime, textureButton, textureIcon } = makeupItem;
            if (textureButton && textureIcon) {
                const button = new MakeUpButton(scene, name, makeUpType, -100, -100, textureAnime, textureButton, textureIcon, scene.AudioManager);
                button.setSize(150, 200);
                button.setData('instance', button);
                scene.makeUpButtons[makeUpType].push(button);
            }
        });
    }
        const itemButtonsForType = scene.makeUpButtons[makeUpType] || [];
        let allButtonContainersForPanel = [];

        if (this.currentLepasButton && this.currentLepasButton.destroy) {
            this.currentLepasButton.destroy();
            this.currentLepasButton = null;
        }

        // --- Create and Add "Lepas" Button ---
        const noRemoveButtonCategories = ['Hair', 'Pupil'];

    // Hanya buat dan tambahkan tombol "Lepas" jika kategori saat ini
    // TIDAK termasuk dalam daftar noRemoveButtonCategories.
    if (!noRemoveButtonCategories.includes(makeUpType)) {
        
        // Seluruh logika pembuatan ItemPanelButton sekarang ada di dalam blok if ini.
        const lepasButton = new ItemPanelButton(
            scene,
            scene.AudioManager,
            0, 0,
            'buttonIcon2',
            'xMark',
            -15,
            'Remove',
            '30px',
            () => { 
                // ... (callback untuk lepas button tetap sama)
                console.log(`[LepasButton] Clicked for MakeUp Type: ${makeUpType}`);
                if (scene.interactiveMakeupSystem?.isActive && scene.interactiveMakeupSystem.activeMakeupType === makeUpType) {
                    scene.interactiveMakeupSystem.stopColoringSession(makeUpType, true);
                }
                const currentEntry = MakeUpButton.selectedMakeUp[makeUpType];
                const currentEquipped = currentEntry?.current;
                let helperButton = itemButtonsForType[0];
                if (!helperButton && scene.makeUpButtons && Object.values(scene.makeUpButtons).flat().length > 0) {
                    helperButton = Object.values(scene.makeUpButtons).flat()[0];
                }

                if (helperButton && helperButton instanceof MakeUpButton) {
                    if (currentEquipped && currentEquipped.displayedMakeUp) {
                        const typeOfEquipped = currentEquipped.makeupType || makeUpType;
                        if (!['Lips', 'Eyebrows', 'Eyelashes', 'Pupil', 'Hair'].includes(typeOfEquipped)) {
                            if (typeof currentEquipped.displayedMakeUp.destroy === 'function') {
                                currentEquipped.displayedMakeUp.destroy();
                            }
                        }
                        if (currentEquipped instanceof MakeUpButton) {
                            currentEquipped.displayedMakeUp = null;
                        }
                    }
                    helperButton._equipDefaultMakeUp(makeUpType, currentEquipped || null);
                } else {
                    console.error(`[LepasButton] Could not find a MakeUpButton instance for unequip: ${makeUpType}`);
                }
                MakeUpButton.clearMakeupHighlightsForType(scene, makeUpType);
            }
        );

        lepasButton.setSize(150, 200);
        allButtonContainersForPanel.push(lepasButton.container ? lepasButton.container : lepasButton);
    }
    // --- AKHIR PERUBAHAN ---

        if (scene.sidePanelHeaderText) {
            scene.tweens.add({
                targets: scene.sidePanelHeaderText,
                alpha: 0,
                duration: 200,
                ease: 'Sine.easeInOut',
                onComplete: () => {
                    scene.sidePanelHeaderText.setText(makeUpType.toString());
                    scene.tweens.add({
                        targets: scene.sidePanelHeaderText,
                        alpha: 1,
                        duration: 200,
                        ease: 'Sine.easeInOut'
                    })
                }
            });
        }
        // Add the actual makeup item buttons (their containers)

        itemButtonsForType.forEach(buttonInstance => {
            buttonInstance.setVisible(true);
            allButtonContainersForPanel.push(buttonInstance);
        });

        if (scene.MiniGameManager.buttonGrid) {
            const children = scene.MiniGameManager.buttonGrid.getAllChildren();

            children.forEach(childGameObject => {
                // Kita periksa apakah child ini adalah instance OutfitButton yang persisten.
                // Kita bisa menggunakan data yang kita set saat pembuatan tombol.
                const instance = childGameObject.getData ? childGameObject.getData('instance') : null;

                if (instance instanceof MakeUpButton) {
                    // Jika ini adalah OutfitButton, kita hapus dari grid TANPA menghancurkannya.
                    // Ini "menyelamatkan" tombol agar bisa dipakai lagi.
                    scene.MiniGameManager.buttonGrid.remove(childGameObject, false); // false = jangan hancurkan
                }
                // Jika bukan (misalnya, ini adalah tombol "Lepas"), kita tidak melakukan apa-apa.
                // Tombol "Lepas" akan hancur bersama dengan grid di bawah ini.
            });

            // Setelah tombol-tombol persisten diselamatkan, baru kita hancurkan grid-nya.
            // Ini juga akan menghancurkan anak-anak yang tersisa (yaitu tombol "Lepas" yang lama).
            scene.MiniGameManager.buttonGrid.destroy();
            scene.MiniGameManager.buttonGrid = null;
        }

        // Setelah pembersihan selesai, baru kita update buttonList dengan yang baru.
        scene.MiniGameManager.buttonList = allButtonContainersForPanel;

        if (scene.MiniGameManager.innerSizer) {
            scene.MiniGameManager.innerSizer.clear(true);
        }

        scene.MiniGameManager.buttonGrid = scene.rexUI.add.gridSizer({
            column: 1,
            row: scene.MiniGameManager.buttonList.length || 1,
            space: { column: 0, row: 20 },
            align: 'center',
        });

        scene.MiniGameManager.innerSizer.add(scene.MiniGameManager.buttonGrid, 0, 'center', { expand: true }, true);

        scene.MiniGameManager.buttonList.forEach((btnContainer, index) => {
            btnContainer.setVisible(true);
            scene.MiniGameManager.buttonGrid.add(btnContainer, 0, index, 'center', 0, false);
        });

        scene.MiniGameManager.buttonGrid.layout();
        scene.MiniGameManager.innerSizer.layout();
        if (scene.sidePanel) {
            scene.sidePanel.layout();
            scene.sidePanel.setT(0);
        }
    }

    displayMakeUpButtons(makeUpType, scene) {
       
        const loadAndDisplay = (flag, loaderFunc, type) => {
            if (!scene[flag]) {
                scene.UIManager.showLoadingOverlay(`Loading ${type}...`);
                scene.MiniGameManager.disableInteraction();
                
                scene.load.once('complete', () => {
                    console.log(`${type} assets loaded!`);
                    scene[flag] = true;
                    scene.UIManager.hideLoadingOverlay();
                    scene.MiniGameManager.enableInteraction();
                    this.displayMakeUpButtons(type, scene);
                });
                
                loaderFunc(scene);
                return true;
            }
            return false;
        };

        
        let isLoading = false;
        
        if (makeUpType !== 'Eyebrows') {
            switch (makeUpType) {
                case 'Eyelashes':
                    isLoading = loadAndDisplay('areEyelashesLoaded', AssetLoader.loadEyelash, 'Eyelashes');
                    break;
                case 'Eyeliner':
                    isLoading = loadAndDisplay('areEyelinerLoaded', AssetLoader.loadEyeliner, 'Eyeliner');
                    break;
                case 'Eyeshadow':
                    isLoading = loadAndDisplay('areEyeshadowsLoaded', AssetLoader.loadEyeShadow, 'Eyeshadow');
                    break;
                case 'Lips':
                    isLoading = loadAndDisplay('areLipsLoaded', AssetLoader.loadLip, 'Lips');
                    break;
                case 'Pupil':
                    isLoading = loadAndDisplay('arePupilsLoaded', AssetLoader.loadPupil, 'Pupil');
                    break;
                case 'Blush':
                    isLoading = loadAndDisplay('areBlushLoaded', AssetLoader.loadBlush, 'Blush');
                    break;
                case 'Sticker':
                    isLoading = loadAndDisplay('areStickersLoaded', AssetLoader.loadSticker, 'Sticker');
                    break;
                case 'Hair':
                    isLoading = loadAndDisplay('areHairLoaded', AssetLoader.loadHair, 'Hair');
                    break;
            }
        }

       
        if (isLoading) {
            return;
        }

        if (scene.miniGameButton) { // The main mode toggle button
            scene.miniGameButton.disableInteractive();
        }

        if (scene.interactiveMakeupSystem?.isActive) {
            scene.interactiveMakeupSystem.stopColoringSession(true); // force discard
        }
        if (scene.MiniGameManager && scene.MiniGameManager.backButton) {
            scene.MiniGameManager.backButton.disableInteractive();
        } else {
            console.error("scene.MiniGameManager.backButton not found in displayMakeUpButtons!");
            // return; // Optionally stop if button is critical
        }
        if (scene.sidePanelHeaderText) {
            scene.tweens.add({
                targets: scene.sidePanelHeaderText,
                alpha: 0,
                duration: 200,
                ease: 'Sine.easeInOut',
                onComplete: () => {
                    scene.sidePanelHeaderText.setText(makeUpType.toString());
                    scene.tweens.add({
                        targets: scene.sidePanelHeaderText,
                        alpha: 1,
                        duration: 200,
                        ease: 'Sine.easeInOut'
                    })
                }
            });
        }

        const oldButtons = scene.MiniGameManager.buttonGrid ? scene.MiniGameManager.buttonGrid.getAllChildren() : [];
        scene.tweens.add({
            targets: oldButtons,
            alpha: 0,
            duration: 200,
            ease: 'Sine.easeInOut',
            onComplete: () => {

                // Update makeup buttons
                scene.MakeUpManager.updateMakeUpButtons(makeUpType);

                // ... (iconKey and text setting logic - this is fine) ...
                let iconKey = 'blushIcon';

                switch (makeUpType) {
                    case 'Lips': iconKey = 'lipstickIcon'; break;
                    case 'Eyebrows': iconKey = 'eyebrowsIcon'; break;
                    case 'Eyelashes': iconKey = 'eyelashesIcon'; break;
                    case 'Eyeliner': iconKey = 'eyelinerIcon'; break;
                    case 'Eyeshadow': iconKey = 'eyeshadowIcon'; break;
                    case 'Pupil': iconKey = 'eyeColorIcon'; break;
                    case 'Blush': iconKey = 'blushIcon'; break;
                    case 'Hair': iconKey = 'hairIcon'; break;
                    case 'Sticker': iconKey = 'stickerIcon'; break; // Assuming you have 'stickerIcon' for the header
                    default:
                        console.warn(`No specific header icon found for makeUpType: ${makeUpType}. Using default '${iconKey}'.`);
                        break;
                }
                if (scene.selectedButtonIcon) scene.selectedButtonIcon.setTexture(iconKey);
                if (scene.selectedButtonText) scene.selectedButtonText.setText(makeUpType.toString());

                if (scene.MiniGameManager) { // Check existence
                    scene.MiniGameManager.updatePanelLayout(30, 100, 30);
                }
                const newButtons = scene.MiniGameManager.buttonGrid.getAllChildren();
                newButtons.forEach(btn => btn.setAlpha(0));
                scene.tweens.add({
                    targets: newButtons,
                    alpha: 1,
                    duration: 200,
                    ease: 'Sine.easeInOut',
                    onComplete: () => {

                        // If no header, still make button interactive after panel is in
                        if (scene.MiniGameManager && scene.MiniGameManager.backButton) {
                            scene.MiniGameManager.backButton.setInteractive();
                        }

                        if (scene.miniGameButton) {
                            scene.miniGameButton.setInteractive();
                        }

                    }
                });
            }
        });
    }

    /**
  * @method setMakeUpButtons - Creates Makeup panel to hold Makeup buttons
  */
    setMakeUpButtons(makeUpType, scene) {
        this.scene.currentMakeUpType = makeUpType;
        this.scene.input.topOnly = false;


        this.buttons = this.scene.makeUpButtons[makeUpType];

        this.buttonList = this.buttons;
        this.buttonGrid = this.scene.rexUI.add.gridSizer({
            column: this.buttonList.length,
            row: 1,
            space: { column: 100, row: -100 },
        });

        // Add buttons to the grid
        this.buttonList.forEach((btnContainer, index) => {
            this.buttonGrid.add(btnContainer, index, 0, 'center', 0, false);
        });

        const panelBackground = this.scene.add.nineslice(0, 0, 'categoryButtonsPanel', '', 1000, 400, 3, 3, 2, 2);
        panelBackground.setDepth(7);

        // Create the scrollable panel
        this.scene.makeUpButtonsTypePanel = this.scene.rexUI.add.scrollablePanel({
            x: 360,
            y: 1010,
            width: 720,
            height: 250,
            scrollMode: 0,

            scrollDetectionMode: 1,            // drag dideteksi berdasarkan mask area&#8203;:contentReference[oaicite:0]{index=0}
            scroller: {
                pointerOutRelease: false,      // jangan lepaskan kontrol saat pointer keluar area panel&#8203;:contentReference[oaicite:1]{index=1}
                rectBoundsInteractive: false
            },

            background: panelBackground,

            panel: {
                child: this.buttonGrid,
                mask: {
                    padding: 2
                }
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
        }).layout().setAlpha(0.9);

        this.scene.makeUpButtonsTypePanel
            .setChildrenInteractive({
                targets: this.buttonList,
                targetMode: 'direct'
            })
            .on('child.click', (childContainer) => {
                // childContainer adalah container OutfitButton yang diklik
                // panggil callback toggleOutfit di sini, misal:
                const btn = childContainer.getData('instance');
            });


        Object.values(this.scene.makeUpButtons).flat().forEach(button => {
            this.scene.sys.displayList.bringToTop(button);
        });

        const maskGraphics = this.scene.add.graphics();
        const panelWidth = 693;

        maskGraphics.fillStyle(0xffffff);
        maskGraphics.fillRect(12, 0, panelWidth, 10000);
        maskGraphics.setVisible(false);

        const mask = maskGraphics.createGeometryMask();

        Object.values(this.scene.makeUpButtons).flat().forEach(button => {
            button.setMask(mask);
        });

        this.scene.makeUpPanelMaskGraphics = maskGraphics;
        this.scene.makeUpButtonsTypePanel.layout();
    }

    /**
     * @method removeAllMakeup
     * Unequips all currently applied custom makeup.
     * If a makeup type has a default skin, it reverts to that skin.
     * Otherwise, the makeup for that type is cleared.
     */
    removeAllMakeup() {
        if (this.scene.interactiveMakeupSystem?.isActive) {
            this.scene.interactiveMakeupSystem.stopColoringSession(true); // force discard
        }
        const scene = this.scene;
        const makeupTypes = Object.keys(MakeUpButton.selectedMakeUp);
    
        console.log("[RemoveAll] Starting to remove all makeup...");
    
        for (const makeupType of makeupTypes) {
            const entry = MakeUpButton.selectedMakeUp[makeupType];
            const currentEquipped = entry?.current;
        
            if (currentEquipped) { // Jika ada sesuatu yang terpasang untuk tipe ini
                
                // Hancurkan objek visual dari item "additive" (Sticker, Blush, dll.)
                if (currentEquipped.displayedMakeUp && !['Lips', 'Eyebrows', 'Eyelashes', 'Pupil', 'Hair'].includes(makeupType)) {
                    if (typeof currentEquipped.displayedMakeUp.destroy === 'function') {
                        console.log(`[RemoveAll] Destroying visual for ${makeupType}: ${currentEquipped.name}`);
                        currentEquipped.displayedMakeUp.destroy();
                    }
                }
            
                // Dapatkan instance tombol mana pun dari tipe ini untuk memanggil metode helper
                let helperButton = scene.makeUpButtons[makeupType]?.[0] || Object.values(scene.makeUpButtons || {}).flat()[0];
                if (helperButton) {
                    // Panggil _equipDefaultMakeUp untuk mereset state dan tampilan ke default.
                    // Ini akan menangani reset tekstur untuk item inti seperti Bibir, dan membersihkan state untuk item additive.
                    helperButton._equipDefaultMakeUp(makeupType, currentEquipped);
                }
            }
        }
    
       
        MakeUpButton.clearAllMakeUpHighlights(scene); // Pastikan semua highlight hilang
        console.log("[RemoveAll] Finished removing makeup.");
    }

}