const Yup = require("yup");

module.exports = {
  store: {
    body: Yup.object().shape({
      name: Yup.string().required(),
      month: Yup.number().required(),
      year: Yup.number().required(),
      credits: Yup.number().default(0),
    }),
    params: Yup.object().shape({
      session_id: Yup.number(),
    }),
  },

  update: {
    body: Yup.object().shape({
      name: Yup.string().required(),
      month: Yup.number().required(),
      year: Yup.number().required(),
      credits: Yup.number().default(0),
    }),
    params: Yup.object().shape({
      session_id: Yup.number(),
    }),
  },
};
