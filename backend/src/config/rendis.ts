import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
})

redisClient.on('error', (err) => console.error('Redis Client Error:, err'));

export const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log('Redis Conectado');
    } catch (error){
        console.warn('Redis no disponible, se esta usando modo sin cache');
    }
    
};

export {redisClient};