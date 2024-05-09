const express = require("express");
const user = express.Router();
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const validateUserBody = require("../middlewares/verifyUserBody");
const verified = require("../middlewares/verifyToken");
const jwt = require("jsonwebtoken");

require("dotenv").config();

user.get("/", verified, async (req, resp) => {
  try {
    const user = await userModel.find();

    resp.status(200).send(user);
  } catch (e) {
    resp.status(500).send({
      statusCode: 500,
      message: "internal server erroror",
    });
  }
});

user.post("/", validateUserBody, async (req, resp) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const newuser = new userModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const userToSave = await newuser.save();
    const token = jwt.sign({ userId: userToSave._id }, "your_secret_key_here");
    resp.status(201).send({
      statusCode: 201,
      payload: userToSave,
      token: token,
    });
  } catch (error) {
    resp.status(500).send({
      statusCode: 500,
      message: "internal server erroror",
    });
  }
});

user.patch("/:id", async (req, resp) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return resp.status(404).send({
        statusCode: 404,
        message: "the request user doesn't exist",
      });
    }
    const updatedData = req.body;
    const options = { new: true };
    const result = await userModel.findByIdAndUpdate(id, updatedData, options);
    resp.status(200).send(result);
  } catch (e) {
    resp.status(500).send({
      statusCode: 500,
      message: "internal server erroror",
    });
  }
});

user.delete("/:id", async (req, resp) => {
  const { id } = req.params;
  try {
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      return resp.status(404).send({
        statusCode: 404,
        message: "the request user doesn't exist",
      });
    }

    resp.status(200).send(`user with id ${id} succesfully removed`);
  } catch (e) {
    resp.status(500).send({
      statusCode: 500,
      message: "internal server erroror",
    });
  }
});

module.exports = user;
