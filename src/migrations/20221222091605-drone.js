/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Drone', {
      serialNumber: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true,
      },
      model: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      weight: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      battery: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'IDLE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Drone');
  },
};
