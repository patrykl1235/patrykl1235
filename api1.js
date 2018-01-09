const fs = require('fs');
var getapi1 = function(adrr) {
  var url_value = encodeURIComponent(adrr);
  var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + url_value + "&key=AIzaSyCTdgfOMmx45Dth7aPPV6bkICozAUQYkNY";
  var request = require('request');
  return new Promise((resolve, reject) => {
    request(url, {json:true}, (err, res, body) => {
    //var ll = body.results[0]['geometry'].location.lat;
    console.log('Address: ', body.results[0]['formatted_address']);
    console.log('latitude: ', body.results[0]['geometry'].location.lat, ', longitude: ', body.results[0]['geometry'].location.lng); 
    resolve(body.results[0]['geometry'].location) 
    })
  })
}; 

module.exports = {
 getapi1
};