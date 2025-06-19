export class DialogueManager {
    constructor(scene) {
        this.scene = scene;
        this.dialogueContainer = {};
        this.dialogueIndex = 0;
        this.textObject = null;
        this.nameText = null;
        this.graphics = null;
        this.isTyping = false;
        this.fullText = "";
        this.currentTimeout = null;

    }

    createDialogueUI(scene) {
        const { width, height } = this.scene.sys.game.config;

        this.dialogueBox = this.scene.add.nineslice(width / 2, height / 1.32, 'dialogueBox', '', 1200, 300, 128, 128, 64, 68).setDepth(10);
        this.dialogueNameBox = this.scene.add.nineslice(width / 3.3, height / 1.65, 'dialogueNameBox', '', 450, 120, 120, 120, 64, 72).setDepth(10).setScale(0.8);
        this.nameText = this.scene.add.text(width / 3.3, height / 1.66, 'Tristan', {
            fontSize: '54px',
            fill: '#60292b',
            fontFamily: 'regularFont',
            fontStyle: 'bold',
            wordWrap: { width: width - 200 }
        }).setDepth(10).setOrigin(0.5, 0.5);
        this.dialogueText = this.scene.add.text(width / 4.7, height / 1.5, 'Tristan is a very handsome man. He is the most amicable, loyal, attractive man i have ever met', {
            fontSize: '36px',
            fill: '#60292b',
            fontFamily: 'regularFont',
            wordWrap: { width: width - width / 2.4 }
        }).setDepth(10);

        this.hide();
    }

    showDialogue(dialogue, onComplete = () => { }) {
        this.dialogue = dialogue;
        this.dialogueIndex = 0;
        this.onDialogueComplete = onComplete;

        this.dialogueBox.setVisible(true);
        this.dialogueNameBox.setVisible(true);
        this.nameText.setVisible(true);
        this.dialogueText.setVisible(true);

        this.nextLine();

        this.scene.input.on('pointerdown', () => {
            if (this.isTyping) {
                this.skipTyping();
            } else {
                this.nextLine();
            }
        });
    }

    nextLine() {
        if (this.dialogueIndex >= this.dialogue.length) {
            this.hide();
            if (this.onDialogueComplete) this.onDialogueComplete();
            return;
        }

        const line = this.dialogue[this.dialogueIndex];
        this.dialogueIndex++;

        this.nameText.setText(line.speakerName || '');
        this.typeText(line.dialogue);
    }

    typeText(text) {
        this.isTyping = true;
        this.fullText = text;
        this.dialogueText.setText("");

        let i = 0;
        this.currentTimeout = this.scene.time.addEvent({
            delay: 30,
            repeat: text.length - 1,
            callback: () => {
                this.dialogueText.setText(text.substr(0, ++i));
                if (i === text.length) {
                    this.isTyping = false;
                }
            }
        });
    }

    skipTyping() {
        if (this.currentTimeout) this.currentTimeout.remove();
        this.dialogueText.setText(this.fullText);
        this.isTyping = false;
    }

    hide() {
        this.dialogueBox.setVisible(false);
        this.dialogueNameBox.setVisible(false);
        this.dialogueText.setVisible(false);
        this.nameText.setVisible(false);
        this.scene.input.off('pointerdown');
    }
}
