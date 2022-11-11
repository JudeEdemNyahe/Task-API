import { Entity, PrimaryGeneratedColumn } from 'typeorm';
//import { Priority } from '../enums/priority';
//import { Status } from '../enums/status';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
