//jshint esversion: 6
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = new express();

app.use(express.static("pablic"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "\\signup.html");
});

app.post("/", function(req, res) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;

  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us20.api.mailchimp.com/3.0/lists/6410473fab",
    method: "POST",
    headers: {
      Authorization: "ytorai1 0453de66d42e07e510bc632c4be09d4f-us20"
    },
      body: jsonData
  };
  request(options, function(error, response, body) {
    if (error) {
      res.send("There was error");
    } else if (response.statusCode === 200) {
      res.sendFile(__dirname + "\\success.html");
    } else {
      res.sendFile(__dirname + "\\failure.html");
    }
  });
});

app.post("/failure", function(req, res) {
  res.redirect('/');
});
app.listen((process.evn.PORT), function() {
  console.log("The server is running on port 3000");
});

//API key
//0453de66d42e07e510bc632c4be09d4f-us20

//Unique key
//6410473fab
