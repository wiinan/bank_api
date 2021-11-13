const { credituser, billingcycles } = require("../models");
const creditServices = require("../service/creditServices");

class creditController {
  async store(req, res) {
    try {
      const credited = await creditServices.store({
        userId: req.currentUserId,
        data: req.data,
        filter: req.params,
      });

      return res.status(200).json(credited);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async index(req, res) {
    try {
      const { billing_credit_id } = req.query;

      if (!billing_credit_id) {
        let getDate = await credituser.findAll({
          include: billingcycles,
          order: [["createdAt", "DESC"]],
          limit: 5,
        });

        return res.status(200).json(getDate);
      } else {
        let getDate = await credituser.findAll({
          include: billingcycles,
          where: { billing_credit_id },
          order: [["createdAt", "DESC"]],
          limit: 10,
        });

        return res.status(200).json(getDate);
      }
    } catch (err) {
      return res.status(401).json(err);
    }
  }

  async statusTrue(req, res) {
    try {
      const debitStatus = await credituser.findAll({
        where: { status: "true" },
      });
      return res.status(200).json(debitStatus);
    } catch (err) {
      return res.status(401).json(err);
    }
  }

  async update(req, res) {
    try {
      const updatedCredit = await creditServices.update({
        userId: req.currentUserId,
        data: req.data,
        filter: req.params,
      });
      return res.status(200).json(updatedCredit);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async updateFk(req, res) {
    try {
      const updatedFk = await creditServices.updateForeign({
        userId: req.currentUserId,
        filter: req.params,
      });

      return res.status(200).json(updatedFk);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async destroier(req, res) {
    try {
      const detroiedCredit = await creditServices.destroy({
        filter: req.params,
      });

      return res.status(200).json({ "credito deletado": detroiedCredit });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

module.exports = new creditController();
