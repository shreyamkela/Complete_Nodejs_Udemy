// <name>.test.js is the general naming convention for the file that saves the test cases of the <name>.js file

const utils = require('./utils'); // utils.js
// In package.json, add under test key - "test": "mocha **/*.test.js" which says that testing done by mocha on every .test.js file in present in any/every folder of the repo
// "npm test" inside this subtree will directly run mocha testing
it('should add two numbers', () => { // 'it' is a mocha function which defines what the output of the test cases should be. This can be read as 'It should add two numbers'. This is BDD or behaviour driven development. The first arg is a test string
    var res = utils.add(33,11);
   
    if (res !== 44) {
        throw new Error(`Expected 44, but got ${res}`);
    }
}); 

it('should square a number', () => { 
    var res = utils.square(6);
    
    if (res !== 36) {
        throw new Error(`Expected 36, but got ${res}`);
    }
}); 