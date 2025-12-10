// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS so that your API is remotely testable by FCC
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// serve static files from /public
app.use(express.static('public'));

// root endpoint → serve index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// test endpoint
app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello API' });
});

// timestamp microservice endpoint
app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;
  let date;

  if (!dateParam) {
    // No date provided → return current time
    date = new Date();
  } else {
    // If numeric, treat as timestamp (milliseconds)
    if (!isNaN(dateParam)) {
      date = new Date(Number(dateParam));
    } else {
      // Otherwise, treat as date string
      date = new Date(dateParam);
    }
  }

  // Validate date
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  // Return JSON response
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});

