import { layout } from '../ScreenOrientationUtils.js';
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
        this.isShowingName = false;

    }

    createDialogueUI(scene) {
        const { width, height } = this.scene.sys.game.config;
        const nameBoxLayout = layout.namedDialogueNameBox;
        this.dialogueBox = this.scene.add.nineslice(layout.dialogueBox.x, layout.dialogueBox.y, 'dialogueBox', '', layout.dialogueBox.width, layout.dialogueBox.height, 128, 128, 64, 68).setDepth(100);
        this.dialogueText = this.scene.add.text(layout.dialogueText.x, layout.dialogueText.y, 'Tristan is a very handsome man. He is the most amicable, loyal, attractive man i have ever met', {
            fontSize: layout.dialogueText.fontSize,
            fill: '#60292b',
            fontFamily: 'regularFont',
            wordWrap: { width: layout.dialogueText.wordWrap }
        }).setDepth(101);

        const nameBoxX = layout.dialogueBox.x - (layout.dialogueBox.width / 2) + 150;
        const nameBoxY = layout.dialogueBox.y - (layout.dialogueBox.height / 2) - 10;

        this.dialogueNameBox = this.scene.add.nineslice(nameBoxX, nameBoxY, 'blueButton2', '',  nameBoxLayout.width, nameBoxLayout.height, 1, 1, 1,1).setDepth(100).setScale(4);
        this.nameText = this.scene.add.text(nameBoxX, nameBoxY - 10, '', {
            fontSize: '50px',
            fill: '#00000',
            fontFamily: 'regularFont'
        }).setDepth(101).setOrigin(0.5, 0.5);

        this.hide();
    }

    showDialogue(dialogue, onComplete = () => { }, config = {}) {
        this.dialogue = dialogue;
        this.dialogueIndex = 0;
        this.onDialogueComplete = onComplete;
        const useNamedStyle = config.style === 'named';
        const boxLayout = useNamedStyle ? layout.namedDialogueBox : layout.dialogueBox;
        const textLayout = useNamedStyle ? layout.namedDialogueText : layout.dialogueText;

        // Terapkan ukuran dan posisi dinamis ke kotak dialog
        this.dialogueBox.setPosition(boxLayout.x, boxLayout.y);
        this.dialogueBox.setDisplaySize(boxLayout.width, boxLayout.height);
        
        // Terapkan posisi dan word-wrap dinamis ke teks
        this.dialogueText.setPosition(textLayout.x, textLayout.y);
        this.dialogueText.setAlign('left')
        this.dialogueText.setWordWrapWidth(textLayout.wordWrap);

        // Atur visibilitas dan posisi kotak nama
        const showName = useNamedStyle && config.showName;
        this.isShowingName = showName;
        this.dialogueNameBox.setVisible(showName);
        this.nameText.setVisible(showName);

        if (showName) {
            // Reposisi kotak nama relatif terhadap kotak dialog BARU
            const nameBoxLayout = layout.namedDialogueNameBox;
            const nameBoxX = boxLayout.x - (boxLayout.width / 2) + nameBoxLayout.offsetX;
            const nameBoxY = boxLayout.y - (boxLayout.height / 2) - 10;
            this.dialogueNameBox.setPosition(nameBoxX, nameBoxY);
            this.nameText.setPosition(nameBoxX, nameBoxY - 10);
        }

        // Tampilkan elemen utama
        this.dialogueBox.setVisible(true);
        this.dialogueText.setVisible(true);

        this.nextLine();

        this.scene.input.on('pointerdown', () => {
            if (!this.scene.gameplayHasStarted) {
                const poki = this.scene.plugins.get('poki');
                poki.runWhenInitialized(() => {
                    poki.gameplayStart();
                    console.log("[Poki SDK] gameplayStart() fired on first player interaction.");
                });

                this.scene.gameplayHasStarted = true;
            }
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

        if (this.isShowingName) {
            this.nameText.setText(line.speakerName || '');
        }
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
        this.dialogueNameBox?.setVisible(false);
        this.nameText?.setVisible(false);
        this.dialogueText.setVisible(false);
        this.dialogueBox.setPosition(layout.dialogueBox.x, layout.dialogueBox.y);
        this.dialogueBox.setDisplaySize(layout.dialogueBox.width, layout.dialogueBox.height);
        this.dialogueText.setPosition(layout.dialogueText.x, layout.dialogueText.y);
        this.dialogueText.setWordWrapWidth(layout.dialogueText.wordWrap);
        this.scene.input.off('pointerdown');
    }
}
