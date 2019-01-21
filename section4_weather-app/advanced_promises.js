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

// geocode.geocodeAddress(argv.a); // A simple call to the abstracted away geocodeAddress function
// Slightly modified version to get the results and error message (if any) as well. And print it here and not in the geocode function

geocode.geocodeAddress(argv.a).then((results) => {
    console.log(`Address: ${results.address}`);
    return forecast.getWeather(results.latitude, results.longitude)
}).then((weatherResults) => {
    console.log(`It's currently ${weatherResults.temperature} Fahrenheit. It feels like ${weatherResults.apparentTemperature} Fahrenheit`);
}).catch((errorMessage) => {
    console.log(errorMessage);
}); 