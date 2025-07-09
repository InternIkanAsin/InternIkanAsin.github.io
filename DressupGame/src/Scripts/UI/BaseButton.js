export class BaseButton extends Phaser.GameObjects.Container {
    constructor(scene, x, y, elements = []) {
        super(scene, x, y, elements);
        scene.add.existing(this);
        this.scene = scene;
        this.setDepth(10)
    }

    addHoverEffect(target, AudioManager = null) {
        target.on("pointerover", () => {
            target.setAlpha(0.7);
            AudioManager?.playSFX?.("hoverButton");
        });

        target.on("pointerout", () => {
            target.setAlpha(1);
        });
    }

    addClickEffect(target, AudioManager = null) {
        target.on("pointerdown", () => {
            target.setAlpha(0.5);
            AudioManager?.playSFX?.("buttonClick");
        });

        target.on("pointerup", () => {
            target.setAlpha(1);
        });
    }
}