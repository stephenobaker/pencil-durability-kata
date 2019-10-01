import { reverseStr, used } from './utils';

class Pencil {
	constructor(durability, length, eraserDurability) {
		this.initialDurability = (isNaN(durability) || durability === null ? Infinity : durability);
		this.durability = this.initialDurability;
		this.length = (isNaN(length) || length === null ? Infinity : length);
		this.eraserDurability = (isNaN(eraserDurability) || eraserDurability === null ? Infinity : eraserDurability);
	}
	write(string, paper, start) {
		paper.content = paper.content.split('');
		string.split('').forEach((character, index) => {
			const currentContent = (isNaN(start) ? paper.content.length : start + index);
			let characterUsed;
			if (this.durability - used(character, false) >= 0) {
				characterUsed = (/^\S$/.test(paper.content[currentContent]) && !/\s/.test(character)
					? '@'
					: /^\S$/.test(paper.content[currentContent]) && /\s/.test(character)
						? paper.content[currentContent]
						: character
				);
				this.durability -= used(characterUsed, false);
			} else {
				characterUsed = (/^\S$/.test(paper.content[currentContent])
					? paper.content[currentContent]
					: ' '
				);
			}
			paper.content.splice(currentContent, 1, characterUsed);
		});
		paper.content = paper.content.join('');
	}
	sharpen() {
		if (this.length >= 1) {
			this.durability = this.initialDurability;
			this.length -= 1;
		}
	}
	erase(string, paper, edit) {
		if (reverseStr(paper.content).indexOf(reverseStr(string)) !== -1) {
			const start = reverseStr(paper.content).indexOf(reverseStr(string));
			const stop = start + string.length;
			paper.content = paper.content.split('').reverse().map((character, index) => {
				if (this.eraserDurability - used(character, true) >= 0 && start <= index && index < stop) {
					this.eraserDurability -= used(character, true);
					return ' '
				} else {
					return character;
				}
			}).reverse().join('');
			const editStart = paper.content.length - start - string.length;
			if (edit) {
				this.write(edit, paper, editStart)
			}
		}
	}
}

export { Pencil as default };