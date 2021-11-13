"use strict";
const { Model, QueryTypes } = require("sequelize");
const { billingcycles } = require("./");

module.exports = (sequelize, DataTypes) => {
  class debitUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.billingcycles, { foreignKey: "billing_debit_id" });
    }
  }
  debitUser.init(
    {
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      value: { type: DataTypes.FLOAT, allowNull: false },
      status: { type: DataTypes.BOOLEAN, default: true },
      billing_debit_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "debituser",
    }
  );

  return debitUser;
};
