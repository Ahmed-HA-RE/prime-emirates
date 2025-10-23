import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import chalk from 'chalk';
import productsRouter from './routes/products.js';
import authRouter from './routes/users.js';
import ordersRouter from './routes/orders.js';
import connectDB from './config/database.js';
import errorHandler from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';

dotenv.config();

connectDB();

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  })
);
app.use(morgan('dev'));

// Routers
app.get('/', (req, res, next) => {
  res.status(200).json({ success: true, message: 'API is running' });
});
app.use('/api/products', productsRouter);
app.use('/api/users', authRouter);
app.use('/api/orders', ordersRouter);

app.get('/api/config/paypal', (req, res, next) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

app.use((req, res, next) => {
  const err = new Error("Sorry, we couldn't find what you were looking for.");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, () =>
  console.log(chalk.yellow.bold(`Server is running port: ${PORT}`))
);
