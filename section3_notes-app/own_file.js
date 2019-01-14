const notes = require('./notes');
const fs = require('fs');

fs.appendFile('./greeting.txt', `Your age is ${notes.age}`, function (err) {
    if (err) {
        console.log('Unable to write.');
    }
    else {
        console.log('Success')
    }
});

var res = notes.addNote();
console.log(res);

console.log(notes.add(1, 2));

