import { MakeUpButton } from '../UI/UIButton.js'; // For updating selectedMakeUp
import { MakeUpPositions, defaultMakeUpSkins, makeUpData } from '../Makeup Data/MakeUpData.js'; // For reverting

export class InteractiveMakeupSystem {
    constructor(scene) {
        this.scene = scene;
        this.AudioManager = scene.AudioManager; // Assuming AudioManager is on the scene

        this.isActive = false;
        this.activeMakeupType = null;     // e.g., "Lips", "Blush"
        this.activeTextureKey = null;   // e.g., "lipnormalpink" (the full color texture)
        this.activeMakeupImage = null;    // The Phaser.Image displaying the full color texture (masked)
        this.drawingLayer = null;         // RenderTexture used as the mask source
        this.brushImage = null;           // Graphics object for the brush shape
        this.brushRadius = 15;            // Default, can be overridden

        this.isDrawing = false;

        // For completion check
        this.targetPixelData = null;    // ImageData of the original full makeup texture
        this.totalTargetPixels = 0;
        this.checkingCompletion = false;
        this.completionThreshold = 95;    // Percentage to be considered "complete"
        this.autoCompleteThreshold = 80; // Percentage to trigger auto-fill

        // To store what was active before coloring started, for proper reversion
        this.stateBeforeColoring = {}; // { makeupType: originalSelectedInfo }

        // Bound event handlers for correct 'this' context
        this.boundOnPointerDown = this.onPointerDown.bind(this);
        this.boundOnPointerMove = this.onPointerMove.bind(this);
        this.boundOnPointerUp = this.onPointerUp.bind(this);
        this.activeOutlineGraphics = null;

        //cursor for coloring session
        this.customCursor = scene.add.graphics({ fillStyle: { color: 0xffffff, alpha: 0.5 } }) // Semi-transparent white
            .fillCircle(this.brushRadius, this.brushRadius, this.brushRadius)
            .setVisible(false)
            .setDepth(1000); // Ensure it's on top of other UI
        // Store initial radius for easy resizing
        this.customCursorRadius = this.brushRadius;
    }

    startColoringSession(makeupType, textureKey, itemButtonInstance) {
        this.stateBeforeColoring[makeupType] = MakeUpButton.selectedMakeUp[makeupType]?.current || null;
        console.log(this.stateBeforeColoring[makeupType])
        if (this.isActive) {
            // If a session for another type is active, or even the same type (shouldn't happen if logic is right), stop it.
            this.stopColoringSession(true); // true to force discard
        }

        this.scene.input.setDefaultCursor('none'); // Hide browser cursor
        this.customCursor.clear();
        this.customCursor.fillStyle(0xffffff, 0.5); //Brush color/alpha
        // Adjust circle position if graphics origin isn't 0,0 for fillCircle
        this.customCursor.fillCircle(this.brushRadius, this.brushRadius, this.brushRadius);
        this.customCursor.x = this.scene.input.activePointer.worldX - this.brushRadius; // Initial position
        this.customCursor.y = this.scene.input.activePointer.worldY - this.brushRadius;
        this.customCursor.setVisible(true);
        this.customCursor.setDepth(this.scene.sys.game.config.height + 100); // Very high depth

        this.scene.input.on('pointermove', this.updateCustomCursorPosition, this);

        console.log(`[InteractiveMakeup] Starting session for ${makeupType} - ${textureKey}`);
        this.isActive = true;
        this.activeMakeupType = makeupType;
        this.activeTextureKey = textureKey;
        this.isComplete = false; // Reset completion status for new session

        // Store the state before this coloring session began for this makeupType


        // 1. Get position and scale for this makeup type
        const position = MakeUpPositions[makeupType] || { x: 0, y: 0 };
        let scale = 0.55; // Default for most makeup

        // --- Outline Graphics ---
        if (this.activeOutlineGraphics) { this.activeOutlineGraphics.destroy(); this.activeOutlineGraphics = null; }
        this.activeOutlineGraphics = this.scene.add.graphics();
        



        // 2. Create the full makeup image (this will be masked)
        // It should be added to the faceContainer
        if (makeupType === 'Lips') {
            // **LIPS ARE SPECIAL: We keep scene.lips visible with its current texture.**
            // **The coloring will happen on a TEMPORARY image placed on top.**
            this.activeMakeupImage = this.scene.add.image(position.x, position.y, textureKey) // Temporary image with NEW color
                .setScale(scale)
                .setDepth((MakeUpButton.DEPTH_VALUES[makeupType] || 2.6) + 0.001) // Ensure it's just above scene.lips
                .setVisible(true);
            if (this.scene.faceContainer) this.scene.faceContainer.add(this.activeMakeupImage);
            else { /* error */ this.isActive = false; return; }
            // scene.lips remains as is for now.
        } else { // For Blush, Eyeshadow, Eyeliner (Additive colorable types)
            this.activeMakeupImage = this.scene.add.image(position.x, position.y, textureKey)
                .setScale(scale)
                .setDepth(MakeUpButton.DEPTH_VALUES[makeupType] || 2.1)
                .setVisible(true);
            if (this.scene.faceContainer) this.scene.faceContainer.add(this.activeMakeupImage);
            else { /* error */ this.isActive = false; return; }
        }


        const sourceTexture = this.scene.textures.get(textureKey);
        if (!sourceTexture || !sourceTexture.getSourceImage()) { /* ... error handling ... */ this.isActive = false; return; }
        const originalTextureWidth = sourceTexture.getSourceImage().width;
        const originalTextureHeight = sourceTexture.getSourceImage().height;

        // Generate outline based on the now setup activeMakeupImage
        if (this.activeOutlineGraphics && this.activeMakeupImage) {
            this.generateAndDrawOutline(
                this.activeOutlineGraphics, 
                sourceTexture,
                originalTextureWidth, 
                originalTextureHeight,
                this.activeMakeupImage.scale, 
                10000 
            );
        }
        // 3. Create the RenderTexture (drawingLayer) for the mask
        // Position and size it to match the activeMakeupImage

        const bounds = this.activeMakeupImage.getBounds(); // Get bounds AFTER scaling
        this.drawingLayer = this.scene.make.renderTexture({
            x: bounds.x, // Use bounds.x and bounds.y which are world coordinates of top-left
            y: bounds.y,
            width: originalTextureWidth,
            height: originalTextureHeight,
            add: false // Don't add to display list directly
        }, false).setOrigin(0, 0); // RenderTexture origin is top-left

        // 4. Create the brush graphics
        if (!this.brushImage) { // Create brush only once
            this.brushImage = this.scene.make.graphics({ fillStyle: { color: 0xffffff, alpha: 1 } }, false);
            this.brushImage.fillCircle(this.brushRadius, this.brushRadius, this.brushRadius); // Circle origin is its own top-left
        }

        // 5. Apply the mask
        const revealMask = this.drawingLayer.createBitmapMask();
        this.activeMakeupImage.setMask(revealMask);
        this.activeMakeupImage.alpha = 1; // Ensure target image is fully opaque to see mask effect

        // 6. Calculate target pixels from the source textureKey
        this.calculateTargetPixels(textureKey, this.activeMakeupImage.width, this.activeMakeupImage.height);

        // 7. Setup input listeners for drawing
        this.scene.input.on('pointerdown', this.boundOnPointerDown);
        this.scene.input.on('pointermove', this.boundOnPointerMove);
        this.scene.input.on('pointerup', this.boundOnPointerUp);
        this.scene.input.on('pointerupoutside', this.boundOnPointerUp); // Use same handler for simplicity

        // Update the global selected makeup to reflect this "in-progress" state
        // The `current` will be the button that initiated this.
        MakeUpButton.selectedMakeUp[this.activeMakeupType] = {
            current: itemButtonInstance, // The button instance itself
            previous: this.stateBeforeColoring[makeupType]
        };
        // The itemButtonInstance's displayedMakeUp should be our activeMakeupImage
        if (itemButtonInstance instanceof MakeUpButton) {
            itemButtonInstance.displayedMakeUp = this.activeMakeupImage;
        }
    }

    generateAndDrawOutline(graphics, sourceTexturePhaser, textureWidth, textureHeight, scale, depth) {
        graphics.clear(); // Clear previous outline
        const worldPos = { x: 0, y: 0 };
        this.activeMakeupImage.getWorldTransformMatrix().transformPoint(0, 0, worldPos);
        graphics.setPosition(worldPos.x, worldPos.y);  // Graphics object origin is 0,0; position it at makeup center
        
        // Position and scale in global scene
        graphics.setPosition(worldPos.x, worldPos.y); 
        const finalScale = this.activeMakeupImage.scale * this.scene.faceContainer.scale;
        graphics.setScale(finalScale); // Scale the graphics object itself
        graphics.setDepth(depth);
        graphics.lineStyle(2 / finalScale, 0xffffff, 0.8); // Line style (thickness, color, alpha)
        // Thickness adjusted by inverse scale to appear constant
        // Get pixel data from the Phaser Texture
        // This requires drawing the texture to a temporary canvas to access pixels,
        // similar to calculateTargetPixels, but we only need it once for the outline.
        const sourceImageElement = sourceTexturePhaser.getSourceImage();
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = textureWidth;
        tempCanvas.height = textureHeight;
        const tempCtx = tempCanvas.getContext('2d', { willReadFrequently: true });
        if (!tempCtx) { console.error("Failed to get context for outline generation."); return; }
        tempCtx.drawImage(sourceImageElement, 0, 0, textureWidth, textureHeight);
        const imageData = tempCtx.getImageData(0, 0, textureWidth, textureHeight).data;

        const alphaThreshold = 20; // Pixels above this alpha are considered part of the makeup

        // Store edge points to draw lines or small circles
        // For simplicity, we can draw a small rectangle/circle at each edge pixel.
        // True edge-following for continuous lines is more complex (e.g., Marching Squares algorithm).
        // Let's draw small dots for now for simplicity.
        graphics.fillStyle(0xffffff, 0.6);
        const dotSize = 2 / scale; // Make dots appear consistent regardless of scale

        for (let y = 0; y < textureHeight; y++) {
            for (let x = 0; x < textureWidth; x++) {
                const i = (y * textureWidth + x) * 4;
                const alpha = imageData[i + 3];

                if (alpha > alphaThreshold) {
                    // Check neighbors (up, down, left, right)
                    const neighbors = [
                        (y > 0) ? imageData[((y - 1) * textureWidth + x) * 4 + 3] : 0, // Up
                        (y < textureHeight - 1) ? imageData[((y + 1) * textureWidth + x) * 4 + 3] : 0, // Down
                        (x > 0) ? imageData[(y * textureWidth + (x - 1)) * 4 + 3] : 0, // Left
                        (x < textureWidth - 1) ? imageData[(y * textureWidth + (x + 1)) * 4 + 3] : 0  // Right
                    ];

                    let isEdge = false;
                    for (const neighborAlpha of neighbors) {
                        if (neighborAlpha <= alphaThreshold) {
                            isEdge = true;
                            break;
                        }
                    }

                    if (isEdge) {
                        // This pixel (x,y) is an edge pixel in the original texture's coordinate space.
                        // Since graphics object is positioned at centerX, centerY and scaled by scale,
                        // we need to draw relative to the graphics object's origin (0,0),
                        // which corresponds to the center of the unscaled texture.
                        // So, adjust x,y to be relative to the center of the texture.
                        const drawX = x - textureWidth / 2;
                        const drawY = y - textureHeight / 2;
                        graphics.fillRect(drawX - dotSize / 2, drawY - dotSize / 2, dotSize, dotSize);
                        // graphics.fillCircle(drawX, drawY, dotSize / 2); // Alternative: circles
                    }
                }
            }
        }
        // Optional: Add a subtle tween to the outline
        this.scene.tweens.add({
            targets: graphics,
            alpha: 0.4,
            duration: 700,
            yoyo: true,
            repeat: -1
        });
    }

    onPointerDown(pointer) {
        if (!this.isActive || this.isComplete || !this.drawingLayer) return;
        this.isDrawing = true;
        this.drawOnMask(pointer);
    }

    onPointerMove(pointer) {
        if (!this.isActive || this.isComplete || !this.isDrawing || !pointer.isDown || !this.drawingLayer) {
            // If pointer came up elsewhere, and we missed pointerup
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
            const width = source.width; // Use source image original dimensions for pixel data
            const height = source.height;

            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = width; tempCanvas.height = height;
            const tempCtx = tempCanvas.getContext('2d', { willReadFrequently: true }); //willReadFrequently might improve performance for repeated getImageData
            if (!tempCtx) { console.error("[InteractiveMakeup] Could not create temp canvas context."); this.totalTargetPixels = 0; this.targetPixelData = null; return; }

            tempCtx.drawImage(source, 0, 0, width, height);
            const imageData = tempCtx.getImageData(0, 0, width, height);
            this.targetPixelData = imageData; // Store the original texture's pixel data
            this.totalTargetPixels = 0;
            for (let i = 0; i < imageData.data.length; i += 4) {
                if (imageData.data[i + 3] > 0) this.totalTargetPixels++; // Count non-transparent pixels
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

                const scale = this.activeMakeupImage.scaleX; // diasumsikan uniform

                snapCtx.drawImage(
                    snapshotImage,
                    0, 0, rtWidth, rtHeight,
                    0, 0, rtWidth / scale, rtHeight / scale
                );
                const snapshotData = snapCtx.getImageData(0, 0, rtWidth, rtHeight).data;

                // We need to compare the scaled snapshot to the original targetPixelData.
                // This requires scaling down the snapshot or scaling up the targetPixelData for accurate comparison,
                // or more simply, ensuring calculateTargetPixels uses the *displayed size* if that's what drawingLayer matches.
                // For now, assuming drawingLayer matches displayed size of activeMakeupImage.
                // And targetPixelData was from original texture. This comparison will be tricky if scales differ.

                // Let's assume calculateTargetPixels was for the *source* texture dimensions.
                // And drawingLayer is for the *scaled displayed* dimensions.
                // This comparison is the hardest part to get right if source and display scales differ.
                // The prototype assumes drawingLayer matches source texture dimensions.
                // If activeMakeupImage is scaled, drawingLayer must also effectively map to the scaled version.

                // For now, let's simplify and assume the prototype's direct comparison logic can be adapted
                // IF drawingLayer is created with the original texture's width/height, and then the
                // activeMakeupImage is scaled and the drawingLayer (as a mask source) is also scaled with it.
                // OR, the drawingLayer matches the scaled activeMakeupImage, and we resample for comparison.

                // --- Simplified comparison (ASSUMES drawingLayer matches original texture pixel density) ---
                // This might not be accurate if activeMakeupImage is scaled.
                // The Eyeliner prototype had eyelinerImage (full texture) and drawingLayer be the same size.
                const originalData = this.targetPixelData.data;
                let revealedPixels = 0;

                // This loop assumes snapshotData (from drawingLayer) and originalData (from texture) are 1:1 pixel map
                // This will only be true if drawingLayer width/height === targetPixelData width/height
                if (snapshotData.length === originalData.length) {
                    for (let i = 0; i < snapshotData.length; i += 4) {
                        if (originalData[i + 3] > 0 && snapshotData[i + 3] > 0) { // Original pixel was part of makeup & drawn pixel is opaque
                            revealedPixels++;
                        }
                    }
                } else {
                    console.warn("[InteractiveMakeup] Snapshot and original texture data length mismatch. Completion check will be inaccurate.");
                    // Fallback or more complex resampling needed here. For now, we'll get 0% if mismatch.
                }


                const percentage = this.totalTargetPixels > 0 ? (revealedPixels / this.totalTargetPixels) * 100 : 0;

                console.log(`[InteractiveMakeup] Completion for ${this.activeMakeupType} (${this.activeTextureKey}): ${percentage.toFixed(2)}% (${revealedPixels}/${this.totalTargetPixels})`)
                if (percentage >= this.completionThreshold) {
                    this.finalizeSession(true, "threshold"); // Finalize and apply
                } else if (percentage >= this.autoCompleteThreshold) {
                    if (!this.isComplete) {
                        console.log(percentage);
                        this.autoFillAndFinalize();
                    }
                }
                this.checkingCompletion = false; // Reset flag
            } catch (error) {
                console.error("[InteractiveMakeup] Error during snapshot processing:", error);
                this.checkingCompletion = false;
            }
        });
    }

    autoFillAndFinalize() {
        if (this.isComplete || !this.drawingLayer || !this.activeMakeupImage) return;
        console.log("[InteractiveMakeup] Auto-filling and finalizing...");
        // Draw the full original texture onto the drawingLayer to make the mask fully opaque where makeup should be
        // We need to draw it at the correct local position (0,0) within the drawingLayer
        this.drawingLayer.draw(this.activeMakeupImage, 0, 0, 1, 0xffffff); // Draw with full alpha, white color
        // Or, more directly if activeMakeupImage is the source texture
        // this.drawingLayer.drawFrame(this.activeTextureKey, 0, 0, 0);

        this.finalizeSession(true, "auto-completed");
    }

    finalizeSession(applyToCharacter, reason = "completed") {
        if (this.isComplete) return;
        this.isComplete = true;
        this.isDrawing = false;
        this.checkingCompletion = false; // Ensure this is reset

        console.log(`%c[InteractiveMakeup] Session finalized for ${this.activeMakeupType}. Reason: ${reason}. Apply: ${applyToCharacter}`, 'color: lightgreen; font-weight: bold;');

        const typeFinalizing = this.activeMakeupType;
        const imageThatWasColored = this.activeMakeupImage; // Store ref before it's potentially changed/destroyed

        if (applyToCharacter) {
            if (imageThatWasColored) imageThatWasColored.clearMask();

            if (typeFinalizing === 'Lips') {
                // Apply the new texture to the persistent scene.lips
                this.scene.lips.setTexture(this.activeTextureKey).setScale(0.55).setVisible(true);
                // The temporary coloring image for lips is no longer needed
                if (imageThatWasColored && imageThatWasColored !== this.scene.lips) { // Ensure it's the temp one
                    imageThatWasColored.destroy();
                }
                // Update the button that started this to point to the persistent scene.lips
                const lipButton = MakeUpButton.selectedMakeUp['Lips']?.current;
                if (lipButton instanceof MakeUpButton) {
                    lipButton.displayedMakeUp = this.scene.lips;
                }
            } else {
                // For Blush/Eyeshadow/Eyeliner, imageThatWasColored IS the one we keep.
                // Its mask was cleared. The button already points to it.
            }

            if (this.scene.faceContainer) {
                this.scene.faceContainer.sort('depth');
            }
            console.log(`[InteractiveMakeup] ${typeFinalizing} applied.`);
        } else {
            this.revertToPreviousState(typeFinalizing); // This will destroy imageThatWasColored if it's temporary
        }
        // Pass true if the *final intended visual* was kept (scene.lips for Lips, imageThatWasColored for others)
        this.cleanupSessionObjects(applyToCharacter, typeFinalizing, applyToCharacter ? (typeFinalizing === 'Lips' ? this.scene.lips : imageThatWasColored) : null);
    }

    // Call this when user action dictates stopping (switching item, category, mode)
    // forceDiscard = true means don't try to finalize/complete, just clear.
    stopColoringSession(makeupTypeToStop, forceDiscard = false) {
        if (!this.isActive || (makeupTypeToStop && this.activeMakeupType !== makeupTypeToStop)) return;

        const typeEffectivelyStopping = this.activeMakeupType;
        const wasCompleted = this.isComplete;
        console.log(`[InteractiveMakeup] Stopping session for ${typeEffectivelyStopping}. Discard: ${forceDiscard}, Completed: ${wasCompleted}`);
        this.isActive = false;

        const imageFromThisSession = this.activeMakeupImage; // Store ref
        this.activeMakeupImage = null; // System no longer directly manages this specific image object

        this.cleanupInputAndVisuals(); // Removes listeners, drawingLayer, outline, cursor

        if (forceDiscard || !wasCompleted) {
            // Discarding or not completed: Destroy the temporary image used for coloring.
            // For Lips, imageFromThisSession was temporary. scene.lips was untouched during coloring.
            if (imageFromThisSession && imageFromThisSession !== this.scene.lips) { // Don't destroy scene.lips
                console.log(`[InteractiveMakeup] Discarding: Destroying temp image for ${typeEffectivelyStopping}`);
                imageFromThisSession.destroy();
            }
            this.revertToPreviousState(typeEffectivelyStopping);
            this.resetSessionState(); // Resets all session flags
        } else { // Session was completed and applied
            // `finalizeSession` already handled keeping the correct image (scene.lips or the temp image for others)
            // and clearing its mask. We just need to reset system state.
            this.resetSessionState();
        }
        console.log(`[InteractiveMakeup] Session for ${typeEffectivelyStopping} fully stopped.`);
    }

    revertToPreviousState(makeupType) {
        if (!makeupType) return;
        console.log(`[InteractiveMakeup] Reverting ${makeupType}.`);
        const previousStateStored = this.stateBeforeColoring[makeupType];

        let buttonForHelperCall = this.scene.makeUpButtons[makeupType]?.[0] || Object.values(this.scene.makeUpButtons || {}).flat()[0];
        if (!buttonForHelperCall) { return; }

        // If the active session was for Lips, scene.lips was being directly manipulated.
        // We need to restore its texture based on previousStateInfo.
        // For other types (Blush, Eyeshadow), their activeMakeupImage was temporary and already handled/destroyed by stopColoringSession.

        if (makeupType === 'Lips') {
            if (!this.scene.lips || !this.scene.lips.active) { return; }
            const targetTexture = (previousStateStored && previousStateStored.textureKey) ? previousStateStored.textureKey : defaultMakeUpSkins['Lips'];
            this.scene.lips.setTexture(targetTexture).setScale(0.55).setVisible(true).clearMask(); // Ensure mask is cleared

            if (previousStateStored && previousStateStored.isDefault) {
                MakeUpButton.selectedMakeUp.Lips = { current: previousStateStored, previous: null };
            } else if (previousStateStored && previousStateStored.buttonInstance) {
                MakeUpButton.selectedMakeUp.Lips = { current: previousStateStored.buttonInstance, previous: null };
                previousStateStored.buttonInstance.displayedMakeUp = this.scene.lips;
            } else { // Absolute default
                if (buttonForHelperCall) buttonForHelperCall._equipDefaultMakeUp('Lips', null);
            }
        } else { // Other colorable types (Blush, Eyeshadow, Eyeliner)
            if (!buttonForHelperCall) { /* ... */ MakeUpButton.selectedMakeUp[makeupType] = { current: null, previous: null }; return; }
            if (previousStateStored && previousStateStored.buttonInstance) {
                previousStateStored.buttonInstance.toggleMakeUp(); // Re-select previous (will be instant if non-colorable)
            } else {
                buttonForHelperCall._equipDefaultMakeUp(makeupType, previousStateStored); // Revert to default for this additive type
            }
        }
        this.stateBeforeColoring[makeupType] = null;
    }

    updateCustomCursorPosition(pointer) {
        if (this.isActive && !this.isComplete && this.customCursor.visible) {
            this.customCursor.x = pointer.worldX - this.brushRadius; // Adjust for circle's internal origin
            this.customCursor.y = pointer.worldY - this.brushRadius;
        } else if (this.customCursor.visible) {
            // If session ended but somehow listener still active, hide cursor
            this.customCursor.setVisible(false);
            this.scene.input.setDefaultCursor('default');
        }
    }

    cleanupInputAndVisuals() {
        this.scene.input.off('pointerdown', this.boundOnPointerDown);
        this.scene.input.off('pointermove', this.boundOnPointerMove);
        this.scene.input.off('pointerup', this.boundOnPointerUp);
        this.scene.input.off('pointerupoutside', this.boundOnPointerUp);
        if (this.customCursor) this.customCursor.setVisible(false); // If you have custom cursor
        this.scene.input.setDefaultCursor('default');

        if (this.drawingLayer) { this.drawingLayer.destroy(); this.drawingLayer = null; }
        if (this.activeOutlineGraphics) { this.scene.tweens.killTweensOf(this.activeOutlineGraphics); this.activeOutlineGraphics.destroy(); this.activeOutlineGraphics = null; }
    }

    resetSessionState() {
        this.isActive = false; this.activeMakeupType = null; this.activeTextureKey = null;
        this.targetPixelData = null; this.totalTargetPixels = 0;
        this.isDrawing = false; this.isComplete = false; this.checkingCompletion = false;
        // Do NOT clear stateBeforeColoring here, it's used by revert and cleared there per-type.
    }

    cleanupSessionObjects(keepTemporaryActiveImage, makeupTypeCleaned) {
        // Input listeners and outline are always cleaned
        this.cleanupInputAndVisuals();

        if (this.activeMakeupImage) {
            // For Lips, activeMakeupImage IS scene.lips, so we NEVER destroy it here.
            // Its texture is managed by finalizeSession or revertToPreviousState.
            if (makeupTypeCleaned !== 'Lips') {
                if (!keepTemporaryActiveImage) { // If it's a temp image (Blush/Eyeshadow) and NOT kept
                    this.activeMakeupImage.destroy();
                } else if (keepTemporaryActiveImage && this.activeMakeupImage.mask) {
                    // If it's a temp image that was kept (completed), clear its mask
                    this.activeMakeupImage.clearMask();
                }
            }
            this.activeMakeupImage = null;
        }
        this.resetSessionState();
        console.log("[InteractiveMakeup] Session objects cleaned.");
    }

    cleanupAfterSession(wasAppliedAndKept) {

        this.customCursor.setVisible(false); // Turn off custom cursor (coloring cursor)
        this.scene.input.setDefaultCursor('default'); // Restore browser cursor
        this.scene.input.off('pointermove', this.updateCustomCursorPosition, this);
        this.scene.input.off('pointerdown', this.boundOnPointerDown);
        this.scene.input.off('pointermove', this.boundOnPointerMove);
        this.scene.input.off('pointerup', this.boundOnPointerUp);
        this.scene.input.off('pointerupoutside', this.boundOnPointerUp);


        if (this.activeOutlineGraphics) {
            this.scene.tweens.killTweensOf(this.activeOutlineGraphics); // Stop pulsing
            this.activeOutlineGraphics.destroy();
            this.activeOutlineGraphics = null;
        }

        if (this.drawingLayer) {
            this.drawingLayer.destroy();
            this.drawingLayer = null;
        }
        if (this.activeMakeupImage && !wasAppliedAndKept) { // Only destroy if not kept by a button
            this.activeMakeupImage.destroy();
        }
        if (wasAppliedAndKept && this.activeMakeupImage) {
            // If applied and kept, just clear its mask so it's fully visible
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