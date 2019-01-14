// As in es6

// var square = (x) => {  // THIS IS THE 'STATEMENT' SYNTAX FOR ARROW FUNCTION
//     var result = x * x;
//     return result;
// };

// var square = (x) => x * x; // THIS IS THE 'EXPRESSION' SYNTAX FOR ARROW FUNCTION. return keyword is implicitly provided in this format so no need to specify

var square = x => x * x; // For only 1 parameter in Arrow function expression format, no parantheses needed around the parameter

console.log(square(5));


var user = {
    name: 'Shreyam',
    sayHi: () => {
    // console.log(`Hi. I'm ${this.name}`); // Cannot use this keyword. In arrow functions, this keyword does not bind to the parent. If it was bound to parent which is user then it would have been user.name, but this is not the case. Therefore we use the actual name of the parent
    console.log(`Hi. I'm ${user.name}`);
    console.log(arguments); // 'arguments' is not part a part of arrow function expressions. It is a part of regular expressions. There if we use this in arrow function, it will print the global arguments and not the aruments specific to this function
    },
    // An es6 feature lets us use this keyword inside arrow func as well. This is a regular function and not an arrow function :-
    sayHiAlt () { // This is a regular espresstion and not an arrow function expression
        console.log(`Hi. I'm ${this.name}`);
        console.log(arguments); // 'arguments' is an array like structure implicitly provided in regular exp call for es6
        // Therefore to use 'this' binding and local implicit 'arguments' array like structure, use es6 regular exp rather than es6 arrow func exp
    }

};

user.sayHi();
user.sayHiAlt();
user.sayHiAlt(1,2,3);