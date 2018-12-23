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

const fs = require('fs');

// Code for input_yargs.js
var addNote = (title, body) => {
    //console.log("Adding note ", title, body);

    var notes = []; // Stores all notes in an array
    var note = { // A note object
         title,
         body
    };

    // notes-data.json saves all the notes
    // If there is no notes-data.json already present, then we create a new file
    // If it is present then we push into it the new note
    // Try catch is used as if the file is not present, code inside try will try to read file but will throw error. And as try catch is there, it will be caught without crashing the program
    // If try catch is not used, the program will crash
    try {
        var notesString = fs.readFileSync('notes-data.json'); // load all previous notes into notes array, so that when new not is added, previous notes are not over-written
        notes = JSON.parse(notesString); //Change string to json object
    } catch(e) {
        console.log('New notes-data file created!');
    }
    
    notes.push(note); // Push current note object into notes array
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
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