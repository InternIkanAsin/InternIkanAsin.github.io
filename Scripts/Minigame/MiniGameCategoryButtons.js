//Category Button Class
import { CategoryButton } from '../UI/UIButton.js'

export function createMakeUpCategoryButtons(scene, audioManager) {
    return [
        scene.eyebrowsButton = new CategoryButton(scene, audioManager, 0, 0, 'Eyebrows', null, 'categoryButton', 'categoryButtonHighlighted', 'eyebrowsIcon', () => {
            scene.MakeUpManager.displayMakeUpButtons('Eyebrows', scene);
        }),
        scene.eyelashesButton = new CategoryButton(scene, audioManager, 0, 0, 'Eyelashes', null, 'categoryButton', 'categoryButtonHighlighted', 'eyelashesIcon', () => {
            scene.MakeUpManager.displayMakeUpButtons('Eyelashes', scene);
        }),
        scene.eyelinerButton = new CategoryButton(scene, audioManager, 0, 0, 'Eyeliner', null, 'categoryButton', 'categoryButtonHighlighted', 'eyelinerIcon', () => {
            scene.MakeUpManager.displayMakeUpButtons('Eyeliner', scene);
        }),
        scene.lipstickButton = new CategoryButton(scene, audioManager, 0, 0, 'Lipstick', null, 'categoryButton', 'categoryButtonHighlighted', 'lipstickIcon', () => {
            scene.MakeUpManager.displayMakeUpButtons('Lips', scene);
        }),
        scene.eyecolorButton = new CategoryButton(scene, audioManager, 0, 0, 'Eye Color', null, 'categoryButton', 'categoryButtonHighlighted', 'eyeColorIcon', () => {
            scene.MakeUpManager.displayMakeUpButtons('Pupil', scene);
        }),
        scene.blushButton = new CategoryButton(scene, audioManager, 0, 0, 'Blush', null, 'categoryButton', 'categoryButtonHighlighted', 'blushIcon', () => {
            scene.MakeUpManager.displayMakeUpButtons('Blush', scene);
        }),
        scene.hairButton = new CategoryButton(scene, audioManager, 0, 0, 'Hair', null, 'categoryButton', 'categoryButtonHighlighted', 'hairIcon', () => {
            scene.MakeUpManager.displayMakeUpButtons('Hair', scene);
        })
    ];
}

export function createDressUpCategoryButtons(scene, audioManager) {
    return [
        scene.dressButton = new CategoryButton(scene, audioManager, 0, 0, 'Dress', null, 'categoryButton', 'categoryButtonHighlighted', 'dressIcon', () => {
            scene.DressUpManager.displayDressUpButtons('Dress', scene);
        }),
        scene.outerButton = new CategoryButton(scene, audioManager, 0, 0, 'Outer', null, 'categoryButton', 'categoryButtonHighlighted', 'outerIcon', () => {
            scene.DressUpManager.displayDressUpButtons('Outer', scene);
        }),
        scene.underwearButton = new CategoryButton(scene, audioManager, 0, 0, 'Underwear', null, 'categoryButton', 'categoryButtonHighlighted', 'underwearIcon', () => {
            scene.DressUpManager.displayDressUpButtons('Underwear', scene);
        }),
        scene.socksButton = new CategoryButton(scene, audioManager, 0, 0, 'Socks', null, 'categoryButton', 'categoryButtonHighlighted', 'socksIcon', () => {
            scene.DressUpManager.displayDressUpButtons('Socks', scene);
        }),
        scene.shoesButton = new CategoryButton(scene, audioManager, 0, 0, 'Shoes', null, 'categoryButton', 'categoryButtonHighlighted', 'shoesIcon', () => {
            scene.DressUpManager.displayDressUpButtons('Shoes', scene);
        })
    ];
}
