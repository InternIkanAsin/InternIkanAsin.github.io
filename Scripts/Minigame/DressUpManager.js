// Costume Data Class
import { costumeData, outfitPositions } from '../Outfit Data/CostumeData.js'

// UI Buttons Class
import UIButton, { OutfitButton, GeneralButton } from '../UI/UIButton.js'

export class DressUpManager {
    constructor(scene, AudioManager) {
        this.scene = scene;
        this.AudioManager = AudioManager;
    }

    /**
     * @method setupCostumeButtons - Initializes an array and creates costumedata SOs and stores it in the array created based on its type
     */
    setupCostumeButtons(scene) {
        this.scene.outfitButtons = {};

        // Add buttons to the panel
        costumeData.forEach(({ name, outfitType, x, y, textureAnime, textureButton, textureIcon, stat }) => {
            const { x: outfitX, y: outfitY } = outfitPositions[outfitType] || { x: 0, y: 0 };
            const button = new OutfitButton(scene, name, outfitType, x, y, outfitX, outfitY, textureAnime, textureButton, textureIcon, stat, scene.statTracker, scene.AudioManager);

            // Optional: Hide/show by type
            button.container.setSize(150, 200).setVisible(false);
            button.container.setData('instance', button);

            if (!scene.outfitButtons[outfitType]) {
                scene.outfitButtons[outfitType] = [];
            }
            scene.outfitButtons[outfitType].push(button);
        });
    }

    /**
    * @method updateDressUpButtons - Updates makeup buttons of make up Panel
    */
    updateDressUpButtons(outfitType) {

        // Get new buttons
        if (outfitType === "DressShirt") {
            this.buttons = [...(this.scene.outfitButtons["Dress"] || []), ...(this.scene.outfitButtons["Shirt"] || [])];
        } else {
            this.buttons = this.scene.outfitButtons[outfitType] || [];
        }
        this.scene.MiniGameManager.buttonList = this.buttons.map(b => b.container);

        // Clear existing children from the grid
        this.scene.MiniGameManager.buttonGrid.clear();
        this.scene.MiniGameManager.innerSizer.clear();

        //Create a grid sized display for the buttons
        this.scene.MiniGameManager.buttonGrid = this.scene.rexUI.add.gridSizer({
            row: this.scene.MiniGameManager.buttonList.length,
            column: 1,
            rowProportions: 1, // make columns flexible
            space: { column: 0, row: 20 },
            align: 'center',
        });

        this.scene.MiniGameManager.innerSizer.add(this.scene.MiniGameManager.buttonGrid, 0, 'center', {}, true);
        // Add new buttons to the grid
        this.scene.MiniGameManager.buttonList.forEach((btn, index) => {
            btn.setVisible(true);
            this.scene.MiniGameManager.buttonGrid.add(btn, index, 0, 'center', 0, false);
        });

        // Relayout the panel to apply the new buttons
        this.scene.sidePanel.layout();
    }

    displayDressUpButtons(outfitType, scene) {
        scene.tweens.add({
            targets: [scene.sidePanel],
            x: this.scene.scale.width + 300,
            duration: 500,
            ease: 'Sine.easeInOut',
            onComplete: () => {

                //Bring out back button
                scene.tweens.add({
                    targets: [scene.backButton],
                    x: this.scene.scale.width / 2 * 1.73,
                    duration: 500,
                    ease: 'Sine.easeInOut'
                })

                //Update makeup buttons to replace current buttons with panel
                scene.DressUpManager.updateDressUpButtons(outfitType);

                scene.selectedButtonText.setText(outfitType.toString());
                this.scene.MiniGameManager.updatePanelLayout(30, 100, 30)
                scene.tweens.add({
                    targets: [scene.sidePanel],
                    x: this.scene.scale.width / 2 * 1.8,
                    duration: 500,
                    ease: 'Sine.easeInOut',
                    onComplete: () => {
                        scene.tweens.add({
                            targets: [scene.selectedButtonHeader],
                            alpha: 1,
                            duration: 500,
                            ease: 'Sine.easeInOut'
                        })
                    }
                })
            }
        })
    }
}