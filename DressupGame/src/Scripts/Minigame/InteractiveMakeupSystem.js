import { MakeUpButton } from '../UI/UIButton.js'; // For updating selectedMakeUp
import {  defaultMakeUpSkins} from '../Makeup Data/MakeUpData.js'; // For reverting
import { layout } from '../ScreenOrientationUtils.js';

export class InteractiveMakeupSystem {
    constructor(scene) {
        this.scene = scene;
        this.AudioManager = scene.AudioManager;

        this.isActive = false;
        this.activeMakeupType = null;
        this.activeTextureKey = null;
        this.activeMakeupImage = null;
        this.drawingLayer = null;
        this.brushImage = null;
        this.brushRadius = 30;

        this.isDrawing = false;


        this.targetPixelData = null;
        this.totalTargetPixels = 0;
        this.checkingCompletion = false;
        this.completionThreshold = 53;
        this.autoCompleteThreshold = 80;


        this.stateBeforeColoring = {};


        this.boundOnPointerDown = this.onPointerDown.bind(this);
        this.boundOnPointerMove = this.onPointerMove.bind(this);
        this.boundOnPointerUp = this.onPointerUp.bind(this);
        this.activeOutlineGraphics = null;


        this.customCursor = scene.add.graphics({ fillStyle: { color: 0xffffff, alpha: 0.5 } })
            .fillCircle(this.brushRadius, this.brushRadius, this.brushRadius)
            .setVisible(false)
            .setDepth(1000);

        this.customCursorRadius = this.brushRadius;

        this.tutorialShown = {
            'Eyeliner': false,
            'Eyeshadow': false,
            'Lips': false,
            'Blush': false,
        };
    }

    startColoringSession(makeupType, textureKey, itemButtonInstance) {
        this.scene.TweeningUtils.showApplyMakeUpPanel();
        this.stateBeforeColoring[makeupType] = MakeUpButton.selectedMakeUp[makeupType]?.current || null;
        console.log(this.stateBeforeColoring[makeupType])
        if (this.isActive) {

            this.stopColoringSession(true);
        }

        if (!this.tutorialShown[makeupType]) this.triggerMakeUpTutorial(makeupType);
        this.scene.input.setDefaultCursor('none');
        this.customCursor.clear();
        this.customCursor.fillStyle(0xffffff, 0.5);

        this.customCursor.fillCircle(this.brushRadius, this.brushRadius, this.brushRadius);
        this.customCursor.x = this.scene.input.activePointer.worldX - this.brushRadius;
        this.customCursor.y = this.scene.input.activePointer.worldY - this.brushRadius;
        this.customCursor.setVisible(true);
        this.customCursor.setDepth(this.scene.sys.game.config.height + 100);

        this.scene.input.on('pointermove', this.updateCustomCursorPosition, this);

        console.log(`[InteractiveMakeup] Starting session for ${makeupType} - ${textureKey}`);
        this.isActive = true;
        this.activeMakeupType = makeupType;
        this.activeTextureKey = textureKey;
        this.isComplete = false;


        if (makeupType === 'Lips') {
            const defaultLipTexture = defaultMakeUpSkins['Lips'];
            if (this.scene.lips && defaultLipTexture) {
                console.log("[InteractiveMakeup] Setting lips to default for coloring session.");

                this.scene.lips.setTexture(defaultLipTexture).setScale(layout.MakeupPosition.Lips.scale * 2);
            }
        }


        const position = layout.MakeupPosition[makeupType] || { x: 0, y: 0 };   
        let scale = 0.59 * 2;


        if (this.activeOutlineGraphics) { this.activeOutlineGraphics.destroy(); this.activeOutlineGraphics = null; }
        this.activeOutlineGraphics = this.scene.add.graphics();
        if (this.scene.faceContainer) {
            this.scene.faceContainer.add(this.activeOutlineGraphics);
        }

        if (makeupType === 'Lips') {

            this.activeMakeupImage = this.scene.add.image(position.x, position.y, textureKey)
                .setScale(layout.MakeupPosition.Lips.scale)
                .setDepth((MakeUpButton.DEPTH_VALUES[makeupType] || 2.6) + 0.001)
                .setVisible(true);
            if (this.scene.faceContainer) this.scene.faceContainer.add(this.activeMakeupImage);
            else { this.isActive = false; return; }

        } 
        else if(makeupType === 'Eyeshadow') {

            this.activeMakeupImage = this.scene.add.image(position.x, position.y, textureKey)
                .setScale(layout.MakeupPosition.Eyeshadow.scale)
                .setDepth((MakeUpButton.DEPTH_VALUES[makeupType] || 2.6) + 0.001)
                .setVisible(true);
            if (this.scene.faceContainer) this.scene.faceContainer.add(this.activeMakeupImage);
            else { this.isActive = false; return; }

            
        }
        else if(makeupType === 'Eyelashes') {

            this.activeMakeupImage = this.scene.add.image(position.x, position.y, textureKey)
                .setScale(layout.MakeupPosition.Eyelashes.scale)
                .setDepth((MakeUpButton.DEPTH_VALUES[makeupType] || 2.6) + 0.001)
                .setVisible(true);
            if (this.scene.faceContainer) this.scene.faceContainer.add(this.activeMakeupImage);
            else { this.isActive = false; return; }

        }
        else if(makeupType === 'Eyeliner') {

            this.activeMakeupImage = this.scene.add.image(position.x, position.y, textureKey)
                .setScale(layout.MakeupPosition.Eyeliner.scale)
                .setDepth((MakeUpButton.DEPTH_VALUES[makeupType] || 2.6) + 0.001)
                .setVisible(true);
            if (this.scene.faceContainer) this.scene.faceContainer.add(this.activeMakeupImage);
            else { this.isActive = false; return; }

        }
        
        
        
        else {
            this.activeMakeupImage = this.scene.add.image(position.x, position.y, textureKey)
                .setScale(scale)
                .setDepth(MakeUpButton.DEPTH_VALUES[makeupType] || 2.1)
                .setVisible(true);
            if (this.scene.faceContainer) this.scene.faceContainer.add(this.activeMakeupImage);
            else { this.isActive = false; return; }
        }
        if (this.activeOutlineGraphics) { this.activeOutlineGraphics.destroy(); }
        this.activeOutlineGraphics = this.scene.add.graphics();


        const sourceTexture = this.scene.textures.get(textureKey);
        if (!sourceTexture || !sourceTexture.getSourceImage()) { this.isActive = false; return; }
        const originalTextureWidth = sourceTexture.getSourceImage().width;
        const originalTextureHeight = sourceTexture.getSourceImage().height;


        if (this.activeOutlineGraphics && this.activeMakeupImage) {
            this.generateAndDrawOutline(
                this.activeOutlineGraphics,
                sourceTexture,
                originalTextureWidth,
                originalTextureHeight,
                this.activeMakeupImage.scale,
                999
            );
        }


        const bounds = this.activeMakeupImage.getBounds();
        this.drawingLayer = this.scene.make.renderTexture({
            x: bounds.x,
            y: bounds.y,
            width: originalTextureWidth,
            height: originalTextureHeight,
            add: false
        }, false).setOrigin(0, 0);

        if (!this.brushImage) {
            this.brushImage = this.scene.make.graphics({ fillStyle: { color: 0xffffff, alpha: 1 } }, false);
            this.brushImage.fillCircle(this.brushRadius, this.brushRadius, this.brushRadius);
        }


        const revealMask = this.drawingLayer.createBitmapMask();
        this.activeMakeupImage.setMask(revealMask);
        this.activeMakeupImage.alpha = 1;


        this.calculateTargetPixels(textureKey, this.activeMakeupImage.width, this.activeMakeupImage.height);


        this.scene.input.on('pointerdown', this.boundOnPointerDown);
        this.scene.input.on('pointermove', this.boundOnPointerMove);
        this.scene.input.on('pointerup', this.boundOnPointerUp);
        this.scene.input.on('pointerupoutside', this.boundOnPointerUp);


        MakeUpButton.selectedMakeUp[this.activeMakeupType] = {
            current: itemButtonInstance,
            previous: this.stateBeforeColoring[makeupType]
        };

        if (itemButtonInstance instanceof MakeUpButton) {
            itemButtonInstance.displayedMakeUp = this.activeMakeupImage;
        }
        if (this.scene.faceContainer) {
            this.scene.faceContainer.sort('depth');
        }
    }

    generateAndDrawOutline(graphics, sourceTexturePhaser, textureWidth, textureHeight, scale, depth) {
        graphics.clear();
        const worldPos = { x: 0, y: 0 };
        this.activeMakeupImage.getWorldTransformMatrix().transformPoint(0, 0, worldPos);
        graphics.setPosition(worldPos.x, worldPos.y);


        graphics.setPosition(worldPos.x, worldPos.y);
        const finalScale = this.activeMakeupImage.scale * this.scene.faceContainer.scale;
        graphics.setScale(finalScale);
        graphics.setDepth(depth);
        graphics.lineStyle(18 / finalScale, 0xffffff, 0.8);

        const sourceImageElement = sourceTexturePhaser.getSourceImage();
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = textureWidth;
        tempCanvas.height = textureHeight;
        const tempCtx = tempCanvas.getContext('2d', { willReadFrequently: true });
        if (!tempCtx) { console.error("Failed to get context for outline generation."); return; }
        tempCtx.drawImage(sourceImageElement, 0, 0, textureWidth, textureHeight);
        const imageData = tempCtx.getImageData(0, 0, textureWidth, textureHeight).data;

        const alphaThreshold = 20;


        graphics.fillStyle(0xffffff, 0.6);
        const dotSize = 2 / scale;

        for (let y = 0; y < textureHeight; y++) {
            for (let x = 0; x < textureWidth; x++) {
                const i = (y * textureWidth + x) * 4;
                const alpha = imageData[i + 3];

                if (alpha > alphaThreshold) {

                    const neighbors = [
                        (y > 0) ? imageData[((y - 1) * textureWidth + x) * 4 + 3] : 0,
                        (y < textureHeight - 1) ? imageData[((y + 1) * textureWidth + x) * 4 + 3] : 0,
                        (x > 0) ? imageData[(y * textureWidth + (x - 1)) * 4 + 3] : 0,
                        (x < textureWidth - 1) ? imageData[(y * textureWidth + (x + 1)) * 4 + 3] : 0
                    ];

                    let isEdge = false;
                    for (const neighborAlpha of neighbors) {
                        if (neighborAlpha <= alphaThreshold) {
                            isEdge = true;
                            break;
                        }
                    }

                    if (isEdge) {
                        const drawX = x - textureWidth / 2;
                        const drawY = y - textureHeight / 2;
                        graphics.fillRect(drawX - dotSize / 2, drawY - dotSize / 2, dotSize, dotSize);
                    }
                }
            }
        }

        this.scene.tweens.add({
            targets: graphics,
            alpha: 0.3,
            duration: 500,
            yoyo: true,
            repeat: -1
        });
    }

    triggerMakeUpTutorial(makeUpType) {
        const scene = this.scene;

        scene.tutorialCursor = scene.add.image(scene.scale.width / 2.75, scene.scale.height / 2, 'fingerCursor')
            .setDepth(100)
            .setScale(1.2);

        scene.tutorialTimeline = scene.add.timeline();

        const makeupPaths = {
            'Eyeliner': [
                 { x: scene.scale.width / 1.7, y: scene.scale.height / 2.4 },
                { x: scene.scale.width / 2.2, y: scene.scale.height / 2.2 },
                { x: scene.scale.width / 1.7, y: scene.scale.height / 3.2 },
                { x: scene.scale.width / 2.2, y: scene.scale.height / 3 }
            ],
            'Eyeshadow': [
                 { x: scene.scale.width / 1.7, y: scene.scale.height / 2.4 },
                { x: scene.scale.width / 2.2, y: scene.scale.height / 2.2 },
                { x: scene.scale.width / 1.7, y: scene.scale.height / 3.2 },
                { x: scene.scale.width / 2.2, y: scene.scale.height / 3 }
            ],
            'Lips': [
                 { x: scene.scale.width / 1.7, y: scene.scale.height / 2.4 },
                { x: scene.scale.width / 2.2, y: scene.scale.height / 2.2 },
                { x: scene.scale.width / 1.7, y: scene.scale.height / 3.2 },
                { x: scene.scale.width / 2.2, y: scene.scale.height / 3 }
            ],
            'Blush': [
                { x: scene.scale.width / 1.7, y: scene.scale.height / 2.4 },
                { x: scene.scale.width / 2.2, y: scene.scale.height / 2.2 },
                { x: scene.scale.width / 1.7, y: scene.scale.height / 3.2 },
                { x: scene.scale.width / 2.2, y: scene.scale.height / 3 }
            ]
        };

        const points = makeupPaths[makeUpType];
        if (!points) return;

        points.forEach((pt, index) => {
            const eventName = `MOVE_POINT${index + 1}`;

            // Register each move event
            scene.tutorialTimeline.on(eventName, () => {
                scene.tweens.add({
                    targets: scene.tutorialCursor,
                    x: pt.x,
                    y: pt.y / 0.9,
                    duration: 750,
                    ease: 'Sine.easeInOut'
                });
            });
        });

        const timelineEvents = [];
        let time = 0;
        for (let i = 0; i < points.length; i++) {
            timelineEvents.push({ at: time, event: `MOVE_POINT${i + 1}` });
            time += 750;
        }

        timelineEvents.push({ at: time, event: `MOVE_POINT1` });

        scene.tutorialTimeline.add(timelineEvents);

        // 🔁 Loop and play
        scene.tutorialTimeline.repeat().play();
    }

    onPointerDown(pointer) {
        if (!this.isActive || this.isComplete || !this.drawingLayer) return;
        this.isDrawing = true;
        this.drawOnMask(pointer);
    }

    onPointerMove(pointer) {
        if (!this.isActive || this.isComplete || !this.isDrawing || !pointer.isDown || !this.drawingLayer) {

            if (!pointer.isDown && this.isDrawing) {
                this.isDrawing = false;
                if (!this.checkingCompletion) this.checkCompletion();
            }
            return;
        }
        this.drawOnMask(pointer);
    }

    onPointerUp(pointer) {
        if (!this.isActive || !this.isDrawing || !this.drawingLayer) return;
        this.isDrawing = false;
        if (!this.checkingCompletion) {
            this.checkCompletion();
        }
    }

    drawOnMask(pointer) {
        if (!this.drawingLayer || !this.brushImage || this.isComplete) return;

        const localX = pointer.x - this.drawingLayer.x;
        const localY = pointer.y - this.drawingLayer.y;

        this.drawingLayer.draw(this.brushImage, localX - this.brushRadius, localY - this.brushRadius);
    }


    calculateTargetPixels(textureKey, imageWidth, imageHeight) {

        console.log(`[InteractiveMakeup] Calculating target pixels for: ${textureKey}`);
        try {
            const texture = this.scene.textures.get(textureKey);
            if (!texture || texture.key === '__MISSING') {
                console.error(`[InteractiveMakeup] Target texture not found: ${textureKey}`);
                this.totalTargetPixels = 0; this.targetPixelData = null; return;
            }
            const source = texture.getSourceImage();
            const width = source.width;
            const height = source.height;

            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = width; tempCanvas.height = height;
            const tempCtx = tempCanvas.getContext('2d', { willReadFrequently: true });
            if (!tempCtx) { console.error("[InteractiveMakeup] Could not create temp canvas context."); this.totalTargetPixels = 0; this.targetPixelData = null; return; }

            tempCtx.drawImage(source, 0, 0, width, height);
            const imageData = tempCtx.getImageData(0, 0, width, height);
            this.targetPixelData = imageData;
            this.totalTargetPixels = 0;
            for (let i = 0; i < imageData.data.length; i += 4) {
                if (imageData.data[i + 3] > 0) this.totalTargetPixels++;
            }
            console.log(`[InteractiveMakeup] Total target pixels for '${textureKey}': ${this.totalTargetPixels}`);
        } catch (error) {
            console.error("[InteractiveMakeup] Error calculating target pixels:", error);
            this.totalTargetPixels = 0; this.targetPixelData = null;
        }
    }

    checkCompletion() {

        if (this.isComplete || this.checkingCompletion || this.totalTargetPixels === 0 || !this.targetPixelData || !this.drawingLayer) {
            return;
        }
        this.checkingCompletion = true;
        console.log("[InteractiveMakeup] Checking completion...");

        this.drawingLayer.snapshot((snapshotImage) => {
            if (!snapshotImage || !this.targetPixelData) {
                console.warn("[InteractiveMakeup] Snapshot failed or original texture data missing for completion check.");
                this.checkingCompletion = false; return;
            }
            try {
                const rtWidth = this.drawingLayer.width;
                const rtHeight = this.drawingLayer.height;

                const snapCanvas = document.createElement('canvas');
                snapCanvas.width = rtWidth; snapCanvas.height = rtHeight;
                const snapCtx = snapCanvas.getContext('2d', { willReadFrequently: true });
                if (!snapCtx) { console.error("[InteractiveMakeup] Could not create snapshot canvas context."); this.checkingCompletion = false; return; }

                const scale = this.activeMakeupImage.scaleX;
                snapCtx.drawImage(
                    snapshotImage,
                    0, 0, rtWidth, rtHeight,
                    0, 0, rtWidth / scale, rtHeight / scale
                );
                const snapshotData = snapCtx.getImageData(0, 0, rtWidth, rtHeight).data;


                const originalData = this.targetPixelData.data;
                let revealedPixels = 0;


                if (snapshotData.length === originalData.length) {
                    for (let i = 0; i < snapshotData.length; i += 4) {
                        if (originalData[i + 3] > 0 && snapshotData[i + 3] > 0) {
                            revealedPixels++;
                        }
                    }
                } else {
                    console.warn("[InteractiveMakeup] Snapshot and original texture data length mismatch. Completion check will be inaccurate.");

                }


                const percentage = this.totalTargetPixels > 0 ? (revealedPixels / this.totalTargetPixels) * 100 : 0;

                console.log(`[InteractiveMakeup] Completion for ${this.activeMakeupType} (${this.activeTextureKey}): ${percentage.toFixed(2)}% (${revealedPixels}/${this.totalTargetPixels})`)
                if (percentage >= this.completionThreshold) {
                    this.finalizeSession(true, "threshold");
                } else if (percentage >= this.autoCompleteThreshold) {
                    if (!this.isComplete) {
                        console.log(percentage);
                        this.autoFillAndFinalize();
                    }
                }
                this.checkingCompletion = false;
            } catch (error) {
                console.error("[InteractiveMakeup] Error during snapshot processing:", error);
                this.checkingCompletion = false;
            }
        });
    }

    autoFillAndFinalize() {
        if (this.isComplete || !this.drawingLayer || !this.activeMakeupImage) return;
        console.log("[InteractiveMakeup] Auto-filling and finalizing...");
        this.drawingLayer.draw(this.activeMakeupImage, 0, 0, 1, 0xffffff);
        this.finalizeSession(true, "auto-completed");
    }

    finalizeSession(applyToCharacter, reason = "completed") {
        if (this.isComplete) return;

        this.isComplete = true;
        this.isDrawing = false;
        this.checkingCompletion = false;

        this.tutorialShown[this.activeMakeupType] = true;
        console.log(`%c[InteractiveMakeup] Session finalized for ${this.activeMakeupType}. Reason: ${reason}. Apply: ${applyToCharacter}`, 'color: lightgreen; font-weight: bold;');

        const typeFinalizing = this.activeMakeupType;
        const imageThatWasColored = this.activeMakeupImage;

        if (applyToCharacter) {
            let finalImageForEffect = null;
            if (imageThatWasColored) imageThatWasColored.clearMask();

            if (typeFinalizing === 'Lips') {

                this.scene.lips.setTexture(this.activeTextureKey).setScale(0.55 * 2).setVisible(true);

                if (imageThatWasColored && imageThatWasColored !== this.scene.lips) {
                    imageThatWasColored.destroy();
                }

                finalImageForEffect = this.scene.lips;

                const lipButton = MakeUpButton.selectedMakeUp['Lips']?.current;
                if (lipButton instanceof MakeUpButton) {
                    lipButton.displayedMakeUp = this.scene.lips;
                }
            }
            else {
                finalImageForEffect = imageThatWasColored;
            }

            if (finalImageForEffect && this.scene.UIManager) {
                this.scene.UIManager.playGlitterExplosion(finalImageForEffect);
                 this.scene.AudioManager?.playSFX?.('glitterSFX');
            }

            if (this.scene.faceContainer) {
                this.scene.faceContainer.sort('depth');
            }
            console.log(`[InteractiveMakeup] ${typeFinalizing} applied.`);
            if (this.scene.SaveManager) {
                this.scene.SaveManager.saveGame(this.scene);
            }
        } else {
            this.revertToPreviousState(typeFinalizing);
        }

        this.scene.TweeningUtils.hideApplyMakeUpPanel();

        this.cleanupSessionObjects(applyToCharacter, typeFinalizing, applyToCharacter ? (typeFinalizing === 'Lips' ? this.scene.lips : imageThatWasColored) : null);
    }


    stopColoringSession(makeupTypeToStop, forceDiscard = false) {
        if (!this.isActive || (makeupTypeToStop && this.activeMakeupType !== makeupTypeToStop)) return;

        const typeEffectivelyStopping = this.activeMakeupType;
        const wasCompleted = this.isComplete;
        console.log(`[InteractiveMakeup] Stopping session for ${typeEffectivelyStopping}. Discard: ${forceDiscard}, Completed: ${wasCompleted}`);
        this.isActive = false;
        this.scene.TweeningUtils.hideApplyMakeUpPanel();
        const imageFromThisSession = this.activeMakeupImage;
        this.activeMakeupImage = null;

        this.cleanupInputAndVisuals();

        if (forceDiscard || !wasCompleted) {

            if (imageFromThisSession && imageFromThisSession !== this.scene.lips) {
                console.log(`[InteractiveMakeup] Discarding: Destroying temp image for ${typeEffectivelyStopping}`);
                imageFromThisSession.destroy();
            }
            this.revertToPreviousState(typeEffectivelyStopping);
            this.resetSessionState();
        } else {
            this.resetSessionState();
        }
        console.log(`[InteractiveMakeup] Session for ${typeEffectivelyStopping} fully stopped.`);
    }

    revertToPreviousState(makeupType) {
        if (!makeupType) return;
        console.log(`[InteractiveMakeup] Reverting ${makeupType}.`);
        const previousStatutorialored = this.stateBeforeColoring[makeupType];

        let buttonForHelperCall = this.scene.makeUpButtons[makeupType]?.[0] || Object.values(this.scene.makeUpButtons || {}).flat()[0];
        if (!buttonForHelperCall) { return; }


        if (makeupType === 'Lips') {
            if (!this.scene.lips || !this.scene.lips.active) { return; }
            const targetTexture = (previousStatutorialored && previousStatutorialored.textureKey) ? previousStatutorialored.textureKey : defaultMakeUpSkins['Lips'];
            this.scene.lips.setTexture(targetTexture).setScale(0.55 * 2).setVisible(true).clearMask();

            if (previousStatutorialored && previousStatutorialored.isDefault) {
                MakeUpButton.selectedMakeUp.Lips = { current: previousStatutorialored, previous: null };
            } else if (previousStatutorialored && previousStatutorialored.buttonInstance) {
                MakeUpButton.selectedMakeUp.Lips = { current: previousStatutorialored.buttonInstance, previous: null };
                previousStatutorialored.buttonInstance.displayedMakeUp = this.scene.lips;
            } else {
                if (buttonForHelperCall) buttonForHelperCall._equipDefaultMakeUp('Lips', null);
            }
        } else {
            if (!buttonForHelperCall) { MakeUpButton.selectedMakeUp[makeupType] = { current: null, previous: null }; return; }
            if (previousStatutorialored && previousStatutorialored.buttonInstance) {
                previousStatutorialored.buttonInstance.toggleMakeUp();
            } else {
                buttonForHelperCall._equipDefaultMakeUp(makeupType, previousStatutorialored);
            }
        }
        this.stateBeforeColoring[makeupType] = null;
    }

    updateCustomCursorPosition(pointer) {
        if (this.isActive && !this.isComplete && this.customCursor.visible) {
            this.customCursor.x = pointer.worldX - this.brushRadius;
            this.customCursor.y = pointer.worldY - this.brushRadius;
        } else if (this.customCursor.visible) {

            this.customCursor.setVisible(false);
            this.scene.input.setDefaultCursor('default');
        }
    }

    cleanupInputAndVisuals() {
        const scene = this.scene;
        this.scene.input.off('pointerdown', this.boundOnPointerDown);
        this.scene.input.off('pointermove', this.boundOnPointerMove);
        this.scene.input.off('pointerup', this.boundOnPointerUp);
        this.scene.input.off('pointerupoutside', this.boundOnPointerUp);
        if (this.customCursor) this.customCursor.setVisible(false);
        this.scene.input.setDefaultCursor('default');

        if (this.drawingLayer) { this.drawingLayer.destroy(); this.drawingLayer = null; }
        if (this.activeOutlineGraphics) { this.scene.tweens.killTweensOf(this.activeOutlineGraphics); this.activeOutlineGraphics.destroy(); this.activeOutlineGraphics = null; }

        scene.tutorialTimeline?.stop?.();
        scene.tutorialTimeline?.clear?.();
        scene.tutorialTimeline = null;
        scene.point1?.destroy();
        scene.point2?.destroy();
        scene.point3?.destroy();
        scene.point4?.destroy();
        scene.tutorialCursor?.destroy();
    }

    resetSessionState() {
        this.isActive = false; this.activeMakeupType = null; this.activeTextureKey = null;
        this.targetPixelData = null; this.totalTargetPixels = 0;
        this.isDrawing = false; this.isComplete = false; this.checkingCompletion = false;

    }

    cleanupSessionObjects(keepTemporaryActiveImage, makeupTypeCleaned) {

        this.cleanupInputAndVisuals();

        if (this.activeMakeupImage) {

            if (makeupTypeCleaned !== 'Lips') {
                if (!keepTemporaryActiveImage) {
                    this.activeMakeupImage.destroy();
                } else if (keepTemporaryActiveImage && this.activeMakeupImage.mask) {

                    this.activeMakeupImage.clearMask();
                }
            }
            this.activeMakeupImage = null;
        }
        this.resetSessionState();
        console.log("[InteractiveMakeup] Session objects cleaned.");
    }

    cleanupAfterSession(wasAppliedAndKept) {

        this.customCursor.setVisible(false);
        this.scene.input.setDefaultCursor('default');
        this.scene.input.off('pointermove', this.updateCustomCursorPosition, this);
        this.scene.input.off('pointerdown', this.boundOnPointerDown);
        this.scene.input.off('pointermove', this.boundOnPointerMove);
        this.scene.input.off('pointerup', this.boundOnPointerUp);
        this.scene.input.off('pointerupoutside', this.boundOnPointerUp);


        if (this.activeOutlineGraphics) {
            this.scene.tweens.killTweensOf(this.activeOutlineGraphics);
            this.activeOutlineGraphics.destroy();
            this.activeOutlineGraphics = null;
        }

        if (this.drawingLayer) {
            this.drawingLayer.destroy();
            this.drawingLayer = null;
        }
        if (this.activeMakeupImage && !wasAppliedAndKept) {
            this.activeMakeupImage.destroy();
        }
        if (wasAppliedAndKept && this.activeMakeupImage) {

            this.activeMakeupImage.clearMask();
        }

        this.activeMakeupImage = null;
        this.activeMakeupType = null;
        this.activeTextureKey = null;
        this.targetPixelData = null;
        this.totalTargetPixels = 0;
        this.isDrawing = false;
        this.isComplete = false;
        this.checkingCompletion = false;
        this.isActive = false;
        this.stateBeforeColoring = {};
        console.log("[InteractiveMakeup] Session cleaned up.");
    }
}