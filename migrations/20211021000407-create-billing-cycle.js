"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable("billingcycles", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        name: { type: DataTypes.STRING(255), allowNull: false },
        session_id: {
          type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: "sessions",
            key: "id",
          },
        },
        credits: {
          type: DataTypes.FLOAT,
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

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("billingcycles");
  },
};
