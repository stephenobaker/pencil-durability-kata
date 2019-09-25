class Pencil {
	constructor(durability) {
		this.durabilityLeft = (durability ? durability : Infinity);
	}
	get durability() {
		return this.durabilityLeft;
	}
	set durability(newValue) {
		this.durabilityLeft = newValue;
	}
	write(string, paper) {
		for (var i = 0; i < string.length; i++) {
			paper.content += (this.durability > 0 ? string[i] : ' ');
			this.durability = this.durability - 1;
		}
	}
}

export { Pencil as default };