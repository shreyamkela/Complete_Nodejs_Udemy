console.log('Starting notes.js');

//module.exports.age = 24;

// module.exports.addNote = funtion () {
// }; // This is es5 notation for function 

// module.exports.addNote = () => { // this is es6 notation for function
//     console.log('addNote called.');
//     return 'NewNote';
// };

// module.exports.add = (a, b) => {
//     return a+b;
// };


// Code for input_yargs.js
var addNote = (title, body) => {
    console.log("Adding note ", title, body);

};

var readNote = (title) => {
    console.log("Reading note ", title);

};

var getAll = () => {
    console.log("Getting all notes");

};

var removeNote = (title) => {
    console.log("Removing note ", title);

};

module.exports = { // exporting addNote as an object
    addNote, // In es6 this is same as addNote : addNote; i.e attribute : value 
    readNote,
    getAll, 
    removeNote
}