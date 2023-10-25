const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true}));

app.engine("ejs", require("ejs").renderFile);
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/html/index.html");
  });

app.post('/submit', (req, res) => {
    const w = parseInt(req.body.weight);
    const h = parseInt(req.body.height);
    const bmi = (w / (h * h)) * 10000;
    console.log(bmi);
    res.render('index', {bmi});
});

app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(500).send("There was an error in the app"); 
  });

app.listen(3000, () => {
    console.log("Listening to port 3000");
});