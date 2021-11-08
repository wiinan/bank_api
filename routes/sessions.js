const express = require("express");
const Validate = require("../schema/validate");
const sessions = require("../schema/sessions");
const sessionController = require("../controllers/sessionController");
const verifyToken = require("../middlewares/verifyToken");

const routes = express.Router();

routes.post("/signup", Validate(sessions.store), sessionController.store);
routes.post("/login", Validate(sessions.login), sessionController.login);

routes.use(verifyToken);    

routes.get("/all", sessionController.index);
routes.put("/update", Validate(sessions.update), sessionController.update);
routes.delete("/destroy/:id", sessionController.destroy);

module.exports = routes;
