import express from 'express';
import {
  getOrders,
  getOrder,
  createOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
} from '../controllers/orders.js';
import { authRole, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(authRole, getOrders) // GET /api/orders
  .post(createOrders); // POST /api/orders
router.route('/my-orders').get(getMyOrders); // GET /api/orders/my-orders
router.route('/:id').get(getOrder); // GET /api/orders/:id
router.route('/:id/pay').put(updateOrderToPaid); // PUT /api/orders/:id/pay
router.route('/:id/deliver').put(updateOrderToDelivered); // PUT /api/orders/:id/deliver

export default router;
