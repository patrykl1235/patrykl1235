const fs = require('fs');
var getapi2 = function(object) {
  var url = "https://maps.googleapis.com/maps/api/timezone/json?location=" + object.lat + "," + object.lng + "&timestamp=1458000000&key=AIzaSyDzmKRscCZqc1SlGUdbnoRqvbYjjyxmf6k";
  var request = require('request');
  request(url, {json:true}, (err, res, body) => {
  var currentDate = new Date(new Date().getTime()+(body.rawOffset*1000));
  console.log("Time: ", currentDate);
})
}; 

module.exports = {
 getapi2
};