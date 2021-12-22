// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// apt date endpoint :date is the url parameter and ? indicates it is optional
app.get("/api/:date?", function (req, res) {
  res.json(convertParamToObj(req.params.date));
});


app.get("/*", function (req, res) {
  res.sendStatus(404);
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


function convertParamToObj(dateParam) {

  if (dateParam === undefined) {

    return { unix: Date.now(), utc: new Date().toUTCString() };

  } else {

    const date = Number.isInteger(Number(dateParam)) ? new Date(Number(dateParam)) : new Date(dateParam);

    if (date.toString() === 'Invalid Date') {

        return { error: date.toString() };

    } else {

        return { unix: date.getTime(), utc: date.toUTCString() };

    }
  }
}
