export class BaseButton {
    constructor(scene, x, y, elements = []) {
        this.scene = scene;
        this.container = scene.add.container(x, y, elements).setDepth(12);
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