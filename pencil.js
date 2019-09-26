class Pencil {
	constructor(durability, length) {
		this.initialDurability = (durability ? durability : Infinity);
		this.durability = this.initialDurability;
		this.length = (length ? length : Infinity);
	}
	write(string, paper) {
		for (var i = 0; i < string.length; i++) {
			paper.content += (this.durability > 0 ? string[i] : ' ');
			this.durability = this.durability - (/\s/.test(string[i]) ? 0 : (string[i] === string[i].toUpperCase() ? 2 : 1));
		}
	}
	sharpen() {
		this.durability = this.initialDurability;
	}
}

export { Pencil as default };