import Phaser from 'phaser';
export class BaseButton extends Phaser.GameObjects.Container {
    constructor(scene, x, y, elements = []) {
        super(scene, x, y, elements);
        scene.add.existing(this);
        this.scene = scene;
        this.setDepth(10)
    }

    addHoverEffect(target, AudioManager = null) {
        target.on("pointerover", () => {
           
            target.setTint(0xAAAAAA);
        });

        target.on("pointerout", () => {
            target.clearTint();
        });
    }

    addClickEffect(target, AudioManager = null) {
        target.on("pointerdown", () => {
            target.setTint(0x777777);
            AudioManager?.playSFX?.("buttonClick");
        });

        target.on("pointerup", () => {
            target.clearTint();
        });
    }
}