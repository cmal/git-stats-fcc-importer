'use strict';

// Dependencies
var GitStats = require('git-stats');
var request = require('request');
var shasum = require('shasum');

var _username = process.argv[2] || '';

// Create the GitStats instance
var gs = new GitStats();

// input: {stats: username: string, stats: [{date: int, files: string}, ...]}
// output: [{date: int, url: '', hash: shasun_string}, ...]
function makeRecord(data) {
  var obj = [];
  if (!data.hasOwnProperty('stats')) {
    console.log('Error occured when trying to access FreeCodeCamp\'s API...');
  } else if (data.hasOwnProperty('error')) {
    console.log(data.error.message);
  } else if (!data.stats.hasOwnProperty('challengeMap')) {
    console.log('No challengeMap field returned from FreeCodeCamp\'s API.')
  } else {
    console.log('Got api data..');
    var cm = data.stats.challengeMap;
    Object.keys(cm).map(function(key) {
      if (cm[key].hasOwnProperty('completedDate') &&
          cm[key].hasOwnProperty('files')) {
        obj.push({
          date: cm[key].completedDate,
          hash: shasum(cm[key].files)
        });
      }
    });
  }
  return obj;
}

gs.get(function(err, stats) {
  var finalData = stats;
  // var url = 'https://www.freecodecamp.com/api/users/stats?username='+ _username;
  var url = 'http://localhost:3000/api/users/stats?username=fcccc4f8191';
  request.get(url)
    .on('error', function(err) {
      console.log('Error ocurred when trying to request ' + url);
      console.log(err);
    })
    .on('data', function(resp) {
      var data = makeRecord(JSON.parse(resp));
      data.forEach(function(item) {
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
      console.log('Done!');
    });
});
