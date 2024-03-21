import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';


export interface IUser extends Document {
  firstName: string;
  lastName?: string; 
  email: string;
  mobileNumber?: string; 
  password: string;
}


const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: false }, 
  email: { type: String, required: true, unique: true },
  mobileNumber: { type: String, required: false, unique: true }, 
  password: { type: String, required: true },
});


userSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});


const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;
