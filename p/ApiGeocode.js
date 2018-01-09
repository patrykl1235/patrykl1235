const func = require('./func.js');
const ApiElevation = require('./ApiElevation.js');

var geocode = function(valueToSend, res, post)
{
  func.googleMapsClient.geocode({address: post}).asPromise()//pobranie wys. szer/
    .then(function(response) {
	    error = func.errorAlive(response, res);
	    if(error == false)
	    {
	      var lat = response.json.results[0].geometry.location.lat;
	      var lng = response.json.results[0].geometry.location.lng;
	      valueToSend = "lat: " + lat + "\nlng: " + lng;
	      ApiElevation.elevation(valueToSend, lat, lng, res);
	    }  
    })
    .catch((err) => {
      valueToSend = "Niezidentyfikowany blad serwera. Sprobuj ponownie!" + err;
      func.resp(valueToSend, res);
    });
}

// powyższa funkcja musi zwrocic obiekt typu promise

module.exports = {
	geocode
};