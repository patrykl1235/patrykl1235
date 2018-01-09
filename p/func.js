const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyChYakjlGEu3CB4dJ1qkmiHVN0OzSmwXLg',
  Promise: Promise
});

var splitMsg = function(s, numb) //funkcja dzieli otrzymany łańcuch i zwraca jego element o indeksie numb
{                                //dla elementow oddzielonych spacjami
  var ss = s.split(" ");
  for (var i in ss) {
    if(i == numb)
      return ss[i];
  }
}

var firstOut = function (post)
{
	post = post.split(" ");
  post.splice(0,1);  //wyciecie pierwszego elementu czyli address
  post = post.join(" ");
  return post;
}

var resp = function(valueToSend, res) //funkcja odsylajaca dane do klienta
{
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(valueToSend); //Wyślij "obliczoną" wartość do klienta
}

var errorAlive = function(response, res) //funkcja sprawdza jaki status zwróciło API i powiadamia o tym klienta jesli trzeba
{
  console.log("status to:");
  console.log(response.json.status);
  if(response.json.status == "OK"){
    return false;
  } else if(response.json.status == "ZERO_RESULTS"){
      resp("Nie znaleziono wyniku, sprobuj jeszcze raz.", res);
    return true;
  } else if(response.json.status == "OVER_QUERY_LIMIT"){
      resp("Wpisano zbyt dlugi ciag znakow.", res);
    return true;
  } else if(response.json.status == "REQUEST_DENIED"){
      resp("Zadanie zostalo odrzucone, sprobuj jeszcze raz", res);
    return true;
  } else if(response.json.status == "INVALID_REQUEST"){
      resp("Bledne zapytanie, sprobuj jeszcze raz", res);
    return true;
  } else if (response.json.status == "UNKNOWN_ERROR"){
      resp("Nieznany blad serwera, sprobuj jeszcze raz", res);
    return true;
  }
}

module.exports = {
	splitMsg,
	resp,
	errorAlive,
	firstOut,
	googleMapsClient
};