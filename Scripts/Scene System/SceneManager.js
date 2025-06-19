export class SceneManager {
    constructor(scene) {
        this.scene = scene;
    }

    TransitionCutscene1() {
        this.scene.cameras.main.fadeOut(2000, 0, 0, 0);
        this.scene.AudioManager.fadeOutMusic('cutsceneMusic', 1500);

        this.scene.cameras.main.once('camerafadeoutcomplete', () => {
            // Bersihkan aset cutscene 1
            this.scene.backgroundCutscene1?.destroy();
            this.scene.chosenBachelor?.destroy();

            this.scene.cameras.main.fadeIn(2000);

            // Panggil fungsi untuk setup selection screen
            if (typeof this.scene.createSelectionScreen === 'function') {
                this.scene.createSelectionScreen();
            }

            // Ganti musik dan fade in ke selection screen
            this.scene.AudioManager.playMusic('minigameMusic');
            this.scene.AudioManager.fadeInMusic('minigameMusic', 1000);
            this.scene.cameras.main.fadeIn(2000);
            // --- AKHIR LOGIKA TEKS ---
        });
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