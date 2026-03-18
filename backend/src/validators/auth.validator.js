import { body } from 'express-validator';
import  handleValidationErrors  from './handleValidationError.js';





export const registerValidator = [
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be 3-20 characters long')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),

  body('email')
    .trim()
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),

  body('password')
    .trim()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),

    handleValidationErrors

];





export const resendEmailValidator = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),

    handleValidationErrors
];





export const loginValidator = [
  body('identifier')
    .trim()
    .notEmpty().withMessage('Username or email is required'),
  body('password')
    .trim()
    .notEmpty().withMessage('Password is required'),
  handleValidationErrors
];
