import Pencil from '../pencil';

import Paper from '../paper';

import { reverseStr } from '../utils';

import 'chai/register-expect';


describe('a pencil', () => {
	describe('can write on a piece of paper', () => {
  		let pencil = new Pencil();
    	let paper = new Paper();
	    it('adds text to a blank piece of paper', () => {
	    	pencil.write('Hello', paper);
	    	expect(paper.content).to.equal('Hello');
	    });
	    it('appends text to already written text', () => {
	    	pencil.write(' World!', paper);
	    	expect(paper.content).to.equal('Hello World!');
	    });
	});
	describe('has a point that can degrade', () => {
		it('can be provided with an initial value for point durability, including zero and negatives', () => {
			let pencil5 = new Pencil(5);
			let pencil4000 = new Pencil(4000);
			let pencil0 = new Pencil(0);
			let pencilNegative = new Pencil(-1);
			expect(pencil5.durability).to.equal(5);
			expect(pencil4000.durability).to.equal(4000);
			expect(pencil0.durability).to.equal(0);
			expect(pencilNegative.durability).to.equal(-1);
		});
		it('degrades lowercase letters by one, then writes blank spaces', () => {
			let pencil4 = new Pencil(4);
			let paper = new Paper();
			pencil4.write('hello', paper);
			expect(paper.content).to.equal('hell ');
		});
		it('degrades cumulatively over multiple write functions', () => {
			let pencil = new Pencil(10);
			let paper = new Paper();
			pencil.write('hello', paper);
			pencil.write('helloworld', paper);
			expect(paper.content).to.equal('hellohello     ');
		});
		it('degrades by zero for each space or newline written', () => {
			let pencil = new Pencil(5);
			let paper = new Paper();
			pencil.write('a b c', paper);
			expect(pencil.durability).to.equal(2);
		});
		it('degrades by two for each uppercase letter written', () => {
			let pencil = new Pencil(5);
			let paper = new Paper();
			pencil.write('HI', paper);
			expect(pencil.durability).to.equal(1);
		});
	});
	describe('can be sharpened', () => {
		it('regains initial point durability when sharpened after degradation', () => {
			let pencil = new Pencil(10);
			let paper = new Paper();
			pencil.write('test', paper);
			pencil.sharpen();
			expect(pencil.durability).to.equal(10);
		});
		it('can be provided with an initial length value, including zero and negatives', () => {
			let pencil = new Pencil(4,7);
			let pencil0 = new Pencil(4,0);
			let pencilNegative = new Pencil(4,-1);
			expect(pencil.length).to.equal(7);
			expect(pencil0.length).to.equal(0);
			expect(pencilNegative.length).to.equal(-1);

		});
		it('length is decreased by one each time it\'s sharpened', () => {
			let pencil = new Pencil(4,7);
			pencil.sharpen();
			expect(pencil.length).to.equal(6);
		});
		it('sharpening no longer restores sharpness once length reaches zero', () => {
			let pencil = new Pencil(4,2);
			let paper = new Paper();
			pencil.sharpen();
			pencil.sharpen();
			pencil.write('test', paper);
			pencil.sharpen();
			expect(pencil.durability).to.equal(0);
			let pencil0 = new Pencil(4,0);
			pencil0.write('test', paper);
			let pencilNegative = new Pencil(4,-1);
			pencilNegative.write('test', paper);
			pencil0.sharpen();
			pencilNegative.sharpen();
			expect(pencil0.durability).to.equal(0);
			expect(pencilNegative.durability).to.equal(0);
		});
	});
	describe('has an eraser that can erase', () => {
		it('replaces the last occurance of a string with empty spaces', () => {
			let pencil = new Pencil();
			let paper = new Paper();
			pencil.write('How much wood would a woodchuck chuck if a woodchuck could chuck wood', paper);
			pencil.erase('chuck', paper);
			expect(paper.content).to.equal('How much wood would a woodchuck chuck if a woodchuck could       wood')
			pencil.erase('chuck', paper);
			expect(paper.content).to.equal('How much wood would a woodchuck chuck if a wood      could       wood')
		});
	});
	describe('has an eraser that degrades with use', () => {
		let pencil = new Pencil(100,1,25);
		let pencil0 = new Pencil(100,1,0);
		let pencilNegative = new Pencil(100,1,-1);
		it('can be provided a value for eraser durability, including zero and negatives', () => {
			expect(pencil.eraserDurability).to.equal(25);
			expect(pencil0.eraserDurability).to.equal(0);
			expect(pencilNegative.eraserDurability).to.equal(-1);
		});
		it('characters degrade the eraser by a value of one if eraser durability is greater than zero', () => {
			let paper = new Paper();
			pencil.write('hello world', paper);
			pencil.erase('hello', paper);
			pencil0.erase('world', paper);
			pencilNegative.erase('world', paper);
			expect(pencil.eraserDurability).to.equal(20);
			expect(pencil0.eraserDurability).to.equal(0);
			expect(pencilNegative.eraserDurability).to.equal(-1);
		});
		it('white space does not degrade the eraser', () => {
			let paper = new Paper();
			pencil.write('hello w o r l d', paper);
			pencil.erase('w o r l d', paper);
			expect(pencil.eraserDurability).to.equal(15);
		});
		it('erases from right to left, and doesn\'t erase once it\'s degraded', () => {
			let paper = new Paper();
			pencil.write('this is a testtesttesttest', paper);
			pencil.erase('test', paper);
			pencil.erase('test', paper);
			pencil.erase('test', paper);
			pencil.erase('test', paper);
			expect(paper.content).to.equal('this is a t               ');
		});
	});
	describe('can edit previously written text', () => {
		it('can pass an optional edit argument when erasing', () => {
			let pencil = new Pencil();
			let paper = new Paper();
			pencil.write('I like to eat ice cream and cake', paper);
			pencil.erase('cake', paper);
			pencil.erase('ice cream', paper, 'cookies');
			expect(paper.content).to.equal('I like to eat cookies   and     ');
		});
		it('collides with previous text if there\'s insufficient whitespace', () => {
			let pencil = new Pencil();
			let paper = new Paper();
			pencil.write('I want to buy Lego', paper);
			pencil.erase('buy', paper, 'build');
			expect(paper.content).to.equal('I want to buil@ego');
		});
		it('continues past original content length', () => {
			let pencil = new Pencil();
			let paper = new Paper();
			pencil.write('Please walk the dog', paper);
			pencil.erase('dog', paper, 'hippopotomus');
			expect(paper.content).to.equal('Please walk the hippopotomus');
		});
	});
});

describe('a few more edge cases just to be sure', () => {
	it('erases strings at beginning', () => {
		let pencil = new Pencil();
		let paper = new Paper();
		pencil.write('a b c d', paper);
		pencil.erase('a', paper);
		expect(paper.content).to.equal('  b c d');
	});
	it('erases strings at end', () => {
		let pencil = new Pencil();
		let paper = new Paper();
		pencil.write('a b c d', paper);
		pencil.erase('d', paper);
		expect(paper.content).to.equal('a b c  ');
	});
	it('erases partial strings', () => {
		let pencil = new Pencil();
		let paper = new Paper();
		pencil.write('abcdef abcdef', paper);
		pencil.erase('cd', paper);
		expect(paper.content).to.equal('abcdef ab  ef');
	});
	it('spaces don\'t cause collisions', () => {
		let pencil = new Pencil();
		let paper = new Paper();
		let paper2 = new Paper();
		pencil.write('a b c d e f', paper);
		pencil.erase('a', paper, ' x x x x x x');
		expect(paper.content).to.equal(' xbxcxdxexfx');
		pencil.write('     ', paper2);
		pencil.erase('     ', paper2, '       ');
		expect(paper2.content).to.equal('       ');
	});
});

describe('additional requirements based on assumptions', () => {
	it('point durability degrades by one for each non-letter character written', () => {
		let pencil = new Pencil(5);
		let paper = new Paper();
		pencil.write('$3', paper);
		expect(pencil.durability).to.equal(3);
	});
	describe('floating points can be passed as values, and values greater than zero but still insufficient result in same behavior as zero', () => {
		let pencil = new Pencil(5.5, 0.9, 1.2);
		let paper = new Paper();
		it('cannot write if point durability is greater than zero but still insufficient', () => {
			pencil.write('HELLO', paper);
			expect(paper.content).to.equal('HE   ');
		});
		it('cannot sharpen if length is greater than zero but still insufficient', () => {
			pencil.sharpen();
			expect(pencil.durability).to.equal(1.5);
		});
		it('cannot erase if eraser durability is greater than zero but still insufficient', () => {
			pencil.erase('HE', paper);
			expect(paper.content).to.equal('H    ');
		});
	});
	it('if erase function doesn\'t find an exact match, nothing is erased', () => {
		let pencil = new Pencil();
		let paper = new Paper();
		pencil.write('Hello World', paper);
		pencil.erase('sdf', paper);
		pencil.erase('Helloo', paper);
		pencil.erase('world', paper, 'Test that edit does nothing');
		expect(paper.content).to.equal('Hello World');
	});
	it('when anything but a real number is passed as a value at pencil construction, constructed values default to infinity', () => {
		let pencil = new Pencil();
		let pencilNaN = new Pencil(NaN, NaN, NaN);
		let pencilStrings = new Pencil('These', 'are', 'strings');
		let pencilUndefined = new Pencil(undefined, undefined, undefined);
		let pencilNull = new Pencil(null, null, null);
		let pencilsArray = [pencil, pencilNaN, pencilStrings, pencilUndefined, pencilNull];
		pencilsArray.forEach((pencil) => {
			expect(pencil.durability).to.equal(Infinity);
			expect(pencil.length).to.equal(Infinity);
			expect(pencil.eraserDurability).to.equal(Infinity);
		});
	});
});

describe('reverseStr util function', () => {
	it('returns a reversed string', () => {
		let str1 = 'string';
		let str2 = 'This is a string';
		expect(reverseStr(str1)).to.equal('gnirts');
		expect(reverseStr(str2)).to.equal('gnirts a si sihT');
		expect(reverseStr(str2).indexOf(reverseStr(str1))).to.equal(0);
	});
});