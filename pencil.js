import reverseStr from './utils';

class Pencil {
	constructor(durability, length, eraserDurability) {
		this.initialDurability = (durability ? durability : Infinity);
		this.durability = this.initialDurability;
		this.length = (length ? length : Infinity);
		this.eraserDurability = (eraserDurability ? eraserDurability : Infinity);
	}
	write(string, paper) {
		string.split('').map((character) => {
			paper.content += (this.durability > 0 ? character : ' ');
			this.durability -= (
				(/\s/.test(character))
				? 0
				: (character === character.toUpperCase())
				? 2
				: 1
			);
		});
	}
	sharpen() {
		if (this.length > 0) {
			this.durability = this.initialDurability;
			this.length -= 1;
		}
	}
	erase(string, paper) {
		const start = reverseStr(paper.content).indexOf(reverseStr(string));
		const stop = start + string.length;
		paper.content = paper.content.split('').reverse().map((character, index) => {
			if (this.eraserDurability > 0 && start <= index && index < stop) {
				this.eraserDurability -= (
					(/\s/.test(character))
					? 0
					: 1
				);
				return ' '
			} else {
				return character;
			}
		}).reverse().join('');
	}
}

export { Pencil as default };