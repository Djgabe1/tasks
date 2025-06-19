import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

//Routes
import authRoutes from './route/auth.route.js'
//Tasks
import taskRoutes from './route/tasks.routes.js'

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

//Authetications
app.use('/api/', authRoutes);

//Tasks
app.use('/api', taskRoutes);

export default app;