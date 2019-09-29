export function reverseStr(string) {
	return string.split('').reverse().join('');
}

export function used(character, isEraser) {
 return (
 	(/\s/.test(character))
		? 0
		: (character === character.toLowerCase())
		? 1
		: (isEraser)
		? 1
		: 2
	);
}