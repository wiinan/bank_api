const { credituser, billingcycles } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  store: async (req) => {
    const { billing_credit_id } = req.filter;

    const { value } = req.data;

    try {
      const billingAccount = await billingcycles.findByPk(billing_credit_id);

      if (!billingAccount) {
        throw new Error("Conta nao encontrado");
      }

      const actualValue = billingAccount.dataValues.credits;

      const credits = actualValue + value;

      const createCredit = await credituser.create({
        billing_credit_id,
        ...req.data,
      });

      await billingcycles.update(
        { credits },
        { where: { id: billing_credit_id } }
      );

      return createCredit;
    } catch (err) {
      throw new Error(err);
    }
  },

  updateForeign: async (req) => {
    try {
      const { id } = req.filter;

      const billingExist = await billingcycles.findByPk(id);

      if (!billingExist) {
        throw new Error("Conta nao existente!");
      }

      const allCredits = await credituser.findAll({
        where: { billing_credit_id: { [Op.is]: null } },
      });

      let rotation = 0;

      while (rotation !== allCredits.length) {
        await credituser.update(
          {
            billing_credit_id: id,
          },
          { where: { id: allCredits[rotation].dataValues.id } }
        );

        rotation = rotation + 1;
      }

      return "Creditos Migrados!";
    } catch (err) {
      throw new Error(err);
    }
  },

  destroy: async (req) => {
    const { id } = req.filter;

    // try {
      const creditExist = await credituser.findOne({
        where: { id },
      });

      if (!creditExist) {
        throw new Error("esse credito nao existe");
      }

      const billingToUpdate = await billingcycles.findByPk(
        creditExist.dataValues.billing_credit_id
      );

      const totalValue =
        creditExist.dataValues.value - billingToUpdate.dataValues.credits;

      await billingcycles.update(
        { credits: totalValue },
        { where: { id: creditExist.dataValues.billing_credit_id } }
      );

      await credituser.destroy({ where: { id } });

      return creditExist.dataValues;
    // } catch (err) {
    //   throw new Error(err);
    // }
  },
  update: async (req) => {
    const { id } = req.filter;
    try {
      const updateCredit = await credituser.findByPk(id);

      if (!updateCredit) {
        throw new Error(err);
      }

      const updatedCredit = await credituser.update(
        { ...req.data },
        { where: id }
      );

      return updatedCredit;
    } catch (err) {
      throw new Error(err);
    }
  },
};

// const { billingDebitId } = req.params;
//     const { name, value, status, pedencies } = req.body;
//     const userPk = await billingController.findByPk(billingDebitId);

//     if (!userPk)
//       return res.status(401).json({ error: "usuario nao encontrado" });

//     try {
//       let createDebit = await debitUser.create({
//         name,
//         value,
//         status,
//         pedencies,
//         billingDebitId,
//       });

//       return res.status(200).json(createDebit);
//     } catch (err) {
//       return res.status(500).json(err);
//     }
