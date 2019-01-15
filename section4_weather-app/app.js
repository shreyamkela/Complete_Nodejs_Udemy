const request = require('request');
const fs = require('fs');
const yargs = require('yargs');

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

// The adress input from command line has spaces which have to be converted to %20 (special character for space) before passing as the address identifier in the url
// For these purposes we use encode and decode URI (Uniform resource identifier)

var encodedAddress = encodeURIComponent(argv.a);
console.log(encodedAddress);

var secretKey = fs.readFileSync('secret-key.txt', 'utf-8'); // save the key from mapquestapi (i.e the map api) into a local file and read from into a variable, so that the key is not shared with others. secret-key.txt would only be present on your machine and will not be uploaded on git as we include secret-key.txt in gitignore. Not showing keys publicly is an essential practice for keys

request({ // this first argument of request is the options object
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=${secretKey}&location=${encodedAddress}`, // including secret key in url by using Template string
    json: true
}, (error, response, body) => { // This argument is the callback func that will return the response. Here (error, response, body) is the format specified by the package documentation for request package 
    // console.log(JSON.stringify(body)); // This will print the body but wrap the big objects inside body to [Object] when printing. Therefore we use pretty printing by using JSON.stringify, to format json objects when we print them to console
    //console.log(JSON.stringify(body, undefined, 2)); // 2nd arg is a set of properties that are not usually used so we leave them undefined. 3rd arg specifies the indentation spaces in the JSON printing
    console.log(`Address: ${body.results[0].providedLocation.location}\nLatitude: ${body.results[0].locations[0].displayLatLng.lat}\nLatitude: ${body.results[0].locations[0].displayLatLng.lng}`); // Use JSONview chrome extension to pretty print the json object when the url is passed in chrome. Hover cursor anywhere on the JSON output to see the full path for that particular key value pair, and rightclick for JSONview options to copy path
});