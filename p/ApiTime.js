const func = require('./func.js');

var timeZone = function(valueToSend, lat, lng, res)
{
	var timeUtc = new Date();
  var hoursUtc = timeUtc.getHours();
	func.googleMapsClient.timezone({location: lat + " " + lng}).asPromise() // pobranie czasu
	  .then(function(response) {
	    error = func.errorAlive(response, res);
	    if(error == false)
	    {
	      timeUtc.setHours(hoursUtc - response.json.rawOffset/3600);
	      var time = timeUtc.toString();
	      time = time.split(" ");
	      time.splice(5,4);  
	      time = time.join(" ");
	      valueToSend += "\n" + "UTC time: " + time;
	      func.resp(valueToSend, res);
	    }
	  })
	  .catch((err) => {
	    valueToSend = "Niezidentyfikowany blad serwera. Sprobuj ponownie!" + err;
	    func.resp(valueToSend, res);
	  });
}

module.exports = {
	timeZone
};