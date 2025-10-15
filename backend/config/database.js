import mongoose from 'mongoose';
import dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config();

const connectDB = async () => {
  const connect = await mongoose.connect(process.env.MONOGODB_URI);
  console.log(
    chalk.cyan.bold.underline(
      `MongoDB is connected on ${connect.connection.name} database`
    )
  );
};

export default connectDB;
