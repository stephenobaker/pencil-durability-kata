class Pencil {
	constructor(durability, length) {
		this.initialDurability = (durability ? durability : Infinity);
		this.durability = this.initialDurability;
		this.length = (length ? length : Infinity);
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

	}
}

export { Pencil as default };