//var users = require("../models/user");
var url = "mongodb://localhost:27017";
var MongoClient = require("mongodb").MongoClient;
const dbName = "dapp";
exports.login = function(req, res) {
  console.log("req is ", req.body);
  MongoClient.connect(
    url,
    {
      poolSize: 10
    },
    function(err, client) {
      if (err) {
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Invalid Credentials");
        throw err;
      } else {
        var username = req.body.username;
        // var password = req.body.password;
        const db = client.db(dbName);
        console.log("Database Connected");
        db.collection("users").findOne({ username: username }, function(
          findErr,
          result
        ) {
          if (findErr) {
            res.writeHead(400, {
              "Content-Type": "text/plain"
            });
            res.end("Invalid Credentials");
            throw findErr;
          } else {
            console.log("result is", result);
            console.log("USERNME", username);
            res.status(200).send({ message: "Succesfull login" });
            //     res.end("Successful Login");
            // bcrypt.compare(req.body.password, result.user.password, function(
            //   err,
            //   answer
            // ) {
            //   console.log("answer is " + JSON.stringify(answer));
            //   if (answer) {
            //     console.log("Herethree");
            //     const body = { _id: req.body.username, type: "traveler" };
            //     const token = jwt.sign({ user: body }, "verified_homeawayUser");
            //     res.cookie("cookie", req.body.username, {
            //       maxAge: 9000000,
            //       httpOnly: false,
            //       path: "/"
            //     });
            //     req.session.user = result;
            //     console.log("Successfully retrieving User");
            //     console.log("Username is " + JSON.stringify(username));
            //     res.status(200).send(token);
            //     res.end("Successful Login");
            //   } //if
            //   else {
            //     console.log("invalid cre");
            //     // res.writeHead(400, {
            //     //   "Content-Type": "text/plain"
            //     // });
            //     res.status(400).send({ message: "invalid credentials" });
            //     // res.end("Invalid Credentials");
            //   }
            // }); //bcrypt
          } //else
        }); //db collection
      } //else
    }
  ); //mongoClient
};
