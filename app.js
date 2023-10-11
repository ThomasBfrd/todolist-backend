const express = require("express");
const cors = require("cors");
const app = express();

const stuffRoutes = require("./routes/stuff");
const userRoutes = require("./routes/user");

const mongoKey = process.env.mongoKey;

mongoose.connect(mongoKey,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log("Connexion à MongoDB réussie"))
  .catch((err) => console.log("Connexion à MongoDB échouée", err));

app.use(cors({
  origin: "*",
  methods: ["GET", "OPTIONS", "PATCH", "DELETE", "POST", "PUT"],
  headers: ["X-CSRF-Token", "X-Requested-With", "Accept", "Accept-Version", "Content-Length", "Content-MD5", "Content-Type", "Date", "X-Api-Version"]
}));

app.use(express.json());

app.use("/tasks", stuffRoutes);
app.use("/auth", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

module.exports = app;