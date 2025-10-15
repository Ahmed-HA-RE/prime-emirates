import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Product name is required'],
      minLength: 3,
    },
    image: String,
    description: {
      type: String,
      trim: true,
      required: [true, 'Please add some description for the product'],
    },
    brand: {
      type: String,
      trim: true,
      required: [true, 'The name of the brand is required'],
    },
    category: {
      type: String,
      trim: true,
      required: [true, 'The category of the product is required'],
    },
    price: { type: Number, min: [1, 'Price must be at least 1 AED'] },
    countInStock: {
      type: Number,
      min: [0, 'The minimum count of the product in stock must be at least 0 '],
      default: 0,
    },
    rating: {
      type: Number,
      min: [0, 'Rating must be at least 0'],
      max: [5, 'Rating must not exceed 5'],
      default: 0,
    },
    numReviews: {
      type: Number,
      min: [0, 'The minimum reviews of the product must be at least 0'],
      default: 0,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model('product', productSchema);
