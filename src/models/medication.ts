import { UUIDV4 } from 'sequelize';

const medication = (sequelize: any, DataTypes: any): any => {
  const Medication = sequelize.define(
    'Medication',
    {
      medicationId: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      droneSerialNumber: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      weight: {
        allowNull: false,
        type: DataTypes.NUMBER,
      },
      code: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      image: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    },
    {}
  );

  Medication.associate = (models: any): void => {
    Medication.belongsTo(models.Drone, { foreignKey: 'serialNumber' });
  };
  Medication.init(
    {
      medicationId: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      droneSerialNumber: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      weight: {
        allowNull: false,
        type: DataTypes.NUMBER,
      },
      code: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      image: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Medication',
    }
  );
  return Medication;
};

module.exports = medication;
