const { debitUser, billingcycles } = require("../models");

module.exports = {
  store: async (req) => {
    const { billingDebitId } = req.filter;

    try {
      const billingAccount = await billingcycles.findByPk(billingDebitId);

      if (!billingAccount) throw new Error("Conta nao encontrado");

      // if (decoded.sub !== userPk)
      //   return res.status(401).json({ error: "vinculo invalido" });

      let createDebit = await debitUser.create({
        billingDebitId: billingDebitId,
        ...req.data,
      });

      return createDebit;
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
