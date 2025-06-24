import { GameState } from './Main.js';
import { OutfitButton } from './UI/UIButton.js';
import { outfitCustomSizes, outfitPositions, outfitManualOffsets } from './Outfit Data/CostumeData.js'; // Add this import
import { InteractiveMakeupSystem } from './Minigame/InteractiveMakeupSystem.js';
import { layout } from './ScreenOrientationUtils.js';
export default class TweenUtils {
    constructor(scene) {
        this.scene = scene;
         this.bodyScaleMakeupView = layout.character.zoomInScale;
        this.bodyScaleDressUpView = layout.character.scale;
    }

    closeDrapes(duration = 500, onComplete = null) {
        const scene = this.scene;
        if (!scene.leftDrape || !scene.rightDrape) {
            console.error("Drapes not found on scene!");
            if (onComplete) onComplete();
            return;
        }

        const centerX = scene.scale.width / 2;
        scene.tweens.add({
            targets: scene.leftDrape,
            x: layout.drapes.closed.leftX,
            duration: duration,
            ease: 'Power2'
        });

        scene.tweens.add({
            targets: scene.rightDrape,
            x: layout.drapes.closed.rightX,
            duration: duration,
            ease: 'Power2',
            onComplete: () => {
                if (onComplete) {
                    onComplete();
                }
            }
        });

        scene.tweens.add({
            targets: scene.leftCurtain,
            x: layout.curtain.closed.leftX,
            duration: duration,
            ease: 'Power2',
        });
        scene.tweens.add({
            targets: scene.rightCurtain,
            x: layout.curtain.closed.rightX,
            duration: duration,
            ease: 'Power2',
        });
    }

    transitionBackToSelection() {
        const scene = this.scene;
        console.log("[TweenUtils] Transitioning back to selection screen.");

        if (scene.interactiveMakeupSystem && scene.interactiveMakeupSystem.isActive) {
            console.log("[Back Transition] Coloring session active. Stopping and discarding.");
            scene.interactiveMakeupSystem.stopColoringSession(
                scene.interactiveMakeupSystem.activeMakeupType,
                true // force discard
            );
        }

        scene.state = GameState.MAKEUP;


        this.zoomOut();

        this.closeDrapes(500, () => {

            scene.MiniGameManager.clearMinigameUI();

            scene.createSelectionButtons();


            this.openDrapesHalfway(1000);

        });
    }

    openDrapes(duration = 500, onComplete = null) {
        const scene = this.scene;
        if (!scene.leftDrape || !scene.rightDrape) {
            console.error("Drapes not found on scene!");
            if (onComplete) onComplete();
            return;
        }

       

        scene.tweens.add({
            targets: scene.leftDrape,
              x: layout.drapes.open.leftX,
            duration: duration,
            ease: 'Power2',
            onComplete: () => {

            }
        });
        scene.tweens.add({
            targets: scene.rightDrape,
            x: layout.drapes.open.rightX,
            duration: duration,
            ease: 'Power2',
            onComplete: () => {
                if (onComplete) {
                    onComplete();
                }
            }
        });
        scene.tweens.add({
            targets: scene.leftCurtain,
              x: layout.curtain.open.leftX,
            duration: duration,
            ease: 'Power2',
        });
        scene.tweens.add({
            targets: scene.rightCurtain,
            x: layout.curtain.open.rightX,
            duration: duration,
            ease: 'Power2',
        });
    }

    openDrapesHalfway(duration = 1000) {
        const scene = this.scene;
        if (!scene.leftDrape || !scene.rightDrape) { return; }


        const targetLeftX = (scene.scale.width * 0.25) - (scene.leftDrape.width);
        const targetRightX = (scene.scale.width * 0.75) + (scene.rightDrape.width);

        scene.tweens.add({
            targets: scene.leftDrape,
            x: targetLeftX, // move from middle sideways
            duration: duration,
            ease: 'Power2'
        });
        scene.tweens.add({
            targets: scene.rightDrape,
            x: targetRightX, // move from middle sideways
            duration: duration,
            ease: 'Power2'
        });
    }

    openCurtains(duration = 1000) {
        const scene = this.scene;
        const centerX = scene.scale.width / 2;
        scene.tweens.add({
            targets: scene.leftCurtain,
            x: layout.drapes.halfway.leftX,
            duration: duration,
            ease: 'Power2',
        });
        scene.tweens.add({
            targets: scene.rightCurtain,
            x: layout.drapes.halfway.rightX,
            duration: duration,
            ease: 'Power2',
        });
    }
    transitionMiniGame() {
        const actualPreviousState = this.scene.state;


        // 1. Stop any active coloring session if coming from MAKEUP
        if (actualPreviousState === GameState.MAKEUP && this.scene.interactiveMakeupSystem?.isActive) {
            this.scene.interactiveMakeupSystem.stopColoringSession(this.scene.interactiveMakeupSystem.activeMakeupType, true);
        }

        // 2. Hide selected item header immediately
        if (this.scene.selectedButtonHeader) {
            this.scene.tweens.killTweensOf(this.scene.selectedButtonHeader);
            this.scene.selectedButtonHeader.setAlpha(0);
            // console.log("Header alpha forced to 0 by transitionMiniGame");
        }

        // 3. Hide and disable back button immediately
        if (this.scene.MiniGameManager && this.scene.MiniGameManager.backButton) {
            this.scene.tweens.killTweensOf(this.scene.MiniGameManager.backButton); // Kill position tweens
            this.scene.MiniGameManager.backButton.setX(this.scene.scale.width / 2 * 2.3); // Move off-screen immediately
            this.scene.MiniGameManager.backButton.disableInteractive();
            // console.log("Back button moved off-screen and disabled by transitionMiniGame");
        }


        // 4. Toggle the game state
        this.scene.state = (actualPreviousState === GameState.MAKEUP) ? GameState.DRESSUP : GameState.MAKEUP;
        console.log(`[TweenUtils] Transitioning from ${actualPreviousState} to ${this.scene.state}`);

        // 5. Perform the zoom animations for the new view
        this.setUpMiniGame(this.scene.state, actualPreviousState); // Your orchestrator for zoomIn/zoomOut

        // 6. Update the main mode toggle button text/icon
        if (this.scene.state === GameState.DRESSUP) {
            this.scene.sidePanelHeaderText?.setText("Dress Up");
            this.scene.sidePanelHeaderText?.setTexture('dressButtonIcon2');
        } else { // GameState.MAKEUP
            this.scene.sidePanelHeaderText?.setText("Make Up");
            this.scene.sidePanelHeaderText?.setTexture('makeUpButtonIcon2');
        }

        // 7. Update the side panel to show the correct CATEGORIES for the new state
        // This will also handle tweening the sidePanel itself.
        if (this.scene.MiniGameManager) {
            this.scene.MiniGameManager.updatePanelCategory(this.scene);
        }
    }



    setUpMiniGame(newState, comingFromState) {
        if (newState === GameState.DRESSUP) {
            this.zoomOut(comingFromState);
        } else {
            this.zoomIn(comingFromState);
        }
    }

    tweenOutfitImage(outfitImage, targetBodyX, targetBodyY, targetBodyScale, referenceBodyScale, duration, ease) {
        if (!outfitImage || !outfitImage.active) return;


        const baseWorldX = outfitImage.getData('baseWorldOutfitX');
        const baseWorldY = outfitImage.getData('baseWorldOutfitY');
        const usesCustomSize = outfitImage.getData('usesCustomSize');
        const baseScaleX = outfitImage.getData('baseScaleX');
        const baseScaleY = outfitImage.getData('baseScaleY');


        const scaleChangeFactor = targetBodyScale / referenceBodyScale;


        const initialBodyX = this.scene.scale.width / 2 / 1.1;
        const initialBodyY = this.scene.scale.height / 2 / 0.9;

        const offsetXInDressUpView = baseWorldX - initialBodyX;
        const offsetYInDressUpView = baseWorldY - initialBodyY;

        const targetOutfitX = targetBodyX + (offsetXInDressUpView * scaleChangeFactor);
        const targetOutfitY = targetBodyY + (offsetYInDressUpView * scaleChangeFactor);

        const targetScaleX = baseScaleX * scaleChangeFactor;
        const targetScaleY = baseScaleY * scaleChangeFactor;


        this.scene.tweens.add({
            targets: outfitImage,
            x: targetOutfitX,
            y: targetOutfitY,
            scaleX: targetScaleX,
            scaleY: targetScaleY,
            duration: duration,
            ease: ease,
            onStart: () => { if (outfitImage) outfitImage.setVisible(true); }
        });
    }

    zoomIn(comingFromState = GameState.DRESSUP) {
        const centerX = this.scene.scale.width / 2;
        const centerY = this.scene.scale.height / 2;

        const targetBodyX = layout.character.zoomInX;
        const targetBodyY = layout.character.zoomInY;
        const targetBodyScale = this.bodyScaleMakeupView;

        const targetFaceX = layout.face.zoomInFaceX;
        const targetFaceY = layout.face.zoomInFaceY;
        const targetFaceScale = layout.face.zoomInTargetFaceScale;

        const targetHairX = layout.Hair.zoomInHairX;
        const targetHairY = layout.Hair.zoomInHairY;
        const targetHairScale = layout.Hair.zoomInTargetHairScale;

        this.scene.tweens.add({ targets: [this.scene.body], x: targetBodyX, y: targetBodyY, scale: targetBodyScale, duration: 500, ease: 'Sine.easeInOut' });
        this.scene.tweens.add({ targets: [this.scene.faceContainer], x: targetFaceX, y: targetFaceY, scale: targetFaceScale, duration: 500, ease: 'Sine.easeInOut' });
        this.scene.tweens.add({ targets: [this.scene.hairBack, this.scene.hairFront], x: targetHairX, y: targetHairY, scale: targetHairScale, duration: 500, ease: 'Sine.easeInOut' });


        Object.values(OutfitButton.selectedOutfits).forEach(entry => {
            const equippedButton = entry?.current;

            if (equippedButton && equippedButton.displayedOutfit && equippedButton.displayedOutfit.active) {

                this.tweenOutfitImage(equippedButton.displayedOutfit, targetBodyX, targetBodyY, targetBodyScale, this.bodyScaleDressUpView, 500, 'Sine.easeInOut');
            }
        });
    }

    zoomOut(comingFromState = GameState.MAKEUP) {
        const centerX = this.scene.scale.width / 2;
        const centerY = this.scene.scale.height / 2;

        const targetBodyX = layout.character.x;
        const targetBodyY = layout.character.y;
        const targetBodyScale = this.bodyScaleDressUpView;

        const targetFaceX = layout.face.zoomOutFaceX;
        const targetFaceY = layout.face.zoomOutFaceY;
        const targetFaceScale = layout.face.zoomOutTargetFaceScale;

        const targetHairX = layout.Hair.zoomOutHairX;
        const targetHairY = layout.Hair.zoomOutHairY;
        const targetHairScale = layout.Hair.zoomOutHairScale;

        this.scene.tweens.add({ targets: [this.scene.body], x: targetBodyX, y: targetBodyY, scale: targetBodyScale, duration: 500, ease: 'Sine.easeInOut' });
        this.scene.tweens.add({ targets: [this.scene.faceContainer], x: targetFaceX, y: targetFaceY, scale: targetFaceScale, duration: 500, ease: 'Sine.easeInOut' });
        this.scene.tweens.add({ targets: [this.scene.hairBack, this.scene.hairFront], x: targetHairX, y: targetHairY, scale: targetHairScale, duration: 500, ease: 'Sine.easeInOut' });


        Object.values(OutfitButton.selectedOutfits).forEach(entry => {
            const equippedButton = entry?.current;

            if (equippedButton && equippedButton.displayedOutfit && equippedButton.displayedOutfit.active) {

                this.tweenOutfitImage(equippedButton.displayedOutfit, targetBodyX, targetBodyY, targetBodyScale, this.bodyScaleDressUpView, 500, 'Sine.easeInOut');
            }
        });
    }

    displaySideButtons() {
        this.scene.openButton.disableInteractive();

        this.scene.categoryButtonsPanel.setVisible(true);

        const buttons = [this.scene.dressShirtButton, this.scene.outerButton, this.scene.underwearButton, this.scene.uniformButton, this.scene.socksButton, this.scene.shoesButton];
        buttons.forEach(button => {
            if (button) button.setVisible(true);
        });

        this.scene.tweens.add({
            targets: this.scene.categoryButtonsPanel,
            x: this.scene.scale.width - 100,
            duration: 500,
            repeat: 0,
            ease: 'Sine.easeInOut',
            onComplete: () => {
                this.scene.tweens.add({
                    targets: buttons,
                    alpha: 1,
                    duration: 500,
                    ease: 'Linear'
                });
                this.scene.openButton.setInteractive();
            }
        });

        this.scene.tweens.add({
            targets: this.scene.openButton,
            x: this.scene.scale.width - 200,
            duration: 500,
            repeat: 0,
            ease: 'Sine.easeInOut'
        });


        const newPlayerX = this.scene.scale.width / 4.2;
        this.scene.tweens.add({
            targets: [this.scene.body],
            x: newPlayerX,
            duration: 500,
            repeat: 0,
            ease: 'Sine.easeInOut'
        });

        this.scene.tweens.add({
            targets: [this.scene.faceContainer],
            x: this.scene.scale.width / 4.5,
            duration: 500,
            repeat: 0,
            ease: 'Sine.easeInOut'
        });

        this.scene.tweens.add({
            targets: [this.scene.hairBack, this.scene.hairFront],
            x: this.scene.scale.width / 4.33,
            duration: 500,
            repeat: 0,
            ease: 'Sine.easeInOut'
        });
        this.scene.tweens.add({
            targets: [this.scene.background],
            x: this.scene.scale.width,
            duration: 500,
            repeat: 0,
            ease: 'Sine.easeInOut'
        });


        console.log(`displayCategoryButtons: player.y = ${this.scene.body.y}`);
        Object.values(this.scene.outfitButtons).flat().forEach(outfitButton => {
            outfitButton.tweenOutfit(newPlayerX, this.scene.body.y, 500, 'Sine.easeInOut');
        });
    }

    hideSideButtons() {
        return new Promise((resolve) => {
            const buttons = [this.scene.dressShirtButton, this.scene.outerButton, this.scene.underwearButton, this.scene.uniformButton, this.scene.socksButton, this.scene.shoesButton];
            buttons.forEach(button => {
                if (button) this.scene.tweens.killTweensOf(button);
            });

            this.scene.tweens.add({
                targets: buttons,
                alpha: 0,
                duration: 100,
                ease: 'Linear',
                onComplete: () => {
                    buttons.forEach(button => {
                        if (button) button.setVisible(false);
                    });

                    // Create promises for all tweens
                    const panelTweenPromise = new Promise((panelResolve) => {
                        this.scene.tweens.add({
                            targets: [this.scene.categoryButtonsPanel],
                            x: this.scene.scale.width + 100,
                            duration: 300,
                            ease: 'Sine.easeInOut',
                            onComplete: () => {
                                this.scene.categoryButtonsPanel.setVisible(false);
                                panelResolve();
                            }
                        });
                    });

                    const openButtonTweenPromise = new Promise((openButtonResolve) => {
                        this.scene.tweens.add({
                            targets: this.scene.openButton,
                            x: this.scene.scale.width - 20,
                            duration: 300,
                            ease: 'Sine.easeInOut',
                            onComplete: openButtonResolve
                        });
                    });

                    const playerTweenPromise = new Promise((playerResolve) => {
                        const newPlayerX = this.scene.scale.width / 1.99;
                        this.scene.tweens.add({
                            targets: [this.scene.body],
                            x: newPlayerX,
                            duration: 500,
                            repeat: 0,
                            ease: 'Sine.easeInOut'
                        });
                        this.scene.tweens.add({
                            targets: [this.scene.hairBack, this.scene.hairFront],
                            x: this.scene.scale.width / 2.02,
                            duration: 500,
                            repeat: 0,
                            ease: 'Sine.easeInOut'
                        });
                        this.scene.tweens.add({
                            targets: [this.scene.faceContainer],
                            x: this.scene.scale.width * 0.485,
                            duration: 500,
                            repeat: 0,
                            ease: 'Sine.easeInOut',
                            onComplete: playerResolve
                        });
                        // Tween all selected outfits to follow the player
                        Object.values(this.scene.outfitButtons).flat().forEach(outfitButton => {
                            outfitButton.tweenOutfit(newPlayerX, this.scene.body.y, 500, 'Sine.easeInOut');
                        });
                    });

                    const backgroundTweenPromise = new Promise((backgroundResolve) => {
                        this.scene.tweens.add({
                            targets: [this.scene.background],
                            x: this.scene.scale.width + 190,
                            duration: 500,
                            repeat: 0,
                            ease: 'Sine.easeInOut',
                            onComplete: backgroundResolve
                        });
                    });

                    // Wait for all tweens to complete before resolving
                    Promise.all([
                        panelTweenPromise,
                        openButtonTweenPromise,
                        playerTweenPromise,
                        backgroundTweenPromise
                    ]).then(() => {
                        this.scene.openButton.setInteractive();
                        resolve();
                    });
                }
            });
        });
    }

    async displayButtons(outfitType, target) {
        const isDressSelected = !!this.scene.OutfitButton.selectedOutfits["Dress"];

        let buttonsToShow = [];

        this.scene.activePanel = "outfit";
        this.scene.DressUpManager.setCostumeButtons(outfitType, this);
        this.scene.outfitButtonsTypePanel.setVisible(true);
        this.scene.currentOutfitType = outfitType;

        if (this.scene.continueButton) {
            this.scene.continueButton.getAt(0).disableInteractive();
        }

        // Hide other outfit types
        const typesToHide = outfitType === "DressShirt"
            ? Object.keys(this.scene.outfitButtons).filter(type => type !== "Dress" && type !== "Shirt")
            : Object.keys(this.scene.outfitButtons).filter(type => type !== outfitType);

        typesToHide.forEach(type => {
            this.scene.outfitButtons[type].forEach(button => button.container.setVisible(false));
        });

        await this.hideSideButtons();

        // Determine which buttons to show
        buttonsToShow = outfitType === "DressShirt"
            ? [...(this.scene.outfitButtons["Dress"] || []), ...(this.scene.outfitButtons["Shirt"] || [])]
            : this.scene.outfitButtons[outfitType] || [];

        buttonsToShow.forEach(button => {
            button.container.setVisible(true);
            button.button.setAlpha(0);
            button.icon.setAlpha(0);
        });

        // Tween background, player, hair, and expression positions
        const newPlayerY = this.scene.scale.height - 800;
        const tweensToMove = [
            { targets: this.scene.background, y: this.scene.scale.height / 2.06 },
            { targets: this.scene.body, y: newPlayerY },
            { targets: this.scene.hair, y: this.scene.scale.height - 1020 },
            { targets: this.scene.faceContainer, y: this.scene.scale.height - 1155 }
        ];

        tweensToMove.forEach(({ targets, y }) => {
            this.scene.tweens.add({
                targets,
                y,
                duration: 500,
                ease: 'Sine.easeInOut'
            });
        });

        // Disable continue button if exists
        this.scene.continueButton?.getAt(0)?.disableInteractive();

        // Tween button containers
        const buttonContainers = buttonsToShow.map(button => button.container);
        this.scene.tweens.add({
            targets: buttonContainers,
            y: this.scene.scale.height - 130,
            duration: 500,
            ease: 'Sine.easeInOut'
        });

        this.scene.tweens.add({
            targets: this.scene.outfitButtonsTypePanel,
            y: this.scene.scale.height - 130,
            duration: 500,
            ease: 'Sine.easeInOut',
            onComplete: () => {
                buttonsToShow.forEach(button => {
                    this.scene.tweens.add({
                        targets: [button.button, button.icon, button.statText],
                        alpha: 1,
                        duration: 300,
                        ease: 'Sine.easeInOut'
                    });
                });
            }
        });

        // Move outfit buttons
        Object.values(this.scene.outfitButtons).flat().forEach(button =>
            button.tweenOutfit(this.scene.body.x, newPlayerY, 500, 'Sine.easeInOut')
        );
    }

    async hideButtons(outfitType) {
        return new Promise((resolve) => {
            let buttonsToHide = [];
            if (outfitType === "DressShirt") {
                buttonsToHide = [...(this.scene.outfitButtons["Dress"] || []), ...(this.scene.outfitButtons["Shirt"] || [])];
            } else {
                buttonsToHide = this.scene.outfitButtons[outfitType] || [];
            }

            buttonsToHide.forEach(button => {
                this.scene.tweens.add({
                    targets: [button.button, button.icon, button.statText],
                    alpha: 0,
                    duration: 300,
                    ease: 'Linear'
                });
            });

            setTimeout(() => {
                const backgroundTweenPromise = new Promise((backgroundResolve) => {
                    this.scene.tweens.add({
                        targets: this.scene.background,
                        y: this.scene.scale.height / 2,
                        duration: 500,
                        ease: 'Sine.easeInOut',
                        onComplete: backgroundResolve
                    });
                });

                const playerTweenPromise = new Promise((playerResolve) => {
                    const newPlayerY = this.scene.scale.height - 600;
                    this.scene.tweens.add({
                        targets: this.scene.body,
                        y: newPlayerY,
                        duration: 500,
                        ease: 'Sine.easeInOut',
                        onComplete: playerResolve
                    });

                    Object.values(this.scene.outfitButtons).flat().forEach(outfitButton => {
                        outfitButton.tweenOutfit(this.scene.body.x, newPlayerY, 500, 'Sine.easeInOut');
                    });
                });

                const hairTweenPromise = new Promise((hairResolve) => {
                    this.scene.tweens.add({
                        targets: this.scene.hair,
                        y: this.scene.scale.height - 820,
                        duration: 500,
                        ease: 'Sine.easeInOut',
                        onComplete: hairResolve
                    });
                });

                const expressionTweenPromise = new Promise((expressionResolve) => {
                    this.scene.tweens.add({
                        targets: this.scene.faceContainer,
                        y: this.scene.scale.height - 955,
                        duration: 500,
                        ease: 'Sine.easeInOut',
                        onComplete: expressionResolve
                    });
                });

                const panelTweenPromise = new Promise((panelResolve) => {
                    this.scene.tweens.add({
                        targets: this.scene.outfitButtonsTypePanel,
                        y: this.scene.scale.height + 300,
                        duration: 500,
                        ease: 'Sine.easeInOut',
                        onComplete: () => {
                            this.scene.outfitButtonsTypePanel.setVisible(false);
                            panelResolve();
                        }
                    });
                });

                const outfitContainers = buttonsToHide.map(button => button.container);
                const containersTweenPromise = new Promise((containersResolve) => {
                    this.scene.tweens.add({
                        targets: outfitContainers,
                        y: this.scene.scale.height + 200,
                        duration: 500,
                        ease: 'Sine.easeInOut',
                        onComplete: () => {
                            buttonsToHide.forEach(button => {
                                button.container.setVisible(false);
                            });
                            containersResolve();
                        }
                    });
                });

                Promise.all([
                    backgroundTweenPromise,
                    playerTweenPromise,
                    hairTweenPromise,
                    expressionTweenPromise,
                    panelTweenPromise,
                    containersTweenPromise
                ]).then(() => {
                    // Re-enable the ContinueButton
                    if (this.scene.continueButton) {
                        this.scene.continueButton.getAt(0).setInteractive();
                    }
                    console.log(`hideButtons completed: player.y = ${this.scene.body.y}`);
                    resolve();
                });
            }, 300);
        });
    }

}