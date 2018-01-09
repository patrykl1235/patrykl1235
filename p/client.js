var http = require('http');
var querystring = require('querystring');

const yargs = require('yargs') 
    .version("1.0")
    //.command('addres', 'Zwraca szerokosc długosc i wysokosc geograficzna oraz czas lokalny wpisanego adresu')
    .option('address', {
        alias: 'a',
        describe: 'Zwraca szerokosc długosc i wysokosc geograficzna wysokosc nad poziomem morza oraz czas lokalny wpisanego adresu',
        type: 'string',
        })

    var arg = yargs.argv;  // przejecie argumentow wiersza polecen
    var info = "bad_value";

    var options = {   //konfiguracja polaczenia http
        hostname: 'localhost',
        port: 3000,
        method: 'POST',
    };
/**Sprawdzenie czy wpisano poprawne argumenty wiersza polecen i czy poprawną ich liczbe**/
if(arg._[0]=="address"){
	if(arg._.length < 2)
		console.log("Po poleceniu address wpisz dane lokalizacyjne.");
	else{
    info = "address ";
    for (var i=0; i<arg._.length-1; i++) 
  	  info += arg._[i + 1] + " ";
  }
}
else if(arg._[0]=="Help") {
  console.log("Dozwolone polecenia to: ");
  console.log("address - Zwraca szerokosc długosc i wysokosc geograficzna wysokosc nad poziomem moza oraz czas UTC wpisanego adresu");
}
else {
  console.log("Wprowadzono niepoprawne polecenie.");
  console.log("Dozwolone operacje to: address (dowolna wieksza od zera liczba argumentow)");
}
if(info != "bad_value") // jeżeli nie wpisano błędnych argumentów nawiązane zostaje połączenie z serwerem
{
  var req = http.request(options, function (res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {  // oczekiwanie na odpowiedz od serwera
      console.log('Odpowiedz od serwera:');
      console.log(chunk);
    });
    res.on('end', function () {
      //dopisać jeśli coś ma wykonać po skończeniu otrzymywania danych
    });
  });

  req.write(querystring.stringify({ name: info })); // wysłanie do serwera wpisanych argumentów wiersza poleceń
  req.end();
}
