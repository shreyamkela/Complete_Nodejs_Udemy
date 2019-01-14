// var getUser = (id, callback) => { // Defining a callback funtion. 'callback' as argument refers to the object that will be returned back 
//     var user = { // A dummy object created. In real projects this object would be retrieved from db or network, etc
//         id: id,
//         name: 'Shreyam'
//     };
//     callback(user); // This defines what will be returned back by 'callback'
// }

// getUser(45, (userObject) => { // In getUser callback function, userObject is passed as argument to 'callback', thus callback(user) will store 'user' into userObject
//     console.log(userObject);
// });

// THIS IS ABOVE SNIPPET IS SYNCHRONOUS

// THIS BELOW SNIPPET IS THE SAME, JUST setTimeout IS ADDED TO MAKE IT ASYNC

var getUser = (id, callback) => { // Defining a callback funtion. 'callback' as argument refers to the object that will be returned back 
    var user = { // A dummy object created. In real projects this object would be retrieved from db or network, etc
        id: id,
        name: 'Shreyam'
    };
    setTimeout(() => { // This makes the snippet async
        callback(user); // This defines what will be returned back by 'callback'
    }, 3000);
};

getUser(45, (userObject) => { // In getUser callback function, userObject is passed as argument to 'callback', thus callback(user) will store 'user' into userObject
    console.log(userObject);
});

console.log('I am printing before the callback returns');
