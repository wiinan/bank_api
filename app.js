const express = require("express");
const routes = require("./routes/routes");
const cors = require("cors");
// const Cors = require("./config/cors");
require("dotenv").config();

class App {
  constructor() {
    this.server = express();

    this.middlewares();

    this.routes();
  }
  middlewares() {
    this.server.use(cors());

    this.server.use(express.urlencoded({ extended: true }));

    this.server.use(express.json());
  }
  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
