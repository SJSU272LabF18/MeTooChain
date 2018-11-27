const mongoose = require("../mongoose");
const Schema = mongoose.Schema;
var UserSchema = new Schema({
  username: { type: String, trim: true, index: { unique: true } },
  Lname: { type: String, trim: true, index: { unique: true } },
  password: { type: String, required: true }
});
var requestSchema = new Schema({
  sendername: { type: String, trim: true },
  preference: { type: String, trim: true },
  level: { type: Number, trim: true },
  status: { type: Number, trim: true }
});
var sentRequestsSchema = new Schema({
  receivername: { type: String, trim: true },
  preference: { type: String, trim: true },
  level: { type: Number, trim: true },
  status: { type: Number, trim: true }
});

var UserSchema = new Schema({
  user: { type: UserSchema },
  requests: [{ type: requestSchema }],
  sentrequests: [{ type: sentRequestsSchema }]
});

// module.exports = mongoose.model("users", UserSchema);
let User = mongoose.model("users", UserSchema, "users");
module.exports = User;
