const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
const { title } = require("process");
app.use(bodyParser.urlencoded({ extended: true}));

app.engine("ejs", require("ejs").renderFile);
app.use(express.static("public"));
app.set("view engine", "ejs");

const names = [];
let tasks = [];

const isPostmanRequest = (req) => {
    return req.headers['user-agent'].includes('Postman');
  };

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/html/index.html");
  });

app.get('/greet', (req, res) => {
    n = req.query.name;
    names.push(n);
    console.log(n);
    res.render('greeting', {names, tasks});
});

app.get('/wazzup', (req, res) => {
    n1 = req.query.name;
    console.log(n1);
    res.render('wazzup', {n1});
})

app.get('/delete-task', (req, res) => {
    
    const task = req.query.task;
    tasks.splice(tasks.indexOf(task), 1);
    res.render('greeting', {names, tasks});
  });

app.post('/task', (req, res) => {
    tasks.push(req.body.tasks);
    console.log(tasks);
    res.render('greeting', {names, tasks});
})

app.get('/task', isPostmanRequest, (req, res) => {
    const jsonTasks = JSON.stringify(tasks);
    res.setHeader('Content-Type', 'application/json');
    res.send(jsonTasks);
  });

app.listen(3000, (err) => {
    console.log("Listening on port 3000");
});