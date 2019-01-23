// <name>.test.js is the general naming convention for the file that saves the test cases of the <name>.js file

const utils = require('./utils'); // utils.js
// In package.json, add under test key - "test": "mocha **/*.test.js" which says that testing done by mocha on every .test.js file in present in any/every folder of the repo
// "npm test" inside this subtree will directly run mocha testing
// use 'nodemon --exec "npm test"' to run testing with nodemon. --exec tell nodemon to execute a command instead of a file
// In package.json scripts we can add this 'nodemon --exec "npm test"' as a script to us a shorted command like - test-watch. You would have to use "nodemon --exec \"npm test\"" for windows otherwise the internal double quotes would not let the command run. For other os you can use "nodemon --exec 'npm test'"
// Use "npm run test-watch" to run the script
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