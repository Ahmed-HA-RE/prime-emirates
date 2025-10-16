import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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

export const User = mongoose.model('user', userSchema);
