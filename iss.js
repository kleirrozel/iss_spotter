const request = require('request');

const fetchMyIP = function(callback) {
  request(`https://api.ipify.org?format=json`, (error, response, body) => {
    if (error) {
      // error = `${error}`;
      callback(error, null);
      // console.log(error);
    }
    if (response && response.statusCode !== 200) {
      // error = `${response && response.statusCode}`;
      callback(error(`Status Code: ${response.statusCode} when fetching IP address: ${body}.`), null);
      // console.log(`${response && response.statusCode}`);
    }
    if (body) {
      // console.log(body)
      const ip = JSON.parse(body);
      callback(null, ip);
    }
  });
};

module.exports = { fetchMyIP };