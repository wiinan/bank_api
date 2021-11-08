const express = require("express");
const debitController = require("../controllers/debitController");
const debit = require("../schema/debit");
const Validate = require("../schema/validate");
const verifyToken = require("../middlewares/verifyToken");

const routes = express.Router();

routes.use(verifyToken);

routes.post(
  "/debit/:billingDebitId",
  Validate(debit.store),
  debitController.store
);
routes.get("/debit", debitController.index);

module.exports = routes;
