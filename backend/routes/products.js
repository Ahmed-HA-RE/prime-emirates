import express from 'express';
import { getProducts, getProduct } from '../controllers/products.js';

const router = express.Router();

router.route('/').get(getProducts); // GET /api/products

router.route('/:productId').get(getProduct); // GET /api/products/:productId

export default router;
