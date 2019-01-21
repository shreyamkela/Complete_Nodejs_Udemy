const request = require('request');
const fs = require('fs');

//USING PROMISES - request() inside promise. Once request returns resolve if successful and reject if error
var getWeather = (lat, lng) => {
    return new Promise((resolve, reject) => {
        var secretKey = fs.readFileSync('./forecast/secret-key.txt', 'utf-8'); 
        request({ // this  first argument of request is the options object
            url: `https://api.darksky.net/forecast/${secretKey}/${lat},${lng}`,
            json: true
        }, (error, response, body) => { 
            if(error || body.error === 400) {
                reject('Unable to fetch weather.'); 
            } else { 
                    resolve({
                    temperature: body.currently.temperature,
                    apparentTemperature: body.currently.apparentTemperature
                    });
            }    
        });
    });
};

module.exports.getWeather = getWeather; // As there is only one function to be exported, we create the export object in this fashion