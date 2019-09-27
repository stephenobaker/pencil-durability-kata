import Pencil from '../pencil';

import Paper from '../paper';

import reverseStr from '../utils';

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
		it('can be provided with a value for point durability', () => {
			let pencil5 = new Pencil(5);
			let pencil4000 = new Pencil(4000);
			expect(pencil5.durability).to.equal(5);
			expect(pencil4000.durability).to.equal(4000);
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
		xit('degrades by an unkown amount for each non-letter character written', () => {

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
		it('can be provided with an initial length value', () => {
			let pencil = new Pencil(4,7);
			expect(pencil.length).to.equal(7);
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
		it('can be provided a value for eraser durability', () => {
			expect(pencil.eraserDurability).to.equal(25);
		});
		it('characters degrade the eraser by a value of one', () => {
			let paper = new Paper();
			pencil.write('hello world', paper);
			pencil.erase('hello', paper);
			expect(pencil.eraserDurability).to.equal(20);
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