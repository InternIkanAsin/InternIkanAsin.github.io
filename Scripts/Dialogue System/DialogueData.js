export class DialogueData{
	constructor(){
		this.dialogueLines = [];
	}

	addLine(speakerName, dialogue){
		this.dialogueLines.push({
			speakerName : speakerName,
			dialogue: dialogue
		});
	}
	getDialogue() {
		return this.dialogueLines;
	}
}