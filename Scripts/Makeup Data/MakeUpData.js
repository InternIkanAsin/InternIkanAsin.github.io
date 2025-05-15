import { MakeUp } from './MakeUp.js';
const makeUpData = [
    //Default
    new MakeUp('Default Lips', 'Lips', 'LipNormalDefault'), 
    new MakeUp('Default Eyebrows', 'Eyebrows', 'EyebrowNormalDefault'), 
    new MakeUp('Default Eyelashes', 'Eyelashes', 'EyelashesNormalDefault'),
    // Blush Data
    new MakeUp('Blush 1', 'Blush', 'blushanime', 'button1', 'blushanimeIcon'),
    new MakeUp('Blush 2', 'Blush', 'blushfever', 'button1', 'blushfeverIcon'),
    new MakeUp('Blush 3', 'Blush', 'blushfrackles', 'button1', 'blushfracklesIcon'),
    new MakeUp('Blush 4', 'Blush', 'blushlove', 'button1', 'blushloveIcon'),
    new MakeUp('Blush 5', 'Blush', 'blushorange', 'button1', 'blushorangeIcon'),
    new MakeUp('Blush 6', 'Blush', 'blushpink', 'button1', 'blushpinkIcon'),
    new MakeUp('Blush 7', 'Blush', 'blushnose', 'button1', 'blushnoseIcon'),
    new MakeUp('Blush 8', 'Blush', 'blushround', 'button1', 'blushroundIcon'),

    // Eyebrows Data
    new MakeUp('Eyebrows 1', 'Eyebrows', 'eyebrownormal1', 'button1', 'eyebrow1Icon'),
    new MakeUp('Eyebrows 2', 'Eyebrows', 'eyebrownormal2', 'button1', 'eyebrow2Icon'),
    new MakeUp('Eyebrows 3', 'Eyebrows', 'eyebrownormal3', 'button1', 'eyebrow3Icon'),
    new MakeUp('Eyebrows 4', 'Eyebrows', 'eyebrownormal4', 'button1', 'eyebrow4Icon'),
    new MakeUp('Eyebrows 5', 'Eyebrows', 'eyebrownormal5', 'button1', 'eyebrow5Icon'),

    // Eyelashes Data
    new MakeUp('Eyelashes1', 'Eyelashes', 'eyelashesnormal1', 'button1', 'eyelashes1Icon'),
    new MakeUp('Eyelashes2', 'Eyelashes', 'eyelashesnormal2', 'button1', 'eyelashes2Icon'),
    new MakeUp('Eyelashes3', 'Eyelashes', 'eyelashesnormal3', 'button1', 'eyelashes3Icon'),
    new MakeUp('Eyelashes4', 'Eyelashes', 'eyelashesnormal4', 'button1', 'eyelashes4Icon'),
    new MakeUp('Eyelashes5', 'Eyelashes', 'eyelashesnormal5', 'button1', 'eyelashes5Icon'),


    new MakeUp('Eyeliner1', 'Eyeliner', 'eyelinernormal1', 'button1', 'eyeliner1Icon'),
    new MakeUp('Eyeliner2', 'Eyeliner', 'eyelinernormal2', 'button1', 'eyeliner2Icon'),
    new MakeUp('Eyeliner3', 'Eyeliner', 'eyelinernormal3', 'button1', 'eyeliner3Icon'),
    new MakeUp('Eyeliner4', 'Eyeliner', 'eyelinernormal4', 'button1', 'eyeliner4Icon'),
    new MakeUp('Eyeliner5', 'Eyeliner', 'eyelinernormal5', 'button1', 'eyeliner5Icon'),
    // Eyeshadow Data
    new MakeUp('EyeShadowBrown', 'Eyeshadow', 'eyeshadownormalbrown', 'button1', 'eyeshadowbrownIcon'),
    new MakeUp('EyeShadowDragon', 'Eyeshadow', 'eyeshadownormaldragon', 'button1', 'eyeshadowdragonIcon'),
    new MakeUp('EyeShadowFairy', 'Eyeshadow', 'eyeshadownormalfairy', 'button1', 'eyeshadowfairyIcon'),
    new MakeUp('EyeShadowGold', 'Eyeshadow', 'eyeshadownormalgold', 'button1', 'eyeshadowgoldIcon'),
    new MakeUp('EyeShadowGreen', 'Eyeshadow', 'eyeshadownormalgreen', 'button1', 'eyeshadowgreenIcon'),
    new MakeUp('EyeShadowOrange', 'Eyeshadow', 'eyeshadownormalorange', 'button1', 'eyeshadoworangeIcon'),
    new MakeUp('EyeShadowPeach', 'Eyeshadow', 'eyeshadownormalpeach', 'button1', 'eyeshadowpeachIcon'),
    new MakeUp('EyeShadowPink', 'Eyeshadow', 'eyeshadownormalpink', 'button1', 'eyeshadowpinkIcon'),
    new MakeUp('EyeShadowPurple', 'Eyeshadow', 'eyeshadownormalpurple', 'button1', 'eyeshadowpurpleIcon'),

    // Lips Data
    new MakeUp('LipsBrown', 'Lips', 'lipnormalbrown', 'button1', 'lipsbrownIcon'),
    new MakeUp('LipsCherry', 'Lips', 'lipnormalcherry', 'button1', 'lipspinkIcon'),
    new MakeUp('LipsOrange', 'Lips', 'lipnormalorange', 'button1', 'lipsredIcon'),
    new MakeUp('LipsPink', 'Lips', 'lipnormalpink', 'button1', 'lipswineIcon'),
    new MakeUp('LipsRed', 'Lips', 'lipnormalred', 'button1', 'lipscherryIcon'),
    new MakeUp('LipsWine', 'Lips', 'lipnormalwine', 'button1', 'lipsorangeIcon'),

    // Pupil Data
    new MakeUp('PupilBlue', 'Pupil', 'PupilNormalBlue', 'button1', 'pupilblueIcon'),
    new MakeUp('PupilBlack', 'Pupil', 'pupilnormalblack', 'button1', 'pupilblackIcon'),
    new MakeUp('PupilDragon', 'Pupil', 'pupilnormaldragon', 'button1', 'pupildragonIcon'),
    new MakeUp('PupilFairy', 'Pupil', 'pupilnormalfairy', 'button1', 'pupilfairyIcon'),
    new MakeUp('PupilGreen', 'Pupil', 'pupilnormalgreen', 'button1', 'pupilgreenIcon'),
    new MakeUp('PupilMagical', 'Pupil', 'pupilnormalmagical', 'button1', 'pupilmagicIcon'),
    new MakeUp('PupilPink', 'Pupil', 'pupilnormalpink', 'button1', 'pupilpinkIcon'),
    new MakeUp('PupilRed', 'Pupil', 'pupilnormalred', 'button1', 'pupilredIcon'),
    new MakeUp('PupilYellow', 'Pupil', 'pupilnormalyellow', 'button1', 'pupilyellowIcon'),

    // Sticker Data
]

export const defaultMakeUpSkins = {
    'Lips': 'LipNormalDefault',
    'Eyebrows': 'EyebrowNormalDefault',
    'Eyelashes': 'EyelashesNormalDefault',
    'Pupil': 'PupilNormalBlue'
};

const MakeUpPositions = {
    Eyebrows: { x: 0, y: 0 },
    Eyelashes: { x: 0, y: 0 },
    Eyeliner: { x: 0, y: 0 },
    Eyeshadow: { x: 0, y: 0 },
    Lips: { x: 0, y: 0 },
    Pupil: { x: 0, y: 0 },
    Sticker: { x: 0, y: 0 },
    Blush: {x: 0, y: 0}
}

export { makeUpData, MakeUpPositions }