const request = require('request');
const fs = require('fs');

var secretKey = fs.readFileSync('secret-key.txt', 'utf-8'); // save the key from mapquestapi (i.e the map api) into a local file and read from into a variable, so that the key is not shared with others. secret-key.txt would only be present on your machine and will not be uploaded on git as we include secret-key.txt in gitignore. Not showing keys publicly is an essential practice for keys
//console.log(secretKey);

request({ // this first argument of request is the options object
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=${secretKey}&location=1301%20lombard%20street%20philadelphia`, // including secret key in url by using Template string
    json: true
}, (error, response, body) => { // This argument is the callback func that will return the response. Here (error, response, body) is the format specified by the package documentation for request package 
    console.log(body);
});