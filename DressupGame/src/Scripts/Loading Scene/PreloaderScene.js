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
    preload() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

       
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
        
        
        const bachelorAssets = this.preloaderData.bachelorAssets;
        const bachelorX = width * 0.30;
        const bachelorY = height * 0.85;
        const bachelorFullbody = this.add.image(0, 0, bachelorAssets.fullbodyKey);
        const bachelorExpression = this.add.image(0, 0, bachelorAssets.expressionKey);
        bachelorFullbody.setOrigin(0.5, 1);
        bachelorExpression.setOrigin(0.5, 0.3);
        const expressionOffsetY = -bachelorFullbody.displayHeight * 0.7;
        const expressionOffsetX = bachelorAssets.expressionKey === 'anggaExpression_neutral_preload' ? -5 : 0;
        bachelorExpression.setPosition(bachelorFullbody.x + expressionOffsetX, bachelorFullbody.y + expressionOffsetY);
        this.add.container(bachelorX, bachelorY, [bachelorFullbody, bachelorExpression]).setScale(1.5);


        
        const barLayout = { barWidth: 1300, barHeight: 60, barY: height * 0.85 };
        const barX = width / 2 - barLayout.barWidth / 2;
        
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(barX, barLayout.barY, barLayout.barWidth, barLayout.barHeight);
        
        const progressBar = this.add.graphics();
        const percentText = this.make.text({ x: width / 2, y: barLayout.barY + barLayout.barHeight / 2, text: '0%', style: { font: '18px monospace', fill: '#000000' } }).setOrigin(0.5, 0.5);
        const assetText = this.make.text({ x: width / 2, y: barLayout.barY + barLayout.barHeight + 30, text: '', style: { font: '18px monospace', fill: '#000000' } }).setOrigin(0.5, 0.5);
        this.make.text({ x: width / 2, y: barLayout.barY - 30, text: 'Loading...', style: { font: '20px monospace', fill: '#000000' } }).setOrigin(0.5, 0.5);
        
        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(barX + 2, barLayout.barY + 2, (barLayout.barWidth - 4) * value, barLayout.barHeight - 4);
            percentText.setText(parseInt(value * 100) + '%');
        });
        this.load.on('fileprogress', (file) => assetText.setText('Loading: ' + file.key));
        this.load.on('complete', () => {
             this.scene.start('MainScene', { bachelorName: this.preloaderData.bachelorName });
        });

        
        AssetLoader.loadGame(this);
        AssetLoader.loadMiniGame(this);

    }

    create() {
    }

}


export default PreloaderScene;