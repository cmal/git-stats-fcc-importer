'use strict';

// Dependencies
var GitStats = require("git-stats");
var request = require("request");

var _username = process.argv[2];

// Create the GitStats instance
var gs = new GitStats();

// var inputData = {
//   stats: {
//     username: "fcccc4f8191",
//     stats: [{
//       date: 1479552008474,
//       hash: "6dedf981ecab9ce1b3f997508dcb796f90838328"
//     }, {
//       date: 1479619115285,
//       hash: "051284a491a053ba29896deaf7a49f17ade241c1"
//     }, {
//       date: 1479619250135,
//       hash: "3aa47ee34e5bab839c88bfb411f1946e84253fea"
//     }]
//   }
// };


gs.get(function(err, stats) {
  var finalData = stats;
  var url = 'https://www.freecodecamp.com/api/users/stats?username='+ _username;
  request.get(url)
    .on('error', function(err) {
      console.log('Error ocurred when trying to request ' + url);
      console.log(err);
    })
    .on('data', function(resp) {
      var data = JSON.parse(resp);
      if (!data.hasOwnProperty('stats')) {
        console.log("Error occured when trying to access FreeCodeCamp's API...");
        if (data.hasOwnProperty('error')) {
          console.log(data.error.message);
        }
        return;
      }
      data.stats.stats.forEach(function(item) {
        gs.record({
          date: new Date(item.date),
          save: false,
          hash: item.hash,
          _data: stats
        }, function(err, new_stats) {
          if (err) { console.log(err); }
        });
      });
      gs.save(finalData);
    });
});
