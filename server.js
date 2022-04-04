const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 8080;

let jsonParser = bodyParser.json();
let urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));

/* post methods */
app.post('/login', urlencodedParser, function (req, res) {

  let result = {
    success : true,
    message: "Authentification success"
  }

  console.log('Attempt to log in with ', req.body);


  if (req.body.username != 'admin' || req.body.password != 'admin') {
    result.success = false;
    result.message = "Incorrect username or password";
  }

  res.send(result);
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