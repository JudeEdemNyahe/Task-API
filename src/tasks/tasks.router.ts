import { Router, Request, Response } from 'express';
import { TasksController } from './tasks.controller';
/*Fire the router function*/

export const taskRouter: Router = Router();

taskRouter.get(
  '/tasks',
  async (req: Request, res: Response) => {
    const tasksController = new TasksController();
    const allTasks = await tasksController.getAll();

    res.status(200).json(allTasks);
  },
);
