var person = {
    name: 'Shreyam'
};

person.age = 24;

debugger; // breaks to here, when used c in debugger

person.name = 'Kela';

console.log(person);

// To start debugger mode - In terminal - node inspect <filename>
// list(10) - list next 10 lines
// n - next command
// c - continue till end of program or the debugger keyword
// repl - repl mode (Read–eval–print loop) - to manipulate variables and javascript at that particular state in the program

