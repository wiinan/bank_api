const express = require("express");
const creditController = require("../controllers/creditController");
const credit = require("../schema/debit");
const Validate = require("../schema/validate");
const verifyToken = require("../middlewares/verifyToken");

const routes = express.Router();

routes.use(verifyToken);

routes.post(
  "/credit/:billing_credit_id",
  Validate(credit.store),
  creditController.store
);
routes.get("/credit", creditController.index);
routes.put("/credit/:id", Validate(credit.update), creditController.updateFk);
routes.delete(
  "/credit/:id",
  Validate(credit.update),
  creditController.destroier
);

module.exports = routes;
