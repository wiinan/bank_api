const express = require("express");
const billingController = require("../controllers/billingController");
const Validate = require("../schema/validate");
const billing = require("../schema/billing");
const verifyToken = require("../middlewares/verifyToken");

const routes = express.Router();

routes.use(verifyToken);

routes.post("/billing", Validate(billing.store), billingController.store);
routes.get("/billing", billingController.index);
routes.delete("/billing/:id", billingController.destroier);


module.exports = routes;
