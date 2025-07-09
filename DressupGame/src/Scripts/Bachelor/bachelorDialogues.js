import { DialogueData } from "../Dialogue System/DialogueData.js";
import { traitsMap } from '../Outfit Data/CostumeTraits.js'

export const bachelorDialoguesContainer = {

    Angga: {
        "Hangout1": new DialogueData(),
    },
    Azril: {
        "Hangout1": new DialogueData(),
    },
    Reza: {
        "Hangout1": new DialogueData(),
    },
    Indra: {
        "Hangout1": new DialogueData(),
    },
    Keenan: {
        "Hangout1": new DialogueData(),
    },
    AfterHangout: {
        0: new DialogueData(),
        1: new DialogueData(),
        2: new DialogueData(),
        3: new DialogueData(),
        4: new DialogueData()
    }
};

export function initializeBachelorDialogue(bachelorName, datePlace, dialogueLines) {
    dialogueLines.forEach(line => {
        bachelorDialoguesContainer[bachelorName][datePlace].addLine(line.speakerName, line.dialogue);
    })

    return bachelorDialoguesContainer[bachelorName][datePlace];
}

// Angga Dialogues
initializeBachelorDialogue("Angga", "Hangout1", [
    { speakerName: "Angga", dialogue: "Have you ever stood and watching the city lights stretch forever and the stars feel close enough to reach?" },
    { speakerName: "Angga", dialogue: "It's one of those things I've always wanted to do and it'd be great to share that moment with you." }
])

// Azril Dialogues
initializeBachelorDialogue("Azril", "Hangout1", [
    { speakerName: "Azril", dialogue: "You know? They say music sounds better when you're with someone special." },
    { speakerName: "Azril", dialogue: "Would you come to a concert with me and be the rhythm to my night?" }
])

// Reza Dialogues
initializeBachelorDialogue("Reza", "Hangout1", [
    { speakerName: "Reza", dialogue: "The breeze is soft, the sun’s just right. It feels like the world’s inviting us out. " },
    { speakerName: "Reza", dialogue: "Care to join me and let the quiet wrap around us for a while?" }
])

// Indra Dialogues
initializeBachelorDialogue("Indra", "Hangout1", [
    { speakerName: "Indra", dialogue: "The delicate sweets may melt on the tongue but nothing compares to the sweetness of having them with you." },
    { speakerName: "Indra", dialogue: "Will you share a bite of happiness with me?" }
])

// Keenan Dialogues
initializeBachelorDialogue("Keenan", "Hangout1", [
    { speakerName: "Keenan", dialogue: "I heard you love the ocean, and they say the ocean holds many secrets." },
    { speakerName: "Keenan", dialogue: "How about we explore the underwater world and uncover some of the secrets together?" }
])


