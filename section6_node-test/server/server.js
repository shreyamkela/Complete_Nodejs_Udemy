const express = require('express');

var app = express(); // Making an express application. app gets all the functionality of express


// SETTING UP THE ROUTES

app.get('/', (req, res) => { // http get route
    // res.send('Hello world!'); 
    // res.status(404).send('Hello world!'); // To test for different status code. We can assign status codes with our reponses
    res.status(404).send({
        error: 'Page not found',
        name: 'Todo App v1.0'
    });
});

app.get('/users', (req, res) => {

    var users = [{ // Creating static object to pass
            name: 'Shreyam Kela',
            age: '24',
            location: 'San Jose'
        }, {
            name: 'Bruce Wayne',
            age: '42',
            location: 'Gotham'
        }, {
            name: 'Clark Kent',
            age: '40',
            location: 'Metropolis'
        }];

    res.status(200).send(users);
});


// LISTENING ON A PORT - PORT BINDING - BINDING A SERVER ONTO A PORT
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
module.exports.app = app; // giving other modules access to this server
