const mongoose = require("mongoose");

const { ObjectId, Number } = mongoose.Schema.Types;

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
  },
  size: {
    type: String,
  },
  rating: {
    type: String,
  },
  brand: {
    type: String,
  },
  lastPrice: {
    type: Number,
  },
  images: []

});

mongoose.model("Product", ProductSchema, "products");
