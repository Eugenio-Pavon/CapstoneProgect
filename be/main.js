const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const PORT = 3030;

const app = express();

const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const loginRoute = require("./routes/login");
const githubRoute = require("./routes/giHub");

app.use(cors());
app.use(express.json());

app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/login", loginRoute);
app.use("/", githubRoute);

mongoose.connect(
  "mongodb+srv://eugeniopavon:CQkPB2EsYATVvV4f@epicodedbb.xv0gvnq.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "errore di connessiones"));
db.once("open", () => {
  console.log("connesso");
});

app.listen(PORT, () =>
  console.log(`server connected and listening on port ${PORT}`)
);
