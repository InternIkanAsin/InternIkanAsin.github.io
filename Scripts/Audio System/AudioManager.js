export class AudioManager {
    static instance;

    constructor(scene) {
        if (AudioManager.instance) return AudioManager.instance;

        this.scene = scene;
        this.sfx = {};     // sound effects
        this.music = {};   // background/cutscene music

        AudioManager.instance = this;
    }

    //masukkin audio asset ke sfx ato music
    initializeSounds(){
        const sound = this.scene.sound;

        //Music
        this.music['cutsceneMusic'] = sound.add('cutsceneMusic', { loop: true, volume: 0.7 });
        this.music['minigameMusic'] = sound.add('minigameMusic', { loop: true, volume: 0 });

        //SFX
        this.sfx['buttonClick'] = sound.add('buttonClickSFX', { volume: 1 });
        this.sfx['hoverButton'] = sound.add('hoverButtonSFX', { volume: 1 });
        this.sfx['openPanel'] = sound.add('openPanelSFX', { volume: 1 });
        this.sfx['success'] = sound.add('successSFX', { volume: 1 });
    }

    playMusic(key, loop = true) {
        const music = this.music[key];
       if (music) {
            console.log(`Playing music: ${key}`);
            music.play();
        } else {
            console.warn(`Music not found: ${key}`);
        }
    }

    stopMusic(key) {
        const music = this.music[key];
        if (music && music.isPlaying) {
            music.stop();
        }
    }

    playSFX(key) {
        console.log("HEYYY");
        const sound = this.sfx[key];
        if (sound) sound.play();
    }

   fadeOutMusic(key, duration = 1000, onComplete = () => {}) {
        const music = this.music[key];
        if (!music || !music.isPlaying) return;

        this.scene.tweens.add({
            targets: music,
            volume: 0,
            duration: duration,
            ease: 'Linear',
            onComplete: () => {
                music.stop(); // stop music once volume hits 0
                onComplete(); // Call the onComplete callback (to trigger fade-in of next music)
            }
        });
    }

    fadeInMusic(key, duration = 1000) {
        const music = this.music[key];
        if (!music) return;

        music.setVolume(0);  // Start from 0 volume
        music.play({ loop: true });  // Play the music

        this.scene.tweens.add({
            targets: music,
            volume: 0.5,  // Fade in to full volume
            duration: duration,
            ease: 'Linear'
        });
    }

}
