const express = require('express');

var app = express(); // make an app/application server that handles requests

app.get('/', (req, res) => { // / is the root or landing page of your application/website. Here we are defining what happens when user visits the '/' page. req defines all the data/flags etc the user has sent i.e req can be set by the user input and then by analysis req we can determine what to send back. res is the response we send back
    res.send('Hello Express!');
});

// To let the application listen/start at a particular port number:
app.listen(3000);