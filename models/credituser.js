"use strict";
const { Model, QueryTypes } = require("sequelize");
const { billingcycles } = require("./");

module.exports = (sequelize, DataTypes) => {
  class creditUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.billingcycles, { foreignKey: "billingCreditId" });

      creditUser.afterCreate(async (user) => {
        const billingQueries = sequelize.query("Select * from billingcycles;", {
          type: QueryTypes.SELECT,
          model: billingcycles,
          raw: true,
          nest: true,
          mapToModel: true,
        });

        const billingCredits = await billingQueries;

        await models.billingcycles.update(
          {
            name: user.name,
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
            credits: billingCredits[0].credits + user.value,
          },
          {
            where: {
              id: user.billingCreditId,
            },
          }
        );
      });
    }
  }
  creditUser.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notNull: { msg: "digite algo" } },
      },
      value: DataTypes.INTEGER,
      billingCreditId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "creditUser",
    }
  );
  return creditUser;
};
