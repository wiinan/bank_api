const Yup = require("yup");

module.exports = {
  store: {
    body: Yup.object().shape({
      name: Yup.string().required(),
      value: Yup.number().required(),
      status: Yup.boolean().required(),
      pedencies: Yup.string(),
    }),
    params: Yup.object().shape({
      billingCreditId: Yup.number(),
    }),
  },
};
