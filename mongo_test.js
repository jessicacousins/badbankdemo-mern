// ? Code from class video that doesn't actually work with this project.
// const MongoClient = require("mongodb").MongoClient;
// const url = "mongodb://localhost:27017";

// MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
//   console.log("Connected!");

//   //database Name
//   const dbName = "myproject";
//   const db = client.db(dbName);

//   //new user

//   var name = "user" + Math.floor(Math.random() * 10000);
//   var email = name + "@mit.edu";

//   // insert into customer table
//   var collection = db.collection("customers");
//   var doc = { name, email };
//   collection.insertOne(doc, { w: 1 }, function (err, result) {
//     console.log("Document inset");
//   });

//   var customers = db
//     .collection("customers")
//     .find()
//     .toArray(function (err, docs) {
//       console.log("Collection: ", docs);

//       //clean up
//       client.close();
//     });
// });

// ! successful Connected! test
// const MongoClient = require("mongodb").MongoClient;
// const url = "mongodb://localhost:27017";

// async function connectToMongoDB() {
//   const client = await MongoClient.connect(url);
//   console.log("Connected!");
// }

// connectToMongoDB();

//! rewritten db code that works
// const MongoClient = require("mongodb").MongoClient;
// const url = "mongodb://localhost:27017";

// async function insertCustomer() {
//   const client = await MongoClient.connect(url);
//   const db = client.db("myproject");
//   const collection = db.collection("customers");

//   // new user
//   var name = "user" + Math.floor(Math.random() * 10000);
//   var email = name + "@mit.edu";

//   // insert into customer table
//   const doc = { name, email };
//   const result = await collection.insertOne(doc, { w: 1 });

//   console.log("Document inserted");

//   // find and log all customers
//   var customers = await collection.find().toArray();
//   console.log("Collection: ", customers);

//   // close the connection
//   client.close();
// }

// insertCustomer();
