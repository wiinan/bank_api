const Yup = require("./validators");

module.exports = {
  store: {
    body: Yup.object().shape({
      name: Yup.string().required().min(3),
      password: Yup.string().required().min(6),
    }),
  },

  login: {
    body: Yup.object().shape({
      name: Yup.string().required(),
      password: Yup.string().required().min(6),
    }),
  },

  update: {
    body: Yup.object().shape({
      name: Yup.string().required(),
    }),
  },
};
