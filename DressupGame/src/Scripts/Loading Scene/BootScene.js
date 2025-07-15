import Phaser from 'phaser';
import { SaveManager } from '../Save System/SaveManager.js';
class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {

        const bachelorPreloadData = {
            Azril: { fullbodyKey: 'azrilFullbody', expressionKey: 'AzrilNeutral', fullbodyPath: 'Asset/Character/ekspresi/Azril/Azril_portrait_casual.png', expressionPath: 'Asset/Character/ekspresi/Azril/Azril_expression_normal.png' },
            Angga: { fullbodyKey: 'anggaFullbody_preload', expressionKey: 'anggaExpression_neutral_preload', fullbodyPath: 'Asset/Character/ekspresi/angga/Angga_casual.png', expressionPath: 'Asset/Character/ekspresi/angga/Angga_netral.png ' },
            Reza: { fullbodyKey: 'rezaFullbody_preload', expressionKey: 'rezaExpression_neutral_preload', fullbodyPath: 'Asset/Character/ekspresi/reza/Reza_portrait_casual.png', expressionPath: 'Asset/Character/ekspresi/reza/Reza_expression_normal.png' },
            Indra: { fullbodyKey: 'indraFullbody_preload', expressionKey: 'indraExpression_neutral_preload', fullbodyPath: 'Asset/Character/ekspresi/indra/Indra_portrait_casual.png', expressionPath: 'Asset/Character/ekspresi/indra/Indra_expression_Normal.png' },
            Keenan: { fullbodyKey: 'keenanFullbody_preload', expressionKey: 'keenanExpression_neutral_preload', fullbodyPath: 'Asset/Character/ekspresi/keenan/Keenan_portrait_casual.png', expressionPath: 'Asset/Character/ekspresi/keenan/Keenan_expression_normal.png' }
        };
        const allBachelorNames = Object.keys(bachelorPreloadData);
        
        const bachelorNames = Object.keys(bachelorPreloadData);




        
        const savedData = SaveManager.loadGame();
        let chosenBachelorName;
        
       
        const bachelorToRestart = this.registry.get('chosenBachelorNameForRestart');

        if (bachelorToRestart) {
            chosenBachelorName = bachelorToRestart;
            console.log(`[BootScene] Restarting with same bachelor: ${chosenBachelorName}`);
            this.registry.remove('chosenBachelorNameForRestart');
        } else {
           
            const savedData = SaveManager.loadGame();
            if (savedData && savedData.bachelor?.chosenName) {
                chosenBachelorName = savedData.bachelor.chosenName;
                console.log(`[BootScene] Found saved bachelor: ${chosenBachelorName}`);
            } else {
                
                const lastBachelor = this.registry.get('lastBachelorName');
                let candidateNames = allBachelorNames;

                if (lastBachelor) {
                    
                    candidateNames = allBachelorNames.filter(name => name !== lastBachelor);
                    console.log(`[BootScene] Excluding last bachelor: ${lastBachelor}. Candidates are:`, candidateNames);
                    
                    this.registry.remove('lastBachelorName');
                }
                
                let currentIndex = Math.floor(Math.random() * candidateNames.length);
                chosenBachelorName = candidateNames[currentIndex];
                console.log(`[BootScene] Randomly selected new bachelor: ${chosenBachelorName}`);
            }
        }
        
        const chosenBachelorAssets = bachelorPreloadData[chosenBachelorName];

        this.registry.set('chosenBachelorName', chosenBachelorName);


        // Simpan semua data yang dibutuhkan untuk dikirim ke scene berikutnya
        this.preloaderData = {
            bachelorName: chosenBachelorName,
            bachelorAssets: bachelorPreloadData[chosenBachelorName],
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