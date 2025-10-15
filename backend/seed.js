import fs from 'fs';
import path from 'path';
import { Product } from './model/Product.js';
import connectDB from './config/database.js';
import { productsBaseSchema } from '../schema/products.js';
import chalk from 'chalk';
import z from 'zod';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const productsDummyData = JSON.parse(
  fs.readFileSync(path.join(__dirname, './data/products.json'), 'utf-8')
);

const schemaArrayValidation = z.array(productsBaseSchema);

const importData = async () => {
  try {
    const validatedProductsData =
      schemaArrayValidation.safeParse(productsDummyData);

    if (!validatedProductsData.success) {
      console.log(validatedProductsData.error.issues);
    }
    await Product.create(validatedProductsData.data);
    console.log(chalk.bgGreen.bold('Data getting imported...'));
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Product.deleteMany();
    console.log(chalk.bgRed.bold('Data getting destroyed...'));
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
};

const results = async () => {
  await connectDB();

  if (process.argv[2] === 'i') {
    await importData();
  } else if (process.argv[2] === 'd') {
    await deleteData();
  }
};

results();
