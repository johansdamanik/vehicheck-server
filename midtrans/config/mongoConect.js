const { MongoClient, ServerApiVersion } = require("mongodb");

const url = "mongodb://localhost:27017";
const dbName = "vehicheck-test";

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

    console.log((db, "<<<<mongo aman dari midtrans"));
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getDb, connect };
