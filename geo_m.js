const fs = require('fs');
var getData = function() {
  let read_data = fs.readFileSync('./geolokalizator.json');
  let arr = JSON.parse(read_data);
  console.log(arr);
}; 
var putData = function(set_latitude, set_longitude) {
  if(set_latitude === undefined || set_longitude === undefined)
  {
    console.log("Brak wymaganych argumentów: latitude, longitude");
    return 1;
  }
  let value_latitude = set_latitude.split("=");
  let value_longitude = set_longitude.split("=");
  let data = new Object();
  data.latitude = value_latitude[1];
  data.longitude = value_longitude[1];  
  let name = new Array();
  name[0] = "latitude";
  name[1] = "longitude";
  let next_jsonText = JSON.stringify(data, name);

  let read_data = fs.readFileSync('./geolokalizator.json');
  let arr = JSON.parse(read_data);
  arr[arr.length]=next_jsonText; 
  let ready_arr = JSON.stringify(arr);

  fs.writeFileSync('./geolokalizator.json', ready_arr);
  console.log("ZAPISANO");
};
var delData = function(set_latitude, set_longitude) {
  if(set_latitude === undefined || set_longitude === undefined)
  {
    console.log("Brak wymaganych argumentów: latitude, longitude");
    return 1;
  }
  let value_latitude = set_latitude.split("=");
  let value_longitude = set_longitude.split("=");
  let read_data = fs.readFileSync('./geolokalizator.json');
  let arr = JSON.parse(read_data);
  let name = new Array();
  del = '{"latitude":"' + value_latitude[1] + '","longitude":"' + value_longitude[1] + '"}';  
  for(let i=0; i<arr.length; i++)
  {
    if(arr[i] == del)
    {
      arr.splice(i,1);
    }
  }
  let ready_arr = JSON.stringify(arr);
  fs.writeFileSync('./geolokalizator.json', ready_arr);
};
var getHelp = function() {
  console.log("HELP message");
};
module.exports = {
 getData,
 putData,
 delData,
 getHelp
};