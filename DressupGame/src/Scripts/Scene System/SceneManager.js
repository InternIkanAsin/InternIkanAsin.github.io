import { orientation } from '../ScreenOrientationUtils.js';
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
            this.scene.phone?.destroy();
            this.scene.phoneBackground?.destroy();
            this.scene.cameras.main.fadeIn(2000);
            this.scene.nameText?.destroy();
            this.scene.callStatus?.destroy();
            this.scene.profileBorder?.destroy();
            this.scene.profileInside?.destroy();
            this.scene.acceptCallButton?.destroy();
            this.scene.endCallGimmick?.destroy();
            this.scene.pinkBg?.destroy();
            if(!orientation.isPortrait){
                Object.values(this.scene.bachelorPP).forEach(bachelorProfile => {
                bachelorProfile.setVisible(false);
            });
            }
            
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