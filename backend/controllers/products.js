import asyncHandler from 'express-async-handler';

// @route             GET /api/products
// @description       Get all products
// @access            Public
export const getProducts = asyncHandler(async (req, res, next) => {});

// @route             GET /api/products/:id
// @description       Get product
// @access            Public
export const getProduct = asyncHandler(async (req, res, next) => {});
