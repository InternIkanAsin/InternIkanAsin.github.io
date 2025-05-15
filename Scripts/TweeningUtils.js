import { GameState } from './Main.js'

export default class TweenUtils {
    constructor(scene) {
        this.scene = scene;
    }

    transitionMiniGame() {
        const { width, height } = this.scene.sys.game.config;

        //Change state of minigame
        this.scene.state = this.scene.state === GameState.MAKEUP ? GameState.DRESSUP : GameState.MAKEUP;
        console.log(this.scene.state);

        this.setUpMiniGame(this.scene.state);
        this.scene.MiniGameManager.updatePanelCategory(this.scene);
    }

    setUpMiniGame() {
        if (this.scene.state === GameState.DRESSUP) {
            //Zoom out the background and player
            this.zoomOut();

            //Change MiniGame Button text and icon 
            this.scene.miniGameButton.setIconTexture('makeUpIcon');
            this.scene.miniGameButton.setText('Make Up');
        } else {
            //Zoom in the background and player
            this.zoomIn();

            //Change MiniGame Button text and icon 
            this.scene.miniGameButton.setIconTexture('dressIcon');
            this.scene.miniGameButton.setText('Dress Up');
        }

    }

    zoomIn() {
        //Define center of X and Y
        const centerX = this.scene.scale.width / 2;
        const centerY = this.scene.scale.height / 2;

        //Zoom out the background and player
        this.scene.tweens.add({
            targets: [this.scene.background],
            scale: 1.2,
            duration: 500,
            ease: 'Sine.easeInOut'
        })

        this.scene.tweens.add({
            targets: [this.scene.body],
            y: centerY * 2.6,
            x: centerX * 1.05,
            scale: 1.9,
            duration: 500,
            ease: 'Sine.easeInOut'
        })

        this.scene.tweens.add({
            targets: [this.scene.faceContainer],
            y: centerY / 1.2,
            x: centerX * 0.95,
            scale: 1,
            duration: 500,
            ease: 'Sine.easeInOut'
        })

        this.scene.tweens.add({
            targets: [this.scene.hair],
            y: centerY * 1.47,
            x: centerX,
            scale: 0.8,
            duration: 500,
            ease: 'Sine.easeInOut'
        })
    }
    zoomOut() {
        //Define center of X and Y
        const centerX = this.scene.scale.width / 2;
        const centerY = this.scene.scale.height / 2;

        //Zoom out the background and player
        this.scene.tweens.add({
            targets: [this.scene.background],
            scale: 1.2,
            duration: 500,
            ease: 'Sine.easeInOut'
        })

        this.scene.tweens.add({
            targets: [this.scene.body],
            y: centerY / 0.9,
            x: centerX / 1.1,
            scale: 0.6,
            duration: 500,
            ease: 'Sine.easeInOut'
        })

        this.scene.tweens.add({
            targets: [this.scene.faceContainer],
            y: centerY / 1.79,
            x: centerX / 1.13,
            scale: 0.3,
            duration: 500,
            ease: 'Sine.easeInOut'
        })

        this.scene.tweens.add({
            targets: [this.scene.hair],
            y: centerY / 1.31,
            x: centerX / 1.1,
            scale: 0.25,
            duration: 500,
            ease: 'Sine.easeInOut'
        })
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

        // Tween the player and related elements
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
            targets: [this.scene.hair],
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

        // Tween all selected outfits to follow the player
        console.log(`displayCategoryButtons: player.y = ${this.scene.body.y}`); // Debug log
        Object.values(this.scene.outfitButtons).flat().forEach(outfitButton => {
            outfitButton.tweenOutfit(newPlayerX, this.scene.body.y, 500, 'Sine.easeInOut');
        });
    }

    hideSideButtons() {
        return new Promise((resolve) => {

            //this.scene.openButton.disableInteractive();

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
                            targets: [this.scene.hair],
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
                    })
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

    //Back Button Tweening
    displayBackButton() {
        this.scene.tweens.add({
            targets: this.scene.backButton,
            y: 500,
            duration: 500,
            ease: 'Sine.easeInOut'
        });
    }

    hideBackButton() {
        this.scene.backButton.disableInteractive();
        this.scene.tweens.add({
            targets: this.scene.backButton,
            y: 0,
            duration: 500,
            ease: 'Sine.easeInOut'
        });
    }

    //Display Panel Tweening
    displayStatusPanel(isComplete) {
        const scene = this.scene;

        // Get correct objects
        const statusMark = isComplete ? scene.checkMark : scene.xMark;
        const statusText = isComplete ? scene.successStatusText : scene.failStatusText;

        // Make visible
        statusMark.setVisible(true);
        statusText.setVisible(true);

        // Set dynamic target Y values
        const panelTargetY = 73;
        const markTargetY = isComplete ? 60 : 73;
        const textTargetY = 60;

        // Slide down the panel with dynamic positioning
        scene.tweens.add({
            targets: scene.statusPanel,
            y: panelTargetY,
            duration: 500,
            ease: 'Sine.easeInOut'
        });

        scene.tweens.add({
            targets: statusMark,
            y: markTargetY,
            duration: 500,
            ease: 'Sine.easeInOut'
        });

        scene.tweens.add({
            targets: statusText,
            y: textTargetY,
            duration: 500,
            ease: 'Sine.easeInOut',
            onComplete: () => {
                scene.time.delayedCall(1500, () => {
                    if (!isComplete) {
                        // Slide everything up again
                        scene.tweens.add({
                            targets: [scene.statusPanel, statusMark, statusText],
                            y: -100,
                            duration: 500,
                            ease: 'Sine.easeInOut'
                        });
                    } else {
                        // Transition to next cutscene
                        scene.SceneManager.TransitionCutscene2(scene, () => {
                            scene.UIManager.clearMinigameScene(scene);
                            const statPoints = scene.statTracker.getStatPoints();
                            scene.CutsceneSystem.initiateCutscene2(statPoints);
                        });
                    }
                });
            }
        });
    }

}