
import { BaseButton } from "./BaseButton.js";
import { MakeUpPositions, defaultMakeUpSkins, makeUpData } from "../Makeup Data/MakeUpData.js";
import { layout } from '../ScreenOrientationUtils.js';
import { GameState } from '../Main.js';
import { SaveData, unlockDress } from '../Save System/SaveData.js'

export default class UIButton extends BaseButton {
    constructor(scene, AudioManager, { x, y, textureButton, buttonWidth = 75, buttonHeight = 75, textureIcon = null, textureYPosition = 0, iconScale = 0.5, iconOffset = 0, callback = () => { }, buttonText = '', textSize = '16px', textColor = '#FFFFFF', textYPosition = 0, textOffset = 0, buttonScale = 0.7, font = 'pixelFont', useNineSlice = false }) {

        let button = null;
        let icon = null;
        if (useNineSlice) {
            button = scene.add.nineslice(0, 0, textureButton, null, buttonWidth, buttonHeight, 50, 50, 40, 44)
                .setInteractive()
                .setScale(buttonScale);
        } else {
            button = scene.add.image(0, 0, textureButton)
                .setInteractive()
                .setScale(buttonScale);
        }

        if (textureIcon) {
            icon = textureIcon !== null
                ? scene.add.image(iconOffset, textureYPosition, textureIcon).setScale(iconScale)
                : null;
        }

        const text = scene.add.text(textOffset, textYPosition, buttonText, {
            fontSize: textSize,
            fontFamily: font,
            color: textColor
        }).setOrigin(0.5);

        const elements = [button];
        if (textureIcon) elements.push(icon);
        if (buttonText !== '') elements.push(text);

        super(scene, x, y, elements);

        this.icon = icon;
        this.text = text;
        this.button = button;

        this.addHoverEffect(button, AudioManager);
        this.addClickEffect(button, AudioManager);

        button.on("pointerdown", () => {
            const pressedTextureKey = textureButton + 'Pressed';
            if (button.scene.textures.exists(pressedTextureKey)) button.setTexture(pressedTextureKey);
            if (icon) icon.y += 5;
            if (callback) callback();
        });

        button.on("pointerup", () => {
            button.setTexture(textureButton);
            if (icon) icon.y -= 5;

        });
    }

    setIconTexture(newTextureKey) {
        console.log('Before:', this.icon.texture.key);
        this.icon.setTexture(newTextureKey);
        console.log('After:', this.icon.texture.key);
    }

    setText(newText) {
        this.text.setText(newText);
    }

    disableInteractive() {
        this.button.disableInteractive();
    }

    setInteractive() {
        this.button.setInteractive();
    }
}

export class ItemPanelButton extends BaseButton {
    constructor(scene, AudioManager, x, y, backgroundTextureKey, iconTextureKey, iconYOffset,
        labelText, labelSize, callback) {

        const buttonBg = scene.add.image(0, 0, backgroundTextureKey)
            .setInteractive()
            .setScale(layout.itemPanelButton.buttonScale);

        const iconImg = scene.add.image(0, iconYOffset, iconTextureKey).setScale(layout.itemPanelButton.iconScale);

        const textLbl = scene.add.text(0, layout.itemPanelButton.textYPosition, labelText, {
            fontSize: labelSize,
            fontFamily: 'pixelFont',
            color: '#000000'
        }).setOrigin(0.5, 0.5);


        super(scene, x, y, [buttonBg, iconImg, textLbl]);


        this.button = buttonBg;
        this.icon = iconImg;
        this.text = textLbl;
        this.onClickCallback = callback;
        this.AudioManager = AudioManager;


        this.pointerDownPos = { x: 0, y: 0 };
        this.isDragging = false;
        const tapThreshold = 10;

        this.addHoverEffect(buttonBg, AudioManager);


        buttonBg.on("pointerdown", (pointer) => {
            buttonBg.setAlpha(0.5);
            this.pointerDownPos.x = pointer.x;
            this.pointerDownPos.y = pointer.y;
            this.isDragging = false;
        });

        buttonBg.on("pointerup", (pointer) => {
            buttonBg.setAlpha(1);
            if (!buttonBg.input || !buttonBg.active) {
                this.isDragging = false;
                return;
            }
            const dx = Math.abs(pointer.x - this.pointerDownPos.x);
            const dy = Math.abs(pointer.y - this.pointerDownPos.y);
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance <= tapThreshold && !this.isDragging) {
                if (this.onClickCallback) {
                    this.onClickCallback();
                }
                this.AudioManager?.playSFX?.("buttonClick");
            }
            this.isDragging = false;
        });

        buttonBg.on("pointerout", () => {
            if (buttonBg.input && buttonBg.input.isDown) {
                buttonBg.setAlpha(1);
            }
            this.isDragging = false;
        });

        buttonBg.on("pointermove", (pointer) => {
            if (buttonBg.input && buttonBg.input.isDown) {
                const dx = Math.abs(pointer.x - this.pointerDownPos.x);
                const dy = Math.abs(pointer.y - this.pointerDownPos.y);
                if (Math.sqrt(dx * dx + dy * dy) > tapThreshold) {
                    this.isDragging = true;
                }
            }
        });
    }


    showHighlight() {
        if (this.highlightImage) this.highlightImage.setVisible(true);
    }

    hideHighlight() {
        if (this.highlightImage) this.highlightImage.setVisible(false);
    }

    disableInteractive() {
        if (this.button) this.button.disableInteractive();
    }

    setInteractive() {
        if (this.button) this.button.setInteractive();
    }
}

export class GeneralButton extends BaseButton {
    constructor(scene, x, y, textureKey, textureKeyOutline = null, label, onClick, AudioManager) {

        const buttonText = scene.add.text(0, 10, label, {
            fontSize: '35px',
            fontFamily: 'regularFont',
            color: '#d6525f'
        }).setOrigin(0.5);

        const buttonWidth = buttonText.width;
        const buttonHeight = 37;

        const buttonImage = scene.add.nineslice(
            0, 10,
            textureKey,
            null,
            600, 200,
            50, 50,
            40, 44
        ).setInteractive().setDepth(10).setScale(0.3);

        const buttonOutlineImage = scene.add.nineslice(
            0, 0,
            textureKeyOutline,
            null,
            buttonWidth, buttonHeight,
            16, 16,
            16, 16
        ).setDepth(10).setScale(1.1).setVisible(false);

        super(scene, x, y, [buttonImage, buttonOutlineImage, buttonText]);

        this.button = buttonImage;
        this.addHoverEffect(buttonImage, AudioManager);
        this.addClickEffect(buttonImage, AudioManager);

        buttonImage.on('pointerdown', onClick);
    }

    disableInteractive() {
        this.button.disableInteractive();
    }

    setInteractive() {
        this.button.setInteractive();
    }
}

export class CategoryButton extends BaseButton {
    constructor(scene, AudioManager, x, y, name, categoryType = null, textureButton, textureButtonHighlighted, textureIcon, onClick) {
        const button = scene.add.image(0, 0, textureButton)
            .setInteractive()
            .setScale(scene.state === GameState.DRESSUP ? layout.categoryButton.buttonScale : 0.8);
        const buttonHighlighted = scene.add.image(0, 0, textureButtonHighlighted).setVisible(false);
        const icon = scene.add.image(0, 0, textureIcon)
            .setScale(scene.state === GameState.DRESSUP ? layout.categoryButton.iconScale : 0.6);

        super(scene, x, y, [button, buttonHighlighted, icon]);


        this.onClickCallback = onClick;
        this.AudioManager = AudioManager;
        this.button = button;

        this.pointerDownPos = { x: 0, y: 0 };
        this.isDragging = false;
        const tapThreshold = 10;


        this.addHoverEffect(button, AudioManager);


        button.on("pointerdown", (pointer) => {
            button.setAlpha(0.5);
            this.pointerDownPos.x = pointer.x;
            this.pointerDownPos.y = pointer.y;
            this.isDragging = false;

        });

        button.on("pointerup", (pointer) => {
            button.setAlpha(1);


            if (!button.input || !button.active) {
                this.isDragging = false;
                return;
            }

            const dx = Math.abs(pointer.x - this.pointerDownPos.x);
            const dy = Math.abs(pointer.y - this.pointerDownPos.y);
            const distance = Math.sqrt(dx * dx + dy * dy);


            if (distance <= tapThreshold && !this.isDragging && !scene.isCategoryLocked) {


                scene.isCategoryLocked = true;
                console.log("Category buttons LOCKED.");


                if (this.onClickCallback) {
                    this.onClickCallback();
                    this.AudioManager?.playSFX?.("buttonClick");
                }


                scene.time.delayedCall(300, () => {
                    scene.isCategoryLocked = false;
                    console.log("Category buttons UNLOCKED.");
                });
            }
            this.isDragging = false;
        });


        button.on("pointerout", () => {
            if (button.input && button.input.isDown) {
                button.setAlpha(1);
            }
            this.isDragging = false;
        });


        button.on("pointermove", (pointer) => {
            if (button.input && button.input.isDown) {
                const dx = Math.abs(pointer.x - this.pointerDownPos.x);
                const dy = Math.abs(pointer.y - this.pointerDownPos.y);
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance > tapThreshold) {
                    this.isDragging = true;

                }
            }
        });

    }

    disableInteractive() {
        this.button.disableInteractive();
    }

    setInteractive() {
        this.button.setInteractive();
    }
}

export class LepasButton extends BaseButton {
    constructor(scene, AudioManager,
        panelContext,
        activeType,
        itemButtonsForType
    ) {


        const textureBgKey = 'button1';
        const displayWidth = 150;
        const displayHeight = 200;

        const iconTextureKey = 'xMark';
        const iconYOffset = -15;
        const iconScale = 0.85;

        const labelText = 'Remove';
        const labelFontSize = '22px';
        const labelYOffset = 70;

        const bgImage = scene.add.image(0, 0, textureBgKey)
            .setDisplaySize(displayWidth, displayHeight)
            .setInteractive();
        const iconImg = scene.add.image(0, iconYOffset, iconTextureKey).setScale(iconScale);
        const textLbl = scene.add.text(0, labelYOffset, labelText, {
            fontSize: labelFontSize,
            fontFamily: 'pixelFont',
            color: '#000000'
        }).setOrigin(0.5);

        super(scene, 0, 0, [bgImage, iconImg, textLbl]);

        this.buttonElement = bgImage;
        this.AudioManager = AudioManager;


        let pointerDownPos = { x: 0, y: 0 };
        let isDragging = false;
        const tapThreshold = 10;

        this.addHoverEffect(bgImage, AudioManager);

        bgImage.on("pointerdown", (pointer) => {
            bgImage.setAlpha(0.5);
            pointerDownPos.x = pointer.x;
            pointerDownPos.y = pointer.y;
            isDragging = false;
        });

        bgImage.on("pointerup", (pointer) => {
            bgImage.setAlpha(1);
            if (!bgImage.input || !bgImage.active) { isDragging = false; return; }
            const dx = Math.abs(pointer.x - pointerDownPos.x);
            const dy = Math.abs(pointer.y - pointerDownPos.y);
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance <= tapThreshold && !isDragging) {

                console.log(`[LepasButton] Clicked for Panel: ${panelContext}, Type: ${activeType}`);
                this.AudioManager?.playSFX?.("buttonClick");

                if (panelContext === 'Makeup') {
                    if (scene.interactiveMakeupSystem?.isActive && scene.interactiveMakeupSystem.activeMakeupType === activeType) {
                        scene.interactiveMakeupSystem.stopColoringSession(activeType, true);
                    }

                    const currentEntry = MakeUpButton.selectedMakeUp[activeType];
                    const currentEquipped = currentEntry?.current;
                    let helperButton = itemButtonsForType?.[0];

                    if (!helperButton && scene.makeUpButtons) { // Fallback
                        const flatButtons = Object.values(scene.makeUpButtons).flat();
                        if (flatButtons.length > 0) helperButton = flatButtons[0];
                    }

                    if (helperButton && helperButton instanceof MakeUpButton) {
                        if (currentEquipped && currentEquipped.displayedMakeUp) {
                            if (currentEquipped instanceof MakeUpButton) {
                                if (!['Lips', 'Eyebrows', 'Eyelashes', 'Pupil', 'Hair'].includes(currentEquipped.makeupType) && currentEquipped.displayedMakeUp.destroy) {
                                    currentEquipped.displayedMakeUp.destroy();
                                }
                                currentEquipped.displayedMakeUp = null;
                            } else if (currentEquipped.isDefault) {
                                if (!['Lips', 'Eyebrows', 'Eyelashes', 'Pupil', 'Hair'].includes(currentEquipped.makeupType) && currentEquipped.displayedMakeUp.destroy) {
                                    currentEquipped.displayedMakeUp.destroy();
                                }
                            }
                        }
                        helperButton._equipDefaultMakeUp(activeType, currentEquipped || null);
                    } else {
                        console.error(`[LepasButton] Could not find MakeUpButton instance for ${activeType}`);
                    }
                    MakeUpButton.clearMakeupHighlightsForType(scene, activeType);

                } else if (panelContext === 'Outfit') {
                    const currentEntry = OutfitButton.selectedOutfits[activeType];
                    const equippedButtonInstance = currentEntry?.current;

                    if (equippedButtonInstance && equippedButtonInstance instanceof OutfitButton) {
                        if (equippedButtonInstance.displayedOutfit) {
                            equippedButtonInstance.displayedOutfit.destroy();
                            equippedButtonInstance.displayedOutfit = null;
                        }
                        OutfitButton.selectedOutfits[activeType] = { current: null, previous: equippedButtonInstance };
                        if (equippedButtonInstance.highlightImage) {
                            equippedButtonInstance.highlightImage.setVisible(false);
                        }

                        if (activeType === "Dress") {
                            OutfitButton.clearHighlightsForType(scene, "Shirt");
                            OutfitButton.clearHighlightsForType(scene, "Lower");
                        }
                    } else {
                        console.log(`[LepasButton] No ${activeType} item currently equipped to remove.`);
                    }
                }

            }
            isDragging = false;
        });

        bgImage.on("pointerout", () => {
            if (bgImage.input && bgImage.input.isDown) { bgImage.setAlpha(1); }
            isDragging = false;
        });

        bgImage.on("pointermove", (pointer) => {
            if (bgImage.input && bgImage.input.isDown) {
                const dx = Math.abs(pointer.x - pointerDownPos.x);
                const dy = Math.abs(pointer.y - pointerDownPos.y);
                if (Math.sqrt(dx * dx + dy * dy) > tapThreshold) isDragging = true;
            }
        });
    }


}

export class OutfitButton extends BaseButton {
    static selectedOutfits = {};

    constructor(scene, name, outfitType, x, y, outfitX, outfitY, textureAnime, textureButton, textureIcon, AudioManager, isLocked = false) {

        // --- Elements for the button UI itself ---
        const buttonBg = scene.add.image(0, 0, textureButton).setInteractive().setScale(layout.outfitButton.buttonScale);
        const highlightImg = scene.add.image(0, 0, 'buttonIcon2Highlighted')
            .setVisible(false).setScale(layout.outfitButton.highlightImg);
        const iconImg = scene.add.image(0, 0, textureIcon.atlas, textureIcon.frame).setScale(layout.outfitButton.iconScale);
        if (isLocked) iconImg.setAlpha(0.5);

        super(scene, x, y, [buttonBg, highlightImg, iconImg]);

        this.setDepth(12);
        this.button = buttonBg;
        this.icon = iconImg;
        this.AudioManager = AudioManager;
        this.name = name;
        this.outfitType = outfitType;
        this.outfitX = outfitX;
        this.outfitY = outfitY;
        this.textureAnime = textureAnime;
        this.displayedOutfit = null;
        this.offsetX = 0;
        this.offsetY = 0;
        this.highlightImage = highlightImg;
        this.isLocked = isLocked;

        const outfitCustomSizes = layout.outfit.customSizes;
        const outfitManualOffsets = layout.outfit.manualOffsets;

        const baseManualOffset = outfitManualOffsets[this.name] || { x: 0, y: 0 };
        this.baseWorldOutfitX = outfitX + baseManualOffset.x;
        this.baseWorldOutfitY = outfitY + baseManualOffset.y;
        this.usesCustomSize = !!outfitCustomSizes[this.name];
        if (this.usesCustomSize) {
            const custom = outfitCustomSizes[this.name];
            this.dressUpViewDisplayWidth = custom.width;
            this.dressUpViewDisplayHeight = custom.height;
            this.baseScaleXAfterCustomSize = 1;
            this.baseScaleYAfterCustomSize = 1;
        } else if (outfitType === 'Dress' || outfitType === 'Outer' || outfitType === 'Shirt') {
            this.dressUpViewScale = 0.6;
        } else {
            this.dressUpViewScale = 1.2;
        }
        this.offsetXInDressUpView = 0;
        this.offsetYInDressUpView = 0;

        // --- Tap vs. Drag listeners (from your "before changes" version) ---
        this.pointerDownPos = { x: 0, y: 0 };
        this.isDragging = false;
        const tapThreshold = 10;

        buttonBg.on("pointerout", () => {
            buttonBg.setAlpha(1); // Target buttonBg
            this.isDragging = false;
        });
        buttonBg.on("pointerdown", (pointer) => {
            buttonBg.setAlpha(0.5); // Target buttonBg
            this.pointerDownPos.x = pointer.x;
            this.pointerDownPos.y = pointer.y;
            this.isDragging = false;
        });
        buttonBg.on("pointerup", (pointer) => {
            buttonBg.setAlpha(1); // Target buttonBg
            if (!buttonBg.input || !buttonBg.active) { this.isDragging = false; return; }
            const dx = Math.abs(pointer.x - this.pointerDownPos.x);
            const dy = Math.abs(pointer.y - this.pointerDownPos.y);
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance <= tapThreshold && !this.isDragging) {
                // Pass the original outfitX, outfitY from constructor to toggleOutfit
                if (!this.isLocked) { this.toggleOutfit(this.outfitX, this.outfitY, this.outfitType); }
                else { this.playRewardedAd(scene); }
            }
            this.isDragging = false;
        });
        buttonBg.on("pointermove", (pointer) => {
            if (buttonBg.input && buttonBg.input.isDown) {
                const dx = Math.abs(pointer.x - this.pointerDownPos.x);
                const dy = Math.abs(pointer.y - this.pointerDownPos.y);
                if (Math.sqrt(dx * dx + dy * dy) > tapThreshold) {
                    this.isDragging = true;
                }
            }
        });
    }

    disableInteractive() {
        this.button.disableInteractive();
    }

    setInteractive() {
        this.button.setInteractive();
    }

    playRewardedAd(scene) {
        const poki = scene.plugins.get('poki');

        poki.gameplayStop();
        poki.rewardedBreak().then(() => {
            poki.gameplayStart();
            this.toggleOutfit(this.outfitX, this.outfitY, this.outfitType);
            this.icon.setAlpha(1);
            unlockDress(this.name);
            scene.SaveManager.saveGame(scene);
        });
    }
    static clearHighlightsForType(scene, outfitType) {
        if (scene.outfitButtons && scene.outfitButtons[outfitType]) {
            scene.outfitButtons[outfitType].forEach(btn => {
                if (btn.highlightImage) btn.highlightImage.setVisible(false);
            });
        }
    }
    static clearAllOutfitHighlights(scene) {
        if (scene.outfitButtons) {
            Object.values(scene.outfitButtons).flat().forEach(btn => {
                if (btn.highlightImage) btn.highlightImage.setVisible(false);
            });
        }
    }

    static createStatContainer(scene, statValue, columns = 3, spacing = 20) {

        const heartContainer = scene.add.container(0, 35);
        const numHeartsAbs = Math.abs(statValue);
        const rows = Math.ceil(numHeartsAbs / columns);
        const statColor = statValue >= 0 ? 0xffd700 : 0x808080;
        const numHeartsToShow = Math.min(numHeartsAbs, 9);
        const itemsInLastRow = numHeartsToShow % columns;
        const columnsInLastRow = (itemsInLastRow === 0 && numHeartsToShow > 0) ? columns : itemsInLastRow;

        for (let i = 0; i < numHeartsToShow; i++) {
            const currentRow = Math.floor(i / columns);
            const currentCol = i % columns;
            let columnsInThisRow = columns;
            if (currentRow === rows - 1 && rows > 1) { columnsInThisRow = columnsInLastRow > 0 ? columnsInLastRow : columns; }
            else if (rows === 1) { columnsInThisRow = numHeartsToShow; }
            const totalWidthThisRow = (columnsInThisRow - 1) * spacing;
            const x = currentCol * spacing - totalWidthThisRow / 2;
            const y = currentRow * spacing;
            const heart = scene.add.image(x, y, 'heartIcon').setScale(0.3).setOrigin(0.5);
            heart.setTint(statColor);
            heartContainer.add(heart);
        }
        if (rows > 1) { const totalHeight = (rows - 1) * spacing; heartContainer.y -= totalHeight / 2; }
        return heartContainer;
    }


    toggleOutfit() {
        const { scene, textureAnime, stat, outfitType, name } = this;
        const depthValues = { "Socks": 1, "Shoes": 2, "Lower": 3, "Shirt": 4, "Outer": 6, "Dress": 5 };
        const currentEntry = OutfitButton.selectedOutfits[outfitType];


        const unequip = (type) => {
            const equippedImage = OutfitButton.selectedOutfits[type];
            const entry = OutfitButton.selectedOutfits[type];

            const equippedButton = entry?.current;
            if (equippedButton && equippedButton.displayedOutfit) {
                equippedButton.displayedOutfit.destroy();
                equippedButton.displayedOutfit = null;
            }
            OutfitButton.selectedOutfits[type] = { current: null, previous: equippedButton || entry?.previous || null };

        };


        OutfitButton.clearAllOutfitHighlights(scene);


        if (outfitType === "Dress") {
            unequip("Shirt");
            unequip("Lower");
        }
        if (outfitType === "Shirt" || outfitType === "Lower") {
            unequip("Dress");
        }


        if (currentEntry && currentEntry.current === this) {
            unequip(outfitType);
            return;
        }


        unequip(outfitType);


        const outfitManualOffsets = layout.outfit.manualOffsets;
        const manualOffset = outfitManualOffsets[name] || { x: 0, y: 0 };
        const finalX = this.outfitX + manualOffset.x;
        const finalY = this.outfitY + manualOffset.y;
        let newOutfitImage;
        if (textureAnime.atlas && textureAnime.frame) newOutfitImage = scene.add.image(finalX, finalY, textureAnime.atlas, textureAnime.frame);
        else newOutfitImage = scene.add.image(finalX, finalY, textureAnime);

        newOutfitImage.setDepth(depthValues[outfitType] || 1);
        this.displayedOutfit = newOutfitImage;

        // metadata 
        newOutfitImage.setData('buttonName', name);
        newOutfitImage.setData('stat', stat);
        newOutfitImage.setData('baseWorldOutfitX', this.baseWorldOutfitX);
        newOutfitImage.setData('baseWorldOutfitY', this.baseWorldOutfitY);
        newOutfitImage.setData('usesCustomSize', this.usesCustomSize);

        if (this.usesCustomSize) {
            newOutfitImage.setDisplaySize(this.dressUpViewDisplayWidth, this.dressUpViewDisplayHeight);
            newOutfitImage.setData('baseScaleX', newOutfitImage.scaleX);
            newOutfitImage.setData('baseScaleY', newOutfitImage.scaleY);
        } else {
            newOutfitImage.setScale(this.dressUpViewScale);
            newOutfitImage.setData('baseScaleX', this.dressUpViewScale);
            newOutfitImage.setData('baseScaleY', this.dressUpViewScale);
        }


        OutfitButton.selectedOutfits[outfitType] = {
            current: this,
            previous: currentEntry?.current || currentEntry?.previous || null
        };

        this.highlightImage.setVisible(true);

        if (scene.SaveManager) {
            scene.SaveManager.saveGame(scene);
        }
    }

}

export class MakeUpButton extends BaseButton {
    static selectedMakeUp = {};
    static DEPTH_VALUES = {
        "Pupil": 2, "Eyeshadow": 1.9, "Eyeliner": 2.2, "Blush": 1.9,
        "Eyebrows": 2.4, "Eyelashes": 2.5, "Lips": 2.6, "Sticker": 2.7
    };

    constructor(scene, name, makeupType, x, y, textureAnime, textureButton, textureIcon, AudioManager, isLocked = false) {

        const buttonBg = scene.add.image(0, 0, textureButton).setInteractive().setScale(layout.makeUpButton.buttonScale);
        const highlightImg = scene.add.image(0, 0, 'buttonIcon2Highlighted')
            .setVisible(false)
            .setDepth(-1)
            .setScale(layout.makeUpButton.highlightImg);
        const iconImg = scene.add.image(0, 0, textureIcon.atlas, textureIcon.frame).setScale(makeupType === "Hair" ? 1.2 : layout.makeUpButton.iconScale);
        if (isLocked) iconImg.setAlpha(0.5);


        super(scene, x, y, [buttonBg, highlightImg, iconImg]);

        this.setDepth(12);

        this.button = buttonBg;
        this.highlightImage = highlightImg;
        this.icon = iconImg;
        this.name = name;
        this.makeupType = makeupType;
        this.textureAnime = textureAnime;
        this.AudioManager = AudioManager;
        this.displayedMakeUp = null;
        this.isLocked = isLocked;

        this.pointerDownPos = { x: 0, y: 0 };
        this.isDragging = false;
        const tapThreshold = 10;


        buttonBg.on("pointerdown", (pointer) => {
            buttonBg.setAlpha(0.5);
            this.pointerDownPos.x = pointer.x;
            this.pointerDownPos.y = pointer.y;
            this.isDragging = false;

        });

        buttonBg.on("pointerup", (pointer) => {
            buttonBg.setAlpha(1);
            if (!buttonBg.input || !buttonBg.active) {
                this.isDragging = false;
                return;
            }
            const dx = Math.abs(pointer.x - this.pointerDownPos.x);
            const dy = Math.abs(pointer.y - this.pointerDownPos.y);
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance <= tapThreshold && !this.isDragging) {
                if (!this.isLocked) { this.toggleMakeUp(); }
                else { this.playRewardedAd(scene); }
                this.AudioManager?.playSFX?.("buttonClick");
            }
            this.isDragging = false;
        });

        buttonBg.on("pointerout", () => {
            if (buttonBg.input && buttonBg.input.isDown) {
                buttonBg.setAlpha(1);
            }
            this.isDragging = false;
        });

        buttonBg.on("pointermove", (pointer) => {
            if (buttonBg.input && buttonBg.input.isDown) {
                const dx = Math.abs(pointer.x - this.pointerDownPos.x);
                const dy = Math.abs(pointer.y - this.pointerDownPos.y);
                if (Math.sqrt(dx * dx + dy * dy) > tapThreshold) {
                    this.isDragging = true;
                }
            }
        });
    }

    disableInteractive() {
        if (this.button) this.button.disableInteractive();
    }

    setInteractive() {
        if (this.button) this.button.setInteractive();
    }

    playRewardedAd(scene) {
        const poki = scene.plugins.get('poki');

        poki.gameplayStop();
        poki.rewardedBreak().then(() => {
            poki.gameplayStart();
            this.toggleMakeUp();
            this.icon.setAlpha(1);
            this.isLocked = false;
        });
    }

    static clearMakeupHighlightsForType(scene, makeupType) {
        if (scene.makeUpButtons && scene.makeUpButtons[makeupType]) {
            scene.makeUpButtons[makeupType].forEach(btn => {
                if (btn.highlightImage) btn.highlightImage.setVisible(false);
            });
        }
    }
    static clearAllMakeUpHighlights(scene) {
        if (scene.makeUpButtons) {
            Object.values(scene.makeUpButtons).flat().forEach(btn => {
                if (btn.highlightImage) btn.highlightImage.setVisible(false);
            });
        }
    }

    _equipDefaultMakeUp(makeupTypeToRevert, previousEquippedItemInfo) {
        MakeUpButton.clearMakeupHighlightsForType(this.scene, makeupTypeToRevert);
        const scene = this.scene;
        const defaultTextureKey = defaultMakeUpSkins[makeupTypeToRevert];

        if (defaultTextureKey) {

            if (makeupTypeToRevert === 'Hair') {
                const defaultHairTextures = defaultMakeUpSkins['Hair'];
                scene.hairBack.setTexture(defaultHairTextures.back).setVisible(true);
                scene.hairFront.setTexture(defaultHairTextures.front).setVisible(true);



                const hairLayout = layout.Hair;
                if (scene.state === GameState.MAKEUP) {

                    scene.hairBack.setPosition(hairLayout.zoomInHairX, hairLayout.zoomInHairY);
                    scene.hairFront.setPosition(hairLayout.zoomInHairX, hairLayout.zoomInHairY);
                    scene.hairBack.setScale(hairLayout.zoomInTargetHairScale);
                    scene.hairFront.setScale(hairLayout.zoomInTargetHairScale);
                } else {

                    scene.hairBack.setPosition(hairLayout.zoomOutHairX, hairLayout.zoomOutHairY);
                    scene.hairFront.setPosition(hairLayout.zoomOutHairX, hairLayout.zoomOutHairY);
                    scene.hairBack.setScale(hairLayout.zoomOutHairScale);
                    scene.hairFront.setScale(hairLayout.zoomOutHairScale);
                }



                MakeUpButton.selectedMakeUp[makeupTypeToRevert] = {
                    current: {
                        name: 'Default Hair',
                        makeupType: makeupTypeToRevert,
                        textureAnime: defaultHairTextures,
                        displayedMakeUp: [scene.hairBack, scene.hairFront],
                        isDefault: true
                    },
                    previous: previousEquippedItemInfo
                };
                return;
            }



            const defaultMakeUpItemData = makeUpData.find(item => item.makeUpType === makeupTypeToRevert && item.textureAnime === defaultTextureKey);
            if (!defaultMakeUpItemData && !['Sticker'].includes(makeupTypeToRevert)) {
                if (!['Lips', 'Eyebrows', 'Eyelashes', 'Pupil'].includes(makeupTypeToRevert)) {
                    MakeUpButton.selectedMakeUp[makeupTypeToRevert] = { current: null, previous: previousEquippedItemInfo };
                    return;
                }
            }

            const position = MakeUpPositions[makeupTypeToRevert] || { x: 0, y: 0 };
            let imageToUpdate;

            switch (makeupTypeToRevert) {
                case 'Lips': imageToUpdate = scene.lips; break;
                case 'Eyebrows': imageToUpdate = scene.eyebrows; break;
                case 'Eyelashes': imageToUpdate = scene.eyelashes; break;
                case 'Pupil': imageToUpdate = scene.pupils; break;
                default:
                    imageToUpdate = scene.add.image(position.x, position.y, defaultTextureKey);
                    if (scene.faceContainer && !imageToUpdate.parentContainer) {
                        scene.faceContainer.add(imageToUpdate);
                    }
                    break;
            }

            if (!imageToUpdate) {
                console.error(`Could not get/create image for default ${makeupTypeToRevert}`);
                return;
            }

            imageToUpdate.setTexture(defaultTextureKey).setVisible(true);

            if (['Pupil', 'Lips', 'Eyebrows', 'Eyelashes', 'Blush', 'Eyeliner', 'Sticker'].includes(makeupTypeToRevert)) {
                imageToUpdate.setScale(0.55 * 2);
            } else {
                imageToUpdate.setScale(0.9 * 2);
            }

            imageToUpdate.setDepth(MakeUpButton.DEPTH_VALUES[makeupTypeToRevert] || MakeUpButton.DEPTH_VALUES['Sticker'] || 2.7);

            const currentName = defaultMakeUpItemData ? defaultMakeUpItemData.name : `Default ${makeupTypeToRevert}`;
            MakeUpButton.selectedMakeUp[makeupTypeToRevert] = {
                current: {
                    name: currentName,
                    makeupType: makeupTypeToRevert,
                    textureAnime: defaultTextureKey,
                    displayedMakeUp: imageToUpdate,
                    isDefault: true
                },
                previous: previousEquippedItemInfo
            };

        } else {
            MakeUpButton.selectedMakeUp[makeupTypeToRevert] = { current: null, previous: previousEquippedItemInfo };
            MakeUpButton.clearMakeupHighlightsForType(this.scene, makeupTypeToRevert);
        }

        if (this.scene.faceContainer) {
            this.scene.faceContainer.sort('depth');
        }
    }

    toggleMakeUp() {
        const { scene, textureAnime, makeupType, name: buttonName } = this;
        const currentGlobalEquippedInfo = MakeUpButton.selectedMakeUp[makeupType]?.current;

        if (!scene.faceContainer && !['Hair'].includes(makeupType)) { console.error("Scene's faceContainer not defined."); return; }

        const colorableTypes = ['Lips', 'Blush', 'Eyeshadow', 'Eyeliner'];


        if (scene.interactiveMakeupSystem?.isActive && scene.interactiveMakeupSystem.activeMakeupType !== makeupType) {
            scene.interactiveMakeupSystem.stopColoringSession(scene.interactiveMakeupSystem.activeMakeupType, true);
        }

        else if (scene.interactiveMakeupSystem?.isActive && scene.interactiveMakeupSystem.activeMakeupType === makeupType && currentGlobalEquippedInfo !== this) {
            scene.interactiveMakeupSystem.stopColoringSession(makeupType, true);
        }

        MakeUpButton.clearMakeupHighlightsForType(scene, makeupType);

        if (colorableTypes.includes(makeupType)) {
            // --- COLORABLE TYPE ---
            if (currentGlobalEquippedInfo === this) {
                if (scene.interactiveMakeupSystem?.isActive && scene.interactiveMakeupSystem.activeMakeupType === makeupType) {

                    console.log(`[MakeUpButton] Colorable ${name} clicked while its session is active. Stopping and reverting.`);
                    scene.interactiveMakeupSystem.stopColoringSession(makeupType, true);

                    return;
                } else {

                    console.log(`[MakeUpButton] Unequipping completed colorable ${name}`);
                    if (makeupType === 'Lips') {

                    } else if (this.displayedMakeUp && typeof this.displayedMakeUp.destroy === 'function') {

                        this.displayedMakeUp.destroy();
                    }
                    this.displayedMakeUp = null;
                    this._equipDefaultMakeUp(makeupType, this);
                    return;
                }
            } else {
                if (scene.interactiveMakeupSystem?.isActive) {
                    scene.interactiveMakeupSystem.stopColoringSession(scene.interactiveMakeupSystem.activeMakeupType, true);
                }


                if (currentGlobalEquippedInfo && currentGlobalEquippedInfo.displayedMakeUp) {
                    console.log(`[MakeUpButton] Switching from '${currentGlobalEquippedInfo.name}' to '${this.name}'.`);

                    const prevType = currentGlobalEquippedInfo.makeupType || makeupType;


                    if (!['Lips', 'Eyebrows', 'Eyelashes', 'Pupil', 'Hair'].includes(prevType)) {
                        if (typeof currentGlobalEquippedInfo.displayedMakeUp.destroy === 'function') {
                            console.log(`[MakeUpButton] Destroying previous additive/colorable makeup: ${currentGlobalEquippedInfo.name}`);
                            currentGlobalEquippedInfo.displayedMakeUp.destroy();
                        }
                    }


                    if (currentGlobalEquippedInfo instanceof MakeUpButton) {
                        currentGlobalEquippedInfo.displayedMakeUp = null;
                    }
                }


                if (scene.interactiveMakeupSystem) {
                    scene.interactiveMakeupSystem.startColoringSession(makeupType, textureAnime, this);
                    if (this.highlightImage) this.highlightImage.setVisible(true);
                }
            }
        } else {
            // --- INSTANTLY APPLICABLE TYPE ---

            if (currentGlobalEquippedInfo === this) {
                if (makeupType === 'Sticker' && this.displayedMakeUp && typeof this.displayedMakeUp.destroy === 'function') {
                    this.displayedMakeUp.destroy();
                    this.displayedMakeUp = null;
                } this._equipDefaultMakeUp(makeupType, this); return;
            }
            if (currentGlobalEquippedInfo && currentGlobalEquippedInfo.displayedMakeUp) {
                const prevType = currentGlobalEquippedInfo.makeupType || makeupType;


                if (prevType === 'Sticker' || prevType === 'Blush' || prevType === 'Eyeshadow' || prevType === 'Eyeliner') {
                    if (typeof currentGlobalEquippedInfo.displayedMakeUp.destroy === 'function') {
                        console.log(`[MakeUpButton] Destroying previous ${prevType}: ${currentGlobalEquippedInfo.name}`);
                        currentGlobalEquippedInfo.displayedMakeUp.destroy();
                    }
                }

                if (currentGlobalEquippedInfo instanceof MakeUpButton) {
                    currentGlobalEquippedInfo.displayedMakeUp = null;
                }
            }

            if (colorableTypes.includes(makeupType)) {

                if (scene.interactiveMakeupSystem) {
                    scene.interactiveMakeupSystem.startColoringSession(makeupType, textureAnime, this);
                    if (this.highlightImage) this.highlightImage.setVisible(true);
                }
            }

            let newImage; const pos = MakeUpPositions[makeupType] || { x: 0, y: 0 };

            if (makeupType === 'Hair') {
                const hairTextures = this.textureAnime;
                scene.hairBack.setTexture(hairTextures.back.atlas, hairTextures.back.frame).setVisible(true);
                scene.hairFront.setTexture(hairTextures.front.atlas, hairTextures.front.frame).setVisible(true);


                this.displayedMakeUp = [scene.hairBack, scene.hairFront];
            }

            else {
                const textureData = this.textureAnime;
                switch (makeupType) {
                    case 'Eyebrows':
                        scene.eyebrows.setTexture(textureData.atlas, textureData.frame).setVisible(true);
                        newImage = scene.eyebrows;
                        break;
                    case 'Eyelashes':
                        scene.eyelashes.setTexture(textureData.atlas, textureData.frame).setVisible(true);
                        newImage = scene.eyelashes;
                        break;
                    case 'Pupil':
                        scene.pupils.setTexture(textureData.atlas, textureData.frame).setVisible(true);
                        newImage = scene.pupils;
                        break;

                    case 'Sticker':

                        if (typeof this.textureAnime === 'object' && this.textureAnime.atlas) {

                            newImage = scene.add.image(pos.x, pos.y, this.textureAnime.atlas, this.textureAnime.frame);
                        } else {

                            newImage = scene.add.image(pos.x, pos.y, this.textureAnime);
                        }
                        if (scene.faceContainer) {
                            scene.faceContainer.add(newImage);
                        }
                        break;
                    default: return;
                }
                if (!newImage) { return; }
                this.displayedMakeUp = newImage;
            }


            if (makeupType === 'Hair') {
                this.displayedMakeUp.forEach(img => img.setScale(1.6 * 256 / 225));

            } else {

                if (['Pupil', 'Lips', 'Eyebrows', 'Eyelashes', 'Blush', 'Eyeliner', 'Sticker'].includes(makeupType)) { this.displayedMakeUp.setScale(0.55 * 2); }
                else { this.displayedMakeUp.setScale(0.9 * 2); }
                this.displayedMakeUp.setDepth(MakeUpButton.DEPTH_VALUES[makeupType] || 2.7);
            }
            if (scene.faceContainer) {
                scene.faceContainer.sort('depth');
            }

            MakeUpButton.selectedMakeUp[makeupType] = { previous: currentGlobalEquippedInfo, current: this };
            if (this.highlightImage) this.highlightImage.setVisible(true);

            if (scene.SaveManager) {
                scene.SaveManager.saveGame(scene);
            }
        }
    }
}