import AssetLoader from '../AssetLoader.js'; // Assuming your AssetLoader has the main loadAllAssets function
import { layout } from '../ScreenOrientationUtils.js';

class PreloaderScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloaderScene' });
        this.progressBar = null;
        this.progressBox = null;
        this.loadingText = null;
        this.percentText = null;
        this.assetText = null;
        this.bachelorContainer = null;
        this.bachelorDisplayAssets = null;
        this.mainBg = null;
        this.logo = null;
        this.chosenBachelorName = null;
    }
    init(data) {
        console.log("[PreloaderScene] Diinisialisasi dengan data:", data);
        this.chosenBachelorName = data.bachelorName || 'Azril';
        this.bachelorDisplayAssets = data.bachelorAssets || {
            fullbodyKey: 'azrilFullbody',
            expressionKey: 'AzrilNeutral',
        };
    }

    preload() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // --- 1. Display Background ---
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
        if (isMobile) {
            
            const scale = height / 1080; 
            this.add.image(0, height / 2, 'minigame_background_preload')
                .setOrigin(0, 0.5)
                .setScale(scale);
        } else {
            
            this.add.image(width / 2, height / 2, 'minigame_background_preload')
                .setOrigin(0.5, 0.5)
                .setScale(1); 
        }

        // --- 2. Display Logo ---
        // Position it, e.g., at the top
        this.add.image(layout.CisiniLogo.x, layout.CisiniLogo.y, 'logo_cisini').setOrigin(0.5, 0.5).setScale(layout.CisiniLogo.scale).setDepth(layout.CisiniLogo.depth); // Adjust scale/pos

        // --- 3. Display Predetermined Bachelor (Azril for now) ---
        // Bachelor assets were loaded in BootScene
        const bachelorX = width * 0.30; // Position to the right
        const bachelorY = height * 0.85; // Position lower part of screen

        // Use the keys received from BootScene
        const bachelorFullbody = this.add.image(0, 0, this.bachelorDisplayAssets.fullbodyKey);
        const bachelorExpression = this.add.image(0, 0, this.bachelorDisplayAssets.expressionKey);

        // Adjust origins if your assets are not centered, or adjust relative positions
        bachelorFullbody.setOrigin(0.5, 1);
        bachelorExpression.setOrigin(0.5, 0.3); // Or adjust based on your art

        // Example relative positioning for expression on fullbody
        // This requires knowing the pixel offsets from your art.
        // These are just placeholder values.
        const expressionOffsetY = -bachelorFullbody.displayHeight * 0.7; // Fine-tune this value
        bachelorExpression.setPosition(bachelorFullbody.x, bachelorFullbody.y + expressionOffsetY);

        this.bachelorContainer = this.add.container(bachelorX, bachelorY, [bachelorFullbody, bachelorExpression]);
        this.bachelorContainer.setScale(1.5); // Adjust overall scale

        // You could also display the bachelor's name if desired:
        // this.add.text(bachelorX, bachelorY + 30, this.bachelorDisplayAssets.bachelorName || '', {font: '16px monospace', fill: '#000000'}).setOrigin(0.5, 0);


        // --- 4. Setup Graphics-based Loading Bar ---
        // ... (Your existing progress bar graphics setup - KEEP AS IS)
        const barWidth = 1300; const barHeight = 60;
        const barX = width / 2 - barWidth / 2; const barY = height * 0.85;
        this.progressBox = this.add.graphics();
        this.progressBox.fillStyle(0x444444, 0.8);
        this.progressBox.fillRect(barX, barY, barWidth, barHeight);
        this.progressBar = this.add.graphics();


        // --- 5. Setup Text Elements (KEEP AS IS) ---
        // ... (loadingText, percentText, assetText with black fill) ...
        this.loadingText = this.make.text({ x: width / 2, y: barY - 30, text: 'Loading...', style: { font: '20px monospace', fill: '#000000' } }).setOrigin(0.5, 0.5);
        this.percentText = this.make.text({ x: width / 2, y: barY + barHeight / 2, text: '0%', style: { font: '18px monospace', fill: '#000000' } }).setOrigin(0.5, 0.5);
        this.assetText = this.make.text({ x: width / 2, y: barY + barHeight + 30, text: '', style: { font: '18px monospace', fill: '#000000' } }).setOrigin(0.5, 0.5);


        // --- 6. Register Phaser Loader Events  ---
        this.load.on('progress', (value) => { /* ... update progressBar ... */
            this.percentText.setText(parseInt(value * 100) + '%');
            this.progressBar.clear();
            this.progressBar.fillStyle(0xffffff, 1);
            this.progressBar.fillRect(barX + 2, barY + 2, (barWidth - 4) * value, barHeight - 4);
        });
        this.load.on('fileprogress', (file) => { this.assetText.setText('Loading: ' + file.key); });
        this.load.on('complete', () => {
            console.log('PreloaderScene: All assets loaded.');
            this.progressBar.destroy(); this.progressBox.destroy();
            this.loadingText.destroy(); this.percentText.destroy(); this.assetText.destroy();
            // Optionally destroy bachelorContainer if not needed after preload, or let MainScene cover it
            // this.bachelorContainer.destroy(); 
            this.scene.start('MainScene', { bachelorName: this.chosenBachelorName });
        });

        // --- 7. START LOADING ALL MAIN GAME ASSETS ---
        //AssetLoader.loadAllAssets(this);
        AssetLoader.loadGame(this);
        AssetLoader.loadMiniGame(this);
    }

    create() {
        // Usually empty as 'complete' event handles the transition
    }
}


export default PreloaderScene;