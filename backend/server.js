import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import chalk from 'chalk';
import productsRouter from './routes/products.js';

dotenv.config();

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

app.listen(PORT, () =>
  console.log(chalk.yellow.bold(`Server is running port: ${PORT}`))
);
