const request = require('request');
const fs = require('fs');

var weatherForecast = (newLocation, callback) => {
    var location = `${newLocation.latitude},${newLocation.longitude}`;
    var secretKey = fs.readFileSync('./forecast/secret-key.txt', 'utf-8'); 
    request({ // this first argument of request is the options object
        url: `https://api.darksky.net/forecast/${secretKey}/${location}`,
        json: true
    }, (error, response, body) => { // This argument is the callback func that will return the response. Here (error, response, body) is the format specified by the package documentation for request package 
        // We add a few error checks. One error is when the network fails to connect which will be shown in the 'error' object of request (request relates to network so the errors associated with it also relate to the network). Another error that we handle is an input address which is not present in the database of the map api, which we check by status code in returned JSON
        if(error || body.error === 400) {
            callback('Unable to fetch weather.'); // Dont need to pass anything as the second argument. This line would be interpretted as first argument i.e errorMessage
        } else { // If location is valid and no error then the output json from darksky api does not have 'error' key
                callback(undefined, {
                currently: body.currently.temperature
            });
        }
        
    });
};

module.exports.weatherForecast = weatherForecast; // As there is only one function to be exported, we create the export object in this fashion