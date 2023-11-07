const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const handlerFactory = require("../utils/handlerFactory");

const router = express.Router();

router
  .route("/transaction")
  .get(handlerFactory.getAll(prisma.transactions))
  .post(handlerFactory.createOne(prisma.transactions));
router
  .route("/transaction/:id")
  .put(handlerFactory.updateOne(prisma.transactions));
module.exports = router;
