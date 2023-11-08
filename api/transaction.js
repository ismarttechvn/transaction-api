const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const handlerFactory = require("../utils/handlerFactory");
const { validate } = require("../utils/typeConversionMiddleware");
const transactionDto = require("../dto/transaction.dto");

const router = express.Router();

router
  .route("/transaction")
  .get(
    handlerFactory.getAll(prisma.transactions, {
      costCenter: true,
      costElement: true,
      paymentMethod: true,
    })
  )
  .post(
    validate(transactionDto.create),
    handlerFactory.createOne(prisma.transactions)
  );
router
  .route("/transaction/:id")
  .get(
    handlerFactory.getOne(prisma.transactions, {
      costCenter: true,
      costElement: true,
      paymentMethod: true,
    })
  )
  .put(
    validate(transactionDto.update),
    handlerFactory.updateOne(prisma.transactions)
  );
module.exports = router;
