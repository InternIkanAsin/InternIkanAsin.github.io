const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
//const isMobile = true;
const isPortrait = isMobile;

const LANDSCAPE_WIDTH = 1920;
const LANDSCAPE_HEIGHT = 1080;
const LANDSCAPE_CENTERX = LANDSCAPE_WIDTH / 2;
const LANDSCAPE_CENTERY = LANDSCAPE_HEIGHT / 2;
const LANDSCAPE = {
    WIDTH: 1920,
    HEIGHT: 1080,

    outfit: {
        positions: {
            Dress: { x: 872, y: 646.5 },
            Shirt: { x: 872.5, y: 439 },
            Outer: { x: 872.5, y: 479.5 },
            Lower: { x: 890, y: 740 },
            Socks: { x: 911.5, y: 770 },
            Shoes: { x: 922, y: 907 }
        },
        customSizes: {
            dress18: { width: 944, height: 900 },
            dress19: { width: 944, height: 900 },
            dress20: { width: 944, height: 900 },
            outer8: { width: 530, height: 565 }
        },
        manualOffsets: {
            outer14: { x: 0, y: -40 },
            underwear2: { x: 0, y: 0 },
            underwear3: { x: 0, y: 0 },
            underwear4: { x: -15, y: 20 },
            underwear5: { x: -15, y: 20 },
            underwear6: { x: -15, y: 20 },
            underwear7: { x: -15, y: 20 },
            underwear8: { x: -15, y: 20 },
            underwear9: { x: -15, y: 20 },
            underwear10: { x: -15, y: 20 }
        }
    },

    // character position
    character: {
        x: 1920 / 2 / 1.1,
        y: 1080 / 2 / 0.9,
        scale: 0.6,
        zoomInX: 960 * 1.05,
        zoomInY: 540 * 2.9,
        zoomInScale: 1.9,


    },

    //minigameburron
    selectionButtons: {

        dressUpX: (1920 / 2) - 350,
        makeUpX: (1920 / 2) + 350,
        y: 1080 / 2,
        scale: 0.8 * 2,

        tickMarkOffsetX: 100,
        tickMarkOffsetY: 50
    },

    //Background minigame
    background: {
        originX: 0.5,
        originY: 0.5,
        x: 1920 / 2,
        y: 1080 / 2,
        scale: 1
    },

    //Tirai
    drapes: {
        displayHeight: null,
        closed: {
            leftX: (1920 / 2) / 2,
            rightX: 1920 - ((1920 / 2) / 2)
        },

        open: {
            leftX: -500,
            rightX: 1920 + 500
        },

        halfway: {
            leftX: (1920 * 0.25) - 600,
            rightX: (1920 * 0.75) + 600
        }
    },

    curtain: {
        leftTexture: 'leftCurtain',
        rightTexture: 'rightCurtain',
        closed: {
            leftX: (1920 / 2) / 4.8,
            rightX: 1920 - ((1920 / 2) / 4.8)
        },

        open: {
            leftX: -500,
            rightX: 1920 + 500
        },

        halfway: {
            leftX: (1920 * 0.25) - 600,
            rightX: (1920 * 0.75) + 600
        }


    },

    face: {

        zoomInFaceX: 1920 / 2 * 1.011,
        zoomInFaceY: 1080 / 2 / 1.21,
        zoomInTargetFaceScale: 1,

        zoomOutFaceX: 1920 / 2 / 1.115,
        zoomOutFaceY: 1080 / 2 / 2.19,
        zoomOutTargetFaceScale: 0.3,

    },

    Hair: {

        zoomInHairX: 1920 / 2 * 1.035,
        zoomInHairY: 1080 / 2 * 1.553,
        zoomInTargetHairScale: 1.6,

        zoomOutHairX: 1920 / 2 / 1.103,
        zoomOutHairY: 1080 / 2 / 1.45,
        zoomOutHairScale: 0.5,

    },
    // Side Panel
    sidePanel: {
        x: 1920 - 70,
        y: 1080 / 2,
        left: 45,
        right: 10,
        top: 105,
        bottom: 30,
        panel: 30
    },
    sidePanelLine: {
        x: LANDSCAPE_WIDTH - 70,
        y: LANDSCAPE_CENTERY / 3.9,
    },
    sidePanelIcon: {
        x: LANDSCAPE_WIDTH - 55,
        y: LANDSCAPE_CENTERY / 5.1
    },
    sidePanelHeaderText: {
        x: LANDSCAPE_WIDTH - 180,
        y: 110,
        fontSize: 48
    },
    // Finish Button
    finishButton: {
        x: 1920 / 2,
        y: 1080 - 200
    },

    //Dialogue System
    dialogueBox: {
        x: LANDSCAPE_CENTERX,
        y: LANDSCAPE_CENTERY * 1.5,
        width: 1200,
        height: 300
    },

    dialogueText: {
        x: LANDSCAPE_WIDTH / 4.7,
        y: LANDSCAPE_HEIGHT / 1.5,
        fontSize: 36,
        wordWrap: LANDSCAPE_WIDTH - (LANDSCAPE_WIDTH / 2.4)
    },

    backButton: {
        x: LANDSCAPE_WIDTH * 0.08,
        y: LANDSCAPE_HEIGHT * 0.1,
        scale: 0.22 * 2
    },

    removeAllButton: {
        x: 70,
        y: 500,
        buttonScale: 0.8 * 2, 
        iconScale: 0.7 * 2 
    },

    itemPanelButton: {
        iconScale: 0.5 * 2,
        buttonScale: 0.8 * 2,
        textYPosition: 70
    },

    categoryButton: {
        iconScale: 0.5 * 2,
        buttonScale: 0.6 * 2
    },
    makeUpButton: {
        iconScale: 1.2 * 2,
        highlightImg: 0.8 * 2,
        buttonScale: 0.8 * 2
    },
    outfitButton: {
        iconScale: 1.2,
        highlightImg: 0.8 * 2,
        buttonScale: 0.8 * 2
    },
    //Dressup Category
    dressUpCategoryButtons: {
        dressButton: { x: 1536, y: 175 },
        outerButton: { x: 1536, y: 350 },
        LowerButton: { x: 1536, y: 525 },
        socksButton: { x: 1536, y: 700 },
        shoesButton: { x: 1536, y: 875 }
    },

    makeUpCategoryButtons: {
        eyebrowsButton: { x: LANDSCAPE_WIDTH / 1.23, y: 125 },
        eyelashesButton: { x: LANDSCAPE_WIDTH / 1.23, y: 225 },
        eyelinerButton: { x: LANDSCAPE_WIDTH / 1.23, y: 325 },
        eyeshadowButton: { x: LANDSCAPE_WIDTH / 1.23, y: 425 },
        lipstickButton: { x: LANDSCAPE_WIDTH / 1.23, y: 525 },
        eyecolorButton: { x: LANDSCAPE_WIDTH / 1.23, y: 625 },
        blushButton: { x: LANDSCAPE_WIDTH / 1.23, y: 725 },
        stickerButton: { x: LANDSCAPE_WIDTH / 1.23, y: 825 },
        hairButton: { x: LANDSCAPE_WIDTH / 1.23, y: 925 },
    },

};
const PORTRAIT_WIDTH = 720;
const PORTRAIT_HEIGHT = 1280;
const PORTRAIT_CENTERX = PORTRAIT_WIDTH / 2;
const PORTRAIT_CENTERY = PORTRAIT_HEIGHT / 2;
const PORTRAIT = {
    PORTRAIT_WIDTH,
    PORTRAIT_HEIGHT,
    PORTRAIT_CENTERX,
    PORTRAIT_CENTERY,
    // character position
    character: {
        x: 720 / 2 / 1.1,
        y: 1280 / 2 / 0.9,
        scale: 0.6,
        zoomInX: 720 / 2 * 1.05,
        zoomInY: 1280 / 2 * 2.6,
        zoomInScale: 1.9,


    },

    outfit: {
        positions: {
            Dress: { x: 327, y: 757.5 },
            Shirt: { x: 327, y: 549 },
            Outer: { x: 328.5, y: 590.5 },
            Lower: { x: 342, y: 853 },
            Socks: { x: 365.5, y: 878 },
            Shoes: { x: 378, y: 1022 }
        },

        customSizes: {
            dress18: { width: 944, height: 900 },
            dress19: { width: 944, height: 900 },
            dress20: { width: 944, height: 900 },
            outer8: { width: 530, height: 565 }
        },
        manualOffsets: {
            outer14: { x: 0, y: -40 },
            underwear2: { x: 0, y: 0 },
            underwear3: { x: 0, y: 0 },
            underwear4: { x: -15, y: 20 },
            underwear5: { x: -15, y: 20 },
            underwear6: { x: -15, y: 20 },
            underwear7: { x: -15, y: 20 },
            underwear8: { x: -15, y: 20 },
            underwear9: { x: -15, y: 20 },
            underwear10: { x: -15, y: 20 }
        }
    },

    //Minigame Buttons
    selectionButtons: {

        dressUpX: (720 / 2) - 180,
        makeUpX: (720 / 2) + 180,
        y: 1280 / 2,
        scale: 0.6 * 2,
        tickMarkOffsetX: 70,
        tickMarkOffsetY: 40
    },

    //backroundminigame
    background: {
        originX: 0,
        originY: 0.5,
        x: 0,
        y: 1280 / 2,
        scale: 1280 / 1080
    },

    //Tirai
    drapes: {
        displayHeight: 1280,

        closed: {
            leftX: -50,
            rightX: 835
        },

        open: {
            leftX: -500,
            rightX: 720 + 500
        },

        halfway: {
            leftX: (720 * 0.25) - 600,
            rightX: (720 * 0.75) + 600
        }
    },

    curtain: {
        leftTexture: 'leftCurtainUntied',
        rightTexture: 'rightCurtainUntied',
        closed: {
            leftX: (720 / 2) / 4.8,
            rightX: 720 - ((720 / 2) / 4.8)
        },

        open: {
            leftX: -500,
            rightX: 720 + 500
        },

        halfway: {
            leftX: (720 * 0.25) - 600,
            rightX: (720 * 0.75) + 600
        }


    },

    //Face
    face: {

        zoomInFaceX: 720 / 2 * 0.95,
        zoomInFaceY: 1280 / 2 / 1.2,
        zoomInTargetFaceScale: 1,

        zoomOutFaceX: 720 / 2 / 1.13,
        zoomOutFaceY: 1280 / 2 / 1.79,
        zoomOutTargetFaceScale: 0.3,

    },
    //Hair
    Hair: {

        zoomInHairX: 720 / 2,
        zoomInHairY: 1280 / 2 * 1.47,
        zoomInTargetHairScale: 0.8,

        zoomOutHairX: 720 / 2 / 1.1,
        zoomOutHairY: 1280 / 2 / 1.31,
        zoomOutHairScale: 0.25,

    },
    // Side Panel
    sidePanel: {
        x: PORTRAIT_WIDTH + 50,
        y: PORTRAIT_CENTERY,
        left: 0,
        right: 65,
        top: 105,
        bottom: 30,
        panel: 30
    },
    sidePanelLine: {
        x: PORTRAIT_WIDTH + 30,
        y: PORTRAIT_CENTERY / 2.7,
    },
    sidePanelIcon: {
        x: PORTRAIT_WIDTH - 20,
        y: PORTRAIT_CENTERY / 3.2
    },
    sidePanelHeaderText: {
        x: PORTRAIT_WIDTH - 110,
        y: 200,
        fontSize: 32
    },
    // Finish Button
    finishButton: {
        x: PORTRAIT_CENTERX,
        y: PORTRAIT_HEIGHT - 50
    },
    //Dialogue System
    dialogueBox: {
        x: PORTRAIT_CENTERX,
        y: PORTRAIT_CENTERY * 1.4,
        width: 680,
        height: 250
    },
    dialogueText: {
        x: PORTRAIT_WIDTH / 13,
        y: PORTRAIT_CENTERY * 1.3,
        fontSize: 32,
        wordWrap: PORTRAIT_WIDTH - 120
    },

    backButton: {
        x: PORTRAIT_WIDTH * 0.18,
        y: PORTRAIT_HEIGHT * 0.06,
        scale: 0.22 * 2
    },

    removeAllButton: {
        x: 70,
        y: 250,
        buttonScale: 0.8 * 2, // 
        iconScale: 0.7 * 2 
    },

    //Category Buttons
    dressUpCategoryButtons: {
        dressButton: {
            x: 55,
            y: 425
        },
        outerButton: {
            x: 55,
            y: 575
        },
        LowerButton: {
            x: 55,
            y: 725
        },
        socksButton: {
            x: 55,
            y: 875
        },
        shoesButton: {
            x: 55,
            y: 1025
        },
    },

    makeUpCategoryButtons: {
        eyebrowsButton: {
            x: 45,
            y: 400
        },
        eyelashesButton: {
            x: 45,
            y: 500
        },
        eyelinerButton: {
            x: 45,
            y: 600
        },
        eyeshadowButton: {
            x: 45,
            y: 700
        },
        lipstickButton: {
            x: 45,
            y: 800
        },
        eyecolorButton: {
            x: 45,
            y: 900
        },
        blushButton: {
            x: 45,
            y: 1000
        },
        stickerButton: {
            x: 45,
            y: 1100
        },
        hairButton: {
            x: 45,
            y: 1200
        },
    },
    outfitButton: {
        iconScale: 1,
        highlightImg: 0.6,
        buttonScale: 0.6 * 2
    },

    makeUpButton: {
        iconScale: 1 * 2,
        highlightImg: 0.6,
        buttonScale: 0.6 * 2
    },

    itemPanelButton: {
        iconScale: 0.4 * 2,
        buttonScale: 0.6 * 2,
        textYPosition: 60
    },

    categoryButton: {
        iconScale: 0.4 * 2,
        buttonScale: 0.5 * 2,
    }
};
export const layout = isPortrait ? PORTRAIT : LANDSCAPE;
export const orientation = { isPortrait, isMobile };

console.log(
    `%c[LayoutManager] Initialized.`,
    'color: #4CAF50; font-weight: bold;'
);

if (isPortrait) {
    console.log(
        `%c>> Mode: PORTRAIT (Mobile Detected)`,
        'color: #2196F3;'
    );
} else {
    console.log(
        `%c>> Mode: LANDSCAPE (Desktop Detected)`,
        'color: #FFC107;'
    );
}

// Anda juga bisa log objek layout yang aktif untuk debugging
console.log('>> Active Layout Config:', layout);