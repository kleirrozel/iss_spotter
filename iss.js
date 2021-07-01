const request = require('request');

const fetchMyIP = function(callback) {
  request(`https://api.ipify.org?format=json`, (error, response, body) => {
    if (error) {
      // error = `${error}`;
      callback(error, null);
      // console.log(error);
      return;
    }
    if (response && response.statusCode !== 200) {
      // error = `${response && response.statusCode}`;
      callback(error(`Status Code: ${response.statusCode} when fetching IP address: ${body}.`), null);
      // console.log(`${response && response.statusCode}`);
      return;
    }
    if (body) {
      // console.log(body)
      const ipCoordinates = JSON.parse(body);
      callback(null, ipCoordinates);
      return;
    }
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response && response.statusCode !== 200) {
      const message = `Status Code: ${response.statusCode} when fetching coordinates for your IP. Response: ${body}.`;
      callback(message, null);
      return;
    }

    if (body) {
      const data = JSON.parse(body);
      const coordinates = { "latitude": data.latitude, 
                            "longitude": data.longitude}
      callback(null, coordinates);
      return;
    }
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };