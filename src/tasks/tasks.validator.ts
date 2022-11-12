import { body, ValidationChain } from 'express-validator';
import { Priority } from '../enums/Priority';
import { Status } from '../enums/Status';

export const createValidator: ValidationChain[] = [
  body('title')
    .not()
    .isEmpty()
    .withMessage('Title is required')
    .trim()
    .isString()
    .withMessage('Title must be in a text format'),
  body('date')
    .not()
    .isEmpty()
    .withMessage('Date is required')
    .isString()
    .withMessage('Date must be a valid date format'),
  body('description')
    .trim()
    .isString()
    .withMessage('Description must be in a text format'),
  body('priority')
    .trim()
    .isIn([Priority.HIGH, Priority.LOW, Priority.NORMAL])
    .withMessage(
      'Priority can only be high, low or normal',
    ),
  body('status')
    .trim()
    .isIn([
      Status.COMPLETED,
      Status.INPROGRESS,
      Status.TODO,
    ])
    .withMessage(
      'Status can only be completed, inProgress or todo',
    ),
];

export const updatevalidator: ValidationChain[] = [
  body('id')
    .not()
    .isEmpty()
    .withMessage('The task id is required')
    .trim()
    .isString()
    .withMessage(
      'The task id must be in a  valid uuid format',
    ),
  body('status')
    .trim()
    .isIn([
      Status.COMPLETED,
      Status.INPROGRESS,
      Status.TODO,
    ])
    .withMessage(
      'Status can only be completed, inProgress or todo',
    ),
];
