const fs = require('fs');
var getapi3 = function(object) {
  var url = "https://maps.googleapis.com/maps/api/elevation/json?locations=" + object.lat + "," + object.lng + "&key=AIzaSyDxtLBo2NRuCw5cHMpJk4ISUCvTqhLvIUs";
  var request = require('request');
  request(url, {json:true}, (err, res, body) => {  
  console.log('Place is ', body.results[0]['elevation'], ' meters above sea level');
})
}; 

module.exports = {
 getapi3
};