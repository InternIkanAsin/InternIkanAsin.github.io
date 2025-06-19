class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });

        // Define bachelor data specifically for preloader display
        // Keys here should match what you will use in this.load.image()
        this.bachelorPreloadData = {
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
        this.bachelorNames = Object.keys(this.bachelorPreloadData);
    }

    preload() {
        // Load assets ONLY for the Preloader visuals
        //this.load.image('loadingBarBg', 'assets/ui/loading_bar_bg.png');   // Adjust path
        //this.load.image('loadingBarFill', 'assets/ui/loading_bar_fill.png'); // Adjust path
        this.load.image('logo_cisini', "Asset/UI/Logo Cisni.png"); // ADJUST PATH & FILENAME

        // Preload Azril's specific assets for the preloader screen
        let currentIndex = 0; // Default index for the bachelor

        const gameRestarted = this.registry.get('gameRestarted');
        console.log(gameRestarted);
        //if restart, use the same index, else roll a random index
        if (!gameRestarted) {
            const randomIndex = Math.floor(Math.random() * this.bachelorNames.length);
            currentIndex = randomIndex; // Store the random index for potential future use
            this.registry.set('currentBachelorIndex', currentIndex);
        } else {
            this.registry.set('gameRestarted', false); // Reset the flag for next time
            currentIndex = this.registry.get('currentBachelorIndex');
        }

        this.chosenBachelorName = this.bachelorNames[currentIndex]; // DIUBAH: Simpan nama bachelor
        this.chosenBachelorAssetsForPreloader = this.bachelorPreloadData[this.chosenBachelorName];

        // Optional: If you want a very simple placeholder background for PreloaderScene itself
        this.load.image('minigame_background_preload', 'Asset/Background/Cisini_UI_DressUp_Background.png');

        console.log("BootScene: Preloading assets for PreloaderScene display.");

        this.load.image(this.chosenBachelorAssetsForPreloader.fullbodyKey, this.chosenBachelorAssetsForPreloader.fullbodyPath);
        this.load.image(this.chosenBachelorAssetsForPreloader.expressionKey, this.chosenBachelorAssetsForPreloader.expressionPath);
    }

    create() {

        console.log("BootScene: Create - Starting PreloaderScene.");
        this.scene.start('PreloaderScene', {
            bachelorName: this.chosenBachelorName,
            bachelorAssets: {
                fullbodyKey: this.chosenBachelorAssetsForPreloader.fullbodyKey,
                expressionKey: this.chosenBachelorAssetsForPreloader.expressionKey,
                bachelorName: this.chosenBachelorAssetsForPreloader.name // Pass the name too, might be useful
            }
        });
    }
}


export default BootScene;