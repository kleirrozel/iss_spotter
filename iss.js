const request = require('request');


/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
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

/**
 * Makes a single API request to retrieve the lat/lng for a given IPv4 address.
 * Input:
 *   - The ip (ipv4) address (string)
 *   - A callback (to pass back an error or the lat/lng object)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The lat and lng as an object (null if error). Example:
 *     { latitude: '49.27670', longitude: '-123.13000' }
 */
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
                            "longitude": data.longitude};
      callback(null, coordinates);
      return;
    }
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */

const fetchISSFlyOverTimes = function(coordinates, callback) {
  request(`http://api.open-notify.org/iss/v1/?lat=${coordinates.latitude}&lon=${coordinates.longitude}&alt=1650`, (error, response, body) => {
    if (error) {
      callback(error);
    }
    if (response && response.statusCode !== 200) {
      callback(error);
     
    }
    if (body) {
      const obj = JSON.parse(body);
      const flyTimes = { "flytimes": obj.response };
      callback(null, flyTimes);
    }
  });
};


module.exports = {  fetchMyIP,
                    fetchCoordsByIP,
                    fetchISSFlyOverTimes };