# Pencil Durability Kata
An exercise in Test-Driven Development, building a set of JavaScript functions that simulate the ability of a pencil to write on a piece of paper.

In addition to meeting the requirements outlined [here](https://github.com/PillarTechnology/kata-pencil-durability), I make several assumptions which result in these additional requirements:
1. Non-letter characters will degrade a pencil's lead by a value of one
2. Editing is passed as an argument in the erase function, and only writes new text in the whitespace(s) left by the most recently erased string (the one being erased in the erase function to which the edit argument is passed)
3. When a pencil is created, if no value is passed for length, point durability, or eraser durability, or if a non-number or NaN is passed, the values default to Infinity
4. Values passed at pencil creation can be floating points, and if the value for length, point durability, or eraser durability is insufficient (even if greater than zero), then the sharpen, write, and erase functions behave the same way as if the values were zero
5. If a value is passed to the erase function that cannot be matched exactly, nothing is erased and nothing passed as an edit string is written

## Instructions
To run the tests in the command line:
1. Clone this repo.
2. Install [npm](https://nodejs.org/en/) if not already installed
3. Navigate to the root directory of the project
4. Run ```$ npm install```
5. Run ```$ npm test```