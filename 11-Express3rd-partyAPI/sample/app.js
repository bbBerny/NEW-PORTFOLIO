const express = require("express");
const ejs = require('ejs');
const https = require("https");
const bodyParser = require("body-parser");
const axios = require("axios");
const FormData = require("form-data");

const app = express();
app.set('view engine', 'ejs');

// https get
app.get("/", (req, res) => {
  var url = "https://placekitten.com/g/300/300";
  https.get(url, (response) => {
    console.log(response.statusCode);
    response.on("data", (data) => {
      res.write(data);
    });
  });
  res.render('index');
});

// https post
app.get("/dictionary", (req, res) => {
  var url = "https://api.toys/api/check_dictionary";
  const form_data = new FormData();
  form_data.append("text", "marry");
  const options = {
    method: "POST",
    headers: form_data.getHeaders(),
  };
  var soapRequest = https.request(url, options, (response) => {
    if (response.statusCode === 200) {
      response
        .on("data", (data) => {
          var jsonResp = JSON.parse(data);
          console.log(jsonResp);
          res.send("Success");
        })
        .on("error", (e) => {
          res.send("Error ${e.message}");
        });
    } else {
      res.send("Error");
    }
  });
  form_data.pipe(soapRequest);
});
let lat = 44;
let lon = 53;
let APIkey = '756208f19e734ca69ef266bb236402b9';
// axios post
app.get("/temp", (req, res) => {
  var url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`
  const form_data = new FormData();
  form_data.append("text", "marry");
  axios
    .post(url, form_data, { headers: form_data.getHeaders() })
    .then((response) => {
      var data = response.data;
      temperature = data.main.temp;
      icon = data.weather.icon;
      
      console.log(data);
      if (!data.hasOwnProperty("error")) {
        console.log("no error");
        const icon = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        console.log(iconUrl);
        res.render('response', {status: 'Success', iconUrl, temperature});
      } else {
        console.log("Fail");
        res.send("Fail");
      }
    })
    .catch((err) => {
      console.log(err.code + ": " + err.message);
      console.log(err.stack);
      res.send("Fail error");
    });
});

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
