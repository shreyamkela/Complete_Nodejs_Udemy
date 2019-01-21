const yargs = require('yargs');
const geocode = require('./geocode/geocode'); //geocode.js can be called as simply geocode 
const forecast = require('./forecast/forecast.js');

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

geocode.geocodeAddress(argv.a, (errorMessage, results) => {
    if(errorMessage) {
        console.log(errorMessage);
    } else {
        //console.log(JSON.stringify(results, undefined, 2));
        console.log(`Address: ${results.address}`);
        // Adding getWeather call inside callback of geocode makes the geocodeAddress call and getWeather call sync calls i.e in a sequence
        forecast.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => { // We only need to pass an object with lattitude and longitude, into the 1st argument. location has only 1 more argument of address therefore we can go on to pass location itself
            if(errorMessage) {
                console.log(errorMessage);
            } else {
                //console.log(JSON.stringify(weatherResults, undefined, 2)); // undefined argument is a filtering function
                console.log(`It's currently ${weatherResults.temperature} Fahrenheit. It feels like ${weatherResults.apparentTemperature} Fahrenheit`);
            }
        });
    }
});
