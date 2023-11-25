import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import authRoutes from './routes/userRoutes';
import placeRoutes from './routes/placeRoutes';
import verifyToken from './middleware/authMiddleware';
require('dotenv').config();

const app = express();
app.use(cors({ origin: '*' }));

app.use(bodyParser.json());

app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 8080;
mongoose.connect(process.env.MONGO_URL);

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error: ', err);
});

app.get('/ping', (_req: Request, res: Response) => {
  return res.send('pong 🏓');
});

app.use('/auth', authRoutes);
app.use('/place', placeRoutes);

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});
