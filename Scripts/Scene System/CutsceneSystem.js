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

        this.scene.backgroundCutscene1 = this.scene.add.image(width / 2, height / 2, 'bachelorBackground').setDepth(-1).setScale(3);
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

    initiateCutscene2(bachelorName, datePlace, statPoints) {
        const { width, height } = this.scene.sys.game.config;


        const bachelorData = this.scene.BachelorManager.initializeAndSelectBachelor(bachelorName);
        const bachelorChoice = bachelorData.bachelorSprite;
        const bachelorExpression = bachelorData.bachelorExpression;


        this.scene.chosenBachelorExpression = bachelorExpression;

        this.scene.backgroundCutscene2 = this.scene.add.image(width / 2, height / 2, 'theaterBackground').setDepth(-1).setVisible(true);

        const originalWidth = this.scene.backgroundCutscene2.width;
        const originalHeight = this.scene.backgroundCutscene2.height;


        const newWidth = width * 1.5;
        const newHeight = originalHeight

        this.scene.backgroundCutscene2.setDisplaySize(newWidth, newHeight);

        console.log("Cutscene 2 Background created:", this.scene.backgroundCutscene2);
        // Dialogue choices depending on your choice of outfit
        if (statPoints < 6) {
            this.scene.chosenBachelorExpression.setTexture(bachelorName + 'Sad');
            this.selectedDialogue = bachelorDialoguesContainer[bachelorName][datePlace + 'After2'].getDialogue();
        } else if (statPoints >= 6) {
            this.scene.chosenBachelorExpression.setTexture(bachelorName + 'Happy');
            this.selectedDialogue = bachelorDialoguesContainer[bachelorName][datePlace + 'After'].getDialogue();
        }

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
                this.scene.TweeningUtils.openCurtains();
            });
        });
    }



}
