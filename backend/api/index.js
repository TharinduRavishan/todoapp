import express from 'express';
import { todoRouter } from './resources/todo';
import { userRouter } from './resources/user';
import { authRouter } from './resources/auth';

export const restRouter = express.Router();

export const publicRouter = express.Router();

restRouter.use('/todo', todoRouter);
restRouter.use('/user', userRouter);
publicRouter.use('/', authRouter);
