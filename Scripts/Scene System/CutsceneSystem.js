// DialogueManager Class
import { DialogueManager } from '../Dialogue System/DialogueManager.js';
// DialogueData Class
import { DialogueData } from '../Dialogue System/DialogueData.js';


export class CutsceneSystem {
    constructor(scene) {
        this.scene = scene;
    }

    initiateCutscene1() {
        const { width, height } = this.scene.sys.game.config;

        // Fade in cutscene
        this.cutscene1 = this.scene.add.image(width / 2 + 100, height / 2, 'cutscene1').setScale(0.5);
        this.scene.cameras.main.fadeIn(3000);
        this.scene.AudioManager.playMusic('cutsceneMusic');
        // Create and display dialogue after fade-in
        this.scene.cameras.main.once('camerafadeincomplete', () => {
            this.dialogue1 = new DialogueData();
            this.dialogue1.addLine("Azril", "pergi yok");
            this.dialogue1.addLine("me", "KYAAA >///< kuy");

            this.scene.DialogueManager.dialogueContainer["cutscene1"] = this.dialogue1.getDialogue();

            this.scene.DialogueManager.showDialogue(this.scene.DialogueManager.dialogueContainer["cutscene1"], () => {
                // Fade out when dialogue is done
                this.scene.cameras.main.fadeOut(2000);
            });
        });

       this.scene.SceneManager.TransitionCutscene1();
    }

    initiateCutscene2(statPoints){
        const { width, height } = this.scene.sys.game.config;
        //Dialogue choices depending on your choice of outfit
        if(statPoints < 4){
            this.scene.AudioManager.fadeInMusic('cutsceneMusic', 1000);
            this.dialogue2 = new DialogueData();
            this.dialogue2.addLine("Azril", "defak what u wearin sis");
            this.dialogue2.addLine("me", "KYAAA >///< gatau deh");

        }else if(statPoints >= 5 && statPoints <= 6){
            this.scene.AudioManager.fadeInMusic('cutsceneMusic', 1000);
            this.dialogue2 = new DialogueData();
            this.dialogue2.addLine("Azril", "oke la ya");
            this.dialogue2.addLine("me", "KYAAA >///< apaan oke la?");

        }else if(statPoints > 6){
            this.scene.AudioManager.fadeInMusic('cutsceneMusic', 1000);
            this.dialogue2 = new DialogueData();
            this.dialogue2.addLine("Azril", "GYAAAATTT");
            this.dialogue2.addLine("Azril", "nikah yok");
            this.dialogue2.addLine("me", "KYAAA >///< ogah, keenan lbh baik utkku");

        }

        //Push dialogue to dialogue container after determining which dialogue obtained
        this.scene.DialogueManager.dialogueContainer["cutscene2"] = this.dialogue2.getDialogue();

        //Start cutscene
        this.cutscene2 = this.scene.add.image(width / 2 + 100, height / 2, 'cutscene2').setScale(0.5) .setDepth(0);
        this.scene.cameras.main.fadeIn(3000);


        // Create and display dialogue after fade-in
        this.scene.cameras.main.once('camerafadeincomplete', () => {
            this.scene.DialogueManager.showDialogue(this.scene.DialogueManager.dialogueContainer["cutscene2"], () => {
                // Fade out when dialogue is done
                this.scene.cameras.main.fadeOut(2000);
            });
        });
    }

    
    
}
