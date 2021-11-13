const express = require("express");
const cors = require("cors");

class Cors {
  constructor() {
    this.server = express();
    this.useCors();
  }

  useCors() {
    this.server.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");

      res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");

      this.server.use(cors());

      next();
    });
  }
}

module.exports = new Cors();
