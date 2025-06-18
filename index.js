// index.js
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


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", (req, res) => {
  const dateObj = new Date(req.params.date);

  if (dateObj.toDateString()  === "Invalid Date") {
    const dateNumber = Number(req.params.date);
    const dateObj2 = new Date(dateNumber);
    
    if (dateObj2.toDateString() !== "Invalid Date") {
      const utcString2 = dateObj2.toUTCString();
      
      res.json({
        unix: dateNumber,
        utc: utcString2,
      });
    } else {
      res.json({ error: "Invalid Date" });
    }
  } else {
    const utcString = dateObj.toUTCString();

    res.json({
      unix: Number(dateObj),
      utc: utcString,
    });
  }
});

app.get("/api", (req, res) => {
  const dateToday = Date.now(); // Unix timestamp in milliseconds
  const dateTodayUTC = new Date(dateToday).toUTCString();

  res.json({
    unix: dateToday,
    utc: dateTodayUTC,
  });
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
