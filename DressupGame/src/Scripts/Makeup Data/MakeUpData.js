import { MakeUp } from './MakeUp.js';
const makeUpData = [
    //Default
    new MakeUp('Default Lips', 'Lips', 'LipNormalDefault'),
    new MakeUp('Default Eyebrows', 'Eyebrows', 'EyebrowNormalDefault'),
    new MakeUp('Default Eyelashes', 'Eyelashes', 'EyelashesNormalDefault'),

    // Blush Data
    new MakeUp('Anime', 'Blush', 'blushanime', 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_blush anime.png' }),
    new MakeUp('Fever', 'Blush', 'blushfever', 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_blush fever.png' }),
    new MakeUp('Frackles', 'Blush', 'blushfrackles', 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_blush frackles.png' }),
    new MakeUp('Heart', 'Blush', 'blushlove', 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_blush love.png' }),
    new MakeUp('Orange', 'Blush', 'blushorange', 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_blush orange.png' }),
    new MakeUp('Pink', 'Blush', 'blushpink', 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_blush pink.png' }),
    new MakeUp('Red Nose', 'Blush', 'blushnose', 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_blush red nose.png' }),
    new MakeUp('Round', 'Blush', 'blushround', 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_blush round.png' }),

    // Eyebrows Data
    new MakeUp('classic Arch', 'Eyebrows', { atlas: 'eyebrow_spritesheet', frame: 'mc_eb 1_normal.png' }, 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_eb 1.png' }),
    new MakeUp('Bold Straight', 'Eyebrows', { atlas: 'eyebrow_spritesheet', frame: 'mc_eb 2_normal.png' }, 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_eb 2.png' }),
    new MakeUp('Fierce Arch', 'Eyebrows', { atlas: 'eyebrow_spritesheet', frame: 'mc_eb 3_normal.png' }, 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_eb 3.png' }),
    new MakeUp('Vintage Round', 'Eyebrows', { atlas: 'eyebrow_spritesheet', frame: 'mc_eb 4_normal.png' }, 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_eb 4.png' }),
    new MakeUp('Delicate Curve', 'Eyebrows', { atlas: 'eyebrow_spritesheet', frame: 'mc_eb 5_normal.png' }, 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_eb 5.png' }),

    // Eyelashes Data
    new MakeUp('No Eyelash', 'Eyelashes', { atlas: 'eyelashes_spritesheet', frame: 'mc_el 1_normal.png' }, 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_el 1.png' }),
    new MakeUp('Curled', 'Eyelashes', { atlas: 'eyelashes_spritesheet', frame: 'mc_el 2_normal.png' }, 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_el 2.png' }),
    new MakeUp('Sharp', 'Eyelashes', { atlas: 'eyelashes_spritesheet', frame: 'mc_el 3_normal.png' }, 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_el 3.png' }),
    new MakeUp('Lower Eyelash', 'Eyelashes', { atlas: 'eyelashes_spritesheet', frame: 'mc_el 4_normal.png' }, 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_el 4.png' }),
    new MakeUp('Natural', 'Eyelashes', { atlas: 'eyelashes_spritesheet', frame: 'mc_el 5_normal.png' }, 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_el 5.png' }),

    // Eyeliner Data
    new MakeUp('Sharp Edged', 'Eyeliner', 'eyelinernormal1', 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_er 1.png' }),
    new MakeUp('Wing', 'Eyeliner', 'eyelinernormal2', 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_er 2.png' }),
    new MakeUp('Double', 'Eyeliner', 'eyelinernormal3', 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_er 3.png' }),
    new MakeUp('Cat', 'Eyeliner', 'eyelinernormal4', 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_er 4.png' }),
    new MakeUp('Butterfly', 'Eyeliner', 'eyelinernormal5', 'buttonIcon2', { atlas: 'makeup1_spritesheet', frame: 'mc_er 5.png' }),

    // Eyeshadow Data
    new MakeUp('Brown', 'Eyeshadow', 'eyeshadownormalbrown', 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_brown.png' }),
    new MakeUp('Dragon Styled', 'Eyeshadow', 'eyeshadownormaldragon', 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_es dragon.png' }),
    new MakeUp('Fairy Styled', 'Eyeshadow', 'eyeshadownormalfairy', 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_es fairy.png' }),
    new MakeUp('Gold', 'Eyeshadow', 'eyeshadownormalgold', 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_gold.png' }),
    new MakeUp('Green', 'Eyeshadow', 'eyeshadownormalgreen', 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_green.png' }),
    new MakeUp('Orange', 'Eyeshadow', 'eyeshadownormalorange', 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_orange.png' }),
    new MakeUp('Peach', 'Eyeshadow', 'eyeshadownormalpeach', 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_peach.png' }),
    new MakeUp('Pink', 'Eyeshadow', 'eyeshadownormalpink', 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_pink.png' }),
    new MakeUp('Purple', 'Eyeshadow', 'eyeshadownormalpurple', 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_purple.png' }),
    
    // Lips Data
    new MakeUp('Brown', 'Lips', 'lipnormalbrown', 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_lips brown.png' }),
    new MakeUp('Cherry', 'Lips', 'lipnormalcherry', 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_lips cherry.png' }),
    new MakeUp('Orange', 'Lips', 'lipnormalorange', 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_lips orange.png' }),
    new MakeUp('Pink', 'Lips', 'lipnormalpink', 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_lips pink.png' }),
    new MakeUp('Red', 'Lips', 'lipnormalred', 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_lips red.png' }),
    new MakeUp('Wine', 'Lips', 'lipnormalwine', 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_lips wine.png' }),

    // Pupil Data
    new MakeUp('Blue', 'Pupil', { atlas: 'pupil_spritesheet', frame: 'mc_pupil blue_normal.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_pupil blue.png' }),
    new MakeUp('Black', 'Pupil', { atlas: 'pupil_spritesheet', frame: 'mc_pupil black_normal.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_pupil black.png' }),
    new MakeUp('Dragon Styled', 'Pupil', { atlas: 'pupil_spritesheet', frame: 'mc_pupil dragon_normal.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_pupil dragon.png' }),
    new MakeUp('Fairy Styled', 'Pupil', { atlas: 'pupil_spritesheet', frame: 'mc_pupil fairy_normal.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_pupil fairy.png' }),
    new MakeUp('Green', 'Pupil', { atlas: 'pupil_spritesheet', frame: 'mc_pupil green_normal.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_pupil green.png' }),
    new MakeUp('Magical', 'Pupil', { atlas: 'pupil_spritesheet', frame: 'mc_pupil magical_normal.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_pupil magic.png' }),
    new MakeUp('Pink', 'Pupil', { atlas: 'pupil_spritesheet', frame: 'mc_pupil pink_normal.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_pupil pink.png' }),
    new MakeUp('Red', 'Pupil', { atlas: 'pupil_spritesheet', frame: 'mc_pupil red_normal.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_pupil red.png' }),
    new MakeUp('Yellow', 'Pupil', { atlas: 'pupil_spritesheet', frame: 'mc_pupil yellow_normal.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_pupil yellow.png' }),

    // Sticker Data
    new MakeUp('Pink Heart', 'Sticker', { atlas: 'sticker_spritesheet', frame: 'mc_sticker manik pink_blush love.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_sticker manik pink_blush love.png' }),
    new MakeUp('Violet Heart', 'Sticker', { atlas: 'sticker_spritesheet', frame: 'mc_sticker manik purple_blush love.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_sticker manik purple_blush love.png' }),
    new MakeUp('Red Heart', 'Sticker', { atlas: 'sticker_spritesheet', frame: 'mc_sticker manik red_blush love.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_sticker manik red_blush love.png' }),
    new MakeUp('Yellow Heart', 'Sticker', { atlas: 'sticker_spritesheet', frame: 'mc_sticker manik yellow_blush love.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_sticker manik yellow_blush love.png' }),
    new MakeUp('Diamond', 'Sticker', { atlas: 'sticker_spritesheet', frame: 'mc_sticker manik diamond.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_sticker manik diamond.png' }),
    new MakeUp('Love', 'Sticker', { atlas: 'sticker_spritesheet', frame: 'mc_sticker manik_Love.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_sticker manik_Love.png' }),
    new MakeUp('Moonlight', 'Sticker', { atlas: 'sticker_spritesheet', frame: 'mc_sticker manik blue_moonlight crown.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_sticker manik blue_moonlight crown.png' }),
    new MakeUp('Moonlight Purple', 'Sticker', { atlas: 'sticker_spritesheet', frame: 'mc_sticker manik purple_moonlight crown.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_sticker manik purple_moonlight crown.png' }),
    new MakeUp('Moonlight Red', 'Sticker', { atlas: 'sticker_spritesheet', frame: 'mc_sticker manik red_moonlight crown.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_sticker manik red_moonlight crown.png' }),
    new MakeUp('Moonlight White', 'Sticker', { atlas: 'sticker_spritesheet', frame: 'mc_sticker manik white_moonlight crown.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_sticker manik white_moonlight crown.png' }),
    new MakeUp('Moonlight Yellow', 'Sticker', { atlas: 'sticker_spritesheet', frame: 'mc_sticker manik yellow_moonlight crown.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_sticker manik yellow_moonlight crown.png' }),
    new MakeUp('Princess Tears', 'Sticker', { atlas: 'sticker_spritesheet', frame: 'mc_sticker manik_princess tears.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_sticker manik_princess tears.png' }),
    new MakeUp('Blue Star', 'Sticker', { atlas: 'sticker_spritesheet', frame: 'mc_sticker manik blue_star.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_sticker manik blue_star.png' }),
    new MakeUp('Pink Star', 'Sticker', { atlas: 'sticker_spritesheet', frame: 'mc_sticker manik pink_star.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_sticker manik pink_star.png' }),
    new MakeUp('Purple Star', 'Sticker', { atlas: 'sticker_spritesheet', frame: 'mc_sticker manik purple_star.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_sticker manik purple_star.png' }),
    new MakeUp('Red Star', 'Sticker', { atlas: 'sticker_spritesheet', frame: 'mc_sticker manik red_star.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_sticker manik red_star.png' }),
    new MakeUp('Yellow Star', 'Sticker', { atlas: 'sticker_spritesheet', frame: 'mc_sticker manik yellow_star.png' }, 'buttonIcon2', { atlas: 'makeup2_spritesheet', frame: 'mc_sticker manik yellow_star.png' }),

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
    new MakeUp('10Violet', 'Hair', { front: { atlas: 'hair_front_03', frame: 'hair_10_violet_F_out.png' }, back: { atlas: 'hair_back_03', frame: 'hair_10_violet_B_out.png' } }, 'buttonIcon2', { atlas: 'hair_spritesheet', frame: 'hair_10_violet.png' }),

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
    'Eyeshadow': 'eyeshadownormaldefault',
    'Hair': { front: 'hair', back: '01blackB' }
};



export { makeUpData}