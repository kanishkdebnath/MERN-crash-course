import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from "./routes/product.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json()); // use express js json middleware to use request body etc
app.use("/api/products", productRoutes);
app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at https://localhost:${PORT}`);
})