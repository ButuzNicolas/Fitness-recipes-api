import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import recipeRoutes from './routes/recipeRoutes.ts';
import { errorHandler } from './middleware/errorHandler.ts';
import { connectRedis } from './config/redis.ts';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString()});
});

app.use('/api/v1/recipes', recipeRoutes);

app.use(errorHandler);

const startServer = async () => {
    try {
        await connectRedis();

        app.listen(PORT, () => {
            console.log(`corriendo en http://localhost:${PORT}`)
            console.log(`http://localhost:${PORT}/health`);
            console.log(`imagen: ${process.env.IMAGE_PROVIDER || 'dalle'}`);
        });

    } catch(error){
        console.error('falla iniciando servidor:', error);
        process.exit(1);
    }

};

startServer();