export class Costume {
    constructor(name, outfitType, textureAnime, textureButton, textureIcon) {
        this.name = name;
        this.outfitType = outfitType;
        this.textureAnime = textureAnime;
        this.textureButton = textureButton;
        this.textureIcon = textureIcon;

    }
}

//Stat tracker class to track stats with the outfit equipped
export class statTracker {
    constructor(scene) {
        this.scene = scene;
    }

    static currentStat = 0;

    setStat(amount, isAdded) {
        statTracker.currentStat += isAdded ? amount : -amount;
        console.log(statTracker.currentStat);
        //this.scene.currentStatText.setText(statTracker.currentStat.toString());
    }

    setupStatPanel(scene) {
        scene.statPanel = scene.add.nineslice(0, 73, 'statBar', '', 200, 40, 35, 35, 0, 0).setScale(1.3);
        scene.heartIcon = scene.add.image(-20, 75, 'heartIcon', '', 200, 40, 35, 35, 0, 0).setScale(0.7);
        const initialStatText = statTracker.currentStat.toString();

        scene.currentStatText = scene.add.text(30, 77, initialStatText, {
            fontFamily: 'pixelFont',
            fontSize: 48,
            fontStyle: 'lighter',
            color: '#000000'
        }).setOrigin(0.5);

        scene.statPanelContainer = scene.add.container(70, 0, [scene.statPanel, scene.heartIcon, scene.currentStatText]);
    }
    getStatPoints() {
        return statTracker.currentStat;
    }

    resetStatPoints() {
        statTracker.currentStat = 0;
    }
}


