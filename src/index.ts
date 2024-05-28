import express, { Express } from 'express';
import { PORT } from './utils/variables';
import { PrismaClient } from '@prisma/client'
import errorMiddleware from './middlewares/errors';
import indexRouter from './routes';
import cors from 'cors';


const app: Express = express();

app.use(cors());

app.use(express.json());


app.use('/clinic', indexRouter);

app.use(errorMiddleware);

export const Prisma = new PrismaClient();


app.listen(PORT || 4000, () => console.log(`App running on port ${PORT}`));