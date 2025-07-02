
import { BaseButton } from "./BaseButton.js";
import { MakeUpPositions, defaultMakeUpSkins, makeUpData } from "../Makeup Data/MakeUpData.js";
import { layout } from '../ScreenOrientationUtils.js';
import { GameState } from '../Main.js';
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
        });

        button.on("pointerup", () => {
            button.setTexture(textureButton);
            if (icon) icon.y -= 5;
            if (callback) callback();
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
        this.button.setAlpha(0.7);
    }

    setInteractive() {
        this.button.setInteractive();
        this.button.setAlpha(1);
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

        // 5. Call super with all elements
        super(scene, x, y, [buttonBg, iconImg, textLbl]);

        // Store references and properties
        this.button = buttonBg; // The interactive element
        this.icon = iconImg;
        this.text = textLbl;
        this.onClickCallback = callback;
        this.AudioManager = AudioManager;

        // --- Tap vs. Drag detection logic (same as MakeUpButton/CategoryButton) ---
        this.pointerDownPos = { x: 0, y: 0 };
        this.isDragging = false;
        const tapThreshold = 10;

        this.addHoverEffect(buttonBg, AudioManager); // From BaseButton

        // Custom click handling for visual feedback and sound on successful tap
        buttonBg.on("pointerdown", (pointer) => {
            buttonBg.setAlpha(0.5); // Visual press feedback
            this.pointerDownPos.x = pointer.x;
            this.pointerDownPos.y = pointer.y;
            this.isDragging = false;
        });

        buttonBg.on("pointerup", (pointer) => {
            buttonBg.setAlpha(1); // Reset visual press feedback
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
                this.AudioManager?.playSFX?.("buttonClick"); // Sound on successful tap
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

    // Optional: Methods to control highlight if needed by external logic
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

        // Calculate button size based on text width
        const padding = 30; // Extra space around text
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
        //Create button and icon using the scene
        const button = scene.add.image(0, 0, textureButton)
            .setInteractive()
            .setScale(scene.state === GameState.DRESSUP ? layout.categoryButton.buttonScale : 0.8);
        const buttonHighlighted = scene.add.image(0, 0, textureButtonHighlighted).setVisible(false); // Retained for potential explicit hover states if desired later
        const icon = scene.add.image(0, 0, textureIcon)
            .setScale(scene.state === GameState.DRESSUP ? layout.categoryButton.iconScale : 0.6);

        super(scene, x, y, [button, buttonHighlighted, icon]);

        // Store the original onClick callback and AudioManager
        this.onClickCallback = onClick;
        this.AudioManager = AudioManager;

        // Drag vs. Tap Detection Logic
        this.pointerDownPos = { x: 0, y: 0 };
        this.isDragging = false;
        const tapThreshold = 10; // Pixels to allow for minor movement

        // Call addHoverEffect from BaseButton for hover visuals and sound
        this.addHoverEffect(button, AudioManager);


        button.on("pointerdown", (pointer) => {
            button.setAlpha(0.5); // Visual feedback: darken on press
            this.pointerDownPos.x = pointer.x;
            this.pointerDownPos.y = pointer.y;
            this.isDragging = false;

        });

        button.on("pointerup", (pointer) => {
            button.setAlpha(1);

            // Check if input is still valid 
            if (!button.input || !button.active) {
                this.isDragging = false;
                return;
            }

            const dx = Math.abs(pointer.x - this.pointerDownPos.x);
            const dy = Math.abs(pointer.y - this.pointerDownPos.y);
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Execute callback and play sound only if movement is below threshold (a tap)
            if (distance <= tapThreshold && !this.isDragging) {
                if (this.onClickCallback) {
                    this.onClickCallback();
                    this.AudioManager?.playSFX?.("buttonClick"); // Play sound on successful tap action
                }
            }
            this.isDragging = false;
        });

        // Handle pointer leaving the button while pressed down
        button.on("pointerout", () => {
            if (button.input && button.input.isDown) {
                button.setAlpha(1);
            }
            this.isDragging = false;
        });

        // Detect dragging to prevent action execution on pointerup
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
        panelContext, // 'Makeup' or 'Outfit' to know which system to clear
        activeType,   // The specific makeUpType or outfitType this button is for (e.g., 'Lips', 'Dress')
        itemButtonsForType // Array of MakeUpButton/OutfitButton instances for this type (needed for helper calls)
    ) {

        // --- Define Visuals to Match MakeUpButton/OutfitButton ---
        const textureBgKey = 'button1'; // Assuming this is the shared background
        const displayWidth = 150;
        const displayHeight = 200;

        const iconTextureKey = 'xMark'; // Your 'X' icon
        const iconYOffset = -15;        // Typical for MakeUpButton (adjust if different for OutfitButton if this is generic)
        const iconScale = 0.85;         // Typical for MakeUpButton

        const labelText = 'Remove';    // Or 'Lepas'
        const labelFontSize = '22px';
        const labelYOffset = 70;        // Adjusted for consistency with MakeUpButton/OutfitButton text placement
        // MakeUpButton textLabel is at y:60, OutfitButton textLabel is at y:70.
        // Pick one or make it a parameter if they differ. Let's use 70 like OutfitButton.

        // --- Create GameObjects ---
        const bgImage = scene.add.image(0, 0, textureBgKey)
            .setDisplaySize(displayWidth, displayHeight)
            .setInteractive();
        const iconImg = scene.add.image(0, iconYOffset, iconTextureKey).setScale(iconScale);
        const textLbl = scene.add.text(0, labelYOffset, labelText, {
            fontSize: labelFontSize,
            fontFamily: 'pixelFont',
            color: '#000000'
        }).setOrigin(0.5);

        super(scene, 0, 0, [bgImage, iconImg, textLbl]); // x,y will be set by GridSizer

        this.buttonElement = bgImage; // The interactive element
        this.AudioManager = AudioManager;

        // --- Tap vs. Drag Logic (same as your other buttons) ---
        let pointerDownPos = { x: 0, y: 0 };
        let isDragging = false;
        const tapThreshold = 10;

        this.addHoverEffect(bgImage, AudioManager); // From BaseButton

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
                // --- Lepas Callback Logic ---
                console.log(`[LepasButton] Clicked for Panel: ${panelContext}, Type: ${activeType}`);
                this.AudioManager?.playSFX?.("buttonClick");

                if (panelContext === 'Makeup') {
                    if (scene.interactiveMakeupSystem?.isActive && scene.interactiveMakeupSystem.activeMakeupType === activeType) {
                        scene.interactiveMakeupSystem.stopColoringSession(activeType, true); // true to force discard
                    }

                    const currentEntry = MakeUpButton.selectedMakeUp[activeType];
                    const currentEquipped = currentEntry?.current;
                    let helperButton = itemButtonsForType?.[0]; // itemButtonsForType are MakeUpButtons

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
                    const equippedButtonInstance = currentEntry?.current; // This is an OutfitButton instance

                    if (equippedButtonInstance && equippedButtonInstance instanceof OutfitButton) {
                        if (equippedButtonInstance.displayedOutfit) {
                            equippedButtonInstance.displayedOutfit.destroy();
                            equippedButtonInstance.displayedOutfit = null;
                        }
                        OutfitButton.selectedOutfits[activeType] = { current: null, previous: equippedButtonInstance };
                        if (equippedButtonInstance.highlightImage) {
                            equippedButtonInstance.highlightImage.setVisible(false);
                        }
                        // Handle dress override implications for highlights
                        if (activeType === "Dress") {
                            OutfitButton.clearHighlightsForType(scene, "Shirt");
                            OutfitButton.clearHighlightsForType(scene, "Lower");
                        }
                    } else {
                        console.log(`[LepasButton] No ${activeType} item currently equipped to remove.`);
                    }
                }
                // --- End Lepas Callback ---
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

    constructor(scene, name, outfitType, x, y, outfitX, outfitY, textureAnime, textureButton, textureIcon, AudioManager) {

        // --- Elements for the button UI itself ---
        const buttonBg = scene.add.image(0, 0, textureButton).setInteractive().setScale(layout.outfitButton.buttonScale);
        const highlightImg = scene.add.image(0, 0, 'buttonIcon2Highlighted')
            .setVisible(false).setScale(layout.outfitButton.highlightImg);
        const iconImg = scene.add.image(0, 0, textureIcon.atlas, textureIcon.frame).setScale(layout.outfitButton.iconScale);

        super(scene, x, y, [buttonBg, highlightImg, iconImg]);

        this.setDepth(12);
        // --- Initialize properties from your "before changes" version ---
        this.button = buttonBg; // The interactive image
        this.icon = iconImg;    // The small icon on the button
        this.AudioManager = AudioManager;
        this.name = name;
        this.outfitType = outfitType;
        this.outfitX = outfitX;         // <<<< KEPT FROM YOUR ORIGINAL - Base X for toggleOutfit
        this.outfitY = outfitY;         // <<<< KEPT FROM YOUR ORIGINAL - Base Y for toggleOutfit
        this.textureAnime = textureAnime;
        this.displayedOutfit = null;    // The equipped outfit on the character
        this.offsetX = 0;               // <<<< KEPT FROM YOUR ORIGINAL - Used by original tweenOutfit
        this.offsetY = 0;
        this.highlightImage = highlightImg;           // <<<< KEPT FROM YOUR ORIGINAL - Used by original tweenOutfit

        // --- Properties for new tweenToView feature (for zoom transitions) ---
        const outfitCustomSizes = layout.outfit.customSizes;
        const outfitManualOffsets = layout.outfit.manualOffsets;

        const baseManualOffset = outfitManualOffsets[this.name] || { x: 0, y: 0 };
        this.baseWorldOutfitX = outfitX + baseManualOffset.x; // Absolute world X if char is at origin
        this.baseWorldOutfitY = outfitY + baseManualOffset.y; // Absolute world Y
        this.usesCustomSize = !!outfitCustomSizes[this.name];
        if (this.usesCustomSize) {
            const custom = outfitCustomSizes[this.name];
            this.dressUpViewDisplayWidth = custom.width;
            this.dressUpViewDisplayHeight = custom.height;
            this.baseScaleXAfterCustomSize = 1; // Will be updated in toggleOutfit
            this.baseScaleYAfterCustomSize = 1;
        } else if (outfitType === 'Dress' || outfitType === 'Outer' || outfitType === 'Shirt') {
            this.dressUpViewScale = 0.6; // Default scale for outfit image in DressUp view
        } else {
            this.dressUpViewScale = 1.2; // Default scale for outfit image in DressUp view
        }
        this.offsetXInDressUpView = 0; // Offset from body for DressUp view, calculated in toggleOutfit
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
                this.toggleOutfit(this.outfitX, this.outfitY, this.outfitType);
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
        // ... (Keep your working createStatContainer method)
        const heartContainer = scene.add.container(0, 35);
        const numHeartsAbs = Math.abs(statValue);
        const rows = Math.ceil(numHeartsAbs / columns);
        const statColor = statValue >= 0 ? 0xffd700 : 0x808080; // Gold for positive/zero, Gray for negative
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
            // 'entry' 
            const equippedButton = entry?.current;
            if (equippedButton && equippedButton.displayedOutfit) {
                equippedButton.displayedOutfit.destroy();
                equippedButton.displayedOutfit = null;
            }
            OutfitButton.selectedOutfits[type] = { current: null, previous: equippedButton || entry?.previous || null };

        };

        // --- Highlight Management ---
        OutfitButton.clearAllOutfitHighlights(scene);

        // --- Override ---
        if (outfitType === "Dress") {
            unequip("Shirt");
            unequip("Lower");
        }
        if (outfitType === "Shirt" || outfitType === "Lower") {
            unequip("Dress");
        }

        // --- check if ithe same item double clicked ---
        if (currentEntry && currentEntry.current === this) {
            unequip(outfitType);
            return;
        }

        // --- unequip old item with same tyoe ---
        unequip(outfitType);

        // --- Equip item  ---
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

        // save refference image
        OutfitButton.selectedOutfits[outfitType] = {
            current: this,
            previous: currentEntry?.current || currentEntry?.previous || null
        };

        this.highlightImage.setVisible(true);
    }

}

export class MakeUpButton extends BaseButton {
    static selectedMakeUp = {};
    static DEPTH_VALUES = {
        "Pupil": 2, "Eyeshadow": 1.9, "Eyeliner": 2.2, "Blush": 1.9,
        "Eyebrows": 2.4, "Eyelashes": 2.5, "Lips": 2.6, "Sticker": 2.7
    };

    constructor(scene, name, makeupType, x, y, textureAnime, textureButton, textureIcon, AudioManager) { // Added highlightTextureKey

        // --- Create UI elements for the button itself ---
        const buttonBg = scene.add.image(0, 0, textureButton).setInteractive().setScale(layout.makeUpButton.buttonScale);
        const highlightImg = scene.add.image(0, 0, 'buttonIcon2Highlighted')
            .setVisible(false)
            .setDepth(-1)    // Behind icon/text, above buttonBg
            .setScale(layout.makeUpButton.highlightImg);
        const iconImg = scene.add.image(0, 0, textureIcon).setScale(makeupType === "Hair" ? 1.2 : layout.makeUpButton.iconScale);
        // --- End Create UI elements ---

        // --- Call super() ---
        super(scene, x, y, [buttonBg, highlightImg, iconImg]);
        // --- 'this' is now available ---
        this.setDepth(12);
        // Assign elements to instance properties
        this.button = buttonBg; // Keep a reference to the interactive element for disable/setInteractive
        this.highlightImage = highlightImg; // Already assigned above after super() was planned, now correct.

        // Initialize other instance properties
        this.name = name;
        this.makeupType = makeupType;
        this.textureAnime = textureAnime;
        this.AudioManager = AudioManager;
        this.displayedMakeUp = null; // For an instantly applied makeup image, or the one managed by InteractiveMakeupSystem

        // --- Tap vs. Drag listeners (your existing, working logic) ---
        this.pointerDownPos = { x: 0, y: 0 };
        this.isDragging = false;
        const tapThreshold = 10;

        // Custom click handling (for tap vs drag, and sound on SUCCESSFUL tap)
        buttonBg.on("pointerdown", (pointer) => {
            buttonBg.setAlpha(0.5); // Visual press feedback
            this.pointerDownPos.x = pointer.x;
            this.pointerDownPos.y = pointer.y;
            this.isDragging = false;
            // No sound here, will be played on pointerup if it's a valid tap
        });

        buttonBg.on("pointerup", (pointer) => {
            buttonBg.setAlpha(1); // Reset visual press feedback
            if (!buttonBg.input || !buttonBg.active) {
                this.isDragging = false;
                return;
            }
            const dx = Math.abs(pointer.x - this.pointerDownPos.x);
            const dy = Math.abs(pointer.y - this.pointerDownPos.y);
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance <= tapThreshold && !this.isDragging) {
                this.toggleMakeUp(); // Contains logic for coloring vs. instant apply
                this.AudioManager?.playSFX?.("buttonClick"); // Sound on successful tap
            }
            this.isDragging = false;
        });

        buttonBg.on("pointerout", () => {
            if (buttonBg.input && buttonBg.input.isDown) {
                buttonBg.setAlpha(1); // Reset if pointer dragged out while pressed
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

    // --- Static helper methods for managing highlights ---
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

            // Apply scale
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

        // 1. If an interactive session for a DIFFERENT type is active, stop it.
        if (scene.interactiveMakeupSystem?.isActive && scene.interactiveMakeupSystem.activeMakeupType !== makeupType) {
            scene.interactiveMakeupSystem.stopColoringSession(scene.interactiveMakeupSystem.activeMakeupType, true);
        }
        // If a session for THIS type is active (started by another button), stop it.
        else if (scene.interactiveMakeupSystem?.isActive && scene.interactiveMakeupSystem.activeMakeupType === makeupType && currentGlobalEquippedInfo !== this) {
            scene.interactiveMakeupSystem.stopColoringSession(makeupType, true);
        }

        MakeUpButton.clearMakeupHighlightsForType(scene, makeupType);

        if (colorableTypes.includes(makeupType)) {
            // --- COLORABLE TYPE ---
            if (currentGlobalEquippedInfo === this) { // Clicking the same button
                if (scene.interactiveMakeupSystem?.isActive && scene.interactiveMakeupSystem.activeMakeupType === makeupType) {
                    // Coloring session for THIS button is active. User might want to cancel by clicking again.
                    console.log(`[MakeUpButton] Colorable ${name} clicked while its session is active. Stopping and reverting.`);
                    scene.interactiveMakeupSystem.stopColoringSession(makeupType, true); // This will revert to previous state
                    // Highlight was already cleared. If previous was default, no highlight. If previous was another item, its toggle will handle highlight.
                    return;
                } else {
                    // This button was current, session NOT active (means it was completed). Click to unequip.
                    console.log(`[MakeUpButton] Unequipping completed colorable ${name}`);
                    if (makeupType === 'Lips') {
                        // scene.lips is persistent. _equipDefaultMakeUp will set its texture.
                        // The button's displayedMakeUp should be nulled.
                    } else if (this.displayedMakeUp && typeof this.displayedMakeUp.destroy === 'function') {
                        // For Blush/Eyeshadow/Eyeliner, this.displayedMakeUp was the image kept after coloring.
                        this.displayedMakeUp.destroy();
                    }
                    this.displayedMakeUp = null;
                    this._equipDefaultMakeUp(makeupType, this); // Reverts to default
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
            // --- INSTANTLY APPLICABLE TYPE (Eyebrows, Eyelashes, Pupil, Hair, Sticker) ---
            // (Your existing fully working logic for this block)
            if (currentGlobalEquippedInfo === this) {
                if (makeupType === 'Sticker' && this.displayedMakeUp && typeof this.displayedMakeUp.destroy === 'function') {
                    this.displayedMakeUp.destroy();
                    this.displayedMakeUp = null;
                } this._equipDefaultMakeUp(makeupType, this); return;
            }
            if (currentGlobalEquippedInfo && currentGlobalEquippedInfo.displayedMakeUp) {
                const prevType = currentGlobalEquippedInfo.makeupType || makeupType;

                // Hanya hancurkan jika itu adalah tipe aditif (bukan bagian inti wajah)
                if (prevType === 'Sticker' || prevType === 'Blush' || prevType === 'Eyeshadow' || prevType === 'Eyeliner') {
                    if (typeof currentGlobalEquippedInfo.displayedMakeUp.destroy === 'function') {
                        console.log(`[MakeUpButton] Destroying previous ${prevType}: ${currentGlobalEquippedInfo.name}`);
                        currentGlobalEquippedInfo.displayedMakeUp.destroy();
                    }
                }
                // Bersihkan referensi pada instance tombol lama
                if (currentGlobalEquippedInfo instanceof MakeUpButton) {
                    currentGlobalEquippedInfo.displayedMakeUp = null;
                }
            }
            // =======================================================================

            if (colorableTypes.includes(makeupType)) {
                // Logika untuk item yang bisa diwarnai (coloring)
                if (scene.interactiveMakeupSystem) {
                    scene.interactiveMakeupSystem.startColoringSession(makeupType, textureAnime, this);
                    if (this.highlightImage) this.highlightImage.setVisible(true);
                }
            }

            let newImage; const pos = MakeUpPositions[makeupType] || { x: 0, y: 0 };

            if (makeupType === 'Hair') {
                const hairTextures = this.textureAnime; // object { front: '...', back: '...' }
                scene.hairBack.setTexture(hairTextures.back.atlas, hairTextures.back.frame).setVisible(true);
                scene.hairFront.setTexture(hairTextures.front.atlas, hairTextures.front.frame).setVisible(true);

                // Save the reffferences of the two game objects
                this.displayedMakeUp = [scene.hairBack, scene.hairFront];
            }

            else {

                switch (makeupType) {
                    case 'Eyebrows': scene.eyebrows.setTexture(this.textureAnime).setVisible(true); newImage = scene.eyebrows; break;
                    case 'Eyelashes': scene.eyelashes.setTexture(this.textureAnime).setVisible(true); newImage = scene.eyelashes; break;
                    case 'Pupil': scene.pupils.setTexture(this.textureAnime).setVisible(true); newImage = scene.pupils; break;
                    // ... other instant cases ...
                    case 'Sticker':
                        // Logika baru untuk menangani format string atau objek
                        if (typeof this.textureAnime === 'object' && this.textureAnime.atlas) {
                            // Format baru (spritesheet)
                            newImage = scene.add.image(pos.x, pos.y, this.textureAnime.atlas, this.textureAnime.frame);
                        } else {
                            // Fallback untuk format lama (gambar tunggal)
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

            // ... set scale, depth, update selectedMakeUp, set highlight ...
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
        }
    }
}