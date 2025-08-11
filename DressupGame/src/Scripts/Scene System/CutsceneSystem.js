import { layout } from '../ScreenOrientationUtils.js';
import UIButton from '../UI/UIButton.js';
//Bachelor Dialogues Class
import { bachelorDialoguesContainer, initializeBachelorDialogue } from '../Bachelor/bachelorDialogues.js';

export class CutsceneSystem {
    constructor(scene) {
        this.scene = scene;
    }

    initiateCutscene1(bachelorChoice, bachelorName, datePlace) {
        const { width, height } = this.scene.sys.game.config;
        const scene = this.scene;
        //this.scene.backgroundCutscene1 = this.scene.add.image(layout.cutsceneBG.x, layout.cutsceneBG.y, bachelorName + datePlace).setDepth(layout.cutsceneBG.depth).setDisplaySize(layout.cutsceneBG.width, layout.cutsceneBG.height);
        scene.backgroundCutscene1 = this.scene.add.image(width / 2, height / 2, 'cutscene1Background').setDepth(layout.cutsceneBG.depth).setDisplaySize(layout.cutsceneBG.width, layout.cutsceneBG.height);

        scene.phoneBackground = this.scene.add.image(width / 2, height / 1.7, 'phoneBackground').setDisplaySize(700, 900);
        scene.phone = this.scene.add.image(width / 2, height / 1.3, 'phone').setScale(1.5).setDepth(101);

        scene.nameText = this.scene.add.text(width / 2, height / 1.7, bachelorName, {
            fontSize: '64px',
            fill: '#60292b',
            fontFamily: 'regularFont',
            wordWrap: { width: width - 120 }
        }).setOrigin(0.5, 0.5);
        scene.callStatus = this.scene.add.text(width / 2, height / 1.55, 'Incoming Call...', {
            fontSize: '32px',
            fill: '#60292b',
            fontFamily: 'regularFont',
            wordWrap: { width: width - 120 }
        }).setOrigin(0.5, 0.5);

        scene.profileBorder = this.scene.add.image(width / 2, height / 2.5, 'bachelor_profileOutside').setScale(0.52);
        scene.profileInside = this.scene.add.image(width / 2, height / 2.5, 'bachelor_profileInside').setScale(0.49);
        scene.acceptCallButton = new UIButton(scene, scene.AudioManager, {
            x: width / 2,
            y: height / 1.15,
            textureButton: 'callIcon',
            buttonWidth: 75,
            buttonHeight: 75,
            textureIcon: '',
            iconYPosition: -10,
            iconScale: 0.8 * 2,
            callback: () => {
                this.acceptCall(bachelorChoice, bachelorName, datePlace);
            },
            buttonText: '',
            buttonScale: 1,
        }).setDepth(99);

        //Bounce button
        scene.tweens.add({
            targets: [scene.acceptCallButton],
            y: scene.acceptCallButton.y + 10,
            duration: 500,
            ease: 'Bounce.out',
            yoyo: true,
            repeat: -1
        })
        scene.add.existing(bachelorChoice);

        bachelorChoice.y = height / 2 * 1.7;
        bachelorChoice.setVisible(true).setDepth(100).setAlpha(0);

        //this.scene.cameras.main.fadeIn(3000);
        scene.AudioManager.playMusic('cutsceneMusic');
        scene.AudioManager.fadeInMusic('cutsceneMusic');
    }

    acceptCall(bachelorChoice, bachelorName, datePlace) {
        const scene = this.scene;
        const callStatusText = 'Calling...';
        scene.callStatus.setText(callStatusText);
        scene.acceptCallButton.disableInteractive();
        scene.tweens.add({
            targets: [scene.profileBorder, scene.profileInside],
            scale: 0,
            duration: 100,
            ease: 'Power2',
            onComplete: () => {
                scene.tweens.add({ targets: [scene.nameText], y: scene.nameText.y - 325, duration: 500, ease: 'Sine.easeInOut' });
                scene.tweens.add({ targets: [scene.callStatus], y: scene.callStatus.y - 325, duration: 500, ease: 'Sine.easeInOut' });
                scene.tweens.add({ targets: [scene.acceptCallButton], alpha: 0, duration: 250, ease: 'Sine.easeInOut' });
            }
        })

        scene.tweens.add({
            targets: bachelorChoice,
            alpha: 1,
            duration: 1000,
            ease: 'Sine.easeInOut',
            onComplete: () => {
                scene.time.delayedCall(1000, () => {
                    const bachelorDialogue = bachelorDialoguesContainer[bachelorName][datePlace].getDialogue();

                    scene.DialogueManager.showDialogue(bachelorDialogue, () => {
                        scene.cameras.main.fadeOut(2000);
                        scene.SceneManager.TransitionCutscene1();
                    });
                });
            }
        })
    }
    initiateCutscene2(bachelorName, datePlace) {
        const { width, height } = this.scene.sys.game.config;


        const bachelorData = this.scene.BachelorManager.initializeAndSelectBachelor(bachelorName);
        const bachelorChoice = bachelorData.bachelorSprite;
        const bachelorExpression = bachelorData.bachelorExpression;


        this.scene.chosenBachelorExpression = bachelorExpression;

        this.scene.backgroundCutscene2 = this.scene.add.image(layout.cutsceneBG.x, layout.cutsceneBG.y, bachelorName + datePlace).setDepth(layout.cutsceneBG.depth).setDisplaySize(layout.cutsceneBG.width, layout.cutsceneBG.height);

        console.log("Cutscene 2 Background created:", this.scene.backgroundCutscene2);


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

        bachelorChoice.x = width / 2;
        bachelorChoice.y = height / 2 * 1.1;
        bachelorChoice.setVisible(true);

        this.scene.cameras.main.fadeIn(3000);
        this.scene.AudioManager.playMusic('cutsceneMusic2');
        this.scene.AudioManager.fadeInMusic('cutsceneMusic2');
        const dialogueConfig = {
            style: 'named', 
            showName: true  
        };

        this.scene.cameras.main.once('camerafadeincomplete', () => {
            this.scene.DialogueManager.showDialogue(this.selectedDialogue, () => {
                this.scene.darkOverlay.setVisible(true);
                this.scene.MiniGameManager.createEndingPanel();
                this.scene.leftCurtain.setDepth(152);
                this.scene.rightCurtain.setDepth(152);
                this.scene.TweeningUtils.closeCurtains();

                this.selectedDialogue = null;

            }, dialogueConfig);
        });
    }



}
