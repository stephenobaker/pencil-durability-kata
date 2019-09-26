import Pencil from '../pencil';

import Paper from '../paper';

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
			pencil.sharpen()
			expect(pencil.durability).to.equal(10);
		});
		xit('can be provided with an initial length value', () => {

		});
		xit('length is decreased by one each time it\'s sharpened', () => {

		});
		xit('can no longer be sharpened once length reaches zero', () => {

		});
	});
});