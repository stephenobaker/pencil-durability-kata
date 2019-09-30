# Pencil Durability Kata
An exercise in Test-Driven Development, building a set of functions that meet the requirements outlined [here](https://github.com/PillarTechnology/kata-pencil-durability) to simulate a pencil and paper.

Where the requirements aren't clear, I make a couple assumptions:
1. I assume non-letter characters will degrade a pencil's lead by the same amount as a lowercase letter
2. I assume that the edit function needs only to add text in the whitespace of the single most recently erased text string, and therefore I pass the edit string as an optional argument in the erase function
## Instructions
To run the tests in the command line:
1. Clone this repo.
2. Install [npm](https://nodejs.org/en/) if not already installed
3. Navigate to the root directory of the project
4. Run ```$ npm install```
5. Run ```$ npm test```