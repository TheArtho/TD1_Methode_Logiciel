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
  bdd.getUser(req.body.username, req.body.password, (token) => {
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

  let result = {
    success : true,
    message: "Account Created Successfuly"
  }

  console.log('Attempt to sign up with ', req.body);


  if (req.body.username == 'user') {
    result.success = false;
    result.message = "Username already taken";
  }

  res.send(result);
});

app.listen(port,() => {
  console.log("Server up and running on port", port)
})