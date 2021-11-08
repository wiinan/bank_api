const { creditUser, billingcycles } = require("../models");
const creditServices = require("../service/creditServices");

class creditController {
  async store(req, res) {
    const credited = await creditServices.store({
      data: req.data,
      filter: req.params,
    });

    return res.status(200).json(credited);
  }
  catch(err) {
    return res.status(500).json(err);
  }

  async index(req, res) {
    try {
      const { billingCreditId } = req.query;

      if (!billingCreditId) {
        let getDate = await creditUser.findAll({
          order: [["createdAt", "DESC"]],
          limit: 10,
        });

        return res.status(200).json(getDate);
      } else {
        let getDate = await creditUser.findAll({
          where: { billingCreditId },
          order: [["createdAt", "DESC"]],
          limit: 10,
        });

        return res.status(200).json(getDate);
      }
      //if (!userPk) return res.status(401).json({ error: "nao encontrado" });
    } catch (err) {
      return res.status(401).json(err);
    }
  }

  // async statusTrue(req, res) {
  //   try {
  //     let debitStatus = await creditUser.findAll({ where: { status: "true" } });
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

  //   async destroier(req, res) {
  //     const { id } = req.body;
  //     const id_user = req.headers.id_user;

  //     const userLogged = await user.findByPk(id_user);
  //     const houseLogged = await houses.findByPk(id);

  //     if (String(userLogged.id) !== String(houseLogged.user_id))
  //       return res.status(401).json({ Error: "Nao authenticado" });
  //     try {
  //       const houseDestroy = await houseLogged.destroy();
  //       return res.status(200).json({ "casa deletada": houseDestroy });
  //     } catch (err) {
  //       return res.status(500).json({ Error: err });
  //     }
  //   }
}

module.exports = new creditController();
