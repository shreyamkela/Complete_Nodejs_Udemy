const request = require('request');
const fs = require('fs');

// The address input from command line has spaces which have to be converted to %20 (special character for space) before passing as the address identifier in the url
// For these purposes we use encode and decode URI (Uniform resource identifier)


//USING PROMISES - request() inside promise. Once request returns resolve if successful and reject if error
var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        var encodedAddress = encodeURIComponent(address);
        var secretKey = fs.readFileSync('./geocode/secret-key.txt', 'utf-8'); // save the key from mapquestapi (i.e the map api) into a local file and read from into a variable, so that the key is not shared with others. secret-key.txt would only be present on your machine and will not be uploaded on git as we include secret-key.txt in gitignore. Not showing keys publicly is an essential practice for keys
        request({ // this first argument of request is the options object. Once this argument has completed calling, the returned object is passed in the 2nd argument i.e the callback function (error, response, body) => {...}
            url: `http://www.mapquestapi.com/geocoding/v1/address?key=${secretKey}&location=${encodedAddress}`, 
            json: true
        }, (error, response, body) => { 
            if(error) {
                reject('Unable to connect to the Server.'); 
            } else if(body.info.statuscode == 400) { 
                reject('Unable to find the address.'); 
            }
            else if(body.info.statuscode == 0) {
                resolve({ 
                    address: body.results[0].providedLocation.location,
                    latitude: body.results[0].locations[0].displayLatLng.lat,
                    longitude: body.results[0].locations[0].displayLatLng.lng
                });
            }
        });
    });   
};

module.exports.geocodeAddress = geocodeAddress; // As there is only one function to be exported, we create the export object in this fashion