const { debituser, billingcycles } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  store: async (req) => {
    const { billing_debit_id } = req.filter;

    const { value } = req.data;

    try {
      const billingAccount = await billingcycles.findByPk(billing_debit_id);

      if (!billingAccount) {
        throw new Error("Conta nao encontrada!");
      }

      const actualValue = billingAccount.dataValues.credits;

      const credits = actualValue - value;

      const createDebit = await debituser.create({
        billing_debit_id,
        ...req.data,
      });

      await billingcycles.update(
        { credits },
        { where: { id: billing_debit_id } }
      );

      return createDebit;
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

      const allDebits = await debituser.findAll({
        where: { billing_debit_id: { [Op.is]: null } },
      });
      console.log(allDebits);

      let rotation = 0;

      while (rotation !== allDebits.length) {
        await debituser.update(
          { billing_debit_id: id },
          { where: { id: allDebits[rotation].dataValues.id } }
        );

        rotation = rotation + 1;
      }

      return "Debitos migrados!";
    } catch (err) {
      throw new Error(err);
    }
  },

  destroy: async (req) => {
    const { id } = req.filter;

    try {
      const debitExist = await debituser.findOne({
        where: { id },
      });

      if (!debitExist) throw new Error("esse Debito nao existe");

      const billingToUpdate = await billingcycles.findByPk(
        debitExist.dataValues.billing_debit_id
      );

      const totalValue =
        debitExist.dataValues.value + billingToUpdate.dataValues.credits;

      await billingcycles.update(
        { credits: totalValue },
        { where: { id: debitExist.dataValues.billing_debit_id } }
      );

      await debituser.destroy({ where: { id } });

      return debitExist.dataValues;
    } catch (err) {
      throw new Error(err);
    }
  },
};
