// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// serve static files from /public
app.use(express.static('public'));

// root endpoint → serve index.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// test endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// timestamp microservice endpoint
app.get('/api/:date?', function (req, res) {
  var dateParam = req.params.date;

  // if no date is provided → current time
  if (!dateParam) {
    var now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString(),
    });
  }

  var date;

  // if dateParam is all digits → treat as timestamp
  if (/^\d+$/.test(dateParam)) {
    date = new Date(parseInt(dateParam));
  } else {
    // otherwise treat as date string
    date = new Date(dateParam);
  }

  // invalid date
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  // valid date response
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
