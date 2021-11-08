const { sessions } = require("../models");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const tokenUser = require("../middlewares/verifyToken");

module.exports = {
  store: async (req) => {
    try {
      const { password, confirmPassword } = req.data;
      // const newUser = await sessions.findOne({ name });

      if (confirmPassword !== password)
        throw new Error("senhas nao sao iguais");

      let createUser = await sessions.create(req.data);

      return createUser;
    } catch (err) {
      if (err && err.name === "SequelizeUniqueConstraintError")
        throw new Error("usuario já existe");

      throw new Error(err);
    }
  },

  login: async (req) => {
    const { name, password } = req.data;
    try {
      const sessionInitialized = await sessions.findOne({
        where: { name: name },
      });

      if (!sessionInitialized) throw new Error("Usuario inexistente");

      const isValid = bcryptjs.compareSync(
        password,
        sessionInitialized.dataValues.password
      );

      const userId = sessionInitialized.id;

      if (!isValid) throw new Error("Senha Invalida");

      const userLogin = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "2d",
      });

      return { userLogin, sessionInitialized };
    } catch (err) {
      throw new Error(err);
    }
  },

  update: async (req) => {
    const { userId } = req.userId;
    const { name } = req.data;

    try {
      const sessionInitialized = await sessions.findOne({
        where: { id: userId },
      });
      const userToUpdate = sessionInitialized.dataValues.name;
      console.log(userToUpdate);
      if (!sessionInitialized) throw new Error("Usuario inexistente");

      let updatedUser = await sessions.update(
        { name: name },
        { where: { id: userId } }
      );

      return { updatedUser };
    } catch (err) {
      throw new Error(err);
    }
  },

  destroy: async (req) => {
    const { userId } = req.userId;
    const { id } = req.filter;

    try {
      const userExist = await sessions.findOne({
        where: { id },
      });

      if (!userExist) throw new Error("Usuario inexistente");

      let deletedUser = await sessions.destroy({ where: { id } });

      return { deletedUser };
    } catch (err) {
      throw new Error(err);
    }
  },
};
