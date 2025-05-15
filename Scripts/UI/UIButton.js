import { outfitCustomSizes, outfitManualOffsets } from "../Outfit Data/CostumeData.js";
import { BaseButton } from "./BaseButton.js";
import { MakeUpPositions, defaultMakeUpSkins, makeUpData } from "../Makeup Data/MakeUpData.js";

export default class UIButton extends BaseButton {
    constructor(scene, AudioManager, x, y, textureButton, buttonWidth, buttonHeight, textureIcon, textureYPosition, iconScale, callback, buttonText = null, textSize = null) {

        // Create the button and icon using the scene
        const button = scene.add.nineslice(0, 0, textureButton, '', buttonWidth, buttonHeight, 5, 5, 5, 5).setInteractive().setScale(2);
        const icon = scene.add.image(0, textureYPosition, textureIcon).setScale(iconScale);
        const text = scene.add.text(0, 45, buttonText, {
            fontSize: '23px',
            fontFamily: 'pixelFont',
            color: '#000000'
        }).setOrigin(0.5);

        super(scene, x, y, [button, icon, text]);

        this.icon = icon;
        this.text = text;

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
}

export class GeneralButton extends BaseButton {
    constructor(scene, x, y, textureKey, textureKeyOutline, label, onClick, AudioManager) {

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
        ).setInteractive().setDepth(10);

        const buttonOutlineImage = scene.add.nineslice(
            0, 0,
            textureKeyOutline,
            null,
            buttonWidth, buttonHeight,
            16, 16,
            16, 16
        ).setDepth(10).setScale(1.1).setVisible(false);

        super(scene, x, y, [buttonImage, buttonOutlineImage, buttonText]);

        this.addHoverEffect(buttonImage, AudioManager);
        this.addClickEffect(buttonImage, AudioManager);

        buttonImage.on('pointerdown', onClick);
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
}

export class OutfitButton extends BaseButton {
    static selectedOutfits = {}; // To store currently selected outfits

    constructor(scene, name, outfitType, x, y, outfitX, outfitY, textureAnime, textureButton, textureIcon, stat, statTracker, AudioManager) {

        // Create the button and icon using the scene
        const button = scene.add.image(0, 0, textureButton).setInteractive().setDisplaySize(150, 200);
        const statContainer = OutfitButton.createStatContainer(scene, stat);
        const icon = scene.add.image(0, -20, textureIcon).setScale(0.7);


        const text = scene.add.text(0, 70, name, {
            fontSize: '22px',
            fontFamily: 'pixelFont',
            color: '#000000'
        }).setOrigin(0.5, 0.5);


        const statColor = stat > 0 ? '#00ff00' : '#ff0000';
        const statText = scene.add.text(50, 70, stat.toString(), {
            fontSize: '28px',
            fontFamily: 'pixelFont',
            color: statColor
        }).setOrigin(0.5).setAlpha(0);

        // Add the button, icon, and stat text to the container
        super(scene, x, y, [button, icon, statContainer, text]);

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

    static createStatContainer(scene, statValue, columns = 3, spacing = 20) {
        const heartContainer = scene.add.container(0, 35);

        const rows = Math.ceil(statValue / columns);
        const totalWidth = (Math.min(statValue, columns) - 1) * spacing;
        const totalHeight = (rows - 1) * spacing;

        for (let i = 0; i < statValue; i++) {
            const row = Math.floor(i / columns);
            const col = i % columns;

            // Offset from center
            const x = col * spacing - totalWidth / 2;
            const y = row * spacing - totalHeight / 2;

            const heart = scene.add.image(x, y, 'heartIcon').setScale(0.3).setOrigin(0.5);
            heartContainer.add(heart);
        }

        return heartContainer;
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

        this.offsetX = finalX - scene.body.x;
        this.offsetY = finalY - scene.body.y;
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

export class MakeUpButton extends BaseButton {
    static selectedMakeUp = {}; 
    static DEPTH_VALUES = {
        "Pupil": 2, "Eyeshadow": 2.1, "Eyeliner": 2.2, "Blush": 2.3,
        "Eyebrows": 2.4, "Eyelashes": 2.5, "Lips": 2.6, "Sticker": 2.7
    };

      constructor(scene, name, makeupType, x, y, textureAnime, textureButton, textureIcon, AudioManager) {
        const buttonImage = scene.add.image(0, 0, textureButton).setInteractive().setDisplaySize(150, 200).setDepth(10);
        const iconImage = scene.add.image(0, -15, textureIcon).setScale(0.85);
        const textLabel = scene.add.text(0, 60, name, {
            fontSize: '22px', fontFamily: 'pixelFont', color: '#000000'
        }).setOrigin(0.5, 0.5);
        super(scene, x, y, [buttonImage, iconImage, textLabel]);

        this.name = name;
        this.makeupType = makeupType;
        this.textureAnime = textureAnime;
        this.AudioManager = AudioManager;
        this.displayedMakeUp = null;

        this.pointerDownPos = { x: 0, y: 0 };
        this.isDragging = false;
        const tapThreshold = 10;

        this.addHoverEffect(buttonImage, AudioManager);
        

        buttonImage.on("pointerdown", (pointer) => {
            buttonImage.setAlpha(0.5);
            this.pointerDownPos.x = pointer.x;
            this.pointerDownPos.y = pointer.y;
            this.isDragging = false;
        });

        buttonImage.on("pointerup", (pointer) => {
            buttonImage.setAlpha(1);
            if (!buttonImage.input) { this.isDragging = false; return;}
            const dx = Math.abs(pointer.x - this.pointerDownPos.x);
            const dy = Math.abs(pointer.y - this.pointerDownPos.y); 
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance <= tapThreshold && !this.isDragging) {
                this.toggleMakeUp();
                this.AudioManager?.playSFX?.("buttonClick");
            }
            this.isDragging = false;
        });
        
        buttonImage.on("pointerout", () => {
            if (buttonImage.input && buttonImage.input.isDown) {
                buttonImage.setAlpha(1);
            }
            this.isDragging = false;
        });

        buttonImage.on("pointermove", (pointer) => {
            if (buttonImage.input && buttonImage.input.isDown) {
                const dx = Math.abs(pointer.x - this.pointerDownPos.x);
                const dy = Math.abs(pointer.y - this.pointerDownPos.y);
                if (Math.sqrt(dx * dx + dy * dy) > tapThreshold) {
                    this.isDragging = true;
                }
            }
        });
    }

    
    _equipDefaultMakeUp(makeupTypeToRevert, previousEquippedItemInfo) {
       
        const scene = this.scene; 
        const defaultTextureKey = defaultMakeUpSkins[makeupTypeToRevert];

        if (defaultTextureKey) {
            const defaultMakeUpItemData = makeUpData.find(
                item => item.makeUpType === makeupTypeToRevert && item.textureAnime === defaultTextureKey
            );

            if (!defaultMakeUpItemData) {
                console.warn(`Default MakeUp data (in makeUpData.js) not found for ${makeupTypeToRevert} with texture ${defaultTextureKey}. Clearing slot.`);
                MakeUpButton.selectedMakeUp[makeupTypeToRevert] = { current: null, previous: previousEquippedItemInfo };
                return;
            }
            const position = MakeUpPositions[makeupTypeToRevert] || { x: 0, y: 0 };
            let image; 
            let targetGameObject;

            switch (makeupTypeToRevert) {
                case 'Lips': targetGameObject = scene.lips; break;
                case 'Eyebrows': targetGameObject = scene.eyebrows; break;
                case 'Eyelashes': targetGameObject = scene.eyelashes; break;
                case 'Pupil': targetGameObject = scene.pupils; break;
                default: 
                    image = scene.add.image(position.x, position.y, defaultTextureKey);
                    break;
            }

            if (targetGameObject) { 
                targetGameObject.setTexture(defaultTextureKey);
                targetGameObject.setVisible(true);
                image = targetGameObject;
            } else if (makeupTypeToRevert !== 'Lips' && makeupTypeToRevert !== 'Eyebrows' &&
                       makeupTypeToRevert !== 'Eyelashes' && makeupTypeToRevert !== 'Pupil' && !image) {
                 console.error(`Failed to obtain or create image for default additive makeup: ${makeupTypeToRevert}`);
                 return;
            }

            if (image) {
                if (makeupTypeToRevert === 'Pupil' || makeupTypeToRevert === 'Lips' || makeupTypeToRevert === 'Eyebrows' || makeupTypeToRevert === 'Eyelashes' || makeupTypeToRevert === 'Blush' || makeupTypeToRevert === 'Eyeliner'){
                     image.setScale(0.55); 
                } else {
                     image.setScale(0.9); 
                }

                if (!image.parentContainer && scene.faceContainer &&
                    (makeupTypeToRevert !== 'Lips' && makeupTypeToRevert !== 'Eyebrows' &&
                     makeupTypeToRevert !== 'Eyelashes' && makeupTypeToRevert !== 'Pupil') ) {
                    scene.faceContainer.add(image);
                }
                image.setDepth(MakeUpButton.DEPTH_VALUES[makeupTypeToRevert] || 2);

                MakeUpButton.selectedMakeUp[makeupTypeToRevert] = {
                    current: { 
                        name: defaultMakeUpItemData.name,
                        makeupType: defaultMakeUpItemData.makeUpType,
                        textureAnime: defaultMakeUpItemData.textureAnime,
                        displayedMakeUp: image, 
                        isDefault: true 
                    },
                    previous: previousEquippedItemInfo
                };
            } else {
                 console.error(`Image reference is null for ${makeupTypeToRevert} after attempting to set/create default.`);
            }
        } else { 
            MakeUpButton.selectedMakeUp[makeupTypeToRevert] = { current: null, previous: previousEquippedItemInfo };
        }
    }

    toggleMakeUp() {
        const { scene, textureAnime, makeupType, name: buttonName } = this; 
        const existingEntry = MakeUpButton.selectedMakeUp[makeupType];
        const currentEquippedItemInfo = existingEntry?.current;

        if (!scene.faceContainer) { console.error("Scene's faceContainer not defined."); return; }
        const requiredSceneObjects = { 'Lips': 'lips', 'Eyebrows': 'eyebrows', 'Eyelashes': 'eyelashes', 'Pupil': 'pupils' };
        if (requiredSceneObjects[makeupType] && !scene[requiredSceneObjects[makeupType]]) {
            console.error(`Scene object scene.${requiredSceneObjects[makeupType]} for ${makeupType} not defined.`); return;
        }
        
        if (currentEquippedItemInfo === this) { 
            if (this.displayedMakeUp) { 
                if (makeupType !== 'Lips' && makeupType !== 'Eyebrows' && makeupType !== 'Eyelashes' && makeupType !== 'Pupil') {
                    if (typeof this.displayedMakeUp.destroy === 'function') {
                        this.displayedMakeUp.destroy();
                    }
                }
                this.displayedMakeUp = null; 
            }
            this._equipDefaultMakeUp(makeupType, this); 
            return; 
        }
        
        if (currentEquippedItemInfo) { 
            const gameObjectToPotentiallyRemove = currentEquippedItemInfo.displayedMakeUp;
            if (!currentEquippedItemInfo.isDefault && gameObjectToPotentiallyRemove) {
                const prevMakeupType = currentEquippedItemInfo.makeupType || makeupType; 
                if ( prevMakeupType !== 'Lips' &&
                     prevMakeupType !== 'Eyebrows' &&
                     prevMakeupType !== 'Eyelashes' &&
                     prevMakeupType !== 'Pupil') {
                    if (typeof gameObjectToPotentiallyRemove.destroy === 'function') {
                        gameObjectToPotentiallyRemove.destroy();
                    }
                }
            }
            if (currentEquippedItemInfo instanceof MakeUpButton && currentEquippedItemInfo !== this) {
                currentEquippedItemInfo.displayedMakeUp = null;
            }
        }
        
        const position = MakeUpPositions[makeupType] || { x: 0, y: 0 };
        let newImage; 
        
        switch (makeupType) {
            case 'Lips': scene.lips.setTexture(this.textureAnime); scene.lips.setVisible(true); newImage = scene.lips; break;
            case 'Eyebrows': scene.eyebrows.setTexture(this.textureAnime); scene.eyebrows.setVisible(true); newImage = scene.eyebrows; break;
            case 'Eyelashes': scene.eyelashes.setTexture(this.textureAnime); scene.eyelashes.setVisible(true); newImage = scene.eyelashes; break;
            case 'Pupil': scene.pupils.setTexture(this.textureAnime); scene.pupils.setVisible(true); newImage = scene.pupils; break;
            case 'Blush': case 'Eyeshadow': case 'Eyeliner': case 'Sticker':
                newImage = scene.add.image(position.x, position.y, this.textureAnime);
                if (scene.faceContainer) scene.faceContainer.add(newImage); 
                else console.error("faceContainer not found on scene for additive makeup!");
                break;
            default: console.warn(`Unhandled makeupType in toggleMakeUp for equipping: ${makeupType}`); return; 
        }

        if (!newImage) { console.error(`Failed to create or get new image for makeup type ${makeupType}`); return; }

        this.displayedMakeUp = newImage; 

        if (makeupType === 'Pupil' || makeupType === 'Lips' || makeupType === 'Eyebrows' || makeupType === 'Eyelashes' || makeupType === 'Blush' || makeupType === 'Eyeliner' ) {
            this.displayedMakeUp.setScale(0.55); 
        } else { 
            this.displayedMakeUp.setScale(0.9); 
        }
        this.displayedMakeUp.setDepth(MakeUpButton.DEPTH_VALUES[makeupType] || 2);
        
        MakeUpButton.selectedMakeUp[makeupType] = {
            previous: currentEquippedItemInfo, 
            current: this 
        };
    }
}

