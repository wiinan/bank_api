const express = require("express");
const debitController = require("../controllers/debitController");
const debit = require("../schema/debit");
const Validate = require("../schema/validate");
const verifyToken = require("../middlewares/verifyToken");

const routes = express.Router();

routes.use(verifyToken);

routes.post(
  "/debit/:billing_debit_id",
  Validate(debit.store),
  debitController.store
);
routes.get("/debit", debitController.index);
routes.put("/debit/:id", Validate(debit.update), debitController.updateFk);
routes.delete("/debit/:id", Validate(debit.update), debitController.destroier);

module.exports = routes;
