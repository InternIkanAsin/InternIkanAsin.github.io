import AssetLoader from '../AssetLoader.js';
import { layout } from '../ScreenOrientationUtils.js';
import Phaser from 'phaser';
class PreloaderScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloaderScene' });

    }

    init(data) {

        this.preloaderData = data;
    }
    loadFont(name, url) {
        const newFont = new FontFace(name, `url(${url})`);
        newFont.load().then(function (loaded) {
            document.fonts.add(loaded);
            console.log(`Font "${name}" has been loaded.`);
        }).catch(function (error) {
            console.error(`Failed to load font "${name}":`, error);
        });
    }

    preload() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        this.loadFont('pixelFont', 'Asset/Font/Pixellari.ttf');
        this.loadFont('regularFont', 'Asset/Font/sourcesanspro-bold.ttf');

        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const bg = this.add.image(width / 2, height / 2, 'minigame_background_preload');
        if (isMobile) {
            const scale = height / 1080;
            bg.setOrigin(0, 0.5).setScale(scale);
            bg.x = 0;
        } else {
            bg.setOrigin(0.5, 0.5).setScale(1);
        }


        this.add.image(layout.CisiniLogo.x, layout.CisiniLogo.y, 'logo_cisini').setOrigin(0.5, 0.5).setScale(layout.CisiniLogo.scale).setDepth(layout.CisiniLogo.depth);


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
            // JALANKAN LOGIKA PORTRAIT: Gunakan posisi x, y yang spesifik
            console.log("Using Portrait layout for Bachelor PPs.");
            
            // Perbaikan: Gunakan ppLayout.positions
            ppLayout.positions.forEach(ppData => {
                this.add.image(ppData.x, ppData.y, ppData.key)
                    // Perbaikan: Gunakan ppLayout.scale
                    .setScale(ppLayout.scale);
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
        
        
        this.loadingFillPattern = this.add.tileSprite(frame.x, frame.y, 
                layout.loadingBar.displayWidth, 
                layout.loadingBar.displayHeight, 
                'loading_fill_pattern'
            );
        
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
            });
            this.scene.start('MainScene', { bachelorName: this.preloaderData.bachelorName });
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