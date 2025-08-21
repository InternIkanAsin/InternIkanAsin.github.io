import Phaser from 'phaser';

const GRAVITY = 600;

export class ConfettiParticle extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
    }

    launch(vx, vy) {
        this.setActive(true);
        this.setVisible(true);
        this.velocityX = vx;
        this.velocityY = vy;
        this.lifespan = 3000;
        this.zRotationSpeed = Phaser.Math.FloatBetween(-360, 360);
        this.yFlipSpeed = Phaser.Math.FloatBetween(0.5, 1.5);
        this.yFlipDirection = (Math.random() > 0.5) ? 1 : -1;
        this.xFlipSpeed = Phaser.Math.FloatBetween(0.5, 1.5);
        this.xFlipDirection = (Math.random() > 0.5) ? 1 : -1;
    }

    preUpdate(time, delta) {
        this.lifespan -= delta;
        if (this.lifespan <= 0) {
            this.setActive(false);
            this.setVisible(false);
            return;
        }
        
        this.velocityY += GRAVITY * (delta / 1000);
        this.x += this.velocityX * (delta / 1000);
        this.y += this.velocityY * (delta / 1000);
        this.angle += this.zRotationSpeed * (delta / 1000);

        const timeInSeconds = time * 0.001;
        this.scaleX = Math.sin(timeInSeconds * this.yFlipSpeed) * 2 * this.yFlipDirection;
        this.scaleY = Math.sin(timeInSeconds * this.xFlipSpeed) * 2 * this.xFlipDirection;

        this.alpha = Phaser.Math.Clamp(this.lifespan / 500, 0, 1);
    }
}