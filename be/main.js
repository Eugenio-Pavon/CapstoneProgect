const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = 3030;

const app = express();

app.listen(PORT, () =>
  console.log(`server connected and listening on port ${PORT}`)
);
