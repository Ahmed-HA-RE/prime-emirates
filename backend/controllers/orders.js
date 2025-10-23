import { Order } from '../models/Order.js';
import { Product } from '../models/Product.js';
import { calcPrices } from '../utils/calcPrices.js';
import { checkIfNewTransaction, verifyPayPalPayment } from '../utils/paypal.js';
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

  if (
    validatedOrderReq.data.orderItems &&
    validatedOrderReq.data.orderItems.length === 0
  ) {
    res.status(400);
    throw new Error('No order items');
  } else {
    // get the ordered items from our database
    const itemsFromDB = await Product.find({
      _id: { $in: validatedOrderReq.data.orderItems.map((x) => x.product) },
    });

    // map over the order items and use the price from our items from database
    const dbOrderItems = validatedOrderReq.data.orderItems.map(
      (itemFromClient) => {
        const matchingItemFromDB = itemsFromDB.find(
          (itemFromDB) => itemFromDB._id.toString() === itemFromClient.product
        );
        return {
          ...itemFromClient,
          product: itemFromClient.product,
          price: matchingItemFromDB.price,
          _id: undefined,
        };
      }
    );

    // calculate prices
    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calcPrices(dbOrderItems);

    const order = new Order({
      orderItems: dbOrderItems,
      user: req.user._id,
      shipping: validatedOrderReq.data.shipping,
      paymentMethod: validatedOrderReq.data.paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @route             GET /api/orders/:id
// @description       Get single order
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
  const order = await Order.findById(req.params.id);

  if (!req.body || Object.keys(req.body).length === 0) {
    const err = new Error(
      'Please fill in all successful paypal data to mark your order as paid.'
    );
    err.status = 400;
    throw err;
  }

  if (!order) {
    const err = new Error('No order found');
    err.status = 404;
    throw err;
  }

  const { verified, value } = await verifyPayPalPayment(req.body.id);
  if (!verified) throw new Error('Payment not verified');

  // check if this transaction has been used before
  const isNewTransaction = await checkIfNewTransaction(Order, req.body.id);
  if (!isNewTransaction) throw new Error('Transaction has been used before');

  // check the correct amount was paid
  const paidCorrectAmount = order.totalPrice.toString() === value;
  if (!paidCorrectAmount) throw new Error('Incorrect amount paid');
  console.log(req.body);

  order.isPaid = true;
  order.paitAt = Date.now();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.email_address,
  };

  const updatedOrder = await order.save();

  res.status(200).json(updatedOrder);
});

// @route             PUT /api/orders/:id/deliver
// @description       Update order to be delivered
// @access            Private/Admin
export const updateOrderToDelivered = asyncHandler(async (req, res, next) => {
  res.status(200).send('update order to delivered');
});
