const express = require("express");
const creditController = require("../controllers/creditController");
const credit = require("../schema/debit");
const Validate = require("../schema/validate");
const verifyToken = require("../middlewares/verifyToken");

const routes = express.Router();

routes.use(verifyToken);

routes.post(
  "/credit/:billingCreditId",
  Validate(credit.store),
  creditController.store
);
routes.get("/credit", creditController.index);

module.exports = routes;
