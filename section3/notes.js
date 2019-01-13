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
const fs = require('fs');


var fetchNotes = () => { // try catch block made into a fetchNotes function so that different methods can fetch the notes, whenever required
    try {
        var notesString = fs.readFileSync('notes-data.json'); // load all previous notes into notes array, so that when new not is added, previous notes are not over-written
        return JSON.parse(notesString); //Change string to json object
        
    } catch(e) {
        //console.log('New notes-data file created!');
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes)); // Write object as string
};

var addNote = (title, body) => {
    //console.log("Adding note ", title, body);

    // notes-data.json saves all the notes
    // If there is no notes-data.json already present, then we create a new file
    // If it is present then we push into it the new note
    // Try catch is used as if the file is not present, code inside try will try to read file but will throw error. And as try catch is there, it will be caught without crashing the program
    // If try catch is not used, the program will crash
    // That's why we use the try and catch function fetchNotes above

    var notes = fetchNotes(); // Stores all notes in an array
    var note = { // A note object
         title,
         body
    };
    
    // We need to check whether the title of the new note already exists or not. If it does exist then we should not be saving this new note otherwise there would be duplicate notes
    // We cannot use searching whether a key exists or not (as in HashMaps) here. The key of the title is the word title itself. But what we are concerned with is the value. There should not be duplicate title values.
    // If title does not exist, then we push the note:
    // var duplicateNotes = notes.filter((note) => {
    //     return note.title === title;
    // });
    // Above code is written in es6 shorthand as:
    var duplicateNotes = notes.filter((note) => note.title === title);
    if(duplicateNotes.length === 0) {
        notes.push(note); // Push current note object into notes array
        saveNotes(notes);
        return note;
    } else {
        return undefined; // This is returned to input_yargs. If undefined that means note has already been added
    }


};

var readNote = (title) => { // readNote or getNote
    var notes = fetchNotes();
    var note = { // A note object for readNote. It only has title parameter as we only filter on the 'title'
        title
   };
    var filteredNotes = notes.filter((note) => note.title === title);
    return filteredNotes[0]; // filteredNotes is an array. Different note objects are at different indexes of filteredNotes. For readNote, there would only be 1 note object in filteredNotes

};

var getAll = () => {
    return fetchNotes(); // return all notes
};

var removeNote = (title) => {
    var notes = fetchNotes();
    var note = { // // A note object for removeNote. It only has title parameter as we only filter on the 'title'
        title
   };
    var filteredNotes = notes.filter((note) => note.title !== title); // Keep al notes that do not have their title as user inputted 'title', therefore removing this title
    saveNotes(filteredNotes);

    return notes.length !== filteredNotes.length; // return true if not equal i.e return true if a note is removed
};

var logNote = (note) => {
    debugger; // for Lec 20 debugging
    console.log('---------------');
    console.log('Title:', note.title);
    console.log(`Body: ${note.body}`); // Remember to put ` instead of ' when using $ method for printing
}

module.exports = { // exporting addNote as an object
    addNote, // In es6 this is same as addNote : addNote; i.e attribute : value 
    readNote,
    getAll, 
    removeNote,
    logNote
}