const yargs = require('yargs');
const fs = require('fs');
const axios = require('axios');

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


var FtoCconvertor = (ftemp) => { // Fahrenheit to Centigrade - Mapquest API return Fahrenheit temperature
    ctemp = (5/9)*(ftemp-32);
    // console.log(ctemp);
    ctemp = ctemp.toFixed(2); // round off to 2 decimal places
    return ctemp;
}


//USING AXIOS - In simple chained promises we had to use request() inside promise. Request returns resolve if successful and reject if error
// We had to wrap request() inside promise, as request does not support promises. A better way to do this is using axios that support promises itself

var encodedAddress = encodeURIComponent(argv.a);
var secretKey_geocode = fs.readFileSync('./geocode/secret-key.txt', 'utf-8');
var geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${secretKey_geocode}&location=${encodedAddress}`;
            
axios.get(geocodeUrl).then((response) => { // axios.get() performs get request on geocodeUrl and fetches the get request response json which is saved in response
    // console.log(response);
    // console.log(response.data.info.statuscode);
    if(response.data === '') { // In mapquestapi/command line input pass '-------------------' as address which is invalid for map quest api. FOr this case, response.data === ''. Also, map quest documentation says that when address invalid then info.statuscode == 400 i.e response.data.info.statuscode == 400 therefore we include that condition as an else condition to response.data being ''. If response.data = '' then checking for response.data.info.statuscode == 400 without an else clause would give runtime error
        throw new Error('Unable to find that address.');
    } else if(response.data.info.statuscode == 400) {
        throw new Error('Unable to find that address.');
    }   

    // If no errors thrown do this:
    var lat = response.data.results[0].locations[0].latLng.lat;
    var lng = response.data.results[0].locations[0].latLng.lng;
    var secretKey_forecast = fs.readFileSync('./forecast/secret-key.txt', 'utf-8'); 
    var forecastUrl = `https://api.darksky.net/forecast/${secretKey_forecast}/${lat},${lng}`;
    return axios.get(forecastUrl); // This will call the next then();    

}).then((response) => {
    // No need to check for errors as here, the data/code returned would be valid as geo code was valid and therefore lat lng was valid and therefore there would be a valid temperature. If there is not, then it is a problem on the dasksky API side, and not on our side
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    // console.log(`It's currently ${temperature} Fahrenheit. It feels like ${apparentTemperature} Fahrenheit`);
    console.log(`It's currently ${FtoCconvertor(temperature)} Fahrenheit. It feels like ${FtoCconvertor(apparentTemperature)} Fahrenheit`);
}).catch((error) => {
    // console.log(error); // Error when the api server fails or error when address entered is invalid. All types of errors can be caught into this catch() when 'throw new error' (for axios, which is similar to reject() in promises)  is used inside then().
    if(error.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers');
    }  else { // If other error like address invalid
        console.log(error.message);
    }
});