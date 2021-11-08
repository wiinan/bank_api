const { billingcycles, sessions } = require("../models");
const sessionServices = require("../service/sessionServices");

require("dotenv").config();

class SessionController {
  async store(req, res) {
    try {
      const userRegister = await sessionServices.store({ data: req.data });
      return res.json(userRegister);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async login(req, res) {
    try {
      const userLogged = await sessionServices.login({ data: req.data });

      return res.json(userLogged);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async index(req, res) {
    try {
      let allUsers = await sessions.findAll();

      return res.status(200).json(allUsers);
    } catch (err) {
      return res.status(401).json(err);
    }
  }

  async update(req, res) {
    try {
      let userUpdated = await sessionServices.update({
        userId: req.currentUserId,
        data: req.data,
      });

      return res.status(200).json(userUpdated);
    } catch (err) {
      return res.status(401).json(err);
    }
  }

  async destroy(req, res) {
    try {
      let userDeleted = await sessionServices.destroy({
        userId: req.currentUserId,
        filter: req.params,
      });

      return res.status(200).json({ "usuario deletado": userDeleted });
    } catch (err) {
      return res.status(401).json(err);
    }
  }
}

module.exports = new SessionController();
