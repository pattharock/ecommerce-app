import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import products from './data/products.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import {notFound, errorHandler} from './middleware/errorMiddleware.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200)
  res.json({
    "message": "API is running"
  });
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);
 
app.listen(PORT, () => {
  console.log(`Server Running in ${process.env.NODE_ENV} mode on Port ${PORT}`.yellow.underline.bold);
})