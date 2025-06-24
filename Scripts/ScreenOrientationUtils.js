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
            Underwear: { x: 890, y: 740 },
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
        scale: 0.8,
        
        tickMarkOffsetX: 100,
        tickMarkOffsetY: 50 
    },

    //Background minigame
    background: {
        displayHeight: null
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

        zoomInHairX: 1920 / 2 * 1.04,
        zoomInHairY: 1080 / 2 * 1.58,
        zoomInTargetHairScale: 0.8,

        zoomOutHairX: 1920 / 2 / 1.105,
        zoomOutHairY: 1080 / 2 / 1.44,
        zoomOutHairScale: 0.25,

    },
    // Side Panel
    sidePanel: {
        x: 1920 - 70,
        y: 1080 / 2
    },
    // Finish Button
    finishButton: {
        x: 1920 / 2,
        y: 1080 - 100
    },

    //Dialogue System
    dialogueBox: {
        x: LANDSCAPE_CENTERX,
        y: LANDSCAPE_HEIGHT * 1.32,
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
    },

    removeAllButton: {
        x: 70,
        y: 500,
    }

    
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
            Underwear: { x: 342, y: 853 },
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
        scale: 0.6, 
        tickMarkOffsetX: 70,
        tickMarkOffsetY: 40
    },

    //backroundminigame
    background: {
        
        displayHeight: 1280 
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
        x: 1920 - 70,
        y: 1080 / 2
    },
    // Finish Button
    finishButton: {
        x: 720 / 2,
        y: 1280 - 100
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
    },

    removeAllButton: {
        x: 70,
        y: 250,
    },

    dressUpCategoryButtons: {
        dressButton: {
            x: 60,
            y: 425
        },
        outerButton: {
            x: 60,
            y: 600
        },
        underwearButton: {
            x: 60,
            y: 775
        },
        socksButton: {
            x: 60,
            y: 950
        },
        shoesButton: {
            x: 60,
            y: 1125
        },
    },

    readyButton: {

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