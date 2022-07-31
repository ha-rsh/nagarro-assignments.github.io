const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const url = "mongodb://localhost:27017";
app.use(express.urlencoded({ extended: true }));

const client = new MongoClient(url);
const db = client.db("test");
const collection = db.collection("students");

async function dbConnect() {
  await client.connect();
  return "Connected....";
}

dbConnect()
  .then(console.log)
  .catch(console.error)

app.get("/",async (req, res) => {
  const ans = await collection.find({}).toArray();
  res.render("index",{items: ans});
});

app.post("/",async (req, res) => {
  const { name } = req.body;
  await collection.insertOne({data:name});
  res.redirect("/")
});