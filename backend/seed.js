import fs from 'fs';
import path from 'path';
import { Product } from './models/Product.js';
import { User } from './models/User.js';
import { Order } from './models/Order.js';
import connectDB from './config/database.js';
import chalk from 'chalk';

await connectDB();

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

// Products
const productsDummyData = JSON.parse(
  fs.readFileSync(path.join(__dirname, './data/products.json'), 'utf-8')
);

// Users
const usersDummyData = JSON.parse(
  fs.readFileSync(path.join(__dirname, './data/users.json'), 'utf-8')
);

// Orders
// const productsDummyData = JSON.parse(
//   fs.readFileSync(path.join(__dirname, './data/products.json'), 'utf-8')
// );

const importData = async () => {
  try {
    const createdUsers = await User.create(usersDummyData);
    const sampleData = productsDummyData.map((product) => {
      return { ...product, user: createdUsers[0]._id };
    });
    await Product.create(sampleData);

    console.log(chalk.bgGreen.bold('Data getting imported...'));
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();
    console.log(chalk.bgRed.bold('Data getting destroyed...'));
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
};

if (process.argv[2] === 'i') {
  await importData();
} else if (process.argv[2] === 'd') {
  await deleteData();
}
