import { Order } from '../models/Order.js';
import asyncHandler from 'express-async-handler';
import { ordersBaseSchema } from '../../schema/orders.js';

// @route             GET /api/orders
// @description       Get all orders
// @access            Private/Admin
export const getOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find().populate({
    path: 'user',
    select: 'name email _id',
  });

  if (orders.length === 0) {
    const err = new Error('No orders found');
    err.status = 404;
    throw err;
  }

  res.status(200).json(orders);
});

// @route             GET /api/orders/my-orders
// @description       Get user's orders
// @access            Private/User
export const getMyOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id }).populate({
    path: 'user',
    select: 'email name _id',
  });

  if (orders.length === 0) {
    const err = new Error(
      `No orders found under the email of ${req.user.email} `
    );
    err.status = 404;
    throw err;
  }

  res.status(200).json(orders);
});

// @route             POST /api/orders
// @description       Create new orders
// @access            Private/User
export const createOrders = asyncHandler(async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    const err = new Error(
      'Please fill in all required fields to place your order.'
    );
    err.status = 400;
    throw err;
  }

  const validatedOrderReq = ordersBaseSchema.safeParse(req.body);

  if (!validatedOrderReq.success) {
    const err = new Error('Invalid Data');
    err.status = 400;
    throw err;
  }

  const newOrder = await Order.create({
    ...validatedOrderReq.data,
    user: req.user._id,
  });

  res.status(201).json(newOrder);
});

// @route             GET /api/orders/:id
// @description       Create single order
// @access            Private/Admin/User
export const getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate({
    path: 'user',
    select: 'name email _id',
  });

  if (!order) {
    const err = new Error('No order found');
    err.status(404);
    throw err;
  }

  if (order.user !== req.user._id && req.user.role !== 'admin') {
    const err = new Error("You don't have permission to access this order");
    err.status(403);
    throw err;
  }

  res.status(200).json(order);
});

// @route             PUT /api/orders/:id/pay
// @description       Update order to paid
// @access            Private/User
export const updateOrderToPaid = asyncHandler(async (req, res, next) => {
  res.status(200).send('update order to paid');
});

// @route             PUT /api/orders/:id/deliver
// @description       Update order to be delivered
// @access            Private/Admin
export const updateOrderToDelivered = asyncHandler(async (req, res, next) => {
  res.status(200).send('update order to delivered');
});
