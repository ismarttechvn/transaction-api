const statusCode = require("./statusCode");

class AppError extends Error {
  constructor(code) {
    super();
    this.statusCode = code;
    this.isOperational = true;
    this.isApp = true;
    Error.captureStackTrace(this, this.constructor);
  }

  updateError() {
    const message = statusCode.getMessage(this.statusCode);
    if (message === undefined) {
      this.statusCode = statusCode.Code.INTERNAL_ERROR.code;
      this.message = statusCode.Code.INTERNAL_ERROR.message;
    }
    this.message = message;
  }
}

module.exports = AppError;
