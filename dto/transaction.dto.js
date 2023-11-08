const Joi = require("joi");

exports.create = Joi.object({
  cost: Joi.number().integer().required(),
  costCenterId: Joi.number().required(),
  payAt: Joi.date().required(),
  costElementId: Joi.number().required(),
  status: Joi.string()
    .valid("waiting", "paid", "cancelled", "processing")
    .default("waiting"),
  paymentMethodId: Joi.number().required(),
  content: Joi.string().allow("", null),
});

exports.update = Joi.object({
  cost: Joi.number().integer(),
  costCenterId: Joi.number(),
  payAt: Joi.date(),
  costElementId: Joi.number(),
  status: Joi.string()
    .valid("waiting", "paid", "cancelled", "processing")
    .default("waiting"),
  paymentMethodId: Joi.number(),
  content: Joi.string().allow("", null),
});
