const Yup = require("yup");

module.exports = {
  store: {
    body: Yup.object().shape({
      name: Yup.string(255).required(),
      value: Yup.number().required(),
      status: Yup.boolean().default(true),
    }),
    params: Yup.object().shape({
      billing_debit_id: Yup.number(),
    }).noUnknown(),
  },
  
  update: {
    params: Yup.object().shape({
      id: Yup.number().required(),
    }).noUnknown(),
  },
};
