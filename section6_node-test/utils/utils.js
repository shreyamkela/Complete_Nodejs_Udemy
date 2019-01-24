module.exports.add = (a, b) => a + b; // To test for adding of 2 numbers. Expressions syntax of arrow function. 
// module.exports.add = (a, b) => a + b + 10; // to test for failing

module.exports.square = (a) => a * a; // To test for squaring of 2 numbers

module.exports.setName = (user, fullName) => { // To test for first name and last name are set as expected or not, when the user object (containing age and location) is passed with the full name string.
    var names = fullName.split(' '); // Split fullName on space ' ' and store the splitted strings in a names array
    user.firstName = names[0]; // Adding to the user object a key value pair
    user.lastName = names[1];
    // console.log(user);
    return user;
};

module.exports.asyncAdd = (a, b, callback) => { // An async add func to test for async adding of 2 numbers
    setTimeout(() => {
        callback(a + b);
    }, 1000); // With mocha delay should be below 2000ms as if it is over 2000, mocha thinks there is an error and throws an error
}; 