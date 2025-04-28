export class SceneManager{
	constructor(scene){
		this.scene = scene;
	}

	TransitionCutscene1(){
		// Setup dressup mini-game after fade out
        this.scene.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.setupDressMiniGame();
            this.scene.cameras.main.fadeIn(2000);
            this.scene.AudioManager.fadeOutMusic('cutsceneMusic', 1000, () => {
                this.scene.AudioManager.playMusic('minigameMusic');
                 this.scene.AudioManager.fadeInMusic('minigameMusic', 1000);
            });
           
        });
	}

    TransitionCutscene2(scene,  onComplete = () => {}){
		// Setup dressup mini-game after fade out
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