const yargs = require('yargs');
// yargs is very useful for parsing command line input (and what other kinds of inputs?) and providing a command line UI to the user

const notes = require('./notes.js');

var command = process.argv[2];

// const argv = yargs.argv; // simple yargs.argv use to give argument passing functionality through flags, with yargs. If we want a better command line UI, we can chain more yargv functions to argv for more a interactive command line UI
const argv = yargs
    .command('add', 'Add a note', {
        title: {
            describe: 'Title of note', // describe tells to the user what do we mean by 'title' 
            demand: true, // demand true tells user that a title has to present, if title not provided, program gives warning
            alias: 't' // instead of typing full flag '--title', user can just type '-t'
        },
        body: {
            describe: 'Body of note', 
            demand: false, 
            alias: 'b'
        }
    })
    .help() // shows all the flags inside command that the user can set 
    .argv; // takes in argument

// console.log('Process: ', process.argv)
// console.log('Command: ', command); 
// console.log('Yargs:', argv); 

// node ./input_yargs.js add --title=secret --body="This is my secret"
if(command == 'add') {
    var note = notes.addNote(argv.title, argv.body); 
    if(note!==undefined) {
        console.log('Note added');
        notes.logNote(note); // Print the note with a reusable function logNote. This follows the DRY principle which is dont repeat yourself. 
    }
    else {
        console.log('Note with this title already present.');
    }
}
else if (command == 'read') {
    var noteRead = notes.readNote(argv.title);
    if(noteRead) {
        console.log('Note found');
        notes.logNote(noteRead); 
    } else {
        console.log('This note not found');
    }

}
else if (command == 'list') {
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s)`);
    //console.log(allNotes); // prints the allNotes in unformatted way -> Prints the whole array. To print in formatted way we use forEach inbuilt function with our logNote function
    allNotes.forEach((note) => notes.logNote(note)); // Arrow function with for each -> for each note obj in allNote, print the note with formatting
}
else if (command == 'remove') {
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note was removed' : 'Note not found';
    console.log(message);
}
else {
    console.log("Command not recognised");
}
