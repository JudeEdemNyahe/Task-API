import { AppDataSource } from '../../index';
import { Task } from './task.entity';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

class TasksController {
  public async getAll(
    req: Request,
    res: Response,
  ): Promise<Response> {
    //Declare a variable to hold all tasks

    let allTasks: Task[];

    //Fetch all tasks using repository
    try {
      allTasks = await AppDataSource.getRepository(
        Task,
      ).find({ order: { date: 'ASC' } });

      //Convert the tasks instance to an array of objects

      allTasks = instanceToPlain(allTasks) as Task[];

      return res.status(200).json(allTasks);
    } catch (err) {
      return res
        .json({ error: 'Internal Server Error' })
        .status(500);
    }
  }
  //Method for post route
  public async create(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }

    //Create a new instance of a Task

    const newTask = new Task();

    //Add the required properties to the Task object
    newTask.title = req.body.title;
    newTask.date = req.body.date;
    newTask.description = req.body.description;
    newTask.priority = req.body.Priority;
    newTask.status = req.body.Status;

    //Add the new task to the database
    let createdTask: Task;

    try {
      createdTask = await AppDataSource.getRepository(
        Task,
      ).save(newTask);

      //convert the task to instance to an object
      createdTask = instanceToPlain(createdTask) as Task;
      return res.status(201).json(createdTask);
    } catch (errors) {
      return res
        .json({ error: 'Internal Server Error' })
        .status(500);
    }
  }

  //Method for update route
  public async update(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }

    //Fetch the task from the database
    let task: Task;

    try {
      task = await AppDataSource.getRepository(
        Task,
      ).findOne(req.body.id);

      if (!task) {
        return res
          .status(404)
          .json({ error: 'Task not found' });
      }

      //Update the task
      task.status = req.body.status;

      //Save the task to the database
      await AppDataSource.getRepository(Task).save(task);

      //Convert the task to an object
      task = instanceToPlain(task) as Task;

      return res.status(200).json(task);
    } catch (err) {
      return res
        .json({ error: 'Internal Server Error' })
        .status(500);
    }
  }
}

export const taskController = new TasksController();
