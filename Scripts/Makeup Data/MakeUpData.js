import { MakeUp } from './MakeUp.js';
const makeUpData = [
    //Default
    new MakeUp('Default Lips', 'Lips', 'LipNormalDefault'),
    new MakeUp('Default Eyebrows', 'Eyebrows', 'EyebrowNormalDefault'),
    new MakeUp('Default Eyelashes', 'Eyelashes', 'EyelashesNormalDefault'),
    // Blush Data
    new MakeUp('Blush 1', 'Blush', 'blushanime', 'buttonIcon2', 'blushanimeIcon'),
    new MakeUp('Blush 2', 'Blush', 'blushfever', 'buttonIcon2', 'blushfeverIcon'),
    new MakeUp('Blush 3', 'Blush', 'blushfrackles', 'buttonIcon2', 'blushfracklesIcon'),
    new MakeUp('Blush 4', 'Blush', 'blushlove', 'buttonIcon2', 'blushloveIcon'),
    new MakeUp('Blush 5', 'Blush', 'blushorange', 'buttonIcon2', 'blushorangeIcon'),
    new MakeUp('Blush 6', 'Blush', 'blushpink', 'buttonIcon2', 'blushpinkIcon'),
    new MakeUp('Blush 7', 'Blush', 'blushnose', 'buttonIcon2', 'blushnoseIcon'),
    new MakeUp('Blush 8', 'Blush', 'blushround', 'buttonIcon2', 'blushroundIcon'),

    // Eyebrows Data
    new MakeUp('Eyebrows 1', 'Eyebrows', 'eyebrownormal1', 'buttonIcon2', 'eyebrow1Icon'),
    new MakeUp('Eyebrows 2', 'Eyebrows', 'eyebrownormal2', 'buttonIcon2', 'eyebrow2Icon'),
    new MakeUp('Eyebrows 3', 'Eyebrows', 'eyebrownormal3', 'buttonIcon2', 'eyebrow3Icon'),
    new MakeUp('Eyebrows 4', 'Eyebrows', 'eyebrownormal4', 'buttonIcon2', 'eyebrow4Icon'),
    new MakeUp('Eyebrows 5', 'Eyebrows', 'eyebrownormal5', 'buttonIcon2', 'eyebrow5Icon'),

    // Eyelashes Data
    new MakeUp('Eyelashes1', 'Eyelashes', 'eyelashesnormal1', 'buttonIcon2', 'eyelashes1Icon'),
    new MakeUp('Eyelashes2', 'Eyelashes', 'eyelashesnormal2', 'buttonIcon2', 'eyelashes2Icon'),
    new MakeUp('Eyelashes3', 'Eyelashes', 'eyelashesnormal3', 'buttonIcon2', 'eyelashes3Icon'),
    new MakeUp('Eyelashes4', 'Eyelashes', 'eyelashesnormal4', 'buttonIcon2', 'eyelashes4Icon'),
    new MakeUp('Eyelashes5', 'Eyelashes', 'eyelashesnormal5', 'buttonIcon2', 'eyelashes5Icon'),


    new MakeUp('Eyeliner1', 'Eyeliner', 'eyelinernormal1', 'buttonIcon2', 'eyeliner1Icon'),
    new MakeUp('Eyeliner2', 'Eyeliner', 'eyelinernormal2', 'buttonIcon2', 'eyeliner2Icon'),
    new MakeUp('Eyeliner3', 'Eyeliner', 'eyelinernormal3', 'buttonIcon2', 'eyeliner3Icon'),
    new MakeUp('Eyeliner4', 'Eyeliner', 'eyelinernormal4', 'buttonIcon2', 'eyeliner4Icon'),
    new MakeUp('Eyeliner5', 'Eyeliner', 'eyelinernormal5', 'buttonIcon2', 'eyeliner5Icon'),
    // Eyeshadow Data
    new MakeUp('EyeShadowBrown', 'Eyeshadow', 'eyeshadownormalbrown', 'buttonIcon2', 'eyeshadowbrownIcon'),
    new MakeUp('EyeShadowDragon', 'Eyeshadow', 'eyeshadownormaldragon', 'buttonIcon2', 'eyeshadowdragonIcon'),
    new MakeUp('EyeShadowFairy', 'Eyeshadow', 'eyeshadownormalfairy', 'buttonIcon2', 'eyeshadowfairyIcon'),
    new MakeUp('EyeShadowGold', 'Eyeshadow', 'eyeshadownormalgold', 'buttonIcon2', 'eyeshadowgoldIcon'),
    new MakeUp('EyeShadowGreen', 'Eyeshadow', 'eyeshadownormalgreen', 'buttonIcon2', 'eyeshadowgreenIcon'),
    new MakeUp('EyeShadowOrange', 'Eyeshadow', 'eyeshadownormalorange', 'buttonIcon2', 'eyeshadoworangeIcon'),
    new MakeUp('EyeShadowPeach', 'Eyeshadow', 'eyeshadownormalpeach', 'buttonIcon2', 'eyeshadowpeachIcon'),
    new MakeUp('EyeShadowPink', 'Eyeshadow', 'eyeshadownormalpink', 'buttonIcon2', 'eyeshadowpinkIcon'),
    new MakeUp('EyeShadowPurple', 'Eyeshadow', 'eyeshadownormalpurple', 'buttonIcon2', 'eyeshadowpurpleIcon'),

    // Lips Data
    new MakeUp('LipsBrown', 'Lips', 'lipnormalbrown', 'buttonIcon2', 'lipsbrownIcon'),
    new MakeUp('LipsCherry', 'Lips', 'lipnormalcherry', 'buttonIcon2', 'lipspinkIcon'),
    new MakeUp('LipsOrange', 'Lips', 'lipnormalorange', 'buttonIcon2', 'lipsredIcon'),
    new MakeUp('LipsPink', 'Lips', 'lipnormalpink', 'buttonIcon2', 'lipswineIcon'),
    new MakeUp('LipsRed', 'Lips', 'lipnormalred', 'buttonIcon2', 'lipscherryIcon'),
    new MakeUp('LipsWine', 'Lips', 'lipnormalwine', 'buttonIcon2', 'lipsorangeIcon'),

    // Pupil Data
    new MakeUp('PupilBlue', 'Pupil', 'PupilNormalBlue', 'buttonIcon2', 'pupilblueIcon'),
    new MakeUp('PupilBlack', 'Pupil', 'pupilnormalblack', 'buttonIcon2', 'pupilblackIcon'),
    new MakeUp('PupilDragon', 'Pupil', 'pupilnormaldragon', 'buttonIcon2', 'pupildragonIcon'),
    new MakeUp('PupilFairy', 'Pupil', 'pupilnormalfairy', 'buttonIcon2', 'pupilfairyIcon'),
    new MakeUp('PupilGreen', 'Pupil', 'pupilnormalgreen', 'buttonIcon2', 'pupilgreenIcon'),
    new MakeUp('PupilMagical', 'Pupil', 'pupilnormalmagical', 'buttonIcon2', 'pupilmagicIcon'),
    new MakeUp('PupilPink', 'Pupil', 'pupilnormalpink', 'buttonIcon2', 'pupilpinkIcon'),
    new MakeUp('PupilRed', 'Pupil', 'pupilnormalred', 'buttonIcon2', 'pupilredIcon'),
    new MakeUp('PupilYellow', 'Pupil', 'pupilnormalyellow', 'buttonIcon2', 'pupilyellowIcon'),

    // Sticker Data
    new MakeUp('StickerBlushPink', 'Sticker', 'stickerblushpink', 'buttonIcon2', 'stickerblushpinkIcon'),
    new MakeUp('StickerBlushPurple', 'Sticker', 'stickerblushpurple', 'buttonIcon2', 'stickerblushpurpleIcon'),
    new MakeUp('StickerBlushRed', 'Sticker', 'stickerblushred', 'buttonIcon2', 'stickerblushredIcon'),
    new MakeUp('StickerBlushYellow', 'Sticker', 'stickerblushyellow', 'buttonIcon2', 'stickerblushyellowIcon'),
    new MakeUp('StickerDiamond', 'Sticker', 'stickerdiamond', 'buttonIcon2', 'stickerdiamondIcon'),
    new MakeUp('StickerLove', 'Sticker', 'stickerlove', 'buttonIcon2', 'stickerloveIcon'),
    new MakeUp('StickermoonlightcrownBlue', 'Sticker', 'stickermoonlightcrownblue', 'buttonIcon2', 'stickermoonlightcrownblueIcon'),
    new MakeUp('StickermoonlightcrownPurple', 'Sticker', 'stickermoonlightcrownpurple', 'buttonIcon2', 'stickermoonlightcrownpurpleIcon'),
    new MakeUp('StickermoonlightcrownRed', 'Sticker', 'stickermoonlightcrownred', 'buttonIcon2', 'stickermoonlightcrownredIcon'),
    new MakeUp('StickermoonlightcrownWhite', 'Sticker', 'stickermoonlightcrownwhite', 'buttonIcon2', 'stickermoonlightcrownwhiteIcon'),
    new MakeUp('StickermoonlightcrownYellow', 'Sticker', 'stickermoonlightcrownyellow', 'buttonIcon2', 'stickermoonlightcrownyellowIcon'),
    new MakeUp('StickerprincessTears', 'Sticker', 'stickerprincesstears', 'buttonIcon2', 'stickerprincesstearsIcon'),
    new MakeUp('StickerstarBlue', 'Sticker', 'stickerstarblue', 'buttonIcon2', 'stickerstarblueIcon'),
    new MakeUp('StickerstarPink', 'Sticker', 'stickerstarpink', 'buttonIcon2', 'stickerstarpinkIcon'),
    new MakeUp('StickerstarPurple', 'Sticker', 'stickerstarpurple', 'buttonIcon2', 'stickerstarpurpleIcon'),
    new MakeUp('StickerstarRed', 'Sticker', 'stickerstarred', 'buttonIcon2', 'stickerstarredIcon'),
    new MakeUp('StickerstarYellow', 'Sticker', 'stickerstaryellow', 'buttonIcon2', 'stickerstaryellowIcon'),

    //hair data
     // --- GRUP 1 (ATLAS 01) ---
    new MakeUp('01Black',  'Hair', { front: { atlas: 'hair_front_01', frame: 'hair_01_black_F_out.png'  }, back: { atlas: 'hair_back_01', frame: 'hair_01_black_B_out.png'  } }, 'buttonIcon2', '01blackIcon'),
    new MakeUp('01Blonde', 'Hair', { front: { atlas: 'hair_front_01', frame: 'hair_01_blonde_F_out.png' }, back: { atlas: 'hair_back_01', frame: 'hair_01_blonde_B_out.png' } }, 'buttonIcon2', '01blondeIcon'),
    new MakeUp('01Brown',  'Hair', { front: { atlas: 'hair_front_01', frame: 'hair_01_brown_F_out.png'  }, back: { atlas: 'hair_back_01', frame: 'hair_01_brown_B_out.png'  } }, 'buttonIcon2', '01brownIcon'),
    new MakeUp('01Pink',   'Hair', { front: { atlas: 'hair_front_01', frame: 'hair_01_pink_F_out.png'   }, back: { atlas: 'hair_back_01', frame: 'hair_01_pink_B_out.png'   } }, 'buttonIcon2', '01pinkIcon'),
    
    new MakeUp('02Black',  'Hair', { front: { atlas: 'hair_front_01', frame: 'hair_02_black_F_out.png'  }, back: { atlas: 'hair_back_01', frame: 'hair_02_black_B_out.png'  } }, 'buttonIcon2', '02blackIcon'),
    new MakeUp('02Blonde', 'Hair', { front: { atlas: 'hair_front_01', frame: 'hair_02_blonde_F_out.png' }, back: { atlas: 'hair_back_01', frame: 'hair_02_blonde_B_out.png' } }, 'buttonIcon2', '02blondeIcon'),
    new MakeUp('02Brown',  'Hair', { front: { atlas: 'hair_front_01', frame: 'hair_02_brown_F_out.png'  }, back: { atlas: 'hair_back_01', frame: 'hair_02_brown_B_out.png'  } }, 'buttonIcon2', '02brownIcon'),
    new MakeUp('02Pink',   'Hair', { front: { atlas: 'hair_front_01', frame: 'hair_02_pink_F_out.png'   }, back: { atlas: 'hair_back_01', frame: 'hair_02_pink_B_out.png'   } }, 'buttonIcon2', '02pinkIcon'),

    new MakeUp('03Black',  'Hair', { front: { atlas: 'hair_front_01', frame: 'hair_03_black_F_out.png'  }, back: { atlas: 'hair_back_01', frame: 'hair_03_black_B_out.png'  } }, 'buttonIcon2', '03blackIcon'),
    new MakeUp('03Blonde', 'Hair', { front: { atlas: 'hair_front_01', frame: 'hair_03_blonde_F_out.png' }, back: { atlas: 'hair_back_01', frame: 'hair_03_blonde_B_out.png' } }, 'buttonIcon2', '03blondeIcon'),
    new MakeUp('03Brown',  'Hair', { front: { atlas: 'hair_front_01', frame: 'hair_03_brown_F_out.png'  }, back: { atlas: 'hair_back_01', frame: 'hair_03_brown_B_out.png'  } }, 'buttonIcon2', '03brownIcon'),
    new MakeUp('03Pink',   'Hair', { front: { atlas: 'hair_front_01', frame: 'hair_03_pink_F_out.png'   }, back: { atlas: 'hair_back_01', frame: 'hair_03_pink_B_out.png'   } }, 'buttonIcon2', '03pinkIcon'),

    new MakeUp('04Black',  'Hair', { front: { atlas: 'hair_front_01', frame: 'hair_04_black_F_out.png'  }, back: { atlas: 'hair_back_01', frame: 'hair_04_black_B_out.png'  } }, 'buttonIcon2', '04blackIcon'),
    new MakeUp('04Blonde', 'Hair', { front: { atlas: 'hair_front_01', frame: 'hair_04_blonde_F_out.png' }, back: { atlas: 'hair_back_01', frame: 'hair_04_blonde_B_out.png' } }, 'buttonIcon2', '04blondeIcon'),
    new MakeUp('04Brown',  'Hair', { front: { atlas: 'hair_front_01', frame: 'hair_04_brown_F_out.png'  }, back: { atlas: 'hair_back_01', frame: 'hair_04_brown_B_out.png'  } }, 'buttonIcon2', '04brownIcon'),
    new MakeUp('04Pink',   'Hair', { front: { atlas: 'hair_front_01', frame: 'hair_04_pink_F_out.png'   }, back: { atlas: 'hair_back_01', frame: 'hair_04_pink_B_out.png'   } }, 'buttonIcon2', '04pinkIcon'),

    // --- GRUP 2 (ATLAS 02) ---
    new MakeUp('05Black',  'Hair', { front: { atlas: 'hair_front_02', frame: 'hair_05_black_F_out.png'  }, back: { atlas: 'hair_back_02', frame: 'hair_05_black_B_out.png'  } }, 'buttonIcon2', '05blackIcon'),
    new MakeUp('05Blonde', 'Hair', { front: { atlas: 'hair_front_02', frame: 'hair_05_blonde_F_out.png' }, back: { atlas: 'hair_back_02', frame: 'hair_05_blonde_B_out.png' } }, 'buttonIcon2', '05blondeIcon'),
    new MakeUp('05Brown',  'Hair', { front: { atlas: 'hair_front_02', frame: 'hair_05_brown_F_out.png'  }, back: { atlas: 'hair_back_02', frame: 'hair_05_brown_B_out.png'  } }, 'buttonIcon2', '05brownIcon'),
    new MakeUp('05Pink',   'Hair', { front: { atlas: 'hair_front_02', frame: 'hair_05_pink_F_out.png'   }, back: { atlas: 'hair_back_02', frame: 'hair_05_pink_B_out.png'   } }, 'buttonIcon2', '05pinkIcon'),

    new MakeUp('06Black',  'Hair', { front: { atlas: 'hair_front_02', frame: 'hair_06_black_F_out.png'  }, back: { atlas: 'hair_back_02', frame: 'hair_06_black_B_out.png'  } }, 'buttonIcon2', '06blackIcon'),
    new MakeUp('06Blonde', 'Hair', { front: { atlas: 'hair_front_02', frame: 'hair_06_blonde_F_out.png' }, back: { atlas: 'hair_back_02', frame: 'hair_06_blonde_B_out.png' } }, 'buttonIcon2', '06blondeIcon'),
    new MakeUp('06Brown',  'Hair', { front: { atlas: 'hair_front_02', frame: 'hair_06_brown_F_out.png'  }, back: { atlas: 'hair_back_02', frame: 'hair_06_brown_B_out.png'  } }, 'buttonIcon2', '06brownIcon'),
    new MakeUp('06Pink',   'Hair', { front: { atlas: 'hair_front_02', frame: 'hair_06_pink_F_out.png'   }, back: { atlas: 'hair_back_02', frame: 'hair_06_pink_B_out.png'   } }, 'buttonIcon2', '06pinkIcon'),

    new MakeUp('07Black',  'Hair', { front: { atlas: 'hair_front_02', frame: 'hair_07_black_F_out.png'  }, back: { atlas: 'hair_back_02', frame: 'hair_07_black_B_out.png'  } }, 'buttonIcon2', '07blackIcon'),
    new MakeUp('07Blonde', 'Hair', { front: { atlas: 'hair_front_02', frame: 'hair_07_blonde_F_out.png' }, back: { atlas: 'hair_back_02', frame: 'hair_07_blonde_B_out.png' } }, 'buttonIcon2', '07blondeIcon'),
    new MakeUp('07Brown',  'Hair', { front: { atlas: 'hair_front_02', frame: 'hair_07_brown_F_out.png'  }, back: { atlas: 'hair_back_02', frame: 'hair_07_brown_B_out.png'  } }, 'buttonIcon2', '07brownIcon'),
    new MakeUp('07Pink',   'Hair', { front: { atlas: 'hair_front_02', frame: 'hair_07_pink_F_out.png'   }, back: { atlas: 'hair_back_02', frame: 'hair_07_pink_B_out.png'   } }, 'buttonIcon2', '07pinkIcon'),

    new MakeUp('08Black',  'Hair', { front: { atlas: 'hair_front_02', frame: 'hair_08_black_F_out.png'  }, back: { atlas: 'hair_back_02', frame: 'hair_08_black_B_out.png'  } }, 'buttonIcon2', '08blackIcon'),
    new MakeUp('08Blonde', 'Hair', { front: { atlas: 'hair_front_02', frame: 'hair_08_blonde_F_out.png' }, back: { atlas: 'hair_back_02', frame: 'hair_08_blonde_B_out.png' } }, 'buttonIcon2', '08blondeIcon'),
    new MakeUp('08Brown',  'Hair', { front: { atlas: 'hair_front_02', frame: 'hair_08_brown_F_out.png'  }, back: { atlas: 'hair_back_02', frame: 'hair_08_brown_B_out.png'  } }, 'buttonIcon2', '08brownIcon'),
    new MakeUp('08Pink',   'Hair', { front: { atlas: 'hair_front_02', frame: 'hair_08_pink_F_out.png'   }, back: { atlas: 'hair_back_02', frame: 'hair_08_pink_B_out.png'   } }, 'buttonIcon2', '08pinkIcon'),
    
    // --- GRUP 3 (ATLAS 03) ---
    new MakeUp('09Black',  'Hair', { front: { atlas: 'hair_front_03', frame: 'hair_09_black_F_out.png'  }, back: { atlas: 'hair_back_03', frame: 'hair_09_black_B_out.png'  } }, 'buttonIcon2', '09blackIcon'),
    new MakeUp('09Blonde', 'Hair', { front: { atlas: 'hair_front_03', frame: 'hair_09_blonde_F_out.png' }, back: { atlas: 'hair_back_03', frame: 'hair_09_blonde_B_out.png' } }, 'buttonIcon2', '09blondeIcon'),
    new MakeUp('09Brown',  'Hair', { front: { atlas: 'hair_front_03', frame: 'hair_09_brown_F_out.png'  }, back: { atlas: 'hair_back_03', frame: 'hair_09_brown_B_out.png'  } }, 'buttonIcon2', '09brownIcon'),
    new MakeUp('09Pink',   'Hair', { front: { atlas: 'hair_front_03', frame: 'hair_09_pink_F_out.png'   }, back: { atlas: 'hair_back_03', frame: 'hair_09_pink_B_out.png'   } }, 'buttonIcon2', '09pinkIcon'),

    new MakeUp('10Black',  'Hair', { front: { atlas: 'hair_front_03', frame: 'hair_10_black_F_out.png'  }, back: { atlas: 'hair_back_03', frame: 'hair_10_black_B_out.png'  } }, 'buttonIcon2', '10blackIcon'),
    new MakeUp('10Blonde', 'Hair', { front: { atlas: 'hair_front_03', frame: 'hair_10_blonde_F_out.png' }, back: { atlas: 'hair_back_03', frame: 'hair_10_blonde_B_out.png' } }, 'buttonIcon2', '10blondeIcon'),
    new MakeUp('10Brown',  'Hair', { front: { atlas: 'hair_front_03', frame: 'hair_10_brown_F_out.png'  }, back: { atlas: 'hair_back_03', frame: 'hair_10_brown_B_out.png'  } }, 'buttonIcon2', '10brownIcon'),
    new MakeUp('10Violet', 'Hair', { front: { atlas: 'hair_front_03', frame: 'hair_10_violet_F_out.png' }, back: { atlas: 'hair_back_03', frame: 'hair_10_violet_B_out.png' } }, 'buttonIcon2', '10violetBIcon'),

    new MakeUp('11Black',  'Hair', { front: { atlas: 'hair_front_03', frame: 'hair_11_black_F_out.png'  }, back: { atlas: 'hair_back_03', frame: 'hair_11_black_B_out.png'  } }, 'buttonIcon2', '11blackIcon'),
    new MakeUp('11Blonde', 'Hair', { front: { atlas: 'hair_front_03', frame: 'hair_11_blonde_F_out.png' }, back: { atlas: 'hair_back_03', frame: 'hair_11_blonde_B_out.png' } }, 'buttonIcon2', '11blondeBIcon'),
    new MakeUp('11Brown',  'Hair', { front: { atlas: 'hair_front_03', frame: 'hair_11_brown_F_out.png'  }, back: { atlas: 'hair_back_03', frame: 'hair_11_brown_B_out.png'  } }, 'buttonIcon2', '11brownBIcon'),
    new MakeUp('11Pink',   'Hair', { front: { atlas: 'hair_front_03', frame: 'hair_11_pink_F_out.png'   }, back: { atlas: 'hair_back_03', frame: 'hair_11_pink_B_out.png'   } }, 'buttonIcon2', '11pinkBIcon'),
];

export const defaultMakeUpSkins = {
    'Lips': 'LipNormalDefault',
    'Eyebrows': 'EyebrowNormalDefault',
    'Eyelashes': 'EyelashesNormalDefault',
    'Pupil': 'PupilNormalBlue',
    'Hair': { front: 'hair', back: '01blackB' }
};

const MakeUpPositions = {
    Eyebrows: { x: 0, y: 0 },
    Eyelashes: { x: 0, y: 0 },
    Eyeliner: { x: 0, y: 0 },
    Eyeshadow: { x: 0, y: 0 },
    Lips: { x: 0, y: 0 },
    Pupil: { x: 0, y: 0 },
    Sticker: { x: 0, y: 0 },
    Blush: { x: 0, y: 0 },

}

export { makeUpData, MakeUpPositions }