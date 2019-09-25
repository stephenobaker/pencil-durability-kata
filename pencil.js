class Pencil {
	constructor(durability) {
		this.durabilityLeft = durability;
	}
	get durability() {
		return this.durabilityLeft;
	}
	write(string, paper) {
		paper.content = paper.content + string;
	}
}

export { Pencil as default };