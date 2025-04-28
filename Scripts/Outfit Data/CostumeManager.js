export class Costume {
    constructor(name, outfitType, textureAnime, textureButton, textureIcon, stat = 0) {
        this.name = name;
        this.outfitType = outfitType;
        this.textureAnime = textureAnime;
        this.textureButton = textureButton;
        this.textureIcon = textureIcon;
        this.stat = stat;
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
        this.scene.currentStatText.setText(statTracker.currentStat.toString());
    }

    setupStatPanel(scene) {
        scene.statPanel = scene.add.nineslice(75, 73, 'statPanel', '', 150, 150, 6, 6, 5, 5);
        scene.statText = scene.add.text(45, 30, 'Stat:', { fontFamily: 'pixelFont', fontSize: 32, fontStyle: 'lighter', color: '#000000' });
        scene.currentStatText = scene.add.text(55, 70, '0', { fontFamily: 'pixelFont', fontSize: 64, fontStyle: 'lighter', color: '#000000' });
    }
    getStatPoints() {
        return statTracker.currentStat;
    }
}


