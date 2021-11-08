const bcryptjs = require("bcryptjs");

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
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "sessions",
    }
  );
  freezeTableName: true;
  module.exports = hashedPass = sessions.beforeCreate(async (user) => {
    try {
      const salt = await bcryptjs.genSalt();
      const passCrypted = bcryptjs.hashSync(user.password, salt).toString();
      user.password = passCrypted;
    } catch (err) {
      throw new Error();
    }
  });

  return sessions;
};
