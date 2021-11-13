("use strict");
module.exports = {
  up: async (queryInterface, Datatypes) => {
    await queryInterface.createTable("sessions", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Datatypes.UUID,
        defaultValue: Datatypes.UUIDV4,
      },
      name: { type: Datatypes.STRING(50), allowNull: false },
      email: { type: Datatypes.STRING(255), allowNull: false, unique: true },
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
