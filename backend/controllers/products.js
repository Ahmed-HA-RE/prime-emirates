import asyncHandler from 'express-async-handler';
import { Product } from '../models/Product.js';
import { uploadToCloudinary } from '../config/cloudinary.js';
import { createProductSchema } from '../../schema/products.js';

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

// @route             POST /api/products
// @description       Create product
// @access            Private/admin
export const createProduct = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    const err = new Error('Please provide the product image');
    err.status = 400;
    throw err;
  }

  let image = req.file;
  console.log(image);

  if (!image.mimetype.startsWith('image')) {
    const err = new Error(
      'Please select a valid image file (JPG, PNG, or WEBP).'
    );
    err.status = 400;
    throw err;
  }

  const validatedProductsReq = createProductSchema.safeParse(req.body);

  if (!validatedProductsReq.success) {
    console.log(validatedProductsReq.error);
    const err = new Error('Invalid Data Entered');
    err.status = 400;
    throw err;
  }

  image = await uploadToCloudinary(image);

  const newProduct = await Product.create({
    ...validatedProductsReq.data,
    user: req.user._id,
    image: image.secure_url,
  });

  res.status(201).json(newProduct);
});
