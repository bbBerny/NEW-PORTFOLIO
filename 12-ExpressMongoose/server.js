require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const mongoUrl = `mongodb+srv://${user}:${password}@cluster0.ehqhr4u.mongodb.net/f1?retryWrites=true&w=majority`;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// Definition of a schema
const teamSchema = new mongoose.Schema({
  id: Number,
  code: String,
  label: String,
  country: String,
  url: String,
});
teamSchema.set("strictQuery", true);

const driverSchema = new mongoose.Schema({
  num: Number,
  code: String,
  forename: String,
  surname: String,
  dob: Date,
  nationality: String,
  url: String,
  team: teamSchema,
});
driverSchema.set("strictQuery", true);

const Team = mongoose.model("Team", teamSchema);
const Driver = mongoose.model("Driver", driverSchema);

let countries = [
  { code: "ENG", label: "England" },
  { code: "SPA", label: "Spain" },
  { code: "GER", label: "Germany" },
  { code: "FRA", label: "France" },
  { code: "MEX", label: "Mexico" },
  { code: "AUS", label: "Australia" },
  { code: "FIN", label: "Finland" },
  { code: "NET", label: "Netherlands" },
  { code: "CAN", label: "Canada" },
  { code: "MON", label: "Monaco" },
  { code: "THA", label: "Thailand" },
  { code: "JAP", label: "Japan" },
  { code: "CHI", label: "China" },
  { code: "USA", label: "USA" },
  { code: "DEN", label: "Denmark" },
];

let teamsRAW = [
  {code: "mercedes", label: 'Mercedes', country: 'GER'},
  {code: "aston_martin", label: 'Aston Martin', country: 'ENG'},
];

let teams = [];
let drivers = [];

app.use('/', async (req, res, next) => {
  //TODO GET THE NAME OF THE TEAMS FROM DB TO SHOW IN THE FORM
  if(teams.length === 0){
    //load info from db
    var teamsDB = await Team.find({}).exec();

    if(!Array.isArray(teamsDB) || teamsDB.length === 0) {
      //I have an empty array. I need to populate
      await Team.insertMany(teamsRAW)
        .then(() => {
          console.log('Teams Inserted');
      })
        .catch((error) => {
          console.error(error);
      });
      await Team.find(teamsRAW)
        .then((docs) => {
          console.log('Found the following teams');
          console.log(docs);
          teams = docs;
        })
      .catch((error) => {
        console.log(error);
      })
    }else{
    teams = teamsDB;
    console.log(teamsDB);
  }
  }
  next();
});

app.get("/", (req, res) => {
  res.render('index', { countries, teams, drivers })
});

app.post('/driver', async (req, res) => {
  //TODO Get the info from the form
  var team = await Team.findOne({code: {$eq: req.body.team}}).exec();
  var driver = new Driver({
    num: req.body.num,
    code: req.body.code,
    forename: req.body.name,
    surname: req.body.lname,
    dob: req.body.dob,
    nationality: req.body.nation,
    url: req.body.url,
    team: teamSchema,
  });
  driver.save();
  drivers.push(driver);
  /*
  await Driver.insertOne(driver)
        .then(() => {
          console.log('Driver saved');
          drivers.push(driver);
      })
        .catch((error) => {
          console.error(error);
      });
  */
  res.redirect('/');
});




app.listen(3000, (err) => {
  console.log("Listening on port 3000");
});
