import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import tasksRoutes from './routes/tasks';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/tasks', tasksRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Backend rodando em ${`http://localhost:${PORT}`}`);
});