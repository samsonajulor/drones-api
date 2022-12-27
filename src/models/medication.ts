import { UUIDV4 } from 'sequelize';

const medication = (sequelize: any, DataTypes: any): any => {
  const Medications = sequelize.define(
    'Medications',
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
        type: DataTypes.TEXT,
      },
    },
    {}
  );

  Medications.associate = (models: any): void => {
    Medications.belongsTo(models.Drones, { foreignKey: 'droneSerialNumber' });
  };
  Medications.init(
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
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Medications',
    }
  );
  return Medications;
};

module.exports = medication;
