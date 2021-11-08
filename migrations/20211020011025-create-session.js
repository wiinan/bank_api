"use strict";
module.exports = {
  up: async (queryInterface, Datatypes) => {
    await queryInterface.createTable("sessions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Datatypes.INTEGER,
      },
      name: { type: Datatypes.STRING, allowNull: false, unique: true },
      password: { type: Datatypes.STRING, allowNull: false },
      createdAt: {
        allowNull: false,
        type: Datatypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Datatypes.DATE,
      },
    });
  },
  down: async (queryInterface, Datatypes) => {
    await queryInterface.dropTable("sessions");
  },
};
