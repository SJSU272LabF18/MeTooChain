var User = require("../models/user");
exports.giveconsent = function(req, res) {
  var results = {};
  User.update(
    {
      "user.username": "sojan",
      requests: {
        $elemMatch: {
          sendername: "john doe"
        }
      }
    },
    { $set: { "requests.$.status": 3 } },
    function(err, result) {
      if (result) {
        // results.code = 200;
        User.update(
          {
            "user.username": "john doe",
            sentrequests: {
              $elemMatch: {
                receivername: "sojan"
              }
            }
          },
          { $set: { "sentrequests.$.status": 3 } },
          function(err, result) {
            if (err) {
              res.code = "400";
              res.value = "Could not give consent";
              console.log(res.value);
              res.status(400).send({ message: "could not give consent" });
            } else {
              res.code = "200";
              res.value = result;
              console.log(result);
              res.status(200).send({ message: "successfully given consent" });
            }
          }
        );
      }
    }
  ).catch(function(err) {
    console.log("error:", err.message);
    results.code = "400";
    res.status(400).send(result);
  });
};
