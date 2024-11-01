const { model, Schema } = require("mongoose");

const orderSchema = new Schema(
  {
    userId: String,
    staffId: String,
    fullName: String,
    phoneNumber: String,
    inspectionAddress: String,
    price: Number,
    date: String,
    time: String,
    vehicle: {
      type: { type: String },
      brand: String,
      model: String,
      year: Number,
      transmission: String,
    },
    map: {
      city: String,
      regional: String,
      longitude: String,
      latitude: String,
    },
    status: String,
    payment: String,
  },
  { collection: "Orderdb" }
);

module.exports = model("Order", orderSchema);
