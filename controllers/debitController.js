const { debituser, billingcycles } = require("../models");
const debitServices = require("../service/debitServices");

class debitController {
  async store(req, res) {
    try {
      const debited = await debitServices.store({
        userId: req.currentUserId,
        data: req.data,
        filter: req.params,
      });

      return res.status(200).json(debited);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async index(req, res) {
    try {
      const { billing_debit_id } = req.query;

      if (!billing_debit_id) {
        let getDate = await debituser.findAll({
          include: billingcycles,
          order: [["createdAt", "DESC"]],
          limit: 5,
        });

        return res.status(200).json(getDate);
      } else {
        let getDate = await debituser.findAll({
          include: billingcycles,
          where: { billing_debit_id },
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
      const debitStatus = await debituser.findAll({
        where: { status: "true" },
      });
      return res.status(200).json(debitStatus);
    } catch (err) {
      return res.status(401).json(err);
    }
  }

  async updateFk(req, res) {
    try {
      const updatedFk = await debitServices.updateForeign({
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
      const detroyDebit = await debitServices.destroy({ filter: req.params });

      return res.status(200).json({ "credito deletado": detroyDebit });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

module.exports = new debitController();
