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


//USING AXIOS - In simple chained promises we had to use request() inside promise. Request returns resolve if successful and reject if error
// We had to wrap request() inside promise, as request does not support promises. A better way to do this is using axios that support promises itself

var encodedAddress = encodeURIComponent(argv.a);
var secretKey = fs.readFileSync('./geocode/secret-key.txt', 'utf-8');
var geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${secretKey}&location=${encodedAddress}`;
            
axios.get(geocodeUrl).then((response) => { // axios.get() performs get request on geocodeUrl and fetches the get request response json which is saved in response
    console.log(response.data);
}).catch((error) => {
    // console.log(error); // Error when the api server fails
    if(error.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers');
    }  
});