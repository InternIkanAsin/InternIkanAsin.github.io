import { outfitCustomSizes, outfitManualOffsets } from "../Outfit Data/CostumeData.js";
import {BaseButton} from "./BaseButton.js";

export default class UIButton extends BaseButton{
    constructor(scene, AudioManager, x, y, textureButton, textureIcon, callback) {

        // Create the button and icon using the scene
        const button = scene.add.image(0, 0, textureButton).setInteractive().setDisplaySize(30, 30);
        const icon = scene.add.image(0, 0, textureIcon);

        super(scene, x, y, [button, icon]);
        this.container.setScale(4).setAlpha(0);

        this.addHoverEffect(button, AudioManager);

        // Click event
        button.on("pointerdown", callback);
    }
}

export class ContinueButton extends BaseButton {
    constructor(scene, x, y, textureKey, label, onClick) {

        const buttonText = scene.add.text(0, 0, label, {
            fontSize: '28px',
            fontFamily: 'pixelFont',
            color: '#000000'
        }).setOrigin(0.5);

        // Calculate button size based on text width
        const padding = 40; // Extra space around text
        const buttonWidth = buttonText.width + padding;
        const buttonHeight = 80;

        const buttonImage = scene.add.nineslice(
            0, 0,
            textureKey,
            null,
            buttonWidth, buttonHeight,
            16, 16,
            16, 16
        ).setInteractive();

        super(scene, x, y, [buttonImage, buttonText]);
        this.addHoverEffect(buttonImage);
        buttonImage.on('pointerdown', onClick);
    }
}

export class OutfitButton extends BaseButton{
    static selectedOutfits = {}; // To store currently selected outfits

    constructor(scene, name, outfitType, x, y, outfitX, outfitY, textureAnime, textureButton, textureIcon, stat, statTracker, AudioManager) {

        // Create the button and icon using the scene
        const button = scene.add.image(0, 0, textureButton).setInteractive().setDisplaySize(150, 200);
        const icon = scene.add.image(0, 0, textureIcon);

        const statColor = stat > 0 ? '#00ff00' : '#ff0000';
        const statText = scene.add.text(50, 70, stat.toString(), {
            fontSize: '28px',
            fontFamily: 'pixelFont',
            color: statColor
        }).setOrigin(0.5).setAlpha(0);

        // Add the button, icon, and stat text to the container
        super(scene, x, y, [button, icon, statText]);

        //Initialize variables
        this.button = button;
        this.icon = icon;
        this.statText = statText;
        this.AudioManager = AudioManager;
        this.statTracker = statTracker;
        this.stat = stat;
        this.name = name;
        this.outfitType = outfitType;
        this.outfitX = outfitX;
        this.outfitY = outfitY;
        this.textureAnime = textureAnime;
        // Track pointer position for tap detection
        this.pointerDownPos = { x: 0, y: 0 };
        this.isDragging = false;
        const tapThreshold = 10; // Pixels to allow for minor movement

        // Add hover effects
        button.on("pointerover", () => {
            if (!this.isDragging) this.button.setAlpha(0.7);
            this.AudioManager.playSFX('hoverButton');
        });
        button.on("pointerout", () => {
            this.button.setAlpha(1);
            this.isDragging = false;
        });

        // Track pointer down position
        button.on("pointerdown", (pointer) => {
            this.pointerDownPos.x = pointer.x;
            this.pointerDownPos.y = pointer.y;
            this.isDragging = false;
        });

        // Handle pointer up for outfit selection
        button.on("pointerup", (pointer) => {
            // Calculate movement distance
            const dx = Math.abs(pointer.x - this.pointerDownPos.x);
            const dy = Math.abs(pointer.y - this.pointerDownPos.y);
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Equip outfit only if movement is below threshold (tap, not drag)
            if (distance <= tapThreshold && !this.isDragging) {
                this.toggleOutfit(outfitX, outfitY, outfitType);
                this.AudioManager.playSFX('buttonClick');
            }
            this.isDragging = false;
        });

        // Detect dragging to prevent outfit selection
        button.on("pointermove", (pointer) => {
            const dx = Math.abs(pointer.x - this.pointerDownPos.x);
            const dy = Math.abs(pointer.y - this.pointerDownPos.y);
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance > tapThreshold) {
                this.isDragging = true;
            }
        });
    }

    toggleOutfit(outfitX, outfitY, outfitType) {
        const { scene, textureAnime, stat, outfitType: buttonOutfitType } = this;

        const depthValues = {
            "Socks": 1,
            "Shoes": 2,
            "Underwear": 3,
            "Shirt": 4,
            "Outer": 4.5,
            "Dress": 5
        };

        const isDressSelected = !!OutfitButton.selectedOutfits["Dress"]?.current;

        let alreadyUnequipped = false;

        // === 1. DRESS OVERRIDE LOGIC ===
        if (buttonOutfitType === "Dress") {
            Object.keys(OutfitButton.selectedOutfits).forEach(type => {
                if (type !== "Dress" && type !== "Shoes") {
                    const entry = OutfitButton.selectedOutfits[type];
                    if (entry?.current) {
                        this.statTracker.setStat(entry.current.stat, false);
                        alreadyUnequipped = true;

                        if (entry.current.displayedOutfit) {
                            entry.current.displayedOutfit.destroy();
                        }

                        OutfitButton.selectedOutfits[type] = {
                            current: null,
                            previous: entry.current
                        };
                    }
                }
            });
        }

        // === 2. NON-DRESS OVERRIDES DRESS ===
        if (buttonOutfitType !== "Dress" && buttonOutfitType !== "Shoes" && isDressSelected) {
            const dressEntry = OutfitButton.selectedOutfits["Dress"];
            if (dressEntry?.current) {
                this.statTracker.setStat(dressEntry.current.stat, false);
                alreadyUnequipped = true;

                if (dressEntry.current.displayedOutfit) {
                    dressEntry.current.displayedOutfit.destroy();
                }

                OutfitButton.selectedOutfits["Dress"] = {
                    current: null,
                    previous: dressEntry.current
                };
            }
        }

        // === 3. REMOVE CURRENT SAME-TYPE OUTFIT ===
        const existingEntry = OutfitButton.selectedOutfits[buttonOutfitType];
        const currentOutfit = existingEntry?.current;

        if (!alreadyUnequipped && this.displayedOutfit || currentOutfit) {
            if (this.displayedOutfit) {
                this.displayedOutfit.destroy();
                this.displayedOutfit = null;
            }

            if (currentOutfit?.displayedOutfit) {
                currentOutfit.displayedOutfit.destroy();
            }

            if (currentOutfit?.stat) {
                this.statTracker.setStat(currentOutfit.stat, false);
            }

            OutfitButton.selectedOutfits[buttonOutfitType] = {
                current: null,
                previous: currentOutfit
            };

        }

        // === 4. EQUIP NEW OUTFIT ===
        const offset = outfitManualOffsets[textureAnime] || { x: 0, y: 0 };
        const finalX = outfitX + offset.x;
        const finalY = outfitY + offset.y;

        const image = scene.add.image(finalX, finalY, textureAnime);

        if (outfitCustomSizes[textureAnime]) {
            const { width, height } = outfitCustomSizes[textureAnime];
            image.setDisplaySize(width, height);
        } else {
            image.setScale(0.6);
        }

        this.displayedOutfit = image;
        this.displayedOutfit.setDepth(depthValues[buttonOutfitType] || 1);

        this.statTracker.setStat(stat, true);

        OutfitButton.selectedOutfits[buttonOutfitType] = {
            previous: existingEntry?.current || null,
            current: this
        };

        this.offsetX = finalX - scene.player.x;
        this.offsetY = finalY - scene.player.y;
    }

    tweenOutfit(playerX, playerY, duration, ease) {
        if (this.displayedOutfit) {
            const newX = playerX + this.offsetX;
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
}


