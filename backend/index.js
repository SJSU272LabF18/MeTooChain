require("dotenv").config({ silent: true });

const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const port = process.env.PORT || 5000;

//const port = 80;
const routes = require("./routes");
var userlogin = require("./controllers/login");
const DBURL = !process.env.DB_URL
  ? "mongodb://127.0.0.1:27017/dapp"
  : process.env.DB_URL;

app.use(cors());
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});
app.use(bodyParser.json());
//= ============================================================================
/**
 * database config
 */
//= ============================================================================

// Connect to our Database and handle an bad connections
mongoose.connect(
  DBURL,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.once("connected", () =>
  console.log(`Successfully connected to ${DBURL}`)
);
mongoose.connection.on("error", err => {
  console.log(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

app.use("/", routes);
// app.post("/login", function(req, res) {
//   console.log("inside login", req.body);
//   userlogin.login(req, res);
// });
app.listen(port, () => {
  console.log("server up and running on port", port);
});
