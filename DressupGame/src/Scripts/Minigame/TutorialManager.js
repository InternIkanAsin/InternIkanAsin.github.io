//UI Button class to create continue button
import UIButton from "../UI/UIButton.js";

export class TutorialManager {
    constructor(scene) {
        this.scene = scene;
        this.hasFinishedTutorial = false;
    }

    startTutorial() {
        if (this.hasFinishedTutorial) return;
        this.tutorialOverlay = this.scene.add.rectangle(
            this.scene.cameras.main.centerX,
            this.scene.cameras.main.centerY,
            this.scene.cameras.main.width,
            this.scene.cameras.main.height,
            0x000000,
            0.5
        ).setDepth(100);


        //Disable interaction with minigame while in tutorial
        this.scene.MiniGameManager.disableInteraction([
            this.scene.miniGameButton,
            this.scene.removeAllButton,
            this.scene.tipsButton,
            this.scene.finishButton
        ]);

        this.initiatePart1();
    }

    initiatePart1() {
        this.highlightUI(this.scene.statPanelContainer);

        this.createTutorialTextBox(this.scene.scale.width / 4, this.scene.scale.height / 2 / 5, 'Left', 'Total points from the outfits you have equipped', () => { this.initiatePart2() });
    }

    initiatePart2() {
        //De-highlight stat panel
        this.dehighlightUI(this.scene.statPanelContainer);
        //Destroy previous container
        this.scene.tutorialPartContainer?.destroy();

        this.highlightUI(this.scene.sidePanel);
        this.createTutorialTextBox(this.scene.scale.width / 1.3, this.scene.scale.height / 2, 'Right', 'You can choose which makeup to use to enhance your appearance', () => { this.initiatePart3() });

    }

    initiatePart3() {
        //De-highlight stat panel
        this.dehighlightUI(this.scene.sidePanel);
        //Destroy previous container
        this.scene.tutorialPartContainer?.destroy();

        this.highlightUI(this.scene.miniGameButton);
        this.createTutorialTextBox(this.scene.scale.width / 5, this.scene.scale.height / 3.9, 'Left', 'Choose Dress Up to choose your outfit', () => { this.initiatePart4() });

    }

    initiatePart4() {
        //De-highlight stat panel
        this.dehighlightUI(this.scene.miniGameButton);
        //Destroy previous container
        this.scene.tutorialPartContainer?.destroy();

        this.highlightUI(this.scene.removeAllButton);
        this.createTutorialTextBox(this.scene.scale.width / 5, this.scene.scale.height / 2.4, 'Left', 'Choose Remove all to remove all of your current outfit', () => { this.initiatePart5() });

    }

    initiatePart5() {
        //De-highlight stat panel
        this.dehighlightUI(this.scene.removeAllButton);
        //Destroy previous container
        this.scene.tutorialPartContainer?.destroy();

        this.highlightUI(this.scene.tipsButton);
        this.createTutorialTextBox(this.scene.scale.width / 5, this.scene.scale.height / 1.75, 'Left', 'Choose Tips to see the outfit theme that must be used', () => { this.initiatePart6() });

    }

    initiatePart6() {
        //De-highlight stat panel
        this.dehighlightUI(this.scene.tipsButton);
        //Destroy previous container
        this.scene.tutorialPartContainer?.destroy();

        this.highlightUI(this.scene.finishButton);
        this.createTutorialTextBox(this.scene.scale.width / 2, this.scene.scale.height / 1.3, 'Bottom', 'If you are satisfied with your outfit, click "Finish"', () => { this.finishTutorial() });

    }

    finishTutorial() {
        //De-highlight stat panel
        this.dehighlightUI(this.scene.finishButton);
        //Destroy previous container
        this.scene.tutorialPartContainer?.destroy();


        //Disable interaction with minigame while in tutorial
        this.scene.MiniGameManager.enableInteraction([
            this.scene.miniGameButton,
            this.scene.removeAllButton,
            this.scene.tipsButton,
            this.scene.finishButton
        ]);

        this.tutorialOverlay?.destroy();
        this.hasFinishedTutorial = true;
    }
    createTutorialTextBox(x, y, direction, text, callback) {
        //Define center of X and Y
        const centerX = this.scene.scale.width / 2;
        const centerY = this.scene.scale.height / 2;

        //Select what type of textbox based on the bubble text arrow's direction
        const imageKey = 'bubbleTextBox' + direction;
        if (imageKey === 'bubbleTextBoxRight') this.scene.tutorialPanel = this.scene.add.nineslice(x + 5, y, imageKey, '', 200, 100, 21, 20, 8, 10).setScale(2).setDepth(101);
        else if (imageKey === 'bubbleTextBoxTop') this.scene.tutorialPanel = this.scene.add.nineslice(x, y, imageKey, '', 200, 100, 21, 20, 15, 10).setScale(2).setDepth(101);
        else if (imageKey === 'bubbleTextBoxLeft') this.scene.tutorialPanel = this.scene.add.nineslice(x - 10, y, imageKey, '', 200, 100, 21, 20, 7, 9).setScale(2).setDepth(101);
        else if (imageKey === 'bubbleTextBoxBottom') this.scene.tutorialPanel = this.scene.add.nineslice(x - 5, y, imageKey, '', 200, 100, 21, 20, 7, 18).setScale(2).setDepth(101);


        //Tutorial panel text
        this.scene.tutorialText = this.scene.add.text(x, y - 35, text, {
            fontSize: '28px',
            fill: '#00000',
            fontFamily: 'pixelFont',
            align: 'center',
            wordWrap: { width: /*this.scene.scale.width -*/ 340 }
        }).setDepth(102).setOrigin(0.5, 0.5);

        //Tutorial Continue  Button
        this.scene.tutorialContinueButton = new UIButton(this.scene, this.scene.AudioManager, x, y + this.scene.tutorialText.height - 23, 'continueButton', 70, 30, null, 0, 0, callback, 'OK', 30, 0).setDepth(102);

        return this.scene.tutorialPartContainer = this.scene.add.container(0, 0, [this.scene.tutorialPanel, this.scene.tutorialText, this.scene.tutorialContinueButton]).setDepth(102);
    }

    highlightUI(UIComponent) {
        UIComponent.setDepth(101);
    }

    dehighlightUI(UIComponent) {
        UIComponent.setDepth(10);
    }
}