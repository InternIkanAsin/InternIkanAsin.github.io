import UIButton, { GeneralButton } from '../UI/UIButton.js'

export class BachelorManager {
    constructor(scene) {
        this.scene = scene;
        this.bachelorChoices = {};
        this.bachelorExpressions = {};
    }

    initializeAndSelectBachelor(chosenBachelorName) {
        // Logika pembuatan bachelor dipindahkan dari Main.js ke sini
        const centerX = this.scene.scale.width / 2;
        const centerY = this.scene.scale.height / 2;

        const azrilFullbody = this.scene.add.image(0, 0, 'azrilFullbody').setScale(2);
        // --- UBAH DI SINI ---
        const AzrilExpression = this.scene.add.image(0, 0, 'AzrilNeutral').setScale(2).setDepth(2);
        this.bachelorChoices['Azril'] = this.scene.add.container(centerX, centerY * 1.1, [azrilFullbody, AzrilExpression]).setVisible(false);
        this.bachelorExpressions['Azril'] = AzrilExpression;

        // Angga
        const anggaFullbody = this.scene.add.image(0, 0, 'anggaFullbody').setScale(2);
        // --- UBAH DI SINI ---
        const AnggaExpression = this.scene.add.image(-10, 0, 'AnggaNeutral').setScale(2);
        this.bachelorChoices['Angga'] = this.scene.add.container(centerX, centerY * 1.1, [anggaFullbody, AnggaExpression]).setVisible(false);
        this.bachelorExpressions['Angga'] = AnggaExpression;

        // Reza
        const rezaFullbody = this.scene.add.image(0, 0, 'rezaFullbody').setScale(2);
        // --- UBAH DI SINI ---
        const RezaExpression = this.scene.add.image(0, 0, 'RezaNeutral').setScale(2);
        this.bachelorChoices['Reza'] = this.scene.add.container(centerX, centerY * 1.1, [rezaFullbody, RezaExpression]).setVisible(false);
        this.bachelorExpressions['Reza'] = RezaExpression;

        // Indra
        const indraFullbody = this.scene.add.image(0, 0, 'indraFullbody').setScale(2);
        // --- UBAH DI SINI ---
        const IndraExpression = this.scene.add.image(0, 0, 'IndraNeutral').setScale(2);
        this.bachelorChoices['Indra'] = this.scene.add.container(centerX, centerY * 1.1, [indraFullbody, IndraExpression]).setVisible(false);
        this.bachelorExpressions['Indra'] = IndraExpression;

        // Keenan
        const keenanFullbody = this.scene.add.image(0, 0, 'keenanFullbody').setScale(2);
        // --- UBAH DI SINI ---
        const KeenanExpression = this.scene.add.image(0, 0, 'KeenanNeutral').setScale(2);
        this.bachelorChoices['Keenan'] = this.scene.add.container(centerX, centerY * 1.1, [keenanFullbody, KeenanExpression]).setVisible(false);
        this.bachelorExpressions['Keenan'] = KeenanExpression;

        // Sekarang, pilih dan aktifkan bachelor yang sesuai
        const chosenContainer = this.bachelorChoices[chosenBachelorName];
        const chosenExpression = this.bachelorExpressions[chosenBachelorName];

        if (chosenContainer) {
            chosenContainer.setVisible(true);
        } else {
            console.error(`Bachelor dengan nama "${chosenBachelorName}" tidak ditemukan di BachelorManager!`);
            // Fallback jika terjadi error
            this.bachelorChoices['Azril'].setVisible(true);
            return {
                bachelorSprite: this.bachelorChoices['Azril'],
                bachelorExpression: this.bachelorExpressions['Azril']
            };
        }

        return {
            bachelorSprite: chosenContainer,
            bachelorExpression: chosenExpression
        };
    }

    setUpBachelorChoice() {
        //Define scren width and height
        const { width, height } = this.scene.sys.game.config;

        //Define centerX and centerY
        const centerX = width / 2;
        const centerY = height / 2;

        this.background = this.scene.add.image(centerX, centerY, 'theaterBackground');
        this.bachelorChoiceBox = this.scene.add.nineslice(360, 970, 'dialogueBox', '', 175, 80, 8, 8, 9, 14).setDepth(10).setScale(4);
        this.dialogueNameBox = this.scene.add.nineslice(360, 830, 'dialogueNameBox', '', 120, 22, 5, 5, 5, 11).setDepth(10).setScale(4);
        this.nameText = this.scene.add.text(360, 820, 'Choose the man of your dreams', {
            fontSize: '28px',
            fill: '#00000',
            fontFamily: 'pixelFont',
            wordWrap: { width: width - 120 }
        }).setDepth(10).setOrigin(0.5, 0.5);

        //Header
        this.headerPanel = this.createHeader();

        //Create Bachelors and their backgrounds
        this.createBachelors();

        this.azrilButton = this.createBachelorButton(centerX * 0.3, centerY * 1.45, 'AzrilIcon', 'Azril', () => { this.selectBachelor(this.azrilButton, centerX); });

        this.anggaButton = this.createBachelorButton(centerX * 0.65, centerY * 1.45, 'AnggaIcon', 'Angga', () => { this.selectBachelor(this.anggaButton, -centerX); });

        this.rezaButton = this.createBachelorButton(centerX * 1, centerY * 1.45, 'RezaIcon', 'Reza', () => { this.selectBachelor(this.rezaButton, -centerX * 3); });

        this.indraButton = this.createBachelorButton(centerX * 1.35, centerY * 1.45, 'IndraIcon', 'Indra', () => { this.selectBachelor(this.indraButton, -centerX * 5); });

        this.keenanButton = this.createBachelorButton(centerX * 1.7, centerY * 1.45, 'KeenanIcon', 'Keenan', () => { this.selectBachelor(this.keenanButton, -centerX * 7); });

        //Finish Button
        this.finishButton = new GeneralButton(this.scene, centerX, centerY * 1.12, 'emptyButton', null, 'CHOOSE', () => { this.transitionCutscene(this.headerPanel.bachelorNameText.text) }, this.scene.AudioManager);
    }
    createHeader() {
        //Define centerX and centerY
        const centerX = this.scene.scale.width / 2;
        const centerY = this.scene.scale.height / 2;

        const bachelorHeader = this.scene.add.nineslice(centerX, centerY / 7, 'headerPanel', '', 130, 36, 13, 11, 8, 8).setDepth(11).setScale(4);
        const bachelorNameText = this.scene.add.text(centerX, centerY / 9, 'Azril', {
            fontSize: '46px',
            fill: '#00000',
            fontFamily: 'pixelFont',
            wordWrap: { width: this.scene.scale.width - 120 }
        }).setDepth(11).setOrigin(0.5, 0.5);
        const datePlaceText = this.scene.add.text(centerX, centerY / 5.5, 'Kencan Bioskop', {
            fontSize: '36px',
            fill: '#00000',
            fontFamily: 'pixelFont',
            richText: true,
            wordWrap: { width: this.scene.scale.width - 120 }
        }).setDepth(11).setOrigin(0.5, 0.5);

        const headerContainer = this.scene.add.container(0, 0, [bachelorHeader, bachelorNameText, datePlaceText]);
        headerContainer.bachelorHeader = bachelorHeader;
        headerContainer.bachelorNameText = bachelorNameText;
        headerContainer.datePlaceText = datePlaceText;

        return headerContainer;
    }
    /** 
    * @method createBachelors() - initializes bachelor anime texture and their backgrounds and stores it in a container
    */
    createBachelors() {
        //Define centerX and centerY
        const centerX = this.scene.scale.width / 2;
        const centerY = this.scene.scale.height / 2;


        //Azril
        this.azrilFullbody = this.scene.add.image(0, 0, 'azrilFullbody').setScale(2);
        this.AzrilExpression = this.scene.add.image(0, 0, 'AzrilHappy').setScale(2).setDepth(2);

        this.AzrilContainer = this.scene.add.container(0, 0, [this.azrilFullbody, this.AzrilExpression]);
        //Angga
        this.anggaFullbody = this.scene.add.image(0, 0, 'anggaFullbody').setScale(2);
        this.AnggaExpression = this.scene.add.image(0, 0, 'AnggaHappy').setScale(2);

        this.AnggaContainer = this.scene.add.container(centerX * 2, 0, [this.anggaFullbody, this.AnggaExpression]);
        //Reza
        this.rezaFullbody = this.scene.add.image(0, 0, 'rezaFullbody').setScale(2);
        this.RezaExpression = this.scene.add.image(0, 0, 'RezaHappy').setScale(2);

        this.RezaContainer = this.scene.add.container(centerX * 4, 0, [this.rezaFullbody, this.RezaExpression]);
        //Indra
        this.indraFullbody = this.scene.add.image(0, 0, 'indraFullbody').setScale(2);
        this.IndraExpression = this.scene.add.image(0, 0, 'IndraHappy').setScale(2);

        this.IndraContainer = this.scene.add.container(centerX * 6, 0, [this.indraFullbody, this.IndraExpression]);

        //Keenan
        this.keenanFullbody = this.scene.add.image(0, 0, 'keenanFullbody').setScale(2);
        this.KeenanExpression = this.scene.add.image(0, 0, 'KeenanHappy').setScale(2);

        this.KeenanContainer = this.scene.add.container(centerX * 8, 0, [this.keenanFullbody, this.KeenanExpression]);

        // Store only bachelor containers (not the full group container)
        this.bachelorChoices = {
            Azril: this.AzrilContainer,
            Angga: this.AnggaContainer,
            Reza: this.RezaContainer,
            Indra: this.IndraContainer,
            Keenan: this.KeenanContainer
        };

        // Store bachelor Expressions
        this.bachelorExpressions = {
            Azril: this.AzrilExpression,
            Angga: this.AnggaExpression,
            Reza: this.RezaExpression,
            Indra: this.IndraExpression,
            Keenan: this.KeenanExpression
        };
        //Container to store all the bachelors
        this.scene.bachelorContainer = this.scene.add.container(centerX, centerY * 1.1, [this.AnggaContainer, this.AzrilContainer, this.RezaContainer, this.IndraContainer, this.KeenanContainer]);
    }

    /**
    * @method selectBachelor(bachelorName) - function to highlight the button and change the header
    */
    selectBachelor(bachelorButton, moveTarget) {
        //Disable interactiveness and set the choose button to invisible
        this.finishButton.setVisible(false).disableInteractive();

        if (this.currentBachelor && this.currentBachelor != bachelorButton) {
            //Deselected Button Visuals
            this.currentBachelor.nameBox.setTexture('continueButton');
            this.currentBachelor.nameText.setColor("#00000");
        }

        this.currentBachelor = bachelorButton;
        //Selected Button Visuals
        this.currentBachelor.nameBox.setTexture('continueButtonSelected');
        this.currentBachelor.nameText.setColor("#ffffff");

        this.headerPanel.bachelorNameText.setText(bachelorButton.nameText.text);

        this.movePanel(moveTarget);
    }
    /** 
    * @method createBachelorButton() - creates bachelor button to select bachelor
    */
    createBachelorButton(x, y, icon, bachelorName, callback) {
        const { width, height } = this.scene.sys.game.config;
        const buttonIcon = new UIButton(this.scene, this.scene.AudioManager, 0, 0, icon, 70, 70, null, 0, 0, callback);

        const nameBox = this.scene.add.nineslice(0, 90, 'continueButton', '', 120, 50, 5, 5, 5, 5).setDepth(100);
        const nameText = this.scene.add.text(0, 90, bachelorName, {
            fontSize: '32px',
            fill: '#00000',
            fontFamily: 'pixelFont',
            wordWrap: { width: width - 120 }
        }).setDepth(100).setOrigin(0.5, 0.5);

        const bachelorButtonContainer = this.scene.add.container(x, y, [buttonIcon, nameBox, nameText]).setDepth(100);

        bachelorButtonContainer.buttonIcon = buttonIcon;
        bachelorButtonContainer.nameBox = nameBox;
        bachelorButtonContainer.nameText = nameText;

        return bachelorButtonContainer;
    }

    movePanel(target) {
        this.scene.tweens.add({
            targets: this.scene.bachelorContainer,
            x: target,
            duration: 500,
            ease: "Sine.easeInOut",
            onComplete: () => {
                this.finishButton.setVisible(true).setInteractive();
            }
        })
    }

    /**
    *  @method transitionCutscene(bachelorName) - transitions to cutscene based on bachelor's name
    */
    transitionCutscene(bachelorName) {
        this.scene.cameras.main.fadeOut(3000);

        this.azrilButton.buttonIcon.disableInteractive();

        this.anggaButton.buttonIcon.disableInteractive();

        this.rezaButton.buttonIcon.disableInteractive();

        this.indraButton.buttonIcon.disableInteractive();

        this.keenanButton.buttonIcon.disableInteractive();
        this.finishButton.disableInteractive();
        // Create and display dialogue after fade-in
        this.scene.cameras.main.once('camerafadeoutcomplete', () => {
            this.background?.destroy();
            //Assign chosen bachelor
            this.scene.chosenBachelor = this.bachelorChoices[bachelorName];
            this.scene.chosenBachelorExpression = this.bachelorExpressions[bachelorName];
            this.scene.chosenBachelorName = bachelorName;
            this.scene.bachelorContainer.remove(this.scene.chosenBachelor);
            this.clearBachelorChoiceScene();
            this.scene.cameras.main.fadeIn(2000);
            this.scene.CutsceneSystem.initiateCutscene1(this.scene.chosenBachelor, this.scene.chosenBachelorName, "Hangout1");
            this.scene.DialogueManager.createDialogueUI();
        });
    }

    /**
    *  @method clearBachelorChoiceScene() - clear bachelor choice scene before transitioning to next
    */
    clearBachelorChoiceScene() {
        this.bachelorChoiceBox?.destroy();
        this.dialogueNameBox?.destroy();
        this.nameText?.destroy();

        //Header
        this.headerPanel?.destroy();

        //Create Bachelors and their backgrounds
        this.scene.bachelorContainer?.destroy();

        this.azrilButton?.destroy();

        this.anggaButton?.destroy();

        this.rezaButton?.destroy();

        this.indraButton?.destroy();

        this.keenanButton?.destroy();

        //Finish Button
        this.finishButton?.destroy();
    }
}