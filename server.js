const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 8080;
const bdd = require('./bdd.js');

let jsonParser = bodyParser.json();
let urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));

/* post methods */
app.post('/login', urlencodedParser, function (req, res) {

  let result;

  console.log('Attempt to log in with ', req.body);
  bdd.getUserToken(req.body.username, req.body.password, (token) => {
    if (token === 0) {
      result = {
        success : false,
        message: "Incorrect username or password"
      }
    }
    else {
      result = {
        success : true,
        message: "Authentification success",
        value: token
      }
    }

    console.log(result);

    res.send(result);
  });
});

app.post('/signup', urlencodedParser, function (req, res) {

  console.log('Attempt to sign up with ', req.body);

  bdd.createUser(req.body.username, req.body.password, (val) => {

    let result;

    if (val == 0) {
      result = {
        success : false,
        message: "Username already taken"
      }
    }
    else {
      result = {
        success : true,
        message: "Account Created Successfuly"
      }
    }
  
    res.send(result);
  })
});

app.post('/getGroups', urlencodedParser, function (req, res) {

  bdd.getTasksGroupsByUserID(req.body.token, (data) => {

    let result = {success: true};

    if (data === 0) {
      result.groups = [];
    }
    else {
      result.groups = data;
    }

    res.send(result);
  })
});

app.post('/getTasks', urlencodedParser, function (req, res) {

  bdd.getTasksByGroupID(req.body.group_id, (data) => {

    let result = {success: true};

    if (data === 0) {
      result.tasks = [];
    }
    else {
      result.tasks = data;
    }

    res.send(result);
  })
});

app.post('/createGroup', urlencodedParser, function (req, res) {

  bdd.createGroupTask(req.body.name, req.body.token, (data) => {
    res.send({success: true});
  })
});

app.post('/updateGroups', urlencodedParser, function (req, res) {

  bdd.updateGroup(req.body.id, req.body.name, (data) => {
    res.send({success: true});
  })
});

app.post('/createTask', urlencodedParser, function (req, res) {

  bdd.createTask(req.body.name, req.body.group_id, (data) => {
    res.send({success: true});
  })
});

app.post('/updateTasks', urlencodedParser, function (req, res) {

  bdd.updateTask(req.body.id, req.body.name, req.body.done, (data) => {
    res.send({success: true});
  })
});

app.post('/removeTask', urlencodedParser, function (req, res) {

  bdd.removeTask(req.body.id, (data) => {
    res.send({success: true});
  })
});

app.post('/removeGroup', urlencodedParser, function (req, res) {

  bdd.removeGroup(req.body.id, (data) => {
    res.send({success: true});
  })
});

app.listen(port,() => {
  console.log("Server up and running on port", port)
})