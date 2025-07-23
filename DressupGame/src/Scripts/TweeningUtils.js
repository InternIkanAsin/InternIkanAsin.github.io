import { GameState } from './Main.js';
import { OutfitButton } from './UI/UIButton.js';
import { layout } from './ScreenOrientationUtils.js';
export default class TweenUtils {
    constructor(scene) {
        this.scene = scene;
        this.bodyScaleMakeupView = layout.character.zoomInScale;
        this.bodyScaleDressUpView = layout.character.scale;
    }

    showApplyMakeUpPanel() {
        const scene = this.scene;

        scene.tweens.add({
            targets: scene.applyMakeUpContainer,
            y: layout.applyMakeUpContainer.targetYPosition,
            duration: 500,
            ease: 'Back.Out'
        })
    }

    hideApplyMakeUpPanel() {
        const scene = this.scene;

        scene.tweens.add({
            targets: scene.applyMakeUpContainer,
            y: -100,
            duration: 500,
            ease: 'Back.Out'
        })
    }
    closeDrapes(duration = 500, onComplete = null) {
        const scene = this.scene;
        if (!scene.leftDrape || !scene.rightDrape) {
            console.error("Drapes not found on scene!");
            if (onComplete) onComplete();
            return;
        }

        
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

    async transitionBackToSelection() {
        const scene = this.scene;
        console.log("[TweenUtils] Transitioning back to selection screen.");

        if (scene.UIManager) {
            scene.UIManager.cleanupOrphanedOutfits(scene);
        }

        this.scene.MiniGameManager.disableInteraction();
        if (scene.interactiveMakeupSystem && scene.interactiveMakeupSystem.isActive) {
            console.log("[Back Transition] Coloring session active. Stopping and discarding.");
            scene.interactiveMakeupSystem.stopColoringSession(
                scene.interactiveMakeupSystem.activeMakeupType,
                true 
            );
        }
        await this.zoomOut();

        scene.state = GameState.MAKEUP;
        if (!this.scene.MiniGameManager.canContinueToScene2()) this.scene.dressUpFinished = false;

        this.hideApplyMakeUpPanel();

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
            x: targetLeftX, 
            duration: duration,
            ease: 'Power2'
        });
        scene.tweens.add({
            targets: scene.rightDrape,
            x: targetRightX, 
            duration: duration,
            ease: 'Power2',
            onComplete: () => {
                this.scene.MiniGameManager.enableInteraction();
            }
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
    



    setUpMiniGame(newState, comingFromState) {
        if (newState === GameState.DRESSUP) {
            this.zoomOut(comingFromState);
        } else {
            this.zoomIn(comingFromState);
        }
    }

    tweenOutfitImage(outfitImage, targetBodyX, targetBodyY, targetBodyScale, duration, ease) {
        if (!outfitImage || !outfitImage.active) return;

        
        const baseWorldOutfitX = outfitImage.getData('baseWorldOutfitX');
        const baseWorldOutfitY = outfitImage.getData('baseWorldOutfitY');
        const refBodyX = outfitImage.getData('refBodyX');
        const refBodyY = outfitImage.getData('refBodyY');
        const refBodyScale = outfitImage.getData('refBodyScale');
        const initialScaleX = outfitImage.getData('initialScaleX');
        const initialScaleY = outfitImage.getData('initialScaleY');

        
        if (refBodyX === undefined || refBodyScale === undefined || initialScaleX === undefined) {
            console.error("Outfit image is missing critical reference data. Cannot tween accurately.", outfitImage.texture.key);
            
            outfitImage.x = targetBodyX;
            outfitImage.y = targetBodyY;
            outfitImage.scale = targetBodyScale;
            return;
        }

        

        
        const offsetX = baseWorldOutfitX - refBodyX;
        const offsetY = baseWorldOutfitY - refBodyY;
        
        
        const scaleRatio = targetBodyScale / refBodyScale;
        const targetOutfitX = targetBodyX + (offsetX * scaleRatio);
        const targetOutfitY = targetBodyY + (offsetY * scaleRatio);

        
        const targetScaleX = initialScaleX * scaleRatio;
        const targetScaleY = initialScaleY * scaleRatio;

        

        this.scene.tweens.add({
            targets: outfitImage,
            x: targetOutfitX,
            y: targetOutfitY,
            scaleX: targetScaleX,
            scaleY: targetScaleY,
            duration: duration,
            ease: ease
        });
    }

    zoomIn(comingFromState = GameState.DRESSUP) {
        const scene = this.scene;
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


        Object.entries(OutfitButton.selectedOutfits).forEach(([outfitType, entry]) => {
            
            const outfitImage = entry?.current?.displayedOutfit || scene[outfitType];
            
            if (outfitImage) {
                this.tweenOutfitImage(outfitImage, targetBodyX, targetBodyY, targetBodyScale, 500, 'Sine.easeInOut');
            }
        });
    }

    async zoomOut() {
        return new Promise(resolve => {
            const scene = this.scene;
            const targetBodyX = layout.character.x;
            const targetBodyY = layout.character.y;
            const targetBodyScale = this.bodyScaleDressUpView;

            const targetFaceX = layout.face.zoomOutFaceX;
            const targetFaceY = layout.face.zoomOutFaceY;
            const targetFaceScale = layout.face.zoomOutTargetFaceScale;

            const targetHairX = layout.Hair.zoomOutHairX;
            const targetHairY = layout.Hair.zoomOutHairY;
            const targetHairScale = layout.Hair.zoomOutHairScale;

            const duration = 500;

            scene.tweens.add({ targets: [scene.body], x: targetBodyX, y: targetBodyY, scale: targetBodyScale, duration: duration, ease: 'Sine.easeInOut' });
            scene.tweens.add({ targets: [scene.faceContainer], x: targetFaceX, y: targetFaceY, scale: targetFaceScale, duration: duration, ease: 'Sine.easeInOut' });
            scene.tweens.add({ targets: [scene.hairBack, scene.hairFront], x: targetHairX, y: targetHairY, scale: targetHairScale, duration: duration, ease: 'Sine.easeInOut' });
            
            Object.entries(OutfitButton.selectedOutfits).forEach(([outfitType, entry]) => {
                 
                 const outfitImage = entry?.current?.displayedOutfit || scene[outfitType];
                 
                 if (outfitImage && outfitImage.active) {
                    this.tweenOutfitImage(outfitImage, targetBodyX, targetBodyY, targetBodyScale, duration, 'Sine.easeInOut');
                 }
            });

            scene.time.delayedCall(duration, () => {
                console.log("[TweenUtils] zoomOut animation complete.");
                resolve();
            });
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
        let buttonsToShow = [];

        this.scene.activePanel = "outfit";
        this.scene.DressUpManager.setCostumeButtons(outfitType, this);
        this.scene.outfitButtonsTypePanel.setVisible(true);
        this.scene.currentOutfitType = outfitType;

        if (this.scene.continueButton) {
            this.scene.continueButton.getAt(0).disableInteractive();
        }

        const typesToHide = outfitType === "DressShirt"
            ? Object.keys(this.scene.outfitButtons).filter(type => type !== "Dress" && type !== "Shirt")
            : Object.keys(this.scene.outfitButtons).filter(type => type !== outfitType);

        typesToHide.forEach(type => {
            this.scene.outfitButtons[type].forEach(button => button.container.setVisible(false));
        });

        await this.hideSideButtons();
        buttonsToShow = outfitType === "DressShirt"
            ? [...(this.scene.outfitButtons["Dress"] || []), ...(this.scene.outfitButtons["Shirt"] || [])]
            : this.scene.outfitButtons[outfitType] || [];

        buttonsToShow.forEach(button => {
            button.container.setVisible(true);
            button.button.setAlpha(0);
            button.icon.setAlpha(0);
        });

        
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

        
        this.scene.continueButton?.getAt(0)?.disableInteractive();

        
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