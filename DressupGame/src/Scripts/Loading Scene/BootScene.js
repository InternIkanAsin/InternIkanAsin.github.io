import Phaser from 'phaser';
import { SaveManager } from '../Save System/SaveManager.js';
import { bachelorProgressManager } from '../Save System/BachelorProgressManager.js';
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

                let availableBachelors = bachelorProgressManager.getAvailableBachelors(allBachelorNames);

                // 2. Cek apakah semua bachelor sudah pernah dipilih
                if (bachelorProgressManager.haveAllBachelorsBeenChosen(allBachelorNames)) {
                    // Jika ya, sistem kembali ke mode acak penuh
                    console.log("[BootScene] All bachelors have been chosen. Resetting to full random selection for this session.");
                    availableBachelors = allBachelorNames;
                } else {
                    // Jika TIDAK, gunakan daftar yang belum dipilih
                    console.log("[BootScene] Selecting from available (not yet chosen) bachelors.");
                }

                // 3. Pilih satu secara acak dari daftar yang tersedia
                const randomIndex = Math.floor(Math.random() * availableBachelors.length);
                chosenBachelorName = availableBachelors[randomIndex];

                // 4. Tambahkan bachelor yang baru terpilih ke dalam riwayat
                bachelorProgressManager.addBachelorToHistory(chosenBachelorName);
                console.log(`[BootScene] Randomly selected new bachelor: ${chosenBachelorName}`);
                // --- AKHIR PERGANTIAN BLOK ---
            }
        }
        //const chosenBachelorAssets = bachelorPreloadData[chosenBachelorName];
        this.registry.set('chosenBachelorName', chosenBachelorName);

        this.preloaderData = {
            bachelorName: chosenBachelorName,
            //bachelorAssets: bachelorPreloadData[chosenBachelorName],
        };
        //bg
        this.load.image('minigame_background_preload', "Asset/Background/New_Background.png");
        //player
        this.load.image('player_body_preload', 'Asset/Character/t_basebody_mc_anime_portrait.png');
        this.load.image('player_hair_front_preload', 'Asset/Outfit/Hairs_upscaled/hair_01_black_F_out.png');
        this.load.image('player_hair_back_preload', "Asset/Outfit/Hairs_upscaled/hair_01_black_B_out.png");
        this.load.image('player_lips_preload', "Asset/makeup/MakeupAnime/lips/normal/mc_lips default_normal.png");
        this.load.image('player_eyebrows_preload', "Asset/makeup/MakeupAnime/eyebrow/normal/mc_eb default_normal.png");
        this.load.image('player_pupils_preload', "Asset/makeup/MakeupAnime/pupil/normal/mc_pupil blue_normal.png");
        this.load.image('player_eyelashes_preload', "Asset/makeup/MakeupAnime/eyeleashes/normal/mc_el default_normal.png");
        this.load.image('eyeshadownormaldefault', "Asset/makeup/MakeupAnime/eyeshadow/normal/mc_es default_normal.png");
        this.load.image('player_shirt_preload', "Asset/Outfit/Dress/baju_02.png");
        this.load.image('player_lower_preload', "Asset/Outfit/Lower/rok_hangout.png");
        //logo
        this.load.image('logo_cisini', "Asset/UI/New/LogoDressup.png");
        //loading bar
        this.load.image('loading_frame', "Asset/UI/New/Loading_Bar.png");
        this.load.image('loading_fill', "Asset/UI/New/Loading_Bar_Gradient.png");
        this.load.image('loading_fill_pattern', "Asset/UI/New/Pattern_Hati.png");
        //bachelor pp
        this.load.image('PP_Angga', "Asset/Character/profile picture/PP Angga.png");
        this.load.image('PP_Azril', "Asset/Character/profile picture/PP Azril.png");
        this.load.image('PP_Indra', "Asset/Character/profile picture/PP Indra.png");
        this.load.image('PP_Reza', "Asset/Character/profile picture/PP Reza.png");
        this.load.image('PP_Keenan', "Asset/Character/profile picture/PP Keenan.png");

        this.load.image('PP_Angga_Grey', "Asset/Character/profile picture/AnggaPPgray.png");
        this.load.image('PP_Azril_Grey', "Asset/Character/profile picture/AzrilPPgray.png");
        this.load.image('PP_Indra_Grey', "Asset/Character/profile picture/IndraPPgray.png");
        this.load.image('PP_Reza_Grey', "Asset/Character/profile picture/RezaPPgray.png");
        this.load.image('PP_Keenan_Grey', "Asset/Character/profile picture/KeenanPPgray.png");
        this.load.image('PP_Selected', 'Asset/UI/New/PP_Selected.png');
        this.load.image('ChatBubble', 'Asset/UI/New/Bubble_Chat.png');

        //tickmark untuk bachelorpp
        this.load.image('tickMark', 'Asset/UI/Checkmark.png');
        //mute button
        this.load.atlas('iconAtlas', 'Asset/UI/New/Icon_Spritesheet.png', 'Asset/UI/New/Icon_Spritesheet.json');
        this.load.image('button_kuning', "Asset/UI/New/Btn_Kuning2.png");

        //this.load.image(chosenBachelorAssets.fullbodyKey, chosenBachelorAssets.fullbodyPath);
        //this.load.image(chosenBachelorAssets.expressionKey, chosenBachelorAssets.expressionPath);
    }

    create() {
        this.scene.start('PreloaderScene', this.preloaderData);
    }
}

export default BootScene;