const express = require("express");
const product = express.Router();
const productModel = require("../models/product");

require("dotenv").config();

product.get("/", async (req, resp) => {
  try {
    const product = await productModel.find();

    resp.status(200).send(product);
  } catch (e) {
    resp.status(500).send({
      statusCode: 500,
      message: "internal server erroror",
    });
  }
});

product.post("/", async (req, resp) => {
  const newproduct = new productModel({
    category: req.body.category,
    title: req.body.title,
    cover: req.body.cover,
    price: req.body.price,
    description: req.body.description,
  });
  try {
    const productToSave = await newproduct.save();
    resp.status(201).send({
      statusCode: 201,
      payload: productToSave,
    });
  } catch (error) {
    resp.status(500).send({
      statusCode: 500,
      message: "internal server erroror",
    });
  }
});

product.patch("/:id", async (req, resp) => {
  const { id } = req.params;
  try {
    const product = await productModel.findById(id);
    if (!product) {
      return resp.status(404).send({
        statusCode: 404,
        message: "the request product doesn't exist",
      });
    }
    const updatedData = req.body;
    const options = { new: true };
    const result = await productModel.findByIdAndUpdate(
      id,
      updatedData,
      options
    );
    resp.status(200).send(result);
  } catch (e) {
    resp.status(500).send({
      statusCode: 500,
      message: "internal server erroror",
    });
  }
});

product.delete("/:id", async (req, resp) => {
  const { id } = req.params;
  try {
    const product = await productModel.findByIdAndDelete(id);
    if (!product) {
      return resp.status(404).send({
        statusCode: 404,
        message: "the request product doesn't exist",
      });
    }

    resp.status(200).send(`product with id ${id} succesfully removed`);
  } catch (e) {
    resp.status(500).send({
      statusCode: 500,
      message: "internal server erroror",
    });
  }
});

module.exports = product;
