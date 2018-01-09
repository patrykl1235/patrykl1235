const func = require('./func.js');
const ApiTime = require('./ApiTime.js');

var elevation = function(valueToSend, lat, lng, res)
{
	func.googleMapsClient.elevation({locations: lat + " " + lng}).asPromise() //pobranie npm.
    .then(function(response) {
	    error = func.errorAlive(response, res);
	    if(error == false)
	    {
	    	valueToSend += "\n" + "elevation: " + response.json.results[0].elevation;
	    	ApiTime.timeZone(valueToSend, lat, lng, res);
	    }
	  })
  	.catch((err) => {
    	valueToSend = "Niezidentyfikowany blad serwera. Sprobuj ponownie!" + err;
    	func.resp(valueToSend, res);
  	});
}

module.exports = {
	elevation
};