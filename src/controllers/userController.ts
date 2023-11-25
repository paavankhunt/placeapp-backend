import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/userModel';

const generateToken = (userId: string): string => {
  const secretKey = 'paavan';
  return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
};

export const signUp = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    const token = generateToken(newUser._id);
    res.json({ message: 'User signed up successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      const trimmedEnteredPassword = password.trim();
      const passwordMatch = await bcrypt.compare(
        trimmedEnteredPassword,
        user.password
      );

      if (passwordMatch) {
        const token = generateToken(user._id);
        res.json({ message: 'Login successful', token });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const logout = (req: Request, res: Response) => {
  res.json({ message: 'Logout successful' });
};
