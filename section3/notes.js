console.log('Starting notes.js');

module.exports.age = 24;

// module.exports.addNote = funtion () {
// }; // This is es5 notation for function 

module.exports.addNote = () => { // this is es6 notation for function
    console.log('addNote called.');
    return 'NewNote';
};

module.exports.add = (a, b) => {
    return a+b;
};