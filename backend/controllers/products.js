import asyncHandler from 'express-async-handler';
import { Product } from '../models/Product.js';
import { uploadToCloudinary } from '../config/cloudinary.js';
import {
  createProductSchema,
  updateProductSchema,
  createReviewsSchema,
} from '../../schema/products.schema.js';

// @route             GET /api/products
// @description       Get all products
// @access            Public
export const getProducts = asyncHandler(async (req, res, next) => {
  const productsPerPage = 4;
  const pageNumber = Number(req.query.page) || 1;
  const search = req.query.search
    ? { name: { $regex: req.query.search, $options: 'i' } }
    : {};

  const totalProducts = await Product.countDocuments({ ...search });
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const products = await Product.find({ ...search })
    .limit(productsPerPage)
    .skip(productsPerPage * (pageNumber - 1));

  if (products.length === 0) {
    const err = new Error('No products found');
    err.status = 404;
    throw err;
  }

  res
    .status(200)
    .json({ count: totalProducts, totalPages, pageNumber, products });
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

// @route             PUT /api/products/:productId
// @description       Update product
// @access            Private/admin
export const updateProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);

  if (!product) {
    const err = new Error('No product found');
    err.status = 404;
    throw err;
  }

  if (!req.body || (Object.keys(req.body).length === 0 && !req.file)) {
    const err = new Error(
      'Please provide the field you want to update the product with'
    );
    err.status = 400;
    throw err;
  }

  if (req.file) {
    let image = req.file;
    if (!image.mimetype.startsWith('image')) {
      const err = new Error(
        'Please select a valid image file (JPG, PNG, or WEBP).'
      );
      err.status = 400;
      throw err;
    }
    image = await uploadToCloudinary(image);
    product.image = image.secure_url || product.image;
  }

  const validatedProductsReq = updateProductSchema.safeParse(req.body);

  if (!validatedProductsReq.success) {
    console.log(validatedProductsReq.error);
    const err = new Error('Invalid Data Entered');
    err.status = 400;
    throw err;
  }

  const { brand, name, category, countInStock, description, price } =
    validatedProductsReq.data;

  product.name = name || product.name;
  product.brand = brand || product.brand;
  product.category = category || product.category;
  product.countInStock = countInStock || product.countInStock;
  product.description = description || product.description;
  product.price = price || product.price;

  product.save();

  res.status(200).json(product);
});

// @route             DELETE /api/products/:productId
// @description       Delete product
// @access            Private/admin
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);
  if (!product) {
    const err = new Error('No product found');
    err.status = 404;
    throw err;
  }

  await product.deleteOne();

  res.status(200).json({ message: 'Deleted successfully' });
});

// @route             POST /api/products/:productId/reviews
// @description       Create review for a product
// @access            Private
export const createReviewForProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);
  if (!product) {
    const err = new Error('No product found');
    err.status = 404;
    throw err;
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    const err = new Error(
      'Please provide the rating and comment for the product'
    );
    err.status = 400;
    throw err;
  }

  const validateReviewReq = createReviewsSchema.safeParse(req.body);

  if (!validateReviewReq.success) {
    const err = new Error('Invalid Data');
    err.status = 400;
    throw err;
  }

  const { rating, comment } = validateReviewReq.data;

  const alreadyReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );

  if (alreadyReviewed) {
    const err = new Error('You can only review once per product');
    err.status = 400;
    throw err;
  }

  const newReview = product.reviews.create({
    rating,
    comment,
    name: req.user.name,
    user: req.user._id,
  });

  product.reviews.push(newReview);
  product.numReviews = product.reviews.length;

  product.rating =
    product.reviews.reduce((a, c) => a + c.rating, 0) / product.reviews.length;

  await product.save();

  res.status(201).json(product);
});

// @route             GET /api/products/top-rated
// @description       Get top rated products
// @access            Public
export const getTopRatedProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find().sort('-rating').limit(3);

  res.status(200).json(products);
});
