const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isPortrait = isMobile;

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
    //Tirai
    drapes: {
        
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

    face:{

        zoomInFaceX: 1920 / 2 * 1.011,
        zoomInFaceY: 1080 / 2 / 1.21,
        zoomInTargetFaceScale: 1,

        zoomOutFaceX: 1920 / 2 / 1.115,
        zoomOutFaceY: 1080 / 2 / 2.19,
        zoomOutTargetFaceScale: 0.3,

    },

    Hair:{

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
    
};

const PORTRAIT = {
    WIDTH: 720,
    HEIGHT: 1280,
    // character position
    character: {
        x: 720 / 2 / 1.1,
        y: 1280 / 2 / 0.9,
        scale: 0.6,
        zoomInX: 720 / 2 * 1.05,
        zoomInY: 1280 / 2 * 2.6,
        zoomInScale: 1.9,
        
        
    },

    //Tirai
    drapes: {
        
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
    face:{

        zoomInFaceX: 720 / 2 * 0.95,
        zoomInFaceY: 1280 / 2 / 1.2,
        zoomInTargetFaceScale: 1,

        zoomOutFaceX: 720 / 2 / 1.13,
        zoomOutFaceY: 1280 / 2 / 1.79,
        zoomOutTargetFaceScale: 0.3,

    },
    //Hair
    Hair:{

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