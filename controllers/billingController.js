const { billingcycles, sessions } = require("../models");
const { Op } = require("sequelize");
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

  // async statusTrue(req, res) {
  //   try {
  //     let debitStatus = await debitUser.findAll({ where: { status: "true" } });
  //     return res.status(200).json(debitStatus);
  //   } catch (err) {
  //     return res.status(401).json(err);
  //   }
  // }

  //   async updateHouse(req, res) {
  //     const { id } = req.params;
  //     const id_user = req.headers.id_user;
  //     const { thumbnail, description, price, location, status } = req.body;

  //     const userLogged = await user.findByPk(id_user);
  //     const houseLogged = await houses.findByPk(id);

  //     if (String(userLogged.id) !== String(houseLogged.user_id))
  //       return res.status(401).json({ Error: "Nao authenticado" });
  //     try {
  //       const houseUpdated = await houses.update(
  //         {
  //           thumbnail,
  //           description,
  //           price,
  //           location,
  //           status,
  //         },
  //         { where: { id: id } }
  //       );

  //       return res.status(200).json({ atualizada: houseUpdated });
  //     } catch (err) {
  //       return res.status(500).json({ error: err });
  //     }
  //   }
}

module.exports = new billingCycle();
