import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database'; 
import authRoutes from './routes/authRoutes'; 

dotenv.config();

connectDB();

const app: Express = express();

app.use(cors());

app.use(express.json()); 


app.use('/api/auth', authRoutes);

const PORT: number = parseInt(process.env.PORT as string, 10) || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
