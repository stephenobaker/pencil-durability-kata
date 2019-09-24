class Paper {
	constructor() {
		this.contentString = '';
	}
	set content(string) {
		this.contentString = string;
	}
	get content() {
		return this.contentString;
	}
	
}

export { Paper as default };