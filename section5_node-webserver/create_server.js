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
    res.send('About page.'); // Here we have passed our markup as a string. We could also have passed the whole html content here. But this is not ideal when we have to show thousands of different objects and stuff on the same page. To do this, normally projects use php, ruby on rails, etc (which are server side scripting language and server side web app framework respectively) to inject static/dynamic content and full html/css/javascript content into the path like with getElementById. Another way to do this by using the app.use(express.static(...)) and making the public folder which has all the different files. We can also do this by using the templating engine handlebars for javascript or the hbs (expressjs view engine) for handlebars. They inject html dynamically. Hbs is a wrapper around handlebars therefore we only need to install hbs, i.e hbs is a superset of handlebars (maybe)
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to fulfill request'
    });
});


// We want to serve all contents in the public folder without having to set the path by different handlers in express, for each file in public folder. This can be done by using express middleware. WIth it we can add the path to a folder containing html files, css files, javascript, images, etc and that sets up the single handler that serves all the files in that folder
// We provide the middleware function we want to use inside app.use(). We can also make our own middleware
app.use(express.static(__dirname + '/public')); // By this we set a static directory. express.static() is the middleware function used to serve the contents of the public folder. Note that these contents would be available to the user at the root level i.e 'localhost:3000/help.html' and not 'localhost:3000/public/help.html'. What app.use(express.static(__dirname + '/public')) does is on each request, it looks in the public folder for a file that matches the name of the request path (i.e. help.html). If it finds it, then it serves that, if not then it sends the request to the route handlers. Therfore whatever the user enters in the url bar, express will first search in the public folder and if not found, it will go to check the individual handlers of path
//__dirname is a predefined keyword that stores the root directory we are working with. Useful when you are moving your folders around


// To let the application listen/start at a particular port number:
// app.listen(3000);
app.listen(3000, () => { // We can also pass a function as the second argument to listen
    console.log('Server is up on port 3000');
});