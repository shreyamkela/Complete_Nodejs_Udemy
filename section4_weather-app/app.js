const yargs = require('yargs');
const geocode = require('./geocode/geocode'); //geocode.js can be called as simply geocode 
const forecast = require('./forecast/forecast');

const argv = yargs
    .options({ // Inside of options is options object specifying the different options. Each option has several properties that can be set
        a: { // These are the properties 
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for.',
            string: true // this binds that anything entered will be taken as a string. Very important so that user entered characters for address are not interpreted as anything else.
        }
    })
    .help()
    .alias('help', 'h') //by alias() we can set the alias for help itself
    .argv; // .argv stores all the options into the var used for this yargs which in this case is 'argv'

//console.log(argv);

//geocode.geocodeAddress(argv.a); // A simple call to the abstracted away geocodeAddress function
// Slightly modified version to get the results and error message (if any) as well. And print it here and not in the geocode function
location = {};
geocode.geocodeAddress(argv.a, (errorMessage, results) => {
    if(errorMessage) {
        console.log(errorMessage);
        location = results;
    } else {
        console.log(JSON.stringify(results, undefined, 2));
        location = results;
    }
});
debugger;
console.log(location);

// if we keep the mapquest api fetching code geocode.js and dasrk sky api code forecast.js as seperate, then maybe these 2 behave in async manner therefore, forecast function might get called in app.js before location has been fetched by geocode.js. Therefore we need to make latitude/longitude fetching and forecast fetching in a sequence i.e sync call
// Thats why calling forecast seperately wont work
forecast.weatherForecast(location, (errorMessage, results) => {
    if(errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(JSON.stringify(results, undefined, 2));
    }
});



