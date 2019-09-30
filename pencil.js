import { reverseStr, used } from './utils';

class Pencil {
	constructor(durability, length, eraserDurability) {
		this.initialDurability = (durability ? durability : Infinity);
		this.durability = this.initialDurability;
		this.length = (length ? length : Infinity);
		this.eraserDurability = (eraserDurability ? eraserDurability : Infinity);
	}
	write(string, paper, start) {
		paper.content = paper.content.split('');
		string.split('').forEach((character, index) => {
			const currentContent = (start ? start + index : paper.content.length);
			paper.content.splice(
				currentContent,
				1,
				this.durability > 0
				? /^\S$/.test(paper.content[currentContent])
					? '@'
					: character
				
				: /^\S$/.test(paper.content[currentContent])
					? paper.content[currentContent]
					: ' '
				
			);
			this.durability -= used(character, false);
		});

		paper.content = paper.content.join('');
	}
	sharpen() {
		if (this.length > 0) {
			this.durability = this.initialDurability;
			this.length -= 1;
		}
	}
	erase(string, paper, edit) {
		const start = reverseStr(paper.content).indexOf(reverseStr(string));
		const stop = start + string.length;
		paper.content = paper.content.split('').reverse().map((character, index) => {
			if (this.eraserDurability > 0 && start <= index && index < stop) {
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