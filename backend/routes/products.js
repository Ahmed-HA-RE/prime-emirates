import express from 'express';
import { getProducts, getProductById } from '../controllers/products.js';

const router = express.Router();

router.route('/').get(getProducts); // GET /api/products

router.route('/:productId').get(getProductById); // GET /api/products/:productId

export default router;
