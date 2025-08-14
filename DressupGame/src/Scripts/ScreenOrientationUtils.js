const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isPortrait = isMobile;

const LANDSCAPE_WIDTH = 1920;
const LANDSCAPE_HEIGHT = 1080;
const LANDSCAPE_CENTERX = LANDSCAPE_WIDTH / 2;
const LANDSCAPE_CENTERY = LANDSCAPE_HEIGHT / 2;
const LANDSCAPE = {
    WIDTH: 1920,
    HEIGHT: 1080,

    grid: {
        columns: 2,
        space: { column: 110, row: 90 }
    },

    muteButton: {
        default: { x: LANDSCAPE_WIDTH * 0.05, y: LANDSCAPE_HEIGHT * 0.1, scale: 0.28 },
        minigame: { x: LANDSCAPE_WIDTH * 0.15, y: LANDSCAPE_HEIGHT * 0.1, scale: 0.28 }
    },

    cutscene1: {

        phone: { x: LANDSCAPE_CENTERX, y: 1080 / 1.3, scale: 1.5 },
        phoneBackground: { x: LANDSCAPE_CENTERX, y: 1080 / 1.7, width: 700, height: 900 },
        profilePic: { x: LANDSCAPE_CENTERX, y: 1080 / 2.5, scale: 1.2 },
        nameText: { x: LANDSCAPE_CENTERX, y: 1080 / 1.7, fontSize: '64px' },
        callStatus: { x: LANDSCAPE_CENTERX, y: 1080 / 1.55, fontSize: '32px' },
        acceptButton: { x: LANDSCAPE_CENTERX, y: 1080 / 1.15 },
        scale: 0.8,
        bachelorSprite: {
            // Nilai ini didasarkan pada kode Anda yang sudah ada
            x: LANDSCAPE_CENTERX + 55,
            y: LANDSCAPE_HEIGHT / 2 * 1.7, // y = 918
            scale: 1 // Skala container adalah 1, karena gambar di dalamnya sudah di-scale 2x
        }
    },

    CisiniLogo: {
        x: (1920 / 4) * 1.8,
        y: 1080 * 0.35,
        scale: 1,
        depth: 5
    },

    playerCharacter: {

        container: { x: LANDSCAPE_WIDTH * 0.8, y: LANDSCAPE_HEIGHT * 1, scale: 2 },
        parts: {
            body: { x: 0, y: 0, scale: 0.6 }, // 0.6 (skala asli) / 0.65 (skala container)
            hairBack: { x: -4.6, y: -225, scale: 0.6 }, // Skala: ~0.568 / 0.65
            shirt: { x: -2, y: -160, scale: 0.6 }, // Skala: 0.6 / 0.65
            lower: { x: 0, y: 200, scale: 0.65 }, // Skala: 1.2 / 0.65
            faceContainer: { x: -14, y: -357, scale: 0.315 }, // Skala: 0.3 / 0.65
            hairFront: { x: -4.6, y: -225, scale: 0.6 }
        }
    },

    outfit: {
        positions: {
            Dress: { x: 872 - 300, y: 646.5 },
            Shirt: { x: 872.5 - 300, y: 439 },
            Outer: { x: 872.5 - 300, y: 479.5 },
            Lower: { x: 890 - 300, y: 740 },
            Socks: { x: 911.5 - 300, y: 770 },
            Shoes: { x: 922 - 300, y: 917 }
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
            'White Shirt': { x: 0, y: 0 },
            'Mini A-line skirt': { x: -18, y: 20 },
            'Asymmetrical mini skirt': { x: -15, y: 20 },
            'High waist mini skirt': { x: -18, y: 20 },
            'Pleated A line skirt': { x: -18, y: 20 },
            'Denim ruffled skirt': { x: -15, y: 20 },
            'Jewelled skirt': { x: -15, y: 20 },
            'Dark grey skirt': { x: -15, y: 20 },
            'Strapped open shoes': { x: 0, y: -5 },
            'Red opened shoe': { x: 0, y: -5 },
            'Green sport jacket': { x: 0, y: -40 }
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
        y: 525 + (75 * 1.6) + 100,
        useNineSlice: false,
        textOffsetX: 5,
        texture: 'readyButtonIcon',
        width: 200,
        height: 150,
        textSize: 45,
        iconScale: 0.32,
        buttonScale: 0.3
    },

    // character position
    character: {
        x: 1920 / 2 / 1.1 - 300,
        y: 1080 / 2 / 0.9,
        scale: 0.6,
        zoomInX: 960 * 1.05 - 350,
        zoomInY: 540 * 2.9,
        zoomInScale: 1.9,

        halfZoomX: LANDSCAPE_CENTERX,
        halfZoomY: LANDSCAPE_HEIGHT * 0.9,
        halfZoomScale: 1.0

    },

    //minigameburron
    selectionButtons: {

        dressUpX: (1920 / 2) - 350,
        makeUpX: (1920 / 2) + 350,
        y: 1080 / 2,
        scale: 0.5,

        tickMarkOffsetX: 100,
        tickMarkOffsetY: 50,
        tickMarkScale: 1.1
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

        zoomInFaceX: 1920 / 2 * 1.01 - 350,
        zoomInFaceY: 1080 / 2 / 1.23,
        zoomInTargetFaceScale: 1,

        zoomOutFaceX: 1920 / 2 / 1.115 - 300,
        zoomOutFaceY: 1080 / 2 / 2.19,
        zoomOutTargetFaceScale: 0.3,

        halfZoomFaceX: LANDSCAPE_CENTERX - 16, // Sedikit offset dari tengah
        halfZoomFaceY: LANDSCAPE_HEIGHT * 0.355,
        halfZoomFaceScale: 0.5

    },

    Hair: {
        zoomInHairX: 1920 / 2 * 1.035 - 350,
        zoomInHairY: 1080 / 2 * 1.553,
        zoomInTargetHairScale: 1.6 * 256 / 225,

        zoomOutHairX: 1920 / 2 / 1.103 - 300,
        zoomOutHairY: 1080 / 2 / 1.45,
        zoomOutHairScale: 0.5 * 256 / 225,

        halfZoomHairX: LANDSCAPE_CENTERX - 5,
        halfZoomHairY: LANDSCAPE_HEIGHT * 0.5415,
        halfZoomHairScale: 0.8 * 256 / 225

    },
    // Side Panel
    sidePanel: {
        x: 1920 - 400,
        y: 1080 / 2,
        left: 220,
        right: 0,
        top: 120,
        bottom: 0,
        panel: 30,
        width: 800,
        height: 1080
    },
    categorySidePanel: {
        left: 0,
        right: 120,
        top: 75,
        bottom: 70,
        panel: 50
    },
    sidePanelLine: {
        x: LANDSCAPE_WIDTH - 340,
        y: 90,
    },
    sidePanelIcon: {
        x: LANDSCAPE_WIDTH - 225,
        y: 50
    },
    sidePanelHeaderText: {
        x: LANDSCAPE_WIDTH - 370,
        y: 50,
        fontSize: 54
    },
    // Finish Button
    finishButton: {
        x: 1920 / 2,
        y: 1080 - 200,
        textSize: 60,
        iconScale: 0.6,
        buttonScale: 0.7,
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

    namedDialogueBox: {
        x: LANDSCAPE_CENTERX,
        y: LANDSCAPE_CENTERY * 1.725,
        width: 1200,
        height: 300
    },

    namedDialogueText: {
        x: LANDSCAPE_CENTERX * 0.45,
        y: LANDSCAPE_HEIGHT / 1.25,
        fontSize: 32,
        wordWrap: 1000
    },

    namedDialogueNameBox: {
        width: 70,
        height: 25,
        offsetX: 220
    },

    backButton: {
        x: LANDSCAPE_WIDTH * 0.06,
        y: LANDSCAPE_HEIGHT * 0.1,
        scale: 0.14 * 2,
        iconScale: 0.16 * 2
    },
    randomizeButton: {
        x: 120,
        y: 350,
        scale: 0.16 * 2,
        iconScale: 0.155 * 2
    },

    removeAllButton: {
        x: 120,
        y: 540,
        buttonScale: 0.16 * 2,
        iconScale: 0.155 * 2
    },

    itemPanelButton: {
        iconScale: 0.6 * 2,
        buttonScale: 0.9 * 2,
        textYPosition: 80
    },

    categoryButton: {
        width: 650,
        height: 510,
        iconScale: 0.5,
        buttonScale: 0.6 * 2,
        popOutY: -20
    },
    makeUpButton: {
        iconLockedX: 68,
        iconLockedY: 64,
        iconScale: 1.3,
        highlightImg: 0.9 * 2,
        buttonScale: 0.9 * 2,
        lockedIconBgScale: 0.6,
        lockedIconScale: 1.6,
        textYPosition: 140,
        textSize: '24px'
    },
    outfitButton: {
        iconLockedX: 68,
        iconLockedY: 64,
        iconScale: 1.3,
        highlightImg: 0.9 * 2,
        buttonScale: 0.9 * 2,
        lockedIconBgScale: 0.6,
        lockedIconScale: 1.6,
        textYPosition: 140,
        textSize: '24px'
    },
    //Dressup Category
    dressUpCategoryButtons: {
        dressButton: { x: 1100, y: 150 },
        outerButton: { x: 1100, y: 350 },
        LowerButton: { x: 1100, y: 550 },
        socksButton: { x: 1100, y: 750 },
        shoesButton: { x: 1100, y: 950 }
    },

    makeUpCategoryButtons: {
        eyebrowsButton: { x: 1100, y: 125 },
        eyelashesButton: { x: 1100, y: 225 },
        eyelinerButton: { x: 1100, y: 325 },
        eyeshadowButton: { x: 1100, y: 425 },
        lipstickButton: { x: 1100, y: 525 },
        eyecolorButton: { x: 1100, y: 625 },
        blushButton: { x: 1100, y: 725 },
        stickerButton: { x: 1100, y: 825 },
        hairButton: { x: 1100, y: 925 },
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
        x: LANDSCAPE_CENTERX,
        y: LANDSCAPE_CENTERY + 100,
        texture: 'YellowButton',
        width: 1000,
        height: 300,
        textSize: 90,
        useNineSlice: true,
        nineSliceConfig: {
            left: 40, right: 40, top: 40, bottom: 50
        }
    },

    restartButton: {
        x: LANDSCAPE_CENTERX,
        y: LANDSCAPE_CENTERY + 350,
        texture: 'blueButton2',
        width: 700,
        height: 300,
        textSize: 90,
        useNineSlice: true,
        nineSliceConfig: {
            left: 40, right: 40, top: 40, bottom: 50
        }
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
    },

    cutscene2: {
        glitterParticles: {
            // Konfigurasi untuk glitter yang melayang
            drifting: {
                speedX: { min: -100, max: 0 },
                speedY: { min: -20, max: -40 },
                lifespan: { min: 5000, max: 10000 },
                scale: { start: 0.1, end: 0 },
                quantity: 8,
                frequency: 500
            },
            // Konfigurasi untuk kilauan statis
            sparkle: {
                speed: 0,
                lifespan: { min: 400, max: 800 },
                scale: { start: 0.2, end: 0 },
                quantity: 1,
                frequency: 200
            }
        }
    },

    endingPanel: {
        confettiBurst: {
            speed: { min: 400, max: 700 },
            angle: { min: 210, max: 330 },
            scale: { start: 2, end: 0 },
            lifespan: 3000,
            gravityY: 400,
            quantity: 100,
            blendMode: 'NORMAL'
        }
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

        halfZoomX: PORTRAIT_CENTERX,
        halfZoomY: PORTRAIT_HEIGHT * 0.65,
        halfZoomScale: 1.0
    },

    cutscene1: {
        // Di portrait, kita buat telepon lebih besar dan lebih ke tengah
        phone: { x: PORTRAIT_CENTERX, y: PORTRAIT_CENTERY + 80, scale: 5 },
        phoneBackground: { x: PORTRAIT_CENTERX, y: PORTRAIT_CENTERY * 1, width: 720, height: 1280 }, // Lebih ramping dan tinggi
        profilePic: { x: PORTRAIT_CENTERX, y: PORTRAIT_CENTERY * 0.7, scale: 1.1 },
        nameText: { x: PORTRAIT_CENTERX, y: PORTRAIT_CENTERY * 1.05, fontSize: '72px' }, // Font lebih besar
        callStatus: { x: PORTRAIT_CENTERX, y: PORTRAIT_CENTERY * 1.18, fontSize: '40px' },
        acceptButton: { x: PORTRAIT_CENTERX, y: PORTRAIT_CENTERY * 1.45 },
        scale: 0.4,
        bachelorSprite: {
            x: PORTRAIT_CENTERX * 1.0,
            y: PORTRAIT_HEIGHT * 0.3,
            scale: 0.9
        },

        onCall: {
            // Posisi Y baru untuk teks setelah diangkat
            nameTextY: PORTRAIT_HEIGHT * 0.1,
            callStatusY: PORTRAIT_HEIGHT * 0.18,

            // Konfigurasi untuk background telepon yang menciut
            phoneBackgroundShrinkY: 1.5, // Menciut menjadi 80% dari tinggi aslinya

            // Posisi baru untuk bachelor full-body
            bachelorSprite: {
                x: PORTRAIT_CENTERX,
                y: PORTRAIT_HEIGHT * 0.5, // Lebih tinggi dari sebelumnya
                scale: 0.65
            },

            // Posisi untuk dialog
            dialogueBox: {
                x: PORTRAIT_CENTERX,
                y: PORTRAIT_HEIGHT * 0.75, // Lebih tinggi dari biasanya
                width: 1000,
                height: 300
            },
            dialogueText: {
                x: PORTRAIT_WIDTH / 15,
                y: PORTRAIT_HEIGHT * 0.7, // Lebih tinggi dari biasanya
                wordWrap: PORTRAIT_WIDTH - 80
            },

            // Posisi untuk tombol tutup telepon
            endCallButton: {
                x: PORTRAIT_CENTERX,
                y: PORTRAIT_HEIGHT * 0.9
            }
        }
    },

    actionButtons: {
        randomize: { x: 80, y: 325 },
        removeAll: { x: 80, y: 465 },
        finish: { x: 90, y: 620, iconScale: 0.32, buttonScale: 0.3 }
    },

    categoryBar: {
        x: PORTRAIT_CENTERX - 50,
        y: PORTRAIT_HEIGHT * 0.75,

        width: 140,
        height: PORTRAIT_WIDTH,

        columns: 5,
        space: { column: 200 }
    },

    bottomPanel: {
        x: PORTRAIT_CENTERX,
        y: PORTRAIT_HEIGHT * 0.89,
        width: PORTRAIT_WIDTH,
        height: 300,
        space: { top: 20, bottom: 20, left: 60, right: 0, panel: 10 }
    },

    grid: {
        columns: 4,
        space: { column: 20, row: 30 }
    },

    categoryButton: {
        width: 510,
        height: 630,
        iconScale: 0.5,
        buttonScale: 0.5 * 2,
        popOutY: -20
    },

    muteButton: {
        default: { x: PORTRAIT_WIDTH - 80, y: 70, scale: 0.22 },
        minigame: { x: PORTRAIT_WIDTH - 80, y: 70, scale: 0.22 }
    },

    playerCharacter: {

        container: { x: LANDSCAPE_WIDTH * 0.1, y: LANDSCAPE_HEIGHT * 1.05, scale: 1.3 },
        parts: {
            body: { x: 0, y: 0, scale: 0.6 }, // 0.6 (skala asli) / 0.65 (skala container)
            hairBack: { x: -4.6, y: -225, scale: 0.6 }, // Skala: ~0.568 / 0.65
            shirt: { x: -2, y: -160, scale: 0.6 }, // Skala: 0.6 / 0.65
            lower: { x: 0, y: 200, scale: 0.65 }, // Skala: 1.2 / 0.65
            faceContainer: { x: -14, y: -357, scale: 0.315 }, // Skala: 0.3 / 0.65
            hairFront: { x: -4.6, y: -225, scale: 0.6 }
        }
    },

    CisiniLogo: {
        x: (720 / 4) * 3 / 1.5,
        y: 1280 * 0.25,
        scale: 0.7,
        depth: 5
    },

    bachelorPps: {
        scale: 0.7,
        positions: [
            { key: 'PP_Azril', x: PORTRAIT_WIDTH * 0.85, y: PORTRAIT_HEIGHT * 0.50 },
            { key: 'PP_Angga', x: PORTRAIT_WIDTH * 0.63, y: PORTRAIT_HEIGHT * 0.50 },
            { key: 'PP_Reza', x: PORTRAIT_WIDTH * 0.85, y: PORTRAIT_HEIGHT * 0.62 },
            { key: 'PP_Indra', x: PORTRAIT_WIDTH * 0.63, y: PORTRAIT_HEIGHT * 0.62 },
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
        scale: 0.45,
        tickMarkOffsetX: 70,
        tickMarkOffsetY: 40,
        tickMarkScale: 1.1
    },

    //Background minigame
    background: {
        originX: 0,
        originY: 0.5,
        x: 0,
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

        halfZoomFaceX: PORTRAIT_CENTERX - 16,
        halfZoomFaceY: PORTRAIT_HEIGHT * 0.19,
        halfZoomFaceScale: 0.5

    },
    //Hair
    Hair: {

        zoomInHairX: 720 / 2,
        zoomInHairY: 1280 / 2 * 1.46,
        zoomInTargetHairScale: 0.8 * 2 * 256 / 225,

        zoomOutHairX: 720 / 2 / 1.107,
        zoomOutHairY: 1280 / 2 / 1.325,
        zoomOutHairScale: 0.25 * 2 * 256 / 225,

        halfZoomHairX: PORTRAIT_CENTERX - 5,
        halfZoomHairY: PORTRAIT_HEIGHT * 0.345,
        halfZoomHairScale: 0.8 * 256 / 225

    },
    // Side Panel
    sidePanel: {
        x: PORTRAIT_WIDTH - 300,
        y: PORTRAIT_CENTERY,
        left: 120,
        right: 0,
        top: 75,
        bottom: 30,
        panel: 40
    },
    sidePanelLine: {
        x: PORTRAIT_WIDTH,
        y: PORTRAIT_CENTERY / 3,
    },
    sidePanelIcon: {
        x: PORTRAIT_WIDTH + 80,
        y: PORTRAIT_CENTERY / 3.5
    },
    sidePanelHeaderText: {
        x: PORTRAIT_WIDTH - 50,
        y: 0,
        fontSize: 40
    },
    // Finish Button
    finishButton: {
        x: PORTRAIT_CENTERX,
        y: PORTRAIT_HEIGHT - 200,
        textSize: 60,
        iconScale: 0.32,
        buttonScale: 0.3,
    },

    minigameFinishButton: {
        x: 90,
        y: 620,
        useNineSlice: true,
        textOffsetX: 0,
        texture: 'readyButtonIcon',
        width: 600,
        height: 150,
        textSize: 60,
        iconScale: 0.32,
        buttonScale: 0.3
    },
    //Dialogue System
    dialogueBox: {
        x: PORTRAIT_CENTERX,
        y: PORTRAIT_CENTERY * 1.35,
        width: 640,
        height: 350
    },
    dialogueText: {
        x: PORTRAIT_WIDTH / 6,
        y: PORTRAIT_CENTERY * 1.15,
        fontSize: 32,
        wordWrap: PORTRAIT_WIDTH - 240
    },

    namedDialogueBox: {
        x: PORTRAIT_CENTERX,
        y: PORTRAIT_CENTERY * 1.4,
        width: 700,
        height: 300
    },

    namedDialogueText: {
        x: PORTRAIT_WIDTH * 0.05,
        y: PORTRAIT_CENTERY * 1.3,
        fontSize: 32,
        wordWrap: PORTRAIT_WIDTH - 60
    },

    namedDialogueNameBox: {
        width: 60,
        height: 30,
        offsetX: 200
    },

    backButton: {
        x: PORTRAIT_WIDTH - 220,
        y: 70,
        scale: 0.22,
        iconScale: 0.22
    },

    removeAllButton: {
        x: 80,
        y: 465,
        buttonScale: 0.24,
        iconScale: 0.24
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
        y: PORTRAIT_CENTERY + 100,
        texture: 'YellowButton',
        width: 1000,
        height: 300,
        textSize: 90,
        useNineSlice: true,
        nineSliceConfig: {
            left: 128, right: 128, top: 68, bottom: 64
        }
    },

    restartButton: {
        x: PORTRAIT_CENTERX,
        y: PORTRAIT_CENTERY + 350,
        texture: 'blueButton2',
        width: 700,
        height: 300,
        textSize: 90,
        useNineSlice: true,
        nineSliceConfig: {
            left: 128, right: 128, top: 68, bottom: 64
        }
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

    randomizeButton: {
        x: 80,
        y: 325,
        buttonScale: 0.24,
        iconScale: 0.24
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
    },

    cutscene2: {
        glitterParticles: {
            drifting: {
                speedx: { min: 0, max: 1 },
                speedy: { min: -5, max: 5 },
                lifespan: { min: 1000, max: 2000 },
                scale: { start: 0.12, end: 0 },
                quantity: 6,
                frequency: 100
            },
            sparkle: {
                speed: 0,
                lifespan: { min: 400, max: 800 },
                scale: { start: 0.15, end: 0 },
                quantity: 1,
                frequency: 250
            }
        }
    },

    endingPanel: {
        confettiBurst: {
            speed: { min: 350, max: 600 },
            angle: { min: 210, max: 330 },
            scale: { start: 1.6, end: 0 },
            lifespan: 3000,
            gravityY: 400,
            quantity: 80,
            blendMode: 'NORMAL'
        }
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