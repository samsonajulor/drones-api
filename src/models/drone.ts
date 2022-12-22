const drone = (sequelize: any, DataTypes: any): any => {
  const Drone = sequelize.define(
    'Drone',
    {
      serialNumber: {
        allowNull: false,
        type: DataTypes.STRING,
        primaryKey: true,
      },
      model: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      weight: {
        allowNull: false,
        type: DataTypes.NUMBER,
      },
      battery: {
        allowNull: false,
        type: DataTypes.NUMBER,
      },
      state: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {}
  );
  Drone.associate = (models: any): void => {
    Drone.hasMany(models.Medication, { foreignKey: 'medicationId' });
  };
  Drone.init(
    {
      serialNumber: {
        allowNull: false,
        type: DataTypes.STRING,
        primaryKey: true,
      },
      model: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      weight: {
        allowNull: false,
        type: DataTypes.NUMBER,
      },
      battery: {
        allowNull: false,
        type: DataTypes.NUMBER,
      },
      state: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Drone',
    }
  );
  return Drone;
};

module.exports = drone;
