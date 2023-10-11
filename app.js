const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const stuffRoutes = require("./routes/stuff");
const userRoutes = require("./routes/user");

require('dotenv').config();

const mongoKey = process.env.mongoKey; // Utilisez process.env.mongoKey pour accéder à la clé MongoDB


mongoose.connect(mongoKey,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie"))
  .catch((err) => console.log("Connexion à MongoDB échouée", err));

app.use(cors());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader("Access-Control-Max-Age", "1800");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "PUT, POST, GET, DELETE, PATCH, OPTIONS"
//   );
//   res.setHeader(
//     "Content-Security-Policy",
//     "default-src 'none'; font-src 'self' https://fonts.googleapis.com;"
//   );
//   next();
// });


const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

const handler = (req, res) => {
  const d = new Date()
  res.end(d.toString())
}



app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: "Something went wrong" });
});

app.use(express.json());

app.use("/tasks", stuffRoutes);
app.use("/auth", userRoutes);

module.exports = allowCors(handler)
module.exports = app;
