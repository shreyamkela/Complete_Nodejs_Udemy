const express = require('express');
const hbs = require('hbs');

var app = express(); // make an app/application server that handles requests

app.get('/', (req, res) => { // / is the root or landing page/route of your application/website. Here we are defining what happens when user visits the '/' page. req defines all the data/flags etc the user has sent i.e req can be set by the user input and then by analysis req we can determine what to send back. res is the response we send back
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website!',
        currentYear: new Date().getFullYear()
    });

});

app.get('/about', (req, res) => { // '/' 'about' and so on are different handlers and we are 'registering' the different handlers by using app.get()
    // res.send('About page.'); // Here we have passed our markup as a string. We could also have passed the whole html content here. But this is not ideal when we have to show thousands of different objects and stuff on the same page. To do this, normally projects use php, ruby on rails, etc (which are server side scripting language and server side web app framework respectively) to inject dynamic content and full html/css/javascript content into the path like with getElementById. Another way to do this by using the app.use(express.static(...)) and making the public folder which has all the different files. We can also do this by using the templating engine handlebars for javascript or the hbs (expressjs view engine) for handlebars. They inject html dynamically. Hbs is a wrapper around handlebars therefore we only need to install hbs
    // hbs and react can be compared in some forms but hbs is only a view engine. If you want to inject logic into your view engine, you need helper functions. React on the other hand serves as a view engine and it also inherently injects logic so if far more versatile

    // res.render('about.hbs'); // res.render sends back as the response to '/about' a rendered template about.hbs 
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear() // We make a new Date() object which store the current year through getFullYear. This is the value of currentYear. SO it automatically change when the year changes i.e dynamic content
    }); // injecting dynamic content into the hbs (or the dynamic html). Whenever pageTitle is enclosed inside mustaches {{}} in hbs, the view engine will replace {{pageTitle}} with the dynamic content i.e the value of pageTitle key
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to fulfill request'
    });
});

hbs.registerPartials(__dirname + '/views/partials'); // Registering an hbs partial is basically a code snippet that you can automatically copy paste wherever you want to use it by just typing the partial, without the need of typing out this snippet everywhere you want to use that snippet. Changes in hbs would not be monitered by nodemon therefore to apply changes in nodemon whenever you update hbs then use nodemon server.js -e js,hbs. -e tell nodemon to watch only/all js and hbs files for changes. -e is extension
app.set('view engine', 'hbs'); // The 2 args inside set are a key value pair. Set various express related config. Here we are specifying that the view exngine for express that we are using is hbs. We can also set it as html for html view engine. The default directory that express uses to look for templates is 'views'. Therefore we save our templates in the views folder
// app.use(express.static(__dirname + '/public')); this method is not used when we are using hbs view engines

// We want to serve all contents in the public folder without having to set the path by different handlers in express, for each file in public folder. This can be done by using express middleware. WIth it we can add the path to a folder containing html files, css files, javascript, images, etc and that sets up the single handler that serves all the files in that folder
// We provide the middleware function we want to use inside app.use(). We can also make our own middleware
// app.use(express.static(__dirname + '/public')); // By this we set a static directory. express.static() is the middleware function used to serve the contents of the public folder. Note that these contents would be available to the user at the root level i.e 'localhost:3000/help.html' and not 'localhost:3000/public/help.html'. What app.use(express.static(__dirname + '/public')) does is on each request, it looks in the public folder for a file that matches the name of the request path (i.e. help.html). If it finds it, then it serves that, if not then it sends the request to the route handlers. Therfore whatever the user enters in the url bar, express will first search in the public folder and if not found, it will go to check the individual handlers of path
//__dirname is a predefined keyword that stores the root directory we are working with. Useful when you are moving your folders around


// To let the application listen/start at a particular port number:
// app.listen(3000);
app.listen(3000, () => { // We can also pass a function as the second argument to listen
    console.log('Server is up on port 3000');
});