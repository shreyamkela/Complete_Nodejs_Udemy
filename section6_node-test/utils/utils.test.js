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

// TESTING ASYNC WITH MOCHA
// it('should async add two numbers', () => { // If no arg is included in the callback of it, mocha is not going to go till the expect assertion. It will print pass before as soon as the callback is called, and not wait for the async delay thus and not go to the expect assert as mocha thinks that when callback is fired, everything went fine. It does not wait for the async delay, as this only checks whether there is a callback function with a delay, which is present as we have it defined in utils.js as asyncAdd. This is a problem with async testing with mocha. To check for this we pass an argument to callback of it and at the end of expect assertion we call it, which will make mocha run till the arg is called. This will make mocha test the expect assertion that we use, and not test just whether a async action func is present or not. We need to tell mocha that it is an async function that will take time to generate an output that we need to test. Refer 'Testing Async code' of the udemy tutorial - Sec 6, Lec 54. See the next code snippet
//     utils.asyncAdd(4, 3, (sum) => { // In the callback function of asyncAdd, we assert
//         expect(sum).toBe(8).toBeA('number'); 
//     });
// }); 
it('should async add two numbers', (done) => { // when doen arg is passed, mocha knows it is an async function and it has to run till this arg is called
    utils.asyncAdd(4, 3, (sum) => { // In the callback function of asyncAdd, we assert. The sum variable stores the result, calback is passed in place of sum in utils.js asyncAdd function i.e where asyncAdd is defined
        expect(sum).toBe(7).toBeA('number'); 
        done(); // Calling done after the expect makes mocha run till done is called
    }); // When printing the test results, mocha will coulour the time taken as red if it is anywhere close to a second or more. No async request in real-world apps takes that long, therefore mocha thinks it's a problem
}); 

it('should async square a number', (done) => { 
    utils.asyncSquare(7, (square) => { 
        expect(square).toBe(49).toBeA('number'); 
        done(); // If done is passed into callback but never called here, this also gives an error as mocha thinks that the async call never finished and exceeded the 2000ms mocha limit. Therefore it throws an error
    }); 
}); 