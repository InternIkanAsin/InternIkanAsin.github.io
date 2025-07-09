import AssetLoader from '../AssetLoader.js'; 
import { layout } from '../ScreenOrientationUtils.js';
import Phaser from 'phaser';
class PreloaderScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloaderScene' });

    }


    preload() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const barLayout = { barWidth: 1300, barHeight: 60, barY: height * 0.85 };
        const barX = width / 2 - barLayout.barWidth / 2;

        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(barX, barLayout.barY, barLayout.barWidth, barLayout.barHeight);

        const progressBar = this.add.graphics();
        const percentText = this.make.text({ x: width / 2, y: barLayout.barY + barLayout.barHeight / 2, text: '0%', style: { font: '18px monospace', fill: '#000000' } }).setOrigin(0.5, 0.5);
        const assetText = this.make.text({ x: width / 2, y: barLayout.barY + barLayout.barHeight + 30, text: '', style: { font: '18px monospace', fill: '#000000' } }).setOrigin(0.5, 0.5);

       
        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(barX + 2, barLayout.barY + 2, (barLayout.barWidth - 4) * value, barLayout.barHeight - 4);
            percentText.setText(parseInt(value * 100) + '%');
        });

        this.load.on('fileprogress', (file) => {
            assetText.setText('Loading: ' + file.key);
        });

        this.load.on('complete', () => {
            console.log('PreloaderScene: All assets loaded.');
            progressBar.destroy();
            progressBox.destroy();
            percentText.destroy();
            assetText.destroy();
            loadingText.destroy();
            this.scene.start('MainScene', { bachelorName: this.chosenBachelorName });
        });

        
        const loadingText = this.make.text({ x: width / 2, y: barLayout.barY - 30, text: 'Loading...', style: { font: '20px monospace', fill: '#ffffff' } }).setOrigin(0.5, 0.5);

        
        const bachelorPreloadData = {
            Azril: {
                fullbodyKey: 'azrilFullbody',
                expressionKey: 'AzrilNeutral',
                fullbodyPath: 'Asset/Character/ekspresi/Azril/Azril_portrait_casual.png',
                expressionPath: 'Asset/Character/ekspresi/Azril/Azril_expression_normal.png'
            },
            Angga: {
                fullbodyKey: 'anggaFullbody_preload',
                expressionKey: 'anggaExpression_neutral_preload',
                fullbodyPath: 'Asset/Character/ekspresi/angga/Angga_casual.png',
                expressionPath: 'Asset/Character/ekspresi/angga/Angga_netral.png '
            },
            Reza: {
                fullbodyKey: 'rezaFullbody_preload',
                expressionKey: 'rezaExpression_neutral_preload',
                fullbodyPath: 'Asset/Character/ekspresi/reza/Reza_portrait_casual.png',
                expressionPath: 'Asset/Character/ekspresi/reza/Reza_expression_normal.png'
            },
            Indra: {
                fullbodyKey: 'indraFullbody_preload',
                expressionKey: 'indraExpression_neutral_preload',
                fullbodyPath: 'Asset/Character/ekspresi/indra/Indra_portrait_casual.png',
                expressionPath: 'Asset/Character/ekspresi/indra/Indra_expression_Normal.png'
            },
            Keenan: {
                fullbodyKey: 'keenanFullbody_preload',
                expressionKey: 'keenanExpression_neutral_preload',
                fullbodyPath: 'Asset/Character/ekspresi/keenan/Keenan_portrait_casual.png',
                expressionPath: 'Asset/Character/ekspresi/keenan/Keenan_expression_normal.png'
            }
        };
        const bachelorNames = Object.keys(bachelorPreloadData);
        let currentIndex = 0;
        const gameRestarted = this.registry.get('gameRestarted');
        if (!gameRestarted) {
            currentIndex = Math.floor(Math.random() * bachelorNames.length);
            this.registry.set('currentBachelorIndex', currentIndex);
        } else {
            this.registry.set('gameRestarted', false);
            currentIndex = this.registry.get('currentBachelorIndex');
        }
        this.chosenBachelorName = bachelorNames[currentIndex];
        const chosenBachelorAssets = bachelorPreloadData[this.chosenBachelorName];

       
        this.load.image('minigame_background_preload', 'Asset/Background/Cisini_UI_DressUp_Background.png');
        this.load.image('logo_cisini', "Asset/UI/Logo Cisni.png");
        this.load.image(chosenBachelorAssets.fullbodyKey, chosenBachelorAssets.fullbodyPath);
        this.load.image(chosenBachelorAssets.expressionKey, chosenBachelorAssets.expressionPath);

       
        this.load.on('filecomplete-image-minigame_background_preload', (key) => {
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            if (isMobile) {
                const scale = height / 1080;
                this.add.image(0, height / 2, key).setOrigin(0, 0.5).setScale(scale).setDepth(-1);
            } else {
                this.add.image(width / 2, height / 2, key).setOrigin(0.5, 0.5).setScale(1).setDepth(-1);
            }
        });

        this.load.on('filecomplete-image-logo_cisini', (key) => {
            this.add.image(layout.CisiniLogo.x, layout.CisiniLogo.y, key).setOrigin(0.5, 0.5).setScale(layout.CisiniLogo.scale).setDepth(layout.CisiniLogo.depth);
        });

        this.load.on('filecomplete-image-' + chosenBachelorAssets.expressionKey, () => {
            const bachelorX = width * 0.30;
            const bachelorY = height * 0.85;
            const bachelorFullbody = this.add.image(0, 0, chosenBachelorAssets.fullbodyKey);
            const bachelorExpression = this.add.image(0, 0, chosenBachelorAssets.expressionKey);
            bachelorFullbody.setOrigin(0.5, 1);
            bachelorExpression.setOrigin(0.5, 0.3);
            const expressionOffsetY = -bachelorFullbody.displayHeight * 0.7;
            const expressionOffsetX = chosenBachelorAssets.expressionKey === 'anggaExpression_neutral_preload' ? -5 : 0;
            bachelorExpression.setPosition(bachelorFullbody.x + expressionOffsetX, bachelorFullbody.y + expressionOffsetY);
            this.add.container(bachelorX, bachelorY, [bachelorFullbody, bachelorExpression]).setScale(1.5);
        });


        
        AssetLoader.loadGame(this);
        AssetLoader.loadMiniGame(this)

    }

    create() {
    }

}


export default PreloaderScene;