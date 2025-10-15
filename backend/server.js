import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import chalk from 'chalk';
import productsRouter from './routes/products.js';
import connectDB from './config/database.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

connectDB();

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: ['http:localhost:3000'],
    credentials: true,
  })
);
app.use(morgan('dev'));

app.use('/api/products', productsRouter);

app.use((req, res, next) => {
  const err = new Error("Sorry, we couldn't find what you were looking for.");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, () =>
  console.log(chalk.yellow.bold(`Server is running port: ${PORT}`))
);
