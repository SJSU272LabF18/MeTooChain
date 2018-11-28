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
  status: { type: String, trim: true } ////////  3. accepted/Denied
});
var sentRequestsSchema = new Schema({
  receivername: { type: String, trim: true },
  preference: { type: String, trim: true },
  level: { type: Number, trim: true },
  status: { type: String, trim: true } ///// 1.pending
});
var filedBreach = new Schema({
  name: { type: String, trim: true },
  message: { type: String, trim: true }
});
var receivedBreach = new Schema({
  name: { type: String, trim: true },
  message: { type: String, trim: true }
});
var UserSchema = new Schema({
  user: { type: UserSchema },
  requests: [{ type: requestSchema }],
  sentrequests: [{ type: sentRequestsSchema }],
  filedbreach: [{ type: filedBreach }],
  receivedBreach: [{ type: receivedBreach }]
});

// module.exports = mongoose.model("users", UserSchema);
let User = mongoose.model("users", UserSchema, "users");
module.exports = User;
