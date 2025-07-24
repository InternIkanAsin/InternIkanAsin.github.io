export class SceneManager {
    constructor(scene) {
        this.scene = scene;
    }

    TransitionCutscene1() {
        this.scene.cameras.main.fadeOut(2000, 0, 0, 0);
        this.scene.AudioManager.fadeOutMusic('cutsceneMusic', 1500);

        this.scene.cameras.main.once('camerafadeoutcomplete', () => {
            
            this.scene.backgroundCutscene1?.destroy();
            this.scene.chosenBachelor?.destroy();

            this.scene.cameras.main.fadeIn(2000);

            
            if (typeof this.scene.createSelectionScreen === 'function') {
                this.scene.createSelectionScreen();
            }

            
            this.scene.AudioManager.playMusic('minigameMusic');
            this.scene.AudioManager.fadeInMusic('minigameMusic', 1000);
            this.scene.cameras.main.fadeIn(2000);
            
        });
    }

    TransitionCutscene2(scene, onComplete = () => { }) {
        this.scene.cameras.main.fadeOut(2000);
        this.scene.AudioManager.fadeOutMusic('miniGameMusic', 1000, () => {
            this.scene.AudioManager.playMusic('cutsceneMusic2');
            this.scene.AudioManager.fadeInMusic('cutsceneMusic2', 1000);
        });
        this.scene.cameras.main.once('camerafadeoutcomplete', () => {
            onComplete();
        });
    }
}