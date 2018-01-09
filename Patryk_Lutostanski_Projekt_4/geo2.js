const yargs =require('yargs');
//const api1 = require('./geo_m.js');
const api1 = require('./api1.js');
const api2 = require('./api2.js');
const api3 = require('./api3.js');
const argv = yargs.argv;

async function ShowData(addr) {
  try {
    const data = await api1.getapi1(addr);
    api2.getapi2(data);
    api3.getapi3(data);
  } catch(error) {
    console.log(`${error}`);
  }
}

if(process.argv[2]=="--help")
{
  geo_m.getHelp();
}

if(process.argv[2]=="GET")
{
  geo_m.getData();
}

if(process.argv[2]=="PUT")
{
  geo_m.putData(process.argv[3], process.argv[4]);
}

if(process.argv[2]=="DEL")
{
  geo_m.delData(process.argv[3], process.argv[4]);
}

if(process.argv[2]=="a")
{
  ShowData(process.argv[3]);
  /*
  api1.getapi1(process.argv[3]).then((result) => { 
  api2.getapi2(result);
  api3.getapi3(result);
  }, (err) => { console.error("Error")} );*/
}
