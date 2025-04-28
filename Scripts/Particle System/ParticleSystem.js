export class ParticleSystem{
	constructor(scene){
		this.scene = scene;
		this.scene.emitter = this.scene.add.particles(0, 0, 'lightParticle', {
            lifespan: 4000,
            speed: { min: 150, max: 250 },
            scale: { start: 0.15, end: 0 },
            gravityY: 200,
            blendMode: 'ADD',
            emitting: false
       }).setDepth(100);
	}

  emitParticle(scene, emitter){
      emitter.explode(20, this.scene.scale.width / 2, this.scene.scale.width / 2);
  }
}