const catchAsync = require("./catchAsync");

exports.validate = (Schema) =>
  catchAsync(async (req, res, next) => {
    const { value, error } = Schema.validate(req.body, {
      convert: true,
    });

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    req.body = value;
    return next();
  });
