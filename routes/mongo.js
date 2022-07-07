const { MongoClient } = require("mongodb");
// The MongoClient class is a class that allows for making Connections to MongoDB.
require("dotenv").config();

let db;

async function mongoConnect() {
  const uri = process.env.MONGO_URI;
  //coming in from .env file
  const client = new MongoClient(uri);
  //client now hold .env uri connection string
  try {
    await client.connect();
    db = await client.db(process.env.MONGO_DATABASE);
    console.log(db);
    console.log("db connected");
  } catch (error) {
    console.error(error);
  }
}

function blogsDB() {
  return db;
}

module.exports = {
  mongoConnect,
  blogsDB,
};
