const express = require('express');

var app = express(); // make an app/application server that handles requests

app.get('/', (req, res) => { // / is the root or landing page/route of your application/website. Here we are defining what happens when user visits the '/' page. req defines all the data/flags etc the user has sent i.e req can be set by the user input and then by analysis req we can determine what to send back. res is the response we send back
    //res.send('Hello Express!');
    //res.send('<h1>Hello Express!</h1>'); // Content type that gets sent is text/html
    res.send({ // Content type that gets sent is application/json. Express autodetects the received content type from the server and parses it accordingly. Can be check on chrome developer tools
        name: 'Shreyam',
        likes: [
            'food', 
            'coding'
        ]
    });
});

app.get('/about', (req, res) => { // '/' 'about' and so on are different handlers and we are 'registering' the different handlers by using app.get()
    res.send('About page.');
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to fulfil request'
    });
});


// To let the application listen/start at a particular port number:
app.listen(3000);