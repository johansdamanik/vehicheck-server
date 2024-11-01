const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    fullname: String,
    email: String,
    password: String,
    phoneNumber: String,
    address: String,
    // orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  },
  { collection: "Userdb" }
);

module.exports = model("User", userSchema);
