const ApiGeocode = require('./ApiGeocode.js');
const func = require('./func.js');
var http = require('http');
var qs = require('querystring');
var server = http.createServer().listen(3000); //stworzenie instancji serwera

server.on('request', function (req, res) { // uruchomienie serwera
    var body = '';
    req.on('data', function (data) { // czytaj dane dopóki przychodzą od klienta
        body += data;
    });
    req.on('end', function () { // jesli skonczono odbiór danych wokonaj funkcje:
      var post = qs.parse(body).name; 
      var funcName = func.splitMsg(post ,0); //funcName - nazwa funkcji do uruchomienia
      var valueToSend = "Blad serwera - nie wpisano wartosci do wyslania";
      if (funcName == "address") { 
      	func.firstOut(post); // wytnij pierwszy element tablicy czyli address - pozostaw w niej reszte danych
        ApiGeocode.geocode(valueToSend, res, post); // wywołanie zapytań do api w łańcuchu obietnic: ApiGeocode -> ApiElevation -> ApiTime
      }
      else { 
        valueToSend = "Serwer otrzymal bledna wartosc - address";
      }
    });
});