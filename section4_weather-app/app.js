const request = require('request');
const fs = require('fs');

var secretKey = fs.readFileSync('secret-key.txt', 'utf-8'); // save the key from mapquestapi (i.e the map api) into the variable so that it is not visible to others. secret-key.txt would only be present on your machine and will not be uploaded on git as we will include secret-key.txt in gitignore. Not showing keys publicly is an essential practice for keys
//console.log(secretKey);

request({ // first argument is the options object
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=${secretKey}&location=1301%20lombard%20street%20philadelphia`,
    json: true
}, (error, response, body) => { // This argument is the callback func that will return the response. Here (error, response, body) is the format specified by the package documentation for request package 
    console.log(body);
});