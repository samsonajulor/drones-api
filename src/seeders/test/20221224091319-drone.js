/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Drones', [
      {
        serialNumber: '1',
        model: 'Mavic Mini',
        weight: 40,
        battery: 70,
        state: 'IDLE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        serialNumber: '2',
        model: 'Mavic Pro',
        weight: 40,
        battery: 80,
        state: 'IDLE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        serialNumber: '3',
        model: 'Davic Pro',
        weight: 40,
        battery: 80,
        state: 'IDLE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        serialNumber: '4',
        model: 'Avic Pro',
        weight: 40,
        battery: 80,
        state: 'IDLE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        serialNumber: '5',
        model: 'Avic Mini',
        weight: 40,
        battery: 80,
        state: 'IDLE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        serialNumber: '6',
        model: 'MavicDe Pro',
        weight: 40,
        battery: 80,
        state: 'IDLE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        serialNumber: '7',
        model: 'MavicDe Mini>',
        weight: 40,
        battery: 80,
        state: 'IDLE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        serialNumber: '8',
        model: 'Climax Automatic',
        weight: 40,
        battery: 80,
        state: 'IDLE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        serialNumber: '9',
        model: 'Mavic Bomber Jacket',
        weight: 40,
        battery: 80,
        state: 'IDLE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        serialNumber: '10',
        model: 'Mavic Pro',
        weight: 40,
        battery: 80,
        state: 'IDLE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('Drones', null, {});
  },
};
