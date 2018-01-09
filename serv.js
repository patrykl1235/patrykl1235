const api1 = require('./api1.js');
const api2 = require('./api2.js');
const api3 = require('./api3.js');
const express = require('express');
const hbs = require('hbs');
const app = express();
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3000; 

var ShowData = async (addr) => {
  try {
    const data = await api1.getapi1(addr);
    api2.getapi2(data);
    api3.getapi3(data);
    return data;
  } catch(error) {
    console.log(`${error}`);
  }
}

app.set('view engine','hbs');
app.use(bodyParser.urlencoded({extended: true}));

app.post('/', async (req, res) => {
  var x = await ShowData(req.body.location);
	res.render('index.hbs', {
		lat: x.lat,
		lng: x.lng,
	});
});
app.get('/', function(req,res){
	res.render('index.hbs', {
		getYear: new Date().getFullYear(),
		lat: 0,
		lng: 0
	});
}); 

app.listen(PORT, () => {
	console.log('App listening on port',PORT,"!");
});