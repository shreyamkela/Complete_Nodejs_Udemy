// As in es6

// var square = (x) => {  // THIS IS THE 'STATEMENT' SYNTAX FOR ARROW FUNCTION
//     var result = x * x;
//     return result;
// };

// var square = (x) => x * x; // THIS IS THE 'EXPRESSION' SYNTAX FOR ARROW FUNCTION. return keyword is implicitly provided in this format so no need to specify

var square = x => x * x; // For only 1 parameter in Arrow function expression format, no parantheses needed around the parameter

console.log(square(5));