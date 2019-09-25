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
		it('degrades lowercase letters by 1, then writes blank spaces', () => {
			let pencil4 = new Pencil(4);
			let paper = new Paper();
			pencil4.write('hello', paper);
			expect(paper.content).to.equal('hell ');
		});
		it('degrades over multiple write functions', () => {
			let pencil = new Pencil(10);
			let paper = new Paper();
			pencil.write('hello', paper);
			pencil.write('helloworld', paper);
			expect(paper.content).to.equal('hellohello     ');
		});
		it('degrades by 0 for each space or newline written', () => {
			let pencil = new Pencil(5);
			let paper = new Paper();
			pencil.write('a b c', paper);
			expect(pencil.durability).to.equal(2);
		});
		it('degrades by 2 for each uppercase letter written', () => {
			let pencil = new Pencil(5);
			let paper = new Paper();
			pencil.write('HI', paper);
			expect(pencil.durability).to.equal(1);
		});
		xit('degrades by an unkown amount for each non-letter character written', () => {

		});
	});
});