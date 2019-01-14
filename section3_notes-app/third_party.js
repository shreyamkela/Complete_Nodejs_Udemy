const _ = require('lodash'); // first node looks into core modules of JS for lodash. It wont find it there, so then it looks in node_modules for this package. 
// lodash is a third party module generally used for searching, sorting, and type-checking funtions

console.log(_.isString('shreyam'));

var filteredArray = _.uniq(['Shreyam', 1,'Shreyam',2,3,3,4]); // removes duplicates in an array
console.log(filteredArray);

// use nodemon from npm, to run new changes on terminal automatically. nodemon is used for development purposes