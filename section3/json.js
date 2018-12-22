var obj = {
    name: 'Shreyam'
};

var stringObj = JSON.stringify(obj);
console.log(typeof stringObj);
console.log(stringObj);
console.log(obj);

var personString = '{"name" : "Shreyam", "age" : 24}';
var person = JSON.parse(personString);
console.log(typeof person);
console.log(person);


const fs = require('fs');

var originalNote = {
    title: 'My Title',
    body: 'My body'
};

var originalNoteString = JSON.stringify(originalNote);
fs.writeFileSync('notes.json', originalNoteString);
// As fs.writeFileSync('notes.json', originalNoteString) writes to a file, if we moniter this program json.js with nodemon, it goes into infinite loop as:
// 1. The script gets changed an nodemon reruns it.
// 2. The script executes and it makes a change to notes.json via the fs module.
// 3. Nodemon sees that notes.json has changed, so it rerun the script.
// Nodemon watches all files in the folder for changes. I'm not getting this because my json.js file is in the playground folder. I've also navigated into the playground folder in the terminal.
// You can fix this by specifying specific files to watch or specific file extensions. I'd go with the file extension solution. That would be:
// nodemon -e js json.js 
// Refer https://www.udemy.com/the-complete-nodejs-developer-course-2/learn/v4/questions/2119810

var noteString = fs.readFileSync('notes.json', 'utf-8');
//Sync funtion so that this statement only executes after file has been written (which is also sync funtion)
// Note that if var noteString = fs.readFileSync('notes.json') is used i.e without the encoding 'utf-8' then it will return a buffer <Buffer 7b 22......>
// Refer https://stackoverflow.com/questions/26269211/why-is-fs-readfile-returning-a-buffer
console.log(noteString);

var note= JSON.parse(noteString);
console.log(typeof note);
console.log(note.title);