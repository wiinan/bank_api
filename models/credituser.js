"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class creditUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.billingcycles, { foreignKey: "billing_credit_id" });
    }
  }

  creditUser.init(
    {
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      value: { type: DataTypes.FLOAT, allowNull: false },
      status: { type: DataTypes.BOOLEAN, allowNull: true, default: true },
      billing_credit_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "credituser",
    }
  );
  return creditUser;
};
