const fs      = require('fs');
const request = require('request');

const geocode = (address, callback) => {
    const url = "http://api.positionstack.com/v1/forward?access_key=110d189c4a8800d05e6529d1ea34010c&query=" + encodeURIComponent(address) + "";

    request({ url: url, json: true}, (error, response) => {
        if(error){
            callback('Error: Unable to connect to location services!', undefined);
        }else if(response.body.error){
            callback('Error: Unable to find the location, try another location!', undefined);
        }else if(response.body.data.length === 0){
            callback('Error: Sorry, No locations found', undefined);
        }else{
            const location_data = response.body.data[0];

            callback(undefined, {
                latitude: location_data.latitude.toString(),
                longitude: location_data.longitude.toString(),
                location: location_data.label
            })
        }
    });
}

module.exports = geocode;