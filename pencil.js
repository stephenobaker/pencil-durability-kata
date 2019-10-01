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
			const characterUsed = (this.durability >= 1
				? /^\S$/.test(paper.content[currentContent]) && !/\s/.test(character)
					? '@'
					: /^\S$/.test(paper.content[currentContent]) && /\s/.test(character)
						? paper.content[currentContent]
						: character
				: /^\S$/.test(paper.content[currentContent])
					? paper.content[currentContent]
					: ' '
			);
			paper.content.splice(currentContent, 1, characterUsed);
			if (this.durability >=1) {
				this.durability -= used(characterUsed, false);
			}
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
		const start = reverseStr(paper.content).indexOf(reverseStr(string));
		const stop = start + string.length;
		paper.content = paper.content.split('').reverse().map((character, index) => {
			if (this.eraserDurability >= 1 && start <= index && index < stop) {
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

export { Pencil as default };