import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import products from './data/products.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

connectDB();

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Server Running in ${process.env.NODE_ENV} mode on Port ${PORT}`.yellow.underline.bold);
})