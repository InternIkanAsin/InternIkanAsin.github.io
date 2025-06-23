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
        zoomOurHairY: 1080 / 2 / 1.44,
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
        x: 1080 / 2, 
        y: 1920 / 2, 
        scale: 0.8,
        zoomInx:  1, 
        zoomInY: 1920 * 1.5,
        zoomInScale: 2.2,
    },
    // Side Panel
    sidePanel: {
        
        x: 1080 / 2,
        y: 1920 - 350,
        width: 1080, 
        height: 700  
    },
    // Finish Button
    finishButton: {
        x: 1080 / 2,
        y: 1920 - 100
    },
    
};
export const layout = isPortrait ? PORTRAIT : LANDSCAPE;
export const orientation = { isPortrait, isMobile };