var User = require("../models/user");
exports.usersignup = function(req, res) {
  var results = {};
  var myobj = new User({
    user: {
      username: req.username,
      password: req.password,
      Lname: req.Lname
    }
  });

  var promise = myobj.save();
  promise
    .then(function(data) {
      console.log("signup  request");
      console.log(data);
      results.value = data;
      if (data) {
        results.code = 200;
        results.message = "user signed up successfully";
      }
      res.status(200).send(results);
    })
    .catch(function(err) {
      console.log("error:", err.message);
      results.code = "400";
      res.status(400).send(results);
    });
};
