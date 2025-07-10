import Phaser from 'phaser';
import { SaveManager } from '../SaveManager.js';
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

        
        

        // 1. Coba muat data simpanan
        const savedData = SaveManager.loadGame();
        let chosenBachelorName;

        if (savedData && savedData.bachelor?.chosenName) {
            // 2. Jika ada, gunakan nama dari data simpanan
            chosenBachelorName = savedData.bachelor.chosenName;
            console.log(`[BootScene] Found saved bachelor: ${chosenBachelorName}`);
        } else {
            // 3. Jika tidak, jalankan logika acak
            let currentIndex = Math.floor(Math.random() * bachelorNames.length);
            this.registry.set('currentBachelorIndex', currentIndex);
            chosenBachelorName = bachelorNames[currentIndex];
            console.log(`[BootScene] No save file. Loading random bachelor: ${chosenBachelorName}`);
        }
        
        // Dapatkan aset berdasarkan nama yang terpilih
        const chosenBachelorAssets = bachelorPreloadData[chosenBachelorName];
        
        // Simpan semua data yang dibutuhkan untuk dikirim ke scene berikutnya
        this.preloaderData = {
            bachelorName: chosenBachelorName,
            bachelorAssets: chosenBachelorAssets,
            savedData: savedData // Kirim juga seluruh data simpanan
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