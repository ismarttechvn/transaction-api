const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const handlerFactory = require("../utils/handlerFactory");

const router = express.Router();

router
  .route("/payment-method")
  .get(handlerFactory.getAll(prisma.paymentMethods))
  .post(handlerFactory.createOne(prisma.paymentMethods));
router
  .route("/payment-method/:id")
  .put(handlerFactory.updateOne(prisma.paymentMethods));

router
  .route("/cost-element")
  .get(handlerFactory.getAll(prisma.costElements))
  .post(handlerFactory.createOne(prisma.costElements));
router
  .route("/cost-element/:id")
  .get(handlerFactory.getOne(prisma.costElements))
  .put(handlerFactory.updateOne(prisma.costElements));

router
  .route("/cost-center")
  .get(handlerFactory.getAll(prisma.costCenters))
  .post(handlerFactory.createOne(prisma.costCenters));
router
  .route("/cost-center/:id")
  .put(handlerFactory.updateOne(prisma.costCenters));

module.exports = router;
