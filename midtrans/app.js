// endpoint untuk midtrans
// update order ke MongoDB
// pakai express
// find by id
// update status
const cors = require("cors");
const express = require("express");
const { connect, getDb } = require("./config/mongoConect");
const { ObjectId } = require("mongodb");
const app = express();
const port = 4001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/midtrans", async (req, res) => {
  try {
    const { order_id } = req.body;
    // console.log(req.body);
    await getDb()
      .collection("Orderdb")
      .updateOne(
        { _id: new ObjectId(order_id) },
        { $set: { payment: "paid" } }
      );
    console.log("berhasil");
  } catch (error) {
    console.log(error);
  }
});

connect().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
