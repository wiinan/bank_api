const express = require("express");
const sessions = require("./sessions");
const debit = require("./debit");
const credit = require("./credit");
const billing = require("./billing");
const verifyToken = require("./verifyToken");

const routes = express.Router();

routes.use("/api", sessions);
routes.use("/api", credit);
routes.use("/api", debit);
routes.use("/api", billing);
routes.use("/api", verifyToken);

module.exports = routes;
