
const http = require("http");
const fs = require("fs");
var requests = require("requests");

const homeFile = fs.readFileSync("./index.html", "utf8");
const replaceVal = (tempVal, orgval) => {
 let temmperature = tempVal.replace("{%tempval%}", orgval.main.temp);
 temmperature = temmperature.replace("{%tempmin%}", orgval.main.temp_min);
 temmperature = temmperature.replace("{%tempmax%}", orgval.main. temp_max);
 temmperature = temmperature.replace("{%location%}", orgval.name);
 temmperature = temmperature.replace("{%country%}", orgval.sys.country);
 temmperature = temmperature.replace("{%tempstatus%}", orgval.weather[0].main);

 return temmperature;
}
const server = http.createServer((req,res)=>{
  if(req.url == "/"){
    requests('https://api.openweathermap.org/data/2.5/weather?q=sylhet&units=metric&appid=893e529b235dcc2d5b4ffff75da37d20')
.on('data',  (chunk) => {
  const objdata = JSON.parse(chunk)
  const arrData = [objdata];
  //console.log(arrData[0].main.temp);
  const realTimeData = arrData.map((val) => replaceVal(homeFile,val)).join("");

   res.write(realTimeData);
  // console.log(realTimeData);

  
})
.on('end',  (err) => {
  if (err) return console.log('connection closed due to errors', err);
 
  //console.log('end');
  res.end();
});
  }
});

server.listen(3000, "127.0.0.1");