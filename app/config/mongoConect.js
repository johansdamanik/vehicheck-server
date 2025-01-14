const { MongoClient, ServerApiVersion } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName = process.env.DB_NAME;

const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

function getDb() {
  return db;
}

async function connect() {
  try {
    await client.connect();
    console.log("Connected!");
    db = client.db(dbName);
    console.log(db, "<<<<mongo aman");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
}

module.exports = { getDb, connect };
