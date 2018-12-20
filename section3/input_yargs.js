const yargs = require('yargs');
// yargs is very useful for parsing command line input

const notes = require('./notes.js');

var command = process.argv[2];

const argv = yargs.argv;

console.log('Process: ', process.argv)
console.log('Command: ', command);
console.log('Yargs:', argv);

// node ./input_yargs.js add --title=secret --body="This is my secret"
if(command == 'add') {
    notes.addNote(argv.title, argv.body);
}
else if (command == 'read') {
    console.log("Reading");
}
else if (command == 'list') {
    console.log("Listing");
}
else if (command == 'remove') {
    console.log("Removing");
}
else {
    console.log("Command not recognised");
}
