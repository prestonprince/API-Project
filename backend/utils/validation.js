const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);
  
    if (!validationErrors.isEmpty()) {
      console.log(validationErrors.errors)

      // add column name that failed validation to err obj
      const validObj = {}
      for (const e of validationErrors.errors) {
        const key = e.param;
        validObj[key] = e.msg;
      };

      // const errors = validationErrors
      //   .array()
      //   .map((error) => {
      //     return `${error.msg}`
      //   });

      const errors = validObj
  
      const err = Error('Bad request.');
      err.errors = errors;
      err.status = 400;
      err.title = 'Bad request.';
      next(err);
    }
    next();
  };

module.exports = {
    handleValidationErrors
  };
