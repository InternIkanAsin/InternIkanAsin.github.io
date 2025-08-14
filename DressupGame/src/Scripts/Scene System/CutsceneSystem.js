import UIButton from '../UI/UIButton.js';
import { orientation, layout } from '../ScreenOrientationUtils.js';
import { bachelorDialoguesContainer, initializeBachelorDialogue } from '../Bachelor/bachelorDialogues.js';

export class CutsceneSystem {
    constructor(scene) {
        this.scene = scene;
    }

    initiateCutscene1(bachelorChoice, bachelorName, datePlace) {
        const { width, height } = this.scene.sys.game.config;
        const scene = this.scene;
        
        // --- AMBIL KONFIGURASI LAYOUT UNTUK CUTSCENE 1 ---
        const csLayout = layout.cutscene1;

        scene.backgroundCutscene1 = this.scene.add.image(width / 2, height / 2, 'cutscene1Background').setDepth(layout.cutsceneBG.depth).setDisplaySize(layout.cutsceneBG.width, layout.cutsceneBG.height);

        // Gunakan nilai dari csLayout
        scene.phoneBackground = this.scene.add.image(csLayout.phoneBackground.x, csLayout.phoneBackground.y, 'phoneBackground').setDisplaySize(csLayout.phoneBackground.width, csLayout.phoneBackground.height);
        scene.phone = this.scene.add.image(csLayout.phone.x, csLayout.phone.y, 'phone').setScale(csLayout.phone.scale).setDepth(101);
        if (orientation.isPortrait) {
            scene.pinkBg = scene.add.image(width / 2, height / 2, 'cutscene1PinkBg')
                .setDisplaySize(width, height + 100)
                .setDepth(layout.cutsceneBG.depth + 0.5)
                .setVisible(false);
        }

        scene.nameText = this.scene.add.text(csLayout.nameText.x, csLayout.nameText.y, bachelorName, {
            fontSize: csLayout.nameText.fontSize, // Gunakan fontSize dari layout
            fill: '#60292b',
            fontFamily: 'regularFont',
            wordWrap: { width: width - 120 }
        }).setOrigin(0.5, 0.5);
        
        scene.callStatus = this.scene.add.text(csLayout.callStatus.x, csLayout.callStatus.y, 'Incoming Call...', {
            fontSize: csLayout.callStatus.fontSize, // Gunakan fontSize dari layout
            fill: '#60292b',
            fontFamily: 'regularFont',
            wordWrap: { width: width - 120 }
        }).setOrigin(0.5, 0.5);

        const bachelorProfileKey = `PP_${bachelorName}`;
        // Gunakan nilai dari csLayout
        scene.bachelorProfile = this.scene.add.image(csLayout.profilePic.x, csLayout.profilePic.y, bachelorProfileKey).setScale(csLayout.profilePic.scale);
        
        scene.acceptCallButton = new UIButton(scene, scene.AudioManager, {
            x: csLayout.acceptButton.x, // Gunakan posisi dari layout
            y: csLayout.acceptButton.y,
            textureButton: 'callIcon',
            buttonWidth: 75,
            buttonHeight: 75,
            textureIcon: '',
            iconYPosition: -10,
            iconScale: csLayout.acceptButton.scale * 2,
            callback: () => {
                this.acceptCall(bachelorChoice, bachelorName, datePlace);
            },
            buttonText: '',
            buttonScale: 1,
        }).setDepth(99);

        // Bounce button (logika ini tetap sama)
        scene.tweens.add({
            targets: [scene.acceptCallButton],
            y: scene.acceptCallButton.y + 10,
            duration: 500,
            ease: 'Bounce.out',
            yoyo: true,
            repeat: -1
        });
        
        scene.add.existing(bachelorChoice);

        
        bachelorChoice.setPosition(csLayout.bachelorSprite.x, csLayout.bachelorSprite.y);
        bachelorChoice.setScale(csLayout.bachelorSprite.scale);

        // Logika ini tetap sama
        bachelorChoice.setVisible(true).setDepth(100).setAlpha(0);

        scene.AudioManager.playMusic('cutsceneMusic');
        scene.AudioManager.fadeInMusic('cutsceneMusic');
    }

    acceptCall(bachelorChoice, bachelorName, datePlace) {
        if (orientation.isPortrait) {
            this._acceptCallPortrait(bachelorChoice, bachelorName, datePlace);
        } else {
            this._acceptCallLandscape(bachelorChoice, bachelorName, datePlace);
        }
    }

    _acceptCallLandscape(bachelorChoice, bachelorName, datePlace) {
        const scene = this.scene;
        const callStatusText = 'Calling...';
        scene.callStatus.setText(callStatusText);
        scene.acceptCallButton.disableInteractive();
        scene.tweens.add({
            targets: [scene.bachelorProfile],
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
                        
                        scene.SceneManager.TransitionCutscene1();
                    });
                });
            }
        })
    }

    _acceptCallPortrait(bachelorChoice, bachelorName, datePlace) {
        const scene = this.scene;
        const callStatusText = 'Calling...';
        scene.callStatus.setText(callStatusText);
        
        const onCallLayout = layout.cutscene1.onCall;

        // 1. Munculkan background pink
        if (scene.pinkBg) {
            scene.pinkBg.setVisible(true);
        }

        // 2. Animasikan background telepon
        scene.tweens.add({
            targets: scene.phoneBackground,
            scaleY: onCallLayout.phoneBackgroundShrinkY,
            duration: 500,
            ease: 'Sine.easeInOut'
        });

        // 3. Animasikan hilangnya UI panggilan
        scene.tweens.add({
            targets: [scene.bachelorProfile, scene.acceptCallButton],
            alpha: 0,
            duration: 250,
            ease: 'Sine.easeInOut',
            onComplete: () => {
                scene.acceptCallButton?.destroy();
                scene.bachelorProfile?.destroy();
            }
        });
        
        // 4. Animasikan teks ke posisi baru
        scene.tweens.add({ targets: scene.nameText, y: onCallLayout.nameTextY, duration: 500, ease: 'Sine.easeInOut' });
        scene.tweens.add({ targets: scene.callStatus, y: onCallLayout.callStatusY, duration: 500, ease: 'Sine.easeInOut' });

        // 5. Buat tombol tutup telepon
        scene.endCallGimmick = scene.add.image(
            onCallLayout.endCallButton.x,
            onCallLayout.endCallButton.y,
            'endCallIcon'
        ).setScale(1).setDepth(102).setAlpha(0); // Set skala ke 1

        scene.tweens.add({
            targets: scene.endCallGimmick,
            alpha: 1,
            delay: 500,
            duration: 300
        });

        // 6. Atur posisi bachelor & dialog
        bachelorChoice.setPosition(onCallLayout.bachelorSprite.x, onCallLayout.bachelorSprite.y);
        bachelorChoice.setScale(onCallLayout.bachelorSprite.scale);
        
        const dm = scene.DialogueManager;
        const dialogueBoxLayout = onCallLayout.dialogueBox;
        const dialogueTextLayout = onCallLayout.dialogueText;
        dm.dialogueBox.setPosition(dialogueBoxLayout.x, dialogueBoxLayout.y).setDisplaySize(dialogueBoxLayout.width, dialogueBoxLayout.height);
        dm.dialogueText.setPosition(dialogueTextLayout.x, dialogueTextLayout.y).setWordWrapWidth(dialogueTextLayout.wordWrap);

        // 7. Tampilkan bachelor dan dialog
        scene.tweens.add({
            targets: bachelorChoice,
            alpha: 1,
            delay: 300,
            duration: 1000,
            ease: 'Sine.easeInOut',
            onComplete: () => {
                scene.time.delayedCall(500, () => {
                    const bachelorDialogue = bachelorDialoguesContainer[bachelorName][datePlace].getDialogue();
                    dm.showDialogue(bachelorDialogue, () => {
                        
                        scene.SceneManager.TransitionCutscene1();
                        
                    });
                });
            }
        });
    }

    initiateCutscene2(bachelorName, datePlace) {
        const { width, height } = this.scene.sys.game.config;
        const scene = this.scene;

        const bachelorData = this.scene.BachelorManager.initializeAndSelectBachelor(bachelorName);
        const bachelorChoice = bachelorData.bachelorSprite;
        const bachelorExpression = bachelorData.bachelorExpression;


        this.scene.chosenBachelorExpression = bachelorExpression;

        this.scene.backgroundCutscene2 = this.scene.add.image(layout.cutsceneBG.x, layout.cutsceneBG.y, bachelorName + datePlace).setDepth(layout.cutsceneBG.depth).setDisplaySize(layout.cutsceneBG.width, layout.cutsceneBG.height);

        console.log("Cutscene 2 Background created:", this.scene.backgroundCutscene2);

        this.cleanupEmitters();
        this.activeEmitters = [];
        // Dapatkan konfigurasi dari layout
        const particleConfig = layout.cutscene2?.glitterParticles;

        if (particleConfig) {
            const driftingEmitterLeft = scene.add.particles(0, 0, 'particle_star', {
            emitZone: { source: new Phaser.Geom.Line(-50, 0, -50, height), type: 'random', quantity: 15 },
            ...particleConfig.drifting,
            speedX: { min: 50, max: 100 }, 
            blendMode: 'ADD'
        }).setDepth(100);
        this.activeEmitters.push(driftingEmitterLeft);

        // Emitter "Glitter Melayang" dari Kanan
        const driftingEmitterRight = scene.add.particles(0, 0, 'particle_star', {
            // PERBAIKAN: Gunakan 'Phaser.Geom.Line' dengan 'P' besar
            emitZone: { source: new Phaser.Geom.Line(width + 50, 0, width + 50, height), type: 'random', quantity: 40 },
            ...particleConfig.drifting,
            speedX: { min: -100, max: -50 },
            blendMode: 'ADD'
        }).setDepth(100);
        this.activeEmitters.push(driftingEmitterRight);

            // 2. Emitter untuk "Kilauan Statis"
            const sparkleEmitter = scene.add.particles(0, 0, 'particle_star', {
                // Emit dari seluruh layar
                emitZone: { source: new Phaser.Geom.Rectangle(0, 0, width, height), type: 'random', quantity: 20 },
                ...particleConfig.sparkle,
                blendMode: 'ADD'
            }).setDepth(100);
            this.activeEmitters.push(sparkleEmitter);
        }

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
                this.cleanupEmitters();
                this.selectedDialogue = null;

            }, dialogueConfig);
        });
    }

    cleanupEmitters() {
    // 1. Periksa apakah array 'activeEmitters' ada sebelum mencoba menggunakannya.
    if (!this.activeEmitters) {
        console.log("[CutsceneSystem] No active emitters to clean up.");
        return; // Keluar dari fungsi jika tidak ada apa-apa.
    }

    // 2. Jika array ada, lanjutkan seperti biasa.
    console.log(`[CutsceneSystem] Cleaning up ${this.activeEmitters.length} active emitter(s).`);
    this.activeEmitters.forEach(emitter => {
        if (emitter && emitter.active) {
            emitter.destroy();
        }
    });

    // 3. Reset array menjadi kosong.
    this.activeEmitters = [];
}



}
