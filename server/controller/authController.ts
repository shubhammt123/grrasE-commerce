import { Request, Response } from 'express';
import UserModel , { IUser } from '../models/User';
import { ApiResponse } from '../types/apiResponse';
import { SignupRequestBody, LoginRequestBody } from '../types/requestBodies'; 
import bcrypt from 'bcryptjs';

export const signup = async (req: Request<{}, {}, SignupRequestBody>, res: Response<ApiResponse<IUser>>) => {
  try {
    const { firstName, lastName, email, mobileNumber, password } = req.body;
    
    
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ success: false, error: 'User already exists.' });
    }

    const user = new UserModel({ firstName, lastName, email, mobileNumber, password });
    await user.save();
    res.status(201).send({ success: true, data: user });
  } catch (error) {
    res.status(500).send({ success: false, error: 'Server error' });
  }
};

export const login = async (req: Request<{}, {}, LoginRequestBody>, res: Response<ApiResponse<{user: IUser;}>>) => {
  try {
    const { email, password } = req.body;

    
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ success: false, error: 'User not found.' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ success: false, error: 'Invalid credentials.' });
    }

    res.status(200).send({ success: true, data: { user } });
  } catch (error) {
    res.status(500).send({ success: false, error: 'Server error' });
  }
};
