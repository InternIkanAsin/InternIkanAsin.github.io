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
    // character position
    character: {
        x: 1920 / 2 / 1.1,
        y: 1080 / 2 / 0.9,
        scale: 0.6,
        zoomInX: 960 * 1.05,
        zoomInY: 540 * 2.9,
        zoomInScale: 1.9,


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
    //backroundminigame
    background: {
        
        displayHeight: 1280 
    },

    //Tirai
    drapes: {
        displayHeight: 1280,
        
        closed: {
            leftX: -50 ,
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
        x: 1920 / 2,
        y: 1080 - 100
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