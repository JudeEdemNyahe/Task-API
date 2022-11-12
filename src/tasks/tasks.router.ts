import { Router } from 'express';
import { taskController } from './tasks.controller';
import {
  createValidator,
  updatevalidator,
} from './tasks.validator';

/*Fire the router function*/

export const taskRouter: Router = Router();

taskRouter.get('/tasks', taskController.getAll);

taskRouter.post(
  '/tasks',
  createValidator,
  taskController.create,
);

taskRouter.post(
  '/tasks',
  updatevalidator,
  taskController.update,
);
