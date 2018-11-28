var User = require("../models/user");
exports.getnotifications = function(req, res) {
  var results = {};
  console.log("notifications  data-"+req);
  var pipeline = [
    {
      $match: {
        "user.username": {
          // $eq: "john doe"
          $eq: req.body.username
        }
      }
    },
    {
      $project: {
        sentrequests: "$sentrequests",
        _id: 0
      }
    },

    { $unwind: "$sentrequests" },
    // {
    //   $match: {
    //     "sentrequests.status": {
    //       $eq: 3
    //     }
    //   }
    // }
  ];
  var promise = User.aggregate(pipeline).exec();
  promise
    .then(function(data) {
      console.log("notifications  data-");
      console.log(data);
      results.value = data;
      if (data) {
        results.code = 200;
      }
      res.status(200).send(results);
    })
    .catch(function(err) {
      // just need one of these
      console.log("error:", err.message);
      results.code = "400";
      res.status(400).send(results);
    });
};
