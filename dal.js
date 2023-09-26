// const MongoClient = require("mongodb").MongoClient;
// const url = "mongodb://localhost:27017";
// let db = null;

// MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
//   console.log("Connected successfully to db server");

//   //connect to myproject database
//   db = client.db("myproject");
// });

// // create user account
// function create(name, email, password) {
//   return new Promise((resolve, reject) => {
//     const collection = db.collection("users");
//     const doc = { name, email, password, balance: 0 };
//     collection.insertOne(doc, { w: 1 }, function (err, result) {
//       err ? reject(err) : resolve(doc);
//     });
//   });
// }

// //all users
// function all() {
//   return new Promise((resolve, reject) => {
//     const customers = db
//       .collection("users")
//       .find({})
//       .toArray(function (err, docs) {
//         err ? reject(err) : resolve(docs);
//       });
//   });
// }

// module.exports = { create, all };

// const MongoClient = require("mongodb").MongoClient;
// const url = "mongodb://localhost:27017";
// let db = null;

// MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
//   if (err) {
//     console.error("Failed to connect to db server:", err);
//     return;
//   }
//   console.log("Connected successfully to db server");

//   // Connect to the "myproject" database
//   db = client.db("myproject");
// });

// //all users
// function all() {
//   return new Promise((resolve, reject) => {
//     const customers = db
//       .collection("users")
//       .find({})
//       .toArray(function (err, docs) {
//         err ? reject(err) : resolve(docs);
//       });
//   });
// }

// module.exports = { create, all };

//! Connected to db /Working  code
// const { MongoClient } = require("mongodb");
// const url = "mongodb://localhost:27017/myproject"; // Adjust the URL as needed

// async function connect() {
//   try {
//     const client = await MongoClient.connect(url, { useUnifiedTopology: true });
//     console.log("Connected successfully to MongoDB");
//     return client.db(); // Return the database object
//   } catch (err) {
//     console.error("Failed to connect to MongoDB:", err);
//     throw err;
//   }
// }

// async function create(name, email, password) {
//   const db = await connect();
//   const collection = db.collection("users");
//   const doc = { name, email, password, balance: 0 };

//   try {
//     const result = await collection.insertOne(doc);
//     console.log("User created successfully:", doc);
//     return doc;
//   } catch (err) {
//     console.error("Failed to create user:", err);
//     throw err;
//   }
// }

// async function all() {
//   const db = await connect();
//   const collection = db.collection("users");

//   try {
//     const docs = await collection.find({}).toArray();
//     return docs;
//   } catch (err) {
//     console.error("Failed to retrieve users:", err);
//     throw err;
//   }
// }

// module.exports = { create, all };

// TODO: Playground
const { MongoClient, ObjectId } = require("mongodb");
const url = "mongodb://localhost:27017/myproject"; // Adjust the URL as needed

async function connect() {
  try {
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
    console.log("Connected successfully to MongoDB");
    return client.db(); // Return the database object
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    throw err;
  }
}

async function create(name, email, password) {
  const db = await connect();
  const collection = db.collection("users");
  const doc = { name, email, password, balance: 0 };

  try {
    const result = await collection.insertOne(doc);
    console.log("User created successfully:", doc);
    return doc;
  } catch (err) {
    console.error("Failed to create user:", err);
    throw err;
  }
}

async function all() {
  const db = await connect();
  const collection = db.collection("users");

  try {
    const docs = await collection.find({}).toArray();
    return docs;
  } catch (err) {
    console.error("Failed to retrieve users:", err);
    throw err;
  }
}
// Deposit function
async function deposit(email, amount) {
  const db = await connect();
  const collection = db.collection("users");

  try {
    const user = await collection.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    if (isNaN(amount) || amount <= 0) {
      throw new Error("Invalid deposit amount");
    }

    user.balance += parseFloat(amount);
    await collection.updateOne(
      { _id: user._id }, // Use user._id directly
      { $set: { balance: user.balance } }
    );

    console.log(
      `Deposit successful for ${user.email}, new balance: ${user.balance}`
    );
    return { message: "Deposit successful", balance: user.balance };
  } catch (err) {
    console.error("Failed to deposit:", err);
    throw err;
  }
}

// Withdraw function
async function withdraw(email, amount) {
  const db = await connect();
  const collection = db.collection("users");

  try {
    const user = await collection.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    if (isNaN(amount) || amount <= 0) {
      throw new Error("Invalid withdrawal amount");
    }

    if (user.balance < amount) {
      throw new Error("Insufficient balance");
    }

    user.balance -= parseFloat(amount);
    await collection.updateOne(
      { _id: user._id }, // Use user._id directly
      { $set: { balance: user.balance } }
    );

    console.log(
      `Withdrawal successful for ${user.email}, new balance: ${user.balance}`
    );
    return { message: "Withdrawal successful", balance: user.balance };
  } catch (err) {
    console.error("Failed to withdraw:", err);
    throw err;
  }
}

// Balance function
async function getBalance(email) {
  const db = await connect();
  const collection = db.collection("users");

  try {
    const user = await collection.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    console.log(`Balance retrieved for ${user.email}: ${user.balance}`);
    return { balance: user.balance };
  } catch (err) {
    console.error("Failed to retrieve balance:", err);
    throw err;
  }
}

module.exports = { create, all, deposit, withdraw, getBalance };
