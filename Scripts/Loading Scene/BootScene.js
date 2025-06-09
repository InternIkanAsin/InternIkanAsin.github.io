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
           //Angga: {
           //    fullbodyKey: 'anggaFullbody_preload',
           //    expressionKey: 'anggaExpression_neutral_preload',
           //    fullbodyPath: 'Assets/characters/angga/angga_fullbody_neutral.png', // Adjust paths
           //    expressionPath: 'assets/characters/angga/expressions/angga_expr_neutral.png'
           //},
           //Reza: {
           //    fullbodyKey: 'rezaFullbody_preload',
           //    expressionKey: 'rezaExpression_neutral_preload',
           //    fullbodyPath: 'assets/characters/reza/reza_fullbody_neutral.png', // Adjust paths
           //    expressionPath: 'assets/characters/reza/expressions/reza_expr_neutral.png'
           //},
           //Indra: {
           //    fullbodyKey: 'indraFullbody_preload',
           //    expressionKey: 'indraExpression_neutral_preload',
           //    fullbodyPath: 'assets/characters/indra/indra_fullbody_neutral.png', // Adjust paths
           //    expressionPath: 'assets/characters/indra/expressions/indra_expr_neutral.png'
           //},
           //Keenan: {
           //    fullbodyKey: 'keenanFullbody_preload',
           //    expressionKey: 'keenanExpression_neutral_preload',
           //    fullbodyPath: 'assets/characters/keenan/keenan_fullbody_neutral.png', // Adjust paths
           //    expressionPath: 'assets/characters/keenan/expressions/keenan_expr_neutral.png'
           //}
            
        };
        this.bachelorNames = Object.keys(this.bachelorPreloadData);
    }

    preload() {
        // Load assets ONLY for the Preloader visuals
        //this.load.image('loadingBarBg', 'assets/ui/loading_bar_bg.png');   // Adjust path
        //this.load.image('loadingBarFill', 'assets/ui/loading_bar_fill.png'); // Adjust path
        this.load.image('logo_cisini', "Asset/UI/Logo Cisni.png"); // ADJUST PATH & FILENAME
        
        // Preload Azril's specific assets for the preloader screen
       

        const randomIndex = Math.floor(Math.random() * this.bachelorNames.length);
        const chosenBachelorName = this.bachelorNames[randomIndex];
        this.chosenBachelorAssetsForPreloader = this.bachelorPreloadData[chosenBachelorName];

        // Optional: If you want a very simple placeholder background for PreloaderScene itself
        this.load.image('minigame_background_preload', 'Asset/Background/Cisini_UI_DressUp_Background.png');

        console.log("BootScene: Preloading assets for PreloaderScene display.");

        this.load.image(this.chosenBachelorAssetsForPreloader.fullbodyKey, this.chosenBachelorAssetsForPreloader.fullbodyPath);
        this.load.image(this.chosenBachelorAssetsForPreloader.expressionKey, this.chosenBachelorAssetsForPreloader.expressionPath);
    }

    create() {
       
       console.log("BootScene: Create - Starting PreloaderScene.");
        this.scene.start('PreloaderScene', { 
            // Pass the KEYS of the assets that BootScene just loaded
            bachelorAssets: {
                fullbodyKey: this.chosenBachelorAssetsForPreloader.fullbodyKey,
                expressionKey: this.chosenBachelorAssetsForPreloader.expressionKey,
                bachelorName: this.chosenBachelorAssetsForPreloader.name // Pass the name too, might be useful
            }
        });
    }
}


export default BootScene;