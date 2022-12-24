// Introduce a periodic task to check drones battery levels and create history/audit event log for this
const audit = (sequelize: any, DataTypes: any): any => {
  const Audit = sequelize.define(
    'Audit',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      serialNumber: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      model: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      weight: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      battery: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      state: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      medications: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {}
  );
  Audit.associate = (models: any): void => {
    Audit.belongsTo(models.Drone, { foreignKey: 'serialNumber' });
  };
  Audit.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      serialNumber: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      model: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      weight: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      battery: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      state: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      medications: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Audit',
    }
  );
  return Audit;
};

module.exports = audit;
