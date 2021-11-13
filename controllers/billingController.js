const { billingcycles, sessions } = require("../models");
const billingServices = require("../service/billingServices");

class billingCycle {
  async store(req, res) {
    try {
      const billingRegister = await billingServices.store({
        data: req.data,
        userId: req.currentUserId,
      });

      return res.status(200).json(billingRegister);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async index(req, res) {
    const { userId } = req.currentUserId;

    const { id } = req.query;

    const userPk = await sessions.findByPk(userId);

    if (!userPk) return res.status(401).json({ error: "nao encontrado" });

    try {
      if (!id) {
        let getDate = await billingcycles.findAll({
          where: { session_id: userId },
        });
        return res.status(200).json(getDate);
      }

      let getDate = await billingcycles.findAll({
        where: {
          session_id: userId,
          id: parseInt(id),
        },
      });

      return res.status(200).json(getDate);
    } catch (err) {
      return res.status(401).json(err);
    }
  }

  async update(req, res) {
    try {
      const billingUpdated = await billingServices.update({
        data: req.data,
        filter: req.params,
      });

      return res.status(200).json(billingUpdated);
    } catch {
      return res.status(500).json(err);
    }
  }

  async destroier(req, res) {
    try {
      const billingDeleted = await billingServices.destroy({
        filter: req.params,
      });
      return res.status(200).json({ "usuario Deletado": billingDeleted });
    } catch (err) {
      return res.status(500).json(err);
    }
  }

}

module.exports = new billingCycle();
