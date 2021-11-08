"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("debitUsers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notNull: { msg: "digite algo" } },
      },
      value: { type: DataTypes.INTEGER, allowNull: false },
      status: { type: DataTypes.BOOLEAN, default: true },
      pedencies: { type: DataTypes.STRING },
      billingDebitId: {
        type: DataTypes.INTEGER,
        references: {
          model: "billingcycles",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("debitUsers");
  },
};
