import { MakeUp } from './MakeUp.js';
const makeUpData = [
    //Default
    new MakeUp('Default Lips', 'Lips', 'LipNormalDefault'),
    new MakeUp('Default Eyebrows', 'Eyebrows', 'EyebrowNormalDefault'),
    new MakeUp('Default Eyelashes', 'Eyelashes', 'EyelashesNormalDefault'),

    // Blush Data
    new MakeUp('Blush 1', 'Blush', 'blushanime', 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_blush anime.png' }),
    new MakeUp('Blush 2', 'Blush', 'blushfever', 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_blush fever.png' }),
    new MakeUp('Blush 3', 'Blush', 'blushfrackles', 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_blush frackles.png' }),
    new MakeUp('Blush 4', 'Blush', 'blushlove', 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_blush love.png' }),
    new MakeUp('Blush 5', 'Blush', 'blushorange', 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_blush orange.png' }),
    new MakeUp('Blush 6', 'Blush', 'blushpink', 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_blush pink.png' }),
    new MakeUp('Blush 7', 'Blush', 'blushnose', 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_blush red nose.png' }),
    new MakeUp('Blush 8', 'Blush', 'blushround', 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_blush round.png' }),

    // Eyebrows Data
    new MakeUp('Eyebrows 1', 'Eyebrows', { atlas: 'eyebrow_spritesheet', frame: 'mc_eb 1_normal.png' }, 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_eb 1.png' }),
    new MakeUp('Eyebrows 2', 'Eyebrows', { atlas: 'eyebrow_spritesheet', frame: 'mc_eb 2_normal.png' }, 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_eb 2.png' }),
    new MakeUp('Eyebrows 3', 'Eyebrows', { atlas: 'eyebrow_spritesheet', frame: 'mc_eb 3_normal.png' }, 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_eb 3.png' }),
    new MakeUp('Eyebrows 4', 'Eyebrows', { atlas: 'eyebrow_spritesheet', frame: 'mc_eb 4_normal.png' }, 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_eb 4.png' }),
    new MakeUp('Eyebrows 5', 'Eyebrows', { atlas: 'eyebrow_spritesheet', frame: 'mc_eb 5_normal.png' }, 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_eb 5.png' }),

    // Eyelashes Data
    new MakeUp('Eyelashes1', 'Eyelashes', { atlas: 'eyelashes_spritesheet', frame: 'mc_el 1_normal.png' }, 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_el 1.png' }),
    new MakeUp('Eyelashes2', 'Eyelashes', { atlas: 'eyelashes_spritesheet', frame: 'mc_el 2_normal.png' }, 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_el 2.png' }),
    new MakeUp('Eyelashes3', 'Eyelashes', { atlas: 'eyelashes_spritesheet', frame: 'mc_el 3_normal.png' }, 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_el 3.png' }),
    new MakeUp('Eyelashes4', 'Eyelashes', { atlas: 'eyelashes_spritesheet', frame: 'mc_el 4_normal.png' }, 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_el 4.png' }),
    new MakeUp('Eyelashes5', 'Eyelashes', { atlas: 'eyelashes_spritesheet', frame: 'mc_el 5_normal.png' }, 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_el 5.png' }),

    // Eyeliner Data
    new MakeUp('Eyeliner1', 'Eyeliner', 'eyelinernormal1', 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_er 1.png' }),
    new MakeUp('Eyeliner2', 'Eyeliner', 'eyelinernormal2', 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_er 2.png' }),
    new MakeUp('Eyeliner3', 'Eyeliner', 'eyelinernormal3', 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_er 3.png' }),
    new MakeUp('Eyeliner4', 'Eyeliner', 'eyelinernormal4', 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_er 4.png' }),
    new MakeUp('Eyeliner5', 'Eyeliner', 'eyelinernormal5', 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_er 5.png' }),

    // Eyeshadow Data
    new MakeUp('EyeShadowBrown', 'Eyeshadow', 'eyeshadownormalbrown', 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_brown.png' }),
    new MakeUp('EyeShadowDragon', 'Eyeshadow', 'eyeshadownormaldragon', 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_es dragon.png' }),
    new MakeUp('EyeShadowFairy', 'Eyeshadow', 'eyeshadownormalfairy', 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_es fairy.png' }),
    new MakeUp('EyeShadowGold', 'Eyeshadow', 'eyeshadownormalgold', 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_gold.png' }),
    new MakeUp('EyeShadowGreen', 'Eyeshadow', 'eyeshadownormalgreen', 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_green.png' }),
    new MakeUp('EyeShadowOrange', 'Eyeshadow', 'eyeshadownormalorange', 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_orange.png' }),
    new MakeUp('EyeShadowPeach', 'Eyeshadow', 'eyeshadownormalpeach', 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_peach.png' }),
    new MakeUp('EyeShadowPink', 'Eyeshadow', 'eyeshadownormalpink', 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_pink.png' }),
    new MakeUp('EyeShadowPurple', 'Eyeshadow', 'eyeshadownormalpurple', 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_purple.png' }),

    // Lips Data
    new MakeUp('LipsBrown', 'Lips', 'lipnormalbrown', 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_lips brown.png' }),
    new MakeUp('LipsCherry', 'Lips', 'lipnormalcherry', 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_lips cherry.png' }),
    new MakeUp('LipsOrange', 'Lips', 'lipnormalorange', 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_lips orange.png' }),
    new MakeUp('LipsPink', 'Lips', 'lipnormalpink', 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_lips pink.png' }),
    new MakeUp('LipsRed', 'Lips', 'lipnormalred', 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_lips red.png' }),
    new MakeUp('LipsWine', 'Lips', 'lipnormalwine', 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_lips wine.png' }),

    // Pupil Data
    new MakeUp('PupilBlue', 'Pupil', { atlas: 'pupil_spritesheet', frame: 'mc_pupil blue_normal.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_pupil blue.png' }),
    new MakeUp('PupilBlack', 'Pupil', { atlas: 'pupil_spritesheet', frame: 'mc_pupil black_normal.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_pupil black.png' }),
    new MakeUp('PupilDragon', 'Pupil', { atlas: 'pupil_spritesheet', frame: 'mc_pupil dragon_normal.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_pupil dragon.png' }),
    new MakeUp('PupilFairy', 'Pupil', { atlas: 'pupil_spritesheet', frame: 'mc_pupil fairy_normal.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_pupil fairy.png' }),
    new MakeUp('PupilGreen', 'Pupil', { atlas: 'pupil_spritesheet', frame: 'mc_pupil green_normal.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_pupil green.png' }),
    new MakeUp('PupilMagical', 'Pupil', { atlas: 'pupil_spritesheet', frame: 'mc_pupil magical_normal.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_pupil magic.png' }),
    new MakeUp('PupilPink', 'Pupil', { atlas: 'pupil_spritesheet', frame: 'mc_pupil pink_normal.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_pupil pink.png' }),
    new MakeUp('PupilRed', 'Pupil', { atlas: 'pupil_spritesheet', frame: 'mc_pupil red_normal.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_pupil red.png' }),
    new MakeUp('PupilYellow', 'Pupil', { atlas: 'pupil_spritesheet', frame: 'mc_pupil yellow_normal.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_pupil yellow.png' }),

    // Sticker Data
    new MakeUp('StickerBlushPink', 'Sticker', { atlas: 'sticker_spritesheet', frame: 'mc_sticker manik pink_blush love.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_sticker manik pink_blush love.png' }),
    new MakeUp('StickerBlushPurple', 'Sticker', { atlas: 'sticker_spritesheet', frame: 'mc_sticker manik purple_blush love.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_sticker manik purple_blush love.png' }),
    new MakeUp('StickerBlushRed', 'Sticker', { atlas: 'sticker_spritesheet', frame: 'mc_sticker manik red_blush love.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_sticker manik red_blush love.png' }),
    new MakeUp('StickerBlushYellow', 'Sticker', { atlas: 'sticker_spritesheet', frame: 'mc_sticker manik yellow_blush love.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_sticker manik yellow_blush love.png' }),
    new MakeUp('StickerDiamond', 'Sticker', { atlas: 'sticker_spritesheet', frame: 'mc_sticker manik diamond.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_sticker manik diamond.png' }),
    new MakeUp('StickerLove', 'Sticker', { atlas: 'sticker_spritesheet', frame: 'mc_sticker manik_Love.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_sticker manik_Love.png' }),
    new MakeUp('StickermoonlightcrownBlue', 'Sticker', { atlas: 'sticker_spritesheet', frame: 'mc_sticker manik blue_moonlight crown.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_sticker manik blue_moonlight crown.png' }),
    new MakeUp('StickermoonlightcrownPurple', 'Sticker', { atlas: 'sticker_spritesheet', frame: 'mc_sticker manik purple_moonlight crown.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_sticker manik purple_moonlight crown.png' }),
    new MakeUp('StickermoonlightcrownRed', 'Sticker', { atlas: 'sticker_spritesheet', frame: 'mc_sticker manik red_moonlight crown.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_sticker manik red_moonlight crown.png' }),
    new MakeUp('StickermoonlightcrownWhite', 'Sticker', { atlas: 'sticker_spritesheet', frame: 'mc_sticker manik white_moonlight crown.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_sticker manik white_moonlight crown.png' }),
    new MakeUp('StickermoonlightcrownYellow', 'Sticker', { atlas: 'sticker_spritesheet', frame: 'mc_sticker manik yellow_moonlight crown.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_sticker manik yellow_moonlight crown.png' }),
    new MakeUp('StickerprincessTears', 'Sticker', { atlas: 'sticker_spritesheet', frame: 'mc_sticker manik_princess tears.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_sticker manik_princess tears.png' }),
    new MakeUp('StickerstarBlue', 'Sticker', { atlas: 'sticker_spritesheet', frame: 'mc_sticker manik blue_star.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_sticker manik blue_star.png' }),
    new MakeUp('StickerstarPink', 'Sticker', { atlas: 'sticker_spritesheet', frame: 'mc_sticker manik pink_star.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_sticker manik pink_star.png' }),
    new MakeUp('StickerstarPurple', 'Sticker', { atlas: 'sticker_spritesheet', frame: 'mc_sticker manik purple_star.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_sticker manik purple_star.png' }),
    new MakeUp('StickerstarRed', 'Sticker', { atlas: 'sticker_spritesheet', frame: 'mc_sticker manik red_star.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_sticker manik red_star.png' }),
    new MakeUp('StickerstarYellow', 'Sticker', { atlas: 'sticker_spritesheet', frame: 'mc_sticker manik yellow_star.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_sticker manik yellow_star.png' }),

    //hair data
    // --- GRUP 1 (ATLAS 01) ---
    new MakeUp('01Black', 'Hair', { front: { atlas: 'hair_front_01', frame: 'hair_01_black_F_out.png' }, back: { atlas: 'hair_back_01', frame: 'hair_01_black_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_01_black.png' }),
    new MakeUp('01Blonde', 'Hair', { front: { atlas: 'hair_front_01', frame: 'hair_01_blonde_F_out.png' }, back: { atlas: 'hair_back_01', frame: 'hair_01_blonde_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_01_blonde.png' }),
    new MakeUp('01Brown', 'Hair', { front: { atlas: 'hair_front_01', frame: 'hair_01_brown_F_out.png' }, back: { atlas: 'hair_back_01', frame: 'hair_01_brown_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_01_brown.png' }),
    new MakeUp('01Pink', 'Hair', { front: { atlas: 'hair_front_01', frame: 'hair_01_pink_F_out.png' }, back: { atlas: 'hair_back_01', frame: 'hair_01_pink_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_01_pink.png' }),

    new MakeUp('02Black', 'Hair', { front: { atlas: 'hair_front_01', frame: 'hair_02_black_F_out.png' }, back: { atlas: 'hair_back_01', frame: 'hair_02_black_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_02_black.png' }),
    new MakeUp('02Blonde', 'Hair', { front: { atlas: 'hair_front_01', frame: 'hair_02_blonde_F_out.png' }, back: { atlas: 'hair_back_01', frame: 'hair_02_blonde_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_02_blonde.png' }),
    new MakeUp('02Brown', 'Hair', { front: { atlas: 'hair_front_01', frame: 'hair_02_brown_F_out.png' }, back: { atlas: 'hair_back_01', frame: 'hair_02_brown_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_02_brown.png' }),
    new MakeUp('02Pink', 'Hair', { front: { atlas: 'hair_front_01', frame: 'hair_02_pink_F_out.png' }, back: { atlas: 'hair_back_01', frame: 'hair_02_pink_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_02_pink.png' }),

    new MakeUp('03Black', 'Hair', { front: { atlas: 'hair_front_01', frame: 'hair_03_black_F_out.png' }, back: { atlas: 'hair_back_01', frame: 'hair_03_black_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_03_black.png' }),
    new MakeUp('03Blonde', 'Hair', { front: { atlas: 'hair_front_01', frame: 'hair_03_blonde_F_out.png' }, back: { atlas: 'hair_back_01', frame: 'hair_03_blonde_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_03_blonde.png' }),
    new MakeUp('03Brown', 'Hair', { front: { atlas: 'hair_front_01', frame: 'hair_03_brown_F_out.png' }, back: { atlas: 'hair_back_01', frame: 'hair_03_brown_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_03_brown.png' }),
    new MakeUp('03Pink', 'Hair', { front: { atlas: 'hair_front_01', frame: 'hair_03_pink_F_out.png' }, back: { atlas: 'hair_back_01', frame: 'hair_03_pink_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_03_pink.png' }),

    new MakeUp('04Black', 'Hair', { front: { atlas: 'hair_front_01', frame: 'hair_04_black_F_out.png' }, back: { atlas: 'hair_back_01', frame: 'hair_04_black_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_04_black.png' }),
    new MakeUp('04Blonde', 'Hair', { front: { atlas: 'hair_front_01', frame: 'hair_04_blonde_F_out.png' }, back: { atlas: 'hair_back_01', frame: 'hair_04_blonde_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_04_blonde.png' }),
    new MakeUp('04Brown', 'Hair', { front: { atlas: 'hair_front_01', frame: 'hair_04_brown_F_out.png' }, back: { atlas: 'hair_back_01', frame: 'hair_04_brown_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_04_brown.png' }),
    new MakeUp('04Pink', 'Hair', { front: { atlas: 'hair_front_01', frame: 'hair_04_pink_F_out.png' }, back: { atlas: 'hair_back_01', frame: 'hair_04_pink_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_04_pink.png' }),

    // --- GRUP 2 (ATLAS 02) ---
    new MakeUp('05Black', 'Hair', { front: { atlas: 'hair_front_02', frame: 'hair_05_black_F_out.png' }, back: { atlas: 'hair_back_02', frame: 'hair_05_black_B_out.png' } }, { atlas: 'hair_spritesheet', frame: 'hair_05_black.png' }),
    new MakeUp('05Blonde', 'Hair', { front: { atlas: 'hair_front_02', frame: 'hair_05_blonde_F_out.png' }, back: { atlas: 'hair_back_02', frame: 'hair_05_blonde_B_out.png' } }, { atlas: 'hair_spritesheet', frame: 'hair_05_blonde.png' }),
    new MakeUp('05Brown', 'Hair', { front: { atlas: 'hair_front_02', frame: 'hair_05_brown_F_out.png' }, back: { atlas: 'hair_back_02', frame: 'hair_05_brown_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_05_brown.png' }),
    new MakeUp('05Pink', 'Hair', { front: { atlas: 'hair_front_02', frame: 'hair_05_pink_F_out.png' }, back: { atlas: 'hair_back_02', frame: 'hair_05_pink_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_05_pink.png' }),

    new MakeUp('06Black', 'Hair', { front: { atlas: 'hair_front_02', frame: 'hair_06_black_F_out.png' }, back: { atlas: 'hair_back_02', frame: 'hair_06_black_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_06_black.png' }),
    new MakeUp('06Blonde', 'Hair', { front: { atlas: 'hair_front_02', frame: 'hair_06_blonde_F_out.png' }, back: { atlas: 'hair_back_02', frame: 'hair_06_blonde_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_06_blonde.png' }),
    new MakeUp('06Brown', 'Hair', { front: { atlas: 'hair_front_02', frame: 'hair_06_brown_F_out.png' }, back: { atlas: 'hair_back_02', frame: 'hair_06_brown_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_06_brown.png' }),
    new MakeUp('06Pink', 'Hair', { front: { atlas: 'hair_front_02', frame: 'hair_06_pink_F_out.png' }, back: { atlas: 'hair_back_02', frame: 'hair_06_pink_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_06_pink.png' }),

    new MakeUp('07Black', 'Hair', { front: { atlas: 'hair_front_02', frame: 'hair_07_black_F_out.png' }, back: { atlas: 'hair_back_02', frame: 'hair_07_black_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_07_black.png' }),
    new MakeUp('07Blonde', 'Hair', { front: { atlas: 'hair_front_02', frame: 'hair_07_blonde_F_out.png' }, back: { atlas: 'hair_back_02', frame: 'hair_07_blonde_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_07_blonde.png' }),
    new MakeUp('07Brown', 'Hair', { front: { atlas: 'hair_front_02', frame: 'hair_07_brown_F_out.png' }, back: { atlas: 'hair_back_02', frame: 'hair_07_brown_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_07_brown.png' }),
    new MakeUp('07Pink', 'Hair', { front: { atlas: 'hair_front_02', frame: 'hair_07_pink_F_out.png' }, back: { atlas: 'hair_back_02', frame: 'hair_07_pink_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_07_pink.png' }),

    new MakeUp('08Black', 'Hair', { front: { atlas: 'hair_front_02', frame: 'hair_08_black_F_out.png' }, back: { atlas: 'hair_back_02', frame: 'hair_08_black_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_08_black.png' }),
    new MakeUp('08Blonde', 'Hair', { front: { atlas: 'hair_front_02', frame: 'hair_08_blonde_F_out.png' }, back: { atlas: 'hair_back_02', frame: 'hair_08_blonde_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_08_blonde.png' }),
    new MakeUp('08Brown', 'Hair', { front: { atlas: 'hair_front_02', frame: 'hair_08_brown_F_out.png' }, back: { atlas: 'hair_back_02', frame: 'hair_08_brown_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_08_brown.png' }),
    new MakeUp('08Pink', 'Hair', { front: { atlas: 'hair_front_02', frame: 'hair_08_pink_F_out.png' }, back: { atlas: 'hair_back_02', frame: 'hair_08_pink_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_08_pink.png' }),

    // --- GRUP 3 (ATLAS 03) ---
    new MakeUp('09Black', 'Hair', { front: { atlas: 'hair_front_03', frame: 'hair_09_black_F_out.png' }, back: { atlas: 'hair_back_03', frame: 'hair_09_black_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_09_black.png' }),
    new MakeUp('09Blonde', 'Hair', { front: { atlas: 'hair_front_03', frame: 'hair_09_blonde_F_out.png' }, back: { atlas: 'hair_back_03', frame: 'hair_09_blonde_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_09_blonde.png' }),
    new MakeUp('09Brown', 'Hair', { front: { atlas: 'hair_front_03', frame: 'hair_09_brown_F_out.png' }, back: { atlas: 'hair_back_03', frame: 'hair_09_brown_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_09_brown.png' }),
    new MakeUp('09Pink', 'Hair', { front: { atlas: 'hair_front_03', frame: 'hair_09_pink_F_out.png' }, back: { atlas: 'hair_back_03', frame: 'hair_09_pink_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_09_pink.png' }),

    new MakeUp('10Black', 'Hair', { front: { atlas: 'hair_front_03', frame: 'hair_10_black_F_out.png' }, back: { atlas: 'hair_back_03', frame: 'hair_10_black_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_10_black.png' }),
    new MakeUp('10Blonde', 'Hair', { front: { atlas: 'hair_front_03', frame: 'hair_10_blonde_F_out.png' }, back: { atlas: 'hair_back_03', frame: 'hair_10_blonde_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_10_blonde.png' }),
    new MakeUp('10Brown', 'Hair', { front: { atlas: 'hair_front_03', frame: 'hair_10_brown_F_out.png' }, back: { atlas: 'hair_back_03', frame: 'hair_10_brown_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_10_brown.png' }),
    new MakeUp('10Violet', 'Hair', { front: { atlas: 'hair_front_03', frame: 'hair_10_violet_F_out.png' }, back: { atlas: 'hair_back_03', frame: 'hair_10_violet_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_10_pink.png' }),

    new MakeUp('11Black', 'Hair', { front: { atlas: 'hair_front_03', frame: 'hair_11_black_F_out.png' }, back: { atlas: 'hair_back_03', frame: 'hair_11_black_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_11_black.png' }),
    new MakeUp('11Blonde', 'Hair', { front: { atlas: 'hair_front_03', frame: 'hair_11_blonde_F_out.png' }, back: { atlas: 'hair_back_03', frame: 'hair_11_blonde_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_11_blonde.png' }),
    new MakeUp('11Brown', 'Hair', { front: { atlas: 'hair_front_03', frame: 'hair_11_brown_F_out.png' }, back: { atlas: 'hair_back_03', frame: 'hair_11_brown_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_11_brown.png' }),
    new MakeUp('11Pink', 'Hair', { front: { atlas: 'hair_front_03', frame: 'hair_11_pink_F_out.png' }, back: { atlas: 'hair_back_03', frame: 'hair_11_pink_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_11_pink.png' }),
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