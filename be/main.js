const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.port || 3030;
const MONGODB_URL = process.env.MONGODB_URL;

const app = express();

const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const loginRoute = require("./routes/login");
const githubRoute = require("./routes/github");

app.use(cors());
app.use(express.json());

app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/login", loginRoute);
app.use("/", githubRoute);

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "errore di connessiones"));
db.once("open", () => {
  console.log("connesso");
});

app.listen(PORT, () =>
  console.log(`server connected and listening on port ${PORT}`)
);
