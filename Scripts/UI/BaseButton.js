export class BaseButton {
    constructor(scene, x, y, elements = []) {
        this.scene = scene;
        this.container = scene.add.container(x, y, elements);
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
}