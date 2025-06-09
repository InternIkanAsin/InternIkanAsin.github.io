import { DialogueData } from "../Dialogue System/DialogueData.js";
import { traitsMap } from '../Outfit Data/CostumeTraits.js'

export const bachelorDialoguesContainer = {

    Angga: {
        "Theater": new DialogueData(),
        "TheaterAfter": new DialogueData(),
        "TheaterAfter2": new DialogueData(),
    },
    Azril: {
        "Theater": new DialogueData(),
        "TheaterAfter": new DialogueData(),
        "TheaterAfter2": new DialogueData(),
    },
    Reza: {
        "Theater": new DialogueData(),
        "TheaterAfter": new DialogueData(),
        "TheaterAfter2": new DialogueData(),
    },
    Indra: {
        "Theater": new DialogueData(),
        "TheaterAfter": new DialogueData(),
        "TheaterAfter2": new DialogueData(),
    },
    Keenan: {
        "Theater": new DialogueData(),
        "TheaterAfter": new DialogueData(),
        "TheaterAfter2": new DialogueData(),
    },
};

export function initializeBachelorDialogue(bachelorName, datePlace, dialogueLines) {
    dialogueLines.forEach(line => {
        bachelorDialoguesContainer[bachelorName][datePlace].addLine(line.speakerName, line.dialogue);
    })

    return bachelorDialoguesContainer[bachelorName][datePlace];
}

export function fillTraits(dialogue, trait1, trait2) {
    return dialogue.replace("{trait1}", trait1).replace("{trait2}", trait2);
}

// Angga Dialogues
initializeBachelorDialogue("Angga", "Theater", [
    { speakerName: "Angga", dialogue: fillTraits("Hi, wanna go watch a movie with me? Just wear a {trait1} and {trait2} outfit for me okay?", traitsMap["Angga"].trait1, traitsMap["Angga"].trait2) }
])

initializeBachelorDialogue("Angga", "TheaterAfter", [
    { speakerName: "Angga", dialogue: "Oh my, you look beautiful! Your outfit especially" }
])

initializeBachelorDialogue("Angga", "TheaterAfter2", [
    { speakerName: "Angga", dialogue: fillTraits("Why are you wearing that outfit? I thought you were going to wear something {trait1} and {trait2} for me?", traitsMap["Angga"].trait1, traitsMap["Angga"].trait2) }
])


// Azril Dialogues
initializeBachelorDialogue("Azril", "Theater", [
    { speakerName: "Azril", dialogue: fillTraits("Hi Ho! wanna go watch a movie with me? Just wear a {trait1} and {trait2} outfit for me okay?", traitsMap["Azril"].trait1, traitsMap["Azril"].trait2) }
])

initializeBachelorDialogue("Azril", "TheaterAfter", [
    { speakerName: "Azril", dialogue: "Wow you look stunning! I'm so looking forward to today!!" }
])

initializeBachelorDialogue("Azril", "TheaterAfter2", [
    { speakerName: "Azril", dialogue: fillTraits("Why are you wearing that outfit? I thought you were going to wear something {trait1} and {trait2} for me?", traitsMap["Angga"].trait1, traitsMap["Angga"].trait2) }
])
// Reza Dialogues
initializeBachelorDialogue("Reza", "Theater", [
    { speakerName: "Reza", dialogue: fillTraits("Hi beautiful, let's go and watch a movie in this beautiful sunny day, just wear a {trait1} and {trait2} outfit for me okay?", traitsMap["Reza"].trait1, traitsMap["Reza"].trait2) }
])

initializeBachelorDialogue("Reza", "TheaterAfter", [
    { speakerName: "Reza", dialogue: "Wow you look beautiful! The outfit accentuates your beauty!" }
])

initializeBachelorDialogue("Reza", "TheaterAfter2", [
    { speakerName: "Reza", dialogue: fillTraits("Why are you wearing that outfit? I thought you were going to wear something {trait1} and {trait2} for me?", traitsMap["Angga"].trait1, traitsMap["Angga"].trait2) }
])

// Indra Dialogues
initializeBachelorDialogue("Indra", "Theater", [
    { speakerName: "Indra", dialogue: fillTraits("Hi , let's go and watch a movie, just wear a {trait1} and {trait2} outfit for me okay?", traitsMap["Indra"].trait1, traitsMap["Indra"].trait2) }
])

initializeBachelorDialogue("Indra", "TheaterAfter", [
    { speakerName: "Indra", dialogue: "Wow, your outfit looks really good! I can't wait to spend the rest of the day with you!!" }
])

initializeBachelorDialogue("Indra", "TheaterAfter2", [
    { speakerName: "Indra", dialogue: fillTraits("Why are you wearing that outfit? I thought you were going to wear something {trait1} and {trait2} for me?", traitsMap["Angga"].trait1, traitsMap["Angga"].trait2) }
])
// Keenan Dialogues
initializeBachelorDialogue("Keenan", "Theater", [
    { speakerName: "Keenan", dialogue: fillTraits("Hey you, come and watch a movie with me, or I'll double your work, just wear a {trait1} and {trait2} outfit for me.", traitsMap["Keenan"].trait1, traitsMap["Keenan"].trait2) }
])

initializeBachelorDialogue("Keenan", "TheaterAfter", [
    { speakerName: "Keenan", dialogue: "You look... nice. Maybe we should do this more often." }
])

initializeBachelorDialogue("Keenan", "TheaterAfter2", [
    { speakerName: "Keenan", dialogue: fillTraits("Why are you wearing that outfit? I thought you were going to wear something {trait1} and {trait2} for me? That's it, I'm doubling your work and you will receive no pay this month.", traitsMap["Angga"].trait1, traitsMap["Angga"].trait2) }
])