export class SceneManager {
    constructor(scene) {
        this.scene = scene;
    }

    TransitionCutscene1() {
        // Step 1: When the camera finishes fading out from cutscene
        this.scene.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.backgroundCutscene1.destroy();

            // Dark overlay
            this.darkOverlay = this.scene.add.rectangle(
                this.scene.cameras.main.centerX,
                this.scene.cameras.main.centerY,
                this.scene.cameras.main.width,
                this.scene.cameras.main.height,
                0x00001B, // Very dark blue
                1
            ).setDepth(9);

            // Text line
            const dialogue = `I will dress my best to impress ${this.scene.chosenBachelorName}!`;
            this.text = this.scene.add.text(
                this.scene.cameras.main.centerX,
                this.scene.cameras.main.centerY,
                dialogue,
                {
                    fontSize: '72px',
                    fill: '#FFFFFF', // Better contrast than '#00000'
                    fontFamily: 'pixelFont',
                    align: 'center',
                    wordWrap: { width: this.scene.scale.width - 120 }
                }
            ).setDepth(10).setOrigin(0.5);

            // Fade back in to show the overlay and text
            this.scene.cameras.main.fadeIn(2000);
        });

        this.scene.cameras.main.once('camerafadeincomplete', () => {
            this.scene.cameras.main.fadeOut(5000);
            this.scene.cameras.main.once('camerafadeoutcomplete', () => {
                this.text.destroy();
                this.darkOverlay.destroy();
                this.scene.setUpMiniGame();
                this.scene.cameras.main.fadeIn(5000);
                this.scene.AudioManager.stopMusic('cutsceneMusic');
                this.scene.AudioManager.playMusic('minigameMusic');
                this.scene.AudioManager.fadeInMusic('minigameMusic', 1000);
            })
        })
    }

    TransitionCutscene2(scene, onComplete = () => { }) {
        this.scene.cameras.main.fadeOut(2000);
        this.scene.AudioManager.fadeOutMusic('miniGameMusic', 1000, () => {
            this.scene.AudioManager.playMusic('cutsceneMusic');
            this.scene.AudioManager.fadeInMusic('cutsceneMusic', 1000);
        });
        this.scene.cameras.main.once('camerafadeoutcomplete', () => {
            onComplete();
        });
    }
}