import Phaser from 'phaser';

class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        const bachelorPreloadData = {
            Azril: { fullbodyKey: 'azrilFullbody', expressionKey: 'AzrilNeutral', fullbodyPath: 'Asset/Character/ekspresi/Azril/Azril_portrait_casual.png', expressionPath: 'Asset/Character/ekspresi/Azril/Azril_expression_normal.png' },
            Angga: { fullbodyKey: 'anggaFullbody_preload', expressionKey: 'anggaExpression_neutral_preload', fullbodyPath: 'Asset/Character/ekspresi/angga/Angga_casual.png', expressionPath: 'Asset/Character/ekspresi/angga/Angga_netral.png ' },
            Reza:  { fullbodyKey: 'rezaFullbody_preload', expressionKey: 'rezaExpression_neutral_preload', fullbodyPath: 'Asset/Character/ekspresi/reza/Reza_portrait_casual.png', expressionPath: 'Asset/Character/ekspresi/reza/Reza_expression_normal.png' },
            Indra: { fullbodyKey: 'indraFullbody_preload', expressionKey: 'indraExpression_neutral_preload', fullbodyPath: 'Asset/Character/ekspresi/indra/Indra_portrait_casual.png', expressionPath: 'Asset/Character/ekspresi/indra/Indra_expression_Normal.png' },
            Keenan:{ fullbodyKey: 'keenanFullbody_preload', expressionKey: 'keenanExpression_neutral_preload', fullbodyPath: 'Asset/Character/ekspresi/keenan/Keenan_portrait_casual.png', expressionPath: 'Asset/Character/ekspresi/keenan/Keenan_expression_normal.png' }
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
        
        const chosenBachelorName = bachelorNames[currentIndex];
        const chosenBachelorAssets = bachelorPreloadData[chosenBachelorName];

        
        this.preloaderData = {
            bachelorName: chosenBachelorName,
            bachelorAssets: chosenBachelorAssets
        };

        
        this.load.image('minigame_background_preload', 'Asset/Background/Cisini_UI_DressUp_Background.png');
        this.load.image('logo_cisini', "Asset/UI/Logo Cisni.png");
        this.load.image(chosenBachelorAssets.fullbodyKey, chosenBachelorAssets.fullbodyPath);
        this.load.image(chosenBachelorAssets.expressionKey, chosenBachelorAssets.expressionPath);
    }

    create() {
        this.scene.start('PreloaderScene', this.preloaderData);
    }
}

export default BootScene;