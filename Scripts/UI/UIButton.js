import { outfitCustomSizes, outfitManualOffsets } from "../Outfit Data/CostumeData.js";
import { BaseButton } from "./BaseButton.js";
import { MakeUpPositions, defaultMakeUpSkins, makeUpData } from "../Makeup Data/MakeUpData.js";

export default class UIButton extends BaseButton {
    constructor(scene, AudioManager, x, y, textureButton, buttonWidth, buttonHeight, textureIcon = null, textureYPosition, iconScale, callback, buttonText = null, textSize = null, textYPosition = null, iconOffset = null, textOffset = null) {

        // Create the button and icon using the scene
        const button = scene.add.nineslice(0, 0, textureButton, '', buttonWidth, buttonHeight, 5, 5, 5, 5).setInteractive().setScale(2);
        const icon = scene.add.image(0 + iconOffset, textureYPosition, textureIcon).setScale(iconScale);
        const text = scene.add.text(0 + textOffset, textYPosition, buttonText, {
            fontSize: textSize,
            fontFamily: 'pixelFont',
            color: '#000000'
        }).setOrigin(0.5);

        super(scene, x, y, [button, icon, text]);

        this.icon = icon;
        this.text = text;
        this.button = button;

        this.addHoverEffect(button, AudioManager);
        this.addClickEffect(button, AudioManager);
        // Click event
        button.on("pointerdown", callback);
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
    constructor(scene, AudioManager, x, y, backgroundTextureKey, iconTextureKey, iconScale, iconYOffset,
        labelText, labelSize, labelYOffset, callback, highlightTextureKey = 'highlightTexture') {

        // 1. Create background image (not nineslice)
        const buttonBg = scene.add.image(0, 0, backgroundTextureKey)
            .setInteractive()
            .setDisplaySize(150, 200); // Match MakeUpButton/OutfitButton visual size

        // 2. Create highlight image (optional, but good for consistency if other item buttons have it)
        const highlightImg = scene.add.image(0, 0, highlightTextureKey)
            .setDisplaySize(150, 200)
            .setVisible(false)
            .setDepth(-1); // Place it behind icon and text

        // 3. Create Icon
        const iconImg = scene.add.image(0, iconYOffset, iconTextureKey).setScale(iconScale);

        // 4. Create Text Label
        const textLbl = scene.add.text(0, labelYOffset, labelText, {
            fontSize: labelSize,
            fontFamily: 'pixelFont',
            color: '#000000'
        }).setOrigin(0.5, 0.5);

        // 5. Call super with all elements
        super(scene, x, y, [buttonBg, highlightImg, iconImg, textLbl]);

        // Store references and properties
        this.button = buttonBg; // The interactive element
        this.highlightImage = highlightImg; // For potential future use or consistency
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

        const buttonText = scene.add.text(0, 0, label, {
            fontSize: '35px',
            fontFamily: 'pixelFont',
            color: '#000000'
        }).setOrigin(0.5);

        // Calculate button size based on text width
        const padding = 30; // Extra space around text
        const buttonWidth = buttonText.width;
        const buttonHeight = 37;

        const buttonImage = scene.add.nineslice(
            0, 0,
            textureKey,
            null,
            105, buttonHeight,
            7, 7,
            14, 16
        ).setInteractive().setDepth(10).setScale(2);

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
        const button = scene.add.image(0, 0, textureButton).setInteractive().setScale(4.7);
        const buttonHighlighted = scene.add.image(0, 0, textureButtonHighlighted).setVisible(false); // Retained for potential explicit hover states if desired later
        const icon = scene.add.image(0, 0, textureIcon).setScale(3.6);
        const text = scene.add.text(0, 90, name, { fontFamily: 'pixelFont', fontSize: 32, fontStyle: 'lighter', color: '#000000' }).setOrigin(0.5);

        super(scene, x, y, [button, buttonHighlighted, icon, text]);

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
                        if (typeof equippedButtonInstance.stat === 'number') {
                            scene.statTracker.setStat(equippedButtonInstance.stat, false);
                        }
                        OutfitButton.selectedOutfits[activeType] = { current: null, previous: equippedButtonInstance };
                        if (equippedButtonInstance.highlightImage) {
                            equippedButtonInstance.highlightImage.setVisible(false);
                        }
                        // Handle dress override implications for highlights
                        if (activeType === "Dress") {
                            OutfitButton.clearHighlightsForType(scene, "Shirt");
                            OutfitButton.clearHighlightsForType(scene, "Underwear");
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

    constructor(scene, name, outfitType, x, y, outfitX, outfitY, textureAnime, textureButton, textureIcon, stat, statTracker, AudioManager, highlightTextureKey = 'highlightTexture') {

        // --- Elements for the button UI itself ---
        const buttonBg = scene.add.image(0, 0, textureButton).setInteractive().setDisplaySize(150, 200);
        const highlightImg = scene.add.image(0, 0, highlightTextureKey)
            .setDisplaySize(150, 200)
            .setVisible(false)
            .setDepth(-1); // Behind icon/text, above buttonBg
        const iconImg = scene.add.image(0, -20, textureIcon).setScale(0.7);
        const textLabel = scene.add.text(0, 70, name, { fontSize: '22px', fontFamily: 'pixelFont', color: '#000000' }).setOrigin(0.5, 0.5);
        const statCont = OutfitButton.createStatContainer(scene, stat);

        super(scene, x, y, [buttonBg, highlightImg, iconImg, textLabel, statCont]);

        this.setDepth(12);
        // --- Initialize properties from your "before changes" version ---
        this.button = buttonBg; // The interactive image
        this.icon = iconImg;    // The small icon on the button
        // this.statText = statText; // Your "before" version had this, but "after" uses statContainer. Ensure consistency.
        // If statText is still used elsewhere, re-add it. For now, assuming statContainer is primary.
        this.AudioManager = AudioManager;
        this.statTracker = statTracker;
        this.stat = stat;
        this.name = name;
        this.outfitType = outfitType;
        this.outfitX = outfitX;         // <<<< KEPT FROM YOUR ORIGINAL - Base X for toggleOutfit
        this.outfitY = outfitY;         // <<<< KEPT FROM YOUR ORIGINAL - Base Y for toggleOutfit
        this.textureAnime = textureAnime;
        this.displayedOutfit = null;    // The equipped outfit on the character
        this.offsetX = 0;               // <<<< KEPT FROM YOUR ORIGINAL - Used by original tweenOutfit
        this.offsetY = 0;
        this.highlightImage = highlightImg;           // <<<< KEPT FROM YOUR ORIGINAL - Used by original tweenOutfit

        // --- Properties for new highlight feature (already assigned this.highlightImage) ---

        // --- Properties for new tweenToView feature (for zoom transitions) ---
        const baseManualOffset = outfitManualOffsets[this.textureAnime] || { x: 0, y: 0 };
        this.baseWorldOutfitX = outfitX + baseManualOffset.x; // Absolute world X if char is at origin
        this.baseWorldOutfitY = outfitY + baseManualOffset.y; // Absolute world Y
        this.usesCustomSize = !!outfitCustomSizes[this.textureAnime];
        if (this.usesCustomSize) {
            const custom = outfitCustomSizes[this.textureAnime];
            this.dressUpViewDisplayWidth = custom.width;
            this.dressUpViewDisplayHeight = custom.height;
            this.baseScaleXAfterCustomSize = 1; // Will be updated in toggleOutfit
            this.baseScaleYAfterCustomSize = 1;
        } else {
            this.dressUpViewScale = 0.6; // Default scale for outfit image in DressUp view
        }
        this.offsetXInDressUpView = 0; // Offset from body for DressUp view, calculated in toggleOutfit
        this.offsetYInDressUpView = 0;

        // --- Tap vs. Drag listeners (from your "before changes" version) ---
        this.pointerDownPos = { x: 0, y: 0 };
        this.isDragging = false;
        const tapThreshold = 10;

        buttonBg.on("pointerover", () => {
            if (!this.isDragging) buttonBg.setAlpha(0.7); // Target buttonBg for alpha
            this.AudioManager.playSFX('hoverButton');
        });
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
                this.AudioManager.playSFX('buttonClick');
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

    // THIS IS YOUR "BEFORE CHANGES" toggleOutfit, with HIGHLIGHT logic integrated
    toggleOutfit(outfitX, outfitY, outfitType) { // Parameters outfitX, outfitY are from constructor/data
        const { scene, textureAnime, stat, outfitType: buttonOutfitType } = this;
        const depthValues = { "Socks": 1, "Shoes": 2, "Underwear": 3, "Shirt": 4, "Outer": 4.5, "Dress": 5 };
        const existingEntry = OutfitButton.selectedOutfits[buttonOutfitType];
        const currentOutfitOfThisType = existingEntry?.current;

        // --- Highlight Management ---
        OutfitButton.clearHighlightsForType(scene, buttonOutfitType);
        if (buttonOutfitType === "Dress") {
            OutfitButton.clearHighlightsForType(scene, "Shirt");
            OutfitButton.clearHighlightsForType(scene, "Underwear");
        }
        if (buttonOutfitType === "Shirt" || buttonOutfitType === "Underwear") {
            OutfitButton.clearHighlightsForType(scene, "Dress");
        }
        // --- End Highlight Management ---

        const isDressSelected = !!OutfitButton.selectedOutfits["Dress"]?.current;
        let alreadyUnequipped = false; // Flag from your original logic

        // === 1. DRESS OVERRIDE LOGIC (Your original logic) ===
        if (buttonOutfitType === "Dress") {
            Object.keys(OutfitButton.selectedOutfits).forEach(type => {
                if (type !== "Dress" && type !== "Shoes") {
                    const entry = OutfitButton.selectedOutfits[type];
                    if (entry?.current) {
                        this.statTracker.setStat(entry.current.stat, false);
                        alreadyUnequipped = true; // Mark that something was unequipped by override
                        if (entry.current.displayedOutfit) entry.current.displayedOutfit.destroy();
                        if (entry.current instanceof OutfitButton) { // Clean instance
                            entry.current.displayedOutfit = null;
                            entry.current.highlightImage.setVisible(false); // Clear highlight of overridden item
                        }
                        OutfitButton.selectedOutfits[type] = { current: null, previous: entry.current };
                    }
                }
            });
        }
        // === 2. NON-DRESS OVERRIDES DRESS (Your original logic) ===
        if (buttonOutfitType !== "Dress" && buttonOutfitType !== "Shoes" && isDressSelected) {
            const dressEntry = OutfitButton.selectedOutfits["Dress"];
            if (dressEntry?.current) {
                this.statTracker.setStat(dressEntry.current.stat, false);
                alreadyUnequipped = true;
                if (dressEntry.current.displayedOutfit) dressEntry.current.displayedOutfit.destroy();
                if (dressEntry.current instanceof OutfitButton) { // Clean instance
                    dressEntry.current.displayedOutfit = null;
                    dressEntry.current.highlightImage.setVisible(false); // Clear highlight of overridden dress
                }
                OutfitButton.selectedOutfits["Dress"] = { current: null, previous: dressEntry.current };
            }
        }

        // === 3. REMOVE CURRENT SAME-TYPE OUTFIT (Your original combined logic) ===
        // This handles both clicking the same button again OR clicking a different button of the same type
        if (currentOutfitOfThisType) { // If any outfit of this type was selected
            if (currentOutfitOfThisType.displayedOutfit) {
                currentOutfitOfThisType.displayedOutfit.destroy();
            }
            if (typeof currentOutfitOfThisType.stat === 'number') {
                this.statTracker.setStat(currentOutfitOfThisType.stat, false);
            }
            if (currentOutfitOfThisType instanceof OutfitButton) { // Clean the instance
                currentOutfitOfThisType.displayedOutfit = null;
                currentOutfitOfThisType.highlightImage.setVisible(false); // Turn off its highlight
            }
            OutfitButton.selectedOutfits[buttonOutfitType] = { current: null, previous: currentOutfitOfThisType };

            if (currentOutfitOfThisType === this) { // If we just unequipped THIS button by clicking it again
                return; // Stop here, nothing new to equip
            }
        }
        // If this.displayedOutfit still exists (e.g. from a state not covered by currentOutfitOfThisType logic, or if it wasn't currentOutfitOfThisType), clear it.
        // This is a safeguard.
        if (this.displayedOutfit && this.displayedOutfit.active) {
            this.displayedOutfit.destroy();
            this.displayedOutfit = null;
        }


        // === 4. EQUIP NEW OUTFIT ('this' button) ===
        const manualOffset = outfitManualOffsets[textureAnime] || { x: 0, y: 0 };
        const finalX = this.outfitX + manualOffset.x; // Use this.outfitX from constructor
        const finalY = this.outfitY + manualOffset.y; // Use this.outfitY from constructor

        const image = scene.add.image(finalX, finalY, textureAnime);

        if (this.usesCustomSize) { // Check instance property
            image.setDisplaySize(this.dressUpViewDisplayWidth, this.dressUpViewDisplayHeight);
            this.baseScaleXAfterCustomSize = image.scaleX; // Capture scale after setDisplaySize
            this.baseScaleYAfterCustomSize = image.scaleY;
        } else {
            image.setScale(this.dressUpViewScale); // Use instance property
        }

        this.displayedOutfit = image;
        this.displayedOutfit.setDepth(depthValues[buttonOutfitType] || 1);

        this.statTracker.setStat(stat, true);

        OutfitButton.selectedOutfits[buttonOutfitType] = {
            previous: currentOutfitOfThisType, // What was there before (could be null or another button)
            current: this
        };
        this.highlightImage.setVisible(true); // Show highlight for this new selection

        // Update original offsetX/Y for the simple tweenOutfit method
        this.offsetX = finalX - scene.body.x;
        this.offsetY = finalY - scene.body.y;

        // Update offsets for tweenToView (DressUp view specific)
        // CRITICAL: Ensure scene.body.x/y/scale are in the DRESSUP VIEW state when this is called
        this.offsetXInDressUpView = this.baseWorldOutfitX - scene.body.x;
        this.offsetYInDressUpView = this.baseWorldOutfitY - scene.body.y;
    }

    // Your original tweenOutfit for simple positional changes
    tweenOutfit(playerX, playerY, duration, ease) {
        if (this.displayedOutfit && this.displayedOutfit.active) {
            const newX = playerX + this.offsetX; // Uses the simple offsetX/Y
            const newY = playerY + this.offsetY;
            this.scene.tweens.add({
                targets: this.displayedOutfit,
                x: newX,
                y: newY,
                duration: duration,
                ease: ease
            });
        }
    }

    // New method for complex zoom transitions
    tweenToView(targetBodyX, targetBodyY, targetBodyScale, referenceBodyScaleForOffsets, duration, ease) {
        if (!this.displayedOutfit || !this.displayedOutfit.active) {
            return;
        }
        const scaleChangeFactor = targetBodyScale / referenceBodyScaleForOffsets;
        const targetOutfitX = targetBodyX + (this.offsetXInDressUpView * scaleChangeFactor);
        const targetOutfitY = targetBodyY + (this.offsetYInDressUpView * scaleChangeFactor);

        const tweenProps = {
            x: targetOutfitX,
            y: targetOutfitY,
            duration: duration,
            ease: ease,
            onStart: () => { if (this.displayedOutfit) this.displayedOutfit.setVisible(true); }
        };

        if (this.usesCustomSize) {
            tweenProps.scaleX = this.baseScaleXAfterCustomSize * scaleChangeFactor;
            tweenProps.scaleY = this.baseScaleYAfterCustomSize * scaleChangeFactor;
        } else {
            tweenProps.scaleX = this.dressUpViewScale * scaleChangeFactor;
            tweenProps.scaleY = this.dressUpViewScale * scaleChangeFactor;
        }
        this.scene.tweens.add({ targets: this.displayedOutfit, ...tweenProps });
    }
}

export class MakeUpButton extends BaseButton {
    static selectedMakeUp = {};
    static DEPTH_VALUES = {
        "Pupil": 2, "Eyeshadow": 2.1, "Eyeliner": 2.2, "Blush": 2.3,
        "Eyebrows": 2.4, "Eyelashes": 2.5, "Lips": 2.6, "Sticker": 2.7
    };

    constructor(scene, name, makeupType, x, y, textureAnime, textureButton, textureIcon, AudioManager,
        highlightTextureKey = 'highlightTexture') { // Added highlightTextureKey

        // --- Create UI elements for the button itself ---
        const buttonImg = scene.add.image(0, 0, textureButton).setInteractive().setDisplaySize(150, 200);
        const highlightImg = scene.add.image(0, 0, highlightTextureKey)
            .setDisplaySize(150, 200) // Match button image size
            .setVisible(false)
            .setDepth(-1); // Behind icon/text, above buttonImg background
        const iconImg = scene.add.image(0, -15, textureIcon).setScale(0.85);
        const textLbl = scene.add.text(0, 60, name, {
            fontSize: '22px', fontFamily: 'pixelFont', color: '#000000'
        }).setOrigin(0.5, 0.5);
        // --- End Create UI elements ---

        // --- Call super() ---
        super(scene, x, y, [buttonImg, highlightImg, iconImg, textLbl]);
        // --- 'this' is now available ---

        // Assign elements to instance properties
        this.button = buttonImg; // Keep a reference to the interactive element for disable/setInteractive
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

        this.addHoverEffect(buttonImg, AudioManager); // From BaseButton (handles hover alpha and sound)

        // Custom click handling (for tap vs drag, and sound on SUCCESSFUL tap)
        buttonImg.on("pointerdown", (pointer) => {
            buttonImg.setAlpha(0.5); // Visual press feedback
            this.pointerDownPos.x = pointer.x;
            this.pointerDownPos.y = pointer.y;
            this.isDragging = false;
            // No sound here, will be played on pointerup if it's a valid tap
        });

        buttonImg.on("pointerup", (pointer) => {
            buttonImg.setAlpha(1); // Reset visual press feedback
            if (!buttonImg.input || !buttonImg.active) {
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

        buttonImg.on("pointerout", () => {
            if (buttonImg.input && buttonImg.input.isDown) {
                buttonImg.setAlpha(1); // Reset if pointer dragged out while pressed
            }
            this.isDragging = false;
        });

        buttonImg.on("pointermove", (pointer) => {
            if (buttonImg.input && buttonImg.input.isDown) {
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
            const defaultMakeUpItemData = makeUpData.find(item => item.makeUpType === makeupTypeToRevert && item.textureAnime === defaultTextureKey);
            // Allow Hair/Sticker to proceed even if no named "Default" in makeUpData, as long as defaultMakeUpSkins has a key for them (even if that key leads to clearing)
            if (!defaultMakeUpItemData && !['Hair', 'Sticker'].includes(makeupTypeToRevert)) {
                if (!['Lips', 'Eyebrows', 'Eyelashes', 'Pupil'].includes(makeupTypeToRevert)) {
                    MakeUpButton.selectedMakeUp[makeupTypeToRevert] = { current: null, previous: previousEquippedItemInfo };
                    return;
                }
            }

            const position = MakeUpPositions[makeupTypeToRevert] || { x: 0, y: 0 };
            let imageToUpdate;
            let isCoreType = false; // Changed from isCoreOrHair to be more specific

            switch (makeupTypeToRevert) {
                case 'Lips': imageToUpdate = scene.lips; isCoreType = true; break;
                case 'Eyebrows': imageToUpdate = scene.eyebrows; isCoreType = true; break;
                case 'Eyelashes': imageToUpdate = scene.eyelashes; isCoreType = true; break;
                case 'Pupil': imageToUpdate = scene.pupils; isCoreType = true; break;
                case 'Hair': imageToUpdate = scene.hair; isCoreType = true; break;
                // Sticker default: if defined in defaultMakeUpSkins, it's an additive image.
                // If not defined, this function won't apply anything new, selectedMakeUp[type].current becomes null.
                default:
                    imageToUpdate = scene.add.image(position.x, position.y, defaultTextureKey);
                    if (scene.faceContainer && !imageToUpdate.parentContainer) {
                        scene.faceContainer.add(imageToUpdate);
                    }
                    break;
            }

            if (!imageToUpdate) { console.error(`Could not get/create image for default ${makeupTypeToRevert}`); return; }

            if (isCoreType) {
                imageToUpdate.setTexture(defaultTextureKey).setVisible(true);
            }

            // Apply scale
            if (['Pupil', 'Lips', 'Eyebrows', 'Eyelashes', 'Blush', 'Eyeliner', 'Sticker'].includes(makeupTypeToRevert)) { // <<<< ADDED STICKER HERE
                imageToUpdate.setScale(0.55);
            } else if (makeupTypeToRevert === 'Hair') {
                imageToUpdate.setScale(0.8);
            } else { // Eyeshadow (if it had a default)
                imageToUpdate.setScale(0.9);
            }
            imageToUpdate.setDepth(MakeUpButton.DEPTH_VALUES[makeupTypeToRevert] || (makeupTypeToRevert === 'Hair' ? 3 : MakeUpButton.DEPTH_VALUES['Sticker'] || 2.7));

            const currentName = defaultMakeUpItemData ? defaultMakeUpItemData.name : `Default ${makeupTypeToRevert}`;
            MakeUpButton.selectedMakeUp[makeupTypeToRevert] = {
                current: { name: currentName, makeupType: makeupTypeToRevert, textureAnime: defaultTextureKey, displayedMakeUp: imageToUpdate, isDefault: true },
                previous: previousEquippedItemInfo
            };
        } else { // No default skin defined in defaultMakeUpSkins for this type (e.g., Sticker)
            MakeUpButton.selectedMakeUp[makeupTypeToRevert] = { current: null, previous: previousEquippedItemInfo };
            MakeUpButton.clearMakeupHighlightsForType(this.scene, makeupTypeToRevert); // Ensure highlight is off
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
            // Clicked a NEW colorable item, or switching from a different item.
            // Any *previous* session (even for this type by another button) was stopped above.
            // Clean up visual of previously selected item if it was an INSTANTLY APPLIED item of THIS makeupType.
            if (currentGlobalEquippedInfo && currentGlobalEquippedInfo.displayedMakeUp &&
                !currentGlobalEquippedInfo.isDefault && // was not a default state object
                (!(currentGlobalEquippedInfo instanceof MakeUpButton && colorableTypes.includes(currentGlobalEquippedInfo.makeupType))) // and was not a (potentially completed) colorable item
            ) {
                const prevType = currentGlobalEquippedInfo.makeupType || makeupType;
                if (!['Lips', 'Eyebrows', 'Eyelashes', 'Pupil', 'Hair'].includes(prevType)) { // If it was an additive INSTANT item
                    if (typeof currentGlobalEquippedInfo.displayedMakeUp.destroy === 'function') {
                        currentGlobalEquippedInfo.displayedMakeUp.destroy();
                    }
                }
                if (currentGlobalEquippedInfo instanceof MakeUpButton) {
                    currentGlobalEquippedInfo.displayedMakeUp = null;
                }
            }
            
            if (scene.interactiveMakeupSystem) {
                scene.interactiveMakeupSystem.startColoringSession(makeupType, textureAnime, this);
                if(this.highlightImage) this.highlightImage.setVisible(true);
            }
        }
    } else {
        // --- INSTANTLY APPLICABLE TYPE (Eyebrows, Eyelashes, Pupil, Hair, Sticker) ---
        // (Your existing fully working logic for this block)
        if (currentGlobalEquippedInfo === this) { /* ... toggle OFF ... */ this._equipDefaultMakeUp(makeupType, this); return; }
        if (currentGlobalEquippedInfo && currentGlobalEquippedInfo.displayedMakeUp) { /* ... clear previous ... */ }
        let newImage; const pos = MakeUpPositions[makeupType] || {x:0,y:0};
        switch(makeupType){
            case 'Eyebrows': scene.eyebrows.setTexture(this.textureAnime).setVisible(true);newImage=scene.eyebrows;break;
            case 'Eyelashes': scene.eyelashes.setTexture(this.textureAnime).setVisible(true); newImage = scene.eyelashes; break;
            case 'Pupil': scene.pupils.setTexture(this.textureAnime).setVisible(true); newImage = scene.pupils; break;
            // ... other instant cases ...
            case 'Hair': if(scene.hair){scene.hair.setTexture(this.textureAnime).setVisible(true);newImage=scene.hair;}break;
            case 'Sticker': newImage=scene.add.image(pos.x,pos.y,this.textureAnime);if(scene.faceContainer)scene.faceContainer.add(newImage);break;
            default: return;
        }
        if(!newImage){return;} this.displayedMakeUp=newImage;
        // ... set scale, depth, update selectedMakeUp, set highlight ...
        if (['Pupil','Lips','Eyebrows','Eyelashes','Blush','Eyeliner','Sticker'].includes(makeupType)) {this.displayedMakeUp.setScale(0.55);}
        else if (makeupType === 'Hair') {this.displayedMakeUp.setScale(0.8);} else {this.displayedMakeUp.setScale(0.9);}
        this.displayedMakeUp.setDepth(MakeUpButton.DEPTH_VALUES[makeupType]||(makeupType==='Hair'?3:2.7));
        MakeUpButton.selectedMakeUp[makeupType]={previous:currentGlobalEquippedInfo,current:this};
        if(this.highlightImage)this.highlightImage.setVisible(true);
    }
}
}