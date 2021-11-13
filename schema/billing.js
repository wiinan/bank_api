const Yup = require("yup");

module.exports = {
  store: {
    body: Yup.object().shape({
      name: Yup.string(255).required(),
      credits: Yup.number().default(0),
    }).noUnknown(),
    params: Yup.object().shape({
      session_id: Yup.number(),
    }),
  },

  update: {
    body: Yup.object().shape({
      name: Yup.string().required(),
      credits: Yup.number().default(0),
    }).noUnknown(),
    params: Yup.object().shape({
      session_id: Yup.number(),
    }),
  },
};
