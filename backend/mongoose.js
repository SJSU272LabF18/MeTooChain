const mongoose = require("mongoose");
const options = {
  poolSize: 100
};
mongoose.Promise = global.Promise;
//"mongodb://localhost:27017/HomeAway",
// "mongodb://sojanmathew:sojanm28@ds133920.mlab.com:33920/homeaway",
mongoose
  .connect(
    "mongodb://localhost:27017/dapp",

    options
  )
  .then(console.log("mongodb connected"));

module.exports = mongoose;
