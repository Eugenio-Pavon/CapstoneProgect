const express = require("express");
const product = express.Router();
const productModel = require("../models/product");
const verified = require("../middlewares/verifyToken");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const multer = require("multer");

require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "productIMG",

    public_id: (req, file) => file.name,
  },
});

const cloudUpload = multer({ storage: cloudStorage });

product.post(
  "/cloudUploadImg",
  cloudUpload.single("uploadImg"),
  async (req, res) => {
    try {
      res.status(200).json({ source: req.file.path });
    } catch (error) {
      res.status(500).send({
        statusCode: 500,
        message: "internal server erroror",
      });
    }
  }
);

product.get("/", async (req, res) => {
  const { page = 1, pageSize = 40 } = req.query;
  try {
    const product = await productModel
      .find()
      .limit(pageSize)
      .skip((page - 1) * pageSize);
    const totalProducts = await productModel.countDocuments();

    res.status(200).send({
      product,
      currentPage: +page,
      totalPages: Math.ceil(totalProducts / pageSize),
    });
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "internal server erroror",
    });
  }
});

product.get("/filter", async (req, res) => {
  const { page = 1, pageSize = 40, searchTerm = "", category = "" } = req.query;
  const query = {};
  if (searchTerm) {
    query.title = new RegExp(searchTerm, "i");
  }
  if (category) {
    query.category = category;
  }

  try {
    const product = await productModel
      .find(query)
      .limit(pageSize)
      .skip((page - 1) * pageSize);
    const totalProducts = await productModel.countDocuments(query);

    res.status(200).send({
      product,
      currentPage: +page,
      totalPages: Math.ceil(totalProducts / pageSize),
    });
  } catch (e) {
    res.status(500).send({
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

product.get("/:id", async (req, resp) => {
  const { id } = req.params;
  try {
    const product = await productModel.findById(id);
    if (!product) {
      return resp.status(404).send({
        statusCode: 404,
        message: "the request product doesn't exist",
      });
    }

    resp.status(200).send(product);
  } catch (e) {
    resp.status(500).send({
      statusCode: 500,
      message: "internal server erroror",
    });
  }
});

module.exports = product;
