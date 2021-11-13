const bcryptjs = require("bcryptjs");
const { v4: uuid } = require("uuid");
("use strict");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class sessions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.hasOne(models.billingCycle, { foreignKey: "session_id" });
    }
  }
  sessions.init(
    {
      name: { type: DataTypes.STRING(50), allowNull: false },
      email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "sessions",
      hooks: {
        beforeCreate: async (user) => {
          user.id = uuid();
          try {
            const salt = await bcryptjs.genSalt();
            const passCrypted = bcryptjs
              .hashSync(user.password, salt)
              .toString();
            user.password = passCrypted;
          } catch (err) { 
            throw new Error();
          }
        },
      },
    }
  );

  return sessions;
};
