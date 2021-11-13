const { billingcycles, sessions } = require("../models");

module.exports = {
  store: async (req) => {
    const { userId } = req.userId;

    const ActualUser = await sessions.findByPk(userId);

    if (!ActualUser) {
      throw new Error("usuario nao encontrado");
    }

    try {
      let createBilling = await billingcycles.create({
        session_id: userId,
        ...req.data,
      });

      return createBilling;
    } catch (err) {
      throw new Error(err);
    }
  },

  update: async (req) => {
    const { id } = req.filter;

    const { name, credits } = req.data;

    try {
      const billingToUpdate = await billingcycles.findByPk(id);

      if (!billingToUpdate) throw new Error("Conta não identificada!");

      let billingUpdate = await billingcycles.update(
        {
          name,
          credits,
        },
        { where: id }
      );

      return billingUpdate;
    } catch (err) {
      throw new Error(err);
    }
  },

  destroy: async (req) => {
    const { id } = req.filter;

    try {
      const billingExist = await billingcycles.findOne({
        where: { id },
      });

      if (!billingExist) {throw new Error("Conta nao encontrada!");}

      let billingDeleted = await billingcycles.destroy({ where: { id } });

      return { billingDeleted };
    } catch (err) {
      throw new Error(err);
    }
  },
};
