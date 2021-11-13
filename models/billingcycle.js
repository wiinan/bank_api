"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class billingCycles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.sessions, { foreignKey: "session_id" });
      this.hasMany(models.debituser, { foreignKey: "billing_debit_id" });
      this.hasMany(models.credituser, { foreignKey: "billing_credit_id" });
    }
  }
  billingCycles.init(
    {
      name: { type: DataTypes.STRING(255), allowNull: false },
      session_id: { type: DataTypes.INTEGER, allowNull: true },
      credits: { type: DataTypes.FLOAT, allowNull: false },
    },
    {
      sequelize,
      modelName: "billingcycles",
    }
  );

  return billingCycles;
};
