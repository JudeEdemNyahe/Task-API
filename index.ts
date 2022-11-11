import express, { Express } from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import bodyParser from 'body-parser';
import { Task } from './src/tasks/task.entity';
import { taskRouter } from './src/tasks/tasks.router';
//Instantiate express
const app: Express = express();
dotenv.config();

//Parse incoming requests data
app.use(bodyParser.json());

//Enable CORS
//app.use(cors());

//TypeORM connection to database
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [Task],
  synchronize: true,
});

//Define server port
const PORT = process.env.PORT || 3000;

app.use('/', taskRouter);
AppDataSource.initialize()
  .then(() => {
    app.listen(PORT);
    console.log('Data Source initialized');
  })
  .catch((err) => {
    console.error(
      'Error during data source initialization',
      err,
    );
  });
