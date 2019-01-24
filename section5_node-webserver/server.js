const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

const port = process.env.PORT || 3000; // Config the environment cariable to heroku port or the port 3000. So we can run the app on heroku as well as our local host. Heroku will keep changing the env variable therefore we cannot keep maually changing them. process.env.PORT does this automatically when we link our app with heroku. Use "SET" in cmd in windows to see all env variable key value pairs
// Add "start": "node server.js" in scripts in package.json
// Now we can use "npm start" to start our web ap without specifying which file the server is. Just navigate to the subfolder where this particular package.json is and run npm start from here
// "npm start" runs an arbitrary command specified in the package’s "start" property of its "scripts" object. If no "start" property is specified on the "scripts" object, it will run node server.js - from npm start documentation
// We can directly run any key inside scripts of package.json by just doing "npm <key_name>" 


var app = express(); // make an app/application server that handles requests


hbs.registerPartials(__dirname + '/views/partials'); // Registering an hbs partial is basically a code snippet that you can automatically copy paste wherever you want to use it by just typing the partial, without the need of typing out this snippet everywhere you want to use that snippet. Changes in hbs would not be monitered by nodemon therefore to apply changes in nodemon whenever you update hbs then use nodemon server.js -e js,hbs. -e tell nodemon to watch only/all js and hbs files for changes. -e is extension
app.set('view engine', 'hbs'); // The 2 args inside set are a key value pair. Set various express related config. Here we are specifying that the view exngine for express that we are using is hbs. We can also set it as html for html view engine. The default directory that express uses to look for templates is 'views'. Therefore we save our templates in the views folder

// app.use(express.static(__dirname + '/public')); // This is express middleware. The call to the public route should be after the maintainence.hbs as express executes middlewares in the order in which app.use is used in the code to define them. If app.use(express.static(__dirname + '/public')); is above maintainance.hbs call, then public folder will still be served even if all the other handlers are not, when site is under maintainence.
// app.use() can be used to register your own middleware. Middleware can be setup in such a way that it checks the access privilege before it actually accesses that specific path/route. This is just one use case of custom express middleware

app.use((req, res, next) => { //Registering your custom express middleware. next specifies what to do when this middleware call completes. Using this we can chain different middlewares. This is async operation so next has to be called otherwise the app handlers for requests will never fire and app pauses till next is called. This middleware moniters all of the requests to our server and therefore if next is not used, our server will not respond to any request
    var now = new Date().toString(); // To log date and time when server is pinged
    var log = `${now}: ${req.method} ${req.url}`; // Logger - Logs whenever our server is pinged for any kind of requests. req.method is the kind of request made by the user, i.e GET, POST, etc. req.url is the url that the user visited/pinged
    console.log(log); 
    fs.appendFile('server.log', log + '\n', (err) => { // Log the current ping into server.log. log + '\n' is used to append new ping in nextline. Callback function is necessary for appendfile. We use error check as a callback function here. appendfile is an async func. Before node 7 async func were allowed to be made without callback but after that they have been deprecated. So we have to mention a callback func to an sync function 
        if(err) {
            console.log('Unable to append to server.log');
        }
    });
    next(); // If next is not used, server pauses here and no request is served
});


// MAINTAINANCE EXPRESS MIDDLEWARE - Can be commented out when the website is not under maintainance
// app.use((req, res, next) => {  
//     res.render('maintainance.hbs');
//     // next(); // As next is not called here, no handler executes after this so pinging any of the handlers will cal maintainance.hbs only. Thus with this simple call we can render all pages to a maintainance page, when the site is being updated
//     // Note - Call to the public route should be after the maintainence.hbs call as express executes middlewares in the order in which app.use is used in the code to define them. If app.use(express.static(__dirname + '/public')); is above maintainance.hbs call, then public folder will still be served even if all the other handlers are not, when site is under maintainence. 
//     // Therefore include public call only after maintanance call
// });

app.use(express.static(__dirname + '/public')); // Public folder call. This is express middleware. It deals public static files. Put this after maintanance express middleware


// registerPartials registers partial html/hbs snippets that can be injected into other html/hbs files. To inject dynamiclogic content into html/hbs we register helper functions for our use. Helpers can be used outside as well as inside of partials. As both partials and helpers use mustaches {{}}, for every {{somePartialOrHelper}} handlebars first checks whether somePartialOrHelper is a partial, if not then it checks whether it is a helper, if not then it checks if there is some data with the name somePartialOrHelper
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
}); 

hbs.registerHelper('screamIt', (text) => { // screamIt helper converts the text into uppercase when showing it to user
    return text.toUpperCase();
}); 

app.get('/', (req, res) => { // / is the root or landing page/route of your application/website. Here we are defining what happens when user visits the '/' page. req defines all the data/flags etc the user has sent i.e req can be set by the user input and then by analysis req we can determine what to send back. res is the response we send back
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website!'
        // currentYear: new Date().getFullYear() // Instead of passing logic as outside of hbs as done here, we can also pass/run functions or logic directly from inside hbs by using hbs helper functions that serve dynamic content
    });

});

app.get('/about', (req, res) => { // '/' 'about' and so on are different handlers and we are 'registering' the different handlers by using app.get()
    // res.send('About page.'); // Here we have passed our markup as a string. We could also have passed the whole html content here. But this is not ideal when we have to show thousands of different objects and stuff on the same page. To do this, normally projects use php, ruby on rails, etc (which are server side scripting language and server side web app framework respectively) to inject dynamic content and full html/css/javascript content into the path like with getElementById. Another way to do this by using the app.use(express.static(...)) and making the public folder which has all the different files. We can also do this by using the templating engine handlebars for javascript or the hbs (expressjs view engine) for handlebars. They inject html dynamically. Hbs is a wrapper around handlebars therefore we only need to install hbs
    // hbs and react can be compared in some forms but hbs is only a view engine. If you want to inject logic into your view engine, you need helper functions. React on the other hand serves as a view engine and it also inherently injects logic so if far more versatile

    // res.render('about.hbs'); // res.render sends back as the response to '/about' a rendered template about.hbs 
    res.render('about.hbs', {
        pageTitle: 'About Page',
    }); // injecting dynamic content into the hbs (or the dynamic html). Whenever pageTitle is enclosed inside mustaches {{}} in hbs, the view engine will replace {{pageTitle}} with the dynamic content i.e the value of pageTitle key
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to fulfill request'
    });
});

app.get('/projects', (req, res) => { // Portfolio page
    res.render('projects.hbs', {
        pageTitle: 'Portfolio Page',
        message: 'New projects incoming!'
    });
});


//The 404 Route - Page does not exist (ALWAYS KEEP THIS AS THE LAST ROUTE AS NODE WILL READ THE CODE SEQUENTIALLY. So if you keep the 404 route up, then the handles served below it will still give 404 even if they were called)
app.get('*', function(req, res){
    // res.send('The page does not exist.', 404); // Can use this but if we want to show a back or home button here, we can add it by usin res.render but we cannot use res.render when res.send has been used. For home button with res.send we would have to include html and href in the res.send
    res.render('bad_page.hbs', {
        pageTitle: 'Bad Page', // These are the options we are passing to the bad_page.hbs template
        message: 'The page does not exist'
    });
  });

// To let the application listen/start at a particular port number:
// app.listen(3000);
app.listen(port, () => { // We can also pass a function as the second argument to listen. Listen to port=3000 or heroku
    // console.log('Server is up on port 3000');
    console.log(`Server is up on port ${port}`);
});