const fs      = require('fs');
const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=dc36dc8a6c272a6616406eda5fb723c2&query="+ latitude + "," + longitude +"";

    request({ url: url, json: true}, (error, response) => {
        if(error){
            callback('Error: Unable to connect to forecast services!', undefined);
        }else if(response.body.error){
            callback('Error: Unable to fetch the forecast right now!', undefined);
        }else{
            const data = response.body.current;

            callback(undefined, {
                description: data.weather_descriptions[0],
                temperature: data.temperature,
                feelslike: data.feelslike
            })
        }
    });
}

module.exports = forecast;