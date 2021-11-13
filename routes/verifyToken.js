const express = require("express");
const verifyToken = require("../controllers/validateController");

const routes = express.Router();

routes.post("/verifyToken", verifyToken.store);

module.exports = routes;
