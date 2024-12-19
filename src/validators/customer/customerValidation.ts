import { body, param } from 'express-validator';

export const createValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty.'),
  body('phone')
    .notEmpty().withMessage('Phone cannot be empty.'),
  body('address').notEmpty().withMessage('Address cannot be empty.'),
];

export const updateValidation = [
  param('id').notEmpty().withMessage('ID is required.').isInt().withMessage('ID must be an integer.'),

  body('name').notEmpty().withMessage('Name cannot be empty.'),
  body('phone')
    .notEmpty().withMessage('Phone cannot be empty.'),
  body('address').notEmpty().withMessage('Address cannot be empty.'),
];