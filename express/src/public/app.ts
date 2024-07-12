import cors from 'cors';
import express from 'express';
import groupRoutes from '../routes/groupRoutes';
import personRoutes from '../routes/personRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', personRoutes);
app.use('/api', groupRoutes);

export default app;

