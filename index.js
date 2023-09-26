// const express = require("express");
// const app = express();
// const cors = require("cors");
// var dal = require("./dal.js");

// app.use(express.static("public"));
// app.use(cors());

// app.use(express.json());

// const users = [];

// //create user account
// app.get("/account/create/:name/:email/:password", function (req, res) {
//   //else create user
//   dal
//     .create(req.params.name, req.params.email, req.params.password)
//     .then((user) => {
//       console.log(user);
//       res.send(user);
//     });
// });

// //login user
// app.get("/account/login/:email/:password", function (req, res) {
//   res.send({
//     email: req.params.email,
//     password: req.params.password,
//   });
// });

// // all accounts
// app.get("/account/all", function (req, res) {
//   dal.all().then((docs) => {
//     console.log(docs);
//     res.send(docs);
//   });
// });

// // Deposit
// app.post("/deposit", function (req, res) {
//   const { email, amount } = req.body;
//   const user = users.find((user) => user.email === email);

//   if (!user) {
//     res.status(404).json({ error: "User not found" });
//     return;
//   }

//   if (isNaN(amount) || amount <= 0) {
//     res.status(400).json({ error: "Invalid deposit amount" });
//     return;
//   }

//   user.balance += parseFloat(amount);
//   res.json({ message: "Deposit successful", balance: user.balance });
// });

// // Withdraw
// app.post("/withdraw", function (req, res) {
//   const { email, amount } = req.body;
//   const user = users.find((user) => user.email === email);

//   if (!user) {
//     res.status(404).json({ error: "User not found" });
//     return;
//   }

//   if (isNaN(amount) || amount <= 0) {
//     res.status(400).json({ error: "Invalid withdrawal amount" });
//     return;
//   }

//   if (user.balance < amount) {
//     res.status(400).json({ error: "Insufficient balance" });
//     return;
//   }

//   user.balance -= parseFloat(amount);
//   res.json({ message: "Withdrawal successful", balance: user.balance });
// });

// // Balance
// app.get("/balance/:email", function (req, res) {
//   const email = req.params.email;
//   const user = users.find((user) => user.email === email);

//   if (!user) {
//     res.status(404).json({ error: "User not found" });
//     return;
//   }

//   res.json({ balance: user.balance });
// });

// // running on port 3000 `node index.js`
// const port = 3000;
// app.listen(port);
// console.log("Running on port: " + port);

// ****************************************************************
// ! real code here

// const express = require("express");
// const app = express();
// const cors = require("cors");

// app.use(express.static("public"));
// app.use(cors());

// app.use(express.json());

// const users = [
//   // Your existing user data here
//   {
//     name: "abel",
//     email: "abel@mit.edu",
//     password: "secret",
//     balance: 100,
//   },
//   {
//     name: "bruce",
//     email: "bruce@mit.edu",
//     password: "test",
//     balance: 0,
//   },
// ];

// // Create user account (POST request)
// app.post("/account/create", function (req, res) {
//   // Extract user data from the request body
//   const { name, email, password } = req.body;

//   // Create a new user object
//   const newUser = {
//     name,
//     email,
//     password,
//     balance: 0, // You can initialize the balance as needed
//   };

//   // Add the new user to the users array
//   users.push(newUser);

//   // Respond with the newly created user
//   res.json(newUser);
// });

// // Login user (POST request)
// app.post("/account/login", function (req, res) {
//   // Extract email and password from the request body
//   const { email, password } = req.body;

//   // Find the user with the matching email
//   const user = users.find((user) => user.email === email);

//   if (!user || user.password !== password) {
//     res.status(401).json({ error: "Authentication failed" });
//     return;
//   }

//   // Respond with the authenticated user
//   res.json(user);
// });

// // Get all accounts (GET request)
// app.get("/account/all", function (req, res) {
//   // Respond with the array of all user accounts
//   res.json({ users });
// });

// // Deposit (POST request)
// app.post("/account/deposit", function (req, res) {
//   // Extract email and amount from the request body
//   const { email, amount } = req.body;

//   // Find the user with the matching email
//   const user = users.find((user) => user.email === email);

//   if (!user) {
//     res.status(404).json({ error: "User not found" });
//     return;
//   }

//   if (isNaN(amount) || amount <= 0) {
//     res.status(400).json({ error: "Invalid deposit amount" });
//     return;
//   }

//   user.balance += parseFloat(amount);
//   res.json({ message: "Deposit successful", balance: user.balance });
// });

// // Withdraw (POST request)
// app.post("/account/withdraw", function (req, res) {
//   // Extract email and amount from the request body
//   const { email, amount } = req.body;

//   // Find the user with the matching email
//   const user = users.find((user) => user.email === email);

//   if (!user) {
//     res.status(404).json({ error: "User not found" });
//     return;
//   }

//   if (isNaN(amount) || amount <= 0) {
//     res.status(400).json({ error: "Invalid withdrawal amount" });
//     return;
//   }

//   if (user.balance < amount) {
//     res.status(400).json({ error: "Insufficient balance" });
//     return;
//   }

//   user.balance -= parseFloat(amount);
//   res.json({ message: "Withdrawal successful", balance: user.balance });
// });

// // Balance (GET request)
// app.get("/account/balance/:email", function (req, res) {
//   // Extract email from the request params
//   const email = req.params.email;

//   // Find the user with the matching email
//   const user = users.find((user) => user.email === email);

//   if (!user) {
//     res.status(404).json({ error: "User not found" });
//     return;
//   }

//   res.json({ balance: user.balance });
// });

// // Running on port 3000 `node index.js`
// const port = 3000;
// app.listen(port);
// console.log("Running on port: " + port);

// ! Connected to DB and works perfectly

// const express = require("express");
// const app = express();
// const cors = require("cors");
// const dal = require("./dal.js");

// app.use(express.static("public"));
// app.use(cors());

// app.use(express.json());

// const users = [];

// // ! Create user account (POST request)
// app.post("/account/create", function (req, res) {
//   // Extract user data from the request body
//   const { name, email, password } = req.body;

//   // Call the create function from dal.js to add the new user
//   dal
//     .create(name, email, password)
//     .then((newUser) => {
//       // Respond with the newly created user
//       res.json(newUser);
//     })
//     .catch((err) => {
//       res.status(500).json({ error: "Failed to create user" });
//     });
// });

// // !Get all accounts (GET request)
// app.get("/account/all", function (req, res) {
//   // Call the all function from dal.js to get all users
//   dal
//     .all()
//     .then((users) => {
//       // Respond with the array of all user accounts
//       res.json(users);
//     })
//     .catch((err) => {
//       res.status(500).json({ error: "Failed to retrieve users" });
//     });
// });

// // ! Login user (POST request)
// app.post("/account/login", function (req, res) {
//   // Extract email and password from the request body
//   const { email, password } = req.body;

//   // Find the user with the matching email
//   const user = users.find((user) => user.email === email);

//   if (!user || user.password !== password) {
//     res.status(401).json({ error: "Authentication failed" });
//     return;
//   }

//   // Respond with the authenticated user
//   res.json(user);
// });

// // ! Deposit (POST request)
// app.post("/account/deposit", function (req, res) {
//   // Extract email and amount from the request body
//   const { email, amount } = req.body;

//   // Find the user with the matching email
//   const user = users.find((user) => user.email === email);

//   if (!user) {
//     res.status(404).json({ error: "User not found" });
//     return;
//   }

//   if (isNaN(amount) || amount <= 0) {
//     res.status(400).json({ error: "Invalid deposit amount" });
//     return;
//   }

//   user.balance += parseFloat(amount);
//   res.json({ message: "Deposit successful", balance: user.balance });
// });

// // ! Withdraw (POST request)
// app.post("/account/withdraw", function (req, res) {
//   // Extract email and amount from the request body
//   const { email, amount } = req.body;

//   // Find the user with the matching email
//   const user = users.find((user) => user.email === email);

//   if (!user) {
//     res.status(404).json({ error: "User not found" });
//     return;
//   }

//   if (isNaN(amount) || amount <= 0) {
//     res.status(400).json({ error: "Invalid withdrawal amount" });
//     return;
//   }

//   if (user.balance < amount) {
//     res.status(400).json({ error: "Insufficient balance" });
//     return;
//   }

//   user.balance -= parseFloat(amount);
//   res.json({ message: "Withdrawal successful", balance: user.balance });
// });

// // ! Balance (GET request)
// app.get("/account/balance/:email", function (req, res) {
//   // Extract email from the request params
//   const email = req.params.email;

//   // Find the user with the matching email
//   const user = users.find((user) => user.email === email);

//   if (!user) {
//     res.status(404).json({ error: "User not found" });
//     return;
//   }

//   res.json({ balance: user.balance });
// });

// // ! Running on port 3000 `node index.js`
// const port = 3000;
// app.listen(port);
// console.log("Running on port: " + port);

const express = require("express");
const app = express();
const cors = require("cors");
const dal = require("./dal.js");

app.use(express.static("public"));
app.use(cors());

app.use(express.json());

// ! Create user account (POST request)
app.post("/account/create", function (req, res) {
  // Extract user data from the request body
  const { name, email, password } = req.body;

  // Call the create function from dal.js to add the new user
  dal
    .create(name, email, password)
    .then((newUser) => {
      // Respond with the newly created user
      res.json(newUser);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to create user" });
    });
});

// !Get all accounts (GET request)
app.get("/account/all", function (req, res) {
  // Call the all function from dal.js to get all users
  dal
    .all()
    .then((users) => {
      // Respond with the array of all user accounts
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to retrieve users" });
    });
});

// ! Login user (POST request)
app.post("/account/login", function (req, res) {
  // Extract email and password from the request body
  const { email, password } = req.body;

  // Find the user with the matching email
  const user = users.find((user) => user.email === email);

  if (!user || user.password !== password) {
    res.status(401).json({ error: "Authentication failed" });
    return;
  }

  // Respond with the authenticated user
  res.json(user);
});

// ! Deposit (POST request)
app.post("/account/deposit", function (req, res) {
  // Extract email and amount from the request body
  const { email, amount } = req.body;

  // Call the deposit function from dal.js to handle the deposit
  dal
    .deposit(email, amount)
    .then((result) => {
      // Respond with the deposit result
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// ! Withdraw (POST request)
app.post("/account/withdraw", function (req, res) {
  // Extract email and amount from the request body
  const { email, amount } = req.body;

  // Call the withdraw function from dal.js to handle the withdrawal
  dal
    .withdraw(email, amount)
    .then((result) => {
      // Respond with the withdrawal result
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// ! Balance (GET request)
app.get("/account/balance/:email", function (req, res) {
  // Extract email from the request params
  const email = req.params.email;

  // Call the getBalance function from dal.js to retrieve the balance
  dal
    .getBalance(email)
    .then((result) => {
      // Respond with the balance result
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// ! Running on port 3000 `node index.js`
const port = 3000;
app.listen(port);
console.log("Running on port: " + port);
