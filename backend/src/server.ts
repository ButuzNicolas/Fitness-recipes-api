import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import recipeRoutes from './routes/recipeRoutes';
import { errorHandler } from './middleware/errorHandler';
import { connectRedis } from './config/rendis';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'perfect veri gute' }));
app.use('/api/v1/recipes', recipeRoutes);
app.use(errorHandler);

const start = async () => {
  await connectRedis();
  app.listen(PORT, () => {
    console.log(`Backend en http://localhost:${PORT}`);
    console.log(`IA: Gemini 2.0 Flash`);
    console.log(`Imágenes: Pollinations.ai`);
  });
};
start();