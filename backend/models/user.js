const mongoose = require("./mongoose");
const Schema = mongoose.Schema;
var UserSchema = new Schema({
  username: { type: String, trim: true, index: { unique: true } },
  password: { type: String, trim: true, index: { unique: true } }
});
//UserSchema.index({ label: 1 });

module.exports = mongoose.model("users", UserSchema);
