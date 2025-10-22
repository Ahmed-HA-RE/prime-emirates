import asyncHandler from 'express-async-handler';
import { Product } from '../models/Product.js';

// @route             GET /api/products
// @description       Get all products
// @access            Public
export const getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();

  if (products.length === 0) {
    const err = new Error('No products found');
    err.status = 404;
    throw err;
  }

  res.status(200).json(products);
});

// @route             GET /api/products/:productId
// @description       Get product
// @access            Public
export const getProductById = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);

  if (!product) {
    const err = new Error('No product found');
    err.status = 404;
    throw err;
  }

  res.status(200).json(product);
});
