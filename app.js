const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");

const stuffRoutes = require("./routes/stuff");
const userRoutes = require("./routes/user");

require('dotenv').config();

const mongoKey = process.env.mongoKey;


// mongoose.connect(mongoKey,
//     { useNewUrlParser: true, useUnifiedTopology: true }
//   )
//   .then(() => console.log("Connexion à MongoDB réussie"))
//   .catch((err) => console.log("Connexion à MongoDB échouée", err));


  const mongoClient = new MongoClient(mongoKey, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  async function connectMongo() {
    try {
      await mongoClient.connect();
      const database = mongoClient.db("votre-nom-de-base-de-données");
      app.locals.db = database; // Vous pouvez stocker la connexion MongoDB dans l'objet app.locals
      console.log("Connexion à MongoDB réussie");
    } catch (err) {
      console.error("Connexion à MongoDB échouée", err);
    }
  }
  
  connectMongo(); // Appel de la fonction pour se connecter à MongoDB

  mongoose.connect(mongoKey, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => console.log("Connexion à MongoDB (via Mongoose) réussie"))
    .catch((err) => console.log("Connexion à MongoDB (via Mongoose) échouée", err));

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'none'; font-src 'self' https://fonts.googleapis.com;"
  );
  next();
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: "Something went wrong" });
});

app.use(express.json());

app.use("/tasks", stuffRoutes);
app.use("/auth", userRoutes);

module.exports = app;
