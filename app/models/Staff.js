const { model, Schema } = require("mongoose");

const staffSchema = new Schema(
  {
    fullname: String,
    email: String,
    password: String,
    phoneNumber: String,
    address: String,
    specialist: String,
    // orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  },
  { collection: "Staffdb" }
);

module.exports = model("Staff", staffSchema);
