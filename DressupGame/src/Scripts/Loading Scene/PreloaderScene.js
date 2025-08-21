import AssetLoader from '../AssetLoader.js';
import { layout, orientation } from '../ScreenOrientationUtils.js';
import Phaser from 'phaser';
import { bachelorProgressManager } from '../Save System/BachelorProgressManager.js';

import { MuteButton } from '../UI/UIButton.js'; // <-- Impor kelas baru
class PreloaderScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloaderScene' });

    }

    init(data) {

        this.preloaderData = data;
    }
    loadFont(name, url, onReady) {
        const newFont = new FontFace(name, `url(${url})`);
        newFont.load().then(function (loaded) {
            document.fonts.add(loaded);
            console.log(`Font "${name}" has been loaded.`);
            onReady();
        }).catch(function (error) {
            console.error(`Failed to load font "${name}":`, error);
            onReady();
        });
    }

    preload() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        let PAUSE_FOR_TESTING = false;
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile) {
            PAUSE_FOR_TESTING = true;
        }
        else {
            PAUSE_FOR_TESTING = false;
        }
        let assetsReady = false;
        let fontsReady = false;

        const startGameIfReady = () => {
            if (assetsReady && fontsReady) {
                console.log("Assets and Fonts are ready. Starting MainScene.");

                // Logika PAUSE_FOR_TESTING dipindahkan ke sini agar lebih terpusat
                if (PAUSE_FOR_TESTING) {
                    console.log("--- PRELOADER TEST MODE: Loading complete. Click screen to continue. ---");
                    this.add.text(width / 2, height - 50, 'Click to Continue', {
                        font: '32px Arial', fill: '#000000'
                    }).setOrigin(0.5).setDepth(100);
                    this.input.once('pointerdown', () => {
                        this.scene.start('MainScene', { bachelorName: this.preloaderData.bachelorName });
                    });
                } else {
                    this.scene.start('MainScene', { bachelorName: this.preloaderData.bachelorName });
                }
            }
        };

        this.loadFont('pixelFont', 'Asset/Font/Pixellari.ttf', () => { }); // Tidak perlu gate
        this.loadFont('regularFont', 'Asset/Font/sourcesanspro-bold.ttf', () => {
            fontsReady = true;
            startGameIfReady();
        });

        const bg = this.add.image(width / 2, height / 2, 'minigame_background_preload');
        if (isMobile) {
            const scale = height / 1080;
            bg.setOrigin(0, 0.5).setScale(scale);
            bg.x = 0;
        } else {
            bg.setOrigin(0.5, 0.5).setScale(1);
        }

        // Mute button
        if (isMobile) {
            this.muteButton = new MuteButton(this, width * 0.9, height * 0.07, 0.22);
        }
        else {
            this.muteButton = new MuteButton(this, width * 0.05, height * 0.1, 0.28);
        }

        this.add.image(layout.CisiniLogo.x, layout.CisiniLogo.y, 'logo_cisini').setOrigin(0.5, 0.5).setScale(layout.CisiniLogo.scale).setDepth(layout.CisiniLogo.depth);

        const playerLayout = layout.playerCharacter;

        // 1. Buat Container utama untuk seluruh karakter
        const playerContainer = this.add.container(playerLayout.container.x, playerLayout.container.y);

        // 2. Buat Container untuk wajah
        const faceContainer = this.add.container(playerLayout.parts.faceContainer.x, playerLayout.parts.faceContainer.y);
        faceContainer.setScale(playerLayout.parts.faceContainer.scale);

        // 3. Buat setiap bagian makeup dan tambahkan ke faceContainer
        const makeupPartsLayout = layout.MakeupPosition;
        const pupils = this.add.image(makeupPartsLayout.Pupil.x, makeupPartsLayout.Pupil.y, 'player_pupils_preload').setScale(makeupPartsLayout.Pupil.scale * 2);
        const lips = this.add.image(makeupPartsLayout.Lips.x, makeupPartsLayout.Lips.y, 'player_lips_preload').setScale(makeupPartsLayout.Lips.scale * 2);
        const eyebrows = this.add.image(makeupPartsLayout.Eyebrows.x, makeupPartsLayout.Eyebrows.y, 'player_eyebrows_preload').setScale(makeupPartsLayout.Eyebrows.scale * 2);
        const eyelashes = this.add.image(makeupPartsLayout.Eyelashes.x, makeupPartsLayout.Eyelashes.y, 'player_eyelashes_preload').setScale(makeupPartsLayout.Eyelashes.scale * 2);
        const eyeshadows = this.add.image(makeupPartsLayout.Eyeshadow.x, makeupPartsLayout.Eyeshadow.y, 'eyeshadownormaldefault').setScale(makeupPartsLayout.Eyeshadow.scale * 2);
        faceContainer.add([pupils, lips, eyebrows, eyelashes, eyeshadows]);

        // 4. Buat bagian tubuh dan pakaian
        const partsLayout = playerLayout.parts;
        const body = this.add.image(partsLayout.body.x, partsLayout.body.y, 'player_body_preload').setScale(partsLayout.body.scale);
        const hairBack = this.add.image(partsLayout.hairBack.x, partsLayout.hairBack.y, 'player_hair_back_preload').setScale(partsLayout.hairBack.scale);
        const shirt = this.add.image(partsLayout.shirt.x, partsLayout.shirt.y, 'player_shirt_preload').setScale(partsLayout.shirt.scale);
        const lower = this.add.image(partsLayout.lower.x, partsLayout.lower.y, 'player_lower_preload').setScale(partsLayout.lower.scale);
        const hairFront = this.add.image(partsLayout.hairFront.x, partsLayout.hairFront.y, 'player_hair_front_preload').setScale(partsLayout.hairFront.scale);

        // 5. Atur urutan layer (depth) yang benar di dalam container
        playerContainer.add([hairBack, body, lower, shirt, faceContainer, hairFront]);

        // 6. Atur skala akhir untuk seluruh grup karakter
        playerContainer.setScale(playerLayout.container.scale);

        //const bachelorAssets = this.preloaderData.bachelorAssets;
        //const bachelorX = width * 0.30;
        //const bachelorY = height * 0.85;
        //const bachelorFullbody = this.add.image(0, 0, bachelorAssets.fullbodyKey);
        //const bachelorExpression = this.add.image(0, 0, bachelorAssets.expressionKey);
        //bachelorFullbody.setOrigin(0.5, 1);
        //bachelorExpression.setOrigin(0.5, 0.3);
        //const expressionOffsetY = -bachelorFullbody.displayHeight * 0.7;
        //const expressionOffsetX = bachelorAssets.expressionKey === 'anggaExpression_neutral_preload' ? -5 : 0;
        //bachelorExpression.setPosition(bachelorFullbody.x + expressionOffsetX, bachelorFullbody.y + expressionOffsetY);
        //this.add.container(bachelorX, bachelorY, [bachelorFullbody, bachelorExpression]).setScale(1.5);



        const ppLayout = layout.bachelorPps;

        if (isMobile) {
            console.log("Using Portrait layout for Bachelor PPs.");
            this.bachelorPP = this.bachelorPP || {};
            ppLayout.positions.forEach(ppData => {
                let bachelorName = ppData.key.split("_")[1];
                this.bachelorPP[bachelorName] = this.add.image(ppData.x, ppData.y, ppData.key)
                    .setScale(ppLayout.scale);
            });

            // --- 2. TAMBAHKAN LOGIKA CENTANG DI SINI ---
            console.log("[PreloaderScene] Checking for chosen bachelors...");
            const chosenHistory = bachelorProgressManager.loadHistory();
            console.log("[PreloaderScene] History:", chosenHistory);

            // Definisikan properti centang di layout agar mudah diubah
            const checkmarkOffset = layout.bachelorPps.checkmarkOffset || { x: 50, y: 50 };
            const checkmarkScale = layout.bachelorPps.checkmarkScale || 0.5;

            chosenHistory.forEach(bachelorName => {
                const ppKey = `PP_${bachelorName}_Grey`;
                const newPPKey = `PP_${bachelorName}`;
                const ppData = ppLayout.positions.find(p => p.key === ppKey);

                if (ppData) {
                    console.log(`[PreloaderScene] Adding checkmark for ${bachelorName}`);
                    this.bachelorPP[bachelorName].setTexture(newPPKey);
                    this.add.image(
                        ppData.x + checkmarkOffset.x,
                        ppData.y + checkmarkOffset.y,
                        'tickMark'
                    ).setScale(checkmarkScale).setDepth(1); // Beri depth agar di atas PP
                }
            });

        } else {
            // JALANKAN LOGIKA LANDSCAPE: Buat baris horizontal
            console.log("Using Landscape layout for Bachelor PPs.");

            const bachelorPPs = ['PP_Azril', 'PP_Angga', 'PP_Reza', 'PP_Indra', 'PP_Keenan'];

            // Perbaikan: Gunakan ppLayout.spacing dan ppLayout.xOffset
            const totalPpsWidth = (bachelorPPs.length - 1) * ppLayout.spacing;
            const startX = (width / 2) - (totalPpsWidth / 2) + (ppLayout.xOffset || 0);

            bachelorPPs.forEach((key, index) => {
                // Perbaikan: Gunakan ppLayout.spacing dan ppLayout.y
                this.add.image(startX + (index * ppLayout.spacing), ppLayout.y, key)
                    // Perbaikan: Gunakan ppLayout.scale
                    .setScale(ppLayout.scale);
            });
        }



        const barY = layout.loadingBar.y;


        const frame = this.add.nineslice(
            width / 2,                                  // x
            barY,                                       // y
            'loading_frame',                            // texture key
            0,                                          // frame (0 jika bukan dari atlas)
            layout.loadingBar.displayWidth,             // lebar akhir
            layout.loadingBar.displayHeight,            // tinggi akhir
            30, 30,                                     // leftWidth, rightWidth (lebar sudut)
            30, 30                                      // topHeight, bottomHeight (tinggi sudut)
        );
        const fill = this.add.image(frame.x, frame.y, 'loading_fill')
            .setDisplaySize(layout.loadingBar.displayWidth, layout.loadingBar.displayHeight);


        this.loadingFillPattern = this.add.tileSprite(frame.x, frame.y - 15,
            layout.loadingBar.displayWidth + 10000,
            layout.loadingBar.displayHeight + 1000,
            'loading_fill_pattern'
        ).setScale(0.5);

        const maskGraphics = this.make.graphics();
        fill.setMask(maskGraphics.createGeometryMask());
        this.loadingFillPattern.setMask(maskGraphics.createGeometryMask());

        const percentText = this.make.text({
            x: width / 2,
            y: barY + (layout.percentText.yOffset || 0),
            text: '0%',
            style: layout.percentText.style
        }).setOrigin(0.5);


        this.load.on('progress', (value) => {

            const fillWidth = fill.displayWidth;
            const fillHeight = fill.displayHeight;
            const offsetX = layout.loadingBar.fillOffset.x;
            const offsetY = layout.loadingBar.fillOffset.y;
            const cornerRadius = layout.loadingBar.cornerRadius;
            maskGraphics.clear();
            maskGraphics.fillStyle(0xffffff);
            maskGraphics.fillRoundedRect(
                fill.x - (fillWidth / 2) + offsetX,
                fill.y - (fillHeight / 2) + offsetY,
                (fillWidth - offsetX * 2) * value,
                fillHeight - offsetY * 2,
                cornerRadius // <-- Tambahkan parameter radius di sini
            );
            percentText.setText(`${parseInt(value * 100)}%`);
        });
        const poki = this.plugins.get('poki');
        this.load.on('complete', () => {
            poki.runWhenInitialized(() => {
                poki.gameLoadingFinished();
                console.log("[Poki SDK] gameLoadingFinished() has been fired.");
                assetsReady = true;
                startGameIfReady();
            });
        });
        AssetLoader.loadGame(this);
        AssetLoader.loadMiniGame(this);

    }



    update() {
        if (this.loadingFillPattern) {
            this.loadingFillPattern.tilePositionX += 1.5;
        }
    }

    create() {
    }

}


export default PreloaderScene;