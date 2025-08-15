
import { BaseButton } from "./BaseButton.js";
import { defaultMakeUpSkins, makeUpData } from "../Makeup Data/MakeUpData.js";
import { layout } from '../ScreenOrientationUtils.js';
import { GameState } from '../Main.js';
import { unlockManager } from '../Save System/UnlockManager.js';
import { orientation } from '../ScreenOrientationUtils.js';

import { SaveData, unlockDress } from '../Save System/SaveData.js'

export default class UIButton extends BaseButton {
    constructor(scene, AudioManager, { x, y, textureButton, buttonWidth = 75, buttonHeight = 75, textureIcon = null, iconYPosition = 0, iconScale = 0.5, iconOffset = 0, callback = () => { }, buttonText = '', textSize = '16px', textColor = '#FFFFFF', textYPosition = 0, textOffset = 0, buttonScale = 0.7, font = 'pixelFont', useNineSlice = false, nineSliceConfig = null }) {

        let button = null;
        let icon = null;
        if (useNineSlice) {

            const leftWidth = nineSliceConfig?.left ?? 20;
            const rightWidth = nineSliceConfig?.right ?? 20;
            const topHeight = nineSliceConfig?.top ?? 20;
            const bottomHeight = nineSliceConfig?.bottom ?? 20;

            button = scene.add.nineslice(0, 0, textureButton, null, buttonWidth, buttonHeight, leftWidth, rightWidth, topHeight, bottomHeight)
                .setInteractive()
                .setScale(buttonScale);
        } else {
            button = scene.add.image(0, 0, textureButton)
                .setInteractive()
                .setScale(buttonScale);
        }

        if (textureIcon) {
            icon = textureIcon && (textureIcon.atlas && textureIcon.frame
                ? scene.add.image(iconOffset, iconYPosition, textureIcon.atlas, textureIcon.frame)
                : scene.add.image(iconOffset, iconYPosition, textureIcon)).setScale(iconScale);
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
    resetVisuals() {
        this.setAlpha(1);
        if (this.button) {
            this.button.setAlpha(1);
            this.button.clearTint();
        }
        console.log("[UIButton] Visuals reset.");
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

export class MuteButton extends BaseButton {
    constructor(scene, x, y, scale = 1.0) {

        const buttonBg = scene.add.image(0, 0, 'button_kuning');
        const icon = scene.add.image(0, -5, 'iconAtlas', 'Speaker_Icon.png');


        super(scene, x, y, [buttonBg, icon]);

        this.scene = scene;
        this.icon = icon;


        this.setSize(buttonBg.width, buttonBg.height);
        this.setInteractive();
        this.setScale(scale);


        this.updateIcon();


        this.on('pointerdown', (pointer, localX, localY, event) => {

            const newMuteState = !this.scene.sound.mute;
            this.scene.sound.setMute(newMuteState);
            if (newMuteState) {
                this.icon.setFrame('Speaker_Mute_Icon.png');
            } else {
                this.icon.setFrame('Speaker_Icon.png');
            }
            event.stopPropagation();
        });


        this.on('pointerover', () => this.setAlpha(0.8));
        this.on('pointerout', () => this.setAlpha(1));
        this.on('pointerup', () => this.setAlpha(1));
    }

    updateIcon() {
        if (this.scene.sound.mute) {
            this.icon.setFrame('Speaker_Mute_Icon.png');
        } else {
            this.icon.setFrame('Speaker_Icon.png');
        }
    }
}

export class ItemPanelButton extends BaseButton {
    constructor(scene, AudioManager, x, y, backgroundTextureKey, iconTextureKey, iconYOffset,
        labelText, labelSize, callback) {

        const buttonBg = scene.add.image(0, 0, backgroundTextureKey)
            .setInteractive()
            .setScale(layout.itemPanelButton.buttonScale / 2);

        const iconImg = scene.add.image(0, iconYOffset, iconTextureKey).setScale(layout.itemPanelButton.iconScale);

        const textLbl = scene.add.text(0, layout.itemPanelButton.textYPosition, labelText, {
            fontSize: labelSize,
            fontFamily: 'regularFont',
            color: '#d6529c'
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
    constructor(scene, AudioManager, x, y, name, categoryType = null, textureButton, textureButtonHighlighted, textureIcon, textureIconSelected, onClick) {
        const btnLayout = layout.categoryButton;
        const button = scene.add.nineslice(0, 0, textureButton, '',
            btnLayout.width, btnLayout.height,
            20, 20, 20, 20 // Nilai corner cut bisa disesuaikan
        ).setDepth(100).setInteractive().setScale(0.35);
        const buttonHighlighted = scene.add.image(0, 0, textureButtonHighlighted).setVisible(false);
        const icon = scene.add.image(-12, 0, textureIcon.atlas, textureIcon.frame)
            .setScale(scene.state === GameState.DRESSUP ? layout.categoryButton.iconScale : 0.4);
        const iconSelected = scene.add.image(0, 0, textureIconSelected.atlas, textureIconSelected.frame)
            .setScale(scene.state === GameState.DRESSUP ? layout.categoryButton.iconScale : 0.4).setVisible(false);
        super(scene, x, y, [button, buttonHighlighted, icon, iconSelected]);


        this.onClickCallback = onClick;
        this.AudioManager = AudioManager;
        this.button = button;
        this.icon = icon;
        this.iconSelected = iconSelected;
        this.pointerDownPos = { x: 0, y: 0 };
        this.isDragging = false;
        this.isSelected = false;
        const tapThreshold = 10;

        this.originalX = x;
        this.originalY = y;
        this.isSelected = false;
        this.popTween = null;

        console.log(this.isSelected);
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
                    button.parentContainer?.emit('drag', pointer);
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

    selectButton() {
        if (this.isSelected) return;
        this.isSelected = true;

        if (this.scene.selectedCategory.previous && this.scene.selectedCategory.previous !== this) {
            this.scene.selectedCategory.previous.deselectButton();
        }

        // Targetkan elemen visual DI DALAM container, bukan container itu sendiri
        const visualElements = [this.button, this.icon, this.iconSelected];

        if (orientation.isPortrait) {
            this.scene.tweens.add({
                targets: visualElements,
                y: layout.categoryButton.popOutY, // Bergerak relatif di dalam container
                duration: 100,
                ease: 'Power2'
            });
        } else {
            this.scene.tweens.add({
                targets: visualElements,
                x: -40, // Bergerak relatif di dalam container
                duration: 100,
                ease: 'Power2'
            });
        }

        this.button.setTexture('yellowIconSelected');
        this.iconSelected.setVisible(true);
        this.icon.setVisible(false);
    }

    // --- GANTI SELURUH FUNGSI INI ---
    deselectButton() {
        if (!this.isSelected) return;
        this.isSelected = false;

        const visualElements = [this.button, this.icon, this.iconSelected];

        // Animasikan elemen visual kembali ke posisi 0,0 (tengah container)
        this.scene.tweens.add({
            targets: visualElements,
            x: 0,
            y: 0,
            duration: 100,
            ease: 'Power2'
        });

        this.button.setTexture('blueButton');
        this.iconSelected.setVisible(false);
        this.icon.setVisible(true);
    }
}

export class OutfitButton extends BaseButton {
    static selectedOutfits = {};

    constructor(scene, name, outfitType, x, y, outfitX, outfitY, textureAnime, textureButton, textureIcon, AudioManager, isLocked = false) {
        const buttonBg = scene.add.image(0, 0, textureButton).setInteractive().setScale(layout.outfitButton.buttonScale / 2);
        const highlightImg = scene.add.image(0, 0, 'buttonIcon2Highlighted')
            .setVisible(false).setScale(layout.outfitButton.highlightImg / 2);
        const lockedImg = scene.add.image(0, 0, 'buttonIconLocked').setVisible(false).setScale(layout.outfitButton.highlightImg);
        const iconImg = scene.add.image(0, 0, textureIcon.atlas, textureIcon.frame).setScale(layout.outfitButton.iconScale);
        const iconLockedBg = scene.add.image(layout.outfitButton.iconLockedX, layout.outfitButton.iconLockedY, 'yellowIcon').setScale(layout.outfitButton.lockedIconBgScale).setVisible(false);
        const iconLocked = scene.add.image(layout.outfitButton.iconLockedX, layout.outfitButton.iconLockedY, 'lockIcon').setVisible(false).setScale(layout.outfitButton.lockedIconScale);

        const nameText = scene.make.text({
            x: 0, // Posisi lokal X di dalam container
            y: 90, // Posisi lokal Y di dalam container
            text: name,
            style: {
                fontFamily: 'regularFont',
                fontSize: layout.outfitButton.textSize || '22px',
                color: '#d6529c',
                align: 'center',
                wordWrap: { width: buttonBg.displayWidth - 0 }
            }
        }).setOrigin(0.5);

        if (isLocked) {
            iconLocked.setVisible(true);
            iconLockedBg.setVisible(true);
            lockedImg.setVisible(true);
        }
        super(scene, x, y, [buttonBg, highlightImg, lockedImg, iconImg, iconLockedBg, iconLocked, nameText]);
        this.setSize(150, 240);
        this.setDepth(12);
        this.button = buttonBg;
        this.icon = iconImg;
        this.lockedIcon = lockedImg;
        this.buttonLocked = iconLocked;
        this.buttonLockedBg = iconLockedBg;
        this.AudioManager = AudioManager;
        //this.outfitID = outfitID;
        this.name = name;
        this.nameText = nameText;
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


        this.pointerDownPos = { x: 0, y: 0 };
        this.isDragging = false;
        const tapThreshold = 10;

        buttonBg.on("pointerout", () => {
            buttonBg.setAlpha(1);
            this.isDragging = false;
        });
        buttonBg.on("pointerdown", (pointer) => {
            buttonBg.setAlpha(0.5);
            this.pointerDownPos.x = pointer.x;
            this.pointerDownPos.y = pointer.y;
            this.isDragging = false;
        });
        buttonBg.on("pointerup", (pointer) => {
            buttonBg.setAlpha(1);

            if (!buttonBg.input || !buttonBg.active) { this.isDragging = false; return; }
            const dx = Math.abs(pointer.x - this.pointerDownPos.x);
            const dy = Math.abs(pointer.y - this.pointerDownPos.y);
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance <= tapThreshold && !this.isDragging) {

                if (!this.isLocked) { this.toggleOutfit(this.outfitX, this.outfitY, this.outfitType); }
                else { this.playRewardedAd(scene); }
                this.AudioManager?.playSFX?.('outfitmakeupButttonSFX');
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

        poki.runWhenInitialized(() => poki.gameplayStop());
        poki.rewardedBreak().then(() => {
            poki.runWhenInitialized(() => poki.gameplayStart());
            this.isLocked = false;
            this.toggleOutfit(this.outfitX, this.outfitY, this.outfitType);
            this.icon.setAlpha(1);
            unlockManager.unlockItem(this.name);
            scene.SaveManager.saveGame(scene);

            this.buttonLockedBg.setVisible(false);
            this.buttonLocked.setVisible(false);
            this.lockedIcon.setVisible(false)
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
    static unequip(scene, type) {
        const entry = OutfitButton.selectedOutfits[type];
        if (!entry || !entry.current) {
            return;
        }

        const equippedButtonData = entry.current;

        // --- GHOST BUSTER TERPUSAT ---
        if (equippedButtonData.textureAnime) {
            const ghostAtlas = equippedButtonData.textureAnime.atlas;
            const ghostFrame = equippedButtonData.textureAnime.frame;

            for (let i = scene.children.list.length - 1; i >= 0; i--) {
                const child = scene.children.list[i];
                if (child.type === 'Image' && child.texture.key === ghostAtlas && child.frame.name === ghostFrame) {
                    console.warn(`[Unequip] Found and destroyed image for: ${equippedButtonData.name}`);
                    child.destroy();
                }
            }
        }

        if (scene[type]) {
            scene[type].destroy();
            scene[type] = null;
        }


        OutfitButton.selectedOutfits[type] = { current: null, previous: equippedButtonData };
    }




    toggleOutfit() {
        const { scene, textureAnime, stat, outfitType, name } = this;
        const depthValues = { "Socks": 1, "Shoes": 2, "Lower": 3, "Shirt": 4, "Outer": 6, "Dress": 5 };
        const currentEntry = OutfitButton.selectedOutfits[outfitType];

        const unequip = (type) => {
            const entry = OutfitButton.selectedOutfits[type];
            const equippedButton = entry?.current;

            if (equippedButton && equippedButton.textureAnime) {
                const ghostAtlas = equippedButton.textureAnime.atlas;
                const ghostFrame = equippedButton.textureAnime.frame;


                for (let i = scene.children.list.length - 1; i >= 0; i--) {
                    const child = scene.children.list[i];
                    if (child.type === 'Image' && child.texture.key === ghostAtlas && child.frame.name === ghostFrame) {
                        console.warn(`[Unequip/Ghost Buster] Found and destroyed an image for: ${equippedButton.name}`);
                        child.destroy();
                    }
                }
            }

            if (equippedButton && equippedButton.displayedOutfit) {
                equippedButton.displayedOutfit.destroy();
                equippedButton.displayedOutfit = null;
            }
            OutfitButton.selectedOutfits[type] = { current: null, previous: equippedButton || entry?.previous || null };

            if (scene[type]) {
                scene[type].destroy();
                scene[type] = null;
            }
        };

        OutfitButton.clearAllOutfitHighlights(scene);

        if (outfitType === "Dress") {
            unequip("Shirt");
            unequip("Lower");
        }
        if (outfitType === "Shirt") {
            unequip("Dress");
        }
        if (outfitType === "Lower") {
            unequip("Dress");
        }

        if (currentEntry && currentEntry.current === this) {
            unequip(outfitType);
            return;
        }

        const targetAtlas = textureAnime.atlas;
        const targetFrame = textureAnime.frame;

        for (let i = scene.children.list.length - 1; i >= 0; i--) {
            const child = scene.children.list[i];
            if (child.type === 'Image' && child.texture.key === targetAtlas && child.frame.name === targetFrame) {
                console.warn(`[Ghost Buster] Found and destroyed a ghost image for: ${name}`);
                child.destroy();
            }
        }

        unequip(outfitType);

        const outfitManualOffsets = layout.outfit.manualOffsets;
        const manualOffset = outfitManualOffsets[name] || { x: 0, y: 0 };
        const finalX = this.outfitX + manualOffset.x;
        const finalY = this.outfitY + manualOffset.y;
        let newOutfitImage;

        if (textureAnime.atlas && textureAnime.frame) {
            newOutfitImage = scene.add.image(finalX, finalY, textureAnime.atlas, textureAnime.frame);
        } else {
            newOutfitImage = scene.add.image(finalX, finalY, textureAnime);
        }
        console.log(newOutfitImage.displayWidth, newOutfitImage.displayHeight);
        newOutfitImage.setDepth(depthValues[outfitType] || 1);
        this.displayedOutfit = newOutfitImage;






        if (this.usesCustomSize) {
            newOutfitImage.setDisplaySize(this.dressUpViewDisplayWidth, this.dressUpViewDisplayHeight);
        } else {
            newOutfitImage.setScale(this.dressUpViewScale);
        }
        newOutfitImage.setData('outfitType', outfitType);
        newOutfitImage.setData('buttonName', name);
        newOutfitImage.setData('usesCustomSize', this.usesCustomSize);

        newOutfitImage.setData('baseWorldOutfitX', finalX);
        newOutfitImage.setData('baseWorldOutfitY', finalY);


        newOutfitImage.setData('initialScaleX', newOutfitImage.scaleX);
        newOutfitImage.setData('initialScaleY', newOutfitImage.scaleY);


        newOutfitImage.setData('refBodyX', scene.body.x);
        newOutfitImage.setData('refBodyY', scene.body.y);
        newOutfitImage.setData('refBodyScale', scene.body.scale);

        if (scene.UIManager) {
            scene.UIManager.playGlitterExplosion(newOutfitImage, this.outfitType);
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
        "Pupil": 4, "Eyeshadow": 1.9, "Eyeliner": 5, "Blush": 1.9,
        "Eyebrows": 2.4, "Eyelashes": 6, "Lips": 2.6, "Sticker": 2.7
    };

    constructor(scene, name, makeupType, x, y, textureAnime, textureButton, textureIcon, AudioManager, isLocked = false) {
        const buttonBg = scene.add.image(0, 0, textureButton).setInteractive().setScale(layout.makeUpButton.buttonScale / 2);
        const highlightImg = scene.add.image(0, 0, 'buttonIcon2Highlighted')
            .setVisible(false)
            .setDepth(-1)
            .setScale(layout.makeUpButton.highlightImg / 2);
        const lockedImg = scene.add.image(0, 0, 'buttonIconLocked').setVisible(false).setScale(layout.outfitButton.highlightImg);
        const iconImg = scene.add.image(0, 0, textureIcon.atlas, textureIcon.frame).setScale(makeupType === "Hair" ? 1.2 : layout.makeUpButton.iconScale);
        const iconLockedBg = scene.add.image(layout.makeUpButton.iconLockedX, layout.makeUpButton.iconLockedY, 'yellowIcon').setScale(layout.makeUpButton.lockedIconBgScale).setVisible(false);
        const iconLocked = scene.add.image(layout.makeUpButton.iconLockedX, layout.makeUpButton.iconLockedY, 'lockIcon').setVisible(false).setScale(layout.makeUpButton.lockedIconScale);

        const nameText = scene.make.text({
            x: 0,
            y: 75,
            text: name,
            style: {
                fontFamily: 'regularFont',
                fontSize: layout.makeUpButton.textSize || '22px',
                color: '#d6529c',
                align: 'center',
                wordWrap: { width: 150 - 20 }
            }
        }).setOrigin(0.5);

        if (isLocked) {
            lockedImg.setVisible(true);
            iconLocked.setVisible(true);
            iconLockedBg.setVisible(true);
        }
        super(scene, x, y, [buttonBg, highlightImg, lockedImg, iconImg, iconLockedBg, iconLocked, nameText]);

        this.setDepth(12);
        this.setSize(150, 240);
        this.button = buttonBg;
        this.highlightImage = highlightImg;
        this.icon = iconImg;
        this.lockedIcon = lockedImg;
        this.buttonLocked = iconLocked;
        this.buttonLockedBg = iconLockedBg;
        this.name = name;
        this.nameText = nameText;
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
                this.AudioManager?.playSFX?.('outfitmakeupButttonSFX');
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

        poki.runWhenInitialized(() => poki.gameplayStop());
        poki.rewardedBreak().then(() => {
            poki.runWhenInitialized(() => poki.gameplayStart());
            this.toggleMakeUp();
            this.icon.setAlpha(1);
            this.isLocked = false;
            unlockManager.unlockItem(this.name);
            scene.SaveManager.saveGame(scene);

            this.icon.setTint(0xFFFFFF);
            this.button.setTint(0xFFFFFF);
            this.buttonLocked.setVisible(false);
            this.buttonLockedBg.setVisible(false);
            this.lockedIcon.setVisible(false);
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
                if (!['Lips', 'Eyebrows', 'Eyelashes', 'Pupil', 'Eyeshadow'].includes(makeupTypeToRevert)) {
                    MakeUpButton.selectedMakeUp[makeupTypeToRevert] = { current: null, previous: previousEquippedItemInfo };
                    return;
                }
            }

            const position = layout.MakeupPosition[makeupTypeToRevert] || { x: 0, y: 0 };
            let imageToUpdate;

            switch (makeupTypeToRevert) {
                case 'Lips': imageToUpdate = scene.lips; break;
                case 'Eyebrows': imageToUpdate = scene.eyebrows; break;
                case 'Eyelashes': imageToUpdate = scene.eyelashes; break;
                case 'Pupil': imageToUpdate = scene.pupils; break;
                case 'Eyeshadow': imageToUpdate = scene.eyeshadows; break;
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

            if (['Pupil'].includes(makeupTypeToRevert)) {
                imageToUpdate.setScale(layout.MakeupPosition.Pupil.scale * 2)
            } else if (['Lips'].includes(makeupTypeToRevert)) {
                imageToUpdate.setScale(layout.MakeupPosition.Lips.scale * 2)
            }
            else if (['Eyebrows'].includes(makeupTypeToRevert)) {
                imageToUpdate.setScale(layout.MakeupPosition.Eyebrows.scale * 2)
            }
            else if (['Eyelashes'].includes(makeupTypeToRevert)) {
                imageToUpdate.setScale(layout.MakeupPosition.Eyelashes.scale * 2)
            }
            else if (['Sticker'].includes(makeupTypeToRevert)) {
                imageToUpdate.setScale(layout.MakeupPosition.Sticker.scale * 2)
            }
            else if (['Blush'].includes(makeupTypeToRevert)) {
                imageToUpdate.setScale(layout.MakeupPosition.Blush.scale * 2)
            }
            else if (['Eyeliner'].includes(makeupTypeToRevert)) {
                imageToUpdate.setScale(layout.MakeupPosition.Eyeliner.scale * 2)
            }
            else if (['Eyeshadow'].includes(makeupTypeToRevert)) {
                imageToUpdate.setScale(layout.MakeupPosition.Eyeshadow.scale * 2)
            }
            else {
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

            if (currentGlobalEquippedInfo === this) {
                if (scene.interactiveMakeupSystem?.isActive && scene.interactiveMakeupSystem.activeMakeupType === makeupType) {

                    console.log(`[MakeUpButton] Colorable ${name} clicked while its session is active. Stopping and reverting.`);
                    scene.interactiveMakeupSystem.stopColoringSession(makeupType, true);

                    return;
                } else {
                    
                    console.log(`[MakeUpButton] Unequipping completed colorable ${name}`);
                    if (makeupType === 'Lips' || makeupType === 'Eyeshadow') {

                    } else if (this.displayedMakeUp && typeof this.displayedMakeUp.destroy === 'function') {

                        this.displayedMakeUp.destroy();
                    }
                    this.displayedMakeUp = null;
                    this._equipDefaultMakeUp(makeupType, this);
                    return;
                }
            } else {
                if (makeupType === 'Eyeshadow') {
                console.log("[Eyeshadow Fix] Preemptively resetting eyeshadow state...");
                // Panggil _equipDefaultMakeUp untuk 'membersihkan' state
                // sebelum memulai sesi mewarnai yang baru.
                this._equipDefaultMakeUp('Eyeshadow', null);
            }

                if (scene.interactiveMakeupSystem?.isActive) {
                    scene.interactiveMakeupSystem.stopColoringSession(scene.interactiveMakeupSystem.activeMakeupType, true);
                }


                if (currentGlobalEquippedInfo && currentGlobalEquippedInfo.displayedMakeUp) {
                    console.log(`[MakeUpButton] Switching from '${currentGlobalEquippedInfo.name}' to '${this.name}'.`);

                    const prevType = currentGlobalEquippedInfo.makeupType || makeupType;


                    if (!['Lips', 'Eyebrows', 'Eyelashes', 'Pupil', 'Hair', 'Eyeshadow'].includes(prevType)) {
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

            let newImage; const pos = layout.MakeupPosition[makeupType] || { x: 0, y: 0 };

            if (makeupType === 'Hair') {
                const hairTextures = this.textureAnime;
                scene.hairBack.setTexture(hairTextures.back.atlas, hairTextures.back.frame).setVisible(true);
                scene.hairFront.setTexture(hairTextures.front.atlas, hairTextures.front.frame).setVisible(true);


                this.displayedMakeUp = [scene.hairBack, scene.hairFront];
                if (scene.UIManager) {
                    scene.UIManager.playGlitterExplosion(scene.hairBack);
                    scene.UIManager.playGlitterExplosion(scene.hairFront);
                }
            }

            else {

                const textureData = this.textureAnime;
                switch (makeupType) {
                    case 'Eyebrows':
                        scene.eyebrows.setTexture(textureData.atlas, textureData.frame).setVisible(true);
                        newImage = scene.eyebrows;
                        if (scene.UIManager) scene.UIManager.playGlitterExplosion(newImage, this.makeupType);
                        break;
                    case 'Eyelashes':
                        scene.eyelashes.setTexture(textureData.atlas, textureData.frame).setVisible(true);
                        newImage = scene.eyelashes;
                        if (scene.UIManager) scene.UIManager.playGlitterExplosion(newImage, this.makeupType);
                        break;
                    case 'Pupil':
                        scene.pupils.setTexture(textureData.atlas, textureData.frame).setVisible(true);
                        newImage = scene.pupils;
                        if (scene.UIManager) scene.UIManager.playGlitterExplosion(newImage, this.makeupType);
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
                if (newImage && scene.UIManager) {
                    scene.UIManager.playGlitterExplosion(newImage, this.makeupType);
                }

            }

            if (makeupType === 'Hair') {
                this.displayedMakeUp.forEach(img => img.setScale(1.6 * 256 / 225));

            } else {

                if (['Pupil'].includes(makeupType)) { this.displayedMakeUp.setScale(layout.MakeupPosition.Pupil.scale * 2); }
                else if (['Lips'].includes(makeupType)) {
                    this.displayedMakeUp.setScale(layout.MakeupPosition.Lips.scale * 2);
                }
                else if (['Eyebrows'].includes(makeupType)) {
                    this.displayedMakeUp.setScale(layout.MakeupPosition.Eyebrows.scale * 2);
                }
                else if (['Eyelashes'].includes(makeupType)) {
                    this.displayedMakeUp.setScale(layout.MakeupPosition.Eyelashes.scale * 2);
                }
                else if (['Blush'].includes(makeupType)) {
                    this.displayedMakeUp.setScale(layout.MakeupPosition.Blush.scale * 2);
                }
                else if (['Eyeliner'].includes(makeupType)) {
                    this.displayedMakeUp.setScale(layout.MakeupPosition.Eyeliner.scale * 2);
                }
                else if (['Sticker'].includes(makeupType)) {
                    this.displayedMakeUp.setScale(layout.MakeupPosition.Sticker.scale * 2);
                }
                else if (['Eyeshadow'].includes(makeupType)) {
                    this.displayedMakeUp.setScale(layout.MakeupPosition.Eyeshadow.scale * 2);
                }
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