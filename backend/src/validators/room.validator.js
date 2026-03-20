import { body } from 'express-validator';
import  handleValidationErrors  from './handleValidationError.js';

export const roomCreateValidation = [
  body('name')
      .trim()
      .notEmpty().withMessage('Username is required')
      .isLength({ min: 3, max: 100 })
      .withMessage('room title must be 3-100 characters long'),


  body("description")
      .trim()
      .notEmpty().withMessage("room description is required")
      .isLength({ min: 3, max: 300 })
      .withMessage("room description must be 3-300 characters long"),
  handleValidationErrors
]