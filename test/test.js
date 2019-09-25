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
		xit('writes blank spaces if it has degraded', () => {
			let pencil = new Pencil(5);
			let paper = new Paper();
			pencil.write('helloworld', paper);
			expect(paper.content).to.equal('hello     ');

		});
		xit('degrades by 0 for each space or newline written', () => {

		});
		xit('degrades by 1 for each lowercase letter written', () => {

		});
		xit('degrades by 2 for each uppercase letter written', () => {

		});
		xit('degrades by an unkown amount for each non-letter character written', () => {

		});
	});
});