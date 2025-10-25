import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/products.js';
import upload from '../config/multer.js';
import { authRole, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(getProducts) // GET /api/products
  .post(protect, authRole, upload.single('image'), createProduct); // POST /api/products

router
  .route('/:productId')
  .get(getProductById) // GET /api/products/:productId
  .put(protect, authRole, upload.single('image'), updateProduct) // PUT /api/products/:productId
  .delete(protect, authRole, deleteProduct); // DELETE /api/products/:productId

export default router;
