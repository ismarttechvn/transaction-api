const statusCode = require("./statusCode");

module.exports = (data, response) => {
  response.status(200).json({
    statusCode: statusCode.Code.OKE.code,
    message: statusCode.Code.OKE.message,
    data,
  });
};
