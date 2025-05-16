// MainScene.js

class MakeupScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MakeupScene' });

        this.faceImage = null;
        this.eyelinerImage = null;
        this.drawingLayer = null; // RenderTexture (MASK SOURCE ONLY)
        this.brush = null;
        this.isDrawing = false;
        this.brushRadius = 15;

        this.totalEyelinerPixels = 0;
        this.isComplete = false;
        this.completionThreshold = 98;
        this.autoCompleteThreshold = 85;
        this.checkingCompletion = false;
        this.eyelinerTextureData = null;
    }

    preload() {
        this.load.image('face', 'assets/pp_yana.png');
        this.load.image('eyeliner_full', 'assets/mc_er 1_angry.png');
    }

    create() {
        console.log("Scene Create Start");
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.faceImage = this.add.image(centerX, centerY, 'face');
        this.eyelinerImage = this.add.image(centerX, centerY, 'eyeliner_full');

        const eyelinerTopLeftX = this.eyelinerImage.x - (this.eyelinerImage.width * this.eyelinerImage.originX);
        const eyelinerTopLeftY = this.eyelinerImage.y - (this.eyelinerImage.height * this.eyelinerImage.originY);

        this.drawingLayer = this.make.renderTexture({
            x: eyelinerTopLeftX,
            y: eyelinerTopLeftY,
            width: this.eyelinerImage.width,
            height: this.eyelinerImage.height,
            add: false
        }, false);
        this.drawingLayer.setOrigin(0, 0);

        this.brush = this.make.graphics({ fillStyle: { color: 0xffffff, alpha: 1 } }, false);
        this.brush.fillCircle(this.brushRadius, this.brushRadius, this.brushRadius);

        const revealMask = this.drawingLayer.createBitmapMask();
        this.eyelinerImage.setMask(revealMask);

        // Hitung Target Piksel Eyeliner Asli
        this.calculateTargetPixels('eyeliner_full');

        // Setup Input (sama seperti sebelumnya)
        this.input.on('pointerdown', (pointer) => {
            if (this.isComplete) return;
            this.isDrawing = true;
            this.drawOnMask(pointer);
        }, this);

        this.input.on('pointermove', (pointer) => {
            if (this.isDrawing && pointer.isDown && !this.isComplete) {
                this.drawOnMask(pointer);
            } else if (!pointer.isDown && this.isDrawing) {
                 this.isDrawing = false;
                 if (!this.checkingCompletion) {
                     this.checkCompletion();
                 }
            }
        }, this);

        this.input.on('pointerup', (pointer) => {
             if (this.isDrawing) {
                 this.isDrawing = false;
                 if (!this.checkingCompletion) {
                     this.checkCompletion();
                 }
            }
        }, this);

        this.input.on('pointerupoutside', (pointer) => {
            if (this.isDrawing) {
                this.isDrawing = false;
                 if (!this.checkingCompletion) {
                     this.checkCompletion();
                 }
            }
        }, this);


        // UI (sama seperti sebelumnya)
        const clearButton = this.add.text(this.cameras.main.width - 120, 20, 'Hapus Eyeliner', {
                fontSize: '14px', fill: '#000', backgroundColor: '#ddd', padding: { x: 8, y: 4 }, fontStyle: 'bold'
            })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.drawingLayer.clear();
                this.isComplete = false;
                this.checkingCompletion = false;
                console.log("Eyeliner Cleared");
            });

        this.add.text(10, 10, 'Klik dan seret pada area mata untuk memakai eyeliner.', {
            fontSize: '16px', fill: '#ffffff', backgroundColor: 'rgba(0,0,0,0.5)', padding: 5
        });

        console.log("Scene Create End");
    } // Akhir create()

    drawOnMask(pointer) { // (sama seperti sebelumnya)
        if (!this.drawingLayer || !this.brush || this.isComplete) {
            return;
        }
        const localX = pointer.x - this.drawingLayer.x;
        const localY = pointer.y - this.drawingLayer.y;
        this.drawingLayer.draw(this.brush, localX - this.brushRadius, localY - this.brushRadius);
    }

    calculateTargetPixels(textureKey) {
        console.log("Calculating target pixels for:", textureKey);
        try {
            const texture = this.textures.get(textureKey);
            if (!texture || texture.key === '__MISSING') {
                 console.error("Target texture not found:", textureKey);
                 return;
            }
            const source = texture.getSourceImage();
            const width = source.width;
            const height = source.height;

            // --- PERBAIKAN DI SINI ---
            // Gunakan document.createElement untuk canvas sementara
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = width;
            tempCanvas.height = height;
            const tempCtx = tempCanvas.getContext('2d');
            // -------------------------

            if (!tempCtx) {
                 console.error("Could not create temporary canvas context.");
                 // Tidak perlu remove dari DOM karena tidak pernah ditambahkan
                 return;
            }

            tempCtx.drawImage(source, 0, 0, width, height);
            const imageData = tempCtx.getImageData(0, 0, width, height);
            this.eyelinerTextureData = imageData;
            const data = imageData.data;

            this.totalEyelinerPixels = 0;
            for (let i = 0; i < data.length; i += 4) {
                const alpha = data[i + 3];
                if (alpha > 0) {
                    this.totalEyelinerPixels++;
                }
            }

            console.log(`Total non-transparent pixels in '${textureKey}': ${this.totalEyelinerPixels}`);
            // Tidak perlu remove dari DOM

        } catch (error) {
             console.error("Error calculating target pixels:", error);
        }
    }


    checkCompletion() {
        if (this.isComplete || this.checkingCompletion || this.totalEyelinerPixels === 0 || !this.eyelinerTextureData) {
            return;
        }

        this.checkingCompletion = true;
        console.log("Checking completion...");

        this.drawingLayer.snapshot((snapshotImage) => {
            if (!snapshotImage || !this.eyelinerTextureData) {
                console.warn("Snapshot failed or original texture data missing.");
                this.checkingCompletion = false;
                return;
            }

             try {
                const width = this.drawingLayer.width;
                const height = this.drawingLayer.height;

                // --- PERBAIKAN DI SINI ---
                // Gunakan document.createElement untuk canvas snapshot
                const snapCanvas = document.createElement('canvas');
                snapCanvas.width = width;
                snapCanvas.height = height;
                const snapCtx = snapCanvas.getContext('2d');
                // -------------------------

                 if (!snapCtx) {
                     console.error("Could not create snapshot canvas context.");
                     this.checkingCompletion = false;
                     return;
                 }

                snapCtx.drawImage(snapshotImage, 0, 0, width, height);
                const snapshotData = snapCtx.getImageData(0, 0, width, height).data;
                const originalData = this.eyelinerTextureData.data;

                let revealedPixels = 0;
                for (let i = 0; i < snapshotData.length; i += 4) {
                    const originalAlpha = originalData[i + 3];
                    const snapshotAlpha = snapshotData[i + 3];

                    if (originalAlpha > 0 && snapshotAlpha > 0) {
                        revealedPixels++;
                    }
                }

                // Tidak perlu remove dari DOM

                const percentage = this.totalEyelinerPixels > 0 ? (revealedPixels / this.totalEyelinerPixels) * 100 : 0;
                console.log(`Completion: ${percentage.toFixed(2)}% (${revealedPixels}/${this.totalEyelinerPixels})`);

                if (percentage >= this.completionThreshold) {
                    this.completeMakeup("threshold");
                } else if (percentage >= this.autoCompleteThreshold) {
                    if (!this.isComplete) {
                       this.autoComplete();
                    } else {
                         // Jika sudah complete (misal dari auto-complete sebelumnya),
                         // pastikan flag direset
                         this.checkingCompletion = false;
                    }
                } else {
                     this.checkingCompletion = false;
                }

            } catch (error) {
                 console.error("Error during snapshot processing:", error);
                 this.checkingCompletion = false;
            }

        });
    }

    completeMakeup(reason = "unknown") { // (sama seperti sebelumnya)
        if (this.isComplete) return;

        this.isComplete = true;
        this.checkingCompletion = false;
        this.isDrawing = false;
        console.log(`%c--- EYELINER COMPLETE (${reason}) ---`, 'color: lightgreen; font-weight: bold;');
    }

    autoComplete() { // (sama seperti sebelumnya)
        if (this.isComplete) return;
        console.log("Auto-completing eyeliner...");
        // Gambar tekstur eyeliner asli ke drawingLayer untuk mengisi mask
        this.drawingLayer.drawFrame('eyeliner_full', 0, 0, 0);
        this.completeMakeup("auto");
    }

} // Akhir class MakeupScene

// Konfigurasi Game (sama seperti sebelumnya)
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#333333',
    parent: '',
    scene: [MakeupScene]
};

const game = new Phaser.Game(config);  