
 
 export default class TweenUtils{
      constructor(scene){
        this.scene = scene;
      }
  
  displayCategoryButtons() {
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
            targets: [this.scene.player],
            x: newPlayerX,
            duration: 500,
            repeat: 0,
            ease: 'Sine.easeInOut'
        });

        this.scene.tweens.add({
            targets: [this.scene.expression],
            x: this.scene.scale.width / 4.35,
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
        console.log(`displayCategoryButtons: player.y = ${this.scene.player.y}`); // Debug log
        Object.values(this.scene.outfitButtons).flat().forEach(outfitButton => {
            outfitButton.tweenOutfit(newPlayerX, this.scene.player.y, 500, 'Sine.easeInOut');
        });
    }

    hideCategoryButtons() {
        return new Promise((resolve) => {

            this.scene.openButton.disableInteractive();

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
                        const newPlayerX = this.scene.scale.width / 2;
                        this.scene.tweens.add({
                            targets: [this.scene.player],
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
                            targets: [this.scene.expression],
                            x: this.scene.scale.width / 2.03,
                            duration: 500,
                            repeat: 0,
                            ease: 'Sine.easeInOut',
                            onComplete: playerResolve
                        });
                        // Tween all selected outfits to follow the player
                        Object.values(this.scene.outfitButtons).flat().forEach(outfitButton => {
                            outfitButton.tweenOutfit(newPlayerX, this.scene.player.y, 500, 'Sine.easeInOut');
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

    async displayButtons(outfitType) {
        const isDressSelected = !!this.scene.OutfitButton.selectedOutfits["Dress"];
    
        this.scene.activePanel = "outfit";
        this.scene.UIManager.setCostumeButtons(outfitType, this);
        this.scene.outfitButtonsTypePanel.setVisible(true);
        this.scene.currentType = outfitType;
    
        // Disable the ContinueButton
        if (this.scene.continueButton) {
            this.scene.continueButton.getAt(0).disableInteractive();
        }
    
        const typesToHide = outfitType === "DressShirt" 
            ? Object.keys(this.scene.outfitButtons).filter(type => type !== "Dress" && type !== "Shirt")
            : Object.keys(this.scene.outfitButtons).filter(type => type !== outfitType);
    
        typesToHide.forEach(type => {
            this.scene.outfitButtons[type].forEach(button => button.container.setVisible(false));
        });
    
        await this.hideCategoryButtons();
    
        let buttonsToShow = [];
        if (outfitType === "DressShirt") {
            buttonsToShow = [...(this.scene.outfitButtons["Dress"] || []), ...(this.scene.outfitButtons["Shirt"] || [])];
        } else {
            buttonsToShow = this.scene.outfitButtons[outfitType] || [];
        }
    
        buttonsToShow.forEach(button => {
            button.container.setVisible(true);
            button.button.setAlpha(0);
            button.icon.setAlpha(0);
        });
    
        this.scene.tweens.add({
            targets: this.scene.background,
            y: this.scene.scale.height / 2.06,
            duration: 500,
            ease: 'Sine.easeInOut'
        });
    
        const newPlayerY = this.scene.scale.height - 800;
        this.scene.tweens.add({
            targets: this.scene.player,
            y: newPlayerY,
            duration: 500,
            ease: 'Sine.easeInOut'
        });
    
        this.scene.tweens.add({
            targets: this.scene.hair,
            y: this.scene.scale.height - 1020,
            duration: 500,
            ease: 'Sine.easeInOut'
        });
    
        this.scene.tweens.add({
            targets: this.scene.expression,
            y: this.scene.scale.height - 1063,
            duration: 500,
            ease: 'Sine.easeInOut'
        });
    
        const outfitContainers = buttonsToShow.map(button => button.container);
        this.scene.tweens.add({
            targets: outfitContainers,
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
    
        Object.values(this.scene.outfitButtons).flat().forEach(outfitButton => {
            outfitButton.tweenOutfit(this.scene.player.x, newPlayerY, 500, 'Sine.easeInOut');
        });
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
                        targets: this.scene.player,
                        y: newPlayerY,
                        duration: 500,
                        ease: 'Sine.easeInOut',
                        onComplete: playerResolve
                    });
    
                    Object.values(this.scene.outfitButtons).flat().forEach(outfitButton => {
                        outfitButton.tweenOutfit(this.scene.player.x, newPlayerY, 500, 'Sine.easeInOut');
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
                        targets: this.scene.expression,
                        y: this.scene.scale.height - 863,
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
                    console.log(`hideButtons completed: player.y = ${this.scene.player.y}`);
                    resolve();
                });
            }, 300);
        });
    }

    //Back Button Tweening
    displayBackButton(){
         this.scene.tweens.add({
            targets: this.scene.backButton,
            y: 230,
            duration: 500,
            ease: 'Sine.easeInOut'
        });
    }

    hideBackButton(){
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
                            scene.UIManager.clearDressupScene(scene);
                            const statPoints = scene.statTracker.getStatPoints();
                            scene.CutsceneSystem.initiateCutscene2(statPoints);
                        });
                    }
                });
            }
        });
    }

}