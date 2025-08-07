const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isPortrait = isMobile;

const LANDSCAPE_WIDTH = 1920;
const LANDSCAPE_HEIGHT = 1080;
const LANDSCAPE_CENTERX = LANDSCAPE_WIDTH / 2;
const LANDSCAPE_CENTERY = LANDSCAPE_HEIGHT / 2;
const LANDSCAPE = {
    WIDTH: 1920,
    HEIGHT: 1080,

    muteButton: {
        default: { x: LANDSCAPE_WIDTH * 0.05, y: LANDSCAPE_HEIGHT * 0.1, scale: 0.28 },
        minigame: { x: LANDSCAPE_WIDTH * 0.15, y: LANDSCAPE_HEIGHT * 0.1, scale: 0.28 }
    },

    CisiniLogo: {
        x: (1920 / 4) * 1.8 ,
        y: 1080 * 0.35,
        scale: 1,
        depth: 5
    },

    playerCharacter: {
        
        container: { x: LANDSCAPE_WIDTH * 0.8, y: LANDSCAPE_HEIGHT * 1, scale: 2 },
        parts: {
            body:       { x: 0, y: 0, scale: 0.6 }, // 0.6 (skala asli) / 0.65 (skala container)
            hairBack:   { x: -4.6, y: -225, scale: 0.6 }, // Skala: ~0.568 / 0.65
            shirt:      { x: -2, y: -160, scale: 0.6 }, // Skala: 0.6 / 0.65
            lower:      { x: 0, y: 200, scale: 0.65 }, // Skala: 1.2 / 0.65
            faceContainer: { x: -14, y: -357, scale: 0.315 }, // Skala: 0.3 / 0.65
            hairFront:  { x: -4.6, y: -225, scale: 0.6 }
        }
    },

    outfit: {
        positions: {
            Dress: { x: 872, y: 646.5 },
            Shirt: { x: 872.5, y: 439 },
            Outer: { x: 872.5, y: 479.5 },
            Lower: { x: 890, y: 740 },
            Socks: { x: 911.5, y: 770 },
            Shoes: { x: 922, y: 917 }
        },
        customSizes: {
            'Corset dress': { width: 944, height: 900 },
            'Red heart white mini dress': { width: 944, height: 900 },
            'Holiday dress': { width: 944, height: 900 },
            'Grey jacket': { width: 555, height: 565 }
        },
        manualOffsets: {
            'Pink set': { x: 1, y: 0 },
            'Grey jacket': { x: 2, y: 0 },
            'White Shirt': { x: 0, y: -40 },
            'Mini A-line skirt': { x: -18, y: 20 },
            'Asymmetrical mini skirt': { x: -15, y: 20 },
            'High waist mini skirt': { x: -18, y: 20 },
            'Pleated A line skirt': { x: -18, y: 20 },
            'Denim ruffled skirt': { x: -15, y: 20 },
            'Jewelled skirt': { x: -15, y: 20 },
            'Dark grey skirt': { x: -15, y: 20 },
            'Strapped open shoes': { x: 0, y: -5 },
            'Red opened shoe': { x: 0, y: -5 }
        }
    },

    bachelorPps: {
        y: LANDSCAPE_HEIGHT * 0.7,
        scale: 0.9,
        spacing: 200, 
        xOffset: -270 
    },

    loadingBar: {
        y: LANDSCAPE_HEIGHT * 0.9,
        displayWidth: 1500, 
        displayHeight: 100, 
        fillOffset: { x: 10, y: 10 },
        cornerRadius: 30
    },

    percentText: {
        yOffset: 0, // Relatif terhadap pusat bar
        style: { font: '42px regularFont', fill: '#FFFFFF' }
    },

    minigameFinishButton: {
        x: 140,
        y: 525 + (75 * 1.6) + 60,
        scale: 0.4,
        useNineSlice: false,
        textOffsetX: 5,
        texture: 'readyButtonIcon',
        width: 200,
        height: 150,
        textSize: 45
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
        originX: 0.5,
        originY: 0.5,
        x: 1920 / 2,
        y: 1080 / 2,
        scale: 0.6
    },

    //Background Cutscene
    cutsceneBG: {
        x: 1920 / 2,
        y: 1080 / 2,
        depth: -1,
        width: 1920,
        height: 1080,

    },
    //Tirai
    drapes: {
        displayHeight: null,
        closed: {
            leftX: (1920 / 2) / 2 + 50,
            rightX: 1920 - ((1920 / 2) / 2 + 50)
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

        zoomInFaceX: 1920 / 2 * 1.01,
        zoomInFaceY: 1080 / 2 / 1.23,
        zoomInTargetFaceScale: 1,

        zoomOutFaceX: 1920 / 2 / 1.115,
        zoomOutFaceY: 1080 / 2 / 2.19,
        zoomOutTargetFaceScale: 0.3,

    },

    Hair: {

        zoomInHairX: 1920 / 2 * 1.035,
        zoomInHairY: 1080 / 2 * 1.553,
        zoomInTargetHairScale: 1.6 * 256 / 225,

        zoomOutHairX: 1920 / 2 / 1.103,
        zoomOutHairY: 1080 / 2 / 1.45,
        zoomOutHairScale: 0.5 * 256 / 225,

    },
    // Side Panel
    sidePanel: {
        x: 1920 - 190,
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
        y: 1080 - 200,
        textSize: 60
    },

    //Dialogue System
    dialogueBox: {
        x: LANDSCAPE_CENTERX,
        y: LANDSCAPE_CENTERY * 1.725,
        width: 630,
        height: 300
    },

    dialogueText: {
        x: LANDSCAPE_WIDTH / 2.775,
        y: LANDSCAPE_HEIGHT / 1.3,
        fontSize: 32,
        wordWrap: LANDSCAPE_WIDTH - (LANDSCAPE_WIDTH / 1.45)
    },

    backButton: {
        x: LANDSCAPE_WIDTH * 0.06,
        y: LANDSCAPE_HEIGHT * 0.1,
        scale: 0.14 * 2,
        iconScale: 0.16 * 2
    },

    removeAllButton: {
        x: 120,
        y: 500,
        buttonScale: 0.6 * 2,
        iconScale: 0.5 * 2
    },

    itemPanelButton: {
        iconScale: 0.5 * 2,
        buttonScale: 0.8 * 2,
        textYPosition: 70
    },

    categoryButton: {
        iconScale: 0.5,
        buttonScale: 0.6 * 2
    },
    makeUpButton: {
        iconLockedX: 68,
        iconLockedY: 64,
        iconScale: 1.2,
        highlightImg: 0.8 * 2,
        buttonScale: 0.8 * 2,
        lockedIconBgScale: 0.5,
        lockedIconScale: 1.5,
        textYPosition: 130,
        textSize: '24px'
    },
    outfitButton: {
        iconLockedX: 68,
        iconLockedY: 64,
        iconScale: 1.2,
        highlightImg: 0.8 * 2,
        buttonScale: 0.8 * 2,
        lockedIconBgScale: 0.5,
        lockedIconScale: 1.5,
        textYPosition: 130,
        textSize: '24px'
    },
    //Dressup Category
    dressUpCategoryButtons: {
        dressButton: { x: 1350, y: 175 },
        outerButton: { x: 1350, y: 350 },
        LowerButton: { x: 1350, y: 525 },
        socksButton: { x: 1350, y: 700 },
        shoesButton: { x: 1350, y: 875 }
    },

    makeUpCategoryButtons: {
        eyebrowsButton: { x: 1370, y: 125 },
        eyelashesButton: { x: 1370, y: 225 },
        eyelinerButton: { x: 1370, y: 325 },
        eyeshadowButton: { x: 1370, y: 425 },
        lipstickButton: { x: 1370, y: 525 },
        eyecolorButton: { x: 1370, y: 625 },
        blushButton: { x: 1370, y: 725 },
        stickerButton: { x: 1370, y: 825 },
        hairButton: { x: 1370, y: 925 },
    },

    MakeupPosition: {
        Pupil: { x: -1, y: -10, scale: 0.59 },
        Lips: { x: -1, y: -10, scale: 0.59 },
        Eyelashes: { x: -1, y: -10, scale: 0.59 },
        Eyebrows: { x: -5, y: -15, scale: 0.59 },
        Eyeliner: { x: -5, y: -10, scale: 0.59 },
        Eyeshadow: { x: -5, y: -10, scale: 0.59 },
        Sticker: { x: 0, y: 0, scale: 0.55 },
        Blush: { x: 0, y: 0, scale: 0.55 },
    },

    applyMakeUpPanel: {
        x: 0,
        y: 0,
        width: 900,
        height: 125
    },

    applyMakeUpText: {
        x: 0,
        y: 0,
        fontSize: 40,
        wordWrap: 120
    },

    applyMakeUpContainer: {
        x: LANDSCAPE_CENTERX,
        y: -100,
        targetYPosition: 100
    },

    nextLevelButton: {
        x: LANDSCAPE_WIDTH / 1.6,
        y: LANDSCAPE_CENTERY
    },

    restartButton: {
        x: LANDSCAPE_WIDTH / 2.7,
        y: LANDSCAPE_CENTERY
    },

    particleOffsets: {
        Dress: { x: 0, y: 0 },
        Shirt: { x: 0, y: 0 },
        Outer: { x: 0, y: 0 },
        Lower: { x: 0, y: 0 },
        Socks: { x: 0, y: 200 },
        Shoes: { x: 0, y: 100 },
        //Lips: { w: 100, h: 0 },
        //Eyebrows: { w: 5000, h: 0 },
        //Eyelashes: { w: 0, h: 0 },
        //Eyeshadow: { w: 0, h: 0 },
        //Blush: { w: 0, h: 50 },
        //Eyeliner: { w: 0, h: 0 }
    },
    particleSizeAdjustments: {
        Dress: { w: 0, h: 0 },
        Outer: { w: 0, h: 0 },
        Lower: { w: 0, h: 0 },
        Socks: { w: 0, h: -100 },
        Shoes: { w: 0, h: 0 },
        Lips: { w: 0, h: 0 },
        Eyebrows: { w: 0, h: 0 },
        Eyelashes: { w: 0, h: 0 },
        Eyeshadow: { w: 0, h: 0 },
        Blush: { w: 0, h: 0 },
        Eyeliner: { w: 0, h: 0 }
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

    muteButton: {
        // Posisi untuk Cutscene 1, Selection, dan Cutscene 2
        default: { x: PORTRAIT_WIDTH - 60, y: 70, scale: 0.22 },
        // Posisi khusus saat berada di dalam Minigame
        minigame: { x: PORTRAIT_WIDTH - 60, y: 70, scale: 0.22 } // Di portrait, posisinya mungkin sama
    },

    playerCharacter: {
        
        container: { x: LANDSCAPE_WIDTH * 0.1, y: LANDSCAPE_HEIGHT * 1.05, scale: 1.3 },
        parts: {
            body:       { x: 0, y: 0, scale: 0.6 }, // 0.6 (skala asli) / 0.65 (skala container)
            hairBack:   { x: -4.6, y: -225, scale: 0.6 }, // Skala: ~0.568 / 0.65
            shirt:      { x: -2, y: -160, scale: 0.6 }, // Skala: 0.6 / 0.65
            lower:      { x: 0, y: 200, scale: 0.65 }, // Skala: 1.2 / 0.65
            faceContainer: { x: -14, y: -357, scale: 0.315 }, // Skala: 0.3 / 0.65
            hairFront:  { x: -4.6, y: -225, scale: 0.6 }
        }
    },

    CisiniLogo: {
        x: (720 / 4) * 3 / 1.5,
        y: 1280 * 0.25,
        scale: 0.8,
        depth: 5
    },

    bachelorPps: {
        scale: 0.7,
        positions: [
            { key: 'PP_Azril',  x: PORTRAIT_WIDTH * 0.85, y: PORTRAIT_HEIGHT * 0.50 },
            { key: 'PP_Angga',  x: PORTRAIT_WIDTH * 0.63, y: PORTRAIT_HEIGHT * 0.50 },
            { key: 'PP_Reza',   x: PORTRAIT_WIDTH * 0.85, y: PORTRAIT_HEIGHT * 0.62 },
            { key: 'PP_Indra',  x: PORTRAIT_WIDTH * 0.63, y: PORTRAIT_HEIGHT * 0.62 },
            { key: 'PP_Keenan', x: PORTRAIT_WIDTH * 0.74, y: PORTRAIT_HEIGHT * 0.74 }
        ]
    },

    loadingBar: {
        y: PORTRAIT_HEIGHT * 0.9,
        displayWidth: 700, 
        displayHeight: 80, 
        fillOffset: { x: 10, y: 10 },
        cornerRadius: 30
    },

    percentText: {
        yOffset: 0, // Relatif terhadap pusat bar
        style: { font: '42px regularFont', fill: '#FFFFFF' }
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
            'Corset dress': { width: 944, height: 900 },
            'Red heart white mini dress': { width: 944, height: 900 },
            'Holiday dress': { width: 944, height: 900 },
            'Grey jacket': { width: 555, height: 565 }
        },
        manualOffsets: {
            'Pink set': { x: 0, y: 0 },
            'White Shirt': { x: 0, y: -40 },
            'Mini A-line skirt': { x: -15, y: 20 },
            'Asymmetrical mini skirt': { x: -15, y: 20 },
            'High waist mini skirt': { x: -15, y: 20 },
            'Pleated A line skirt': { x: -15, y: 20 },
            'Denim ruffled skirt': { x: -15, y: 20 },
            'Jewelled skirt': { x: -15, y: 20 },
            'Dark grey skirt': { x: -15, y: 20 },
        }
    },

    //Minigame Buttons
    selectionButtons: {

        dressUpX: (720 / 2) - 180,
        makeUpX: (720 / 2) + 180,
        y: 1280 / 2,
        scale: 0.8,
        tickMarkOffsetX: 70,
        tickMarkOffsetY: 40
    },

    //Background minigame
    background: {
        originX: 0,
        originY: 0.5,
        x: -300,
        y: 1280 / 2,
        scale: 1280 / 1080
    },

    //Background Cutscene
    cutsceneBG: {
        x: 720 / 2,
        y: 1280 / 2,
        depth: -1,
        width: 720 * 2.2,
        height: 1280,

    },

    //Tirai gede
    drapes: {
        displayHeight: 1280,

        closed: {
            leftX: 180,
            rightX: PORTRAIT_WIDTH - 180
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
    //tirai kelipet
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
        zoomInHairY: 1280 / 2 * 1.46,
        zoomInTargetHairScale: 0.8 * 2 * 256 / 225,

        zoomOutHairX: 720 / 2 / 1.107,
        zoomOutHairY: 1280 / 2 / 1.325,
        zoomOutHairScale: 0.25 * 2 * 256 / 225,

    },
    // Side Panel
    sidePanel: {
        x: PORTRAIT_WIDTH + 50,
        y: PORTRAIT_CENTERY,
        left: 120,
        right: 0,
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
        y: PORTRAIT_HEIGHT - 60,
        textSize: 60
    },

    minigameFinishButton: {
        x: PORTRAIT_CENTERX,
        y: PORTRAIT_HEIGHT - 60,
        scale: 0.7,
        useNineSlice: true,
        textOffsetX: 0,
        texture: 'readyButtonIcon',
        width: 600,
        height: 150,
        textSize: 60
    },
    //Dialogue System
    dialogueBox: {
        x: PORTRAIT_CENTERX,
        y: PORTRAIT_CENTERY * 1.4,
        width: 680,
        height: 250
    },
    dialogueText: {
        x: PORTRAIT_WIDTH / 15,
        y: PORTRAIT_CENTERY * 1.3,
        fontSize: 32,
        wordWrap: PORTRAIT_WIDTH - 80
    },

    backButton: {
        x: PORTRAIT_WIDTH * 0.12,
        y: PORTRAIT_HEIGHT * 0.06,
        scale: 0.22 * 1.5
    },

    removeAllButton: {
        x: 70,
        y: 250,
        buttonScale: 0.8 * 2,
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
        iconLockedX: 54,
        iconLockedY: 54,
        iconScale: 1,
        highlightImg: 0.6 * 2,
        buttonScale: 0.6 * 2,
        lockedIconBgScale: 0.4,
        lockedIconScale: 1.3,
        textYPosition: 60,
        textSize: '20px'
    },

    makeUpButton: {
        iconLockedX: 52,
        iconLockedY: 52,
        iconScale: 1,
        highlightImg: 0.6 * 2,
        buttonScale: 0.6 * 2,
        lockedIconBgScale: 0.4,
        lockedIconScale: 1.3,
        textYPosition: 60,
        textSize: '20px'
    },

    MakeupPosition: {
        Pupil: { x: -1, y: -10, scale: 0.59 },
        Lips: { x: -1, y: -10, scale: 0.59 },
        Eyelashes: { x: -1, y: -10, scale: 0.59 },
        Eyebrows: { x: -5, y: -15, scale: 0.59 },
        Eyeliner: { x: -5, y: -10, scale: 0.55 },
        Eyeshadow: { x: -5, y: -10, scale: 0.59 },
        Sticker: { x: 0, y: 0, scale: 0.55 },
        Blush: { x: 0, y: 0, scale: 0.55 },
    },


    itemPanelButton: {
        iconScale: 0.4 * 2,
        buttonScale: 0.6 * 2,
        textYPosition: 60
    },

    categoryButton: {
        iconScale: 0.5,
        buttonScale: 0.5 * 2,
    },

    applyMakeUpPanel: {
        x: 0,
        y: 0,
        width: 500,
        height: 125
    },

    applyMakeUpText: {
        x: 0,
        y: 0,
        fontSize: 32,
        wordWrap: 250
    },

    applyMakeUpContainer: {
        x: PORTRAIT_CENTERX * 1.2,
        y: -100,
        targetYPosition: 70
    },

    nextLevelButton: {
        x: PORTRAIT_CENTERX,
        y: PORTRAIT_HEIGHT / 2.4
    },

    restartButton: {
        x: PORTRAIT_CENTERX,
        y: PORTRAIT_HEIGHT / 1.9
    },

    particleOffsets: {
        Dress: { x: 0, y: -200 },
        Shirt: { x: 0, y: 0 },
        Outer: { x: 0, y: -50 },
        Lower: { x: 0, y: 20 },
        Socks: { x: 0, y: 150 },
        Shoes: { x: 0, y: 50 },
        //Lips: { w: 1000, h: 1000 },
        //Eyebrows: { w: 1000, h: 1000 },
        //Eyelashes: { w: 0, h: 0 },
        //Eyeshadow: { w: 0, h: 0 },
        //Blush: { w: 0, h: 0 },
        //Eyeliner: { w: 0, h: 0 }
    },

    particleSizeAdjustments: {
        Dress: { w: -120, h: 0 },
        Shirt: { w: -120, h: 0 },
        Outer: { w: -70, h: 0 },
        Lower: { w: -70, h: -50 },
        Socks: { w: 0, h: -200 },
        Shoes: { w: 0, h: -20 },
        //Lips: { w: 0, h: 0 },
        //Eyebrows: { w: 0, h: 0 },
        //Eyelashes: { w: 0, h: 0 },
        //Eyeshadow: { w: 0, h: 0 },
        //Blush: { w: 0, h: 0 },
        //Eyeliner: { w: 0, h: 0 }
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