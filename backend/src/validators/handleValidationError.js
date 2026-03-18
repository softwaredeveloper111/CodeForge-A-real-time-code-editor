import {  validationResult } from 'express-validator';



 const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed")
      error.status = 400
      error.details = errors.array()

      return next(error)
  }
  next();
}

export default  handleValidationErrors