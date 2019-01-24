// <name>.test.js is the general naming convention for the file that saves the test cases of the <name>.js file

const expect = require('expect'); // Expect is an assertion library. We can use it to reduce the code for our assertions. It will help us check whether the it('..') are running as they should or not, without much manually coding and error throws. Here expect 1.20.2 is used. Newer version might not be backward compatible to some of the functions
const utils = require('./utils'); // utils.js
// In package.json, add under test key - "test": "mocha **/*.test.js" which says that testing done by mocha on every .test.js file in present in any/every folder of the repo
// "npm test" inside this subtree will directly run mocha testing
// use 'nodemon --exec "npm test"' to run testing with nodemon. --exec tell nodemon to execute a command instead of a file
// In package.json scripts we can add this 'nodemon --exec "npm test"' as a script to us a shorted command like - test-watch. You would have to use "nodemon --exec \"npm test\"" for windows otherwise the internal double quotes would not let the command run. For other os you can use "nodemon --exec 'npm test'"
// Use "npm run test-watch" to run the script



it('should add two numbers', () => { // 'it' is a mocha function which defines what the output of the test cases should be. This can be read as 'It should add two numbers'. This is BDD or behaviour driven development. The first arg is a test string
    var res = utils.add(33,11);
   
    // MANUAL ASSERTION:
    // if (res !== 44) {  
    //     throw new Error(`Expected 44, but got ${res}`);
    // }

    // ASSERTION USING expect LIBRARY - Reduced code for assertion
    // expect(res).toBe(44); 
    expect(res).toBe(44).toBeA('number'); // This is a check for equality. Chaining multiple functions in expect library. First func checks whether the value is as it should be or not. If not, then it generates an error. The next checks whether the res is a number or not.
    // Cannot have 2 expects in the same snippet
}); 

it('should square a number', () => { 
    var res = utils.square(6);
    
    // MANUAL ASSERTION:
    // if (res !== 36) {
    //     throw new Error(`Expected 36, but got ${res}`);
    // }

    // ASSERTION USING expect LIBRARY 
    expect(res).toBe(36).toBeA('number');
}); 

it('should expect some value', () => { 
    expect(12).toNotBe(11); // This is a check for inequality
}); 

it('should expect objects to be equal/unequal', () => { 
    // expect({name: "Shreyam"}).toBe({name: "Shreyam"}); // This throws an error as expect toBe function uses === for equality check and objects can only be equal with === when they are actually the same objects. Here the 2 objects are different with just the same properties
    // expect({name: "Shreyam"}).toEqual({name: "Shreyam"}); // toEqual checks the 2 objects for smae properties
    expect({name: "Shreyam"}).toNotEqual({name: "shreyam"}); 
}); 

it('should expect to include/exclude some values', () => { 
    // expect([2,3,4]).toInclude(2); 
    // expect([2,3,4]).toExclude(5); 
    expect({
        name: "Shreyam",
        age: 24,
        location: 'San Jose'
    }).toInclude({
        age: 24
    });
}); 

it('should verify whether first and last names are set as expected or not', () => { 
    var user = {
        age: 25,
        location: 'San Jose'
    };
    var res = utils.setName(user, 'Shreyam Kela');
    // JavaScript passes objects by reference, therefore res is updated to be equal to user when setName returns
    // expect(user).toBe(res); // This does not throw an error which proves our point

    expect(res).toInclude({
        firstName: 'Shreyam',
        lastName: 'Kela'
    }).toBeA('object');
}); 
