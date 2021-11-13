const Yup = require("./validators");

module.exports = {
  store: {
    body: Yup.object().shape({
      email: Yup.string(255).email().required(),
      name: Yup.string(50).required().min(3),
      password: Yup.string().required().min(6),
    }).noUnknown(),
  },

  login: {
    body: Yup.object().shape({
      email: Yup.string(255).email().required(),
      password: Yup.string().required().min(6),
    }).noUnknown(),
  },

  update: {
    body: Yup.object().shape({
      name: Yup.string(50),
      email: Yup.string(255).email(),
      password: Yup.string().required(),
    }).noUnknown(),
  },
};
