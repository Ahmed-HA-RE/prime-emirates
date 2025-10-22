import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import signToken from '../utils/generateJWT.js';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  { timestamps: true }
);

// Hash password before saving it to DB
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = 10;
  this.password = await bcrypt.hash(this.password, salt);
});

// Generate accessToken and refreshToken
userSchema.methods.generateToken = async function () {
  const accessToken = await signToken(this._id.toString(), '15m');
  const refreshToken = await signToken(this._id.toString(), '30d');

  return { accessToken, refreshToken };
};

// Check if entered password match
userSchema.methods.isPassMatched = async function (enteredPass) {
  const isPassMatched = await bcrypt.compare(enteredPass, this.password);
  return isPassMatched;
};

export const User = mongoose.model('user', userSchema);
