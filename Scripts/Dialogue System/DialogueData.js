export class DialogueData {
	constructor(dialogueID) {
		this.dialogueLines = [];
		this.dialogueID = dialogueID;
	}

	addLine(speakerName, dialogue) {
		this.dialogueLines.push({
			speakerName: speakerName,
			dialogue: dialogue
		});
	}
	getDialogue() {
		return this.dialogueLines;
	}
}