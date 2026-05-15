import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';

dotenv.config();

import { validateEnv } from './utils/env-validator';
validateEnv();

const app: Application = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: '*' }
});

import { connectDB } from './config/db';
import { connectRedis } from './config/redis';
import apiRoutes from './routes';
import { errorMiddleware, notFoundMiddleware } from './middleware/error.middleware';

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/v1', apiRoutes);

app.get('/', (req, res) => {
  res.json({ success: true, message: 'RetailNova AI Enterprise API is running' });
});

// Error Middleware
app.use(notFoundMiddleware);
app.use(errorMiddleware);

// Real-time WebSockets setup
io.on('connection', (socket) => {
  console.log('📡 User connected:', socket.id);
  
  socket.emit("welcome", "RetailNova Live");

  socket.on('join_store', (storeId) => {
    socket.join(`store_${storeId}`);
    console.log(`👤 Client ${socket.id} joined store: ${storeId}`);
  });

  socket.on("inventory_update", (data) => {
    io.emit("inventory_update", data);
  });

  socket.on('disconnect', () => {
    console.log('🔌 Client disconnected:', socket.id);
  });
});

// Export io to be used in other files
export { io };

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, async () => {
  await connectDB();
  await connectRedis();
  console.log(`🚀 RetailNova Enterprise Backend running on port ${PORT}`);
});
