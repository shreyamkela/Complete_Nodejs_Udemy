console.log('Start');

const fs = require('fs');
// We call fs module using require. We dont want fs module called stuff to get changed so we keep fs variable as const. require could be considered as import from Java
// fs variable is now like a method. It is actually an object. A JS object. It has different properties/functionalities inside it.
const os = require('os'); 

fs.appendFile('greeting.txt', 'Hello World!', function (err) {
    if (err) {
        console.log('Unable to write.');
    }
    else {
        console.log('Success')
    }
});

var user = os.userInfo();
console.log(user);

fs.appendFile('greeting.txt', 'Hello' + user.username + `Hey ${user.username}!` , function (err) {
    if (err) {
        console.log('Unable to write.');
    }
    else {
        console.log('Success')
    }
});
// `Hey ${user.username}!` is using Template Literal/string of es6. For this to work use backticks "`" instead of single quotes "'", when printing
