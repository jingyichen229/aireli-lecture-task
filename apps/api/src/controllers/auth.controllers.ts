import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { PlatformUser } from "@enterprise-commerce/core/platform/types"
import { createUser } from "../models/User"

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    const createdUser = await createUser({
      email,
      password,
      firstName,
      lastName,
    });

    res.status(201).json({
      message: 'User created successfully',
      user: createdUser,
    });

  } catch (error: any) {
    console.error('registerUser error:', error);

    if (error?.message?.includes('UNIQUE constraint failed')) {
      res.status(409).json({ message: 'User already exists' });
      return;
    }

    res.status(500).json({ message: 'Internal server error' });
  }
};