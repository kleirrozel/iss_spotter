const { nextISSTimesForMyLocation  } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log(`Oops! I can't find your IP Address!`, error);
//     return;
//   }
//   console.log(`It worked! Returned IP: `, ip);
// });


// const ipCallback = function(error, data) {
//   if (error) {
//     console.log(`Oops! I can't find your coordinates! `, error);
//     return;
//   }
//   console.log(`These are you coordinates: `, data);
// };

// fetchCoordsByIP("99.246.222.46", ipCallback);


// const issFlyOverCallback = function(error, flyTimes) {
//   if (error) {
//     console.log(`It didn't work! `, error);
//     return;
//   } else {
//     console.log(`It works! These are the fly times based on your coordinates: `, flyTimes);
//   }
// };

// fetchISSFlyOverTimes({ latitude: "43.5419", longitude: "-79.6164" }, issFlyOverCallback);


// Important: risetime > fly.risetime

// const flyOverTimes = function(flyOver) {
//   for (const fly of flyOver) {
//     const dateOfFlight = new Date(0);
//     dateOfFlight.setUTCSeconds(fly.risetime);
//     const duration = fly.duration;
//     console.log(`Next pass at ${dateOfFlight} for ${duration} seconds!`);
//   }
// };

nextISSTimesForMyLocation((error, flyTimes) => {
  if (error) {
    console.log("It didn't work!", error);
  }

  for (sched of flyTimes.obj) {
    console.log(`This is when you will see the ISS ${Date(sched.risetime)} for ${sched.duration}.`)
  }
});