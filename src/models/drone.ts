const drone = (sequelize: any, DataTypes: any): any => {
  const Drones = sequelize.define(
    'Drones',
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
        defaultValue: 'IDLE',
      },
    },
    {}
  );
  Drones.associate = (models: any): void => {
    Drones.hasMany(models.Medications, { foreignKey: 'medicationId' });
  };
  Drones.init(
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
      modelName: 'Drones',
    }
  );
  return Drones;
};

module.exports = drone;
