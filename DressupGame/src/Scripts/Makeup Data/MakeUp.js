export class MakeUp {
    constructor(name, makeUpType, textureAnime, textureButton = null, textureIcon = null, isLocked = false) {
        this.name = name;
        this.makeUpType = makeUpType;
        this.textureAnime = textureAnime;
        this.textureButton = textureButton;
        this.textureIcon = textureIcon;
        this.isLocked = isLocked;
    }
}