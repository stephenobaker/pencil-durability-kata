class Pencil {
	write(string, paper) {
		paper.content = paper.content + string;
	}
}

export { Pencil as default };