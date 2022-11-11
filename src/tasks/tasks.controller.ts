import { AppDataSource } from '../../index';
import { Task } from './task.entity';
import { instanceToPlain } from 'class-transformer';
export class TasksController {
  constructor(
    private taskRepository = AppDataSource.getRepository(
      Task,
    ),
  ) {}

  //@ts-ignore
  public async getAll(): Promise<Task[]> {
    //Declare a variable to hold all tasks

    let allTasks: Task[];

    //Fetch all tasks using repository
    try {
      allTasks = await this.taskRepository.find({
        order: {
          date: 'ASC',
        },
      });

      //Convert the tasks instance to an array of objects

      allTasks = instanceToPlain(allTasks) as Task[];

      return allTasks;
    } catch (err) {
      console.log(err);
    }
  }
}
