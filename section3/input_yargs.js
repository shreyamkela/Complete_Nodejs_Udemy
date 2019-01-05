const yargs = require('yargs');
// yargs is very useful for parsing command line input (and what other kinds of inputs?)

const notes = require('./notes.js');

var command = process.argv[2];

const argv = yargs.argv;

console.log('Process: ', process.argv)
console.log('Command: ', command); 
console.log('Yargs:', argv); 

// node ./input_yargs.js add --title=secret --body="This is my secret"
if(command == 'add') {
    var note = notes.addNote(argv.title, argv.body); 
    if(note!==undefined) {
        console.log('Note added');
    }
    else {
        console.log('Note with this title already present.');
    }
}
else if (command == 'read') {
    notes.readNote(argv.title);
}
else if (command == 'list') {
    notes.getAll();
}
else if (command == 'remove') {
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note was removed' : 'Note not found';
    console.log(message);
}
else {
    console.log("Command not recognised");
}
