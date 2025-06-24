//Category Button Class
import { CategoryButton } from '../UI/UIButton.js'
import { layout } from '../ScreenOrientationUtils.js';
export function createMakeUpCategoryButtons(scene, audioManager) {
    const buttons = [
        scene.eyebrowsButton = new CategoryButton(scene, audioManager, scene.scale.width / 1.23, 125,
            'Eyebrows',
            null,
            'stitchedButtonIcon',
            'categoryButtonHighlighted',
            'eyebrowsIcon',
            () => {
                scene.MakeUpManager.displayMakeUpButtons('Eyebrows', scene);
            }
        ),
        scene.eyelashesButton = new CategoryButton(scene, audioManager, scene.scale.width / 1.23, 225,
            'Eyelashes',
            null,
            'stitchedButtonIcon',
            'categoryButtonHighlighted',
            'eyelashesIcon',
            () => {
                scene.MakeUpManager.displayMakeUpButtons('Eyelashes', scene);
            }
        ),
        scene.eyelinerButton = new CategoryButton(scene, audioManager, scene.scale.width / 1.23, 325,
            'Eyeliner',
            null,
            'stitchedButtonIcon',
            'categoryButtonHighlighted',
            'eyelinerIcon',
            () => {
                scene.MakeUpManager.displayMakeUpButtons('Eyeliner', scene);
            }
        ),
        scene.eyeshadowButton = new CategoryButton(scene, audioManager, scene.scale.width / 1.23, 425,
            'Eyeshadow',
            null,
            'stitchedButtonIcon',
            'categoryButtonHighlighted',
            'eyeshadowIcon',
            () => {
                scene.MakeUpManager.displayMakeUpButtons('Eyeshadow', scene);
            }
        ),
        scene.lipstickButton = new CategoryButton(scene, audioManager, scene.scale.width / 1.23, 525,
            'Lipstick',
            null,
            'stitchedButtonIcon',
            'categoryButtonHighlighted',
            'lipstickIcon',
            () => {
                scene.MakeUpManager.displayMakeUpButtons('Lips', scene);
            }
        ),
        scene.eyecolorButton = new CategoryButton(scene, audioManager, scene.scale.width / 1.23, 625,
            'Eye Color',
            null,
            'stitchedButtonIcon',
            'categoryButtonHighlighted',
            'eyeColorIcon',
            () => {
                scene.MakeUpManager.displayMakeUpButtons('Pupil', scene);
            }
        ),
        scene.blushButton = new CategoryButton(scene, audioManager, scene.scale.width / 1.23, 725,
            'Blush',
            null,
            'stitchedButtonIcon',
            'categoryButtonHighlighted',
            'blushIcon',
            () => {
                scene.MakeUpManager.displayMakeUpButtons('Blush', scene);
            }
        ),
        scene.stickerButton = new CategoryButton(scene, audioManager, scene.scale.width / 1.23, 825,
            'Sticker',
            null,
            'stitchedButtonIcon',
            'categoryButtonHighlighted',
            'stickerIcon',
            () => {
                scene.MakeUpManager.displayMakeUpButtons('Sticker', scene);
            }
        ),
        scene.hairButton = new CategoryButton(scene, audioManager, scene.scale.width / 1.23, 925,
            'Hair',
            null,
            'stitchedButtonIcon',
            'categoryButtonHighlighted',
            'hairIcon',
            () => {
                scene.MakeUpManager.displayMakeUpButtons('Hair', scene);
            }
        )
    ];

    scene.makeUpCategoryButtons = buttons;

    return buttons;
}


export function createDressUpCategoryButtons(scene, audioManager) {
    const buttons = [
        scene.dressButton = new CategoryButton(scene, audioManager, layout.dressUpCategoryButtons.dressButton.x, layout.dressUpCategoryButtons.dressButton.y, '', null, 'stitchedButtonIcon', 'categoryButtonHighlighted', 'dressIcon', () => {
            scene.DressUpManager.displayDressUpButtons('Dress', scene);
        }),
        scene.outerButton = new CategoryButton(scene, audioManager, layout.dressUpCategoryButtons.outerButton.x, layout.dressUpCategoryButtons.outerButton.y, '', null, 'stitchedButtonIcon', 'categoryButtonHighlighted', 'outerIcon', () => {
            scene.DressUpManager.displayDressUpButtons('Outer', scene);
        }),
        scene.underwearButton = new CategoryButton(scene, audioManager, layout.dressUpCategoryButtons.underwearButton.x, layout.dressUpCategoryButtons.underwearButton.y, '', null, 'stitchedButtonIcon', 'categoryButtonHighlighted', 'underwearIcon', () => {
            scene.DressUpManager.displayDressUpButtons('Underwear', scene);
        }),
        scene.socksButton = new CategoryButton(scene, audioManager, layout.dressUpCategoryButtons.socksButton.x, layout.dressUpCategoryButtons.socksButton.y, '', null, 'stitchedButtonIcon', 'categoryButtonHighlighted', 'socksIcon', () => {
            scene.DressUpManager.displayDressUpButtons('Socks', scene);
        }),
        scene.shoesButton = new CategoryButton(scene, audioManager, layout.dressUpCategoryButtons.shoesButton.x, layout.dressUpCategoryButtons.shoesButton.y, '', null, 'stitchedButtonIcon', 'categoryButtonHighlighted', 'shoesIcon', () => {
            scene.DressUpManager.displayDressUpButtons('Shoes', scene);
        }),

        //scene.dressUpCategoryButtonsContainer = scene.add.container(0, 0, scene.dressButton, scene.outerButton, scene.underwearButton, scene.socksButton, scene.shoesButton)
    ];

    scene.dressUpCategoryButtons = buttons;

    return buttons
}

export function disableDressUpMakeUpCategoryButtons(scene) {
    scene.dressUpCategoryButtons?.forEach(buttons => buttons.disableInteractive())
    scene.makeUpCategoryButtons?.forEach(buttons => buttons.disableInteractive())
}

export function enableDressUpMakeUpCategoryButtons(scene) {
    scene.dressUpCategoryButtons?.forEach(buttons => buttons.setInteractive())
    scene.makeUpCategoryButtons?.forEach(buttons => buttons.setInteractive())
}

export function createDummyButtons(scene, audioManager) {
    const buttons = [
        scene.dummyButton = new CategoryButton(scene, audioManager, -1000, -1000, '', null, 'stitchedButtonIcon', 'categoryButtonHighlighted', 'dressIcon', () => { }),
        scene.dummyButton1 = new CategoryButton(scene, audioManager, -1000, -1000, '', null, 'stitchedButtonIcon', 'categoryButtonHighlighted', 'dressIcon', () => { }),
        scene.dummyButton2 = new CategoryButton(scene, audioManager, -1000, -1000, '', null, 'stitchedButtonIcon', 'categoryButtonHighlighted', 'dressIcon', () => { }),
        scene.dummyButton3 = new CategoryButton(scene, audioManager, -1000, -1000, '', null, 'stitchedButtonIcon', 'categoryButtonHighlighted', 'dressIcon', () => { }),
    ]


    return buttons
}

