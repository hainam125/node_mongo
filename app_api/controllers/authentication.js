//curl localhost:3000/api/register -X POST --data "name=Nam&email=namnh3@yopmail.com&password=123123"
//curl localhost:3000/api/locations/59eebfe9f776e68d5b698f4c/reviews/59c2488055072b2b5bf0490a --header "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWVmZmNjNDk3ZWYwODA0OGY5OTNlMmIiLCJlbWFpbCI6Im5hbW5oM0B5b3BtYWlsLmNvbSIsIm5hbWUiOiJOYW0iLCJleHAiOjE1MDk1MjY1NjQsImlhdCI6MTUwODkyMTc2NH0.X-D65gLsNIMm1pu0cXjxSrZGEDZgI4Xlu8RW52hUahs"

var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
}

module.exports.register = function (req, res) {
  if(!req.body.name || !req.body.email || !req.body.password) {
    sendJsonResponse(res, 400, {message: "All fields required"});
    return;
  }

  var user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.setPassword(req.body.password);
  user.save(function (err) {
    var token;
    if(err) {
      sendJsonResponse(res, 404, err);
    }
    else {
      token = user.generateJwt();
      sendJsonResponse(res, 200, {token: token});
    }
  });
}

module.exports.login = function (req, res) {
  if(!req.body.email || !req.body.password) {
    sendJsonResponse(res, 400, {message: "All fields required"});
    return;
  }
  //authenticate start -> passport.use (passport.js) -> if not miss credential -> callback in here
  // if has all credential --> callback in passport.js --> callback here

  passport.authenticate('local', function (err, user, info) {
    var token;
    //console.log('2================ ', info);
    if(err) {
      sendJsonResponse(res, 404, err);
      return;
    }
    if(user) {
      token = user.generateJwt();
      sendJsonResponse(res, 200,{token:token});
    }
    else {
      sendJsonResponse(res, 401, info);
    }
  })(req, res);
}