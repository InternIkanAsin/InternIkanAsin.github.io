// DialogueManager Class
import { DialogueManager } from '../Dialogue System/DialogueManager.js';
// DialogueData Class
import { DialogueData } from '../Dialogue System/DialogueData.js';

//Bachelor Dialogues Class
import { bachelorDialoguesContainer, initializeBachelorDialogue } from '../Bachelor/bachelorDialogues.js';

export class CutsceneSystem {
    constructor(scene) {
        this.scene = scene;
    }

    initiateCutscene1(bachelorChoice, bachelorName, datePlace) {
        const { width, height } = this.scene.sys.game.config;

        this.scene.backgroundCutscene1 = this.scene.add.image(width / 2, height / 2, bachelorName + datePlace).setDepth(-1).setDisplaySize(this.scene.scale.width, this.scene.scale.height);
        // Fade in cutscene
        this.scene.add.existing(bachelorChoice);

        bachelorChoice.x = width / 2;
        bachelorChoice.y = height / 2 * 1.1;
        bachelorChoice.setVisible(true);

        this.scene.cameras.main.fadeIn(3000);
        this.scene.AudioManager.playMusic('cutsceneMusic');
        this.scene.AudioManager.fadeInMusic('cutsceneMusic');
        // Create and display dialogue after fade-in
        this.scene.cameras.main.once('camerafadeincomplete', () => {

            const bachelorDialogue = bachelorDialoguesContainer[bachelorName][datePlace].getDialogue();
            this.scene.DialogueManager.showDialogue(bachelorDialogue, () => {
                // Fade out when dialogue is done
                this.scene.cameras.main.fadeOut(2000);
                this.scene.SceneManager.TransitionCutscene1();
            });
        });


    }

    initiateCutscene2(bachelorName, datePlace) {
        const { width, height } = this.scene.sys.game.config;


        const bachelorData = this.scene.BachelorManager.initializeAndSelectBachelor(bachelorName);
        const bachelorChoice = bachelorData.bachelorSprite;
        const bachelorExpression = bachelorData.bachelorExpression;


        this.scene.chosenBachelorExpression = bachelorExpression;

        this.scene.backgroundCutscene2 = this.scene.add.image(width / 2, height / 2, bachelorName + datePlace).setDepth(-1).setVisible(true);

        const originalWidth = this.scene.backgroundCutscene2.width;
        const originalHeight = this.scene.backgroundCutscene2.height;




        this.scene.backgroundCutscene2.setDisplaySize(width, height);

        console.log("Cutscene 2 Background created:", this.scene.backgroundCutscene2);
        // Dialogue choices depending on your choice of outfit

        this.scene.chosenBachelorExpression.setTexture(bachelorName + 'Happy');
        const randomIndex = Math.floor(Math.random() * 5);

        const randomDialogueInitialized = this.scene.registry.get('randomDialogueInitialized')
        if (!randomDialogueInitialized) {
            initializeBachelorDialogue("AfterHangout", "0", [
                { speakerName: bachelorName, dialogue: "There you are, you look amazing!" }
            ])

            initializeBachelorDialogue("AfterHangout", "1", [
                { speakerName: bachelorName, dialogue: "You're here! You look gorgeous!" }
            ])

            initializeBachelorDialogue("AfterHangout", "2", [
                { speakerName: bachelorName, dialogue: "You made it! You look... beautiful." }
            ])

            initializeBachelorDialogue("AfterHangout", "3", [
                { speakerName: bachelorName, dialogue: "Hey, you're here! You look lovely." }
            ])

            initializeBachelorDialogue("AfterHangout", "4", [
                { speakerName: bachelorName, dialogue: "Wow... you're here... and you look stunning!" }
            ])

            this.scene.registry.set('randomDialogueInitialized', true);
        }

        this.selectedDialogue = bachelorDialoguesContainer["AfterHangout"][randomIndex].getDialogue();
        this.selectedDialogue[0].speakerName = bachelorName;
        // Start cutscene
        bachelorChoice.x = width / 2;
        bachelorChoice.y = height / 2 * 1.1;
        bachelorChoice.setVisible(true);

        this.scene.cameras.main.fadeIn(3000);
        this.scene.AudioManager.playMusic('cutsceneMusic');

        // Create and display dialogue after fade-in
        this.scene.cameras.main.once('camerafadeincomplete', () => {
            this.scene.DialogueManager.showDialogue(this.selectedDialogue, () => {
                this.scene.darkOverlay.setVisible(true);
                this.scene.MiniGameManager.createEndingPanel();
                this.scene.leftCurtain.setDepth(151);
                this.scene.rightCurtain.setDepth(151);
                this.scene.TweeningUtils.openCurtains();

                this.selectedDialogue = null;

            });
        });
    }



}
