var User = require("../models/user");
exports.requestconsent = function(req, res) {
  console.log("request consent body", req.body);
  var sentObject = {
    sendername: req.body.sendername,
    preference: req.body.preference,
    level: req.body.level,
    status: "Pending"
  };
  var receivedobj = {
    receivername: req.body.receivername,
    preference: req.body.preference,
    level: req.body.level,
    status: "Pending"
  };

  console.log(JSON.stringify(req.body));

  var query = User.findOneAndUpdate(
    { "user.username": req.body.receivername },
    { $push: { requests: sentObject } }
  );
  query
    .then(
      User.findOneAndUpdate(
        { "user.username": req.body.sendername },
        { $push: { sentrequests: receivedobj } },
        function(err, doc) {
          if (err) {
            res.code = "400";
            res.value = "Could not give consent";
            console.log(res.value);
            res.status(400).send({ message: "could not give consent" });
          } else {
            res.code = "200";
            res.value = doc;
            console.log(doc);
            res.status(200).send({ message: "successfully given consent" });
          }
        }
      )
    )
    .catch(function(err) {
      console.log("error:", err.message);
      res.code = "400";
    });

  // User.findOneAndUpdate(
  //   { "user.username": req.body.receivername },
  //   { $push: { requests: sentObject } },
  //   function(err, doc) {
  //     if (err) {
  //       res.code = "400";
  //       res.value = "Cannot request consent at moment";
  //       console.log(res.value);
  //       res.status(400).send({ message: "Cannot request consent at moment" });
  //     } else {
  //       User.findOneAndUpdate(
  //         { "user.username": "Stacy" },
  //         { $push: { sentrequests: sentObject } },
  //         function(err, doc) {
  //           if (err) {
  //             res.code = "400";
  //             res.value = "Could not give consent";
  //             console.log(res.value);
  //             res.status(400).send({ message: "could not give consent" });
  //           } else {
  //             res.code = "200";
  //             res.value = doc;
  //             console.log(doc);
  //             res.status(200).send({ message: "successfully given consent" });
  //           }
  //         }
  //       );
  //     }
  //   }
  // ).catch(function(err) {
  //   // just need one of these
  //   console.log("error:", err.message);
  //   res.code = "400";
  // });
};
